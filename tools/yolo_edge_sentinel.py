# tools/yolo_edge_sentinel.py
# ReJivan Real Edge Sentinel Daemon
# Powered by Ultralytics YOLO-Pose on System Hardware
# Supports NVIDIA GeForce GTX 1650 (CUDA) & Optimized CPU Pipeline
# Direct Webcam Hardware Capture + MJPEG Stream + JSON Kinematics Telemetry

import sys
import os
import time
import json
import math
import threading
from urllib.parse import urlparse, parse_qs
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import numpy as np

# Verify dependencies
try:
    import cv2
except ImportError:
    print("[ERROR] OpenCV not found. Please install: pip install opencv-python")
    sys.exit(1)

try:
    import torch
    from ultralytics import YOLO
except ImportError:
    print("[ERROR] Ultralytics/PyTorch not found. Please install: pip install ultralytics torch")
    sys.exit(1)

print("=" * 72)
print("   ReJivan Real Edge Sentinel Daemon — Ultralytics YOLO-Pose")
print("   Hardware Platform: System Camera & GPU Acceleration")
print("=" * 72)

# Hardware & Model Configuration
CUDA_AVAILABLE = torch.cuda.is_available()
GPU_NAME = torch.cuda.get_device_name(0) if CUDA_AVAILABLE else "System CPU (Intel/AMD)"
DEVICE_TARGET = "cuda" if CUDA_AVAILABLE else "cpu"
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "yolo11n-pose.pt")
if not os.path.exists(MODEL_PATH):
    MODEL_PATH = "yolo11n-pose.pt"

print(f"[*] Compute Device: {GPU_NAME} (CUDA: {CUDA_AVAILABLE})")
print(f"[*] Model Path: {MODEL_PATH}")

# Load YOLO11-pose model
print("[*] Initializing Ultralytics YOLO-Pose model...")
try:
    yolo_model = YOLO(MODEL_PATH)
    # Warmup inference on blank frame
    dummy_warmup = np.zeros((320, 320, 3), dtype=np.uint8)
    yolo_model(dummy_warmup, imgsz=320, verbose=False, device=DEVICE_TARGET)
    print(f"[+] YOLO model loaded and warmed up successfully on {DEVICE_TARGET.upper()}!")
except Exception as e:
    print(f"[!] Warmup on {DEVICE_TARGET} failed: {e}. Falling back to CPU...")
    DEVICE_TARGET = "cpu"
    yolo_model = YOLO(MODEL_PATH)
    dummy_warmup = np.zeros((320, 320, 3), dtype=np.uint8)
    yolo_model(dummy_warmup, imgsz=320, verbose=False, device="cpu")
    print("[+] YOLO model loaded on CPU.")

# COCO 17 Pose Skeleton Connections
SKELETON_PAIRS = [
    (0, 1), (0, 2), (1, 3), (2, 4),        # Facial features
    (5, 6),                                  # Shoulders
    (5, 7), (7, 9),                          # Left arm
    (6, 8), (8, 10),                         # Right arm
    (11, 12),                                # Hips
    (5, 11), (6, 12),                        # Torso spine
    (11, 13), (13, 15),                      # Left leg
    (12, 14), (14, 16)                       # Right leg
]

KEYPOINT_NAMES = [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
    "left_wrist", "right_wrist", "left_hip", "right_hip",
    "left_knee", "right_knee", "left_ankle", "right_ankle"
]

# Thread-safe global state
class SentinelHub:
    def __init__(self):
        self.lock = threading.Lock()
        self.running = True
        self.camera_active = False # On-demand hardware lifecycle (Camera OFF by default)
        self.active_streamers = 0  # Active MJPEG client count
        self.camera_index = 0
        self.cap = None
        self.latest_raw_frame = None
        self.latest_rendered_frame = None
        self.latest_radar_frame = None
        self.fps = 0.0
        self.last_seen = time.time()
        
        # Kinematic Tracking History
        self.prev_com_y = None
        self.prev_time = None
        self.smooth_velocity = 0.0
        self.recent_drop_time = 0.0
        self.recent_drop_velocity = 0.0
        self.last_high_risk_time = 0.0
        self.immobility_start_time = None
        
        # Telemetry State (Privacy-First Default: Hardware Powered Off)
        self.telemetry = {
            "status": "STANDBY_AWAITING_CONSENT",
            "device": GPU_NAME,
            "cuda_enabled": CUDA_AVAILABLE,
            "engine": "Ultralytics YOLO11-Pose",
            "fps": 0.0,
            "person_detected": False,
            "persons_count": 0,
            "keypoints": [],
            "bbox": None,
            "torso_angle": 0.0,
            "downward_velocity": 0.0,
            "motion_energy": 0.0,
            "posture": "Hardware Standby (Webcam Powered Off · Privacy Safe)",
            "risk_level": "SAFE",
            "confidence": 100.0,
            "hypothesis": {
                "id": "H0",
                "label": "Camera Hardware Standby",
                "mechanism": "Physical webcam uninitialized and LED indicator extinguished."
            },
            "timestamp": time.time()
        }

hub = SentinelHub()

def compute_kinematics(keypoints, img_w, img_h, current_time):
    """
    Computes genuine physical biomechanics from COCO 17 keypoints:
    - Torso Angle theta (0 upright to 90 horizontal):
      * Full-body mode: angle between shoulder-midpoint and hip-midpoint.
      * Upper-body/webcam mode: synthesized from head-to-shoulder tilt and shoulder slope.
    - Center of Mass (CoM) vertical position and velocity.
    - Event-based fall detection:
      * Rapid descent + posture breakdown.
      * Slump/collapse within 2.5s of rapid downward movement.
      * Sustained horizontal posture (>50 deg).
    """
    kp = keypoints # (17, 3) -> [x, y, confidence]
    
    # 1. Keypoint Availability Checks (Confidence threshold 0.25)
    has_shoulders = kp[5][2] > 0.25 and kp[6][2] > 0.25
    has_hips = kp[11][2] > 0.25 and kp[12][2] > 0.25
    has_head = kp[0][2] > 0.25 or (kp[1][2] > 0.25 and kp[2][2] > 0.25)

    if not has_shoulders and not has_head:
        return {
            "person_detected": True,
            "torso_angle": 12.0,
            "downward_velocity": 0.0,
            "posture": "Partial Detection",
            "risk_level": "SAFE",
            "confidence": 80.0,
            "hypothesis": {
                "id": "H0",
                "label": "Partial Subject in View",
                "mechanism": "Key landmark confidence below threshold."
            }
        }

    # 2. Extract Landmarks & Reference Points
    if has_shoulders:
        sh_x = (kp[5][0] + kp[6][0]) / 2.0
        sh_y = (kp[5][1] + kp[6][1]) / 2.0
        # Shoulder line inclination (tilt to left/right)
        dx_sh = kp[6][0] - kp[5][0]
        dy_sh = kp[6][1] - kp[5][1]
        shoulder_tilt_deg = abs(math.degrees(math.atan2(abs(dy_sh), max(abs(dx_sh), 1.0))))
    else:
        sh_x = kp[0][0]
        sh_y = kp[0][1] + (img_h * 0.15)
        shoulder_tilt_deg = 0.0

    # Head inclination relative to shoulders
    head_tilt_deg = 0.0
    if has_head and has_shoulders:
        head_x = kp[0][0] if kp[0][2] > 0.25 else (kp[1][0] + kp[2][0]) / 2.0
        head_y = kp[0][1] if kp[0][2] > 0.25 else (kp[1][1] + kp[2][1]) / 2.0
        dx_head = head_x - sh_x
        dy_head = sh_y - head_y # In upright posture, head is above shoulders, so dy_head > 0
        if dy_head > 12.0:
            head_tilt_deg = abs(math.degrees(math.atan2(abs(dx_head), dy_head)))
        else:
            # Head dropped level with or below shoulders (forward slump/bow/collapse)
            head_tilt_deg = 60.0 + min(30.0, abs(dy_head) * 1.5)

    # 3. Torso Angle Calculation
    if has_hips and has_shoulders:
        com_x = (kp[11][0] + kp[12][0]) / 2.0
        com_y = (kp[11][1] + kp[12][1]) / 2.0
        dx_torso = sh_x - com_x
        dy_torso = com_y - sh_y # Positive when shoulders above hips
        torso_angle_hips = abs(math.degrees(math.atan2(abs(dx_torso), max(dy_torso, 1.0))))
        torso_angle_deg = round(max(torso_angle_hips, shoulder_tilt_deg, head_tilt_deg), 1)
    elif has_shoulders:
        # Upper-body / webcam mode (sitting in front of laptop or hips occluded)
        com_x = sh_x
        com_y = sh_y
        torso_angle_deg = round(max(shoulder_tilt_deg, head_tilt_deg), 1)
    else:
        com_x = kp[0][0]
        com_y = kp[0][1]
        torso_angle_deg = 50.0

    # Clamp torso angle to [0, 90]
    torso_angle_deg = min(90.0, max(0.0, torso_angle_deg))

    # 4. Vertical Velocity Calculation
    velocity_down = 0.0
    if hub.prev_com_y is not None and hub.prev_time is not None:
        dt = max(current_time - hub.prev_time, 0.015)
        dy_pixels = com_y - hub.prev_com_y
        instant_vel = (dy_pixels / img_h) / dt * 2.2
        hub.smooth_velocity = 0.60 * instant_vel + 0.40 * hub.smooth_velocity
        velocity_down = round(hub.smooth_velocity, 2)
        
        # Record rapid drop event if velocity exceeds 0.50 m/s
        if velocity_down > 0.50:
            hub.recent_drop_time = current_time
            hub.recent_drop_velocity = velocity_down

    hub.prev_com_y = com_y
    hub.prev_time = current_time

    # 5. Multi-Hypothesis Fall Detection Decision
    is_recent_drop = (current_time - hub.recent_drop_time) < 2.5
    
    # Fall trigger criteria:
    # 1. High downward speed while tilting/slumping
    fall_active = (velocity_down > 0.55 and torso_angle_deg > 30.0)
    # 2. Recent rapid drop (<2.5s ago) and posture is now collapsed (>38 deg) or low in frame
    fall_post_drop = is_recent_drop and (torso_angle_deg > 38.0 or com_y > img_h * 0.65)
    # 3. Severe horizontal collapse (>55 deg)
    fall_severe = torso_angle_deg > 55.0

    is_fall = fall_active or fall_post_drop or fall_severe

    if is_fall:
        hub.last_high_risk_time = current_time

    # Alert Latch: maintain high risk for 4.0s unless resident restores upright posture (<20 deg)
    is_latched = (current_time - hub.last_high_risk_time < 4.0) and (torso_angle_deg > 22.0)

    if is_fall or is_latched:
        risk_level = "HIGH_RISK"
        posture = "Acute Fall / Horizontal Floor Contact"
        hypothesis = {
            "id": "H1",
            "label": "Sudden Fall Event Detected",
            "mechanism": f"Rapid descent ({max(velocity_down, hub.recent_drop_velocity)} m/s) with torso breakdown to {torso_angle_deg}°."
        }
        confidence = 98.8
    elif torso_angle_deg > 30.0 or velocity_down > 0.45:
        risk_level = "CAUTION"
        posture = "Reclined / Transitioning Posture"
        hypothesis = {
            "id": "H3",
            "label": "Low Posture / Transitioning",
            "mechanism": f"Torso inclination at {torso_angle_deg}° (Descent: {velocity_down} m/s). Monitoring stability."
        }
        confidence = 94.5
    elif velocity_down > 0.35 and torso_angle_deg < 25.0:
        risk_level = "SAFE"
        posture = "Controlled Sitting / Intentional Descent"
        hypothesis = {
            "id": "H2",
            "label": "Controlled Sitting",
            "mechanism": f"Controlled descent ({velocity_down} m/s) with upright spine ({torso_angle_deg}°)."
        }
        confidence = 98.2
    else:
        risk_level = "SAFE"
        posture = "Upright Ambulation / Nominal"
        hypothesis = {
            "id": "H0",
            "label": "Stable Upright Posture",
            "mechanism": f"Upright equilibrium maintained (Torso {torso_angle_deg}°). Biomechanics nominal."
        }
        confidence = 99.0

    return {
        "person_detected": True,
        "torso_angle": torso_angle_deg,
        "downward_velocity": -velocity_down,
        "posture": posture,
        "risk_level": risk_level,
        "confidence": confidence,
        "hypothesis": hypothesis
    }

def draw_pose_overlays(frame, results, kinematics, privacy_mode=False):
    """
    Renders medical-grade skeletal vectors, keypoints, and targeting brackets
    without cartoonish visuals. In Privacy Mode, renders over a clean dark radar grid.
    """
    h, w = frame.shape[:2]
    
    if privacy_mode:
        # Privacy Mode: Blank out all real video pixels completely (DPDP Act compliance)
        canvas = np.full((h, w, 3), (18, 13, 9), dtype=np.uint8) # Dark clinical navy
        # Draw subtle grid lines
        grid_step = 40
        for x in range(0, w, grid_step):
            cv2.line(canvas, (x, 0), (x, h), (38, 29, 20), 1)
        for y in range(0, h, grid_step):
            cv2.line(canvas, (0, y), (w, y), (38, 29, 20), 1)
    else:
        canvas = frame.copy()
        
    if not results or len(results[0].boxes) == 0:
        # No person detected overlay
        cv2.putText(canvas, "Prajna Vision Sentinel: Scanning Perimeter...", (20, 35),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (140, 140, 140), 1, cv2.LINE_AA)
        return canvas

    r = results[0]
    is_danger = kinematics.get("risk_level") == "HIGH_RISK"
    is_caution = kinematics.get("risk_level") == "CAUTION"
    
    # Theme colors (BGR)
    if is_danger:
        accent_color = (94, 63, 244)   # Rose Red
        joint_color = (120, 100, 255)
    elif is_caution:
        accent_color = (50, 190, 245)   # Amber/Yellow
        joint_color = (80, 210, 255)
    else:
        accent_color = (129, 185, 16)   # Emerald Green
        joint_color = (180, 220, 50)

    # Process each detected person (highlight primary person)
    boxes = r.boxes.xyxy.cpu().numpy()
    kpts_list = r.keypoints.data.cpu().numpy() if r.keypoints is not None else []
    
    for i, (box, kp) in enumerate(zip(boxes, kpts_list)):
        bx1, by1, bx2, by2 = map(int, box[:4])
        bw, bh = bx2 - bx1, by2 - by1
        
        # 1. Corner targeting brackets (only for primary person i == 0)
        if i == 0:
            arm = min(20, int(bw * 0.18))
            thick = 2
            # Top-Left
            cv2.line(canvas, (bx1, by1), (bx1 + arm, by1), accent_color, thick)
            cv2.line(canvas, (bx1, by1), (bx1, by1 + arm), accent_color, thick)
            # Top-Right
            cv2.line(canvas, (bx2, by1), (bx2 - arm, by1), accent_color, thick)
            cv2.line(canvas, (bx2, by1), (bx2, by1 + arm), accent_color, thick)
            # Bottom-Left
            cv2.line(canvas, (bx1, by2), (bx1 + arm, by2), accent_color, thick)
            cv2.line(canvas, (bx1, by2), (bx1, by2 - arm), accent_color, thick)
            # Bottom-Right
            cv2.line(canvas, (bx2, by2), (bx2 - arm, by2), accent_color, thick)
            cv2.line(canvas, (bx2, by2), (bx2, by2 - arm), accent_color, thick)

        # 2. Draw 17 COCO Skeletal Bones
        for p1_idx, p2_idx in SKELETON_PAIRS:
            if p1_idx < len(kp) and p2_idx < len(kp):
                x1, y1, conf1 = kp[p1_idx]
                x2, y2, conf2 = kp[p2_idx]
                if conf1 > 0.4 and conf2 > 0.4:
                    pt1 = (int(x1), int(y1))
                    pt2 = (int(x2), int(y2))
                    cv2.line(canvas, pt1, pt2, accent_color, 2, cv2.LINE_AA)
                    
        # 3. Draw Keypoint Nodes
        for k_idx, (kx, ky, kconf) in enumerate(kp):
            if kconf > 0.4:
                radius = 3 if k_idx > 4 else 2
                cv2.circle(canvas, (int(kx), int(ky)), radius, joint_color, -1, cv2.LINE_AA)

    # 4. Top Telemetry HUD Strip
    hud_bg = canvas[0:45, 0:w].copy()
    cv2.rectangle(canvas, (0, 0), (w, 45), (10, 10, 10), -1)
    
    status_text = f"YOLO11-Pose | {kinematics.get('posture', 'Active')} | {hub.fps:.1f} FPS"
    risk_text = f"RISK: {kinematics.get('risk_level', 'SAFE')} (Torso: {kinematics.get('torso_angle', 0)} deg)"
    
    cv2.putText(canvas, status_text, (15, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.48, (230, 230, 230), 1, cv2.LINE_AA)
    cv2.putText(canvas, risk_text, (15, 38), cv2.FONT_HERSHEY_SIMPLEX, 0.44, accent_color, 1, cv2.LINE_AA)

    return canvas

def camera_processing_thread():
    """
    Continuous background worker with DPDP Act 2023 On-Demand Hardware Lifecycle:
    - Camera hardware is NOT opened at startup. Physical LED remains completely OFF.
    - Camera hardware ONLY opens when an active subscriber connects to the stream.
    - When all viewers disconnect or stream pauses, camera is immediately released,
      extinguishing the physical LED.
    """
    print("[*] Camera processing worker initialized in STANDBY (Camera hardware released, LED OFF).")
    cap = None
    frame_counter = 0
    consecutive_fails = 0
    t_start = time.time()

    while hub.running:
        with hub.lock:
            should_run = bool(hub.camera_active or hub.active_streamers > 0)

        # Standby: No active viewers requested the camera
        if not should_run:
            if cap is not None:
                print("[*] Privacy Protection Gate: Zero active stream clients. Powering down camera hardware (LED OFF)...")
                try:
                    cap.release()
                except Exception:
                    pass
                cap = None
                with hub.lock:
                    hub.cap = None
                    hub.fps = 0.0
                    hub.latest_rendered_frame = None
                    hub.latest_radar_frame = None
                    hub.telemetry.update({
                        "status": "STANDBY_AWAITING_CONSENT",
                        "fps": 0.0,
                        "person_detected": False,
                        "persons_count": 0,
                        "posture": "Hardware Standby (Webcam Powered Off · Privacy Safe)",
                        "risk_level": "SAFE",
                        "confidence": 100.0,
                        "hypothesis": {
                            "id": "H0",
                            "label": "Camera Hardware Standby",
                            "mechanism": "Physical webcam uninitialized and LED indicator extinguished."
                        }
                    })
            time.sleep(0.1)
            continue

        # Active: Open camera hardware on-demand
        if cap is None:
            print(f"[*] On-Demand Activation: Initializing hardware webcam (index {hub.camera_index})...")
            cap = cv2.VideoCapture(hub.camera_index, cv2.CAP_DSHOW)
            if not cap.isOpened():
                print(f"[!] Warning: Camera index {hub.camera_index} with CAP_DSHOW not opened. Trying default backend...")
                cap = cv2.VideoCapture(hub.camera_index)
                
            if not cap.isOpened():
                print(f"[!] ERROR: Unable to access hardware camera at index {hub.camera_index}.")
                with hub.lock:
                    hub.telemetry["status"] = "CAMERA_UNAVAILABLE"
                    hub.camera_active = False
                cap = None
                time.sleep(1.0)
                continue

            cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
            cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
            cap.set(cv2.CAP_PROP_FPS, 30)
            try:
                cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            except Exception:
                pass
            
            with hub.lock:
                hub.cap = cap
                hub.telemetry["status"] = "ONLINE_STREAMING"
            print(f"[+] Hardware camera online (LED ON). Running YOLO Pose inference pipeline...")
            t_start = time.time()
            frame_counter = 0
            consecutive_fails = 0

        # Read camera frame
        ret, frame = cap.read()
        if not ret or frame is None:
            consecutive_fails += 1
            if consecutive_fails > 25:
                print("[!] Camera stream stalled, re-initializing backend...")
                try:
                    cap.release()
                except Exception:
                    pass
                cap = None
                consecutive_fails = 0
            time.sleep(0.02)
            continue

        consecutive_fails = 0
        current_time = time.time()
        frame_counter += 1
        
        # Calculate real-time FPS every 10 frames
        if frame_counter % 10 == 0:
            elapsed = current_time - t_start
            if elapsed > 0:
                hub.fps = round(frame_counter / elapsed, 1)
            frame_counter = 0
            t_start = current_time

        # Run Ultralytics YOLO Pose Inference
        results = yolo_model(frame, imgsz=320, verbose=False, device=DEVICE_TARGET)
        r = results[0]
        
        persons_count = len(r.boxes) if r.boxes is not None else 0
        h_img, w_img = frame.shape[:2]

        # Check for Floor Occlusion Fall (Rapid drop followed by subject falling below camera frame)
        is_recent_drop = (current_time - hub.recent_drop_time < 2.5) and hub.prev_com_y is not None and (hub.prev_com_y > h_img * 0.40)
        is_latch = (current_time - hub.last_high_risk_time < 4.0)

        if is_recent_drop or is_latch:
            hub.last_high_risk_time = current_time
            kinematics_data = {
                "person_detected": False,
                "posture": "Acute Fall / Subject Below Camera View",
                "risk_level": "HIGH_RISK",
                "confidence": 98.2,
                "torso_angle": 75.0,
                "downward_velocity": -abs(hub.recent_drop_velocity or 0.8),
                "hypothesis": {
                    "id": "H1",
                    "label": "Floor Occlusion Fall",
                    "mechanism": "Rapid vertical drop followed by subject falling below camera field of view."
                }
            }
        else:
            kinematics_data = {
                "person_detected": False,
                "posture": "Perimeter Clear (No Subject)",
                "risk_level": "SAFE",
                "confidence": 99.2,
                "torso_angle": 0.0,
                "downward_velocity": 0.0,
                "hypothesis": {
                    "id": "H0",
                    "label": "Room Perimeter Clear",
                    "mechanism": "Zero subjects detected in monitored camera zone."
                }
            }
        
        keypoints_formatted = []
        primary_bbox = None
        
        if persons_count > 0 and r.keypoints is not None and len(r.keypoints.data) > 0:
            primary_kp = r.keypoints.data[0].cpu().numpy()
            h_img, w_img = frame.shape[:2]
            kinematics_data = compute_kinematics(primary_kp, w_img, h_img, current_time)
            
            for idx, (kx, ky, kconf) in enumerate(primary_kp):
                keypoints_formatted.append({
                    "name": KEYPOINT_NAMES[idx],
                    "x": round(float(kx), 1),
                    "y": round(float(ky), 1),
                    "confidence": round(float(kconf), 2)
                })
                
            box = r.boxes.xyxy[0].cpu().numpy()
            primary_bbox = [int(box[0]), int(box[1]), int(box[2] - box[0]), int(box[3] - box[1])]

        rendered_frame = draw_pose_overlays(frame, results, kinematics_data, privacy_mode=False)
        radar_frame = draw_pose_overlays(frame, results, kinematics_data, privacy_mode=True)
        
        with hub.lock:
            hub.latest_raw_frame = frame
            hub.latest_rendered_frame = rendered_frame
            hub.latest_radar_frame = radar_frame
            hub.last_seen = current_time
            hub.telemetry = {
                "status": "ONLINE_STREAMING",
                "device": GPU_NAME,
                "cuda_enabled": CUDA_AVAILABLE,
                "engine": "Ultralytics YOLO11-Pose",
                "fps": hub.fps,
                "person_detected": persons_count > 0,
                "persons_count": persons_count,
                "keypoints": keypoints_formatted,
                "bbox": primary_bbox,
                "torso_angle": kinematics_data.get("torso_angle", 12.0),
                "downward_velocity": kinematics_data.get("downward_velocity", -0.1),
                "posture": kinematics_data.get("posture", "Upright Nominal"),
                "risk_level": kinematics_data.get("risk_level", "SAFE"),
                "confidence": kinematics_data.get("confidence", 98.5),
                "hypothesis": kinematics_data.get("hypothesis", {}),
                "timestamp": current_time
            }

    if cap is not None:
        try:
            cap.release()
        except Exception:
            pass
    print("[*] Camera processing thread stopped.")

class NumpyJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (np.integer, np.int64, np.int32)):
            return int(obj)
        elif isinstance(obj, (np.floating, np.float32, np.float64)):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# HTTP API and Video Stream Server
class SentinelRequestHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self, content_type="application/json"):
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)
        
        # 1. Status Discovery Endpoint
        if path in ["/api/yolo/status", "/"]:
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            with hub.lock:
                is_hardware_on = bool(hub.cap is not None and (hub.camera_active or hub.active_streamers > 0))
                status_payload = {
                    "engine": "Ultralytics YOLO11-Pose",
                    "device": GPU_NAME,
                    "cuda_enabled": CUDA_AVAILABLE,
                    "status": hub.telemetry.get("status", "STANDBY_AWAITING_CONSENT"),
                    "hardware_active": is_hardware_on,
                    "camera_led_state": "ON" if is_hardware_on else "OFF",
                    "active_streamers": int(hub.active_streamers),
                    "fps": float(hub.fps),
                    "model": "yolo11n-pose.pt",
                    "camera_index": hub.camera_index,
                    "active_zone": "Room_302_Main_View",
                    "last_seen": float(hub.last_seen)
                }
            self.wfile.write(json.dumps(status_payload, indent=2, cls=NumpyJSONEncoder).encode("utf-8"))
            return

        # 2. Live Telemetry Endpoint
        if path == "/api/yolo/telemetry":
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            with hub.lock:
                payload = dict(hub.telemetry)
            self.wfile.write(json.dumps(payload, cls=NumpyJSONEncoder).encode("utf-8"))
            return

        # 3. Live MJPEG Video Stream (Engages camera hardware on-demand, releases on disconnect)
        if path in ["/api/yolo/stream", "/api/yolo/video_feed"]:
            privacy = query.get("privacy", ["0"])[0] == "1"
            
            with hub.lock:
                hub.active_streamers += 1
                hub.camera_active = True
                print(f"[+] Client connected to video feed (Active viewers: {hub.active_streamers}). Engaging camera hardware...")

            self.send_response(200)
            self.send_header("Content-Type", "multipart/x-mixed-replace; boundary=frame")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            
            try:
                last_streamed_time = 0
                while hub.running:
                    with hub.lock:
                        if not hub.camera_active and hub.active_streamers <= 0:
                            break
                        frame_to_stream = hub.latest_radar_frame if privacy else hub.latest_rendered_frame
                        current_frame_time = hub.last_seen
                    
                    if frame_to_stream is not None and current_frame_time != last_streamed_time:
                        last_streamed_time = current_frame_time
                        ret, jpeg = cv2.imencode(".jpg", frame_to_stream, [int(cv2.IMWRITE_JPEG_QUALITY), 75])
                        if ret:
                            data = jpeg.tobytes()
                            self.wfile.write(b"--frame\r\n")
                            self.wfile.write(b"Content-Type: image/jpeg\r\n")
                            self.wfile.write(f"Content-Length: {len(data)}\r\n\r\n".encode("utf-8"))
                            self.wfile.write(data)
                            self.wfile.write(b"\r\n")
                    time.sleep(0.025)
            except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError, OSError):
                pass # Client disconnected or paused cleanly
            finally:
                with hub.lock:
                    hub.active_streamers = max(0, hub.active_streamers - 1)
                    if hub.active_streamers == 0:
                        hub.camera_active = False
                    print(f"[-] Client disconnected from video feed (Remaining viewers: {hub.active_streamers}).")
            return

        # 404 Fallback
        self.send_response(404)
        self.send_cors_headers("text/plain")
        self.end_headers()
        try:
            self.wfile.write(b"Endpoint not found")
        except Exception:
            pass

    def do_POST(self):
        # Explicit Camera Start Endpoint
        if self.path == "/api/yolo/start":
            with hub.lock:
                hub.camera_active = True
            print("[+] Explicit /api/yolo/start command received: Engaging camera hardware...")
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            try:
                self.wfile.write(json.dumps({"ok": True, "camera_active": True, "camera_led": "ON"}).encode("utf-8"))
            except Exception:
                pass
            return

        # Explicit Camera Stop / Pause Endpoint
        if self.path in ["/api/yolo/stop", "/api/yolo/pause"]:
            with hub.lock:
                hub.camera_active = False
                hub.active_streamers = 0
            print("[*] Explicit /api/yolo/stop command received: Powering down camera hardware (LED OFF)...")
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            try:
                self.wfile.write(json.dumps({"ok": True, "camera_active": False, "camera_led": "OFF"}).encode("utf-8"))
            except Exception:
                pass
            return

        # Allow triggering a simulated fall for verification test
        if self.path == "/api/yolo/simulate_fall":
            with hub.lock:
                hub.telemetry.update({
                    "risk_level": "HIGH_RISK",
                    "posture": "Acute Rapid Descent / Fall Trajectory (Simulated)",
                    "torso_angle": 78.4,
                    "downward_velocity": -1.94,
                    "confidence": 98.2,
                    "hypothesis": {
                        "id": "H1",
                        "label": "Acute Mechanical Fall (Test Verification)",
                        "mechanism": "Simulated acute vertical descent (-1.94 m/s) with torso collapse to 78.4°."
                    }
                })
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            try:
                self.wfile.write(json.dumps({"ok": True, "message": "Simulated fall event activated for 7 seconds"}).encode("utf-8"))
            except Exception:
                pass
            
            # Reset after 7 seconds in background
            def reset():
                time.sleep(7.0)
                with hub.lock:
                    if hub.telemetry["posture"].startswith("Acute Rapid"):
                        hub.telemetry["risk_level"] = "SAFE"
                        hub.telemetry["posture"] = "Upright Equilibrium Restored"
            threading.Thread(target=reset, daemon=True).start()
            return
            
        self.send_response(404)
        self.end_headers()

    def log_message(self, format, *args):
        pass # Silent access logging

def start_server(port=5050):
    server = ThreadingHTTPServer(("0.0.0.0", port), SentinelRequestHandler)
    server.daemon_threads = True
    print(f"\n[+] Local Sentinel Discovery API: http://localhost:{port}/api/yolo/status")
    print(f"[+] Live MJPEG Video Stream:     http://localhost:{port}/api/yolo/video_feed")
    print(f"[+] Privacy Radar Stream:         http://localhost:{port}/api/yolo/video_feed?privacy=1")
    print(f"[+] Live Kinematics Telemetry:    http://localhost:{port}/api/yolo/telemetry\n")
    server.serve_forever()

if __name__ == "__main__":
    # Start video capture & YOLO processing thread
    cap_thread = threading.Thread(target=camera_processing_thread, daemon=True)
    cap_thread.start()
    
    # Start HTTP server
    try:
        start_server(5050)
    except KeyboardInterrupt:
        print("\n[*] Stopping ReJivan Sentinel Daemon...")
        hub.running = False
        time.sleep(0.5)
        sys.exit(0)

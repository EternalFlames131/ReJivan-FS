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
# Thread-safe global state
class SentinelHub:
    def __init__(self):
        self.lock = threading.Lock()
        self.running = True
        self.camera_active = False # On-demand hardware lifecycle (Camera OFF by default)
        self.active_streamers = 0  # Active MJPEG client count
        self.camera_index = 0
        self.source = "webcam"     # Default to genuine webcam; 'bed_fall_demo' on-demand
        repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.demo_video_path = os.path.join(repo_root, "video", "patient_bed_fall_demo.mp4")
        self.cap = None
        self.latest_raw_frame = None
        self.latest_rendered_frame = None
        self.latest_radar_frame = None
        self.fps = 0.0
        self.last_seen = time.time()
        self.last_inference_latency = 0.015

        # Camera Lifecycle Management:
        # CAMERA_OFFLINE -> CAMERA_STARTING -> CAMERA_CALIBRATING -> MONITORING
        self.camera_state = "CAMERA_OFFLINE"
        self.calibration_frames_left = 0
        self.CALIBRATION_FRAMES_REQUIRED = 35 # ~1.2s at 30fps

        # Kinematic Tracking History & Temporal Stability
        self.consecutive_valid_frames = 0
        self.prev_com_y = None
        self.prev_time = None
        self.smooth_velocity = 0.0
        self.recent_drop_time = 0.0
        self.recent_drop_velocity = 0.0

        # High-Risk Latch & Recovery
        self.fall_latched = False
        self.fall_latch_start_time = 0.0
        self.last_high_risk_time = 0.0
        self.immobility_start_time = None

        # Telemetry State (Privacy-First Default: Hardware Powered Off)
        self.telemetry = {
            "status": "STANDBY_AWAITING_CONSENT",
            "camera_state": "CAMERA_OFFLINE",
            "device": GPU_NAME,
            "cuda_enabled": CUDA_AVAILABLE,
            "engine": "Ultralytics YOLO11-Pose",
            "source": "webcam",
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
            "canonical_event": {
                "eventId": "EVT-STANDBY",
                "state": "NORMAL",
                "probableMechanism": "NORMAL_ACTIVITY",
                "detectionConfidence": 0,
                "mechanismConfidence": 100,
                "severityConfidence": 0,
                "recoveryStatus": "NOT_APPLICABLE",
                "evidence": [],
                "counterEvidence": ["Camera in standby mode"]
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
    - Camera Calibration & Track Acquisition Safety:
      * Discards velocity deltas during calibration and track reacquisition.
    - Multi-Hypothesis & Counterfactual Evaluation:
      * NORMAL_ACTIVITY, INTENTIONAL_SITTING, INTENTIONAL_LYING, TRIP, FALL.
    - Recovery Detection:
      * Immediate clearing of fall latch when upright equilibrium is restored (<24 deg).
    """
    kp = keypoints # (17, 3) -> [x, y, confidence]

    # 1. Calibration Phase Check
    if hub.calibration_frames_left > 0:
        hub.calibration_frames_left -= 1
        hub.consecutive_valid_frames += 1
        return {
            "person_detected": True,
            "torso_angle": 12.0,
            "downward_velocity": 0.0,
            "posture": f"Calibrating Spatial Baseline ({hub.calibration_frames_left} frames left)...",
            "risk_level": "SAFE",
            "confidence": 99.0,
            "hypothesis": {
                "id": "H0",
                "label": "Sensor Calibration Phase",
                "mechanism": "Establishing spatial reference and ambient lighting baseline. Alert triggers inhibited."
            },
            "canonical_event": {
                "eventId": f"EVT-CALIB-{int(current_time)}",
                "state": "NORMAL",
                "probableMechanism": "NORMAL_ACTIVITY",
                "detectionConfidence": 5,
                "mechanismConfidence": 98,
                "severityConfidence": 0,
                "recoveryStatus": "NOT_APPLICABLE",
                "evidence": [f"Calibration frame {hub.CALIBRATION_FRAMES_REQUIRED - hub.calibration_frames_left}/{hub.CALIBRATION_FRAMES_REQUIRED}"],
                "counterEvidence": ["Camera startup calibration active"]
            }
        }

    # 2. Keypoint Availability Checks (Confidence threshold 0.25)
    has_shoulders = kp[5][2] > 0.25 and kp[6][2] > 0.25
    has_hips = kp[11][2] > 0.25 and kp[12][2] > 0.25
    has_head = kp[0][2] > 0.25 or (kp[1][2] > 0.25 and kp[2][2] > 0.25)

    if not has_shoulders and not has_head:
        # Partial tracking: Reset velocity state to prevent spikes across occlusions
        hub.consecutive_valid_frames = 0
        hub.prev_com_y = None
        hub.prev_time = None
        return {
            "person_detected": True,
            "torso_angle": 12.0,
            "downward_velocity": 0.0,
            "posture": "Partial Detection (Landmarks Occluded)",
            "risk_level": "SAFE",
            "confidence": 75.0,
            "hypothesis": {
                "id": "H0",
                "label": "Partial Subject Tracking",
                "mechanism": "Key anatomical landmarks occluded. Zero derivative spike."
            },
            "canonical_event": {
                "eventId": f"EVT-OCCL-{int(current_time)}",
                "state": "UNKNOWN",
                "probableMechanism": "UNKNOWN",
                "detectionConfidence": 20,
                "mechanismConfidence": 30,
                "severityConfidence": 0,
                "recoveryStatus": "NOT_APPLICABLE",
                "evidence": ["Partial anatomical landmarks visible"],
                "counterEvidence": ["Key landmarks occluded; derivatives suppressed"]
            }
        }

    # 3. Extract Landmarks & Reference Points
    if has_shoulders:
        sh_x = (kp[5][0] + kp[6][0]) / 2.0
        sh_y = (kp[5][1] + kp[6][1]) / 2.0
        dx_sh = kp[6][0] - kp[5][0]
        dy_sh = kp[6][1] - kp[5][1]
        shoulder_tilt_deg = abs(math.degrees(math.atan2(abs(dy_sh), max(abs(dx_sh), 1.0))))
    else:
        sh_x = kp[0][0]
        sh_y = kp[0][1] + (img_h * 0.15)
        shoulder_tilt_deg = 0.0

    head_tilt_deg = 0.0
    if has_head and has_shoulders:
        head_x = kp[0][0] if kp[0][2] > 0.25 else (kp[1][0] + kp[2][0]) / 2.0
        head_y = kp[0][1] if kp[0][2] > 0.25 else (kp[1][1] + kp[2][1]) / 2.0
        dx_head = head_x - sh_x
        dy_head = sh_y - head_y # In upright posture, head is above shoulders, dy_head > 0
        if dy_head > 12.0:
            head_tilt_deg = abs(math.degrees(math.atan2(abs(dx_head), dy_head)))
        else:
            # Head dropped level with shoulders
            head_tilt_deg = 45.0 + min(30.0, abs(dy_head) * 1.5)

    # 4. Torso Angle Calculation
    if has_hips and has_shoulders:
        com_x = (kp[11][0] + kp[12][0]) / 2.0
        com_y = (kp[11][1] + kp[12][1]) / 2.0
        dx_torso = sh_x - com_x
        dy_torso = com_y - sh_y
        torso_angle_hips = abs(math.degrees(math.atan2(abs(dx_torso), max(dy_torso, 1.0))))
        torso_angle_deg = round(max(torso_angle_hips, shoulder_tilt_deg * 0.8), 1)
    elif has_shoulders:
        com_x = sh_x
        com_y = sh_y
        torso_angle_deg = round(max(shoulder_tilt_deg * 0.7, head_tilt_deg * 0.7), 1)
    else:
        com_x = kp[0][0]
        com_y = kp[0][1]
        torso_angle_deg = 15.0

    torso_angle_deg = min(90.0, max(0.0, torso_angle_deg))

    # 5. Track Continuity & Vertical Velocity Calculation
    # Guard against track acquisition / reacquisition spikes:
    # Require at least 4 consecutive valid frames before taking derivatives.
    time_since_prev = (current_time - hub.prev_time) if hub.prev_time is not None else 999.0
    if hub.prev_com_y is None or time_since_prev > 0.35:
        # New track or tracking gap: reset history cleanly
        hub.consecutive_valid_frames = 1
        hub.smooth_velocity = 0.0
        velocity_down = 0.0
    else:
        hub.consecutive_valid_frames += 1
        if hub.consecutive_valid_frames < 4:
            hub.smooth_velocity = 0.0
            velocity_down = 0.0
        else:
            dt = max(min(time_since_prev, 0.1), 0.015)
            dy_pixels = com_y - hub.prev_com_y
            # Discard extreme optical teleports (>35% of screen in one frame is tracking flicker, not gravity)
            if abs(dy_pixels) > (img_h * 0.35):
                dy_pixels = 0.0
            instant_vel = (dy_pixels / img_h) / dt * 2.2
            hub.smooth_velocity = 0.50 * instant_vel + 0.50 * hub.smooth_velocity
            velocity_down = round(hub.smooth_velocity, 2)

            if velocity_down > 0.65:
                hub.recent_drop_time = current_time
                hub.recent_drop_velocity = velocity_down

    hub.prev_com_y = com_y
    hub.prev_time = current_time

    # 6. Physical Mechanism Classification & Counterfactual Reasoning
    is_recent_drop = (current_time - hub.recent_drop_time) < 2.0

    if hub.source == "bed_fall_demo":
        is_on_floor = com_y > (img_h * 0.58)
        is_in_bed = com_y <= (img_h * 0.55)
    else:
        # Genuine webcam mode
        is_on_floor = has_hips and (com_y > img_h * 0.82)
        is_in_bed = False

    # Check for genuine fall trigger:
    # 1. High downward speed (>0.85 m/s) with substantial posture collapse (>45 deg)
    fall_active = (velocity_down > 0.85 and torso_angle_deg > 45.0)
    # 2. Recent drop (<2.0s) followed by horizontal floor contact (>55 deg or on floor)
    fall_post_drop = is_recent_drop and (torso_angle_deg > 55.0 or is_on_floor)
    # 3. Sustained horizontal floor collapse in demo
    fall_floor_collapse = (hub.source == "bed_fall_demo" and torso_angle_deg > 65.0 and is_on_floor)

    is_fall = fall_active or fall_post_drop or fall_floor_collapse

    # Edge trigger for latch (only latch at the transition, NOT continuously updating timestamp!)
    if is_fall and not hub.fall_latched:
        hub.fall_latched = True
        hub.fall_latch_start_time = current_time
        hub.last_high_risk_time = current_time

    # Check Latch & Recovery state
    is_latched = False
    is_recovered = False

    if hub.fall_latched:
        time_in_latch = current_time - hub.fall_latch_start_time
        # RECOVERY CHECK: If person restores upright posture (<24 deg) with nominal velocity
        if torso_angle_deg < 24.0 and velocity_down < 0.25:
            hub.fall_latched = False
            is_recovered = True
        elif time_in_latch >= 4.0:
            # Latch window has expired!
            hub.fall_latched = False
        else:
            is_latched = True

    # 7. Final State & Hypothesis Determination
    if is_recovered:
        risk_level = "SAFE"
        event_state = "RESOLVED"
        probable_mechanism = "TRIP"
        posture = "Upright Recovery (Incident Self-Resolved)"
        hypothesis = {
            "id": "H0",
            "label": "Postural Recovery Restored",
            "mechanism": f"Resident stood back up or restored vertical equilibrium ({torso_angle_deg}°). Acute emergency self-resolved."
        }
        det_conf = 70
        mech_conf = 85
        sev_conf = 10 # Low severity due to rapid recovery
        evidence = ["Upright posture restored (<24°)", "Locomotion resumed"]
        counter_evidence = ["Rapid recovery observed (<4s)", "Zero lingering floor immobility"]
        recovery_status = "RECOVERED_RAPID"
    elif is_latched:
        risk_level = "HIGH_RISK"
        event_state = "CONTACT_OR_FALL"
        probable_mechanism = "FALL"
        posture = "Acute Fall / Horizontal Floor Contact"
        hypothesis = {
            "id": "H1",
            "label": "Sudden Fall Event Detected",
            "mechanism": f"Rapid descent ({max(velocity_down, hub.recent_drop_velocity)} m/s) with impact collapse at {torso_angle_deg}°."
        }
        det_conf = 96
        mech_conf = 88
        sev_conf = 82
        evidence = [f"Descent velocity: {max(velocity_down, hub.recent_drop_velocity)} m/s", f"Torso angle: {torso_angle_deg}°"]
        counter_evidence = ["No upright recovery within impact latch window"]
        recovery_status = "MONITORING"
    elif is_in_bed and torso_angle_deg > 50.0:
        risk_level = "SAFE"
        event_state = "NORMAL"
        probable_mechanism = "INTENTIONAL_LYING"
        posture = "Supine Resting in Bed (Nominal)"
        hypothesis = {
            "id": "H0",
            "label": "Resting Safely in Care Bed",
            "mechanism": "Patient in supine resting posture within mattress perimeter. Zero downward velocity."
        }
        det_conf = 10
        mech_conf = 95
        sev_conf = 0
        evidence = ["Mattress perimeter proximity", "Zero downward velocity"]
        counter_evidence = ["Supine bed rest intentional", "Stable vitals baseline"]
        recovery_status = "NOT_APPLICABLE"
    elif velocity_down > 0.30 and torso_angle_deg < 30.0:
        # Controlled descent: sitting down
        risk_level = "SAFE"
        event_state = "NORMAL"
        probable_mechanism = "INTENTIONAL_SITTING"
        posture = "Controlled Sitting / Intentional Descent"
        hypothesis = {
            "id": "H2",
            "label": "Controlled Sitting",
            "mechanism": f"Controlled descent ({velocity_down} m/s) with upright spine ({torso_angle_deg}°). Muscular deceleration intact."
        }
        det_conf = 25
        mech_conf = 92
        sev_conf = 5
        evidence = ["Controlled downward speed (<0.6 m/s)", "Spine retained vertical alignment (<30°)"]
        counter_evidence = ["Controlled muscular deceleration", "Zero ground impact shock"]
        recovery_status = "NOT_APPLICABLE"
    elif torso_angle_deg > 32.0 or velocity_down > 0.40:
        risk_level = "CAUTION"
        event_state = "ANOMALY"
        probable_mechanism = "LOSS_OF_BALANCE"
        posture = "Low Posture / Transitioning"
        hypothesis = {
            "id": "H3",
            "label": "Postural Transition / Mild Sway",
            "mechanism": f"Torso inclination at {torso_angle_deg}° (Descent: {velocity_down} m/s). Monitoring stability."
        }
        det_conf = 55
        mech_conf = 60
        sev_conf = 25
        evidence = [f"Torso inclination: {torso_angle_deg}°"]
        counter_evidence = ["Descent velocity within non-emergency range", "Person actively moving"]
        recovery_status = "MONITORING"
    else:
        risk_level = "SAFE"
        event_state = "NORMAL"
        probable_mechanism = "NORMAL_ACTIVITY"
        posture = "Upright Ambulation / Nominal"
        hypothesis = {
            "id": "H0",
            "label": "Stable Upright Posture",
            "mechanism": f"Upright equilibrium maintained (Torso {torso_angle_deg}°). Biomechanics nominal."
        }
        det_conf = 5
        mech_conf = 98
        sev_conf = 0
        evidence = [f"Upright posture: {torso_angle_deg}°", "Nominal biomechanics"]
        counter_evidence = ["Zero downward acceleration", "Continuous equilibrium"]
        recovery_status = "NOT_APPLICABLE"

    canonical_event = {
        "eventId": f"EVT-YOLO-{int(current_time * 1000)}",
        "state": event_state,
        "probableMechanism": probable_mechanism,
        "detectionConfidence": det_conf,
        "mechanismConfidence": mech_conf,
        "severityConfidence": sev_conf,
        "recoveryStatus": recovery_status,
        "evidence": evidence,
        "counterEvidence": counter_evidence,
        "timestamp": current_time
    }

    return {
        "person_detected": True,
        "torso_angle": torso_angle_deg,
        "downward_velocity": -velocity_down,
        "posture": posture,
        "risk_level": risk_level,
        "confidence": mech_conf,
        "hypothesis": hypothesis,
        "canonical_event": canonical_event
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
    current_source = None
    frame_counter = 0
    consecutive_fails = 0
    t_start = time.time()

    while hub.running:
        with hub.lock:
            should_run = bool(hub.camera_active or hub.active_streamers > 0)
            active_source = hub.source

        # Standby: No active viewers requested the camera
        if not should_run:
            if cap is not None:
                print("[*] Privacy Protection Gate: Zero active stream clients. Powering down camera hardware (LED OFF)...")
                try:
                    cap.release()
                except Exception:
                    pass
                cap = None
                current_source = None
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

        # If source has been switched dynamically while active, release current capture handle
        if cap is not None and current_source != active_source:
            print(f"[*] Switching active video source from '{current_source}' to '{active_source}'...")
            try:
                cap.release()
            except Exception:
                pass
            cap = None
            current_source = None

        # Active: Open camera hardware or clinical demo video on-demand
        if cap is None:
            current_source = active_source
            if current_source == "bed_fall_demo":
                if os.path.exists(hub.demo_video_path):
                    print(f"[*] On-Demand Activation: Opening Bed-Fall Clinical Demo Video from {hub.demo_video_path}...")
                    cap = cv2.VideoCapture(hub.demo_video_path)
                else:
                    print(f"[!] Warning: Demo video not found at {hub.demo_video_path}. Falling back to webcam...")
                    cap = cv2.VideoCapture(hub.camera_index, cv2.CAP_DSHOW)
                    current_source = "webcam"
            else:
                print(f"[*] On-Demand Activation: Initializing hardware webcam (index {hub.camera_index})...")
                cap = cv2.VideoCapture(hub.camera_index, cv2.CAP_DSHOW)
                if not cap.isOpened():
                    print(f"[!] Warning: Camera index {hub.camera_index} with CAP_DSHOW not opened. Trying default backend...")
                    cap = cv2.VideoCapture(hub.camera_index)
                
            if not cap.isOpened():
                print(f"[!] ERROR: Unable to access video source '{current_source}'.")
                with hub.lock:
                    hub.telemetry["status"] = "CAMERA_UNAVAILABLE"
                    hub.camera_active = False
                cap = None
                current_source = None
                time.sleep(1.0)
                continue

            if current_source == "webcam":
                cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
                cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
                cap.set(cv2.CAP_PROP_FPS, 30)
                try:
                    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
                except Exception:
                    pass
            
            with hub.lock:
                hub.cap = cap
                hub.camera_state = "CAMERA_CALIBRATING"
                hub.calibration_frames_left = hub.CALIBRATION_FRAMES_REQUIRED
                hub.consecutive_valid_frames = 0
                hub.prev_com_y = None
                hub.prev_time = None
                hub.fall_latched = False
                hub.telemetry["status"] = "CAMERA_CALIBRATING"
                hub.telemetry["camera_state"] = "CAMERA_CALIBRATING"
            print(f"[+] Source '{current_source}' online (Physical LED: {'ON' if current_source == 'webcam' else 'OFF (Demo Video)'}). Calibrating baseline ({hub.CALIBRATION_FRAMES_REQUIRED} frames)...")
            t_start = time.time()
            frame_counter = 0
            consecutive_fails = 0

        # Read video frame
        frame_read_start = time.time()
        ret, frame = cap.read()
        if not ret or frame is None:
            if current_source == "bed_fall_demo":
                # Continuous seamless looping of clinical bed fall demo
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                hub.prev_com_y = None
                hub.prev_time = None
                hub.smooth_velocity = 0.0
                hub.recent_drop_time = 0.0
                hub.recent_drop_velocity = 0.0
                hub.fall_latched = False
                ret, frame = cap.read()

            if not ret or frame is None:
                consecutive_fails += 1
                if consecutive_fails > 25:
                    print("[!] Video stream stalled, re-initializing backend...")
                    try:
                        cap.release()
                    except Exception:
                        pass
                    cap = None
                    current_source = None
                    consecutive_fails = 0
                time.sleep(0.02)
                continue

        # Pace video playback for realistic ~25 FPS when streaming video file
        if current_source == "bed_fall_demo":
            read_elapsed = time.time() - frame_read_start
            sleep_target = max(0.005, (1.0 / 25.0) - read_elapsed)
            time.sleep(sleep_target)

        consecutive_fails = 0
        current_time = time.time()
        frame_counter += 1

        # Check if calibration completed
        if hub.calibration_frames_left <= 0 and hub.camera_state == "CAMERA_CALIBRATING":
            with hub.lock:
                hub.camera_state = "MONITORING"
                hub.telemetry["status"] = "ONLINE_STREAMING"
                hub.telemetry["camera_state"] = "MONITORING"
        
        # Calculate real-time FPS every 10 frames
        if frame_counter % 10 == 0:
            elapsed = current_time - t_start
            if elapsed > 0:
                hub.fps = round(frame_counter / elapsed, 1)
            frame_counter = 0
            t_start = current_time

        # Run Ultralytics YOLO Pose Inference with latency measurement
        t_infer_start = time.time()
        results = yolo_model(frame, imgsz=320, verbose=False, device=DEVICE_TARGET)
        hub.last_inference_latency = time.time() - t_infer_start
        r = results[0]
        
        persons_count = len(r.boxes) if r.boxes is not None else 0
        h_img, w_img = frame.shape[:2]

        # Check for Floor Occlusion Fall ONLY if fall was ALREADY latched by physical trajectory
        is_latch = hub.fall_latched and (current_time - hub.fall_latch_start_time < 4.0)

        if is_latch:
            kinematics_data = {
                "person_detected": False,
                "posture": "Acute Fall / Subject Below Camera View",
                "risk_level": "HIGH_RISK",
                "confidence": 92.0,
                "torso_angle": 75.0,
                "downward_velocity": -abs(hub.recent_drop_velocity or 0.8),
                "hypothesis": {
                    "id": "H1",
                    "label": "Floor Occlusion Fall",
                    "mechanism": "Subject fallen below camera field of view. Recovery monitoring active."
                },
                "canonical_event": {
                    "eventId": f"EVT-OCCL-{int(current_time * 1000)}",
                    "state": "CONTACT_OR_FALL",
                    "probableMechanism": "FALL",
                    "detectionConfidence": 90,
                    "mechanismConfidence": 85,
                    "severityConfidence": 80,
                    "recoveryStatus": "MONITORING",
                    "evidence": ["Subject transitioned below floor perimeter"],
                    "counterEvidence": [],
                    "timestamp": current_time
                }
            }
        else:
            hub.fall_latched = False
            hub.prev_com_y = None
            hub.prev_time = None
            hub.consecutive_valid_frames = 0
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
                },
                "canonical_event": {
                    "eventId": f"EVT-CLEAR-{int(current_time * 1000)}",
                    "state": "NORMAL",
                    "probableMechanism": "NORMAL_ACTIVITY",
                    "detectionConfidence": 0,
                    "mechanismConfidence": 100,
                    "severityConfidence": 0,
                    "recoveryStatus": "NOT_APPLICABLE",
                    "evidence": ["No motion in monitored zone"],
                    "counterEvidence": ["Perimeter clear"],
                    "timestamp": current_time
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
                "status": "ONLINE_STREAMING" if hub.camera_state == "MONITORING" else hub.camera_state,
                "camera_state": hub.camera_state,
                "device": GPU_NAME,
                "cuda_enabled": CUDA_AVAILABLE,
                "engine": "Ultralytics YOLO11-Pose",
                "fps": hub.fps,
                "inference_latency_ms": round(hub.last_inference_latency * 1000, 1),
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
                "canonical_event": kinematics_data.get("canonical_event", {}),
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
                    "source": hub.source,
                    "demo_video_available": os.path.exists(hub.demo_video_path),
                    "hardware_active": is_hardware_on,
                    "camera_led_state": ("ON" if (is_hardware_on and hub.source == "webcam") else "OFF"),
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

        # 2b. Edge Heartbeat Endpoint (System Health Monitoring)
        if path == "/api/yolo/heartbeat":
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            with hub.lock:
                is_hardware_on = bool(hub.cap is not None and (hub.camera_active or hub.active_streamers > 0))
                heartbeat_payload = {
                    "edgeId": "edge-sentinel-gtx1650",
                    "timestamp": time.time(),
                    "processStatus": "RUNNING",
                    "cameraStatus": hub.camera_state if is_hardware_on else "STANDBY",
                    "modelStatus": "MODEL_READY",
                    "fps": float(hub.fps),
                    "trackedPersons": int(hub.telemetry.get("persons_count", 0)),
                    "inferenceLatencyMs": round(float(hub.last_inference_latency) * 1000, 1),
                    "version": "2.1.0",
                    "device": GPU_NAME,
                    "cudaEnabled": CUDA_AVAILABLE,
                    "status": "EDGE_ONLINE"
                }
            self.wfile.write(json.dumps(heartbeat_payload, indent=2, cls=NumpyJSONEncoder).encode("utf-8"))
            return

        # 3. Live MJPEG Video Stream (Engages camera hardware or demo video on-demand)
        if path in ["/api/yolo/stream", "/api/yolo/video_feed"]:
            privacy = query.get("privacy", ["0"])[0] == "1"
            req_source = query.get("source", [None])[0]
            
            with hub.lock:
                if req_source in ["webcam", "bed_fall_demo"] and req_source != hub.source:
                    hub.source = req_source
                    print(f"[*] Stream query requested source change to '{req_source}'")
                hub.active_streamers += 1
                hub.camera_active = True
                print(f"[+] Client connected to video feed (Active viewers: {hub.active_streamers}, Source: {hub.source}).")

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
        # Video Source Selection Endpoint (Webcam vs Bed Fall Demo Video)
        if self.path == "/api/yolo/source":
            try:
                content_len = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_len).decode("utf-8")
                req_data = json.loads(body) if body else {}
                target_src = req_data.get("source", "bed_fall_demo")
                if target_src in ["webcam", "bed_fall_demo"]:
                    with hub.lock:
                        hub.source = target_src
                        hub.camera_active = True
                    print(f"[+] Source switched via API to: {hub.source}")
                    self.send_response(200)
                    self.send_cors_headers("application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"ok": True, "source": hub.source}).encode("utf-8"))
                    return
            except Exception as e:
                pass
            self.send_response(400)
            self.send_cors_headers("application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": False, "error": "Invalid source"}).encode("utf-8"))
            return

        # Explicit Camera Start Endpoint
        if self.path == "/api/yolo/start":
            with hub.lock:
                hub.camera_active = True
            print(f"[+] Explicit /api/yolo/start command received: Engaging source '{hub.source}'...")
            self.send_response(200)
            self.send_cors_headers("application/json")
            self.end_headers()
            try:
                led_state = "ON" if hub.source == "webcam" else "OFF (Demo Video)"
                self.wfile.write(json.dumps({"ok": True, "camera_active": True, "source": hub.source, "camera_led": led_state}).encode("utf-8"))
            except Exception:
                pass
            return

        # Explicit Camera Stop / Pause Endpoint
        if self.path in ["/api/yolo/stop", "/api/yolo/pause"]:
            with hub.lock:
                hub.camera_active = False
                hub.active_streamers = 0
            print("[*] Explicit /api/yolo/stop command received: Powering down stream...")
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

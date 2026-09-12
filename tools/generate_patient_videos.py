"""
tools/generate_patient_videos.py
Generates authentic clinical patient monitoring CCTV video footages in MP4 format.
1. prototype/public/videos/room_302_patient.mp4  (Room 302 Main Overhead - Patient Anita Sharma resting with live monitor and Prajna skeletal AI)
2. prototype/public/videos/bedside_radar.mp4     (Bedside Infrared Fall-Detection Radar with virtual tripwire and floor radar scan)
"""

import math
import os
import subprocess
import sys
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

WIDTH, HEIGHT = 1280, 720
FPS = 30
DURATION_SEC = 5.0
TOTAL_FRAMES = int(FPS * DURATION_SEC) # 150 frames

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "prototype", "public", "videos")
os.makedirs(OUT_DIR, exist_ok=True)

print(f"Generating authentic medical surveillance videos using FFmpeg at {FFMPEG_EXE}...")

def get_font(size=14, bold=False):
    font_paths = [
        r"C:\Windows\Fonts\arial.ttf" if not bold else r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\segoeui.ttf" if not bold else r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\consola.ttf" if not bold else r"C:\Windows\Fonts\consolab.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

FONT_TITLE = get_font(20, bold=True)
FONT_MED = get_font(15, bold=True)
FONT_SM = get_font(12, bold=False)
FONT_MONO = get_font(13, bold=True)

def render_room_302_frame(frame_idx):
    t = frame_idx / TOTAL_FRAMES
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(226, 232, 240))
    draw = ImageDraw.Draw(img, "RGBA")

    # 1. Wall and Room Structure
    draw.rectangle([0, 0, WIDTH, 480], fill=(215, 226, 238))
    draw.rectangle([0, 360, WIDTH, 375], fill=(88, 110, 136))
    draw.rectangle([0, 375, WIDTH, 480], fill=(195, 208, 222))
    draw.rectangle([0, 480, WIDTH, HEIGHT], fill=(160, 175, 192))
    for x in range(0, WIDTH + 200, 160):
        draw.line([x - 120, HEIGHT, x, 480], fill=(148, 162, 178), width=1)
    draw.line([0, 560, WIDTH, 560], fill=(148, 162, 178), width=1)
    draw.line([0, 640, WIDTH, 640], fill=(148, 162, 178), width=1)

    # Left Window
    draw.rectangle([60, 80, 220, 340], fill=(235, 243, 250), outline=(130, 150, 175), width=4)
    for y in range(95, 335, 18):
        draw.line([64, y, 216, y], fill=(200, 218, 235), width=2)
    draw.polygon([(100, 480), (320, HEIGHT), (160, HEIGHT), (60, 480)], fill=(255, 255, 255, 28))

    # Room Door on Right
    draw.rectangle([1120, 110, 1260, 480], fill=(180, 195, 210), outline=(140, 158, 178), width=3)
    draw.rectangle([1140, 140, 1240, 240], fill=(210, 225, 240), outline=(140, 158, 178), width=2)
    draw.ellipse([1135, 305, 1147, 317], fill=(100, 115, 130))

    # Bed Shadow
    draw.ellipse([340, 500, 980, 610], fill=(120, 135, 150, 90))

    # 2. Medical Care Bed
    draw.rectangle([340, 250, 390, 450], fill=(160, 175, 190), outline=(100, 115, 130), width=2)
    draw.polygon([(380, 390), (940, 430), (940, 480), (380, 450)], fill=(120, 135, 150))
    draw.rectangle([400, 450, 420, 540], fill=(70, 80, 95))
    draw.ellipse([395, 530, 425, 550], fill=(40, 50, 60))
    draw.rectangle([900, 470, 920, 550], fill=(70, 80, 95))
    draw.ellipse([895, 540, 925, 560], fill=(40, 50, 60))

    # White Hospital Mattress
    draw.polygon([(370, 360), (960, 400), (960, 435), (370, 395)], fill=(245, 250, 255), outline=(180, 195, 210), width=2)

    # Pillows
    draw.polygon([(390, 310), (490, 325), (480, 370), (380, 355)], fill=(240, 245, 250), outline=(210, 220, 230), width=1)
    draw.polygon([(410, 300), (510, 315), (500, 355), (400, 340)], fill=(255, 255, 255), outline=(210, 220, 230), width=1)

    # 3. Patient: Anita Sharma (Respiration movement)
    breath_cycle = math.sin(t * 2 * math.pi * 2.0)
    chest_lift = breath_cycle * 4.5
    head_micro = math.sin(t * 2 * math.pi * 0.5) * 1.0

    head_x = 445 + head_micro
    head_y = 315
    draw.ellipse([head_x - 22, head_y - 20, head_x + 22, head_y + 22], fill=(175, 180, 188))
    draw.ellipse([head_x - 12, head_y - 14, head_x + 22, head_y + 16], fill=(228, 185, 155))
    draw.arc([head_x + 4, head_y - 3, head_x + 14, head_y + 5], start=0, end=180, fill=(110, 85, 70), width=2)
    draw.line([head_x + 16, head_y + 2, head_x + 21, head_y + 7], fill=(210, 165, 135), width=2)
    draw.line([head_x + 21, head_y + 7, head_x + 15, head_y + 11], fill=(210, 165, 135), width=2)

    draw.rectangle([head_x - 5, head_y + 14, head_x + 25, head_y + 35], fill=(215, 175, 145))
    draw.polygon([(460, 335), (530, 345), (515, 385), (450, 370)], fill=(200, 225, 235))

    b_top = 345 - chest_lift
    draw.polygon([
        (460, b_top + 10),
        (580, b_top - 5),
        (720, 370 - chest_lift * 0.5),
        (920, 405),
        (930, 440),
        (470, 415),
    ], fill=(32, 100, 118), outline=(22, 75, 90), width=2)

    draw.line([465, b_top + 15, 570, b_top], fill=(255, 255, 255), width=5)
    draw.line([540, b_top + 30, 680, 385], fill=(24, 82, 98), width=2)
    draw.line([660, 385, 840, 415], fill=(24, 82, 98), width=2)

    # Pulse Oximeter on Patient Hand
    draw.ellipse([540, 380, 568, 396], fill=(225, 180, 150))
    draw.rectangle([562, 382, 575, 392], fill=(240, 245, 250), outline=(50, 100, 180), width=1)
    if (frame_idx % 15) < 8:
        draw.ellipse([566, 385, 570, 389], fill=(255, 40, 40))
    draw.line([575, 387, 595, 395], fill=(70, 80, 90), width=1)
    draw.line([595, 395, 330, 320], fill=(70, 80, 90, 120), width=1)

    # Bed Safety Guard Rails
    for rx in range(480, 820, 35):
        draw.line([rx, 380, rx, 350], fill=(220, 230, 240), width=4)
        draw.line([rx, 380, rx, 350], fill=(160, 175, 190), width=2)
    draw.line([475, 350, 825, 350], fill=(240, 245, 255), width=6)
    draw.line([475, 350, 825, 350], fill=(160, 175, 190), width=2)

    # 4. Bedside Vital Signs Monitor & IV Stand
    draw.line([290, 140, 290, 530], fill=(180, 190, 200), width=4)
    draw.line([290, 530, 260, 560], fill=(140, 150, 160), width=3)
    draw.line([290, 530, 320, 560], fill=(140, 150, 160), width=3)
    draw.polygon([(275, 160), (305, 160), (302, 220), (278, 220)], fill=(240, 248, 255, 220), outline=(170, 190, 210), width=2)
    draw.line([290, 180, 290, 210], fill=(59, 130, 246, 180), width=2)
    draw.line([290, 220, 290, 250], fill=(200, 210, 220), width=1)

    # Monitor
    mon_x, mon_y, mon_w, mon_h = 240, 250, 110, 90
    draw.rectangle([mon_x, mon_y, mon_x + mon_w, mon_y + mon_h], fill=(30, 41, 59), outline=(71, 85, 105), width=3)
    draw.rectangle([mon_x + 5, mon_y + 5, mon_x + mon_w - 5, mon_y + mon_h - 5], fill=(10, 15, 26))

    # Sweeping ECG Waveform
    sweep_x = int((frame_idx * 4) % (mon_w - 14)) + mon_x + 7
    ecg_points = []
    for px in range(mon_x + 7, mon_x + mon_w - 7, 2):
        rel = (px - mon_x - 7) % 32
        base_y = mon_y + 30
        if rel == 10: wy = base_y - 12
        elif rel == 12: wy = base_y + 6
        elif rel == 8: wy = base_y + 3
        elif rel == 18: wy = base_y - 4
        else: wy = base_y
        ecg_points.append((px, wy))

    for i in range(len(ecg_points) - 1):
        p1, p2 = ecg_points[i], ecg_points[i+1]
        dist = (sweep_x - p1[0]) % (mon_w - 14)
        alpha = 255 if dist < (mon_w - 20) else 70
        draw.line([p1, p2], fill=(16, 185, 129, alpha), width=2)

    draw.text((mon_x + 8, mon_y + 44), "HR  85", fill=(16, 185, 129), font=FONT_SM)
    draw.text((mon_x + 8, mon_y + 60), "SpO2 98%", fill=(14, 165, 233), font=FONT_SM)
    draw.text((mon_x + 60, mon_y + 44), "149/97", fill=(245, 158, 11), font=FONT_SM)
    draw.text((mon_x + 60, mon_y + 60), "RR 16", fill=(248, 113, 113), font=FONT_SM)

    # Bedside Table
    draw.rectangle([130, 430, 220, 520], fill=(210, 220, 230), outline=(160, 175, 190), width=2)
    draw.rectangle([150, 400, 175, 430], fill=(230, 240, 250, 200), outline=(140, 160, 180), width=1)
    draw.rectangle([185, 412, 198, 430], fill=(240, 245, 250), outline=(140, 160, 180), width=1)

    # 5. Prajna AI Computer Vision Overlay
    box_x1, box_y1 = 410, 275 - int(chest_lift * 0.5)
    box_x2, box_y2 = 940, 460
    c_color = (16, 185, 129, 230)
    c_len = 22
    draw.line([box_x1, box_y1, box_x1 + c_len, box_y1], fill=c_color, width=3)
    draw.line([box_x1, box_y1, box_x1, box_y1 + c_len], fill=c_color, width=3)
    draw.line([box_x2, box_y1, box_x2 - c_len, box_y1], fill=c_color, width=3)
    draw.line([box_x2, box_y1, box_x2, box_y1 + c_len], fill=c_color, width=3)
    draw.line([box_x1, box_y2, box_x1 + c_len, box_y2], fill=c_color, width=3)
    draw.line([box_x1, box_y2, box_x1, box_y2 - c_len], fill=c_color, width=3)
    draw.line([box_x2, box_y2, box_x2 - c_len, box_y2], fill=c_color, width=3)
    draw.line([box_x2, box_y2, box_x2, box_y2 - c_len], fill=c_color, width=3)

    draw.rectangle([box_x1, box_y1 - 24, box_x1 + 350, box_y1], fill=(15, 23, 42, 220))
    draw.text((box_x1 + 8, box_y1 - 20), "PATIENT_01: ANITA SHARMA (67F) | 99.4% CONF", fill=(52, 211, 153), font=FONT_MONO)

    # Pose estimation vectors
    s_head = (int(head_x), int(head_y))
    s_neck = (int(head_x + 15), int(head_y + 25))
    s_l_shoulder = (490, int(330 - chest_lift))
    s_r_shoulder = (530, int(340 - chest_lift * 0.8))
    s_elbow = (550, int(370 - chest_lift * 0.3))
    s_wrist = (565, 388)
    s_spine = (600, int(355 - chest_lift * 0.5))
    s_hip = (700, int(375 - chest_lift * 0.2))
    s_knee = (820, 395)
    s_ankle = (910, 415)

    skel_bones = [
        (s_head, s_neck), (s_neck, s_l_shoulder), (s_neck, s_r_shoulder),
        (s_r_shoulder, s_elbow), (s_elbow, s_wrist),
        (s_neck, s_spine), (s_spine, s_hip), (s_hip, s_knee), (s_knee, s_ankle)
    ]
    for b1, b2 in skel_bones:
        draw.line([b1, b2], fill=(6, 182, 212, 170), width=2)
    for pt in [s_head, s_neck, s_l_shoulder, s_r_shoulder, s_elbow, s_wrist, s_spine, s_hip, s_knee, s_ankle]:
        draw.ellipse([pt[0]-4, pt[1]-4, pt[0]+4, pt[1]+4], fill=(52, 211, 153), outline=(15, 23, 42), width=1)

    draw.rectangle([box_x1 + 10, box_y2 - 24, box_x1 + 270, box_y2], fill=(15, 23, 42, 200))
    draw.text((box_x1 + 16, box_y2 - 20), "POSTURE: SUPINE RESTING · FALL RISK: LOW", fill=(255, 255, 255), font=FONT_SM)

    # 6. CCTV Surveillance HUD
    draw.rectangle([0, 0, WIDTH, 48], fill=(10, 15, 26, 210))
    draw.line([0, 48, WIDTH, 48], fill=(51, 65, 85), width=1)
    rec_active = (int(t * 5) % 2) == 0
    draw.ellipse([24, 18, 36, 30], fill=(239, 68, 68) if rec_active else (120, 30, 30))
    draw.text((44, 14), "REC", fill=(239, 68, 68) if rec_active else (180, 80, 80), font=FONT_MED)
    draw.text((88, 15), "CAM-01: ROOM 302 OVERHEAD · JUNGLIGHAT", fill=(241, 245, 249), font=FONT_MED)

    sec_offset = int(t * 5)
    draw.text((WIDTH - 420, 15), f"2026-09-12  15:30:{sec_offset:02d} IST · 1080p 30FPS", fill=(203, 213, 225), font=FONT_MONO)

    draw.rectangle([0, HEIGHT - 36, WIDTH, HEIGHT], fill=(10, 15, 26, 210))
    draw.line([0, HEIGHT - 36, WIDTH, HEIGHT - 36], fill=(51, 65, 85), width=1)
    draw.text((24, HEIGHT - 26), "PRAJNA EDGE VISION v2.8 · ON-DEVICE INFERENCE · ZERO RAW VIDEO STORED", fill=(148, 163, 184), font=FONT_SM)
    draw.text((WIDTH - 360, HEIGHT - 26), "DPDP ACT 2023 COMPLIANT · STREAM 24ms", fill=(52, 211, 153), font=FONT_SM)

    return img

def render_bedside_radar_frame(frame_idx):
    t = frame_idx / TOTAL_FRAMES
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(13, 20, 32))
    draw = ImageDraw.Draw(img, "RGBA")

    # Dark Room with Infrared Green/Slate Ambience
    draw.rectangle([0, 0, WIDTH, 420], fill=(18, 28, 44))
    draw.line([0, 420, WIDTH, 420], fill=(30, 48, 72), width=2)
    draw.rectangle([0, 420, WIDTH, HEIGHT], fill=(10, 16, 26))

    # Radar Safety Floor Grid
    for x in range(120, WIDTH, 80):
        draw.line([x - 140, HEIGHT, x, 420], fill=(20, 83, 45, 90), width=1)
    for y in range(450, HEIGHT, 45):
        draw.line([0, y, WIDTH, y], fill=(20, 83, 45, 90), width=1)

    # Bed in Side-Angle Infrared
    draw.polygon([(260, 280), (1050, 280), (1050, 440), (260, 440)], fill=(28, 42, 60), outline=(45, 68, 96), width=2)
    draw.rectangle([260, 440, 280, 520], fill=(20, 30, 45))
    draw.rectangle([1030, 440, 1050, 520], fill=(20, 30, 45))

    lift = math.sin(t * 2 * math.pi * 2.0) * 4.0
    draw.ellipse([340, 250, 400, 300], fill=(75, 95, 115), outline=(110, 140, 170), width=1)
    draw.polygon([
        (390, 270 - lift),
        (620, 260 - lift),
        (850, 290),
        (1000, 310),
        (1000, 380),
        (390, 380)
    ], fill=(45, 75, 90), outline=(56, 189, 248, 120), width=2)

    for rx in range(420, 920, 45):
        draw.line([rx, 290, rx, 240], fill=(80, 105, 130), width=3)
    draw.line([410, 240, 930, 240], fill=(120, 150, 180), width=4)

    # Optical Radar Sweep Beam
    scan_x = int(t * WIDTH)
    draw.line([scan_x, 0, scan_x, HEIGHT], fill=(52, 211, 153, 220), width=3)
    draw.polygon([
        (scan_x - 35, 0), (scan_x, 0), (scan_x, HEIGHT), (scan_x - 35, HEIGHT)
    ], fill=(52, 211, 153, 35))

    # Virtual Bed-Exit Tripwire
    trip_y = 445
    draw.line([220, trip_y, 1080, trip_y], fill=(245, 158, 11, 230), width=3)
    for tx in [240, 440, 640, 840, 1060]:
        draw.ellipse([tx - 5, trip_y - 5, tx + 5, trip_y + 5], fill=(245, 158, 11), outline=(255, 255, 255), width=1)

    draw.rectangle([540, trip_y + 8, 800, trip_y + 30], fill=(15, 23, 42, 220))
    draw.text((550, trip_y + 11), "VIRTUAL TRIPWIRE · FALL GUARD ARMED", fill=(251, 191, 36), font=FONT_SM)

    # CoM Marker
    com_x = 580
    com_y = int(320 - lift * 0.6)
    draw.ellipse([com_x - 16, com_y - 16, com_x + 16, com_y + 16], outline=(14, 165, 233), width=2)
    draw.line([com_x - 22, com_y, com_x + 22, com_y], fill=(14, 165, 233), width=1)
    draw.line([com_x, com_y - 22, com_x, com_y + 22], fill=(14, 165, 233), width=1)
    draw.text((com_x + 22, com_y - 8), "CoM: STABLE (0.04g)", fill=(56, 189, 248), font=FONT_SM)

    # Infrared HUD
    draw.rectangle([0, 0, WIDTH, 48], fill=(8, 14, 24, 230))
    draw.line([0, 48, WIDTH, 48], fill=(30, 41, 59), width=1)
    draw.ellipse([24, 18, 36, 30], fill=(16, 185, 129))
    draw.text((44, 15), "RADAR-ACTIVE", fill=(52, 211, 153), font=FONT_MED)
    draw.text((180, 15), "CAM-02: BEDSIDE FALL RADAR · NIGHT GUARD ZONE", fill=(226, 232, 240), font=FONT_MED)

    sec_offset = int(t * 5)
    draw.text((WIDTH - 420, 15), f"2026-09-12  15:30:{sec_offset:02d} IST · RADAR 30FPS", fill=(148, 163, 184), font=FONT_MONO)

    draw.rectangle([0, HEIGHT - 36, WIDTH, HEIGHT], fill=(8, 14, 24, 230))
    draw.line([0, HEIGHT - 36, WIDTH, HEIGHT - 36], fill=(30, 41, 59), width=1)
    draw.text((24, HEIGHT - 26), "FALL DETECTION STATUS: ZERO MOVEMENT ANOMALIES · ZONE CLEAR", fill=(52, 211, 153), font=FONT_SM)
    draw.text((WIDTH - 360, HEIGHT - 26), "EDGE LATENCY: 22ms · NO CLOUD VIDEO", fill=(148, 163, 184), font=FONT_SM)

    return img

def build_mp4(render_func, output_filename):
    out_path = os.path.join(OUT_DIR, output_filename)
    print(f"Rendering {TOTAL_FRAMES} frames for {output_filename}...")
    cmd = [
        FFMPEG_EXE,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "baseline",
        "-level", "3.0",
        "-movflags", "+faststart",
        "-preset", "fast",
        "-crf", "22",
        out_path
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for i in range(TOTAL_FRAMES):
        frame = render_func(i)
        proc.stdin.write(frame.tobytes())
        if (i + 1) % 30 == 0:
            print(f"  [{output_filename}] {i + 1}/{TOTAL_FRAMES} frames encoded...", flush=True)
    proc.stdin.close()
    proc.wait()
    if proc.returncode != 0:
        print(f"Error building {output_filename}", file=sys.stderr, flush=True)
        return False
    size_kb = os.path.getsize(out_path) / 1024
    print(f"SUCCESS: Generated {output_filename} ({size_kb:.1f} KB) at {out_path}", flush=True)
    return True

if __name__ == "__main__":
    ok1 = build_mp4(render_room_302_frame, "room_302_patient.mp4")
    ok2 = build_mp4(render_bedside_radar_frame, "bedside_radar.mp4")
    if ok1 and ok2:
        print("\nALL MEDICAL SURVEILLANCE VIDEOS GENERATED SUCCESSFULLY!")

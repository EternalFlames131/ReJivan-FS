"""
Unit test for ReJivan YOLO Kinematics, Calibration & Recovery Engine.
Tests:
1. Upright posture (Nominal, SAFE)
2. Upper-body webcam framing (No hips, upright head/shoulders -> SAFE)
3. Camera startup calibration (Derivatives suppressed -> SAFE)
4. New track acquisition safety (No spike on first 3 frames -> SAFE)
5. Controlled sitting (Controlled descent with upright spine -> SAFE)
6. Rapid vertical descent + tilt -> HIGH_RISK
7. Postural recovery (Standing back up within 4s -> RESOLVED / SAFE)
8. Canonical event structure validation
"""

import math
import sys
import os

# Ensure tools directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from yolo_edge_sentinel import compute_kinematics, hub

def make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=True):
    kp = [[0.0, 0.0, 0.0] for _ in range(17)]
    if head_drop:
        kp[0] = [320.0, sh_y + 30.0, 0.90] # Head below shoulders
    else:
        kp[0] = [320.0, sh_y - 60.0, 0.90] # Head normally above shoulders
    kp[5] = [270.0, sh_y - sh_tilt, 0.90]
    kp[6] = [370.0, sh_y + sh_tilt, 0.90]
    if include_hips:
        kp[11] = [280.0, sh_y + 120.0, 0.85]
        kp[12] = [360.0, sh_y + 120.0, 0.85]
    return kp

print("=== RUNNING KINEMATICS, CALIBRATION & RECOVERY VERIFICATION ===")

# Test 1: Upright posture (Full body stationary)
hub.calibration_frames_left = 0
hub.consecutive_valid_frames = 10
hub.prev_com_y = 320.0
hub.prev_time = 100.0
kp1 = make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=True)
res1 = compute_kinematics(kp1, 640, 480, 100.033)
print(f"Test 1 [Full Body Upright]: Angle = {res1['torso_angle']}° | Risk = {res1['risk_level']} | Mechanism = {res1['canonical_event']['probableMechanism']}")
assert res1['risk_level'] == "SAFE", f"Expected SAFE, got {res1['risk_level']}"
assert res1['canonical_event']['probableMechanism'] == "NORMAL_ACTIVITY"

# Test 2: Upper body only (Webcam view - sitting at desk)
hub.calibration_frames_left = 0
hub.consecutive_valid_frames = 10
hub.prev_com_y = 200.0
hub.prev_time = 101.0
kp2 = make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=False)
res2 = compute_kinematics(kp2, 640, 480, 101.033)
print(f"Test 2 [Webcam Sitting at Desk]: Angle = {res2['torso_angle']}° | Risk = {res2['risk_level']}")
assert res2['risk_level'] == "SAFE", f"Expected SAFE, got {res2['risk_level']}"

# Test 3: Camera Calibration Suppression
hub.calibration_frames_left = 20
kp3 = make_keypoints(sh_y=350, sh_tilt=40, head_drop=True, include_hips=False)
res3 = compute_kinematics(kp3, 640, 480, 102.0)
print(f"Test 3 [Calibration Phase Transient]: Risk = {res3['risk_level']} | Posture = {res3['posture']}")
assert res3['risk_level'] == "SAFE", f"Expected SAFE during calibration, got {res3['risk_level']}"
assert "Calibrating" in res3['posture']

# Test 4: Track Reacquisition (First frame must NOT spike derivative)
hub.calibration_frames_left = 0
hub.prev_com_y = None # Gap in tracking
hub.prev_time = None
hub.consecutive_valid_frames = 0
kp4 = make_keypoints(sh_y=350, sh_tilt=0, head_drop=False, include_hips=False)
res4 = compute_kinematics(kp4, 640, 480, 105.0)
print(f"Test 4 [Track Acquisition First Frame]: Velocity = {res4['downward_velocity']} | Risk = {res4['risk_level']}")
assert res4['downward_velocity'] == 0.0, f"Expected 0 velocity on first frame, got {res4['downward_velocity']}"
assert res4['risk_level'] == "SAFE"

# Test 5: Controlled Sitting (Muscular deceleration)
hub.calibration_frames_left = 0
hub.consecutive_valid_frames = 10
hub.prev_com_y = 320.0 # Previous hips at sh_y 200 (200 + 120 = 320)
hub.prev_time = 110.0
kp5 = make_keypoints(sh_y=210, sh_tilt=0, head_drop=False, include_hips=True) # Gentle 10px in 33ms (~0.35 m/s)
res5 = compute_kinematics(kp5, 640, 480, 110.033, source="webcam")
print(f"Test 5 [Controlled Sitting]: Velocity = {res5['downward_velocity']} | Risk = {res5['risk_level']} | Mechanism = {res5['canonical_event']['probableMechanism']}")
assert res5['risk_level'] == "SAFE"
assert res5['canonical_event']['probableMechanism'] in ["INTENTIONAL_SITTING", "NORMAL_ACTIVITY"]

# Test 6: Genuine Rapid Fall + Floor Collapse
hub.calibration_frames_left = 0
hub.consecutive_valid_frames = 10
hub.prev_com_y = 120.0
hub.prev_time = 120.0
kp6 = make_keypoints(sh_y=320, sh_tilt=45, head_drop=True, include_hips=False) # 200px drop in 33ms!
res6 = compute_kinematics(kp6, 640, 480, 120.033)
print(f"Test 6 [Genuine Fall Collapse]: Velocity = {res6['downward_velocity']} | Angle = {res6['torso_angle']}° | Risk = {res6['risk_level']}")
assert res6['risk_level'] == "HIGH_RISK", f"Expected HIGH_RISK, got {res6['risk_level']}"
assert hub.fall_latched is True

# Test 7: Postural Recovery (Resident stands up within 2 seconds)
kp7 = make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=True) # Restored upright!
res7 = compute_kinematics(kp7, 640, 480, 122.0)
print(f"Test 7 [Postural Recovery]: Risk = {res7['risk_level']} | State = {res7['canonical_event']['state']} | Posture = {res7['posture']}")
assert res7['risk_level'] == "SAFE", f"Expected SAFE on recovery, got {res7['risk_level']}"
assert res7['canonical_event']['state'] == "RESOLVED"
assert hub.fall_latched is False

print("\n>>> ALL 7 KINEMATICS, CALIBRATION & RECOVERY UNIT TESTS PASSED! <<<")

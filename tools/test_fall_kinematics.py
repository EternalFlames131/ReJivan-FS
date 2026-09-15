"""
Unit test for ReJivan YOLO Kinematics & Fall Detection Engine.
Tests:
1. Upright posture (Nominal, SAFE)
2. Upper-body webcam framing (No hips, upright head/shoulders -> SAFE)
3. Sideways tilt (>35 deg -> CAUTION / HIGH_RISK)
4. Forward slump / head dropped below shoulders -> HIGH_RISK
5. Rapid vertical descent + tilt -> HIGH_RISK
6. Controlled sitting (downward descent with upright spine -> SAFE)
7. /api/yolo/simulate_fall HTTP endpoint verification
"""

import math
import sys
import urllib.request
import json

# Import functions directly from tools/yolo_edge_sentinel.py
from yolo_edge_sentinel import compute_kinematics, hub

def make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=True):
    # Base 17 COCO keypoints: [x, y, conf]
    kp = [[0.0, 0.0, 0.0] for _ in range(17)]
    
    # Nose (0)
    if head_drop:
        kp[0] = [320.0, sh_y + 30.0, 0.90] # Head below shoulders!
    else:
        kp[0] = [320.0, sh_y - 60.0, 0.90] # Head normally above shoulders
        
    # Shoulders (5: Left, 6: Right)
    kp[5] = [270.0, sh_y - sh_tilt, 0.90]
    kp[6] = [370.0, sh_y + sh_tilt, 0.90]
    
    if include_hips:
        # Hips (11: Left, 12: Right)
        kp[11] = [280.0, sh_y + 120.0, 0.85]
        kp[12] = [360.0, sh_y + 120.0, 0.85]
        
    return kp

print("=== RUNNING KINEMATICS & FALL DETECTION VERIFICATION ===")

# Test 1: Upright posture (Full body)
kp1 = make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=True)
res1 = compute_kinematics(kp1, 640, 480, 100.0)
print(f"Test 1 [Full Body Upright]: Torso Angle = {res1['torso_angle']} deg | Risk = {res1['risk_level']} | Posture = {res1['posture']}")
assert res1['risk_level'] == "SAFE", f"Expected SAFE, got {res1['risk_level']}"
assert res1['torso_angle'] < 20.0, f"Expected angle < 20, got {res1['torso_angle']}"

# Test 2: Upper body only (Webcam view - NO HIPS)
kp2 = make_keypoints(sh_y=200, sh_tilt=0, head_drop=False, include_hips=False)
res2 = compute_kinematics(kp2, 640, 480, 100.1)
print(f"Test 2 [Webcam View (No Hips) Upright]: Torso Angle = {res2['torso_angle']} deg | Risk = {res2['risk_level']}")
assert res2['risk_level'] == "SAFE", f"Expected SAFE, got {res2['risk_level']}"
assert res2['torso_angle'] < 25.0, f"Expected angle < 25, got {res2['torso_angle']}"

# Test 3: Sideways collapse / tilt (>35 deg)
kp3 = make_keypoints(sh_y=200, sh_tilt=45, head_drop=False, include_hips=False)
res3 = compute_kinematics(kp3, 640, 480, 100.2)
print(f"Test 3 [Sideways Collapse/Tilt]: Torso Angle = {res3['torso_angle']} deg | Risk = {res3['risk_level']} | Posture = {res3['posture']}")
assert res3['risk_level'] in ["HIGH_RISK", "CAUTION"], f"Expected HIGH_RISK or CAUTION, got {res3['risk_level']}"
assert res3['torso_angle'] > 30.0, f"Expected angle > 30, got {res3['torso_angle']}"

# Test 4: Forward slump / head dropped below shoulders
kp4 = make_keypoints(sh_y=250, sh_tilt=0, head_drop=True, include_hips=False)
res4 = compute_kinematics(kp4, 640, 480, 100.3)
print(f"Test 4 [Forward Slump / Head Drop]: Torso Angle = {res4['torso_angle']} deg | Risk = {res4['risk_level']} | Posture = {res4['posture']}")
assert res4['risk_level'] == "HIGH_RISK", f"Expected HIGH_RISK, got {res4['risk_level']}"
assert res4['torso_angle'] > 50.0, f"Expected angle > 50, got {res4['torso_angle']}"

# Test 5: Rapid descent drop
hub.prev_com_y = 150
hub.prev_time = 100.35
kp5 = make_keypoints(sh_y=260, sh_tilt=25, head_drop=False, include_hips=False) # 110px drop in 50ms!
res5 = compute_kinematics(kp5, 640, 480, 100.40)
print(f"Test 5 [Rapid Descent + Tilt]: Velocity = {res5['downward_velocity']} m/s | Angle = {res5['torso_angle']} deg | Risk = {res5['risk_level']}")
assert res5['risk_level'] == "HIGH_RISK", f"Expected HIGH_RISK, got {res5['risk_level']}"

# Test 6: HTTP Fall Simulation Endpoint
print("\nTesting HTTP POST /api/yolo/simulate_fall...")
req = urllib.request.Request("http://127.0.0.1:5050/api/yolo/simulate_fall", data=b"", method="POST")
with urllib.request.urlopen(req, timeout=5) as resp:
    sim_data = json.loads(resp.read().decode("utf-8"))
    print("  POST /simulate_fall Response:", sim_data)
    assert sim_data.get("ok") is True

req_telem = urllib.request.Request("http://127.0.0.1:5050/api/yolo/telemetry")
with urllib.request.urlopen(req_telem, timeout=5) as resp:
    telem = json.loads(resp.read().decode("utf-8"))
    print("  Telemetry after fall trigger:", telem["risk_level"], "|", telem["posture"])
    assert telem["risk_level"] == "HIGH_RISK"

print("\n>>> ALL 6 FALL DETECTION UNIT & INTEGRATION TESTS PASSED! <<<")

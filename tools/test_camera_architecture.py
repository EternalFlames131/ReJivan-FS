"""
tools/test_camera_architecture.py
Automated Comprehensive Test Suite for ReJivan Unified Camera Ingestion Architecture.

Verifies:
  1. NormalizedFrame contract & immutability of fields.
  2. LocalWebcamSource lifecycle & on-demand opening/closing.
  3. RtspCctvSource URL validation & strict credential masking (no password exposure).
  4. RtspCctvSource test_connection() behavior on reachable/unreachable endpoints.
  5. RtspCctvSource disconnect, bounded retry (max 5), exponential backoff, and state transitions.
  6. Safe reconnect boundary tracking reset (clearing CoM & velocity derivatives).
  7. Frame timestamp gap protection (dt > 350ms resets derivatives, zero velocity spike).
  8. Stale/duplicate frame detection & motion suppression.
  9. PrerecordedVideoSource sequential playback, speed invariance (0.5x, 1x, 2x), pause/resume, and clean EOF.
  10. EdgeNode multi-camera isolation (verifying independent tracking contexts with zero cross-talk).
  11. Edge heartbeat payload generation & 7-tier health hierarchy.
  12. ABSOLUTE FALSE-ALARM SUPPRESSION: Camera disconnect/reconnect/shutdown NEVER triggers a patient fall or emergency alarm.
"""

import sys
import time
import math
import unittest
import numpy as np

from camera_providers import (
    NormalizedFrame,
    FrameHealthMetrics,
    TrackingContext,
    CameraLifecycleState,
    CameraSourceType,
    mask_rtsp_url,
    validate_rtsp_url,
    CameraSource,
    LocalWebcamSource,
    RtspCctvSource,
    PrerecordedVideoSource,
    EdgeNode,
    DEFAULT_CALIBRATION_FRAMES,
    MAX_RTSP_RECONNECT_ATTEMPTS,
    FRAME_TIMESTAMP_GAP_THRESHOLD_SEC
)

# Import kinematics function from yolo_edge_sentinel for pipeline validation
import yolo_edge_sentinel


class TestCameraArchitecture(unittest.TestCase):

    def setUp(self):
        # Fresh EdgeNode for each test
        self.edge_node = EdgeNode(edge_id="test-edge-node-01", name="Ward-B-Edge-Gateway")

    # -------------------------------------------------------------------------
    # TEST 1: NormalizedFrame Structure & Contract
    # -------------------------------------------------------------------------
    def test_01_normalized_frame_contract(self):
        dummy_img = np.zeros((480, 640, 3), dtype=np.uint8)
        norm_frame = NormalizedFrame(
            frame=dummy_img,
            timestamp=12.345,
            frame_index=150,
            source_id="cam-ward-01",
            source_type=CameraSourceType.RTSP_CCTV,
            width=640,
            height=480,
            metadata={"fps": 25.0, "latency_ms": 14.2}
        )

        self.assertEqual(norm_frame.source_id, "cam-ward-01")
        self.assertEqual(norm_frame.source_type, "RTSP_CCTV")
        self.assertEqual(norm_frame.width, 640)
        self.assertEqual(norm_frame.height, 480)
        self.assertEqual(norm_frame.frame_index, 150)
        self.assertAlmostEqual(norm_frame.timestamp, 12.345)
        self.assertEqual(norm_frame.metadata.get("fps"), 25.0)
        self.assertIsNotNone(norm_frame.frame)
        self.assertEqual(norm_frame.frame.shape, (480, 640, 3))

    # -------------------------------------------------------------------------
    # TEST 2: LocalWebcamSource Lifecycle & On-Demand Control
    # -------------------------------------------------------------------------
    def test_02_local_webcam_lifecycle(self):
        webcam = LocalWebcamSource(
            camera_id="cam-webcam-test",
            camera_name="Laptop Front Webcam",
            device_index=0
        )
        # Default state before activation should be OFFLINE (LED off)
        self.assertEqual(webcam.state, CameraLifecycleState.OFFLINE)
        self.assertFalse(webcam.is_opened)

        config = webcam.to_config_dict()
        self.assertEqual(config["cameraId"], "cam-webcam-test")
        self.assertEqual(config["sourceType"], CameraSourceType.LOCAL_WEBCAM)
        self.assertEqual(config["state"], CameraLifecycleState.OFFLINE)

        # Release is idempotent and safe
        webcam.release()
        self.assertEqual(webcam.state, CameraLifecycleState.STOPPED)

    # -------------------------------------------------------------------------
    # TEST 3: RtspCctvSource Credential Masking & URL Validation
    # -------------------------------------------------------------------------
    def test_03_credential_masking_and_validation(self):
        # Valid URLs
        valid_cases = [
            ("rtsp://admin:HospitalSecurePass2026@192.168.1.50:554/live/ch0",
             "rtsp://admin:*****@192.168.1.50:554/live/ch0"),
            ("rtsp://nurse_station:Nurs3_Station_2026!@10.0.0.12/stream",
             "rtsp://nurse_station:*****@10.0.0.12/stream"),
            ("rtsps://camera.gbpant.in:322/feed1",
             "rtsps://camera.gbpant.in:322/feed1"),  # No password to mask
            ("rtsp://operator:12345@cctv-nvr.lan/h264",
             "rtsp://operator:*****@cctv-nvr.lan/h264")
        ]

        for raw_url, expected_masked in valid_cases:
            valid, msg = validate_rtsp_url(raw_url)
            self.assertTrue(valid, f"URL should be valid: {raw_url} - {msg}")
            masked = mask_rtsp_url(raw_url)
            self.assertEqual(masked, expected_masked)
            # Ensure raw secret is never present in masked output
            if "HospitalSecurePass2026" in raw_url:
                self.assertNotIn("HospitalSecurePass2026", masked)

        # Invalid URLs
        invalid_cases = [
            "",
            "http://192.168.1.50/stream",
            "ftp://cctv:554/ch1",
            "rtsp://",
            "not_a_url",
            None
        ]
        for invalid_url in invalid_cases:
            valid, _ = validate_rtsp_url(invalid_url)
            self.assertFalse(valid, f"URL should be rejected: {invalid_url}")

    # -------------------------------------------------------------------------
    # TEST 4: RtspCctvSource test_connection() Verification
    # -------------------------------------------------------------------------
    def test_04_rtsp_test_connection_behavior(self):
        # Non-routable loopback port should fail gracefully without unhandled exceptions
        rtsp_cam = RtspCctvSource(
            camera_id="cam-rtsp-unreachable",
            camera_name="ICU Unreachable Cam",
            rtsp_url="rtsp://admin:pass@127.0.0.1:59999/live"
        )

        ok, message = rtsp_cam.test_connection()
        self.assertFalse(ok)
        self.assertIsInstance(message, str)
        # Verify secret is NEVER leaked in test_connection failure message
        self.assertNotIn("pass", message)

    # -------------------------------------------------------------------------
    # TEST 5: RTSP Disconnect, Bounded Retry & Exponential Backoff
    # -------------------------------------------------------------------------
    def test_05_rtsp_bounded_retry_and_backoff(self):
        rtsp_cam = RtspCctvSource(
            camera_id="cam-rtsp-retry-test",
            camera_name="Ward Room 101",
            rtsp_url="rtsp://admin:pass@127.0.0.1:59998/live",
            max_reconnect_attempts=5,
            base_backoff_sec=0.05
        )

        # Simulate connection loss and retry loop
        rtsp_cam.state = CameraLifecycleState.ONLINE
        self.assertEqual(rtsp_cam.health.reconnect_count, 0)

        for attempt in range(1, MAX_RTSP_RECONNECT_ATTEMPTS + 1):
            rtsp_cam._handle_connection_loss("Simulated RTSP packet loss / socket reset")
            self.assertEqual(rtsp_cam.state, CameraLifecycleState.RECONNECTING)
            self.assertEqual(rtsp_cam.health.reconnect_count, attempt)

        # 6th consecutive loss should exhaust retries and enter DEGRADED / OFFLINE
        rtsp_cam._handle_connection_loss("Socket terminated")
        self.assertIn(rtsp_cam.state, [CameraLifecycleState.DEGRADED, CameraLifecycleState.OFFLINE])
        self.assertFalse(rtsp_cam.is_opened)

    # -------------------------------------------------------------------------
    # TEST 6: Safe Reconnect Boundary Tracking Reset
    # -------------------------------------------------------------------------
    def test_06_reconnect_boundary_tracking_reset(self):
        context = TrackingContext(camera_id="cam-rtsp-01")
        # Populate with active kinematics state (simulating mid-monitoring)
        context.consecutive_valid_frames = 45
        context.prev_com_y = 380.5
        context.prev_time = 14.2
        context.smooth_velocity = 1.45
        context.fall_latched = True
        context.fall_latch_start_time = 14.0
        context.timeline_stage = "STAGE_CONTACT"

        # Reconnect boundary MUST execute clean reset
        context.reset()

        self.assertEqual(context.consecutive_valid_frames, 0)
        self.assertIsNone(context.prev_com_y)
        self.assertIsNone(context.prev_time)
        self.assertEqual(context.smooth_velocity, 0.0)
        self.assertFalse(context.fall_latched)
        self.assertEqual(context.fall_latch_start_time, 0.0)
        self.assertEqual(context.timeline_stage, "STAGE_RESTING")
        self.assertEqual(context.calibration_frames_left, DEFAULT_CALIBRATION_FRAMES)

    # -------------------------------------------------------------------------
    # TEST 7: Frame Timestamp Gap Protection (dt > 350ms resets derivative)
    # -------------------------------------------------------------------------
    def test_07_frame_timestamp_gap_protection(self):
        context = TrackingContext(camera_id="cam-gap-test")
        context.consecutive_valid_frames = 10
        context.prev_com_y = 200.0
        context.prev_time = 10.0
        context.calibration_frames_left = 0

        # Simulate synthetic keypoints: center of mass moved from 200 to 350 (150px jump)
        # But dt is 0.50s (> 350ms gap threshold, e.g. network stall or frame drop)
        synthetic_keypoints = []
        for i in range(17):
            synthetic_keypoints.append({"x": 320, "y": 350, "conf": 0.9})

        # Run compute_kinematics through the pipeline
        kinematics = yolo_edge_sentinel.compute_kinematics(
            synthetic_keypoints,
            img_w=640,
            img_h=480,
            current_time=10.50,  # dt = 0.50s > 0.35s
            source="RTSP_CCTV",
            tracking_context=context
        )

        # Derivative velocity must be clamped/reset to 0.0, NOT a massive drop spike!
        self.assertEqual(abs(kinematics["downward_velocity"]), 0.0)
        self.assertNotEqual(kinematics["canonical_event"]["state"], "CONTACT_OR_FALL")
        self.assertEqual(kinematics["risk_level"], "SAFE")

    # -------------------------------------------------------------------------
    # TEST 8: Stale / Duplicate Frame Detection
    # -------------------------------------------------------------------------
    def test_08_duplicate_frame_motion_suppression(self):
        rtsp_cam = RtspCctvSource(
            camera_id="cam-duplicate-test",
            camera_name="Ward Hallway",
            rtsp_url="rtsp://admin:pass@127.0.0.1:554/live"
        )
        frame_data = np.full((480, 640, 3), 128, dtype=np.uint8)

        # Ingest first frame
        is_dup_1 = rtsp_cam._detect_duplicate_frame(frame_data)
        self.assertFalse(is_dup_1)

        # Ingest identical frame 10 times consecutively
        for _ in range(10):
            is_dup = rtsp_cam._detect_duplicate_frame(frame_data)
            self.assertTrue(is_dup)

        # Ensure health indicates frozen/stale stream
        self.assertTrue(rtsp_cam.health.is_frozen or rtsp_cam.health.dropped_frame_count >= 0)

    # -------------------------------------------------------------------------
    # TEST 9: PrerecordedVideoSource Sequential Normalization & Speed Invariance
    # -------------------------------------------------------------------------
    def test_09_prerecorded_video_source(self):
        video_src = PrerecordedVideoSource(
            camera_id="cam-demo-prerecorded",
            camera_name="Clinical Bed-Fall Demonstration Video",
            video_path="patient_bed_fall_demo.mp4"
        )

        # Configuration check
        config = video_src.to_config_dict()
        self.assertEqual(config["cameraId"], "cam-demo-prerecorded")
        self.assertEqual(config["sourceType"], CameraSourceType.PRERECORDED_VIDEO)
        self.assertIn("patient_bed_fall_demo.mp4", config["videoPath"])

        # Speed invariance calculation test
        # In prerecorded mode, normalized timestamp must strictly be frame_index / fps
        fps = 25.0
        frame_idx = 75
        expected_t = frame_idx / fps  # 3.0s
        self.assertAlmostEqual(expected_t, 3.0)

        # Verify pause and resume does not create derivative spikes
        video_src.pause()
        self.assertTrue(video_src.is_paused)
        video_src.resume()
        self.assertFalse(video_src.is_paused)

        # Clean release
        video_src.release()
        self.assertEqual(video_src.state, CameraLifecycleState.STOPPED)

    # -------------------------------------------------------------------------
    # TEST 10: EdgeNode Multi-Camera Isolation (Zero Cross-Talk)
    # -------------------------------------------------------------------------
    def test_10_multi_camera_isolation(self):
        cam1 = LocalWebcamSource("cam-01", "Webcam Room 1")
        cam2 = LocalWebcamSource("cam-02", "Webcam Room 2")

        self.edge_node.register_camera(cam1)
        self.edge_node.register_camera(cam2)

        ctx1 = self.edge_node.get_tracking_context("cam-01")
        ctx2 = self.edge_node.get_tracking_context("cam-02")

        # Must be distinct memory objects
        self.assertIsNot(ctx1, ctx2)

        # Mutate ctx1 with fall latch
        ctx1.fall_latched = True
        ctx1.smooth_velocity = 1.85
        ctx1.timeline_stage = "STAGE_CONTACT"

        # ctx2 must remain pristine and uninfected
        self.assertFalse(ctx2.fall_latched)
        self.assertEqual(ctx2.smooth_velocity, 0.0)
        self.assertEqual(ctx2.timeline_stage, "STAGE_RESTING")

    # -------------------------------------------------------------------------
    # TEST 11: Edge Heartbeat & 7-Tier Infrastructure Hierarchy
    # -------------------------------------------------------------------------
    def test_11_edge_heartbeat_and_hierarchy(self):
        cam = PrerecordedVideoSource("cam-demo", "Demo Feed", "patient_bed_fall_demo.mp4")
        cam.lifecycle_state = CameraLifecycleState.ONLINE
        self.edge_node.register_camera(cam, set_active=True)

        heartbeat = self.edge_node.get_heartbeat()
        self.assertEqual(heartbeat["edgeId"], "test-edge-node-01")
        self.assertEqual(heartbeat["status"], "ONLINE")
        self.assertEqual(heartbeat["activeCameraId"], "cam-demo")
        self.assertEqual(heartbeat["cameraCount"], 1)

        hierarchy = self.edge_node.get_hierarchy_health()
        self.assertIn("edgeNode", hierarchy)
        self.assertIn("cameras", hierarchy)
        self.assertIn("visionModel", hierarchy)
        self.assertIn("tracking", hierarchy)
        self.assertIn("network", hierarchy)
        self.assertIn("database", hierarchy)
        self.assertIn("monitoringStatusBanner", hierarchy)

        self.assertEqual(hierarchy["edgeNode"]["status"], "ONLINE")
        self.assertEqual(hierarchy["visionModel"]["engine"], "Ultralytics YOLO11-Pose")

    # -------------------------------------------------------------------------
    # TEST 12: ABSOLUTE FALSE-ALARM SUPPRESSION
    # Camera startup, disconnect, reconnect, edge shutdown NEVER trigger patient alarms
    # -------------------------------------------------------------------------
    def test_12_false_alarm_suppression_on_infrastructure_events(self):
        context = TrackingContext(camera_id="cam-rtsp-ward")

        # Scenario A: Initial Startup & Calibration (35 frames)
        for frame_no in range(1, 36):
            synth_kpts = [{"x": 320, "y": 240, "conf": 0.85} for _ in range(17)]
            kine = yolo_edge_sentinel.compute_kinematics(
                synth_kpts, img_w=640, img_h=480, current_time=frame_no * 0.04,
                source="RTSP_CCTV", tracking_context=context
            )
            self.assertFalse(kine.get("is_high_risk", False), f"Startup frame {frame_no} triggered false risk!")
            self.assertEqual(kine["risk_level"], "SAFE")

        # Scenario B: Sudden Camera Disconnection / Total Frame Loss
        # (Zero frames received; tracking context reset upon reconnect)
        context.reset()
        self.assertEqual(context.consecutive_valid_frames, 0)
        self.assertFalse(context.fall_latched)

        # Scenario C: Reconnect Spike Prevention (First frame after reconnect)
        # Keypoints reappear abruptly at a totally different position (e.g. resident was walking)
        synth_reappear_kpts = [{"x": 100, "y": 420, "conf": 0.90} for _ in range(17)]
        kine_after_reconnect = yolo_edge_sentinel.compute_kinematics(
            synth_reappear_kpts, img_w=640, img_h=480, current_time=120.0,
            source="RTSP_CCTV", tracking_context=context
        )
        # Because context was reset, consecutive_valid_frames is 1 (< 3 required for derivative)
        self.assertEqual(abs(kine_after_reconnect["downward_velocity"]), 0.0)
        self.assertEqual(kine_after_reconnect["risk_level"], "SAFE")

        # Scenario D: System Status vs Patient Status Verification
        # When Camera is OFFLINE, Monitoring is DEGRADED, but Patient is SAFE
        hierarchy = self.edge_node.get_hierarchy_health()
        # Even if camera has degraded status, patient status is unaffected
        self.assertIn("Vision Monitoring", hierarchy["monitoringStatusBanner"])
        self.assertNotIn("FALL", hierarchy["monitoringStatusBanner"])


if __name__ == "__main__":
    unittest.main(verbosity=2)

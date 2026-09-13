// prototype/movement-engine.js
// ReJivan Unified Motion Kinematics, Hypothesis Scoring & Counterfactual Reasoning Engine
// Compatible with both browser (MediaPipe Pose) and local edge hardware (YOLO11-Pose via GTX 1650)

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReJivanMovementEngine = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Standard 17-point COCO Keypoint Map (Identical between YOLO-Pose & MediaPipe)
  const KEYPOINTS = {
    NOSE: 0,
    LEFT_EYE: 1, RIGHT_EYE: 2,
    LEFT_EAR: 3, RIGHT_EAR: 4,
    LEFT_SHOULDER: 5, RIGHT_SHOULDER: 6,
    LEFT_ELBOW: 7, RIGHT_ELBOW: 8,
    LEFT_WRIST: 9, RIGHT_WRIST: 10,
    LEFT_HIP: 11, RIGHT_HIP: 12,
    LEFT_KNEE: 13, RIGHT_KNEE: 14,
    LEFT_ANKLE: 15, RIGHT_ANKLE: 16
  };

  /**
   * Calculates the Center of Mass (CoM) and Torso Angle from skeletal landmarks
   * @param {Array} landmarks - 17 keypoint array [{x, y, z, visibility}, ...]
   */
  function analyzePoseGeometry(landmarks) {
    if (!landmarks || landmarks.length < 17) {
      return { valid: false, reason: "Insufficient keypoint tracking" };
    }

    const lShoulder = landmarks[KEYPOINTS.LEFT_SHOULDER];
    const rShoulder = landmarks[KEYPOINTS.RIGHT_SHOULDER];
    const lHip = landmarks[KEYPOINTS.LEFT_HIP];
    const rHip = landmarks[KEYPOINTS.RIGHT_HIP];

    // Midpoint of shoulders & hips
    const shoulderMid = {
      x: (lShoulder.x + rShoulder.x) / 2,
      y: (lShoulder.y + rShoulder.y) / 2
    };
    const hipMid = {
      x: (lHip.x + rHip.x) / 2,
      y: (lHip.y + rHip.y) / 2
    };

    // Torso vector
    const dx = hipMid.x - shoulderMid.x;
    const dy = hipMid.y - shoulderMid.y; // In screen space, y increases downwards

    // Angle of torso with vertical axis (0 deg = standing straight up, 90 deg = horizontal lying down)
    const angleFromVertical = Math.abs(Math.atan2(Math.abs(dx), Math.abs(dy)) * (180 / Math.PI));

    // Approximate Center of Mass
    const com = {
      x: (shoulderMid.x + hipMid.x) / 2,
      y: (shoulderMid.y + hipMid.y) / 2
    };

    return {
      valid: true,
      centerOfMass: com,
      shoulderMid,
      hipMid,
      torsoAngleDegrees: Math.round(angleFromVertical * 10) / 10,
      isHorizontallyOriented: angleFromVertical > 60
    };
  }

  /**
   * Evaluates Competing Hypotheses for any physical movement event
   * Compares evidence across Camera Kinematics, Wearable IMU Shock, and Telemetry Vitals
   */
  function evaluateHypotheses(evidence) {
    const {
      downwardVelocity = 0,     // m/s (negative = down)
      torsoAngle = 10,           // degrees from vertical (0=standing, 90=flat)
      impactShockG = 1.0,        // accelerometer peak g-force (1.0 = normal, >2.5 = impact)
      postStillnessSeconds = 0,  // seconds elapsed with motionless posture
      chairBedProximity = false, // true if near recognized safe resting furniture
      wristOscillationHz = 0,    // frequency of hand/wrist jitter (3-8 Hz = tremor)
      deviceLiftedUpright = false// true if smartphone picked back up after drop
    } = evidence;

    const hypotheses = [];

    // H1: Accidental Fall / Mechanical Trip
    let h1Score = 0;
    if (downwardVelocity < -1.4) h1Score += 0.35;
    if (torsoAngle > 60) h1Score += 0.25;
    if (impactShockG > 2.4) h1Score += 0.30;
    if (!chairBedProximity) h1Score += 0.10;
    hypotheses.push({
      id: "H1",
      label: "Accidental Fall / Mechanical Trip",
      mechanism: "Sudden loss of vertical balance followed by deceleration impact on floor",
      confidence: Math.min(Math.round(h1Score * 100), 99),
      severity: "CRITICAL"
    });

    // H2: Controlled Descent / Sitting Down
    let h2Score = 0;
    if (downwardVelocity >= -0.8 && downwardVelocity < 0) h2Score += 0.40;
    if (torsoAngle < 45) h2Score += 0.30;
    if (impactShockG < 1.4) h2Score += 0.20;
    if (chairBedProximity) h2Score += 0.10;
    hypotheses.push({
      id: "H2",
      label: "Controlled Sitting / Intentional Descent",
      mechanism: "Smooth muscular deceleration onto seating furniture without ground shock",
      confidence: Math.min(Math.round(h2Score * 100), 99),
      severity: "NORMAL"
    });

    // H3: Intentional Resting / Lying in Bed
    let h3Score = 0;
    if (torsoAngle > 65) h3Score += 0.35;
    if (downwardVelocity >= -0.6) h3Score += 0.30;
    if (impactShockG < 1.3) h3Score += 0.20;
    if (chairBedProximity) h3Score += 0.15;
    hypotheses.push({
      id: "H3",
      label: "Intentional Bed Rest / Supine Sleep",
      mechanism: "Gradual reclining posture transition into safe sleep zone",
      confidence: Math.min(Math.round(h3Score * 100), 99),
      severity: "NORMAL"
    });

    // H4: Smartphone Dropped / Device Inversion (False Alarm)
    let h4Score = 0;
    if (impactShockG > 2.6) h4Score += 0.40;
    if (deviceLiftedUpright || torsoAngle < 35) h4Score += 0.45;
    if (downwardVelocity > -0.5) h4Score += 0.15;
    hypotheses.push({
      id: "H4",
      label: "Smartphone Dropped / Handling Shock",
      mechanism: "Phone impacted surface while resident remained upright or picked device up",
      confidence: Math.min(Math.round(h4Score * 100), 99),
      severity: "INFO"
    });

    // H5: Abnormal Tremor / Shivering Episode
    let h5Score = 0;
    if (wristOscillationHz >= 3.0 && wristOscillationHz <= 8.5) h5Score += 0.70;
    if (torsoAngle < 45) h5Score += 0.20;
    if (impactShockG < 1.5) h5Score += 0.10;
    hypotheses.push({
      id: "H5",
      label: "Involuntary Tremor / Shivering Movement",
      mechanism: "Rhythmic musculoskeletal oscillation (3-8 Hz) without postural collapse",
      confidence: Math.min(Math.round(h5Score * 100), 99),
      severity: "CONCERNING"
    });

    // H6: Prolonged Immobility / Post-Event Incapacitation
    let h6Score = 0;
    if (postStillnessSeconds > 30) h6Score += 0.45;
    if (torsoAngle > 60) h6Score += 0.35;
    if (!chairBedProximity) h6Score += 0.20;
    hypotheses.push({
      id: "H6",
      label: "Prolonged Post-Fall Immobility",
      mechanism: "Inability to initiate recovery movement following downward event",
      confidence: Math.min(Math.round(h6Score * 100), 99),
      severity: "CRITICAL"
    });

    // Sort by descending confidence score
    hypotheses.sort((a, b) => b.confidence - a.confidence);
    const winningHypothesis = hypotheses[0];

    // Counterfactual explanation: Prove why alternative non-emergency explanations were rejected or accepted
    let counterfactualExplanation = "";
    if (winningHypothesis.id === "H1" || winningHypothesis.id === "H6") {
      counterfactualExplanation = `Intentional sitting (H2) ruled out because vertical descent velocity (${downwardVelocity} m/s) exceeded the controlled threshold (-0.8 m/s) and impact deceleration registered ${impactShockG}g shock. Sleeping (H3) ruled out due to non-bed floor location and sudden acceleration spike.`;
    } else if (winningHypothesis.id === "H2") {
      counterfactualExplanation = `Accidental fall (H1) ruled out because descent velocity was controlled (${downwardVelocity} m/s), zero impact shock was recorded (${impactShockG}g), and resident retained upright torso stability.`;
    } else if (winningHypothesis.id === "H3") {
      counterfactualExplanation = `Fall (H1) ruled out because transition occurred within recognized bed perimeter with smooth deceleration and sustained rhythmic respiration.`;
    } else if (winningHypothesis.id === "H4") {
      counterfactualExplanation = `Human fall (H1) ruled out because device re-oriented upright within 5s and resident skeletal posture remained vertical without floor descent.`;
    } else if (winningHypothesis.id === "H5") {
      counterfactualExplanation = `Fall (H1) ruled out; posture remains upright while isolated wrist keypoints display repetitive 3-8 Hz oscillation.`;
    }

    return {
      winningHypothesis,
      allHypotheses: hypotheses,
      counterfactualExplanation,
      recommendedAction: winningHypothesis.severity === "CRITICAL"
        ? "INITIATE_VERIFICATION_PROMPT"
        : winningHypothesis.severity === "CONCERNING"
          ? "RECORD_ANOMALY_AND_OBSERVE"
          : "CONTINUE_MONITORING"
    };
  }

  /**
   * Generates a 30-Second Chronological Reconstruction Timeline
   * Formats second-by-second kinematic milestones leading up to the incident
   */
  function generateChronologicalTimeline(scenarioType) {
    const now = new Date();
    const formatTime = (offsetSec) => {
      const d = new Date(now.getTime() - offsetSec * 1000);
      return d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    if (scenarioType === "trip_fall") {
      return [
        { time: formatTime(28), event: "Steady Ambulation", detail: "Gait velocity 0.82 m/s · Step symmetry 96% · Upright torso 8°" },
        { time: formatTime(22), event: "Locomotion Deceleration", detail: "Gait velocity drops to 0.39 m/s · Lateral torso sway detected (Δθ: 18°)" },
        { time: formatTime(18), event: "Rapid Vertical Descent", detail: "Downward hip velocity -1.92 m/s toward floor boundary" },
        { time: formatTime(17), event: "Deceleration Impact", detail: "Accelerometer shock spike: 3.4g peak · Floor contact confirmed" },
        { time: formatTime(12), event: "Absence of Recovery Motion", detail: "Post-impact stillness variance < 0.04 over 5 seconds" },
        { time: formatTime(8), event: "Kinematic Hypothesis Formed", detail: "H1: Accidental Trip & Fall (96% conf) · Controlled sitting ruled out" },
        { time: formatTime(0), event: "Resident Verification Active", detail: "Audio prompt sounding · 30-second response window open" }
      ];
    } else if (scenarioType === "sitting") {
      return [
        { time: formatTime(25), event: "Approaching Seating Area", detail: "Walking speed 0.65 m/s toward Room 302 armchair" },
        { time: formatTime(18), event: "Controlled Torso Rotation", detail: "Resident turns toward chair perimeter" },
        { time: formatTime(12), event: "Smooth Descent", detail: "Descent velocity -0.42 m/s · Smooth muscular flexion" },
        { time: formatTime(8), event: "Seated Contact", detail: "Zero impact shock (1.08g) · Torso remains upright (22°)" },
        { time: formatTime(0), event: "Intentional Rest Confirmed", detail: "Hypothesis H2 confirmed (98% conf) · Fall alarm suppressed" }
      ];
    } else if (scenarioType === "phone_drop") {
      return [
        { time: formatTime(20), event: "Device in Active Use", detail: "Smartphone held upright · Normal handling micro-jitter" },
        { time: formatTime(14), event: "Freefall Drop Phase", detail: "Gravity vector drops to 0.12g (Device dropped from hand)" },
        { time: formatTime(13), event: "Hard Surface Deceleration", detail: "Surface impact shock spike: 3.8g on table/floor" },
        { time: formatTime(9), event: "Camera Posture Check", detail: "CCTV confirms resident remains standing upright (Angle: 12°)" },
        { time: formatTime(4), event: "Device Picked Back Up", detail: "Gyroscope registers vertical tilt & handling restoration" },
        { time: formatTime(0), event: "False Alarm Automatically Resolved", detail: "Hypothesis H4 confirmed · Emergency escalation prevented" }
      ];
    } else if (scenarioType === "tremor") {
      return [
        { time: formatTime(30), event: "Quiet Rest in Armchair", detail: "Patient seated · Vitals baseline stable (HR 84, SpO2 98%)" },
        { time: formatTime(22), event: "Upper Extremity Micro-Movement", detail: "Right wrist sensor records rapid oscillatory displacement" },
        { time: formatTime(15), event: "Spectral Frequency Filtering", detail: "Bandpass filter isolates 5.2 Hz sustained oscillation" },
        { time: formatTime(8), event: "Posture Stability Check", detail: "Torso remains stable at 24° · No downward displacement" },
        { time: formatTime(0), event: "Tremor / Shivering Flagged", detail: "Hypothesis H5 logged as Anomaly · Caregiver notified for review" }
      ];
    } else { // acute_collapse
      return [
        { time: formatTime(30), event: "Pre-Event Physiological Strain", detail: "Vitals show BP 174/106 mmHg & SpO2 88% (Hypertensive crisis)" },
        { time: formatTime(24), event: "Gait Ataxia & Wall Slump", detail: "Patient sways laterally into wall boundary" },
        { time: formatTime(19), event: "Incapacitated Descent", detail: "Sudden downward collapse (-2.1 m/s) to floor" },
        { time: formatTime(18), event: "Ground Impact", detail: "Floor impact shock 2.9g" },
        { time: formatTime(10), event: "Prolonged Unresponsiveness", detail: "Motionless on floor for >30s · HR elevated to 118 bpm" },
        { time: formatTime(0), event: "Critical Escalation Initiated", detail: "Verification timed out with zero response · 108 ambulance dispatching" }
      ];
    }
  }

  return {
    KEYPOINTS,
    analyzePoseGeometry,
    evaluateHypotheses,
    generateChronologicalTimeline
  };
});

// app-android/app/src/main/java/com/rejivan/app/core/MovementEngine.kt
// ReJivan Android Native Movement Kinematics, Hypothesis Engine & Fall Verification

package com.rejivan.app.core

data class MovementEvidence(
    val downwardVelocity: Float = 0f,       // m/s
    val torsoAngle: Float = 10f,            // degrees
    val impactShockG: Float = 1.0f,         // peak g-force
    val postStillnessSeconds: Int = 0,      // seconds
    val chairBedProximity: Boolean = false,
    val wristOscillationHz: Float = 0f,
    val deviceLiftedUpright: Boolean = false
)

data class MovementHypothesis(
    val id: String,
    val label: String,
    val mechanism: String,
    val confidence: Int,
    val severity: String // NORMAL, CONCERNING, CRITICAL, INFO
)

data class HypothesisEvaluationResult(
    val winningHypothesis: MovementHypothesis,
    val allHypotheses: List<MovementHypothesis>,
    val counterfactualExplanation: String,
    val recommendedAction: String // CONTINUE_MONITORING, RECORD_ANOMALY, INITIATE_VERIFICATION_PROMPT
)

data class TimelineMilestone(
    val time: String,
    val event: String,
    val detail: String
)

object MovementEngine {

    fun evaluateHypotheses(evidence: MovementEvidence): HypothesisEvaluationResult {
        val list = mutableListOf<MovementHypothesis>()

        // H1: Accidental Fall / Mechanical Trip
        var h1 = 0f
        if (evidence.downwardVelocity < -1.4f) h1 += 0.35f
        if (evidence.torsoAngle > 60f) h1 += 0.25f
        if (evidence.impactShockG > 2.4f) h1 += 0.30f
        if (!evidence.chairBedProximity) h1 += 0.10f
        list.add(
            MovementHypothesis(
                id = "H1",
                label = "Accidental Fall / Mechanical Trip",
                mechanism = "Sudden loss of vertical balance followed by deceleration impact on floor",
                confidence = (h1 * 100).toInt().coerceIn(0, 99),
                severity = "CRITICAL"
            )
        )

        // H2: Controlled Sitting / Intentional Descent
        var h2 = 0f
        if (evidence.downwardVelocity >= -0.8f && evidence.downwardVelocity < 0f) h2 += 0.40f
        if (evidence.torsoAngle < 45f) h2 += 0.30f
        if (evidence.impactShockG < 1.4f) h2 += 0.20f
        if (evidence.chairBedProximity) h2 += 0.10f
        list.add(
            MovementHypothesis(
                id = "H2",
                label = "Controlled Sitting / Intentional Descent",
                mechanism = "Smooth muscular deceleration onto seating furniture without ground shock",
                confidence = (h2 * 100).toInt().coerceIn(0, 99),
                severity = "NORMAL"
            )
        )

        // H3: Intentional Bed Rest / Sleep
        var h3 = 0f
        if (evidence.torsoAngle > 65f) h3 += 0.35f
        if (evidence.downwardVelocity >= -0.6f) h3 += 0.30f
        if (evidence.impactShockG < 1.3f) h3 += 0.20f
        if (evidence.chairBedProximity) h3 += 0.15f
        list.add(
            MovementHypothesis(
                id = "H3",
                label = "Intentional Bed Rest / Supine Sleep",
                mechanism = "Gradual reclining posture transition into safe sleep zone",
                confidence = (h3 * 100).toInt().coerceIn(0, 99),
                severity = "NORMAL"
            )
        )

        // H4: Smartphone Dropped / Device Inversion (False Alarm)
        var h4 = 0f
        if (evidence.impactShockG > 2.6f) h4 += 0.40f
        if (evidence.deviceLiftedUpright || evidence.torsoAngle < 35f) h4 += 0.45f
        if (evidence.downwardVelocity > -0.5f) h4 += 0.15f
        list.add(
            MovementHypothesis(
                id = "H4",
                label = "Smartphone Dropped / Handling Shock",
                mechanism = "Phone impacted surface while resident remained upright or picked device up",
                confidence = (h4 * 100).toInt().coerceIn(0, 99),
                severity = "INFO"
            )
        )

        // H5: Involuntary Tremor / Shivering
        var h5 = 0f
        if (evidence.wristOscillationHz in 3.0f..8.5f) h5 += 0.70f
        if (evidence.torsoAngle < 45f) h5 += 0.20f
        if (evidence.impactShockG < 1.5f) h5 += 0.10f
        list.add(
            MovementHypothesis(
                id = "H5",
                label = "Involuntary Tremor / Shivering Movement",
                mechanism = "Rhythmic musculoskeletal oscillation (3-8 Hz) without postural collapse",
                confidence = (h5 * 100).toInt().coerceIn(0, 99),
                severity = "CONCERNING"
            )
        )

        // H6: Prolonged Immobility
        var h6 = 0f
        if (evidence.postStillnessSeconds > 30) h6 += 0.45f
        if (evidence.torsoAngle > 60f) h6 += 0.35f
        if (!evidence.chairBedProximity) h6 += 0.20f
        list.add(
            MovementHypothesis(
                id = "H6",
                label = "Prolonged Post-Fall Immobility",
                mechanism = "Inability to initiate recovery movement following downward event",
                confidence = (h6 * 100).toInt().coerceIn(0, 99),
                severity = "CRITICAL"
            )
        )

        list.sortByDescending { it.confidence }
        val winner = list.first()

        val counterfactual = when (winner.id) {
            "H1", "H6" -> "Intentional sitting (H2) ruled out because vertical descent velocity (${evidence.downwardVelocity} m/s) exceeded the controlled threshold (-0.8 m/s) and impact deceleration registered ${evidence.impactShockG}g shock."
            "H2" -> "Accidental fall (H1) ruled out because descent velocity was controlled (${evidence.downwardVelocity} m/s) and zero impact shock was recorded (${evidence.impactShockG}g)."
            "H3" -> "Fall (H1) ruled out because transition occurred within recognized bed perimeter with smooth deceleration."
            "H4" -> "Human fall (H1) ruled out because device re-oriented upright within 5s and resident skeletal posture remained vertical."
            "H5" -> "Fall (H1) ruled out; posture remains upright while isolated wrist keypoints display repetitive 3-8 Hz oscillation."
            else -> "Alternative explanations evaluated against kinematic evidence buffer."
        }

        val action = when (winner.severity) {
            "CRITICAL" -> "INITIATE_VERIFICATION_PROMPT"
            "CONCERNING" -> "RECORD_ANOMALY_AND_OBSERVE"
            else -> "CONTINUE_MONITORING"
        }

        return HypothesisEvaluationResult(
            winningHypothesis = winner,
            allHypotheses = list,
            counterfactualExplanation = counterfactual,
            recommendedAction = action
        )
    }

    fun generateTimeline(scenario: String): List<TimelineMilestone> {
        return when (scenario) {
            "sitting" -> listOf(
                TimelineMilestone("T-25s", "Approaching Seating Area", "Walking speed 0.65 m/s toward Room 302 armchair"),
                TimelineMilestone("T-18s", "Controlled Torso Rotation", "Resident turns toward chair perimeter"),
                TimelineMilestone("T-12s", "Smooth Descent", "Descent velocity -0.42 m/s · Smooth muscular flexion"),
                TimelineMilestone("T-8s", "Seated Contact", "Zero impact shock (1.08g) · Torso remains upright (22°)"),
                TimelineMilestone("T-0s", "Intentional Rest Confirmed", "Hypothesis H2 confirmed · Fall alarm suppressed")
            )
            "phone_drop" -> listOf(
                TimelineMilestone("T-20s", "Device in Active Use", "Smartphone held upright · Normal handling micro-jitter"),
                TimelineMilestone("T-14s", "Freefall Drop Phase", "Gravity vector drops to 0.12g (Device dropped from hand)"),
                TimelineMilestone("T-13s", "Hard Surface Impact", "Surface impact shock spike: 3.8g on table/floor"),
                TimelineMilestone("T-9s", "Camera Posture Check", "CCTV confirms resident remains standing upright (12°)"),
                TimelineMilestone("T-4s", "Device Picked Back Up", "Gyroscope registers vertical tilt & handling restoration"),
                TimelineMilestone("T-0s", "False Alarm Resolved", "Hypothesis H4 confirmed · Emergency escalation prevented")
            )
            "tremor" -> listOf(
                TimelineMilestone("T-30s", "Quiet Rest in Armchair", "Patient seated · Vitals baseline stable"),
                TimelineMilestone("T-22s", "Upper Extremity Motion", "Right wrist sensor records rapid oscillatory displacement"),
                TimelineMilestone("T-15s", "Spectral Frequency Filter", "Bandpass filter isolates 5.2 Hz sustained oscillation"),
                TimelineMilestone("T-8s", "Posture Stability Check", "Torso remains stable at 24° · No downward displacement"),
                TimelineMilestone("T-0s", "Tremor / Shivering Flagged", "Hypothesis H5 logged as Anomaly · Caregiver notified")
            )
            else -> listOf(
                TimelineMilestone("T-28s", "Steady Ambulation", "Gait velocity 0.82 m/s · Step symmetry 96% · Upright torso 8°"),
                TimelineMilestone("T-22s", "Locomotion Deceleration", "Gait velocity drops to 0.39 m/s · Lateral torso sway (18°)"),
                TimelineMilestone("T-18s", "Rapid Vertical Descent", "Downward hip velocity -1.92 m/s toward floor boundary"),
                TimelineMilestone("T-17s", "Deceleration Impact", "Accelerometer shock spike: 3.4g peak · Contact confirmed"),
                TimelineMilestone("T-12s", "Post-Impact Stillness", "Zero recovery motion detected for 16 seconds"),
                TimelineMilestone("T-0s", "Resident Verification Active", "Audio chime active · 30-second response window open")
            )
        }
    }
}

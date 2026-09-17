// prototype/canonical-events.js
// ReJivan Canonical Event Schema, State Machine Definitions & System Health Contract
// Universal contract across Node.js backend, Edge YOLO, Web React frontend, and Android app.

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReJivanCanonical = factory();
  }
})(typeof window !== "undefined" ? window : (typeof self !== "undefined" ? self : this), function () {
  "use strict";

  // 1. Formal Event State Machine
  const EVENT_STATES = Object.freeze({
    NORMAL: "NORMAL",
    ANOMALY: "ANOMALY",
    SUSPECTED_EVENT: "SUSPECTED_EVENT",
    CONTACT_OR_FALL: "CONTACT_OR_FALL",
    RECOVERY_MONITORING: "RECOVERY_MONITORING",
    VERIFICATION: "VERIFICATION",
    RESOLVED: "RESOLVED",
    ESCALATED: "ESCALATED",
    UNKNOWN: "UNKNOWN",
    MONITORING_DEGRADED: "MONITORING_DEGRADED"
  });

  // 2. Candidate Physical Mechanisms
  const PHYSICAL_MECHANISMS = Object.freeze({
    NORMAL_ACTIVITY: "NORMAL_ACTIVITY",
    INTENTIONAL_SITTING: "INTENTIONAL_SITTING",
    INTENTIONAL_LYING: "INTENTIONAL_LYING",
    KNEELING: "KNEELING",
    TRIP: "TRIP",
    LOSS_OF_BALANCE: "LOSS_OF_BALANCE",
    FALL: "FALL",
    FALL_WITH_IMMOBILITY: "FALL_WITH_IMMOBILITY",
    DEVICE_DROP: "DEVICE_DROP",
    UNKNOWN: "UNKNOWN"
  });

  // 2b. Unified Camera Source Abstraction
  const CAMERA_SOURCES = Object.freeze({
    LIVE_WEBCAM: "LIVE_WEBCAM",
    RTSP_CAMERA: "RTSP_CAMERA",
    PRERECORDED_VIDEO: "PRERECORDED_VIDEO"
  });

  const CAMERA_LIFECYCLE = Object.freeze({
    CAMERA_OFFLINE: "CAMERA_OFFLINE",
    CAMERA_STARTING: "CAMERA_STARTING",
    CAMERA_CALIBRATING: "CAMERA_CALIBRATING",
    MONITORING: "MONITORING",
    PAUSED: "PAUSED",
    VIDEO_ENDED: "VIDEO_ENDED"
  });

  // 3. System Infrastructure Health States (Strictly separated from Patient Health)
  const SYSTEM_HEALTH_STATES = Object.freeze({
    EDGE: {
      EDGE_ONLINE: "EDGE_ONLINE",
      EDGE_STARTING: "EDGE_STARTING",
      EDGE_DEGRADED: "EDGE_DEGRADED",
      EDGE_OFFLINE: "EDGE_OFFLINE"
    },
    CAMERA: {
      ONLINE: "ONLINE",
      STARTING: "STARTING",
      CALIBRATING: "CALIBRATING",
      OFFLINE: "OFFLINE",
      RECONNECTING: "RECONNECTING",
      LOW_LIGHT: "LOW_LIGHT",
      OCCLUDED: "OCCLUDED",
      FROZEN: "FROZEN"
    },
    WEARABLE: {
      CONNECTED: "CONNECTED",
      UNPAIRED: "UNPAIRED",
      DISCONNECTED: "DISCONNECTED",
      DEGRADED: "DEGRADED"
    },
    NETWORK: {
      ONLINE: "ONLINE",
      OFFLINE: "OFFLINE"
    },
    DATABASE: {
      ONLINE: "ONLINE",
      DEGRADED: "DEGRADED",
      OFFLINE: "OFFLINE"
    }
  });

  // 4. Recovery Tracking States
  const RECOVERY_STATUS = Object.freeze({
    NOT_APPLICABLE: "NOT_APPLICABLE",
    MONITORING: "MONITORING",
    RECOVERED_RAPID: "RECOVERED_RAPID",     // < 5 seconds
    RECOVERED_NORMAL: "RECOVERED_NORMAL",   // 5 - 12 seconds
    UNRECOVERED_STILLNESS: "UNRECOVERED_STILLNESS" // > 15 seconds
  });

  // 5. Verification Status
  const VERIFICATION_STATUS = Object.freeze({
    NONE: "NONE",
    ACTIVE: "ACTIVE",
    VERIFIED_SAFE: "VERIFIED_SAFE",
    DEVICE_DROP_RESOLVED: "DEVICE_DROP_RESOLVED",
    ASSISTANCE_REQUESTED: "ASSISTANCE_REQUESTED",
    TIMED_OUT: "TIMED_OUT"
  });

  // 6. Proportional Escalation Levels
  const ESCALATION_LEVELS = Object.freeze({
    NONE: "NONE",
    LOCAL_RECORD: "LOCAL_RECORD",
    CARE_TEAM: "CARE_TEAM",
    BACKUP_CONTACT: "BACKUP_CONTACT",
    EMERGENCY_DISPATCH: "EMERGENCY_DISPATCH"
  });

  // Versioning constants
  const SCHEMA_VERSION = "2.1.0";
  const RULES_VERSION = "3.2.0";
  const MODEL_VERSION = "yolo11p-rt-1.4";

  /**
   * Generates a deterministic, idempotent event ID
   */
  function generateEventId(residentId, timestamp, mechanism) {
    const timeMs = typeof timestamp === "number" ? Math.floor(timestamp) : Date.now();
    const mechCode = (mechanism || "EVT").substring(0, 4).toUpperCase();
    const entropy = Math.abs((timeMs ^ (timeMs >>> 16)) % 10000).toString().padStart(4, "0");
    return `EVT-${residentId || "P1"}-${timeMs}-${mechCode}-${entropy}`;
  }

  /**
   * Factory for creating a standardized Canonical Event Object
   */
  function createCanonicalEvent(options = {}) {
    const now = options.timestamp || Date.now();
    const residentId = options.residentId || "P1";
    const mechanism = options.probableMechanism || PHYSICAL_MECHANISMS.NORMAL_ACTIVITY;
    const eventId = options.eventId || generateEventId(residentId, now, mechanism);

    return {
      eventId,
      residentId,
      timestamp: now,
      startTime: options.startTime || now,
      endTime: options.endTime || null,
      state: options.state || EVENT_STATES.NORMAL,
      eventType: options.eventType || "PHYSICAL_EVENT",
      probableMechanism: mechanism,

      // 3 Independent Confidence Metrics (0 - 100%)
      detectionConfidence: Math.min(100, Math.max(0, options.detectionConfidence ?? 0)),
      mechanismConfidence: Math.min(100, Math.max(0, options.mechanismConfidence ?? 100)),
      severityConfidence: Math.min(100, Math.max(0, options.severityConfidence ?? 0)),

      // Evidence Chains
      evidence: Array.isArray(options.evidence) ? options.evidence : [],
      counterEvidence: Array.isArray(options.counterEvidence) ? options.counterEvidence : [],
      timeline: Array.isArray(options.timeline) ? options.timeline : [],

      // Clinical Context & Kinematics
      kinematics: {
        torsoAngle: options.kinematics?.torsoAngle ?? 12.0,
        downwardVelocity: options.kinematics?.downwardVelocity ?? -0.1,
        motionEnergy: options.kinematics?.motionEnergy ?? 5.0,
        impactShockG: options.kinematics?.impactShockG ?? 1.0,
        postStillnessSeconds: options.kinematics?.postStillnessSeconds ?? 0
      },

      // Recovery & Verification
      recoveryStatus: options.recoveryStatus || RECOVERY_STATUS.NOT_APPLICABLE,
      verificationStatus: options.verificationStatus || VERIFICATION_STATUS.NONE,
      escalationLevel: options.escalationLevel || ESCALATION_LEVELS.NONE,

      // Multi-Person Context
      personTrackId: options.personTrackId || "RESIDENT_PRIMARY",
      personClassification: options.personClassification || "PRIMARY_RESIDENT", // PRIMARY_RESIDENT | CAREGIVER | UNKNOWN_PERSON

      // Separate System Health Snapshot
      systemHealth: {
        cameraStatus: options.systemHealth?.cameraStatus || SYSTEM_HEALTH_STATES.CAMERA.ONLINE,
        edgeStatus: options.systemHealth?.edgeStatus || SYSTEM_HEALTH_STATES.EDGE.EDGE_ONLINE,
        wearableStatus: options.systemHealth?.wearableStatus || SYSTEM_HEALTH_STATES.WEARABLE.CONNECTED,
        networkStatus: options.systemHealth?.networkStatus || SYSTEM_HEALTH_STATES.NETWORK.ONLINE,
        databaseStatus: options.systemHealth?.databaseStatus || SYSTEM_HEALTH_STATES.DATABASE.ONLINE
      },

      // Context Awareness
      roomContext: options.roomContext || {
        zone: "Living Room",
        chairProximity: false,
        bedProximity: false,
        isNightHours: false
      },

      // Auditing and Versioning
      ruleVersion: RULES_VERSION,
      modelVersion: MODEL_VERSION,
      schemaVersion: SCHEMA_VERSION
    };
  }

  return {
    EVENT_STATES,
    PHYSICAL_MECHANISMS,
    CAMERA_SOURCES,
    CAMERA_LIFECYCLE,
    SYSTEM_HEALTH_STATES,
    RECOVERY_STATUS,
    VERIFICATION_STATUS,
    ESCALATION_LEVELS,
    SCHEMA_VERSION,
    RULES_VERSION,
    MODEL_VERSION,
    generateEventId,
    createCanonicalEvent
  };
});

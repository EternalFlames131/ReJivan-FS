// prototype/public/src/components/CameraZonesView.jsx
// Dedicated Live Camera Zones & CCTV Telemetry Feed (Enterprise Clinical Grade)

const CameraZonesView = ({ onTriggerAlert }) => {
  const [activeCamera, setActiveCamera] = React.useState("cam-1");
  const [audioActive, setAudioActive] = React.useState(false);
  const [fullscreenCam, setFullscreenCam] = React.useState(null);
  const [snapshotToast, setSnapshotToast] = React.useState(null);
  const [simulatedAlert, setSimulatedAlert] = React.useState(false);

  const cameras = [
    {
      id: "cam-1",
      title: "Room 302 Main Overhead View",
      location: "Living Room / Primary Patient Zone, Junglighat",
      resolution: "1080p · 30fps",
      latency: "24ms",
      status: "Online",
      patientPosture: "Seated in Armchair (Normal Posture)",
      confidence: "99.4%",
      bgGradient: "from-slate-900 via-slate-800 to-slate-950",
      accentColor: "#2563EB",
    },
    {
      id: "cam-2",
      title: "Bedside Side-Angle (Fall-Detection Radar)",
      location: "Bedroom Area / Night Guard Zone, Junglighat",
      resolution: "1080p · 30fps",
      latency: "28ms",
      status: "Online",
      patientPosture: "Clear Zone / Bed Unoccupied",
      confidence: "98.9%",
      bgGradient: "from-slate-950 via-slate-900 to-slate-900",
      accentColor: "#10B981",
    },
  ];

  const handleTakeSnapshot = (cam) => {
    const timestamp = new Date().toLocaleTimeString();
    setSnapshotToast(`Snapshot captured for ${cam.title} at ${timestamp}. Telemetry metadata attached.`);
    setTimeout(() => setSnapshotToast(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {snapshotToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-medium border border-slate-700 animate-in slide-in-from-bottom-2">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>{snapshotToast}</span>
          <button
            onClick={() => setSnapshotToast(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner: Privacy & Edge Prajñā Notice */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/80">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Privacy-First Edge Vision Processing
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                DPDP Act 2023 Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero raw video leaves the local hub. On-device Prajñā analyzes skeletal vectors and posture events only.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => {
              setSimulatedAlert(!simulatedAlert);
              if (onTriggerAlert) onTriggerAlert(!simulatedAlert);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              simulatedAlert
                ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {simulatedAlert ? "Reset Motion Simulation" : "Simulate Motion / Bed-Exit"}
          </button>
        </div>
      </div>

      {/* Alert Banner alongside the feed */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          simulatedAlert
            ? "bg-rose-50 border-rose-200 text-rose-900"
            : "bg-amber-50/50 border-amber-200/80 text-amber-900"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {simulatedAlert ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">
                {simulatedAlert
                  ? "Alert: Bed-Exit / Sudden Posture Shift Detected"
                  : "Continuous Fall & Motion Radar Active"}
              </span>
              <p className="text-xs mt-0.5 text-slate-700">
                {simulatedAlert
                  ? "Patient rose rapidly from living room armchair. Radar monitoring stability for 30s before family alert escalation."
                  : "Motion / Bed-exit radar active: Zero fall risk detected. Patient resting safely in living room armchair."}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-700 shrink-0">
            {simulatedAlert ? "Caution Alert Active" : "Radar Status: Nominal"}
          </span>
        </div>
      </div>

      {/* Multi-Camera Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map((cam) => {
          const isSelected = activeCamera === cam.id;
          return (
            <div
              key={cam.id}
              className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
                isSelected ? "border-blue-500/80 ring-1 ring-blue-500/20" : "border-slate-200/80"
              }`}
              onClick={() => setActiveCamera(cam.id)}
            >
              {/* Feed Header */}
              <div className="p-3.5 px-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {cam.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {cam.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">
                    {cam.latency}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">
                    {cam.resolution}
                  </span>
                </div>
              </div>

              {/* Video Feed Simulation Screen */}
              <div
                className={`relative aspect-video bg-gradient-to-br ${cam.bgGradient} flex items-center justify-center overflow-hidden select-none group`}
              >
                {/* Subtle scanline and grid background overlay */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Top HUD: Live Recording Indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800 text-white text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-bold text-rose-400">REC</span>
                  <span className="text-slate-400">|</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>

                {/* Top Right HUD: Latency */}
                <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-xs px-2 py-1 rounded-md border border-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{cam.latency}</span>
                </div>

                {/* Simulated Target Detection Box */}
                <div className="relative border-2 border-emerald-400/80 bg-emerald-500/10 rounded-lg p-3 text-center max-w-[240px] shadow-lg animate-pulse">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                    [ AI Posture Radar: Locked ]
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {simulatedAlert && cam.id === "cam-1"
                      ? "⚠️ Motion Warning: Standing Up Rapidly"
                      : cam.patientPosture}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-300/80 mt-0.5">
                    Confidence: {cam.confidence}
                  </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity">
                  {/* Left: Two-way audio status */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-800 text-white text-xs">
                    {audioActive ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Mic className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Intercom Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400">
                        <MicOff className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Intercom Muted</span>
                      </span>
                    )}
                  </div>

                  {/* Right: Action Buttons (Audio, Snapshot, Fullscreen) */}
                  <div className="flex items-center gap-1.5">
                    {/* Audio Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAudioActive(!audioActive);
                      }}
                      className={`p-1.5 rounded-lg border text-white transition-colors ${
                        audioActive
                          ? "bg-emerald-600 border-emerald-500"
                          : "bg-slate-900/80 hover:bg-slate-800 border-slate-700"
                      }`}
                      title={audioActive ? "Mute Intercom" : "Activate Two-Way Voice Intercom"}
                    >
                      {audioActive ? (
                        <Mic className="w-3.5 h-3.5" />
                      ) : (
                        <MicOff className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Snapshot Tool */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTakeSnapshot(cam);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
                      title="Capture Clinical Snapshot"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>

                    {/* Full-screen Preview */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenCam(cam);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
                      title="Full-Screen Preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed Card Footer */}
              <div className="p-3 px-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Posture:</span>
                  <span className="text-slate-600 truncate">{cam.patientPosture}</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-medium">
                  Continuous Telemetry
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Camera Modal Preview */}
      {fullscreenCam && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex flex-col p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <h3 className="text-sm font-bold">{fullscreenCam.title}</h3>
                <p className="text-xs text-slate-400">{fullscreenCam.location}</p>
              </div>
            </div>
            <button
              onClick={() => setFullscreenCam(null)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close full-screen"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 my-4 bg-slate-900 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <div className="text-center p-6 border-2 border-emerald-400/60 bg-emerald-500/10 rounded-xl text-white">
              <div className="text-sm font-mono text-emerald-300 uppercase tracking-widest font-bold">
                [ High-Definition Telemetry Stream · 1080p 30fps ]
              </div>
              <h2 className="text-xl font-bold mt-2">{fullscreenCam.patientPosture}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Stream Latency: {fullscreenCam.latency} | Protocol: WebRTC Ultra-Low Delay | Edge Prajñā Active
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>ReJivan Live CCTV Clinical Telemetry Monitor</span>
            <span>Zero raw cloud recording • DPDP Act 2023</span>
          </div>
        </div>
      )}
    </div>
  );
};

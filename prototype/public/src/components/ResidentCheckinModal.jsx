// prototype/public/src/components/ResidentCheckinModal.jsx
// Multimodal Resident Verification Dialog with 30-Second Countdown, 4 Proportional Responses & Postural Auto-Cancellation

const ResidentCheckinModal = ({ isOpen, onClose, scenario, onEmergencyConfirmed, onVerificationResponse, activePatient }) => {
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [resolvedStatus, setResolvedStatus] = React.useState(null); // 'safe' | 'minor_fall' | 'emergency' | 'device_drop' | 'picked_up' | 'timeout_emergency'

  // Reset timer on open
  React.useEffect(() => {
    if (isOpen) {
      setTimeLeft(30);
      setResolvedStatus(null);
    }
  }, [isOpen]);

  // 1-second countdown interval
  React.useEffect(() => {
    if (!isOpen || resolvedStatus !== null) return;

    if (timeLeft <= 0) {
      setResolvedStatus("timeout_emergency");
      if (onEmergencyConfirmed) onEmergencyConfirmed();
      if (onVerificationResponse) {
        onVerificationResponse({
          status: "TIMED_OUT",
          severity: "CRITICAL",
          note: "30-second resident verification window expired with zero response. Automatic emergency escalation triggered."
        });
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, resolvedStatus, onEmergencyConfirmed, onVerificationResponse]);

  if (!isOpen) return null;

  // 1. "I'm Okay (False Alarm)"
  const handleImOkay = () => {
    setResolvedStatus("safe");
    if (onVerificationResponse) {
      onVerificationResponse({
        status: "VERIFIED_SAFE",
        severity: "NORMAL",
        note: "Resident actively pressed 'I'm Okay'. False alarm logged and suppressed."
      });
    }
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  // 2. "I Fell (Minor / No Injury)"
  const handleMinorFall = () => {
    setResolvedStatus("minor_fall");
    if (onVerificationResponse) {
      onVerificationResponse({
        status: "RESOLVED_WITH_CARE_NOTE",
        severity: "CAUTION",
        note: "Resident confirmed minor slip without acute injury. Logged to caregiver timeline; ambulance dispatch avoided."
      });
    }
    setTimeout(() => {
      onClose();
    }, 2400);
  };

  // 3. "I Need Emergency Help"
  const handleNeedHelp = () => {
    setResolvedStatus("emergency");
    if (onEmergencyConfirmed) onEmergencyConfirmed();
    if (onVerificationResponse) {
      onVerificationResponse({
        status: "ASSISTANCE_REQUESTED",
        severity: "CRITICAL",
        note: "Resident urgently requested assistance. Activating emergency call chain and 108 dispatch."
      });
    }
  };

  // 4. "Device Drop (Phone Dropped)"
  const handleDeviceDrop = () => {
    setResolvedStatus("device_drop");
    if (onVerificationResponse) {
      onVerificationResponse({
        status: "DEVICE_DROP_RESOLVED",
        severity: "NORMAL",
        note: "Impact confirmed as phone/device drop rather than human fall. System returned to nominal monitoring."
      });
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // 5. Postural Recovery Simulation
  const handleSimulatePickup = () => {
    setResolvedStatus("picked_up");
    if (onVerificationResponse) {
      onVerificationResponse({
        status: "RECOVERED_RAPID",
        severity: "NORMAL",
        note: "Computer vision confirmed vertical postural recovery within grace window. Alarm auto-suppressed."
      });
    }
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-rose-500 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Emergency Pulse Banner */}
        <div className="bg-rose-600 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
            <span className="font-bold text-sm tracking-wide uppercase">
              Resident Safety Verification Active
            </span>
          </div>
          <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
            30s Grace Window
          </span>
        </div>

        <div className="p-6 text-center">
          {resolvedStatus === null ? (
            <>
              {/* Circular Countdown Display */}
              <div className="relative w-28 h-28 mx-auto my-2 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-rose-100"></div>
                <div
                  className="absolute inset-0 rounded-full border-4 border-rose-600 border-t-transparent animate-spin"
                  style={{ animationDuration: '4s' }}
                ></div>
                <div className="text-center z-10">
                  <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                    {timeLeft}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">
                    seconds left
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-3">
                Did you experience an accidental fall?
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                A sudden downward movement with deceleration impact was observed. Please select your current status to prevent emergency sirens or ambulance calls.
              </p>

              {/* 4 Proportional Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                {/* 1. I'm Okay */}
                <button
                  onClick={handleImOkay}
                  className="w-full py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I'm Okay (False Alarm)</span>
                </button>

                {/* 2. Minor Slip / No Injury */}
                <button
                  onClick={handleMinorFall}
                  className="w-full py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>I Fell (Minor / No Injury)</span>
                </button>

                {/* 3. Emergency Assistance */}
                <button
                  onClick={handleNeedHelp}
                  className="w-full py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 animate-pulse"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>I Need Emergency Help</span>
                </button>

                {/* 4. Phone Drop */}
                <button
                  onClick={handleDeviceDrop}
                  className="w-full py-3 px-3 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Device Drop (Phone Dropped)</span>
                </button>
              </div>

              {/* Posture Recovery Option */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 text-center">
                <button
                  onClick={handleSimulatePickup}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>🔄 Simulate resident stood back up / recovered upright posture</span>
                </button>
                <span className="block text-[10px] text-slate-400 mt-0.5">
                  Vision sentinel auto-cancels alerts when upright equilibrium is restored within 5s
                </span>
              </div>
            </>
          ) : resolvedStatus === "safe" ? (
            <div className="py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Resident Verified Safe</h4>
              <p className="text-xs text-slate-500 mt-1">
                False alarm suppressed. Event logged to micro-audit trail as Self-Resolved.
              </p>
            </div>
          ) : resolvedStatus === "minor_fall" ? (
            <div className="py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Minor Event Logged</h4>
              <p className="text-xs text-slate-500 mt-1">
                Care note recorded for family & nurse. Emergency sirens and ambulance dispatch avoided.
              </p>
            </div>
          ) : resolvedStatus === "device_drop" ? (
            <div className="py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Device Drop Suppressed</h4>
              <p className="text-xs text-slate-500 mt-1">
                Sensor impact attributed to dropped hardware. Fall alarm cancelled.
              </p>
            </div>
          ) : resolvedStatus === "picked_up" ? (
            <div className="py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Upright Posture Restored</h4>
              <p className="text-xs text-slate-500 mt-1">
                Vision tracking confirmed vertical recovery. Fall alarm resolved automatically.
              </p>
            </div>
          ) : (
            <div className="py-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 animate-bounce">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-rose-900">
                {resolvedStatus === "timeout_emergency" ? "Verification Timed Out (30s)" : "Emergency Assistance Requested"}
              </h4>
              <p className="text-xs text-rose-700 mt-1 max-w-sm mx-auto">
                Automatic Emergency Protocol Activated: Calling Family &rarr; Backup &rarr; 108 Ambulance with live GPS & vital telemetry.
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 text-left">
                <div>&bull; Calling: {activePatient?.primaryContact || "Rajesh Sharma (Son) · +91 94342 88100"}... [DIALING]</div>
                <div>&bull; Dispatched: {activePatient?.id === "REJ-9120" ? "Little Andaman Marine Ambulance & 108 PHC Station" : activePatient?.id === "WARD-STA-01" ? "GB Pant Hospital Crash Team & Code Blue" : "GB Pant Hospital Ambulance Station (108)"}</div>
                <div>&bull; Location: {activePatient?.location || "Junglighat, Port Blair (11.6643° N, 92.7303° E)"}</div>
              </div>
              <button
                onClick={onClose}
                className="mt-5 px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Close Dialog & Return to Triage
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// prototype/public/src/components/AlertsView.jsx
// Clinical Alerts & Automated Emergency Call Chain Escalation (Enterprise Clinical Grade)

const AlertsView = () => {
  const callLadder = [
    {
      tier: "Tier 1: Family Caregiver",
      contact: "Priya Sharma (Daughter)",
      phone: "+91 94342 81101",
      status: "Answered",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      time: "11:02:14 AM (Call duration: 1m 24s)",
      note: "Caregiver confirmed patient is responsive, sitting in living room. Rechecking BP in 15m.",
    },
    {
      tier: "Tier 2: Backup Emergency Contact",
      contact: "Rajesh Sharma (Son)",
      phone: "+91 94342 81102",
      status: "Standby",
      statusColor: "text-slate-600 bg-slate-50 border-slate-200",
      time: "Armed (Triggers if Tier 1 unanswered for 45s)",
      note: "Standby escalation route.",
    },
    {
      tier: "Tier 3: Emergency Dispatch (108 / 112)",
      contact: "Andaman & Nicobar Emergency Response Service",
      phone: "108 / 112 (Direct Dispatch)",
      status: "Standby",
      statusColor: "text-slate-600 bg-slate-50 border-slate-200",
      time: "Armed (Auto-dispatches with GPS & Live Vitals Packet)",
      note: "GB Pant Hospital Ambulance Hub, Port Blair.",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Clinical Alerts &amp; 3-Tier Emergency Escalation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic Autonomous Emergency Call Chain • Zero Human Intermediary Latency
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Call Chain Armed &amp; Ready</span>
        </span>
      </div>

      {/* 3-Tier Escalation Ladder */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Emergency Call Ladder Execution Log</span>
        </h3>

        <div className="space-y-4">
          {callLadder.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">
                    {step.tier}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {step.contact}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  {step.phone}
                </div>
                <p className="text-xs text-slate-600 pt-0.5">{step.note}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border ${step.statusColor}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.status}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

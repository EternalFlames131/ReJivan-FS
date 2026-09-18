// prototype/public/src/components/AlertsView.jsx
// Clinical Alerts & Automated Emergency Call Chain Escalation (Enterprise Clinical Grade - Account Aware)

const AlertsView = ({ currentUser, activePatient }) => {
  const getCallLadderForUser = (user, patient) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return {
        patientTitle: "Ram Prakash (Little Andaman)",
        locationText: "Hut Bay, Little Andaman • Autonomous Satellite/Cellular Call Relay",
        ladder: [
          {
            tier: "Tier 1: Primary Family Caregiver",
            contact: "Rajesh Prakash (Son)",
            phone: "+91 94742 19203",
            status: "Answered",
            statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
            time: "10:14:08 AM (Call duration: 48s)",
            note: "Caregiver confirmed father checked blood glucose (142 mg/dL) after breakfast. Resident upright on verandah.",
          },
          {
            tier: "Tier 2: Backup Emergency Contact",
            contact: "Sunita Prakash (Daughter-in-law)",
            phone: "+91 94742 19204",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Triggers if Tier 1 unanswered for 45s)",
            note: "Stationed near Hut Bay Primary Health Centre (PHC).",
          },
          {
            tier: "Tier 3: Island Emergency & Marine Ambulance (108)",
            contact: "Little Andaman Marine Ambulance & 108 Hub",
            phone: "108 / 112 (Hut Bay Wharf Jetty)",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Auto-dispatches with GPS & Live CGM Packet)",
            note: "Direct coordination with Hut Bay PHC & Marine Evacuation.",
          },
        ],
      };
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return {
        patientTitle: "GB Pant Hospital Virtual Ward",
        locationText: "Inpatient Clinical Telemetry Center • Rapid Response System (RRS)",
        ladder: [
          {
            tier: "Tier 1: On-Duty Inpatient Nurse Intercom",
            contact: "Nurse Priya / Nurse Anjali (Shift Handover Desk)",
            phone: "Ext. 402 (Ward A Central Console)",
            status: "Answered",
            statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
            time: "Continuous Active Audio Link (Latency: 0.02ms)",
            note: "Station nurse acknowledging real-time telemetry threshold events for Beds 101–104.",
          },
          {
            tier: "Tier 2: Attending Medical Emergency Team (MET)",
            contact: "Dr. A. Sen, MD (Cardiology On-Call)",
            phone: "Ext. 104 / Speed Dial 94342 81100",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Automatic escalation if NEWS2 Score >= 5)",
            note: "On-call physician mobile paging with encrypted vital packet.",
          },
          {
            tier: "Tier 3: Code Blue / ICU Outreach Resuscitation Team",
            contact: "GB Pant Critical Care Emergency Outreach",
            phone: "Code Blue Speed Dial (Ext. 222)",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Immediate mobilization on Cardiac Arrest / NEWS2 >= 7)",
            note: "Crash cart and ICU crash team dispatched to bedside.",
          },
        ],
      };
    }

    // Default: Anita Sharma
    return {
      patientTitle: "Anita Sharma (Junglighat)",
      locationText: "Living Room, Junglighat, Port Blair • Deterministic Autonomous Emergency Call Chain",
      ladder: [
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
          note: "Standby escalation route • Aberdeen Bazar, Port Blair.",
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
      ],
    };
  };

  const accountLadder = React.useMemo(() => getCallLadderForUser(currentUser, activePatient), [currentUser?.email]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Clinical Alerts &amp; 3-Tier Emergency Escalation
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                {accountLadder.patientTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {accountLadder.locationText}
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
          {accountLadder.ladder.map((step, idx) => (
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

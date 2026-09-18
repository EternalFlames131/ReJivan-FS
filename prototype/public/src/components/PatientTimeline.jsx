// prototype/public/src/components/PatientTimeline.jsx
// Patient Timeline Feed (Enterprise Clinical Grade Micro-Audit Trail - Account Aware)

const PatientTimeline = ({ events = [], currentUser }) => {
  const getDefaultEventsForUser = (user) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return [
        {
          id: "ev-rp-1",
          time: "11:15 AM",
          title: "Continuous CGM Telemetry Sync",
          desc: "FreeStyle Libre 3 packet ingested (142 mg/dL). Baseline glycemic stability confirmed via Satellite Hub.",
          type: "telemetry",
          icon: RefreshCw,
          iconColor: "text-blue-600 bg-blue-50",
        },
        {
          id: "ev-rp-2",
          time: "10:30 AM",
          title: "Optical Gait Assessment Nominal",
          desc: "Hut Bay Verandah optical sensor detected normal walking speed (0.84 m/s). Zero kinematic trip events.",
          type: "camera",
          icon: Video,
          iconColor: "text-indigo-600 bg-indigo-50",
        },
        {
          id: "ev-rp-3",
          time: "09:15 AM",
          title: "Endocrinologist Tele-Review",
          desc: "Dr. K. Nair reviewed weekly CGM trend: 'HbA1c trajectory improving, continue morning Metformin schedule'.",
          type: "clinical",
          icon: FileText,
          iconColor: "text-emerald-600 bg-emerald-50",
        },
        {
          id: "ev-rp-4",
          time: "08:10 AM",
          title: "Medication Adherence Verified",
          desc: "Morning doses confirmed: Metformin HCl 500mg and Glimepiride 1mg taken on schedule.",
          type: "medication",
          icon: CheckCircle2,
          iconColor: "text-emerald-600 bg-emerald-50",
        },
      ];
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return [
        {
          id: "ev-wn-1",
          time: "11:00 AM",
          title: "Multi-Bed Telemetry Synchronization",
          desc: "All 4 inpatient beds streaming with 0 packet loss across GB Pant Ward A BLE Mesh network.",
          type: "telemetry",
          icon: RefreshCw,
          iconColor: "text-blue-600 bg-blue-50",
        },
        {
          id: "ev-wn-2",
          time: "10:15 AM",
          title: "Bedside Intercom Handover Check",
          desc: "Shift A nurse check-in completed with Bed 101 and Bed 103. Two-way audio channels verified clear.",
          type: "camera",
          icon: Video,
          iconColor: "text-indigo-600 bg-indigo-50",
        },
        {
          id: "ev-wn-3",
          time: "09:00 AM",
          title: "Consultant Physician Ward Rounds",
          desc: "Dr. A. Sen and Dr. V. Rao completed bed-to-bed clinical assessment and approved telemetry protocols.",
          type: "clinical",
          icon: FileText,
          iconColor: "text-emerald-600 bg-emerald-50",
        },
        {
          id: "ev-wn-4",
          time: "08:00 AM",
          title: "Morning Inpatient MAR Administered",
          desc: "100% morning inpatient doses administered and digitally signed off by Shift A nursing staff.",
          type: "medication",
          icon: CheckCircle2,
          iconColor: "text-emerald-600 bg-emerald-50",
        },
      ];
    }

    // Default: Anita Sharma
    return [
      {
        id: "ev-1",
        time: "11:15 AM",
        title: "Continuous Vitals Sync",
        desc: "Telemetry sync completed via BLE Gateway. Confidence: 98% (0 dropped packets).",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "ev-2",
        time: "10:48 AM",
        title: "Camera Zone Motion Detection",
        desc: "Living Room Zone 1: Patient detected moving to armchair. Posture: Normal seated.",
        type: "camera",
        icon: Video,
        iconColor: "text-indigo-600 bg-indigo-50",
      },
      {
        id: "ev-3",
        time: "09:30 AM",
        title: "Tele-Checkup Clinical Note",
        desc: "Dr. Sen (GB Pant Hospital) reviewed BP trend: 'Continue current dose, recheck post-lunch'.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "ev-4",
        time: "08:12 AM",
        title: "Medication Adherence Verified",
        desc: "Morning dosage confirmed: Telmisartan 40mg and Metformin 500mg taken.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ];
  };

  const defaultEvents = React.useMemo(() => getDefaultEventsForUser(currentUser), [currentUser?.email]);
  const displayEvents = events.length > 0 ? events : defaultEvents;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Patient Timeline Feed
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          DPDP Audit Log
        </span>
      </div>

      {/* Timeline Items */}
      <div className="mt-3.5 relative pl-4 border-l border-slate-200 space-y-4">
        {displayEvents.map((ev) => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="relative group">
              {/* Bullet node on timeline */}
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-600 transition-colors" />

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-xs text-slate-900">
                  {ev.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {ev.time}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {ev.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// prototype/public/src/components/RecentAlerts.jsx
// Recent Alerts Card (Enterprise Clinical Grade - Account Aware)

const RecentAlerts = ({ alerts = [], onAcknowledge, currentUser, activePatient }) => {
  const getDefaultAlertsForUser = (user, patient) => {
    if (patient?.alerts && patient.alerts.length > 0) {
      return patient.alerts;
    }

    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return [
        {
          id: "alt-rp-1",
          title: "Postprandial Blood Glucose Elevation",
          reading: "168 mg/dL",
          time: "14m ago",
          severity: "caution",
          message: "FreeStyle Libre 3 CGM trend rising post-meal. Scheduled 1h trajectory review.",
          source: "FreeStyle Libre 3 CGM",
        },
        {
          id: "alt-rp-2",
          title: "Cellular Telemetry Gateway Uplink Nominal",
          reading: "4G LTE Active (-68 dBm)",
          time: "38m ago",
          severity: "info",
          message: "Little Andaman autonomous link stable. Zero packet drop across Hut Bay.",
          source: "Gateway #AP-4109",
        },
        {
          id: "alt-rp-3",
          title: "Nighttime Immobility Sentinel Clear",
          reading: "Nominal Sleep Pattern",
          time: "1h ago",
          severity: "info",
          message: "Bedroom Optical Sensor: Resident resting safely in bed. Zero out-of-bed falls.",
          source: "Optical Edge Sentinel",
        },
      ];
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return [
        {
          id: "alt-wn-1",
          title: "Bed 101 (Anita Sharma): Elevated Systolic BP",
          reading: "154/97 mmHg",
          time: "6m ago",
          severity: "caution",
          message: "Systolic threshold >140 exceeded. Automated re-check scheduled in 15m.",
          source: "Bedside NIBP Monitor",
        },
        {
          id: "alt-wn-2",
          title: "Bed 104 (Kavitha Raman): Sinus Tachycardia",
          reading: "94 bpm",
          time: "19m ago",
          severity: "caution",
          message: "Mild pulse elevation under Holter telemetry observation. Shift B notified.",
          source: "Holter Telemetry CW-9012",
        },
        {
          id: "alt-wn-3",
          title: "Bed 103 (Meera Nair): Post-Op Day 2 Nominal",
          reading: "SpO2 99% • Temp 36.9°C",
          time: "35m ago",
          severity: "info",
          message: "Post-cholecystectomy telemetry nominal. Surgical recovery protocol active.",
          source: "Philips IntelliVue MP50",
        },
      ];
    }

    // Default: Anita Sharma
    return [
      {
        id: "alt-1",
        title: "Blood Pressure Elevated",
        reading: "149/97 mmHg",
        time: "8m ago",
        severity: "caution",
        message: "Systolic threshold >140 exceeded. Auto-recheck scheduled in 15m.",
        source: "Omron HEM-7156T",
      },
      {
        id: "alt-2",
        title: "Automated Temp Telemetry",
        reading: "37.0 °C",
        time: "21m ago",
        severity: "info",
        message: "Hourly baseline verified. Normal core temperature maintained.",
        source: "TempTraq Patch",
      },
      {
        id: "alt-3",
        title: "Fall Prevention Radar Check",
        reading: "Room Clear",
        time: "42m ago",
        severity: "info",
        message: "Living Room Zone 1: Patient safely seated in armchair.",
        source: "Overhead Edge Camera",
      },
    ];
  };

  const defaultAlerts = React.useMemo(
    () => getDefaultAlertsForUser(currentUser, activePatient),
    [currentUser?.email, activePatient?.patientId, activePatient?.id, activePatient?.bedNumber]
  );
  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Alerts
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Auto-triage active
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {displayAlerts.map((alt) => {
          const isCaution = alt.severity === "caution" || alt.severity === "warning";
          const isDanger = alt.severity === "danger" || alt.severity === "critical";

          return (
            <div
              key={alt.id}
              className={`p-3 rounded-lg border transition-colors ${
                isDanger
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-900"
                  : isCaution
                  ? "bg-amber-50/60 border-amber-200/80 text-amber-900"
                  : "bg-slate-50/70 border-slate-200/70 text-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  {isDanger ? (
                    <Activity className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  ) : isCaution ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                  <span>{alt.title}</span>
                </div>
                <span
                  className={`text-[10px] font-mono shrink-0 font-medium ${
                    isCaution ? "text-amber-700" : "text-slate-400"
                  }`}
                >
                  {alt.time}
                </span>
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`text-xs font-bold font-mono ${
                    isDanger
                      ? "text-rose-700"
                      : isCaution
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                >
                  {alt.reading}
                </span>
                <span className="text-[11px] text-slate-500 truncate">
                  • {alt.source}
                </span>
              </div>

              <p className="text-[11px] mt-1 leading-snug opacity-90 text-slate-600">
                {alt.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// prototype/public/src/components/RecentAlerts.jsx
// Recent Alerts Card (Enterprise Clinical Grade)

const RecentAlerts = ({ alerts = [], onAcknowledge }) => {
  const defaultAlerts = [
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

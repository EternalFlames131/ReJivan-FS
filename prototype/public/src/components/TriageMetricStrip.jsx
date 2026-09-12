// prototype/public/src/components/TriageMetricStrip.jsx
// Global Triage Metric Strip (4-column grid, Enterprise Clinical Grade)

const TriageMetricStrip = ({
  patientsCount = 1,
  normalCount = 0,
  cautionCount = 1,
  dangerCount = 0,
  cautionText = "Elevated BP: 149/97 mmHg",
  dangerText = "Emergency escalation armed",
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {/* 1. Patients Monitored */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Patients Monitored
          </span>
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {patientsCount}
          </span>
          <span className="text-xs text-slate-500">Active</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Continuous Bio-Telemetry</span>
        </div>
      </div>

      {/* 2. Normal (Neutral dark typography with subtle green indicator dot, NO heavy green pill spam) */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Normal
          </span>
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {normalCount}
          </span>
          <span className="text-xs text-slate-500">Patients</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Vitals within target limits</span>
        </div>
      </div>

      {/* 3. Caution (Soft amber background with crisp amber text) */}
      <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Caution
          </span>
          <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-amber-900 tabular-nums">
            {cautionCount}
          </span>
          <span className="text-xs font-medium text-amber-700">Needs Review</span>
        </div>
        <div className="mt-1 text-[11px] text-amber-800 truncate font-medium">
          {cautionText}
        </div>
      </div>

      {/* 4. Danger / Critical */}
      <div
        className={`rounded-xl p-4 shadow-xs border ${
          dangerCount > 0
            ? "bg-rose-50 border-rose-200 text-rose-700"
            : "bg-white border-slate-200/80 text-slate-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              dangerCount > 0 ? "text-rose-700" : "text-slate-500"
            }`}
          >
            Danger
          </span>
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center ${
              dangerCount > 0
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold font-mono tabular-nums ${
              dangerCount > 0 ? "text-rose-700" : "text-slate-900"
            }`}
          >
            {dangerCount}
          </span>
          <span className="text-xs text-slate-500">Critical</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-500 truncate">
          {dangerCount > 0 ? dangerText : "Zero active emergencies"}
        </div>
      </div>
    </div>
  );
};

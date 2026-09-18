// prototype/public/src/components/PatientOverviewCard.jsx
// Patient Overview Card (Enterprise Clinical Grade)

const PatientOverviewCard = ({
  patient = {
    name: "Anita Sharma",
    age: 67,
    gender: "Female",
    location: "Home → Living Room, Junglighat, Port Blair",
    status: "Monitoring",
    lastUpdated: "2 min ago",
  },
  onCallCaregiver,
  onClinicalExport,
}) => {
  const initials = patient.name
    ? patient.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "AS";

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Avatar + Identity + Location */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Clinical Avatar Badge */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs border border-blue-400/20">
            {initials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {patient.name}
              </h2>
              {/* Monitoring Status Badge with Live Pulse */}
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{patient.status || "Monitoring"}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {patient.patientId || patient.id || "REJ-8042"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">
                {patient.age} years | {patient.gender}
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{patient.location}</span>
              </div>
              <span className="text-slate-300 hidden md:inline">•</span>
              <span className="text-slate-400 hidden md:inline">
                Last updated: <span className="font-mono text-slate-600">{patient.lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick-Action Buttons */}
        <div className="flex items-center gap-2 sm:self-center shrink-0">
          <button
            onClick={onCallCaregiver}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
            title="Initiate Caregiver / Nurse Voice Link"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Call Caregiver</span>
          </button>

          <button
            onClick={onClinicalExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
            title="Download Telemetry Audit & Vitals Summary"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Clinical Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

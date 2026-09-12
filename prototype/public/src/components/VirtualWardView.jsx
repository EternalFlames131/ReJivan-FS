// prototype/public/src/components/VirtualWardView.jsx
// Virtual Ward Multi-Bed Telemetry Center (GB Pant Hospital, Port Blair)

const VirtualWardView = () => {
  const [filter, setFilter] = React.useState("all");

  const wardBeds = [
    {
      bed: "Bed 101",
      patient: "Anita Sharma",
      age: 67,
      gender: "F",
      condition: "Hypertension / Post-Stroke Watch",
      vitals: { hr: 85, spo2: 97.7, bp: "149/97", temp: "37.0" },
      status: "caution",
      statusLabel: "Caution (Elevated BP)",
      nurse: "Nurse Priya (Shift A)",
      ward: "GB Pant Hospital, Male/Female Ward A",
    },
    {
      bed: "Bed 102",
      patient: "Ram Prakash",
      age: 72,
      gender: "M",
      condition: "Type-2 Diabetes / Remote Telemetry",
      vitals: { hr: 74, spo2: 98.2, bp: "122/80", temp: "36.8" },
      status: "normal",
      statusLabel: "Stable",
      nurse: "Nurse Priya (Shift A)",
      ward: "Little Andaman Telemetry Link",
    },
    {
      bed: "Bed 103",
      patient: "Meera Nair",
      age: 58,
      gender: "F",
      condition: "Post-Op Day 2 (Cholecystectomy)",
      vitals: { hr: 78, spo2: 99.0, bp: "118/76", temp: "36.9" },
      status: "normal",
      statusLabel: "Stable",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Surgical Recovery",
    },
    {
      bed: "Bed 104",
      patient: "Kavitha Raman",
      age: 64,
      gender: "F",
      condition: "Arrhythmia / Holter Telemetry Watch",
      vitals: { hr: 94, spo2: 96.5, bp: "138/88", temp: "37.1" },
      status: "caution",
      statusLabel: "Caution (Sinus Tachycardia)",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Cardiology Unit",
    },
  ];

  const filteredBeds = wardBeds.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Virtual Ward Telemetry Center
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              GB Pant Hospital, Port Blair • Real-Time Bedside &amp; Outpatient Monitoring
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Beds ({wardBeds.length})
          </button>
          <button
            onClick={() => setFilter("caution")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "caution"
                ? "bg-white text-amber-800 shadow-2xs"
                : "text-slate-600 hover:text-amber-800"
            }`}
          >
            Caution (2)
          </button>
          <button
            onClick={() => setFilter("normal")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "normal"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Stable (2)
          </button>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBeds.map((bed, idx) => {
          const isCaution = bed.status === "caution";
          return (
            <div
              key={idx}
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                isCaution
                  ? "border-amber-200/90 ring-1 ring-amber-400/20"
                  : "border-slate-200/80"
              }`}
            >
              {/* Bed Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-700">
                    <BedDouble className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {bed.bed}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-sm text-slate-800">
                        {bed.patient}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({bed.age}{bed.gender})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {bed.ward}
                    </p>
                  </div>
                </div>

                {isCaution ? (
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                    {bed.statusLabel}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{bed.statusLabel}</span>
                  </span>
                )}
              </div>

              {/* Patient Condition */}
              <div className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
                <span className="font-medium text-slate-800">Diagnosis:</span>
                <span>{bed.condition}</span>
              </div>

              {/* Vitals Telemetry Grid */}
              <div className="grid grid-cols-4 gap-2 my-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    HR
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.hr}
                  </span>
                  <span className="text-[10px] text-slate-400 block">bpm</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    SpO2
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.spo2}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">O2</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    BP
                  </span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      isCaution ? "text-amber-700" : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.bp}
                  </span>
                  <span className="text-[10px] text-slate-400 block">mmHg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Temp
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.temp}
                  </span>
                  <span className="text-[10px] text-slate-400 block">°C</span>
                </div>
              </div>

              {/* Nurse footer & Actions */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <span>{bed.nurse}</span>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    Intercom
                  </button>
                  <button className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                    View Chart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

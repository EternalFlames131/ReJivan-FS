// prototype/public/src/components/MedicinesView.jsx
// Medication Administration Record (Enterprise Clinical Grade)

const MedicinesView = ({ onOpenAddModal }) => {
  const [meds, setMeds] = React.useState([
    {
      id: "med-1",
      name: "Telmisartan",
      dosage: "40 mg",
      frequency: "Once daily (Morning)",
      time: "08:00 AM",
      prescribedFor: "Anita Sharma",
      indication: "Essential Hypertension",
      doctor: "Dr. A. Sen (Cardiology, GB Pant Hospital)",
      status: "Taken",
      adherence: "98%",
    },
    {
      id: "med-2",
      name: "Metformin Hydrochloride",
      dosage: "500 mg",
      frequency: "Twice daily (Post-meal)",
      time: "08:00 AM, 08:00 PM",
      prescribedFor: "Anita Sharma",
      indication: "Type 2 Diabetes Mellitus",
      doctor: "Dr. K. Roy (Internal Medicine)",
      status: "Taken",
      adherence: "95%",
    },
    {
      id: "med-3",
      name: "Calcium Carbonate + Vit D3",
      dosage: "500 mg / 250 IU",
      frequency: "Once daily (Afternoon)",
      time: "01:00 PM",
      prescribedFor: "Anita Sharma",
      indication: "Osteopenia / Bone Health",
      doctor: "Dr. A. Sen",
      status: "Taken",
      adherence: "100%",
    },
    {
      id: "med-4",
      name: "Atorvastatin",
      dosage: "10 mg",
      frequency: "Once daily (Bedtime)",
      time: "08:00 PM",
      prescribedFor: "Anita Sharma",
      indication: "Hyperlipidemia / Stroke Prevention",
      doctor: "Dr. A. Sen",
      status: "Upcoming",
      adherence: "96%",
    },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Adherence Summary */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Medication Administration Record (MAR)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated Schedule &amp; Caregiver Adherence Verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-500">Weekly Adherence</div>
            <div className="text-base font-bold font-mono text-emerald-700">97.2%</div>
          </div>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Medication List Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Medication &amp; Dosage</th>
                <th className="py-3 px-5">Schedule &amp; Times</th>
                <th className="py-3 px-5">Clinical Indication</th>
                <th className="py-3 px-5">Prescribing Physician</th>
                <th className="py-3 px-5">Today's Status</th>
                <th className="py-3 px-5 text-right">Adherence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {meds.map((m) => {
                const isTaken = m.status === "Taken";
                return (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                      <div className="text-xs font-mono font-medium text-blue-600">{m.dosage}</div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="text-xs font-medium text-slate-700">{m.frequency}</div>
                      <div className="text-[11px] font-mono text-slate-400">{m.time}</div>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-600">
                      {m.indication}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-600">
                      {m.doctor}
                    </td>
                    <td className="py-3.5 px-5">
                      {isTaken ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Taken</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>Upcoming</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono font-bold text-xs text-slate-800">
                      {m.adherence}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// prototype/public/src/components/MedicationScheduleCard.jsx
// Medication Schedule Card (Enterprise Clinical Grade - Account Aware)

const MedicationScheduleCard = ({ onOpenAddModal, currentUser }) => {
  const getSchedulesForUser = (user) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return [
        {
          slot: "Morning (08:00 AM)",
          timeCode: "08:00",
          drugs: [
            {
              id: "med-rp-1",
              name: "Metformin HCl",
              dose: "500 mg",
              purpose: "Type-2 Diabetes / Glycemic Control",
              status: "Taken",
              takenAt: "08:10 AM",
            },
            {
              id: "med-rp-2",
              name: "Glimepiride",
              dose: "1 mg",
              purpose: "Insulin Secretagogue (Pancreatic Beta Cells)",
              status: "Taken",
              takenAt: "08:10 AM",
            },
          ],
        },
        {
          slot: "Afternoon (01:00 PM)",
          timeCode: "13:00",
          drugs: [
            {
              id: "med-rp-3",
              name: "Alpha Lipoic Acid",
              dose: "300 mg",
              purpose: "Diabetic Peripheral Neuropathy Support",
              status: "Taken",
              takenAt: "01:20 PM",
            },
          ],
        },
        {
          slot: "Evening (08:00 PM)",
          timeCode: "20:00",
          drugs: [
            {
              id: "med-rp-4",
              name: "Atorvastatin",
              dose: "20 mg",
              purpose: "Cardiovascular Risk Reduction",
              status: "Upcoming",
              takenAt: null,
            },
          ],
        },
      ];
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return [
        {
          slot: "Morning Inpatient Round (08:00 AM)",
          timeCode: "08:00",
          drugs: [
            {
              id: "med-wn-1",
              name: "Bed 101: Telmisartan",
              dose: "40 mg",
              purpose: "Anita Sharma • Essential Hypertension",
              status: "Taken",
              takenAt: "08:05 AM",
            },
            {
              id: "med-wn-2",
              name: "Bed 102: Metformin",
              dose: "500 mg",
              purpose: "Ram Prakash • Type-2 Diabetes",
              status: "Taken",
              takenAt: "08:12 AM",
            },
          ],
        },
        {
          slot: "Mid-Morning Inpatient Round (09:00 AM)",
          timeCode: "09:00",
          drugs: [
            {
              id: "med-wn-3",
              name: "Bed 103: Cefuroxime (IV)",
              dose: "500 mg",
              purpose: "Meera Nair • Post-Op Surgical Prophylaxis",
              status: "Taken",
              takenAt: "09:05 AM",
            },
            {
              id: "med-wn-4",
              name: "Bed 104: Metoprolol",
              dose: "25 mg",
              purpose: "Kavitha Raman • Sinus Tachycardia / AFib",
              status: "Taken",
              takenAt: "09:15 AM",
            },
          ],
        },
        {
          slot: "Evening Inpatient Round (08:00 PM)",
          timeCode: "20:00",
          drugs: [
            {
              id: "med-wn-5",
              name: "Bed 101: Atorvastatin",
              dose: "10 mg",
              purpose: "Anita Sharma • Hyperlipidemia Watch",
              status: "Upcoming",
              takenAt: null,
            },
          ],
        },
      ];
    }

    // Default: Anita Sharma
    return [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "med-1",
            name: "Telmisartan",
            dose: "40 mg",
            purpose: "Essential Hypertension",
            status: "Taken",
            takenAt: "08:05 AM",
          },
          {
            id: "med-2",
            name: "Metformin HCl",
            dose: "500 mg",
            purpose: "Glycemic Management",
            status: "Taken",
            takenAt: "08:12 AM",
          },
        ],
      },
      {
        slot: "Afternoon (01:00 PM)",
        timeCode: "13:00",
        drugs: [
          {
            id: "med-3",
            name: "Calcium + Vit D3",
            dose: "500mg / 250IU",
            purpose: "Osteopenia / Bone Density",
            status: "Taken",
            takenAt: "01:15 PM",
          },
        ],
      },
      {
        slot: "Evening (08:00 PM)",
        timeCode: "20:00",
        drugs: [
          {
            id: "med-4",
            name: "Atorvastatin",
            dose: "10 mg",
            purpose: "Lipid Management / Stroke Watch",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ];
  };

  const [schedule, setSchedule] = React.useState(() => getSchedulesForUser(currentUser));

  // Sync schedule whenever user changes
  React.useEffect(() => {
    setSchedule(getSchedulesForUser(currentUser));
  }, [currentUser?.email]);

  const toggleDrugTaken = (drugId) => {
    setSchedule((prev) =>
      prev.map((slot) => ({
        ...slot,
        drugs: slot.drugs.map((drug) => {
          if (drug.id === drugId) {
            const isNowTaken = drug.status !== "Taken";
            const nowTime = new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return {
              ...drug,
              status: isNowTaken ? "Taken" : "Upcoming",
              takenAt: isNowTaken ? nowTime : null,
            };
          }
          return drug;
        }),
      }))
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Pill className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Medication Schedule
          </h3>
        </div>
        <button
          onClick={onOpenAddModal}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          <span>Add Drug</span>
        </button>
      </div>

      {/* Chronological Timeline Slots */}
      <div className="mt-3.5 space-y-4">
        {schedule.map((slotGroup, sIdx) => (
          <div key={sIdx} className="relative pl-3 border-l-2 border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{slotGroup.slot}</span>
            </div>

            <div className="space-y-2">
              {slotGroup.drugs.map((drug) => {
                const isTaken = drug.status === "Taken";

                return (
                  <div
                    key={drug.id}
                    onClick={() => toggleDrugTaken(drug.id)}
                    className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    title={isTaken ? "Click to mark upcoming" : "Click to mark as taken"}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Checkbox circle */}
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                          isTaken
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-300 group-hover:border-blue-500 bg-white"
                        }`}
                      >
                        {isTaken && <Check className="w-3 h-3 stroke-[2.5]" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-semibold truncate ${
                              isTaken
                                ? "text-slate-800"
                                : "text-slate-900 font-bold"
                            }`}
                          >
                            {drug.name}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {drug.dose}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {drug.purpose}
                        </p>
                      </div>
                    </div>

                    {/* Status Tag */}
                    <div className="shrink-0">
                      {isTaken ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Taken ({drug.takenAt})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/70">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>Upcoming</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

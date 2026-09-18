// prototype/public/src/components/VirtualWardView.jsx
// Virtual Ward Multi-Bed Telemetry Center (GB Pant Hospital, Port Blair)
// Fully synchronized with central dashboard telemetry, physiological drift & interactive patient chart modal

const VirtualWardView = ({
  currentVitals = {
    hr: 85,
    spo2: 97.7,
    bpSys: 149,
    bpDia: 97,
    temp: 37.0,
    glucose: 112,
    sparkHr: [82, 84, 83, 85, 84, 86, 85, 84, 85],
    sparkSpo2: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
    sparkBp: [142, 144, 146, 145, 148, 147, 150, 148, 149],
    sparkTemp: [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
    sparkGlucose: [115, 112, 114, 110, 113, 111, 114, 112, 112],
  },
  simMode = "baseline",
  isStreaming = true,
  secondsAgo = 0,
  onPageDoctor,
  onExportTelemetry,
  currentUser,
}) => {
  const [filter, setFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedBedNumber, setSelectedBedNumber] = React.useState(null);
  const [intercomToast, setIntercomToast] = React.useState(null);
  const [chartTab, setChartTab] = React.useState("trends"); // "trends" | "news2" | "clinical"

  // Secondary beds with stateful physiological micro-drift
  const [secondaryBeds, setSecondaryBeds] = React.useState([
    {
      bed: "Bed 102",
      patient: "Ram Prakash",
      age: 72,
      gender: "M",
      condition: "Type-2 Diabetes / Remote Telemetry",
      vitals: { hr: 74, spo2: 98.2, bpSys: 122, bpDia: 80, bp: "122/80", temp: 36.8, glucose: 142 },
      baseHr: 74,
      baseBpSys: 122,
      baseBpDia: 80,
      status: "normal",
      statusLabel: "Stable (Glycemic Watch)",
      nurse: "Nurse Priya (Shift A)",
      ward: "Little Andaman Telemetry Link (Hut Bay)",
      attendingDoc: "Dr. K. Nair, MD (Endocrinology)",
      admissionDate: "2026-09-12 (Glycemic Control)",
      deviceGateway: "Cellular RPM Hub #AP-4109",
      sparkHr: [73, 75, 74, 76, 74, 75, 74, 73, 74],
      sparkSpo2: [98.1, 98.3, 98.2, 98.0, 98.2, 98.3, 98.2, 98.1, 98.2],
      sparkBp: [120, 122, 124, 121, 123, 122, 125, 122, 122],
      sparkTemp: [36.8, 36.9, 36.8, 36.7, 36.8, 36.9, 36.8, 36.8, 36.8],
      sparkGlucose: [140, 142, 145, 141, 143, 142, 144, 142, 142],
      medications: ["Metformin 500mg (08:00 AM)", "Glimepiride 1mg (08:00 AM)", "Atorvastatin 10mg (08:00 PM)"],
      allergies: "None Reported (NKDA)",
    },
    {
      bed: "Bed 103",
      patient: "Meera Nair",
      age: 58,
      gender: "F",
      condition: "Post-Op Day 2 (Cholecystectomy)",
      vitals: { hr: 78, spo2: 99.0, bpSys: 118, bpDia: 76, bp: "118/76", temp: 36.9, glucose: 104 },
      baseHr: 78,
      baseBpSys: 118,
      baseBpDia: 76,
      status: "normal",
      statusLabel: "Stable (Post-Surgical)",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Surgical Recovery B",
      attendingDoc: "Dr. V. Rao, MS (General Surgery)",
      admissionDate: "2026-09-16 (Post-Surgical)",
      deviceGateway: "Bedside Monitor #BM-2041",
      sparkHr: [76, 78, 77, 79, 78, 77, 78, 79, 78],
      sparkSpo2: [99.0, 99.1, 98.9, 99.0, 99.2, 99.0, 98.9, 99.1, 99.0],
      sparkBp: [116, 118, 117, 119, 118, 116, 120, 118, 118],
      sparkTemp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9, 36.9, 36.9],
      sparkGlucose: [102, 105, 104, 106, 103, 104, 105, 104, 104],
      medications: ["Cefuroxime 500mg (09:00 AM)", "Paracetamol 650mg SOS", "Pantoprazole 40mg (07:00 AM)"],
      allergies: "Sulfa Antibiotics",
    },
    {
      bed: "Bed 104",
      patient: "Kavitha Raman",
      age: 64,
      gender: "F",
      condition: "Arrhythmia / Holter Telemetry Watch",
      vitals: { hr: 94, spo2: 96.5, bpSys: 138, bpDia: 88, bp: "138/88", temp: 37.1, glucose: 110 },
      baseHr: 94,
      baseBpSys: 138,
      baseBpDia: 88,
      status: "caution",
      statusLabel: "Caution (Sinus Tachycardia)",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Cardiology Unit",
      attendingDoc: "Dr. A. Sen, MD (Cardiology)",
      admissionDate: "2026-09-15 (Cardiac Telemetry)",
      deviceGateway: "Holter Wireless Telemetry #CW-9012",
      sparkHr: [92, 95, 93, 96, 94, 93, 97, 94, 94],
      sparkSpo2: [96.4, 96.6, 96.5, 96.3, 96.5, 96.7, 96.5, 96.4, 96.5],
      sparkBp: [136, 139, 138, 137, 140, 138, 136, 139, 138],
      sparkTemp: [37.1, 37.2, 37.0, 37.1, 37.2, 37.1, 37.0, 37.1, 37.1],
      sparkGlucose: [108, 111, 110, 112, 109, 110, 111, 110, 110],
      medications: ["Metoprolol Succinate 25mg (08:00 AM)", "Ecosprin 75mg (01:00 PM)"],
      allergies: "None Reported (NKDA)",
    },
  ]);

  // Micro-drift physiological telemetry simulation for secondary beds
  React.useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setSecondaryBeds((prev) =>
        prev.map((bed) => {
          const hrDelta = Math.round((Math.random() * 2 - 1) * 1.6);
          const spo2Delta = Math.round((Math.random() * 0.4 - 0.2) * 10) / 10;
          const bpSysDelta = Math.round((Math.random() * 2 - 1) * 2.2);
          const bpDiaDelta = Math.round((Math.random() * 2 - 1) * 1.5);
          const tempDelta = Math.round((Math.random() * 0.1 - 0.05) * 10) / 10;

          const newHr = Math.min(Math.max(bed.vitals.hr + hrDelta, bed.baseHr - 6), bed.baseHr + 6);
          const newSpo2 = Math.min(Math.max(Number((bed.vitals.spo2 + spo2Delta).toFixed(1)), 94.0), 99.8);
          const newBpSys = Math.min(Math.max(bed.vitals.bpSys + bpSysDelta, bed.baseBpSys - 8), bed.baseBpSys + 8);
          const newBpDia = Math.min(Math.max(bed.vitals.bpDia + bpDiaDelta, bed.baseBpDia - 6), bed.baseBpDia + 6);
          const newTemp = Math.min(Math.max(Number((bed.vitals.temp + tempDelta).toFixed(1)), 36.3), 37.6);

          const newSparkHr = [...bed.sparkHr.slice(1), newHr];
          const newSparkSpo2 = [...bed.sparkSpo2.slice(1), newSpo2];
          const newSparkBp = [...bed.sparkBp.slice(1), newBpSys];
          const newSparkTemp = [...bed.sparkTemp.slice(1), newTemp];

          return {
            ...bed,
            vitals: {
              ...bed.vitals,
              hr: newHr,
              spo2: newSpo2,
              bpSys: newBpSys,
              bpDia: newBpDia,
              bp: `${newBpSys}/${newBpDia}`,
              temp: newTemp,
            },
            sparkHr: newSparkHr,
            sparkSpo2: newSparkSpo2,
            sparkBp: newSparkBp,
            sparkTemp: newSparkTemp,
          };
        })
      );
    }, 1800);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Dynamically calculate Anita Sharma (Bed 101) from live stream
  const anitaData = React.useMemo(() => {
    const bpSys = Math.round(currentVitals?.bpSys || 149);
    const bpDia = Math.round(currentVitals?.bpDia || 97);
    const hr = Math.round(currentVitals?.hr || 85);
    const spo2 = Number(currentVitals?.spo2 || 97.7).toFixed(1);
    const temp = Number(currentVitals?.temp || 37.0).toFixed(1);
    const glucose = Math.round(currentVitals?.glucose || 112);

    let status = "normal";
    let statusLabel = "Stable (Nominal Sinus)";

    if (bpSys >= 170 || Number(spo2) < 91 || hr >= 115 || hr <= 48) {
      status = "danger";
      if (bpSys >= 170) statusLabel = "Critical (Hypertensive Crisis)";
      else if (Number(spo2) < 91) statusLabel = "Critical (Acute Hypoxemia)";
      else if (hr <= 48) statusLabel = "Critical (Severe Bradycardia)";
      else statusLabel = "Critical (Severe Tachycardia)";
    } else if (bpSys >= 140 || Number(spo2) <= 95 || hr >= 100) {
      status = "caution";
      if (bpSys >= 140) statusLabel = "Caution (Elevated BP)";
      else if (Number(spo2) <= 95) statusLabel = "Caution (Sub-optimal SpO2)";
      else statusLabel = "Caution (Mild Tachycardia)";
    }

    return {
      bed: "Bed 101",
      patient: "Anita Sharma",
      age: 67,
      gender: "F",
      condition: "Hypertension / Post-Stroke Watch",
      vitals: {
        hr,
        spo2: Number(spo2),
        bpSys,
        bpDia,
        bp: `${bpSys}/${bpDia}`,
        temp: Number(temp),
        glucose,
      },
      status,
      statusLabel,
      nurse: "Nurse Priya (Shift A)",
      ward: "GB Pant Hospital, Male/Female Ward A",
      attendingDoc: "Dr. A. Sen, MD (Cardiology)",
      admissionDate: "2026-09-14 (Post-Stroke Watch)",
      deviceGateway: "BLE Gateway #GW-8042 (Live Stream)",
      sparkHr: currentVitals?.sparkHr || [82, 84, 83, 85, 84, 86, 85, 84, 85],
      sparkSpo2: currentVitals?.sparkSpo2 || [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
      sparkBp: currentVitals?.sparkBp || [142, 144, 146, 145, 148, 147, 150, 148, 149],
      sparkTemp: currentVitals?.sparkTemp || [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
      sparkGlucose: currentVitals?.sparkGlucose || [115, 112, 114, 110, 113, 111, 114, 112, 112],
      medications: [
        "Amlodipine 5mg (08:00 AM)",
        "Aspirin 75mg (01:00 PM)",
        "Atorvastatin 20mg (08:00 PM)",
      ],
      allergies: "Penicillin (Mild Rash)",
    };
  }, [currentVitals]);

  // Combined real-time ward beds
  const wardBeds = React.useMemo(() => {
    return [anitaData, ...secondaryBeds];
  }, [anitaData, secondaryBeds]);

  // Calculate counts dynamically
  const cautionDangerCount = wardBeds.filter((b) => b.status === "caution" || b.status === "danger").length;
  const normalCount = wardBeds.filter((b) => b.status === "normal").length;

  // Filtered beds
  const filteredBeds = wardBeds.filter((b) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "caution" && (b.status === "caution" || b.status === "danger")) ||
      (filter === "normal" && b.status === "normal");

    const matchesSearch =
      searchQuery.trim() === "" ||
      b.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.condition.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Currently selected bed for chart modal (dynamically synced to live ward data)
  const activeModalBed = React.useMemo(() => {
    if (!selectedBedNumber) return null;
    return wardBeds.find((b) => b.bed === selectedBedNumber) || null;
  }, [selectedBedNumber, wardBeds]);

  // Calculate NEWS2 score
  const computeNEWS2 = (bed) => {
    if (!bed) return null;
    let score = 0;
    const breakdown = [];

    // 1. Oxygen Saturation (SpO2)
    const spo2 = Number(bed.vitals.spo2);
    let spo2Pts = 0;
    if (spo2 <= 91) spo2Pts = 3;
    else if (spo2 <= 93) spo2Pts = 2;
    else if (spo2 <= 95) spo2Pts = 1;
    else spo2Pts = 0;
    score += spo2Pts;
    breakdown.push({
      param: "Oxygen Saturation (SpO2)",
      value: `${spo2}%`,
      normal: "≥ 96%",
      pts: spo2Pts,
      status: spo2Pts === 0 ? "Nominal" : spo2Pts === 1 ? "Mild Hypoxia" : "Critical Hypoxemia",
      color: spo2Pts === 0 ? "text-emerald-700" : spo2Pts === 1 ? "text-amber-700" : "text-rose-700 font-bold",
    });

    // 2. Systolic Blood Pressure
    const bpSys = Number(bed.vitals.bpSys);
    let bpPts = 0;
    if (bpSys <= 90 || bpSys >= 220) bpPts = 3;
    else if (bpSys <= 100 || bpSys >= 170) bpPts = 2;
    else if (bpSys <= 110 || bpSys >= 140) bpPts = 1;
    else bpPts = 0;
    score += bpPts;
    breakdown.push({
      param: "Systolic Blood Pressure",
      value: `${bpSys} mmHg`,
      normal: "111 – 139 mmHg",
      pts: bpPts,
      status: bpPts === 0 ? "Normotensive" : bpPts === 1 ? "Elevated (Stage 2)" : "Hypertensive Crisis",
      color: bpPts === 0 ? "text-emerald-700" : bpPts === 1 ? "text-amber-700" : "text-rose-700 font-bold",
    });

    // 3. Heart Rate / Pulse
    const hr = Number(bed.vitals.hr);
    let hrPts = 0;
    if (hr <= 40 || hr >= 131) hrPts = 3;
    else if (hr >= 111) hrPts = 2;
    else if (hr <= 50 || hr >= 91) hrPts = 1;
    else hrPts = 0;
    score += hrPts;
    breakdown.push({
      param: "Pulse / Heart Rate",
      value: `${hr} bpm`,
      normal: "51 – 90 bpm",
      pts: hrPts,
      status: hrPts === 0 ? "Normal Sinus" : hrPts === 1 ? "Borderline Tachy/Brady" : "Severe Arrhythmia",
      color: hrPts === 0 ? "text-emerald-700" : hrPts === 1 ? "text-amber-700" : "text-rose-700 font-bold",
    });

    // 4. Body Temperature
    const temp = Number(bed.vitals.temp);
    let tempPts = 0;
    if (temp <= 35.0) tempPts = 3;
    else if (temp >= 39.1) tempPts = 2;
    else if (temp <= 36.0 || temp >= 38.1) tempPts = 1;
    else tempPts = 0;
    score += tempPts;
    breakdown.push({
      param: "Body Temperature",
      value: `${temp.toFixed(1)}°C`,
      normal: "36.1 – 38.0°C",
      pts: tempPts,
      status: tempPts === 0 ? "Apyrexial" : tempPts === 1 ? "Low-Grade Pyrexia" : "High Pyrexia / Hypothermia",
      color: tempPts === 0 ? "text-emerald-700" : tempPts === 1 ? "text-amber-700" : "text-rose-700 font-bold",
    });

    // 5. Neurological (AVPU Scale)
    const avpuPts = 0;
    score += avpuPts;
    breakdown.push({
      param: "Consciousness Level (AVPU)",
      value: "Alert (A)",
      normal: "Alert (A)",
      pts: avpuPts,
      status: "Fully Alert",
      color: "text-emerald-700",
    });

    let riskTier = "Low Clinical Risk (Ward Routine)";
    let badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-200";
    let actionGuide = "Standard ward telemetry observations (4–6 hour intervals). Continue continuous BLE monitoring.";

    if (score >= 7 || spo2Pts === 3 || bpPts === 3 || hrPts === 3) {
      riskTier = "High / Emergency Clinical Risk";
      badgeStyle = "bg-rose-50 text-rose-800 border-rose-200";
      actionGuide = "Immediate emergency doctor notification, Medical Emergency Team (MET) mobilization, continuous ECG & SpO2.";
    } else if (score >= 5 || spo2Pts >= 2 || bpPts >= 2 || hrPts >= 2) {
      riskTier = "Medium Clinical Risk (Urgent Review)";
      badgeStyle = "bg-amber-50 text-amber-800 border-amber-200";
      actionGuide = "Urgent bedside review by registered nurse; alert attending physician within 30 minutes. Step up observation frequency.";
    }

    return { score, breakdown, riskTier, badgeStyle, actionGuide };
  };

  const currentNews2 = computeNEWS2(activeModalBed);

  // Trigger bedside intercom toast
  const handleTriggerIntercom = (bed) => {
    setIntercomToast({
      bed: bed.bed,
      patient: bed.patient,
      nurse: bed.nurse,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    });

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      setIntercomToast((curr) => (curr?.bed === bed.bed ? null : curr));
    }, 6000);
  };

  // Export patient data
  const handleExportPatientData = (bed) => {
    if (onExportTelemetry && bed.bed === "Bed 101") {
      onExportTelemetry();
      return;
    }

    const report = {
      facility: "GB Pant Hospital, Port Blair",
      department: "Virtual Ward Telemetry Center",
      bed: bed.bed,
      patient: bed.patient,
      age: bed.age,
      gender: bed.gender,
      diagnosis: bed.condition,
      attendingPhysician: bed.attendingDoc,
      primaryNurse: bed.nurse,
      exportedAt: new Date().toISOString(),
      currentVitals: bed.vitals,
      recentTrends: {
        heartRateBpm: bed.sparkHr,
        spo2Percent: bed.sparkSpo2,
        bloodPressureSys: bed.sparkBp,
        temperatureC: bed.sparkTemp,
        glucoseMgDl: bed.sparkGlucose,
      },
      prescriptions: bed.medications,
      allergies: bed.allergies,
      compliance: "DPDP Act 2023 • ABDM HL7/FHIR Telehealth Compliant",
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bed.patient.replace(/\s+/g, "_")}_Telemetry_Chart_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-10">
      {/* Floating Active Intercom Toast */}
      {intercomToast && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full bg-slate-900/95 text-white border border-blue-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
            <Mic className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                🎙️ Bedside Two-Way Intercom Active
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{intercomToast.time}</span>
            </div>
            <p className="text-xs font-semibold text-white mt-1">
              Connected to {intercomToast.bed} • {intercomToast.patient}
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Two-way audio open via In-Room BLE Gateway. {intercomToast.nurse} listening.
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse rounded-full" />
              <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse delay-75 rounded-full" />
              <span className="inline-block w-1.5 h-2 bg-emerald-400 animate-pulse delay-150 rounded-full" />
              <span className="inline-block w-1.5 h-5 bg-emerald-400 animate-pulse delay-100 rounded-full" />
              <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse delay-200 rounded-full" />
              <span className="text-[10px] text-emerald-400 font-mono ml-1">Mic Live (0.02ms)</span>
            </div>
          </div>
          <button
            onClick={() => setIntercomToast(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner & Command Deck */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Virtual Ward Telemetry Center
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                GB Pant Hospital
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live BLE Gateway
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Port Blair &amp; Outlying Islands Remote Inpatient Telemetry • Real-Time Vitals Synchronization
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search bed, patient, diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none w-48 sm:w-56 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === "all"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({wardBeds.length})
            </button>
            <button
              onClick={() => setFilter("caution")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === "caution"
                  ? "bg-white text-amber-800 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-amber-800"
              }`}
            >
              Attention ({cautionDangerCount})
            </button>
            <button
              onClick={() => setFilter("normal")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filter === "normal"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Stable ({normalCount})
            </button>
          </div>
        </div>
      </div>

      {/* Ward Telemetry Status Header Notice */}
      <div className="bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Activity className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            {currentUser?.role === "nurse" ? (
              <>
                <strong>Staff Nurse Command Active:</strong> GB Pant Ward A station console. All 4 inpatient beds streaming continuously with autonomous early-warning triage (NEWS2).
              </>
            ) : currentUser?.email === "rprakash@demo.in" ? (
              <>
                <strong>Patient Telemetry Active:</strong> Bed 102 (Ram Prakash) streaming via Hut Bay Satellite/Cellular Gateway. Integrated with GB Pant Hospital Virtual Ward.
              </>
            ) : (
              <>
                <strong>Central Telemetry Feed Active:</strong> Bed 101 (Anita Sharma) is synchronized in real time with central dashboard telemetry (
                <span className="font-semibold text-blue-700 font-mono">
                  {simMode === "baseline" ? "Baseline" : simMode === "bp_crisis" ? "BP Crisis Mode" : simMode === "hypoxemia" ? "Hypoxemia Mode" : "Bradycardia Mode"}
                </span>
                ). Secondary island beds experience natural physiological drift.
              </>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Stream Ticker: {secondsAgo === 0 ? "Just now" : `${secondsAgo}s ago`}</span>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBeds.map((bed) => {
          const isDanger = bed.status === "danger";
          const isCaution = bed.status === "caution";
          const isLiveSynced = bed.bed === "Bed 101";

          return (
            <div
              key={bed.bed}
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all hover:shadow-md ${
                isDanger
                  ? "border-rose-300 ring-2 ring-rose-400/20 bg-linear-to-b from-rose-50/30 to-white"
                  : isCaution
                  ? "border-amber-200/90 ring-1 ring-amber-400/20 bg-linear-to-b from-amber-50/20 to-white"
                  : "border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {/* Bed Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs ${
                      isDanger
                        ? "bg-rose-100 text-rose-700"
                        : isCaution
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 font-mono">
                        {bed.bed}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-sm text-slate-800">
                        {bed.patient}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({bed.age}{bed.gender})
                      </span>
                      {isLiveSynced && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 font-mono">
                          {currentUser?.email === "asharma@demo.in" ? "YOUR BED (ACTIVE)" : "CENTRAL SYNC"}
                        </span>
                      )}
                      {bed.bed === "Bed 102" && currentUser?.email === "rprakash@demo.in" && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                          YOUR BED (ACTIVE)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <span>{bed.ward}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                {isDanger ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 shrink-0 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{bed.statusLabel}</span>
                  </span>
                ) : isCaution ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{bed.statusLabel}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{bed.statusLabel}</span>
                  </span>
                )}
              </div>

              {/* Patient Diagnosis & Primary Physician */}
              <div className="my-3 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-slate-800 shrink-0">Diagnosis:</span>
                  <span className="truncate text-slate-600">{bed.condition}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono shrink-0 pl-2">
                  {bed.attendingDoc.split(",")[0]}
                </div>
              </div>

              {/* Vitals Telemetry Grid with Live Mini Sparklines */}
              <div className="grid grid-cols-4 gap-2 my-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-center">
                {/* Heart Rate */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-0.5">
                    <Heart className="w-2.5 h-2.5 text-rose-500" />
                    HR
                  </span>
                  <span
                    className={`font-mono font-bold text-base mt-0.5 ${
                      bed.vitals.hr >= 115 || bed.vitals.hr <= 48
                        ? "text-rose-600 font-black"
                        : bed.vitals.hr >= 95
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.hr}
                  </span>
                  <span className="text-[9px] text-slate-400">bpm</span>
                  <div className="mt-1">
                    <Sparkline
                      data={bed.sparkHr}
                      color={
                        bed.vitals.hr >= 115 || bed.vitals.hr <= 48
                          ? "#E11D48"
                          : bed.vitals.hr >= 95
                          ? "#D97706"
                          : "#10B981"
                      }
                      width={52}
                      height={18}
                      strokeWidth={1.5}
                      idPrefix={`hr-${bed.bed}`}
                    />
                  </div>
                </div>

                {/* SpO2 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-0.5">
                    <Droplets className="w-2.5 h-2.5 text-sky-500" />
                    SpO2
                  </span>
                  <span
                    className={`font-mono font-bold text-base mt-0.5 ${
                      Number(bed.vitals.spo2) < 91
                        ? "text-rose-600 font-black"
                        : Number(bed.vitals.spo2) <= 95
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.spo2}%
                  </span>
                  <span className="text-[9px] text-slate-400">O2 sat</span>
                  <div className="mt-1">
                    <Sparkline
                      data={bed.sparkSpo2}
                      color={Number(bed.vitals.spo2) < 91 ? "#E11D48" : Number(bed.vitals.spo2) <= 95 ? "#D97706" : "#0284C7"}
                      width={52}
                      height={18}
                      strokeWidth={1.5}
                      idPrefix={`spo2-${bed.bed}`}
                    />
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-0.5">
                    <Activity className="w-2.5 h-2.5 text-indigo-500" />
                    BP
                  </span>
                  <span
                    className={`font-mono font-bold text-base mt-0.5 ${
                      Number(bed.vitals.bpSys) >= 170
                        ? "text-rose-600 font-black"
                        : Number(bed.vitals.bpSys) >= 140
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.bp}
                  </span>
                  <span className="text-[9px] text-slate-400">mmHg</span>
                  <div className="mt-1">
                    <Sparkline
                      data={bed.sparkBp}
                      color={Number(bed.vitals.bpSys) >= 170 ? "#E11D48" : Number(bed.vitals.bpSys) >= 140 ? "#D97706" : "#4F46E5"}
                      width={52}
                      height={18}
                      strokeWidth={1.5}
                      idPrefix={`bp-${bed.bed}`}
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-0.5">
                    <Thermometer className="w-2.5 h-2.5 text-amber-500" />
                    Temp
                  </span>
                  <span
                    className={`font-mono font-bold text-base mt-0.5 ${
                      Number(bed.vitals.temp) >= 38.5
                        ? "text-rose-600"
                        : Number(bed.vitals.temp) >= 37.5
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.temp}°C
                  </span>
                  <span className="text-[9px] text-slate-400">celsius</span>
                  <div className="mt-1">
                    <Sparkline
                      data={bed.sparkTemp}
                      color={Number(bed.vitals.temp) >= 38.0 ? "#E11D48" : "#F59E0B"}
                      width={52}
                      height={18}
                      strokeWidth={1.5}
                      idPrefix={`temp-${bed.bed}`}
                    />
                  </div>
                </div>
              </div>

              {/* Nurse footer & Interactive Actions */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{bed.nurse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTriggerIntercom(bed)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 font-semibold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1 text-xs"
                    title="Open bedside intercom channel"
                  >
                    <Mic className="w-3 h-3 text-blue-600" />
                    <span>Intercom</span>
                  </button>
                  <button
                    onClick={() => setSelectedBedNumber(bed.bed)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-xs flex items-center gap-1 text-xs"
                  >
                    <Activity className="w-3 h-3" />
                    <span>View Chart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBeds.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
          <p className="font-semibold text-sm">No beds match current filter or search criteria.</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the filter to "All Beds" or clearing the search box.</p>
          <button
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
            }}
            className="mt-3 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* =========================================================================
          PATIENT TELEMETRY & PHYSIOLOGICAL CHART MODAL (Interactive & Real-Time)
          ========================================================================= */}
      {activeModalBed && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full shadow-2xl animate-in zoom-in-95 my-auto max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-linear-to-r from-slate-50 via-white to-blue-50/30 shrink-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-xs ${
                    activeModalBed.status === "danger"
                      ? "bg-rose-100 text-rose-700"
                      : activeModalBed.status === "caution"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {activeModalBed.bed.replace("Bed ", "B")}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {activeModalBed.patient}
                    </h3>
                    <span className="text-xs text-slate-400">
                      ({activeModalBed.age}y • {activeModalBed.gender === "F" ? "Female" : "Male"})
                    </span>
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      {activeModalBed.bed}
                    </span>
                    {activeModalBed.bed === "Bed 101" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        STREAMING LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeModalBed.ward} • Attending: <strong>{activeModalBed.attendingDoc}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 ${
                    activeModalBed.status === "danger"
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : activeModalBed.status === "caution"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  {activeModalBed.statusLabel}
                </span>
                <button
                  onClick={() => setSelectedBedNumber(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Live Vital Strip (KPIs) */}
            <div className="p-4 bg-slate-50/90 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Heart Rate
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`font-mono font-black text-xl ${
                      activeModalBed.vitals.hr >= 115 || activeModalBed.vitals.hr <= 48
                        ? "text-rose-600"
                        : activeModalBed.vitals.hr >= 95
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {activeModalBed.vitals.hr}
                  </span>
                  <span className="text-[11px] text-slate-400">bpm</span>
                </div>
                <div className="mt-1">
                  <Sparkline
                    data={activeModalBed.sparkHr}
                    color={activeModalBed.vitals.hr >= 95 ? "#D97706" : "#10B981"}
                    width={110}
                    height={22}
                    strokeWidth={1.8}
                    idPrefix={`modal-hr-${activeModalBed.bed}`}
                  />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Oxygen (SpO2)
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`font-mono font-black text-xl ${
                      Number(activeModalBed.vitals.spo2) < 91
                        ? "text-rose-600"
                        : Number(activeModalBed.vitals.spo2) <= 95
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {activeModalBed.vitals.spo2}%
                  </span>
                  <span className="text-[11px] text-slate-400">O2 sat</span>
                </div>
                <div className="mt-1">
                  <Sparkline
                    data={activeModalBed.sparkSpo2}
                    color={Number(activeModalBed.vitals.spo2) < 91 ? "#E11D48" : "#0284C7"}
                    width={110}
                    height={22}
                    strokeWidth={1.8}
                    idPrefix={`modal-spo2-${activeModalBed.bed}`}
                  />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Blood Pressure
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`font-mono font-black text-xl ${
                      Number(activeModalBed.vitals.bpSys) >= 170
                        ? "text-rose-600"
                        : Number(activeModalBed.vitals.bpSys) >= 140
                        ? "text-amber-700"
                        : "text-slate-900"
                    }`}
                  >
                    {activeModalBed.vitals.bp}
                  </span>
                  <span className="text-[11px] text-slate-400">mmHg</span>
                </div>
                <div className="mt-1">
                  <Sparkline
                    data={activeModalBed.sparkBp}
                    color={Number(activeModalBed.vitals.bpSys) >= 140 ? "#D97706" : "#4F46E5"}
                    width={110}
                    height={22}
                    strokeWidth={1.8}
                    idPrefix={`modal-bp-${activeModalBed.bed}`}
                  />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Temperature
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-mono font-black text-xl text-slate-900">
                    {activeModalBed.vitals.temp}°C
                  </span>
                  <span className="text-[11px] text-slate-400">core</span>
                </div>
                <div className="mt-1">
                  <Sparkline
                    data={activeModalBed.sparkTemp}
                    color="#F59E0B"
                    width={110}
                    height={22}
                    strokeWidth={1.8}
                    idPrefix={`modal-temp-${activeModalBed.bed}`}
                  />
                </div>
              </div>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="px-5 pt-3 border-b border-slate-100 flex items-center gap-4 text-xs font-semibold shrink-0">
              <button
                onClick={() => setChartTab("trends")}
                className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${
                  chartTab === "trends"
                    ? "border-blue-600 text-blue-700 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Physiological Trend Charts</span>
              </button>
              <button
                onClick={() => setChartTab("news2")}
                className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${
                  chartTab === "news2"
                    ? "border-blue-600 text-blue-700 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NEWS2 Score Breakdown</span>
                {currentNews2 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      currentNews2.score >= 5 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    Score: {currentNews2.score}
                  </span>
                )}
              </button>
              <button
                onClick={() => setChartTab("clinical")}
                className={`pb-2.5 flex items-center gap-1.5 transition-colors border-b-2 ${
                  chartTab === "clinical"
                    ? "border-blue-600 text-blue-700 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Clinical Profile &amp; Orders</span>
              </button>
            </div>

            {/* Modal Tab Content (Scrollable Body) */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* TAB 1: PHYSIOLOGICAL TREND CHARTS */}
              {chartTab === "trends" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Trend 1: Heart Rate */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>Heart Rate Trend (BPM)</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          Now: {activeModalBed.vitals.hr} bpm
                        </span>
                      </div>
                      <div className="py-3 flex justify-center">
                        <Sparkline
                          data={activeModalBed.sparkHr}
                          color={activeModalBed.vitals.hr >= 95 ? "#D97706" : "#10B981"}
                          width={260}
                          height={54}
                          strokeWidth={2.2}
                          idPrefix={`large-hr-${activeModalBed.bed}`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200/40">
                        <span>Min: {Math.min(...activeModalBed.sparkHr)} bpm</span>
                        <span>Baseline: {activeModalBed.baseHr || 85}</span>
                        <span>Max: {Math.max(...activeModalBed.sparkHr)} bpm</span>
                      </div>
                    </div>

                    {/* Trend 2: SpO2 */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Droplets className="w-3.5 h-3.5 text-sky-500" />
                          <span>Pulse Oximetry (SpO2 %)</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          Now: {activeModalBed.vitals.spo2}%
                        </span>
                      </div>
                      <div className="py-3 flex justify-center">
                        <Sparkline
                          data={activeModalBed.sparkSpo2}
                          color={Number(activeModalBed.vitals.spo2) < 91 ? "#E11D48" : "#0284C7"}
                          width={260}
                          height={54}
                          strokeWidth={2.2}
                          idPrefix={`large-spo2-${activeModalBed.bed}`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200/40">
                        <span>Min: {Math.min(...activeModalBed.sparkSpo2)}%</span>
                        <span>Threshold: ≥95%</span>
                        <span>Max: {Math.max(...activeModalBed.sparkSpo2)}%</span>
                      </div>
                    </div>

                    {/* Trend 3: Systolic BP */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Activity className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Systolic BP Progression</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          Now: {activeModalBed.vitals.bp} mmHg
                        </span>
                      </div>
                      <div className="py-3 flex justify-center">
                        <Sparkline
                          data={activeModalBed.sparkBp}
                          color={Number(activeModalBed.vitals.bpSys) >= 140 ? "#D97706" : "#4F46E5"}
                          width={260}
                          height={54}
                          strokeWidth={2.2}
                          idPrefix={`large-bp-${activeModalBed.bed}`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200/40">
                        <span>Min: {Math.min(...activeModalBed.sparkBp)}</span>
                        <span>Target: &lt;140/90</span>
                        <span>Max: {Math.max(...activeModalBed.sparkBp)}</span>
                      </div>
                    </div>

                    {/* Trend 4: Temperature */}
                    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                          <span>Body Temperature (°C)</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          Now: {activeModalBed.vitals.temp}°C
                        </span>
                      </div>
                      <div className="py-3 flex justify-center">
                        <Sparkline
                          data={activeModalBed.sparkTemp}
                          color="#F59E0B"
                          width={260}
                          height={54}
                          strokeWidth={2.2}
                          idPrefix={`large-temp-${activeModalBed.bed}`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200/40">
                        <span>Min: {Math.min(...activeModalBed.sparkTemp)}°C</span>
                        <span>Norm: 36.5–37.2°C</span>
                        <span>Max: {Math.max(...activeModalBed.sparkTemp)}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Telemetry Log Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center justify-between">
                      <span>Continuous Telemetry Log (Last 5 Readings)</span>
                      <span className="text-[10px] text-slate-400 font-mono">1.5s sampling frequency</span>
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                            <th className="pb-2">Time Offset</th>
                            <th className="pb-2">Heart Rate</th>
                            <th className="pb-2">SpO2</th>
                            <th className="pb-2">Blood Pressure</th>
                            <th className="pb-2">Core Temp</th>
                            <th className="pb-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          <tr>
                            <td className="py-2 text-slate-700 font-sans font-medium text-emerald-700">
                              ● Live BLE Stream
                            </td>
                            <td className="py-2 text-slate-900 font-bold">{activeModalBed.vitals.hr} bpm</td>
                            <td className="py-2 text-slate-900">{activeModalBed.vitals.spo2}%</td>
                            <td className="py-2 text-slate-900">{activeModalBed.vitals.bp}</td>
                            <td className="py-2 text-slate-900">{activeModalBed.vitals.temp}°C</td>
                            <td className="py-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-slate-100 text-slate-700">
                                {activeModalBed.statusLabel.split(" ")[0]}
                              </span>
                            </td>
                          </tr>
                          {[3, 6, 9, 12].map((sec, idx) => {
                            const offsetHr = activeModalBed.sparkHr[Math.max(0, activeModalBed.sparkHr.length - 2 - idx)] || activeModalBed.vitals.hr;
                            const offsetSpo2 = activeModalBed.sparkSpo2[Math.max(0, activeModalBed.sparkSpo2.length - 2 - idx)] || activeModalBed.vitals.spo2;
                            const offsetBp = activeModalBed.sparkBp[Math.max(0, activeModalBed.sparkBp.length - 2 - idx)] || activeModalBed.vitals.bpSys;
                            return (
                              <tr key={sec} className="text-slate-500">
                                <td className="py-1.5 font-sans">T - {sec * 30}s</td>
                                <td className="py-1.5">{offsetHr} bpm</td>
                                <td className="py-1.5">{offsetSpo2}%</td>
                                <td className="py-1.5">{offsetBp}/92</td>
                                <td className="py-1.5">{activeModalBed.vitals.temp}°C</td>
                                <td className="py-1.5">
                                  <span className="px-1.5 py-0.2 rounded text-[10px] font-sans bg-slate-50 text-slate-500">
                                    Logged
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NEWS2 CLINICAL SCORE BREAKDOWN */}
              {chartTab === "news2" && currentNews2 && (
                <div className="space-y-4">
                  {/* Summary Card */}
                  <div className={`p-4 rounded-2xl border ${currentNews2.badgeStyle} flex items-center justify-between`}>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          National Early Warning Score (NEWS2)
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 border">
                          Royal College of Physicians / MoHFW Standard
                        </span>
                      </div>
                      <p className="text-sm font-bold mt-1">
                        Computed Clinical Assessment: {currentNews2.riskTier}
                      </p>
                      <p className="text-xs opacity-90">{currentNews2.actionGuide}</p>
                    </div>
                    <div className="text-right shrink-0 pl-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                        Aggregate Score
                      </span>
                      <span className="font-mono text-3xl font-black">{currentNews2.score}</span>
                      <span className="text-[11px] block opacity-75">points</span>
                    </div>
                  </div>

                  {/* Parameter Breakdown Matrix Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-900 mb-3">
                      NEWS2 Physiological Component Score Breakdown
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px]">
                            <th className="pb-2">Physiological Parameter</th>
                            <th className="pb-2">Current Reading</th>
                            <th className="pb-2">Normal Range</th>
                            <th className="pb-2">Clinical Rating</th>
                            <th className="pb-2 text-right">NEWS2 Points</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentNews2.breakdown.map((item, i) => (
                            <tr key={i} className="py-2">
                              <td className="py-2 font-medium text-slate-800">{item.param}</td>
                              <td className="py-2 font-mono font-bold text-slate-900">{item.value}</td>
                              <td className="py-2 text-slate-500 font-mono text-[11px]">{item.normal}</td>
                              <td className={`py-2 text-xs font-semibold ${item.color}`}>{item.status}</td>
                              <td className="py-2 text-right">
                                <span
                                  className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                                    item.pts >= 2
                                      ? "bg-rose-100 text-rose-800"
                                      : item.pts === 1
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  +{item.pts}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-slate-200 font-bold">
                            <td colSpan="4" className="pt-3 text-slate-900">
                              Total Aggregated NEWS2 Score:
                            </td>
                            <td className="pt-3 text-right font-mono text-sm text-blue-700">
                              {currentNews2.score} pts
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Escalation Guidelines Reference Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
                    <div className="font-bold text-slate-800">Clinical Escalation Thresholds:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-sans text-[11px]">
                      <div className="p-2 bg-white rounded-lg border border-emerald-200">
                        <span className="font-bold text-emerald-800 block">Score 0–4 (Low)</span>
                        Ward nurse routine review. Observation every 4–6 hours.
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-amber-200">
                        <span className="font-bold text-amber-800 block">Score 5–6 (Medium)</span>
                        Urgent doctor review within 30 min. Step up to hourly vitals.
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-rose-200">
                        <span className="font-bold text-rose-800 block">Score 7+ (High Risk)</span>
                        Immediate MET mobilization. Continuous ICU outreach monitor.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CLINICAL PROFILE & ORDERS */}
              {chartTab === "clinical" && (
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">Inpatient Clinical Summary</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Primary Diagnosis</span>
                        <span className="font-semibold text-slate-800">{activeModalBed.condition}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Admission Date</span>
                        <span className="font-semibold text-slate-800">{activeModalBed.admissionDate}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Attending Physician</span>
                        <span className="font-semibold text-slate-800">{activeModalBed.attendingDoc}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Assigned Nurse</span>
                        <span className="font-semibold text-slate-800">{activeModalBed.nurse}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Known Allergies</span>
                        <span className="font-semibold text-rose-700">{activeModalBed.allergies}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Device &amp; Gateway ID</span>
                        <span className="font-mono text-slate-700 text-[11px]">{activeModalBed.deviceGateway}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Medication Schedule */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4">
                    <h4 className="text-xs font-bold text-slate-900 mb-2.5">
                      Active Inpatient Medication Orders (MAR)
                    </h4>
                    <div className="space-y-2">
                      {activeModalBed.medications.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            <span className="font-semibold text-slate-800">{med.split("(")[0].trim()}</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {med.includes("(") ? med.split("(")[1].replace(")", "") : "Daily"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance & DPDP Footer Note */}
                  <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center gap-2.5 text-xs text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      Verifiable Telemetry Record • DPDP Act 2023 Consent Active • Ayushman Bharat Digital Mission (ABDM) Compatible
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportPatientData(activeModalBed)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Export Chart JSON</span>
                </button>
                <button
                  onClick={() => handleTriggerIntercom(activeModalBed)}
                  className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                  <span>Bedside Intercom</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {onPageDoctor && (
                  <button
                    onClick={() => {
                      onPageDoctor();
                      setSelectedBedNumber(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Page Doctor</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedBedNumber(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
                >
                  Close Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

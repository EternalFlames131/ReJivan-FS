// prototype/public/src/components/VitalSignsTable.jsx
// Comprehensive Vital Signs Table (Enterprise Clinical Grade)

const VitalSignsTable = ({ vitalsData }) => {
  // Default values matching clinical prompt specs with live override support
  const data = vitalsData || {
    hr: 85,
    spo2: 97.7,
    bpSys: 149,
    bpDia: 97,
    temp: 37.0,
    glucose: 112,
    lastSync: "2 min ago",
    hardwareSource: "BLE Telemetry Gateway (Tier 1 Certified)",
  };

  // Calculate dynamic clinical status and colors based on current telemetry values
  let hrStatusType = "normal";
  let hrStatusLabel = "Stable";
  if (data.hr < 60) {
    hrStatusType = "danger";
    hrStatusLabel = `Bradycardia (${data.hr} bpm)`;
  } else if (data.hr > 100) {
    hrStatusType = "danger";
    hrStatusLabel = `Tachycardia (${data.hr} bpm)`;
  }

  let spo2StatusType = "normal";
  let spo2StatusLabel = "Normal";
  if (data.spo2 < 92) {
    spo2StatusType = "danger";
    spo2StatusLabel = `Hypoxemia (${data.spo2}%)`;
  } else if (data.spo2 < 95) {
    spo2StatusType = "caution";
    spo2StatusLabel = `Borderline (${data.spo2}%)`;
  }

  let bpStatusType = "normal";
  let bpStatusLabel = "Normal (<120/80)";
  if (data.bpSys >= 160 || data.bpDia >= 100) {
    bpStatusType = "danger";
    bpStatusLabel = `Stage 2 Crisis (${data.bpSys}/${data.bpDia})`;
  } else if (data.bpSys >= 140 || data.bpDia >= 90) {
    bpStatusType = "caution";
    bpStatusLabel = `Elevated Sys >140 (${data.bpSys}/${data.bpDia})`;
  } else if (data.bpSys >= 130 || data.bpDia >= 85) {
    bpStatusType = "caution";
    bpStatusLabel = `Pre-hypertension (${data.bpSys}/${data.bpDia})`;
  }

  let tempStatusType = "normal";
  let tempStatusLabel = "Normal";
  if (data.temp >= 38.0) {
    tempStatusType = "danger";
    tempStatusLabel = `Pyrexia (${data.temp} °C)`;
  } else if (data.temp >= 37.5) {
    tempStatusType = "caution";
    tempStatusLabel = `Low-Grade Fever (${data.temp} °C)`;
  } else if (data.temp < 35.5) {
    tempStatusType = "danger";
    tempStatusLabel = `Hypothermia (${data.temp} °C)`;
  }

  let gluStatusType = "normal";
  let gluStatusLabel = "Normal";
  if (data.glucose > 180) {
    gluStatusType = "danger";
    gluStatusLabel = `Hyperglycemia (${data.glucose})`;
  } else if (data.glucose > 140) {
    gluStatusType = "caution";
    gluStatusLabel = `Elevated (${data.glucose})`;
  } else if (data.glucose < 70) {
    gluStatusType = "danger";
    gluStatusLabel = `Hypoglycemia (${data.glucose})`;
  }

  const rows = [
    {
      id: "hr",
      name: "Heart Rate",
      code: "HR",
      icon: Heart,
      iconColor: hrStatusType === "danger" ? "text-rose-600" : "text-rose-500",
      value: `${data.hr}`,
      unit: "bpm",
      target: "60-100 bpm",
      statusType: hrStatusType,
      statusLabel: hrStatusLabel,
      sparkData: data.sparkHr || [81, 83, 84, 82, 86, 84, data.hr || 85],
      sparkColor: hrStatusType === "danger" ? "#F43F5E" : hrStatusType === "caution" ? "#F59E0B" : "#10B981",
    },
    {
      id: "spo2",
      name: "Oxygen Saturation",
      code: "SpO2",
      icon: Wind,
      iconColor: spo2StatusType === "danger" ? "text-rose-600" : "text-sky-500",
      value: typeof data.spo2 === "number" ? data.spo2.toFixed(1) : `${data.spo2}`,
      unit: "%",
      target: "95-100%",
      statusType: spo2StatusType,
      statusLabel: spo2StatusLabel,
      sparkData: data.sparkSpo2 || [97.2, 97.5, 98.0, 97.4, 97.8, 97.6, data.spo2 || 97.7],
      sparkColor: spo2StatusType === "danger" ? "#F43F5E" : spo2StatusType === "caution" ? "#F59E0B" : "#10B981",
    },
    {
      id: "bp",
      name: "Blood Pressure",
      code: "NIBP",
      icon: Activity,
      iconColor: bpStatusType === "danger" ? "text-rose-600" : bpStatusType === "caution" ? "text-amber-500" : "text-emerald-500",
      value: `${data.bpSys}/${data.bpDia}`,
      unit: "mmHg",
      target: "<120/80 mmHg",
      statusType: bpStatusType,
      statusLabel: bpStatusLabel,
      sparkData: data.sparkBp || [138, 142, 145, 144, 148, 146, data.bpSys || 149],
      sparkColor: bpStatusType === "danger" ? "#F43F5E" : bpStatusType === "caution" ? "#F59E0B" : "#10B981",
    },
    {
      id: "temp",
      name: "Body Temperature",
      code: "TEMP",
      icon: Thermometer,
      iconColor: tempStatusType === "danger" ? "text-rose-600" : "text-orange-500",
      value: typeof data.temp === "number" ? data.temp.toFixed(1) : `${data.temp}`,
      unit: "°C",
      target: "36.1-37.2 °C",
      statusType: tempStatusType,
      statusLabel: tempStatusLabel,
      sparkData: data.sparkTemp || [36.8, 36.9, 37.1, 37.0, 36.9, 37.0, data.temp || 37.0],
      sparkColor: tempStatusType === "danger" ? "#F43F5E" : tempStatusType === "caution" ? "#F59E0B" : "#10B981",
    },
    {
      id: "glucose",
      name: "Blood Glucose",
      code: "GLU",
      icon: Droplets,
      iconColor: gluStatusType === "danger" ? "text-rose-600" : "text-indigo-500",
      value: `${data.glucose}`,
      unit: "mg/dL",
      target: "70-140 mg/dL",
      statusType: gluStatusType,
      statusLabel: gluStatusLabel,
      sparkData: data.sparkGlucose || [118, 115, 110, 114, 109, 111, data.glucose || 112],
      sparkColor: gluStatusType === "danger" ? "#F43F5E" : gluStatusType === "caution" ? "#F59E0B" : "#10B981",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden mb-6">
      {/* Table Header & Global Sync Status */}
      <div className="p-4 sm:px-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Vital Signs Telemetry
            </h3>
            <p className="text-[11px] text-slate-500 font-normal">
              Hardware Source:{" "}
              <span className="text-slate-700 font-medium">
                {data.hardwareSource}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Last updated: {data.lastSync} (Real-time Sync)</span>
          </span>
        </div>
      </div>

      {/* Structured Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5 px-5">Vital Name</th>
              <th className="py-2.5 px-5">Current Value &amp; Target Range</th>
              <th className="py-2.5 px-5">Status</th>
              <th className="py-2.5 px-5 text-right">Trend (Sparkline)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* Vital Name */}
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                        <Icon className={`w-4 h-4 ${row.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {row.name}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-medium">
                          {row.code}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Current Value & Target Range (Monospace/tabular nums to prevent shift) */}
                  <td className="py-3 px-5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                        {row.value}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {row.unit}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      Target: {row.target}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-5">
                    {row.statusType === "caution" ? (
                      /* Soft amber background with crisp amber text */
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{row.statusLabel}</span>
                      </span>
                    ) : row.statusType === "danger" ? (
                      /* Soft rose background with bold red text */
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <Activity className="w-3 h-3 text-rose-600 shrink-0" />
                        <span>{row.statusLabel}</span>
                      </span>
                    ) : (
                      /* Normal/Stable: neutral dark typography with subtle green indicator dot */
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{row.statusLabel}</span>
                      </span>
                    )}
                  </td>

                  {/* Trend Sparkline */}
                  <td className="py-3 px-5 text-right">
                    <div className="inline-flex items-center justify-end">
                      <Sparkline
                        data={row.sparkData}
                        color={row.sparkColor}
                        width={110}
                        height={26}
                        idPrefix={`spk-${row.id}`}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

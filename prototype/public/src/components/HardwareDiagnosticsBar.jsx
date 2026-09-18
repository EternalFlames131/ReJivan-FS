// prototype/public/src/components/HardwareDiagnosticsBar.jsx
// Hardware Diagnostics & Sensor Telemetry Bar (Enterprise Clinical Grade)

const HardwareDiagnosticsBar = ({
  devices: propDevices,
  reliabilityScore = 98,
  currentUser,
  activePatient,
}) => {
  const getHardwareForUser = (user, patient) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return {
        hubText: "Cellular Gateway #AP-4109 (Hut Bay, Little Andaman)",
        devices: [
          {
            model: "FreeStyle Libre 3",
            type: "Continuous Glucose Monitor",
            status: "Connected",
            battery: 99,
            protocol: "NFC/BLE Stream",
          },
          {
            model: "Accu-Chek Instant",
            type: "Capillary Glucometer",
            status: "Synchronized",
            battery: 88,
            protocol: "BLE 5.0",
          },
          {
            model: "Beurer BM 57",
            type: "Upper Arm BP & Arrhythmia",
            status: "Connected",
            battery: 91,
            protocol: "BLE Mesh",
          },
        ],
      };
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return {
        hubText: "Hospital Ward A Central Gateway #GW-8042 (Port Blair)",
        devices: [
          {
            model: "GB Pant Ward Hub",
            type: "Multi-Bed Gateway Array",
            status: "Connected",
            battery: 100,
            protocol: "PoE Ethernet",
          },
          {
            model: "Philips IntelliVue MP50",
            type: "Bedside Telemetry Hub",
            status: "Connected",
            battery: 96,
            protocol: "Hospital WLAN",
          },
          {
            model: "Masimo Rad-97",
            type: "Pulse CO-Oximeter",
            status: "Connected",
            battery: 94,
            protocol: "Continuous BLE",
          },
        ],
      };
    }

    return {
      hubText: "BLE Mesh Hub Active (Port Blair Gateway)",
      devices: [
        {
          model: "Omron HEM-7156T",
          type: "BP Monitor",
          status: "Connected",
          battery: 92,
          protocol: "BLE 5.2",
        },
        {
          model: "TempTraq Continuous",
          type: "Temp Sensor",
          status: "Connected",
          battery: 84,
          protocol: "Patch Sensor",
        },
        {
          model: "SanketLife 12-Lead",
          type: "Clinical ECG",
          status: "Connected",
          battery: 78,
          protocol: "CDSCO Cleared",
        },
      ],
    };
  };

  const hardwareInfo = getHardwareForUser(currentUser, activePatient);
  const devices = propDevices || hardwareInfo.devices;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Hardware Diagnostics &amp; Sensor Telemetry
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{hardwareInfo.hubText}</span>
        </div>
      </div>

      {/* 4-Item Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Device 1: Omron BP */}
        {devices.map((dev, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900 truncate">
                {dev.model}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600">
                <Battery className="w-3.5 h-3.5 text-slate-500" />
                <span>{dev.battery}%</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mt-0.5">{dev.type}</div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
              <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{dev.status}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {dev.protocol}
              </span>
            </div>
          </div>
        ))}

        {/* Device Reliability Score */}
        <div className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-slate-900">
              Reliability Score
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
              <span>Line PWR</span>
            </div>
          </div>

          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              {reliabilityScore}%
            </span>
            <span className="text-[11px] font-medium text-emerald-700">
              High Confidence
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>0 dropped packets</span>
            <span className="text-[10px] text-blue-600 font-medium">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

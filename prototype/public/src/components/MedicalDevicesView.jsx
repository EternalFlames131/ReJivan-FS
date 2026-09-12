// prototype/public/src/components/MedicalDevicesView.jsx
// Paired Medical Devices Fleet & Approved Catalogue (Enterprise Clinical Grade)

const MedicalDevicesView = () => {
  const catalogue = [
    {
      name: "Omron HEM-7156T",
      type: "Automated Upper Arm Blood Pressure Monitor",
      regulatory: "US FDA Cleared • CDSCO Class B",
      accuracy: "Pressure: ±3 mmHg • Pulse: ±5%",
      connection: "Bluetooth Low Energy 5.2",
      price: "₹3,450",
      battery: "92%",
      status: "Paired & Streaming",
    },
    {
      name: "TempTraq Continuous",
      type: "Wireless Wearable Temperature Axillary Patch",
      regulatory: "US FDA Cleared • CE Class IIa",
      accuracy: "±0.1°C (Continuous 24/7 Monitoring)",
      connection: "BLE Direct-to-Gateway",
      price: "₹1,800",
      battery: "84%",
      status: "Paired & Streaming",
    },
    {
      name: "SanketLife 12-Lead ECG",
      type: "Medical Pocket ECG with Lead-II Telemetry",
      regulatory: "CDSCO Approved (Made in India)",
      accuracy: "98.2% Arrhythmia Detection Accuracy",
      connection: "BLE High-Throughput",
      price: "₹6,999",
      battery: "78%",
      status: "Paired & Streaming",
    },
    {
      name: "FreeStyle Libre 3 CGM",
      type: "Continuous Glucose Monitor Sensor",
      regulatory: "US FDA Cleared • CDSCO Cleared",
      accuracy: "MARD 7.9% (Industry Leading)",
      connection: "NFC / BLE Real-time Streaming",
      price: "₹4,200",
      battery: "99%",
      status: "Paired & Streaming",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Paired Medical Devices &amp; Hardware Fleet
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              CDSCO &amp; US FDA Approved Sensor Integrations • BLE 5.2 Mesh Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Wifi className="w-3.5 h-3.5" />
            <span>4 Devices Synchronized</span>
          </span>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {catalogue.map((dev, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs"
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{dev.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{dev.type}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{dev.status}</span>
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Certification:</span>
                <span className="font-semibold text-slate-800">{dev.regulatory}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Accuracy Standard:</span>
                <span className="font-mono text-slate-700">{dev.accuracy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Telemetry Protocol:</span>
                <span className="font-mono text-slate-700">{dev.connection}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-500">Battery Level:</span>
                <span className="font-mono font-bold text-slate-900">{dev.battery}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

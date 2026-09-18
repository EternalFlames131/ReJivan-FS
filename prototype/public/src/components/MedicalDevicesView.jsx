// prototype/public/src/components/MedicalDevicesView.jsx
// Paired Medical Devices Fleet & Approved Catalogue (Enterprise Clinical Grade - Account Aware)

const MedicalDevicesView = ({ currentUser, activePatient }) => {
  const getDevicesForUser = (user, patient) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return {
        fleetTitle: "Prakash Family Medical Fleet",
        locationBadge: "Remote Island Hub • Hut Bay, Little Andaman",
        devices: [
          {
            name: "FreeStyle Libre 3 CGM",
            type: "Continuous Glucose Monitor Sensor (Live Glycemic Telemetry)",
            regulatory: "US FDA Cleared • CDSCO Class B",
            accuracy: "MARD 7.9% (Continuous 1-Min Glycemic Readings)",
            connection: "NFC / BLE Real-time Streaming",
            price: "₹4,200",
            battery: "99% (12 Days Sensor Remaining)",
            status: "Paired & Streaming",
          },
          {
            name: "Accu-Chek Instant",
            type: "Capillary Blood Glucose Fingerstick Meter",
            regulatory: "ISO 15197:2013 • CDSCO Approved",
            accuracy: "±10 mg/dL within YSI Reference",
            connection: "Bluetooth Low Energy 5.0",
            price: "₹1,450",
            battery: "88%",
            status: "Synchronized",
          },
          {
            name: "Beurer BM 57",
            type: "Upper Arm Blood Pressure & Arrhythmia Monitor",
            regulatory: "CE Class IIa • ESH Clinical Validation",
            accuracy: "Pressure: ±3 mmHg • Pulse: ±5%",
            connection: "Bluetooth Low Energy",
            price: "₹2,890",
            battery: "91%",
            status: "Paired & Streaming",
          },
          {
            name: "Cellular RPM Gateway #AP-4109",
            type: "Satellite / 4G LTE-M Autonomous Telemetry Hub",
            regulatory: "CDSCO Class B • Made in India",
            accuracy: "99.98% Transmission Packet Integrity",
            connection: "4G LTE-M with Satellite SMS Fallback",
            price: "₹4,999",
            battery: "100% (AC Main + 24h UPS Backup)",
            status: "Online (Hut Bay Uplink)",
          },
        ],
      };
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return {
        fleetTitle: "GB Pant Hospital Virtual Ward Fleet",
        locationBadge: "Central Hospital Hub • Port Blair",
        devices: [
          {
            name: "GB Pant Ward BLE Gateway #GW-8042",
            type: "Multi-Bed Clinical Telemetry Ingestion Hub",
            regulatory: "CDSCO Class B • Ayushman ABDM Ready",
            accuracy: "16-Bed Simultaneous Micro-packet Ingestion",
            connection: "Ethernet / IEEE 802.11ax WiFi 6",
            price: "₹18,500",
            battery: "100% (Hospital Clean UPS)",
            status: "Online & Ingesting",
          },
          {
            name: "Philips IntelliVue MP50 Array",
            type: "Bedside Multi-Parameter Telemetry Monitor",
            regulatory: "US FDA Cleared • CE Mark Class IIb",
            accuracy: "ECG / NIBP / SpO2 Hospital Grade",
            connection: "HL7 / FHIR Medical Stream",
            price: "₹2,40,000",
            battery: "AC Powered (100%)",
            status: "Streaming (Beds 101–104)",
          },
          {
            name: "Omron Pro Clinical Sphygmomanometer",
            type: "Hospital-Grade Automated NIBP System",
            regulatory: "US FDA Cleared • AAMI / ESH Validated",
            accuracy: "Pressure: ±2 mmHg • Pulse: ±2%",
            connection: "Bluetooth Low Energy Mesh",
            price: "₹12,200",
            battery: "96%",
            status: "Calibrated & Active",
          },
          {
            name: "Masimo Rad-97 Pulse CO-Oximeter",
            type: "Continuous Rainbow SET SpO2 & Respiration Monitor",
            regulatory: "US FDA Cleared • CDSCO Approved",
            accuracy: "±1.5% in Challenging Perfusion & Motion",
            connection: "BLE Direct to Ward Console",
            price: "₹48,000",
            battery: "94%",
            status: "Calibrated & Online",
          },
        ],
      };
    }

    // Default: Anita Sharma
    return {
      fleetTitle: "Sharma Family Paired Medical Devices",
      locationBadge: "Home Telemetry Hub • Junglighat, Port Blair",
      devices: [
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
          name: "Accu-Chek Instant",
          type: "Capillary Blood Glucose Meter",
          regulatory: "ISO 15197:2013 • CDSCO Approved",
          accuracy: "±10 mg/dL within YSI Reference",
          connection: "BLE Low Energy",
          price: "₹1,450",
          battery: "95%",
          status: "Paired & Synchronized",
        },
      ],
    };
  };

  const accountFleet = React.useMemo(() => getDevicesForUser(currentUser, activePatient), [currentUser?.email]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Paired Medical Devices &amp; Hardware Fleet
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                {accountFleet.fleetTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {accountFleet.locationBadge} • BLE 5.2 Mesh Hub Integration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Wifi className="w-3.5 h-3.5" />
            <span>{accountFleet.devices.length} Devices Synchronized</span>
          </span>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {accountFleet.devices.map((dev, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs hover:border-blue-200 transition-all"
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

// prototype/public/src/App.jsx
// Enterprise Clinical Telemetry Dashboard (Epic / Teladoc Grade)

const ACCOUNT_PROFILES = {
  "asharma@demo.in": {
    name: "Anita Sharma",
    role: "caregiver",
    email: "asharma@demo.in",
    patientId: "REJ-8042",
    age: 67,
    gender: "Female",
    location: "Home → Living Room, Junglighat, Port Blair",
    condition: "Essential Hypertension / Post-Stroke Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology, GB Pant Hospital)",
    primaryContact: "Priya Sharma (Daughter, +91 94342 81101)",
    caregiverPhone: "+91 94342 81101",
    backupPhone: "+91 94342 81102",
    emergencyHub: "GB Pant Hospital Ambulance Station (108)",
    hardwareSource: "BLE Telemetry Gateway (Tier 1 Certified)",
    defaultVitals: {
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
  },
  "rprakash@demo.in": {
    name: "Ram Prakash",
    role: "caregiver",
    email: "rprakash@demo.in",
    patientId: "REJ-9120",
    age: 72,
    gender: "Male",
    location: "Remote Cottage → Hut Bay, Little Andaman",
    condition: "Type-2 Diabetes Mellitus / Neuropathy Watch",
    attendingDoc: "Dr. K. Nair, MD (Endocrinology)",
    primaryContact: "Rajesh Prakash (Son, +91 94742 19203)",
    caregiverPhone: "+91 94742 19203",
    backupPhone: "+91 94742 19204",
    emergencyHub: "Little Andaman Marine Ambulance & 108 PHC Station",
    hardwareSource: "Cellular RPM Gateway #AP-4109 (Little Andaman)",
    defaultVitals: {
      hr: 74,
      spo2: 98.2,
      bpSys: 122,
      bpDia: 80,
      temp: 36.8,
      glucose: 142,
      sparkHr: [73, 75, 74, 76, 74, 75, 74, 73, 74],
      sparkSpo2: [98.1, 98.3, 98.2, 98.0, 98.2, 98.3, 98.2, 98.1, 98.2],
      sparkBp: [120, 122, 124, 121, 123, 122, 125, 122, 122],
      sparkTemp: [36.8, 36.9, 36.8, 36.7, 36.8, 36.9, 36.8, 36.8, 36.8],
      sparkGlucose: [138, 142, 145, 140, 144, 142, 146, 142, 142],
    },
  },
  "wardnurse@demo.in": {
    name: "GB Pant Ward Nurse",
    role: "nurse",
    email: "wardnurse@demo.in",
    patientId: "WARD-STA-01",
    age: "Shift A Lead",
    gender: "Staff",
    location: "GB Pant Hospital, Male/Female Ward A, Port Blair",
    condition: "Multi-Bed Inpatient Clinical Ward Watch (4 Active Beds)",
    attendingDoc: "Dr. A. Sen, MD & Dr. V. Rao, MS",
    primaryContact: "Ward Nurse Station (Ext. 402)",
    caregiverPhone: "Ext. 402 (Station Desk)",
    backupPhone: "Ext. 104 (Duty Doctor)",
    emergencyHub: "GB Pant Hospital Crash Team & Code Blue",
    hardwareSource: "GB Pant Hospital Central Gateway #GW-8042",
    defaultVitals: {
      hr: 82,
      spo2: 98.0,
      bpSys: 128,
      bpDia: 84,
      temp: 36.9,
      glucose: 115,
      sparkHr: [80, 82, 81, 83, 82, 84, 82, 81, 82],
      sparkSpo2: [98.0, 98.2, 98.1, 97.9, 98.0, 98.1, 98.0, 98.2, 98.0],
      sparkBp: [125, 128, 130, 126, 129, 127, 130, 128, 128],
      sparkTemp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9, 36.9, 36.9],
      sparkGlucose: [112, 115, 118, 114, 116, 115, 117, 115, 115],
    },
  },
};

const HOSPITAL_INPATIENT_BEDS = {
  "bed-101": {
    id: "bed-101",
    bedNumber: "Bed 101",
    name: "Anita Sharma",
    patientId: "REJ-8042",
    age: 67,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 101 (Port Blair)",
    condition: "Essential Hypertension / Post-Stroke Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology, GB Pant Hospital)",
    primaryContact: "Priya Sharma (Daughter, +91 94342 81101)",
    caregiverPhone: "+91 94342 81101",
    backupPhone: "+91 94342 81102",
    emergencyHub: "GB Pant Hospital Crash Team & Code Blue (108)",
    hardwareSource: "Philips IntelliVue MP50 & Central BLE Gateway",
    admissionDate: "2026-09-14 (Cardiovascular Observation)",
    status: "caution",
    statusLabel: "Caution (Hypertensive Review)",
    news2Score: 3,
    defaultVitals: {
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
    hardwareDevices: [
      {
        model: "Philips IntelliVue MP50",
        type: "Bedside Telemetry Hub",
        status: "Connected",
        battery: 100,
        protocol: "Hospital WLAN",
      },
      {
        model: "Omron HEM-7156T",
        type: "Continuous NIBP Monitor",
        status: "Connected",
        battery: 92,
        protocol: "BLE 5.2",
      },
      {
        model: "TempTraq Continuous",
        type: "Axillary Temp Sensor",
        status: "Connected",
        battery: 84,
        protocol: "Patch Sensor",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-101-1",
            name: "Amlodipine Besylate",
            dose: "5 mg",
            purpose: "Antihypertensive (Calcium Channel Blocker)",
            status: "Taken",
            takenAt: "08:05 AM",
          },
        ],
      },
      {
        slot: "Afternoon (01:00 PM)",
        timeCode: "13:00",
        drugs: [
          {
            id: "m-101-2",
            name: "Aspirin (Ecosprin)",
            dose: "75 mg",
            purpose: "Antiplatelet / Stroke Prophylaxis",
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
            id: "m-101-3",
            name: "Atorvastatin",
            dose: "20 mg",
            purpose: "Statin / Lipid Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-101-1",
        title: "Bed 101 (Anita Sharma): Elevated Systolic BP",
        reading: "154/97 mmHg",
        time: "6m ago",
        severity: "caution",
        message: "Systolic threshold >140 exceeded. Automated re-check scheduled in 15m.",
        source: "Bedside NIBP Monitor",
      },
      {
        id: "alt-101-2",
        title: "Bed 101: Optical Sentinel Active",
        reading: "In Bed (Stable)",
        time: "25m ago",
        severity: "info",
        message: "Zero fall events detected. Patient resting comfortably.",
        source: "Room Camera Zone",
      },
    ],
    timeline: [
      {
        id: "tl-101-1",
        time: "11:30 AM",
        title: "Automated NIBP Cycle",
        desc: "BP recorded at 149/97 mmHg. Mean arterial pressure within target.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-101-2",
        time: "10:15 AM",
        title: "Cardiology Ward Round",
        desc: "Dr. A. Sen reviewed ECG trace. Amlodipine regimen maintained.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-101-3",
        time: "08:05 AM",
        title: "Morning Medication Administered",
        desc: "Amlodipine 5mg verified and signed off by Shift A Nurse.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
  "bed-102": {
    id: "bed-102",
    bedNumber: "Bed 102",
    name: "Ram Prakash",
    patientId: "REJ-9120",
    age: 72,
    gender: "Male",
    location: "GB Pant Hospital → Ward A, Bed 102 (Little Andaman Link)",
    condition: "Type-2 Diabetes Mellitus / Diabetic Neuropathy",
    attendingDoc: "Dr. K. Nair, MD (Endocrinology)",
    primaryContact: "Rajesh Prakash (Son, +91 94742 19203)",
    caregiverPhone: "+91 94742 19203",
    backupPhone: "+91 94742 19204",
    emergencyHub: "GB Pant Hospital Emergency & Crash Team (108)",
    hardwareSource: "Cellular RPM Gateway #AP-4109 & FreeStyle Libre 3",
    admissionDate: "2026-09-12 (Glycemic Control & Foot Care)",
    status: "normal",
    statusLabel: "Stable (Glycemic Watch)",
    news2Score: 0,
    defaultVitals: {
      hr: 74,
      spo2: 98.2,
      bpSys: 122,
      bpDia: 80,
      temp: 36.8,
      glucose: 142,
      sparkHr: [73, 75, 74, 76, 74, 75, 74, 73, 74],
      sparkSpo2: [98.1, 98.3, 98.2, 98.0, 98.2, 98.3, 98.2, 98.1, 98.2],
      sparkBp: [120, 122, 124, 121, 123, 122, 125, 122, 122],
      sparkTemp: [36.8, 36.9, 36.8, 36.7, 36.8, 36.9, 36.8, 36.8, 36.8],
      sparkGlucose: [138, 142, 145, 140, 144, 142, 146, 142, 142],
    },
    hardwareDevices: [
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
        type: "Upper Arm NIBP",
        status: "Connected",
        battery: 91,
        protocol: "BLE Mesh",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-102-1",
            name: "Metformin HCl",
            dose: "500 mg",
            purpose: "Type-2 Diabetes / Glycemic Control",
            status: "Taken",
            takenAt: "08:12 AM",
          },
          {
            id: "m-102-2",
            name: "Glimepiride",
            dose: "1 mg",
            purpose: "Beta-Cell Secretagogue",
            status: "Taken",
            takenAt: "08:12 AM",
          },
        ],
      },
      {
        slot: "Noon (12:00 PM)",
        timeCode: "12:00",
        drugs: [
          {
            id: "m-102-3",
            name: "Alpha Lipoic Acid",
            dose: "300 mg",
            purpose: "Diabetic Neuropathy Support",
            status: "Taken",
            takenAt: "12:30 PM",
          },
        ],
      },
      {
        slot: "Night (08:00 PM)",
        timeCode: "20:00",
        drugs: [
          {
            id: "m-102-4",
            name: "Atorvastatin",
            dose: "20 mg",
            purpose: "Cardiovascular Risk Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-102-1",
        title: "Bed 102 (Ram Prakash): CGM Telemetry Synced",
        reading: "142 mg/dL",
        time: "12m ago",
        severity: "info",
        message: "Glucose levels steady in target range (110-160 mg/dL).",
        source: "FreeStyle Libre 3 CGM",
      },
      {
        id: "alt-102-2",
        title: "Bed 102: Little Andaman Telemetry Uplink Nominal",
        reading: "4G LTE Active (-68 dBm)",
        time: "38m ago",
        severity: "info",
        message: "Satellite relay stable across Hut Bay link.",
        source: "Gateway #AP-4109",
      },
    ],
    timeline: [
      {
        id: "tl-102-1",
        time: "11:45 AM",
        title: "CGM Telemetry Packet Upload",
        desc: "Automated packet upload via Hut Bay gateway. Glucose 142 mg/dL.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-102-2",
        time: "09:30 AM",
        title: "Endocrinology Assessment",
        desc: "Dr. K. Nair noted stable glycemic trend. HbA1c trajectory on track.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-102-3",
        time: "08:12 AM",
        title: "Morning Medication Administered",
        desc: "Metformin 500mg and Glimepiride 1mg taken post-breakfast.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
  "bed-103": {
    id: "bed-103",
    bedNumber: "Bed 103",
    name: "Meera Nair",
    patientId: "REJ-6319",
    age: 58,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 103 (Surgical Recovery B)",
    condition: "Post-Op Day 2 (Laparoscopic Cholecystectomy)",
    attendingDoc: "Dr. V. Rao, MS (General Surgery)",
    primaryContact: "Suresh Nair (Husband, +91 94342 55210)",
    caregiverPhone: "+91 94342 55210",
    backupPhone: "+91 94342 55211",
    emergencyHub: "GB Pant Hospital Surgical ICU Crash Team",
    hardwareSource: "Bedside Monitor #BM-2041 & Mindray Gateway",
    admissionDate: "2026-09-16 (Post-Surgical Inpatient)",
    status: "normal",
    statusLabel: "Stable (Post-Surgical Recovery)",
    news2Score: 0,
    defaultVitals: {
      hr: 78,
      spo2: 99.0,
      bpSys: 118,
      bpDia: 76,
      temp: 36.9,
      glucose: 104,
      sparkHr: [76, 78, 77, 79, 78, 77, 78, 79, 78],
      sparkSpo2: [99.0, 99.1, 98.9, 99.0, 99.2, 99.0, 98.9, 99.1, 99.0],
      sparkBp: [116, 118, 117, 119, 118, 116, 120, 118, 118],
      sparkTemp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9, 36.9, 36.9],
      sparkGlucose: [102, 105, 104, 106, 103, 104, 105, 104, 104],
    },
    hardwareDevices: [
      {
        model: "Mindray BeneView T8",
        type: "Bedside Multi-Parameter",
        status: "Connected",
        battery: 100,
        protocol: "Hospital LAN",
      },
      {
        model: "Welch Allyn Connex",
        type: "Spot Vitals Monitor",
        status: "Connected",
        battery: 94,
        protocol: "Hospital WLAN",
      },
      {
        model: "Alaris Infusion Pump",
        type: "IV Fluid Controller",
        status: "Infusing",
        battery: 100,
        protocol: "SmartPump Link",
      },
    ],
    medications: [
      {
        slot: "Morning (09:00 AM)",
        timeCode: "09:00",
        drugs: [
          {
            id: "m-103-1",
            name: "Cefuroxime (IV)",
            dose: "500 mg",
            purpose: "Post-Op Surgical Prophylaxis",
            status: "Taken",
            takenAt: "09:05 AM",
          },
        ],
      },
      {
        slot: "SOS (As Needed)",
        timeCode: "12:00",
        drugs: [
          {
            id: "m-103-2",
            name: "Paracetamol (IV)",
            dose: "650 mg",
            purpose: "Analgesic / Fever Management",
            status: "Taken",
            takenAt: "12:10 PM",
          },
        ],
      },
      {
        slot: "Evening (07:00 PM)",
        timeCode: "19:00",
        drugs: [
          {
            id: "m-103-3",
            name: "Pantoprazole",
            dose: "40 mg",
            purpose: "Gastroprotection (PPI)",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-103-1",
        title: "Bed 103 (Meera Nair): Surgical Site Inspection Normal",
        reading: "Clean Dressing",
        time: "1h ago",
        severity: "info",
        message: "Laparoscopic port sites dry and intact. No erythema.",
        source: "Surgical Round",
      },
      {
        id: "alt-103-2",
        title: "Bed 103: Post-Op Ambulation Successful",
        reading: "Assisted Walk 15m",
        time: "2h ago",
        severity: "info",
        message: "Patient tolerated bedside ambulation with nursing staff.",
        source: "Mobility Log",
      },
    ],
    timeline: [
      {
        id: "tl-103-1",
        time: "11:15 AM",
        title: "Surgical Dressing Check",
        desc: "Dr. V. Rao inspected laparoscopic incisions. Healing normally.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-103-2",
        time: "09:05 AM",
        title: "IV Antibiotic Administered",
        desc: "Cefuroxime 500mg IV piggyback infused over 30 minutes.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "tl-103-3",
        time: "07:30 AM",
        title: "Morning Vitals Check",
        desc: "SpO2 99%, HR 78 bpm, Temp 36.9°C. NEWS2 score: 0 (Normal).",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
    ],
  },
  "bed-104": {
    id: "bed-104",
    bedNumber: "Bed 104",
    name: "Kavitha Raman",
    patientId: "REJ-4981",
    age: 64,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 104 (Cardiology Unit)",
    condition: "Sinus Tachycardia / Arrhythmia Holter Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology)",
    primaryContact: "Ramesh Raman (Son, +91 94742 77190)",
    caregiverPhone: "+91 94742 77190",
    backupPhone: "+91 94742 77191",
    emergencyHub: "GB Pant Hospital Code Blue & MET Team",
    hardwareSource: "Holter Wireless Telemetry #CW-9012 & Masimo Rad-97",
    admissionDate: "2026-09-15 (Telemetry Arrhythmia Evaluation)",
    status: "caution",
    statusLabel: "Caution (Sinus Tachycardia Watch)",
    news2Score: 2,
    defaultVitals: {
      hr: 94,
      spo2: 96.5,
      bpSys: 138,
      bpDia: 88,
      temp: 37.1,
      glucose: 110,
      sparkHr: [92, 95, 93, 96, 94, 93, 97, 94, 94],
      sparkSpo2: [96.4, 96.6, 96.5, 96.3, 96.5, 96.7, 96.5, 96.4, 96.5],
      sparkBp: [136, 139, 138, 137, 140, 138, 136, 139, 138],
      sparkTemp: [37.1, 37.2, 37.0, 37.1, 37.2, 37.1, 37.0, 37.1, 37.1],
      sparkGlucose: [108, 111, 110, 112, 109, 110, 111, 110, 110],
    },
    hardwareDevices: [
      {
        model: "Holter Wireless Telemetry #CW-9012",
        type: "3-Lead Continuous ECG",
        status: "Connected",
        battery: 89,
        protocol: "Continuous RF",
      },
      {
        model: "Masimo Rad-97",
        type: "Pulse CO-Oximeter",
        status: "Connected",
        battery: 94,
        protocol: "Continuous BLE",
      },
      {
        model: "SanketLife 12-Lead",
        type: "Spot Diagnostic ECG",
        status: "Standby",
        battery: 82,
        protocol: "CDSCO Cleared",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-104-1",
            name: "Metoprolol Succinate",
            dose: "25 mg",
            purpose: "Beta-1 Selective Adrenoceptor Blocker",
            status: "Taken",
            takenAt: "08:15 AM",
          },
        ],
      },
      {
        slot: "Afternoon (01:00 PM)",
        timeCode: "13:00",
        drugs: [
          {
            id: "m-104-2",
            name: "Ecosprin (Aspirin)",
            dose: "75 mg",
            purpose: "Antiplatelet / Thromboembolism Prophylaxis",
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
            id: "m-104-3",
            name: "Atorvastatin",
            dose: "10 mg",
            purpose: "Cardiovascular Risk Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-104-1",
        title: "Bed 104 (Kavitha Raman): Sinus Tachycardia Observation",
        reading: "94 bpm (Transient peak 97)",
        time: "18m ago",
        severity: "caution",
        message: "Mild pulse elevation noted. Shift B nursing lead alerted for telemetry check.",
        source: "Holter Telemetry CW-9012",
      },
      {
        id: "alt-104-2",
        title: "Bed 104: Continuous Pulse Oximetry Nominal",
        reading: "96.5% SpO2",
        time: "32m ago",
        severity: "info",
        message: "Oxygen saturation steady on room air.",
        source: "Masimo Rad-97",
      },
    ],
    timeline: [
      {
        id: "tl-104-1",
        time: "11:50 AM",
        title: "Rhythm Strip Captured",
        desc: "Sinus tachycardia at 94 bpm with normal QRS morphology. No ectopics.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-104-2",
        time: "10:00 AM",
        title: "Cardiology Review",
        desc: "Dr. A. Sen ordered Metoprolol continuation; scheduled repeat 12-lead.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-104-3",
        time: "08:15 AM",
        title: "Morning Medication Administered",
        desc: "Metoprolol Succinate 25mg taken with water.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
};

const App = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [curLang, setCurLang] = React.useState("en");
  const [user, setUser] = React.useState(ACCOUNT_PROFILES["asharma@demo.in"]);
  const [token, setToken] = React.useState(localStorage.getItem("rejivan_token") || "");

  // Modal States
  const [callModalOpen, setCallModalOpen] = React.useState(false);
  const [exportModalOpen, setExportModalOpen] = React.useState(false);
  const [addMedModalOpen, setAddMedModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [checkinModalOpen, setCheckinModalOpen] = React.useState(false);
  const [checkinScenario, setCheckinScenario] = React.useState("trip_fall");

  const handleOpenCheckin = (scenario) => {
    setCheckinScenario(scenario || "trip_fall");
    setCheckinModalOpen(true);
  };

  // Physiological Drift & Clinical Simulation Engine
  const [simMode, setSimMode] = React.useState("baseline"); // "baseline" | "bp_crisis" | "hypoxemia" | "bradycardia"
  const [isStreaming, setIsStreaming] = React.useState(true);
  const [secondsAgo, setSecondsAgo] = React.useState(0);
  const [packetCount, setPacketCount] = React.useState(4821);
  const [lastPacketFlash, setLastPacketFlash] = React.useState(false);

  // Vitals & Telemetry State
  const [vitals, setVitals] = React.useState({
    hr: 85,
    spo2: 97.7,
    bpSys: 149,
    bpDia: 97,
    temp: 37.0,
    glucose: 112,
    lastSync: "Just now",
    hardwareSource: "BLE Telemetry Gateway (Tier 1 Certified)",
    sparkHr: [82, 84, 83, 85, 84, 86, 85, 84, 85],
    sparkSpo2: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
    sparkBp: [142, 144, 146, 145, 148, 147, 150, 148, 149],
    sparkTemp: [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
    sparkGlucose: [115, 112, 114, 110, 113, 111, 114, 112, 112],
  });

  // Inpatient Bed Selector State (for Hospital Nurse logins)
  const [selectedWardBed, setSelectedWardBed] = React.useState("bed-101"); // "bed-101" | "bed-102" | "bed-103" | "bed-104" | "all"

  const isNurse = user?.role === "nurse" || user?.email === "wardnurse@demo.in";

  const activePatient = React.useMemo(() => {
    if (isNurse) {
      if (selectedWardBed && selectedWardBed !== "all" && HOSPITAL_INPATIENT_BEDS[selectedWardBed]) {
        return HOSPITAL_INPATIENT_BEDS[selectedWardBed];
      }
      return {
        ...ACCOUNT_PROFILES["wardnurse@demo.in"],
        name: "GB Pant Hospital · Ward A (All Beds)",
        patientId: "WARD-A-ALL",
        condition: "Inpatient Ward Overview (4 Monitored Beds)",
      };
    }
    return ACCOUNT_PROFILES[user?.email] || ACCOUNT_PROFILES["asharma@demo.in"];
  }, [user?.email, isNurse, selectedWardBed]);

  const handleSelectWardBed = (bedId) => {
    setSelectedWardBed(bedId);
    if (bedId !== "all" && HOSPITAL_INPATIENT_BEDS[bedId]) {
      const targetBed = HOSPITAL_INPATIENT_BEDS[bedId];
      setVitals({
        ...targetBed.defaultVitals,
        lastSync: "Just now",
        hardwareSource: targetBed.hardwareSource,
      });
      setSimMode("baseline");
    }
  };

  // Live seconds ticker
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Continuous physiological drift & sparkline streaming interval (every 1.5 seconds)
  React.useEffect(() => {
    if (!isStreaming) return;

    const streamInterval = setInterval(() => {
      setVitals((prev) => {
        const baseVitals = activePatient?.defaultVitals || ACCOUNT_PROFILES["asharma@demo.in"].defaultVitals;
        let targetHr = baseVitals.hr;
        let targetSpo2 = baseVitals.spo2;
        let targetBpSys = baseVitals.bpSys;
        let targetBpDia = baseVitals.bpDia;
        let targetTemp = baseVitals.temp;
        let targetGlucose = baseVitals.glucose;

        if (simMode === "bp_crisis") {
          targetHr = 95;
          targetSpo2 = 97.1;
          targetBpSys = 172;
          targetBpDia = 106;
          targetTemp = 37.2;
          targetGlucose = 126;
        } else if (simMode === "hypoxemia") {
          targetHr = 114;
          targetSpo2 = 89.4;
          targetBpSys = 138;
          targetBpDia = 88;
          targetTemp = 37.3;
          targetGlucose = 118;
        } else if (simMode === "bradycardia") {
          targetHr = 50;
          targetSpo2 = 98.2;
          targetBpSys = 104;
          targetBpDia = 64;
          targetTemp = 36.6;
          targetGlucose = 102;
        }

        // Physiological drift equation with mean reversion and natural jitter
        const drift = (curr, target, step, noise) => {
          const delta = (target - curr) * step;
          const jitter = (Math.random() * 2 - 1) * noise;
          return curr + delta + jitter;
        };

        const nextHr = Math.round(drift(prev.hr, targetHr, 0.35, 1.2));
        const nextSpo2 = Math.round(drift(prev.spo2, targetSpo2, 0.3, 0.15) * 10) / 10;
        const nextBpSys = Math.round(drift(prev.bpSys, targetBpSys, 0.35, 1.5));
        const nextBpDia = Math.round(drift(prev.bpDia, targetBpDia, 0.35, 1.2));
        const nextTemp = Math.round(drift(prev.temp, targetTemp, 0.2, 0.05) * 10) / 10;
        const nextGlucose = Math.round(drift(prev.glucose, targetGlucose, 0.25, 1.0));

        const pushFifo = (arr, val, max = 12) => {
          const next = [...(arr || []), val];
          return next.length > max ? next.slice(next.length - max) : next;
        };

        return {
          ...prev,
          hr: nextHr,
          spo2: nextSpo2,
          bpSys: nextBpSys,
          bpDia: nextBpDia,
          temp: nextTemp,
          glucose: nextGlucose,
          lastSync: "Just now",
          sparkHr: pushFifo(prev.sparkHr, nextHr),
          sparkSpo2: pushFifo(prev.sparkSpo2, nextSpo2),
          sparkBp: pushFifo(prev.sparkBp, nextBpSys),
          sparkTemp: pushFifo(prev.sparkTemp, nextTemp),
          sparkGlucose: pushFifo(prev.sparkGlucose, nextGlucose),
        };
      });

      setSecondsAgo(0);
      setPacketCount((p) => p + 1);
      setLastPacketFlash(true);
      setTimeout(() => setLastPacketFlash(false), 300);
    }, 1500);

    return () => clearInterval(streamInterval);
  }, [isStreaming, simMode, activePatient]);

  // Dynamic Triage Metrics Calculator
  const getTriageMetrics = () => {
    if (isNurse && selectedWardBed === "all") {
      return {
        patientsCount: 4,
        normalCount: 2,
        cautionCount: 2,
        dangerCount: 0,
        cautionText: "Bed 101 (Elevated BP) • Bed 104 (Tachycardia)",
        dangerText: "Zero active emergency alerts",
      };
    }
    if (vitals.bpSys >= 160 || vitals.spo2 < 92 || vitals.hr < 60 || vitals.hr > 100) {
      let dangerText = "Stage 2 Crisis Escalation";
      if (vitals.spo2 < 92) dangerText = `Acute Hypoxemia: SpO2 ${vitals.spo2}%`;
      else if (vitals.hr < 60) dangerText = `Bradycardia: HR ${vitals.hr} bpm`;
      else if (vitals.hr > 100) dangerText = `Tachycardia: HR ${vitals.hr} bpm`;
      else if (vitals.bpSys >= 160) dangerText = `Severe Hypertension: ${vitals.bpSys}/${vitals.bpDia}`;
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 0,
        dangerCount: 1,
        cautionText: "Prior check nominal",
        dangerText,
      };
    }
    if (vitals.bpSys >= 140 || vitals.bpDia >= 90 || vitals.spo2 < 95 || vitals.glucose > 160) {
      const reason = vitals.glucose > 160
        ? `Elevated Glucose: ${vitals.glucose} mg/dL`
        : `Elevated BP: ${vitals.bpSys}/${vitals.bpDia} mmHg`;
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 1,
        dangerCount: 0,
        cautionText: reason,
        dangerText: "Zero active emergencies",
      };
    }
    return {
      patientsCount: 1,
      normalCount: 1,
      cautionCount: 0,
      dangerCount: 0,
      cautionText: "Zero active cautions",
      dangerText: "Zero active emergencies",
    };
  };

  const triage = getTriageMetrics();

  // Fetch real-time vitals from server periodically (or graceful simulated fallback)
  React.useEffect(() => {
    let isMounted = true;

    const fetchVitals = async () => {
      try {
        const res = await fetch("/api/vitals", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const json = await res.json();
          if (json.patients && json.patients.length > 0 && isMounted) {
            const p = json.patients[0];
            const v = p.vitals || {};
            setVitals((prev) => ({
              ...prev,
              hr: v.hr || prev.hr,
              spo2: v.spo2 !== undefined ? v.spo2 : prev.spo2,
              bpSys: v.bpSys || prev.bpSys,
              bpDia: v.bpDia || prev.bpDia,
              temp: v.temp || prev.temp,
              glucose: v.glucose || prev.glucose,
              lastSync: "Just now",
            }));
          }
        }
      } catch (err) {
        // Fallback to internal clinical telemetry stream
      }
    };

    fetchVitals();
    const interval = setInterval(fetchVitals, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    const profile = ACCOUNT_PROFILES[email] || ACCOUNT_PROFILES["asharma@demo.in"];
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser({ ...profile, ...(data.user || {}) });
        localStorage.setItem("rejivan_token", data.token);
        setVitals({
          ...profile.defaultVitals,
          lastSync: "Just now",
          hardwareSource: profile.hardwareSource,
        });
        setSimMode("baseline");
        if (profile.role === "nurse") {
          setActiveTab("ward");
        } else {
          setActiveTab("dashboard");
        }
        return;
      }
    } catch (e) {
      // Offline fallback
    }

    // Client-side fallback
    setUser(profile);
    setVitals({
      ...profile.defaultVitals,
      lastSync: "Just now",
      hardwareSource: profile.hardwareSource,
    });
    setSimMode("baseline");
    if (profile.role === "nurse") {
      setActiveTab("ward");
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rejivan_token");
    setToken("");
    setLoginModalOpen(true);
  };

  // Route Protection: Virtual Ward is strictly restricted to hospital staff / nurse logins
  React.useEffect(() => {
    const isNurse = user?.role === "nurse" || user?.email === "wardnurse@demo.in";
    if (!isNurse && activeTab === "ward") {
      setActiveTab("dashboard");
    }
  }, [user, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
      {/* 1. Left Navigation Sidebar (Collapsible) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        alertCount={3}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
      />

      {/* Main Content Area Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* 2. Top Application Bar */}
        <TopBar
          activeTab={activeTab}
          user={user}
          onLogout={handleLogout}
          onSwitchUser={(email, pw) => handleLogin(email, pw)}
          curLang={curLang}
          setCurLang={setCurLang}
          notificationCount={3}
          setMobileOpen={setMobileOpen}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {activeTab === "dashboard" && (
            <div className="animate-in fade-in duration-150">
              {/* 3. Global Triage Metric Strip (Top of Dashboard) */}
              <TriageMetricStrip
                patientsCount={triage.patientsCount}
                normalCount={triage.normalCount}
                cautionCount={triage.cautionCount}
                dangerCount={triage.dangerCount}
                cautionText={triage.cautionText}
                dangerText={triage.dangerText}
              />

              {/* Interactive Bio-Telemetry & Clinical Simulation Controls Bar */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${isStreaming ? "bg-emerald-500 animate-ping" : "bg-slate-300"}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Continuous Bio-Telemetry Stream
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold transition-colors ${
                        lastPacketFlash ? "bg-emerald-200 text-emerald-900 font-bold" : "bg-slate-100 text-slate-600"
                      }`}>
                        Packet #{packetCount} · {isStreaming ? "LIVE (1.5s drift)" : "PAUSED"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Last BLE packet: <span className="font-mono font-medium text-slate-700">{secondsAgo === 0 ? "Just now" : `${secondsAgo}s ago`}</span> · BLE Sampling: 1.0 Hz · Zero packet loss
                    </p>
                  </div>
                </div>

                {/* Simulation Scenario Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 self-stretch md:self-auto">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
                    Simulation Modes:
                  </span>
                  <button
                    onClick={() => setSimMode("baseline")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      simMode === "baseline"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    🟢 Baseline (85 bpm)
                  </button>
                  <button
                    onClick={() => setSimMode("bp_crisis")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      simMode === "bp_crisis"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    ⚠️ BP Crisis (172/106)
                  </button>
                  <button
                    onClick={() => setSimMode("hypoxemia")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      simMode === "hypoxemia"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                    }`}
                  >
                    🚨 Hypoxemia (89%)
                  </button>
                  <button
                    onClick={() => setSimMode("bradycardia")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      simMode === "bradycardia"
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                    }`}
                  >
                    📉 Bradycardia (50 bpm)
                  </button>
                  <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                    title={isStreaming ? "Pause real-time streaming" : "Resume real-time streaming"}
                  >
                    {isStreaming ? "⏸️ Pause" : "▶️ Resume"}
                  </button>
                </div>
              </div>

              {/* 4. Main Content Area (2-Column Grid: 70% Left, 30% Right) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Column (Primary Telemetry & Patient Detail - 70%) */}
                <div className="xl:col-span-8 space-y-6">
                  {/* Patient Overview Card */}
                  <PatientOverviewCard
                    patient={{
                      name: activePatient.name,
                      age: activePatient.age,
                      gender: activePatient.gender,
                      location: activePatient.location,
                      patientId: activePatient.patientId,
                      status: triage.dangerCount > 0 ? "Critical Alert" : triage.cautionCount > 0 ? "Caution / Review" : "Monitoring Nominal",
                      lastUpdated: secondsAgo === 0 ? "Just now (Live BLE)" : `${secondsAgo}s ago`,
                    }}
                    onCallCaregiver={() => setCallModalOpen(true)}
                    onClinicalExport={() => setExportModalOpen(true)}
                  />

                  {/* Comprehensive Vital Signs Table */}
                  <VitalSignsTable vitalsData={vitals} />

                  {/* Hardware Diagnostics & Sensor Telemetry Bar (Pinned at bottom of left area) */}
                  <HardwareDiagnosticsBar
                    reliabilityScore={98}
                    currentUser={user}
                    activePatient={activePatient}
                  />
                </div>

                {/* Right Column (Alerts & Care Coordination Panel - 30%) */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Recent Alerts Card */}
                  <RecentAlerts currentUser={user} />

                  {/* Medication Schedule Card */}
                  <MedicationScheduleCard
                    onOpenAddModal={() => setAddMedModalOpen(true)}
                    currentUser={user}
                  />

                  {/* Patient Timeline Feed */}
                  <PatientTimeline currentUser={user} />
                </div>
              </div>

              {/* 5. Multimodal Incident Reconstruction & Kinematics Panel */}
              <div className="mt-6">
                <IncidentReconstructionPanel
                  onTriggerVerification={handleOpenCheckin}
                  currentVitals={vitals}
                />
              </div>
            </div>
          )}

          {/* Dedicated "Camera Zones" Route */}
          {activeTab === "camera" && (
            <CameraZonesView
              onTriggerAlert={(active) => {
                if (active) {
                  setVitals((prev) => ({ ...prev, bpSys: 154 }));
                } else {
                  setVitals((prev) => ({ ...prev, bpSys: 149 }));
                }
              }}
              onTriggerVerification={handleOpenCheckin}
              currentUser={user}
              activePatient={activePatient}
            />
          )}

          {/* Virtual Ward Route (Restricted strictly to Hospital Staff & Nurses) */}
          {activeTab === "ward" && (user?.role === "nurse" || user?.email === "wardnurse@demo.in") && (
            <VirtualWardView
              currentVitals={vitals}
              simMode={simMode}
              isStreaming={isStreaming}
              secondsAgo={secondsAgo}
              onPageDoctor={() => setCallModalOpen(true)}
              onExportTelemetry={() => setExportModalOpen(true)}
              currentUser={user}
              activePatient={activePatient}
            />
          )}

          {/* Medicines MAR Route */}
          {activeTab === "medicines" && (
            <MedicinesView
              onOpenAddModal={() => setAddMedModalOpen(true)}
              currentUser={user}
            />
          )}

          {/* Alerts Escalation Route */}
          {activeTab === "alerts" && (
            <AlertsView currentUser={user} activePatient={activePatient} />
          )}

          {/* Medical Devices Fleet Route */}
          {activeTab === "devices" && (
            <MedicalDevicesView currentUser={user} activePatient={activePatient} />
          )}
        </main>

        {/* Global Clinical Modals */}
        <CallCaregiverModal
          isOpen={callModalOpen}
          onClose={() => setCallModalOpen(false)}
          currentUser={user}
          activePatient={activePatient}
        />
        <ClinicalExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          vitalsData={vitals}
          currentUser={user}
          activePatient={activePatient}
        />
        <AddMedicationModal
          isOpen={addMedModalOpen}
          onClose={() => setAddMedModalOpen(false)}
          currentUser={user}
          activePatient={activePatient}
        />
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        <ResidentCheckinModal
          isOpen={checkinModalOpen}
          onClose={() => setCheckinModalOpen(false)}
          scenario={checkinScenario}
          activePatient={activePatient}
          onEmergencyConfirmed={() => {
            setVitals((prev) => ({ ...prev, bpSys: 178, hr: 124 }));
          }}
        />

        {/* Clinical Software Compliance Footer */}
        <footer className="border-t border-slate-200/80 py-4 px-6 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">ReJivan Clinical Suite</span>
            <span>•</span>
            <span>Enterprise Telehealth &amp; Remote Patient Monitoring (RPM)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
            <span>Andaman &amp; Nicobar Islands (UT)</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">System Nominal</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

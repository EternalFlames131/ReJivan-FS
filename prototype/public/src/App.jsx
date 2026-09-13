// prototype/public/src/App.jsx
// Enterprise Clinical Telemetry Dashboard (Epic / Teladoc Grade)

const App = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [curLang, setCurLang] = React.useState("en");
  const [user, setUser] = React.useState({
    name: "Anita Sharma",
    role: "caregiver",
    email: "asharma@demo.in",
  });
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
        let targetHr = 85;
        let targetSpo2 = 97.7;
        let targetBpSys = 149;
        let targetBpDia = 97;
        let targetTemp = 37.0;
        let targetGlucose = 112;

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
  }, [isStreaming, simMode]);

  // Dynamic Triage Metrics Calculator
  const getTriageMetrics = () => {
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
    if (vitals.bpSys >= 140 || vitals.bpDia >= 90 || vitals.spo2 < 95) {
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 1,
        dangerCount: 0,
        cautionText: `Elevated BP: ${vitals.bpSys}/${vitals.bpDia} mmHg`,
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
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("rejivan_token", data.token);
        return;
      }
    } catch (e) {
      // Offline fallback
    }

    // Client-side fallback
    const role = email.includes("nurse") ? "nurse" : "caregiver";
    const name = email.includes("nurse")
      ? "GB Pant Ward Nurse"
      : email.includes("prakash")
      ? "Ram Prakash"
      : "Anita Sharma";
    setUser({ name, role, email });
  };

  const handleLogout = () => {
    localStorage.removeItem("rejivan_token");
    setToken("");
    setLoginModalOpen(true);
  };

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
                      name: "Anita Sharma",
                      age: 67,
                      gender: "Female",
                      location: "Home → Living Room, Junglighat, Port Blair",
                      status: triage.dangerCount > 0 ? "Critical Alert" : triage.cautionCount > 0 ? "Caution / Review" : "Monitoring Nominal",
                      lastUpdated: secondsAgo === 0 ? "Just now (Live BLE)" : `${secondsAgo}s ago`,
                    }}
                    onCallCaregiver={() => setCallModalOpen(true)}
                    onClinicalExport={() => setExportModalOpen(true)}
                  />

                  {/* Comprehensive Vital Signs Table */}
                  <VitalSignsTable vitalsData={vitals} />

                  {/* Hardware Diagnostics & Sensor Telemetry Bar (Pinned at bottom of left area) */}
                  <HardwareDiagnosticsBar reliabilityScore={98} />
                </div>

                {/* Right Column (Alerts & Care Coordination Panel - 30%) */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Recent Alerts Card */}
                  <RecentAlerts />

                  {/* Medication Schedule Card */}
                  <MedicationScheduleCard
                    onOpenAddModal={() => setAddMedModalOpen(true)}
                  />

                  {/* Patient Timeline Feed */}
                  <PatientTimeline />
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
            />
          )}

          {/* Virtual Ward Route */}
          {activeTab === "ward" && <VirtualWardView />}

          {/* Medicines MAR Route */}
          {activeTab === "medicines" && (
            <MedicinesView onOpenAddModal={() => setAddMedModalOpen(true)} />
          )}

          {/* Alerts Escalation Route */}
          {activeTab === "alerts" && <AlertsView />}

          {/* Medical Devices Fleet Route */}
          {activeTab === "devices" && <MedicalDevicesView />}
        </main>

        {/* Global Clinical Modals */}
        <CallCaregiverModal
          isOpen={callModalOpen}
          onClose={() => setCallModalOpen(false)}
        />
        <ClinicalExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          vitalsData={vitals}
        />
        <AddMedicationModal
          isOpen={addMedModalOpen}
          onClose={() => setAddMedModalOpen(false)}
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

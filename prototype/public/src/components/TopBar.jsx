// prototype/public/src/components/TopBar.jsx
// Top Application Bar (Enterprise Clinical Grade)

const TopBar = ({
  activeTab,
  user,
  onLogout,
  onSwitchUser,
  curLang,
  setCurLang,
  notificationCount = 3,
  onOpenNotifications,
  setMobileOpen,
}) => {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);

  const tabTitles = {
    dashboard: "Patient Telemetry Dashboard",
    medicines: "Medication Administration Record",
    camera: "Live Camera Zones & CCTV",
    ward: "Virtual Ward Telemetry Center",
    alerts: "Clinical Alerts & Call Escalation",
    devices: "Paired Medical Devices & Hardware Fleet",
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "te", label: "తెలుగు (Telugu)" },
  ];

  const demoAccounts = [
    {
      name: "Anita Sharma",
      role: "Family Caregiver",
      email: "asharma@demo.in",
      tag: "Sharma Family",
      initials: "AS",
    },
    {
      name: "Ram Prakash",
      role: "Family Caregiver",
      email: "rprakash@demo.in",
      tag: "Prakash Family",
      initials: "RP",
    },
    {
      name: "GB Pant Ward Nurse",
      role: "Ward Nurse",
      email: "wardnurse@demo.in",
      tag: "GB Pant Hospital",
      initials: "WN",
    },
  ];

  const currentTag = user?.name || "Sharma Family";
  const currentRole = user?.role === "nurse" ? "Ward Nurse" : "Family Caregiver";
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "AS";

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
          aria-label="Open mobile menu"
        >
          <LayoutDashboard className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="hover:text-slate-600 transition-colors">ReJivan</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-semibold capitalize">
              {activeTab}
            </span>
          </div>
          <h1 className="text-base lg:text-lg font-bold text-slate-900 leading-tight">
            {tabTitles[activeTab] || "Clinical Dashboard"}
          </h1>
        </div>
      </div>

      {/* Right: Telemetry Status, Bell, Language, Profile */}
      <div className="flex items-center gap-2.5 lg:gap-3.5">
        {/* System status badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live Simulation Mode</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="w-9 h-9 rounded-lg border border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors relative"
            title="Clinical Alerts"
            aria-label="Clinical Alerts"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Quick Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active Clinical Alerts ({notificationCount})
                </span>
                <span className="text-[11px] text-blue-600 font-medium">Real-time</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs">
                  <div className="flex items-center justify-between font-semibold text-amber-900">
                    <span>Blood Pressure Elevated</span>
                    <span className="text-[10px] text-amber-700 font-mono">8m ago</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    149/97 mmHg detected (Systolic &gt; 140 threshold).
                  </p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>Continuous Temp Sync</span>
                    <span className="text-[10px] text-slate-500 font-mono">21m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    TempTraq patch logged normal 37.0 °C.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <select
            value={curLang}
            onChange={(e) => setCurLang(e.target.value)}
            className="h-9 px-2.5 py-1 text-xs font-medium bg-white border border-slate-200/80 hover:border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
            aria-label="Language selection"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-full transition-colors shadow-2xs"
            aria-label="User profile menu"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {initials}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[130px]">
                {currentTag}
              </p>
              <p className="text-[10px] text-slate-500 leading-none">
                {currentRole}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile & Demo Switcher Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentTag}</p>
                <p className="text-[11px] text-slate-500">{currentRole}</p>
                <p className="text-[10px] text-blue-600 font-mono mt-0.5">
                  Andaman &amp; Nicobar (UT)
                </p>
              </div>

              <div className="py-1">
                <p className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Switch Demo Account
                </p>
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => {
                      if (onSwitchUser) onSwitchUser(acc.email, "demo123");
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{acc.name}</div>
                      <div className="text-[10px] text-slate-400">{acc.role}</div>
                    </div>
                    {user?.email === acc.email && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

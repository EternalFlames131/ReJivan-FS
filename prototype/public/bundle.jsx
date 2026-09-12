// ReJivan Clinical Suite - Enterprise Telemetry React Dashboard
// Production-grade bundle generated from modular components in prototype/public/src/

// --- START: prototype\public\src\icons.jsx ---
// prototype/public/src/icons.jsx
// Lucide React SVG Icon Components (clinical stroke 1.75px)

const IconBase = ({ d, className = "w-5 h-5", strokeWidth = 1.75, fill = "none", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {d}
  </svg>
);

const Activity = (props) => (
  <IconBase
    {...props}
    d={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
  />
);

const Heart = (props) => (
  <IconBase
    {...props}
    d={<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />}
  />
);

const Droplets = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
      </>
    }
  />
);

const Thermometer = (props) => (
  <IconBase
    {...props}
    d={<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />}
  />
);

const Wind = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </>
    }
  />
);

const LayoutDashboard = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </>
    }
  />
);

const Pill = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </>
    }
  />
);

const Video = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </>
    }
  />
);

const Building2 = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </>
    }
  />
);

const Bell = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </>
    }
  />
);

const Smartphone = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </>
    }
  />
);

const Phone = (props) => (
  <IconBase
    {...props}
    d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
  />
);

const Download = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </>
    }
  />
);

const AlertTriangle = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </>
    }
  />
);

const CheckCircle2 = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    }
  />
);

const Clock = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    }
  />
);

const Wifi = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </>
    }
  />
);

const Battery = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </>
    }
  />
);

const BatteryCharging = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <line x1="22" x2="22" y1="11" y2="13" />
        <polyline points="11 6 7 12 13 12 9 18" />
      </>
    }
  />
);

const ShieldCheck = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    }
  />
);

const Camera = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    }
  />
);

const Mic = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </>
    }
  />
);

const MicOff = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <line x1="2" x2="22" y1="2" y2="22" />
        <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
        <path d="M5 10v2a7 7 0 0 0 12 5" />
        <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </>
    }
  />
);

const Maximize2 = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" x2="14" y1="3" y2="10" />
        <line x1="3" x2="10" y1="21" y2="14" />
      </>
    }
  />
);

const Minimize2 = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <polyline points="4 14 10 14 10 20" />
        <polyline points="20 10 14 10 14 4" />
        <line x1="14" x2="21" y1="10" y2="3" />
        <line x1="3" x2="10" y1="21" y2="14" />
      </>
    }
  />
);

const User = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    }
  />
);

const LogOut = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </>
    }
  />
);

const ChevronRight = (props) => (
  <IconBase
    {...props}
    d={<polyline points="9 18 15 12 9 6" />}
  />
);

const ChevronLeft = (props) => (
  <IconBase
    {...props}
    d={<polyline points="15 18 9 12 15 6" />}
  />
);

const ChevronDown = (props) => (
  <IconBase
    {...props}
    d={<polyline points="6 9 12 15 18 9" />}
  />
);

const Search = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </>
    }
  />
);

const Sparkles = (props) => (
  <IconBase
    {...props}
    d={<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />}
  />
);

const X = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
      </>
    }
  />
);

const Plus = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
      </>
    }
  />
);

const Check = (props) => (
  <IconBase
    {...props}
    d={<polyline points="20 6 9 17 4 12" />}
  />
);

const BedDouble = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M12 4v6" />
        <path d="M2 18h20" />
      </>
    }
  />
);

const MapPin = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    }
  />
);

const FileText = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </>
    }
  />
);

const RefreshCw = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 21h5v-5" />
      </>
    }
  />
);

const Gauge = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </>
    }
  />
);

const Stethoscope = (props) => (
  <IconBase
    {...props}
    d={
      <>
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </>
    }
  />
);

// --- END: prototype\public\src\icons.jsx ---

// --- START: prototype\public\src\components\Sparkline.jsx ---
// prototype/public/src/components/Sparkline.jsx
// Smooth clinical SVG trend sparkline with gradient fill and real-time pulse indicator

const Sparkline = ({ data = [], color = "#10B981", width = 110, height = 28, strokeWidth = 2, idPrefix = "spk" }) => {
  if (!data || data.length < 2) {
    return <div className="w-[110px] h-[28px] bg-slate-100/60 rounded" />;
  }

  const gradId = `${idPrefix}-${Math.random().toString(36).substr(2, 6)}`;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const padding = 3;
  const effHeight = height - padding * 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * effHeight;
    return { x, y };
  });

  // Polyline path string
  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  // Area path for gradient background
  const lastPt = points[points.length - 1];
  const firstPt = points[0];
  const areaD = `${pathD} L ${lastPt.x.toFixed(1)} ${height} L ${firstPt.x.toFixed(1)} ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible inline-block align-middle"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={lastPt.x}
        cy={lastPt.y}
        r={2.8}
        fill={color}
      />
      <circle
        cx={lastPt.x}
        cy={lastPt.y}
        r={5.5}
        fill={color}
        opacity="0.3"
        className="animate-ping"
      />
    </svg>
  );
};

// --- END: prototype\public\src\components\Sparkline.jsx ---

// --- START: prototype\public\src\components\Sidebar.jsx ---
// prototype/public/src/components/Sidebar.jsx
// Left Navigation Sidebar (Collapsible, Enterprise Clinical Grade)

const Sidebar = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  alertCount = 3,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "medicines", label: "Medicines", icon: Pill },
    { id: "camera", label: "Camera Zones", icon: Video, badge: "Live CCTV" },
    { id: "ward", label: "Virtual Ward", icon: Building2 },
    { id: "alerts", label: "Alerts", icon: Bell, count: alertCount },
    { id: "devices", label: "Medical Devices", icon: Smartphone },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200/80 flex flex-col transition-all duration-200 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3 min-w-0">
            {/* ReJivan Brand Logo Mark */}
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-slate-900 tracking-tight">
                    ReJivan
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-1 py-0.2 rounded">
                    Clinical
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                  Better Care. Brighter Tomorrows.
                </p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setMobileOpen) setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                } ${collapsed ? "justify-center" : ""}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-blue-600 stroke-[2]"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!collapsed && item.count !== undefined && (
                  <span className="px-1.5 py-0.2 text-[11px] font-bold font-mono rounded-full bg-rose-50 text-rose-700 border border-rose-200/90">
                    {item.count}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Status Chip */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
          {!collapsed ? (
            <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                <span className="text-xs font-semibold text-slate-800">
                  Simulation Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Simulated for demonstration purposes.
              </p>
            </div>
          ) : (
            <div
              className="w-full flex justify-center py-2 text-amber-600"
              title="Simulation Demo - Simulated for demonstration purposes"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

// --- END: prototype\public\src\components\Sidebar.jsx ---

// --- START: prototype\public\src\components\TopBar.jsx ---
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

// --- END: prototype\public\src\components\TopBar.jsx ---

// --- START: prototype\public\src\components\TriageMetricStrip.jsx ---
// prototype/public/src/components/TriageMetricStrip.jsx
// Global Triage Metric Strip (4-column grid, Enterprise Clinical Grade)

const TriageMetricStrip = ({
  patientsCount = 1,
  normalCount = 0,
  cautionCount = 1,
  dangerCount = 0,
  cautionText = "Elevated BP: 149/97 mmHg",
  dangerText = "Emergency escalation armed",
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {/* 1. Patients Monitored */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Patients Monitored
          </span>
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {patientsCount}
          </span>
          <span className="text-xs text-slate-500">Active</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>Continuous Bio-Telemetry</span>
        </div>
      </div>

      {/* 2. Normal (Neutral dark typography with subtle green indicator dot, NO heavy green pill spam) */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Normal
          </span>
          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {normalCount}
          </span>
          <span className="text-xs text-slate-500">Patients</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Vitals within target limits</span>
        </div>
      </div>

      {/* 3. Caution (Soft amber background with crisp amber text) */}
      <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            Caution
          </span>
          <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-amber-900 tabular-nums">
            {cautionCount}
          </span>
          <span className="text-xs font-medium text-amber-700">Needs Review</span>
        </div>
        <div className="mt-1 text-[11px] text-amber-800 truncate font-medium">
          {cautionText}
        </div>
      </div>

      {/* 4. Danger / Critical */}
      <div
        className={`rounded-xl p-4 shadow-xs border ${
          dangerCount > 0
            ? "bg-rose-50 border-rose-200 text-rose-700"
            : "bg-white border-slate-200/80 text-slate-900"
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              dangerCount > 0 ? "text-rose-700" : "text-slate-500"
            }`}
          >
            Danger
          </span>
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center ${
              dangerCount > 0
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold font-mono tabular-nums ${
              dangerCount > 0 ? "text-rose-700" : "text-slate-900"
            }`}
          >
            {dangerCount}
          </span>
          <span className="text-xs text-slate-500">Critical</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-500 truncate">
          {dangerCount > 0 ? dangerText : "Zero active emergencies"}
        </div>
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\TriageMetricStrip.jsx ---

// --- START: prototype\public\src\components\PatientOverviewCard.jsx ---
// prototype/public/src/components/PatientOverviewCard.jsx
// Patient Overview Card (Enterprise Clinical Grade)

const PatientOverviewCard = ({
  patient = {
    name: "Anita Sharma",
    age: 67,
    gender: "Female",
    location: "Home → Living Room, Junglighat, Port Blair",
    status: "Monitoring",
    lastUpdated: "2 min ago",
  },
  onCallCaregiver,
  onClinicalExport,
}) => {
  const initials = patient.name
    ? patient.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "AS";

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Avatar + Identity + Location */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Clinical Avatar Badge */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs border border-blue-400/20">
            {initials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {patient.name}
              </h2>
              {/* Monitoring Status Badge with Live Pulse */}
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{patient.status || "Monitoring"}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: REJ-8042
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">
                {patient.age} years | {patient.gender}
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{patient.location}</span>
              </div>
              <span className="text-slate-300 hidden md:inline">•</span>
              <span className="text-slate-400 hidden md:inline">
                Last updated: <span className="font-mono text-slate-600">{patient.lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick-Action Buttons */}
        <div className="flex items-center gap-2 sm:self-center shrink-0">
          <button
            onClick={onCallCaregiver}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
            title="Initiate Caregiver / Nurse Voice Link"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Call Caregiver</span>
          </button>

          <button
            onClick={onClinicalExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
            title="Download Telemetry Audit & Vitals Summary"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Clinical Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\PatientOverviewCard.jsx ---

// --- START: prototype\public\src\components\VitalSignsTable.jsx ---
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

// --- END: prototype\public\src\components\VitalSignsTable.jsx ---

// --- START: prototype\public\src\components\HardwareDiagnosticsBar.jsx ---
// prototype/public/src/components/HardwareDiagnosticsBar.jsx
// Hardware Diagnostics & Sensor Telemetry Bar (Enterprise Clinical Grade)

const HardwareDiagnosticsBar = ({
  devices = [
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
  reliabilityScore = 98,
}) => {
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
          <span>BLE Mesh Hub Active (Port Blair Gateway)</span>
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

// --- END: prototype\public\src\components\HardwareDiagnosticsBar.jsx ---

// --- START: prototype\public\src\components\RecentAlerts.jsx ---
// prototype/public/src/components/RecentAlerts.jsx
// Recent Alerts Card (Enterprise Clinical Grade)

const RecentAlerts = ({ alerts = [], onAcknowledge }) => {
  const defaultAlerts = [
    {
      id: "alt-1",
      title: "Blood Pressure Elevated",
      reading: "149/97 mmHg",
      time: "8m ago",
      severity: "caution",
      message: "Systolic threshold >140 exceeded. Auto-recheck scheduled in 15m.",
      source: "Omron HEM-7156T",
    },
    {
      id: "alt-2",
      title: "Automated Temp Telemetry",
      reading: "37.0 °C",
      time: "21m ago",
      severity: "info",
      message: "Hourly baseline verified. Normal core temperature maintained.",
      source: "TempTraq Patch",
    },
    {
      id: "alt-3",
      title: "Fall Prevention Radar Check",
      reading: "Room Clear",
      time: "42m ago",
      severity: "info",
      message: "Living Room Zone 1: Patient safely seated in armchair.",
      source: "Overhead Edge Camera",
    },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Recent Alerts
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Auto-triage active
        </span>
      </div>

      <div className="mt-3 space-y-2.5">
        {displayAlerts.map((alt) => {
          const isCaution = alt.severity === "caution" || alt.severity === "warning";
          const isDanger = alt.severity === "danger" || alt.severity === "critical";

          return (
            <div
              key={alt.id}
              className={`p-3 rounded-lg border transition-colors ${
                isDanger
                  ? "bg-rose-50/70 border-rose-200/90 text-rose-900"
                  : isCaution
                  ? "bg-amber-50/60 border-amber-200/80 text-amber-900"
                  : "bg-slate-50/70 border-slate-200/70 text-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  {isDanger ? (
                    <Activity className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  ) : isCaution ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                  <span>{alt.title}</span>
                </div>
                <span
                  className={`text-[10px] font-mono shrink-0 font-medium ${
                    isCaution ? "text-amber-700" : "text-slate-400"
                  }`}
                >
                  {alt.time}
                </span>
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`text-xs font-bold font-mono ${
                    isDanger
                      ? "text-rose-700"
                      : isCaution
                      ? "text-amber-800"
                      : "text-slate-900"
                  }`}
                >
                  {alt.reading}
                </span>
                <span className="text-[11px] text-slate-500 truncate">
                  • {alt.source}
                </span>
              </div>

              <p className="text-[11px] mt-1 leading-snug opacity-90 text-slate-600">
                {alt.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\RecentAlerts.jsx ---

// --- START: prototype\public\src\components\MedicationScheduleCard.jsx ---
// prototype/public/src/components/MedicationScheduleCard.jsx
// Medication Schedule Card (Enterprise Clinical Grade)

const MedicationScheduleCard = ({ onOpenAddModal }) => {
  const [schedule, setSchedule] = React.useState([
    {
      slot: "Morning (08:00 AM)",
      timeCode: "08:00",
      drugs: [
        {
          id: "med-1",
          name: "Telmisartan",
          dose: "40 mg",
          purpose: "Hypertension",
          status: "Taken",
          takenAt: "08:05 AM",
        },
        {
          id: "med-2",
          name: "Metformin",
          dose: "500 mg",
          purpose: "Glycemic Control",
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
          purpose: "Bone Density",
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
          purpose: "Lipid Management",
          status: "Upcoming",
          takenAt: null,
        },
      ],
    },
  ]);

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

// --- END: prototype\public\src\components\MedicationScheduleCard.jsx ---

// --- START: prototype\public\src\components\PatientTimeline.jsx ---
// prototype/public/src/components/PatientTimeline.jsx
// Patient Timeline Feed (Enterprise Clinical Grade Micro-Audit Trail)

const PatientTimeline = () => {
  const events = [
    {
      id: "ev-1",
      time: "11:15 AM",
      title: "Continuous Vitals Sync",
      desc: "Telemetry sync completed via BLE Gateway. Confidence: 98% (0 dropped packets).",
      type: "telemetry",
      icon: RefreshCw,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      id: "ev-2",
      time: "10:48 AM",
      title: "Camera Zone Motion Detection",
      desc: "Living Room Zone 1: Patient detected moving to armchair. Posture: Normal seated.",
      type: "camera",
      icon: Video,
      iconColor: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "ev-3",
      time: "09:30 AM",
      title: "Tele-Checkup Clinical Note",
      desc: "Dr. Sen (GB Pant Hospital) reviewed BP trend: 'Continue current dose, recheck post-lunch'.",
      type: "clinical",
      icon: FileText,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "ev-4",
      time: "08:12 AM",
      title: "Medication Adherence Verified",
      desc: "Morning dosage confirmed: Telmisartan 40mg and Metformin 500mg taken.",
      type: "medication",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Patient Timeline Feed
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          DPDP Audit Log
        </span>
      </div>

      {/* Timeline Items */}
      <div className="mt-3.5 relative pl-4 border-l border-slate-200 space-y-4">
        {events.map((ev) => {
          const Icon = ev.icon;
          return (
            <div key={ev.id} className="relative group">
              {/* Bullet node on timeline */}
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-600 transition-colors" />

              <div className="flex items-baseline justify-between gap-2">
                <span className="font-semibold text-xs text-slate-900">
                  {ev.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {ev.time}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {ev.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\PatientTimeline.jsx ---

// --- START: prototype\public\src\components\CameraZonesView.jsx ---
// prototype/public/src/components/CameraZonesView.jsx
// Dedicated Live Camera Zones with Demo Video Footages & Edge Prajñā Radar

const CameraZonesView = ({ onTriggerAlert }) => {
  const [activeCamera, setActiveCamera] = React.useState("cam-1");
  const [audioActive, setAudioActive] = React.useState(false);
  const [fullscreenCam, setFullscreenCam] = React.useState(null);
  const [snapshotToast, setSnapshotToast] = React.useState(null);
  const [simulatedAlert, setSimulatedAlert] = React.useState(false);
  const [viewMode, setViewMode] = React.useState("video"); // 'video' | 'radar' | 'combined'
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());

  // Live 1-second clock ticker for video CCTV HUD
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cameras = [
    {
      id: "cam-1",
      title: "Room 302 Main Overhead View",
      location: "Living Room / Patient Area, Junglighat",
      videoUrl: "/videos/room_302_patient.mp4",
      resolution: "1080p · 30fps",
      latency: "24ms",
      status: "Online",
      patientPosture: "Supine Resting in Care Bed (Normal Respiration · 16/min)",
      confidence: "99.4%",
      roomTemp: "26.5 °C",
      humidity: "64%",
      lightLevel: "320 Lux",
    },
    {
      id: "cam-2",
      title: "Bedside Side-Angle (Fall-Detection Radar)",
      location: "Bedroom Area / Night Guard Zone, Junglighat",
      videoUrl: "/videos/bedside_radar.mp4",
      resolution: "1080p · 30fps",
      latency: "22ms",
      status: "Online",
      patientPosture: "In-Bed Supine · Virtual Bed-Exit Tripwire Armed",
      confidence: "98.9%",
      roomTemp: "25.8 °C",
      humidity: "62%",
      lightLevel: "45 Lux (IR Mode)",
    },
  ];

  const handleTakeSnapshot = (cam) => {
    const timestamp = new Date().toLocaleTimeString();
    setSnapshotToast(`Snapshot captured for ${cam.title} at ${timestamp}. Telemetry metadata attached.`);
    setTimeout(() => setSnapshotToast(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {snapshotToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-medium border border-slate-700 animate-in slide-in-from-bottom-2">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>{snapshotToast}</span>
          <button
            onClick={() => setSnapshotToast(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner: Controls & Edge Prajñā Notice */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/80">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Privacy-First Edge Vision Processing
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                DPDP Act 2023 Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Zero raw video leaves the local hub. On-device Prajñā analyzes skeletal vectors and posture events only.
            </p>
          </div>
        </div>

        {/* View Mode Switcher + Motion Sim Trigger */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-700">
            <button
              onClick={() => setViewMode("video")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === "video"
                  ? "bg-white text-slate-900 font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📹 Video Feed
            </button>
            <button
              onClick={() => setViewMode("radar")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === "radar"
                  ? "bg-white text-slate-900 font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🎯 Skeletal Radar
            </button>
          </div>

          <button
            onClick={() => {
              setSimulatedAlert(!simulatedAlert);
              if (onTriggerAlert) onTriggerAlert(!simulatedAlert);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              simulatedAlert
                ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {simulatedAlert ? "Reset Motion Simulation" : "Simulate Motion / Bed-Exit"}
          </button>
        </div>
      </div>

      {/* Alert Banner alongside the feed */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          simulatedAlert
            ? "bg-rose-50 border-rose-200 text-rose-900"
            : "bg-amber-50/50 border-amber-200/80 text-amber-900"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {simulatedAlert ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider">
                {simulatedAlert
                  ? "Alert: Sudden Motion / Standing Up Rapidly Detected"
                  : "Continuous Fall & Motion Radar Active"}
              </span>
              <p className="text-xs mt-0.5 text-slate-700">
                {simulatedAlert
                  ? "Patient rose rapidly from living room armchair. Radar monitoring stability for 30s before family alert escalation."
                  : "Motion / Bed-exit radar active: Zero fall risk detected. Patient resting safely in living room armchair."}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-700 shrink-0">
            {simulatedAlert ? "Caution Alert Active" : "Radar Status: Nominal"}
          </span>
        </div>
      </div>

      {/* Multi-Camera Feeds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map((cam) => {
          const isSelected = activeCamera === cam.id;
          return (
            <div
              key={cam.id}
              className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all ${
                isSelected ? "border-blue-500/80 ring-1 ring-blue-500/20" : "border-slate-200/80"
              }`}
              onClick={() => setActiveCamera(cam.id)}
            >
              {/* Feed Header */}
              <div className="p-3.5 px-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {cam.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {cam.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">
                    {cam.latency}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">
                    {cam.resolution}
                  </span>
                </div>
              </div>

              {/* Video / Camera Feed Stage */}
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden select-none group">
                {/* 1. Actual Video Element Mode */}
                {viewMode === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <video
                      src={cam.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-85"
                    />
                    {/* Subtle CCTV dark vignette & scanlines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)",
                      }}
                    />
                  </div>
                ) : (
                  /* 2. Procedural Edge AI Skeletal Radar Mode */
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  >
                    {/* Wireframe Room Perspective */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 640 360">
                      <polygon points="60,60 580,60 520,300 120,300" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="60" y1="60" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
                      <line x1="580" y1="60" x2="640" y2="0" stroke="#334155" strokeWidth="1" />
                      <line x1="120" y1="300" x2="0" y2="360" stroke="#334155" strokeWidth="1" />
                      <line x1="520" y1="300" x2="640" y2="360" stroke="#334155" strokeWidth="1" />
                      {/* Bed/Armchair silhouette wireframe */}
                      <rect x="260" y="180" width="120" height="90" rx="6" fill="rgba(16,185,129,0.06)" stroke="#10B981" strokeWidth="1.5" />
                      <text x="270" y="200" fill="#10B981" fontSize="10" fontFamily="monospace">PATIENT ZONE</text>
                    </svg>
                  </div>
                )}

                {/* Top Left HUD: Live Recording Indicator & Clock */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800 text-white text-[11px] font-mono shadow-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-bold text-rose-400">REC</span>
                  <span className="text-slate-400">|</span>
                  <span>{currentTime}</span>
                </div>

                {/* Top Right HUD: Telemetry Environmental Sensors */}
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800 text-slate-300 text-[10px] font-mono flex items-center gap-2 shadow-md">
                  <span>{cam.roomTemp}</span>
                  <span className="text-slate-500">•</span>
                  <span>{cam.humidity}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-bold">{cam.latency}</span>
                </div>

                {/* Target Detection Box Overlay */}
                <div
                  className={`relative border-2 rounded-lg p-3 text-center max-w-[260px] shadow-2xl backdrop-blur-2xs transition-all ${
                    simulatedAlert && cam.id === "cam-1"
                      ? "border-rose-400/90 bg-rose-950/60"
                      : "border-emerald-400/80 bg-slate-950/60"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                      simulatedAlert && cam.id === "cam-1" ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    [ Edge AI Pose Radar: Locked ]
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">
                    {simulatedAlert && cam.id === "cam-1"
                      ? "⚠️ Motion Warning: Standing Up Rapidly"
                      : cam.patientPosture}
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 mt-0.5">
                    Confidence: {cam.confidence} • Skeletal Keypoints: 17/17
                  </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity">
                  {/* Left: Two-way audio status */}
                  <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-800 text-white text-xs">
                    {audioActive ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                        <Mic className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Intercom Active</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400">
                        <MicOff className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Intercom Muted</span>
                      </span>
                    )}
                  </div>

                  {/* Right: Action Buttons (Audio, Snapshot, Fullscreen) */}
                  <div className="flex items-center gap-1.5">
                    {/* Audio Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAudioActive(!audioActive);
                      }}
                      className={`p-1.5 rounded-lg border text-white transition-colors ${
                        audioActive
                          ? "bg-emerald-600 border-emerald-500"
                          : "bg-slate-900/80 hover:bg-slate-800 border-slate-700"
                      }`}
                      title={audioActive ? "Mute Intercom" : "Activate Two-Way Voice Intercom"}
                    >
                      {audioActive ? (
                        <Mic className="w-3.5 h-3.5" />
                      ) : (
                        <MicOff className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Snapshot Tool */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTakeSnapshot(cam);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
                      title="Capture Clinical Snapshot"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>

                    {/* Full-screen Preview */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullscreenCam(cam);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white transition-colors"
                      title="Full-Screen Preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed Card Footer */}
              <div className="p-3 px-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">Posture:</span>
                  <span className="text-slate-600 truncate">{cam.patientPosture}</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-medium">
                  Continuous Telemetry
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Camera Modal Preview */}
      {fullscreenCam && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <h3 className="text-sm font-bold">{fullscreenCam.title}</h3>
                <p className="text-xs text-slate-400">{fullscreenCam.location}</p>
              </div>
            </div>
            <button
              onClick={() => setFullscreenCam(null)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Close full-screen"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 my-4 bg-slate-900 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <video
              src={fullscreenCam.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain opacity-90"
            />
            <div className="absolute bottom-6 left-6 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-white">
              <div className="text-xs font-mono text-emerald-300 font-bold">
                [ CLINICAL MONITOR STREAM · 1080p 30fps ]
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Latency: {fullscreenCam.latency} • Posture: {fullscreenCam.patientPosture}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>ReJivan Live CCTV Clinical Telemetry Monitor</span>
            <span>Zero raw cloud recording • DPDP Act 2023</span>
          </div>
        </div>
      )}
    </div>
  );
};

// --- END: prototype\public\src\components\CameraZonesView.jsx ---

// --- START: prototype\public\src\components\VirtualWardView.jsx ---
// prototype/public/src/components/VirtualWardView.jsx
// Virtual Ward Multi-Bed Telemetry Center (GB Pant Hospital, Port Blair)

const VirtualWardView = () => {
  const [filter, setFilter] = React.useState("all");

  const wardBeds = [
    {
      bed: "Bed 101",
      patient: "Anita Sharma",
      age: 67,
      gender: "F",
      condition: "Hypertension / Post-Stroke Watch",
      vitals: { hr: 85, spo2: 97.7, bp: "149/97", temp: "37.0" },
      status: "caution",
      statusLabel: "Caution (Elevated BP)",
      nurse: "Nurse Priya (Shift A)",
      ward: "GB Pant Hospital, Male/Female Ward A",
    },
    {
      bed: "Bed 102",
      patient: "Ram Prakash",
      age: 72,
      gender: "M",
      condition: "Type-2 Diabetes / Remote Telemetry",
      vitals: { hr: 74, spo2: 98.2, bp: "122/80", temp: "36.8" },
      status: "normal",
      statusLabel: "Stable",
      nurse: "Nurse Priya (Shift A)",
      ward: "Little Andaman Telemetry Link",
    },
    {
      bed: "Bed 103",
      patient: "Meera Nair",
      age: 58,
      gender: "F",
      condition: "Post-Op Day 2 (Cholecystectomy)",
      vitals: { hr: 78, spo2: 99.0, bp: "118/76", temp: "36.9" },
      status: "normal",
      statusLabel: "Stable",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Surgical Recovery",
    },
    {
      bed: "Bed 104",
      patient: "Kavitha Raman",
      age: 64,
      gender: "F",
      condition: "Arrhythmia / Holter Telemetry Watch",
      vitals: { hr: 94, spo2: 96.5, bp: "138/88", temp: "37.1" },
      status: "caution",
      statusLabel: "Caution (Sinus Tachycardia)",
      nurse: "Nurse Anjali (Shift B)",
      ward: "GB Pant Hospital, Cardiology Unit",
    },
  ];

  const filteredBeds = wardBeds.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Virtual Ward Telemetry Center
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              GB Pant Hospital, Port Blair • Real-Time Bedside &amp; Outpatient Monitoring
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Beds ({wardBeds.length})
          </button>
          <button
            onClick={() => setFilter("caution")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "caution"
                ? "bg-white text-amber-800 shadow-2xs"
                : "text-slate-600 hover:text-amber-800"
            }`}
          >
            Caution (2)
          </button>
          <button
            onClick={() => setFilter("normal")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              filter === "normal"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Stable (2)
          </button>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBeds.map((bed, idx) => {
          const isCaution = bed.status === "caution";
          return (
            <div
              key={idx}
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                isCaution
                  ? "border-amber-200/90 ring-1 ring-amber-400/20"
                  : "border-slate-200/80"
              }`}
            >
              {/* Bed Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-700">
                    <BedDouble className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {bed.bed}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-semibold text-sm text-slate-800">
                        {bed.patient}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({bed.age}{bed.gender})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {bed.ward}
                    </p>
                  </div>
                </div>

                {isCaution ? (
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                    {bed.statusLabel}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{bed.statusLabel}</span>
                  </span>
                )}
              </div>

              {/* Patient Condition */}
              <div className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
                <span className="font-medium text-slate-800">Diagnosis:</span>
                <span>{bed.condition}</span>
              </div>

              {/* Vitals Telemetry Grid */}
              <div className="grid grid-cols-4 gap-2 my-3 p-3 bg-slate-50/70 rounded-lg border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    HR
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.hr}
                  </span>
                  <span className="text-[10px] text-slate-400 block">bpm</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    SpO2
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.spo2}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">O2</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    BP
                  </span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      isCaution ? "text-amber-700" : "text-slate-900"
                    }`}
                  >
                    {bed.vitals.bp}
                  </span>
                  <span className="text-[10px] text-slate-400 block">mmHg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Temp
                  </span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {bed.vitals.temp}
                  </span>
                  <span className="text-[10px] text-slate-400 block">°C</span>
                </div>
              </div>

              {/* Nurse footer & Actions */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                <span>{bed.nurse}</span>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    Intercom
                  </button>
                  <button className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                    View Chart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\VirtualWardView.jsx ---

// --- START: prototype\public\src\components\MedicinesView.jsx ---
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

// --- END: prototype\public\src\components\MedicinesView.jsx ---

// --- START: prototype\public\src\components\AlertsView.jsx ---
// prototype/public/src/components/AlertsView.jsx
// Clinical Alerts & Automated Emergency Call Chain Escalation (Enterprise Clinical Grade)

const AlertsView = () => {
  const callLadder = [
    {
      tier: "Tier 1: Family Caregiver",
      contact: "Priya Sharma (Daughter)",
      phone: "+91 94342 81101",
      status: "Answered",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      time: "11:02:14 AM (Call duration: 1m 24s)",
      note: "Caregiver confirmed patient is responsive, sitting in living room. Rechecking BP in 15m.",
    },
    {
      tier: "Tier 2: Backup Emergency Contact",
      contact: "Rajesh Sharma (Son)",
      phone: "+91 94342 81102",
      status: "Standby",
      statusColor: "text-slate-600 bg-slate-50 border-slate-200",
      time: "Armed (Triggers if Tier 1 unanswered for 45s)",
      note: "Standby escalation route.",
    },
    {
      tier: "Tier 3: Emergency Dispatch (108 / 112)",
      contact: "Andaman & Nicobar Emergency Response Service",
      phone: "108 / 112 (Direct Dispatch)",
      status: "Standby",
      statusColor: "text-slate-600 bg-slate-50 border-slate-200",
      time: "Armed (Auto-dispatches with GPS & Live Vitals Packet)",
      note: "GB Pant Hospital Ambulance Hub, Port Blair.",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Clinical Alerts &amp; 3-Tier Emergency Escalation
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic Autonomous Emergency Call Chain • Zero Human Intermediary Latency
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Call Chain Armed &amp; Ready</span>
        </span>
      </div>

      {/* 3-Tier Escalation Ladder */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Emergency Call Ladder Execution Log</span>
        </h3>

        <div className="space-y-4">
          {callLadder.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">
                    {step.tier}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {step.contact}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  {step.phone}
                </div>
                <p className="text-xs text-slate-600 pt-0.5">{step.note}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border ${step.statusColor}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.status}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\AlertsView.jsx ---

// --- START: prototype\public\src\components\MedicalDevicesView.jsx ---
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

// --- END: prototype\public\src\components\MedicalDevicesView.jsx ---

// --- START: prototype\public\src\components\Modals.jsx ---
// prototype/public/src/components/Modals.jsx
// Enterprise Clinical Modals (Call Caregiver, Clinical Export, Add Medication)

const CallCaregiverModal = ({ isOpen, onClose }) => {
  const [callingState, setCallingState] = React.useState(null);

  if (!isOpen) return null;

  const handleDial = (target) => {
    setCallingState(`Dialing ${target}... Voice telemetry link established.`);
    setTimeout(() => {
      setCallingState(`Connected to ${target}. Intercom channel open.`);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Care Team &amp; Emergency Dispatch
              </h3>
              <p className="text-[11px] text-slate-400">
                Patient: Anita Sharma • Junglighat, Port Blair
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCallingState(null);
              onClose();
            }}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {callingState && (
          <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{callingState}</span>
          </div>
        )}

        <div className="my-4 space-y-2.5">
          <button
            onClick={() => handleDial("Dr. A. Sen (GB Pant Hospital)")}
            className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                Dr. A. Sen (GB Pant Hospital)
              </div>
              <div className="text-[11px] text-slate-500">
                Primary Physician • Cardiology Referral
              </div>
            </div>
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
          </button>

          <button
            onClick={() => handleDial("Priya Sharma (Daughter)")}
            className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                Priya Sharma (Daughter)
              </div>
              <div className="text-[11px] text-slate-500">
                Primary Family Caregiver • +91 94342 81101
              </div>
            </div>
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
          </button>

          <button
            onClick={() => handleDial("108 / 112 Emergency Ambulance Dispatch")}
            className="w-full text-left p-3 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-rose-900">
                108 / 112 Emergency Dispatch
              </div>
              <div className="text-[11px] text-rose-700">
                Direct Ambulance with GPS &amp; Vitals Packet
              </div>
            </div>
            <Activity className="w-4 h-4 text-rose-600 shrink-0" />
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              setCallingState(null);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ClinicalExportModal = ({ isOpen, onClose, vitalsData }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const reportData = {
      patient: "Anita Sharma",
      patientId: "REJ-8042",
      age: 67,
      gender: "Female",
      location: "Home → Living Room, Junglighat, Port Blair",
      exportedAt: new Date().toISOString(),
      vitals: vitalsData || {
        hr: 85,
        spo2: 97.7,
        bp: "149/97",
        temp: 37.0,
        glucose: 112,
      },
      auditTrailConfidence: "98% (High Clinical Confidence)",
      devices: [
        "Omron HEM-7156T (BP Monitor)",
        "TempTraq Continuous (Temp Sensor)",
        "SanketLife 12-Lead (ECG)",
      ],
      compliance: "DPDP Act 2023 • Ayushman Bharat Digital Mission (ABDM) Compatible",
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Anita_Sharma_Clinical_Telemetry_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Clinical Telemetry Data Export
              </h3>
              <p className="text-[11px] text-slate-400">
                Standardized EHR / Telehealth Interoperability Format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3 text-xs text-slate-600">
          <p>
            Exporting a verifiable cryptographic summary of Anita Sharma's continuous telemetry, vital signs, medication adherence logs, and sensor diagnostics.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 space-y-1">
            <div>• Patient: Anita Sharma (ID: REJ-8042)</div>
            <div>• Vitals: HR 85 bpm | SpO2 97.7% | BP 149/97 mmHg</div>
            <div>• Devices: Omron HEM-7156T, TempTraq, SanketLife</div>
            <div>• Compliance: DPDP Act 2023 • ABDM HL7/FHIR Ready</div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddMedicationModal = ({ isOpen, onClose }) => {
  const [drugName, setDrugName] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [times, setTimes] = React.useState("08:00 AM");
  const [success, setSuccess] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Add Prescribed Medication
              </h3>
              <p className="text-[11px] text-slate-400">
                Patient: Anita Sharma
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-800">
            Medication added successfully to active schedule.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="my-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Drug Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amlodipine"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 5 mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scheduled Time
              </label>
              <input
                type="text"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                Save Medication
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\Modals.jsx ---

// --- START: prototype\public\src\components\LoginModal.jsx ---
// prototype/public/src/components/LoginModal.jsx
// Enterprise Clinical Login & Demo Switcher Modal

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = React.useState("asharma@demo.in");
  const [password, setPassword] = React.useState("demo123");
  const [error, setError] = React.useState(null);

  if (!isOpen) return null;

  const demoAccounts = [
    {
      name: "Anita Sharma",
      role: "Family Caregiver",
      email: "asharma@demo.in",
      tag: "Sharma Family • Junglighat",
      badge: "Primary Patient",
    },
    {
      name: "Ram Prakash",
      role: "Family Caregiver",
      email: "rprakash@demo.in",
      tag: "Prakash Family • Little Andaman",
      badge: "Remote Island",
    },
    {
      name: "GB Pant Ward Nurse",
      role: "Ward Nurse",
      email: "wardnurse@demo.in",
      tag: "GB Pant Hospital • Port Blair",
      badge: "Virtual Ward",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email, password);
      onClose();
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("demo123");
    if (onLogin) {
      onLogin(demoEmail, "demo123");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ReJivan Clinical Portal
              </h3>
              <p className="text-[11px] text-slate-500">
                Enterprise Telehealth &amp; Continuous Monitoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* One-Tap Demo Access Header */}
        <div className="my-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            One-Tap Evaluator Access
          </p>
          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleQuickDemo(acc.email)}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    {acc.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{acc.tag}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800">
                  {acc.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium text-[10px]">
              Or Sign In With Password
            </span>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

// --- END: prototype\public\src\components\LoginModal.jsx ---

// --- START: prototype\public\src\App.jsx ---
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

// --- END: prototype\public\src\App.jsx ---


// Mount React application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

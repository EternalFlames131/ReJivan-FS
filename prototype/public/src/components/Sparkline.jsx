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

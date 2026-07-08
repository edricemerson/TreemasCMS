interface Props {
  coreDrivers: number;     // x: 1–4
  financialHealth: number; // y: 0–100 or 1–4 depending on financialMax
  strategicValue: number;  // label on data point
  financialMax?: number;   // 100 (default) or 4
  pointColor?:string;
}

const PADDING = { left: 45, right: 20, top: 20, bottom: 35 };
const W = 260;
const H = 220;
const PLOT_W = W - PADDING.left - PADDING.right;
const PLOT_H = H - PADDING.top - PADDING.bottom;

// X axis 20–100 (Core Drivers) — X_MIN digeser agar threshold 60 center & proporsional
const X_MIN = 20, X_MAX = 100;
const X_THRESHOLD = 60;

function toPixelX(val: number) {
  return PADDING.left + ((val - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

const thresholdX = toPixelX(X_THRESHOLD);

const quadrantColors = [
  '#7F8BC7', // III kiri-atas   -> kuadran 3
  '#5563AC', // IV kanan-atas   -> kuadran 4 (paling gelap)
  '#D3D8EC', // I kiri-bawah    -> kuadran 1 (paling terang)
  '#A8B1DC', // II kanan-bawah  -> kuadran 2
];
// Warna label per kuadran (III & IV gelap -> teks putih, I & II terang -> teks gelap)
const quadrantTextColors = ['#ffffff', '#ffffff', '#3A4270', '#3A4270'];
const QUADRANT_FILL_OPACITY = 1;


export default function QuadrantChart({ coreDrivers, financialHealth, strategicValue, financialMax = 100, pointColor = '#4472c4' }: Props) {
  const isMax4 = financialMax === 4;

  const Y_MIN = isMax4 ? 1 : 20;
  const Y_MAX = isMax4 ? 4 : 100;
  const Y_THRESHOLD = isMax4 ? 2.5 : 60;
  const yTicks = isMax4 ? [1.0, 1.75, 2.5, 3.25, 4.0] : [20, 60, 100];

  function toPixelY(val: number) {
    return PADDING.top + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * PLOT_H;
  }

  const thresholdY = toPixelY(Y_THRESHOLD);

  const quadrants = [
    { label: 'Kuadran III', x: PADDING.left + 4, y: PADDING.top + 12 },
    { label: 'Kuadran IV', x: thresholdX + 4, y: PADDING.top + 12 },
    { label: 'Kuadran I', x: PADDING.left + 4, y: thresholdY + 12 },
    { label: 'Kuadran II', x: thresholdX + 4, y: thresholdY + 12 },
  ];

  const px = toPixelX(coreDrivers);
  const py = toPixelY(financialHealth);

  // X-axis labels
  const xTicks = [20, 60, 100];

  return (
    <svg width={W} height={H} style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Quadrant backgrounds */}
      {/* III top-left */}
      <rect x={PADDING.left} y={PADDING.top} width={thresholdX - PADDING.left} height={thresholdY - PADDING.top} fill={quadrantColors[0]} fillOpacity={QUADRANT_FILL_OPACITY} />
      {/* IV top-right */}
      <rect x={thresholdX} y={PADDING.top} width={PADDING.left + PLOT_W - thresholdX} height={thresholdY - PADDING.top} fill={quadrantColors[1]} fillOpacity={QUADRANT_FILL_OPACITY} />
      {/* I bottom-left */}
      <rect x={PADDING.left} y={thresholdY} width={thresholdX - PADDING.left} height={PADDING.top + PLOT_H - thresholdY} fill={quadrantColors[2]} fillOpacity={QUADRANT_FILL_OPACITY} />
      {/* II bottom-right */}
       <rect x={thresholdX} y={thresholdY} width={PADDING.left + PLOT_W - thresholdX} height={PADDING.top + PLOT_H - thresholdY} fill={quadrantColors[3]} fillOpacity={QUADRANT_FILL_OPACITY} />

      {/* Axes */}
      <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + PLOT_H} stroke="#999" strokeWidth={1} />
      <line x1={PADDING.left} y1={PADDING.top + PLOT_H} x2={PADDING.left + PLOT_W} y2={PADDING.top + PLOT_H} stroke="#999" strokeWidth={1} />

      {/* Threshold lines */}
      <line x1={thresholdX} y1={PADDING.top} x2={thresholdX} y2={PADDING.top + PLOT_H} stroke="#999" strokeWidth={1} strokeDasharray="4 2" />
      <line x1={PADDING.left} y1={thresholdY} x2={PADDING.left + PLOT_W} y2={thresholdY} stroke="#999" strokeWidth={1} strokeDasharray="4 2" />

      {/* Quadrant labels */}
      {quadrants.map((q, i) => (
        <text key={q.label} x={q.x} y={q.y} fontSize={9} fill={quadrantTextColors[i]}>{q.label}</text>
      ))}

      {/* Y-axis ticks & labels */}
      {yTicks.map((v) => {
        const y = toPixelY(v);
        return (
          <g key={v}>
            <line x1={PADDING.left - 3} y1={y} x2={PADDING.left} y2={y} stroke="#999" strokeWidth={1} />
            <text x={PADDING.left - 5} y={y + 4} fontSize={9} textAnchor="end" fill="#555">{isMax4 ? v.toFixed(1) : v}</text>
          </g>
        );
      })}

      {/* X-axis ticks & labels */}
      {xTicks.map((v) => {
        const x = toPixelX(v);
        return (
          <g key={v}>
            <line x1={x} y1={PADDING.top + PLOT_H} x2={x} y2={PADDING.top + PLOT_H + 3} stroke="#999" strokeWidth={1} />
            <text x={x} y={PADDING.top + PLOT_H + 13} fontSize={9} textAnchor="middle" fill="#555">{v}</text>
          </g>
        );
      })}

      {/* Axis labels */}
      <text x={PADDING.left + PLOT_W / 2} y={H - 2} fontSize={10} textAnchor="middle" fill="#333">Core Drivers</text>
      <text x={10} y={PADDING.top + PLOT_H / 2} fontSize={10} textAnchor="middle" fill="#333" transform={`rotate(-90, 10, ${PADDING.top + PLOT_H / 2})`}>Financial Health</text>

      {/* Data point */}
      <circle cx={px} cy={py} r={12} fill={pointColor} fillOpacity={0.85} />
      <text x={px} y={py + 4} fontSize={10} textAnchor="middle" fill="white" fontWeight="bold">
        {Math.round(strategicValue)}
      </text>
    </svg>
  );
}

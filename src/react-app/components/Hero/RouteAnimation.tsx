import { useEffect, useRef } from 'react';

const POINTS = [
  [80, 60], [200, 40], [320, 90], [280, 180],
  [160, 220], [60, 170], [140, 130], [240, 130],
] as const;

export function RouteAnimation() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const timer = setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 2.5s ease-out';
      path.style.strokeDashoffset = '0';
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const pathData = POINTS.reduce((d, [x, y], i) => {
    return d + (i === 0 ? `M${x},${y}` : ` L${x},${y}`);
  }, '') + ` L${POINTS[0][0]},${POINTS[0][1]}`;

  return (
    <svg viewBox="0 0 400 280" fill="none" style={{ width: '100%', height: '100%' }}>
      {/* Grid lines for map feel */}
      {[70, 140, 210].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#D4CFC4" strokeWidth="0.5" />
      ))}
      {[100, 200, 300].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280" stroke="#D4CFC4" strokeWidth="0.5" />
      ))}

      {/* Route path */}
      <path
        ref={pathRef}
        d={pathData}
        stroke="#E76F51"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Pin markers */}
      {POINTS.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#E76F51" stroke="#1B2D2A" strokeWidth="1.5" />
          <text
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#F0EDE6"
            fontSize="10"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="700"
          >
            {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}
    </svg>
  );
}

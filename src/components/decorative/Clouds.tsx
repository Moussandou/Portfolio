import { cn } from '../../lib/utils';

const CLOUDS = [
  // Row 1 — drifts right to left, slight downward angle (top area)
  { size: 180, top: '6%',   delay: '0s',    duration: '45s', opacity: 0.18, color: '#E5A5C8', row: 1 },
  { size: 120, top: '10%',  delay: '-12s',   duration: '38s', opacity: 0.12, color: '#C48AAE', row: 1 },
  { size: 200, top: '3%',   delay: '-25s',   duration: '52s', opacity: 0.15, color: '#9B6BC2', row: 1 },
  { size: 90,  top: '14%',  delay: '-35s',   duration: '40s', opacity: 0.10, color: '#8D4074', row: 1 },
  { size: 150, top: '8%',   delay: '-8s',    duration: '48s', opacity: 0.13, color: '#6B3FA0', row: 1 },
  { size: 110, top: '18%',  delay: '-20s',   duration: '35s', opacity: 0.09, color: '#F0C4DB', row: 1 },
  // Row 2 — drifts left to right (middle area)
  { size: 170, top: '35%',  delay: '-3s',    duration: '46s', opacity: 0.11, color: '#A85D8E', row: 2 },
  { size: 140, top: '40%',  delay: '-15s',   duration: '42s', opacity: 0.14, color: '#E5A5C8', row: 2 },
  { size: 100, top: '38%',  delay: '-28s',   duration: '50s', opacity: 0.08, color: '#9B6BC2', row: 2 },
  { size: 190, top: '32%',  delay: '-38s',   duration: '55s', opacity: 0.10, color: '#C48AAE', row: 2 },
  // Row 3 — drifts right to left (bottom area)
  { size: 160, top: '60%',  delay: '-5s',    duration: '50s', opacity: 0.14, color: '#8D4074', row: 1 },
  { size: 130, top: '65%',  delay: '-18s',   duration: '42s', opacity: 0.10, color: '#E5A5C8', row: 1 },
  { size: 220, top: '55%',  delay: '-30s',   duration: '55s', opacity: 0.12, color: '#6B3FA0', row: 1 },
  { size: 100, top: '70%',  delay: '-40s',   duration: '36s', opacity: 0.08, color: '#A85D8E', row: 1 },
  { size: 145, top: '58%',  delay: '-22s',   duration: '44s', opacity: 0.11, color: '#F0C4DB', row: 1 },
  // Row 4 — drifts left to right (very bottom)
  { size: 175, top: '82%',  delay: '-10s',   duration: '48s', opacity: 0.13, color: '#9B6BC2', row: 2 },
  { size: 115, top: '88%',  delay: '-32s',   duration: '40s', opacity: 0.09, color: '#8D4074', row: 2 },
  { size: 200, top: '85%',  delay: '-45s',   duration: '53s', opacity: 0.11, color: '#C48AAE', row: 2 },
];

function CloudSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 200 110" fill="none">
      <ellipse cx="68" cy="72" rx="50" ry="32" fill={color} />
      <ellipse cx="120" cy="62" rx="58" ry="38" fill={color} />
      <ellipse cx="160" cy="76" rx="36" ry="26" fill={color} />
      <ellipse cx="95" cy="45" rx="40" ry="30" fill={color} />
      <ellipse cx="140" cy="50" rx="32" ry="24" fill={color} />
      <ellipse cx="50" cy="58" rx="28" ry="20" fill={color} />
    </svg>
  );
}

export function Clouds() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className={cn(
            cloud.row === 1 ? 'cloud-drift-rtl' : 'cloud-drift-ltr'
          )}
          style={{
            position: 'absolute',
            top: cloud.top,
            opacity: cloud.opacity,
            animationDuration: cloud.duration,
            animationDelay: cloud.delay,
            transform: cloud.row === 1 ? 'rotate(-3deg)' : 'rotate(3deg)',
          }}
        >
          <CloudSVG size={cloud.size} color={cloud.color} />
        </div>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import styles from './ArrivalChart.module.css';

/** Each dot's offset in minutes from scheduled time (all within ±5) */
const DOTS = [-3, -1, 0.5, 2, -4, 1, 3.5, -2];

export function ArrivalChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ticks = [-30, -20, -10, 0, 10, 20, 30];

  return (
    <div ref={ref} className={styles.chart}>
      {/* Timeline axis */}
      <div className={styles.axis}>
        {/* ±5 highlight zone */}
        <div
          className={styles.zone}
          style={{
            left: `${((5 + 30) / 60) * 100}%`,
            width: `${(10 / 60) * 100}%`,
          }}
        />

        {/* Tick marks */}
        {ticks.map(t => (
          <div
            key={t}
            className={`${styles.tick} ${t === 0 ? styles.tickCenter : ''}`}
            style={{ left: `${((t + 30) / 60) * 100}%` }}
          >
            <span className={styles.tickLabel}>
              {t === 0 ? '予定' : `${t > 0 ? '+' : ''}${t}`}
            </span>
          </div>
        ))}

        {/* Animated dots */}
        {DOTS.map((offset, i) => (
          <div
            key={i}
            className={`${styles.dot} ${visible ? styles.dotVisible : ''}`}
            style={{
              left: `${((offset + 30) / 60) * 100}%`,
              animationDelay: visible ? `${i * 0.18}s` : undefined,
            }}
          />
        ))}
      </div>

      {/* Zone label */}
      <div className={styles.zoneLabel}>±5分</div>
    </div>
  );
}

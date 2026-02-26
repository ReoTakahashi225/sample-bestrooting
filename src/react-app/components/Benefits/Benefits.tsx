import type { ReactNode } from 'react';
import styles from './Benefits.module.css';
import { ArrivalChart } from './ArrivalChart';

interface Benefit {
  headline: string;
  description: string;
  visual: ReactNode;
}

const BENEFITS: Benefit[] = [
  {
    headline: '到着時間のブレ、±5分以内に。',
    description: '時間枠指定に対応。遅延や早着によるクレームを減らし、顧客満足度を維持する。',
    visual: <ArrivalChart />,
  },
  {
    headline: 'ドライバー別の配車を、3秒で。',
    description: '車両数・積載量・対応エリアを加味した自動割り振り。手作業の配車計画が不要になる。',
    visual: <span className={styles.visualNumber}>3秒</span>,
  },
  {
    headline: '車両の積載率、95%まで引き上げ。',
    description: '荷物サイズと車両容量を考慮し、空きスペースを最小化。車両台数の削減に直結する。',
    visual: <span className={styles.visualNumber}>95%</span>,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>数字で見る、最適化の効果。</h2>
        {BENEFITS.map((b, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.visual}>
              {b.visual}
            </div>
            <div className={styles.text}>
              <h3 className={styles.itemHeadline}>{b.headline}</h3>
              <p className={styles.itemDescription}>{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import styles from './Benefits.module.css';

const BENEFITS = [
  {
    number: '±5分',
    headline: '到着時間のブレ、±5分以内に。',
    description: '時間枠指定に対応。遅延や早着によるクレームを減らし、顧客満足度を維持する。',
  },
  {
    number: '3秒',
    headline: 'ドライバー別の配車を、3秒で。',
    description: '車両数・積載量・対応エリアを加味した自動割り振り。手作業の配車計画が不要になる。',
  },
  {
    number: '95%',
    headline: '車両の積載率、95%まで引き上げ。',
    description: '荷物サイズと車両容量を考慮し、空きスペースを最小化。車両台数の削減に直結する。',
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
              <span className={styles.visualNumber}>{b.number}</span>
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

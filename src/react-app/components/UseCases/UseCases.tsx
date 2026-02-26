import { useState } from 'react';
import styles from './UseCases.module.css';

const CASES = [
  {
    id: 'logistics',
    label: '物流・配送',
    title: '複数拠点からの幹線・ラストワンマイル配送',
    desc: '倉庫から個人宅まで、数百件の配送先を車両ごとに自動振り分け。走行距離の削減がそのまま燃料費削減に直結する。',
    stats: [
      { value: '-28%', label: '走行距離' },
      { value: '-22%', label: '燃料費' },
    ],
    visual: '倉庫 → 最適化 → 各エリア分割配送',
  },
  {
    id: 'ec',
    label: 'EC・通販',
    title: '自社配送の当日・翌日配送ルート',
    desc: '注文締め切り後、配送先リストから即座に最適ルートを算出。時間指定にも対応し、再配達率を低減する。',
    stats: [
      { value: '-35%', label: '配送時間' },
      { value: '98%', label: '時間枠遵守率' },
    ],
    visual: '注文データ → ルート生成 → 時間枠配送',
  },
  {
    id: 'food',
    label: 'フードデリバリー',
    title: 'リアルタイム注文への動的ルート再計算',
    desc: '注文が入るたびにルートを再最適化。温かい料理を最短時間で届けるために、ピックアップ順序も最適化する。',
    stats: [
      { value: '-40%', label: '配達時間' },
      { value: '+15%', label: '1時間あたり配達数' },
    ],
    visual: '店舗ピックアップ → 動的最適化 → 配達',
  },
  {
    id: 'visit',
    label: '訪問サービス',
    title: '訪問介護・営業・メンテナンスの巡回計画',
    desc: '訪問先の時間枠、滞在時間、スタッフのスキルを考慮した巡回ルートを自動生成。移動時間を減らし、訪問件数を増やす。',
    stats: [
      { value: '+20%', label: '1日の訪問件数' },
      { value: '-30%', label: '移動時間' },
    ],
    visual: '訪問先リスト → スケジュール最適化 → 巡回',
  },
];

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CASES[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>業種別の活用。</h2>
        <div className={styles.tabs}>
          {CASES.map((c, i) => (
            <button
              key={c.id}
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className={styles.content}>
          <div>
            <h3 className={styles.contentTitle}>{active.title}</h3>
            <p className={styles.contentDesc}>{active.desc}</p>
            <div className={styles.stats}>
              {active.stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.visual}>{active.visual}</div>
        </div>
      </div>
    </section>
  );
}

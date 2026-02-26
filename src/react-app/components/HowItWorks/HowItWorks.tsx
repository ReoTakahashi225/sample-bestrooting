import styles from './HowItWorks.module.css';

const STEPS = [
  { title: '配送先を登録', desc: 'CSVアップロードまたはAPI連携' },
  { title: '条件を設定', desc: '時間枠・車両数・優先度' },
  { title: 'ルート生成', desc: '数秒で最適ルートを算出' },
  { title: 'ナビ連携', desc: 'Google Maps / カーナビへ出力' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>使い方。</h2>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <div>
                <div className={styles.stepTitle}>{s.title}</div>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

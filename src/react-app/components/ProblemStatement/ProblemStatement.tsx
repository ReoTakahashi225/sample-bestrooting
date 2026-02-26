import styles from './ProblemStatement.module.css';

export function ProblemStatement() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.text}>
          <span className={styles.accent}>10</span>件の配送先。
          ルートの組み合わせは、<span className={styles.accent}>362万</span>通り。
        </p>
        <p className={styles.follow}>
          ベテランドライバーの経験値でも、最適解にはたどり着けない。
          アルゴリズムが、数秒で答えを出す。
        </p>
      </div>
    </section>
  );
}

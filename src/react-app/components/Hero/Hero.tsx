import styles from './Hero.module.css';
import { RouteAnimation } from './RouteAnimation';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            走行距離、<span className={styles.headlineAccent}>30%</span>減。
          </h1>
          <p className={styles.subheadline}>
            配送ルートの自動最適化で、燃料費と時間を同時に削る。
          </p>
          <div className={styles.actions}>
            <a href="#demo" className={styles.primaryBtn}>無料でデモを試す</a>
            <a href="#contact" className={styles.secondaryBtn}>お問い合わせ</a>
          </div>
        </div>
        <div className={styles.mapPreview}>
          <RouteAnimation />
        </div>
      </div>
    </section>
  );
}

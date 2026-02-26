import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Best<span className={styles.logoAccent}>Routing</span>
        </span>
        <nav className={styles.nav}>
          <a href="#demo" className={styles.navLink}>デモ</a>
          <a href="#benefits" className={styles.navLink}>特徴</a>
          <a href="#how-it-works" className={styles.navLink}>使い方</a>
          <a href="#contact" className={styles.ctaButton}>お問い合わせ</a>
        </nav>
      </div>
    </header>
  );
}

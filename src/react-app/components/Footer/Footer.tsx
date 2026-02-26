import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Best<span className={styles.logoAccent}>Routing</span>
        </span>

        {/* Single-line truck illustration */}
        <svg className={styles.truck} width="120" height="40" viewBox="0 0 120 40" fill="none">
          <path
            d="M8 28h8m4 0h24m4 0h8M8 28a6 6 0 1 1 12 0M44 28a6 6 0 1 1 12 0M68 28h18l8-10h12l6 10h0M4 28V12h64v16M68 18h14"
            stroke="#D4CFC4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className={styles.copy}>&copy; 2026 BestRouting</span>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './CTA.module.css';

export function CTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      // silently handle
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>まず、試してみてください。</h2>
        <p className={styles.subtext}>
          導入のご相談・デモのご依頼はこちらから。
        </p>

        {submitted ? (
          <p className={styles.success}>送信しました。担当者よりご連絡いたします。</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>お名前</label>
                <input name="name" className={styles.input} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>会社名</label>
                <input name="company" className={styles.input} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>メールアドレス</label>
              <input name="email" type="email" className={styles.input} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ご相談内容</label>
              <textarea name="message" className={styles.textarea} />
            </div>
            <button type="submit" className={styles.submit}>送信する</button>
          </form>
        )}
      </div>
    </section>
  );
}

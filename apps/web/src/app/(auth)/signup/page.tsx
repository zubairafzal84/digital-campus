import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Create Free Account | Digital Kampus',
  description: 'Create your free Digital Kampus student account. Track grades, find scholarships, join clubs, and discover housing near your campus.',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>DK</div>
          <h1 className={styles.h1}>Get started free</h1>
          <p className={styles.sub}>Join thousands of Canadian students</p>

          <form className={styles.form} action="/api/auth/signup" method="POST">
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="first" className={styles.label}>First name</label>
                <input
                  id="first"
                  type="text"
                  name="first_name"
                  autoComplete="given-name"
                  required
                  placeholder="Alex"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="last" className={styles.label}>Last name</label>
                <input
                  id="last"
                  type="text"
                  name="last_name"
                  autoComplete="family-name"
                  required
                  placeholder="Martin"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>School email</label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@school.ca"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="school" className={styles.label}>Your school</label>
              <input
                id="school"
                type="text"
                name="school"
                list="school-list"
                required
                placeholder="Start typing your school…"
                className={styles.input}
              />
              <datalist id="school-list">
                <option value="University of British Columbia" />
                <option value="Simon Fraser University" />
                <option value="University of Toronto" />
                <option value="McGill University" />
                <option value="University of Alberta" />
                <option value="Carleton University" />
                <option value="University of Ottawa" />
              </datalist>
            </div>
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="8+ characters"
                className={styles.input}
              />
            </div>
            <p className={styles.legal}>
              By creating an account you agree to our{' '}
              <Link href="/terms" className={styles.legalLink}>Terms</Link> and{' '}
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>.
              Scholarship matching is always free.
            </p>
            <button type="submit" className={styles.submit}>Create free account</button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          <button className={styles.oauthBtn} type="button">
            <span className={styles.oauthIcon}>G</span>
            Continue with Google
          </button>

          <p className={styles.switchLink}>
            Already have an account?{' '}
            <Link href="/login" className={styles.switchA}>Sign in →</Link>
          </p>
        </div>
      </main>
    </>
  )
}

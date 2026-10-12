import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Sign In | Digital Kampus',
  description: 'Sign in to your Digital Kampus student account.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>DK</div>
          <h1 className={styles.h1}>Welcome back</h1>
          <p className={styles.sub}>Sign in to your student account</p>

          <form className={styles.form} action="/api/auth/login" method="POST">
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
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
              <label htmlFor="password" className={styles.label}>
                Password
                <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submit}>Sign in</button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          <button className={styles.oauthBtn} type="button">
            <span className={styles.oauthIcon}>G</span>
            Continue with Google
          </button>

          <p className={styles.switchLink}>
            Don't have an account?{' '}
            <Link href="/signup" className={styles.switchA}>Create one free →</Link>
          </p>
        </div>
      </main>
    </>
  )
}

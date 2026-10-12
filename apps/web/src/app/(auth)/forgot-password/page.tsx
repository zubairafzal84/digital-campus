import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Reset Password | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return <ForgotPasswordInner searchParamsPromise={searchParams} />
}

async function ForgotPasswordInner({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ error?: string }>
}) {
  const sp = await searchParamsPromise
  const error = sp.error

  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>DK</div>
          <h1 className={styles.h1}>Reset your password</h1>
          <p className={styles.sub}>Enter your email and we'll send a reset link.</p>

          {error === 'missing_email' && (
            <div className={styles.errorBanner}>Please enter your email address.</div>
          )}

          <form className={styles.form} action="/api/auth/forgot-password" method="POST">
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
            <button type="submit" className={styles.submit}>Send reset link</button>
          </form>

          <p className={styles.switchLink}>
            Remember it?{' '}
            <Link href="/login" className={styles.switchA}>Back to sign in</Link>
          </p>
        </div>
      </main>
    </>
  )
}

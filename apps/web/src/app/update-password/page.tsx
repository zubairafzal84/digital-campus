import type { Metadata } from 'next'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../(auth)/auth.module.css'

export const metadata: Metadata = {
  title: 'Set New Password | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return <UpdatePasswordInner searchParamsPromise={searchParams} />
}

const ERROR_COPY: Record<string, string> = {
  too_short: 'Password must be at least 8 characters.',
  mismatch: 'Passwords do not match.',
  update_failed: 'Something went wrong. The link may have expired — try resetting again.',
}

async function UpdatePasswordInner({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ error?: string }>
}) {
  const sp = await searchParamsPromise
  const errorMsg = sp.error ? (ERROR_COPY[sp.error] ?? 'Something went wrong.') : null

  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>🔑</div>
          <h1 className={styles.h1}>Set new password</h1>
          <p className={styles.sub}>Choose a strong password for your account.</p>

          {errorMsg && <div className={styles.errorBanner}>{errorMsg}</div>}

          <form className={styles.form} action="/api/auth/update-password" method="POST">
            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>New password</label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password2" className={styles.label}>Confirm password</label>
              <input
                id="password2"
                type="password"
                name="password2"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Repeat password"
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.submit}>Update password</button>
          </form>
        </div>
      </main>
    </>
  )
}

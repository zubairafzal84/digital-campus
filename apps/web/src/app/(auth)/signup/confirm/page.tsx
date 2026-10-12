import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../../auth.module.css'

export const metadata: Metadata = {
  title: 'Confirm Your Email | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function SignupConfirmPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>📬</div>
          <h1 className={styles.h1}>Check your inbox</h1>
          <p className={styles.sub} style={{ marginBottom: 28 }}>
            We sent a confirmation link to your email address. Click it to activate your account.
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Didn't get it? Check your spam folder, or{' '}
            <Link href="/signup" style={{ color: 'var(--purple)', fontWeight: 600 }}>
              try a different email →
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

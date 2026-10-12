import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../../auth.module.css'

export const metadata: Metadata = {
  title: 'Check Your Email | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordConfirmPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>📧</div>
          <h1 className={styles.h1}>Check your email</h1>
          <p className={styles.sub}>
            If an account exists for that address, we've sent a password reset link.
            It expires in 1 hour.
          </p>
          <p className={styles.switchLink} style={{ marginTop: 24 }}>
            <Link href="/login" className={styles.switchA}>Back to sign in</Link>
          </p>
        </div>
      </main>
    </>
  )
}

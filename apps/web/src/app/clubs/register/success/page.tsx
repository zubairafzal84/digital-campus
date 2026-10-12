import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../register.module.css'

export const metadata: Metadata = {
  title: 'Club Submitted | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function RegisterClubSuccessPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>Submission received</span>
            <h1 className={styles.h1}>Your club has been submitted</h1>
            <p className={styles.lead}>
              We'll review your submission and get back to you within 2 business days.
              Once approved, your club will appear in the Digital Kampus directory.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formWrap} style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 className={styles.formH}>What happens next?</h2>
            <ol style={{ textAlign: 'left', maxWidth: 420, margin: '24px auto', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: 'var(--fg)', lineHeight: 1.6 }}>
              <li>Our team reviews your submission (within 2 business days).</li>
              <li>We may email you to verify your school email or clarify details.</li>
              <li>Once approved, your club listing goes live on Digital Kampus.</li>
            </ol>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
              <Link href="/clubs" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
                Browse clubs
              </Link>
              <Link href="/" style={{ fontSize: 14, color: 'var(--purple)', fontWeight: 700, alignSelf: 'center', textDecoration: 'none' }}>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

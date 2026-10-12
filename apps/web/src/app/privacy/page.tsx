import type { Metadata } from 'next'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../terms/legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Kampus',
  description: 'How Digital Kampus collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy', languages: { 'en-CA': '/privacy', 'fr-CA': '/fr/confidentialite' } },
}

const LAST_UPDATED = 'October 12, 2026'

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.h1}>Privacy Policy</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED} · Applies to: digitalkampus.ca and the Digital Kampus mobile app</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.h2}>1. Who we are</h2>
            <p>Digital Kampus is a Canadian student-life platform operated by Digital Kampus Inc. ("<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>"). We are subject to Canada's <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable provincial privacy legislation.</p>
            <p>Our privacy officer can be reached at <a href="mailto:privacy@digitalkampus.ca" className={styles.link}>privacy@digitalkampus.ca</a>.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>2. Information we collect</h2>
            <h3 className={styles.h3}>Information you give us</h3>
            <ul className={styles.list}>
              <li>Account registration: name, email address, institution, and password (stored as a salted hash, never plaintext).</li>
              <li>Profile information: programme, year of study, and optional profile photo.</li>
              <li>Messages and contact requests you send to other students.</li>
              <li>Forms you submit (club registration, partner enquiries).</li>
            </ul>
            <h3 className={styles.h3}>Information we collect automatically</h3>
            <ul className={styles.list}>
              <li>Log data: IP address, browser type, pages visited, and timestamps.</li>
              <li>Device information: device type and operating system (mobile app only).</li>
              <li>Cookies and similar technologies (see Section 6).</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>3. How we use your information</h2>
            <p>We use your information to:</p>
            <ul className={styles.list}>
              <li>Provide and improve the Digital Kampus platform.</li>
              <li>Verify your student status with your institution email.</li>
              <li>Match you with scholarships, bursaries, and grants — always free to you.</li>
              <li>Facilitate contact requests and messages between students who have connected.</li>
              <li>Send transactional emails (email verification, deadline reminders) and, with your consent, product updates.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>We do <strong>not</strong> sell your personal information. We do not use your information for advertising profiling without your explicit consent.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>4. Student profile privacy</h2>
            <p>Your student profile is <strong>private by default</strong>. It is never indexed by search engines. Access is enforced server-side through Row Level Security policies in our database — a "noindex" tag alone is not sufficient, and we protect profiles at the data layer.</p>
            <p>You control who can see your profile through your privacy settings. Only students you have connected with can send you direct messages.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>5. Sharing with third parties</h2>
            <p>We share your information with:</p>
            <ul className={styles.list}>
              <li><strong>Supabase</strong> — our database and authentication provider (data hosted in Canada or the US with adequate safeguards).</li>
              <li><strong>Vercel</strong> — our hosting provider.</li>
              <li>Service providers who process data on our behalf under confidentiality agreements.</li>
              <li>Authorities when required by law.</li>
            </ul>
            <p>We do not share your information with scholarship providers, employers, landlords, or merchants without your explicit action (e.g., clicking "Apply").</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>6. Cookies</h2>
            <p>We use strictly necessary cookies to maintain your session and a CSRF token. We do not use third-party advertising cookies. Analytics, if used, are privacy-preserving and you will be notified.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>7. Data retention</h2>
            <p>We retain your account data for as long as your account is active. You may delete your account at any time from your profile settings. On deletion, your personal data is purged within 30 days, except where retention is required by law.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>8. Your rights</h2>
            <p>Under PIPEDA and applicable provincial law, you have the right to:</p>
            <ul className={styles.list}>
              <li>Access the personal information we hold about you.</li>
              <li>Correct inaccurate information.</li>
              <li>Withdraw consent, subject to legal or contractual restrictions.</li>
              <li>Request deletion of your account and personal data.</li>
              <li>File a complaint with the Office of the Privacy Commissioner of Canada.</li>
            </ul>
            <p>To exercise these rights, contact <a href="mailto:privacy@digitalkampus.ca" className={styles.link}>privacy@digitalkampus.ca</a>.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>9. Changes to this policy</h2>
            <p>We will notify you of material changes by email or an in-app notice at least 14 days before they take effect. Continued use after that date constitutes acceptance.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

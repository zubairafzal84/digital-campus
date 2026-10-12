import type { Metadata } from 'next'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './legal.module.css'

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Kampus',
  description: 'Terms and conditions for using the Digital Kampus student platform.',
  alternates: { canonical: '/terms', languages: { 'en-CA': '/terms', 'fr-CA': '/fr/conditions' } },
}

const LAST_UPDATED = 'October 12, 2026'

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1 className={styles.h1}>Terms of Service</h1>
            <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.h2}>1. Acceptance</h2>
            <p>By creating an account or using Digital Kampus ("<strong>the Service</strong>"), you agree to these Terms. If you do not agree, do not use the Service. These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>2. Eligibility</h2>
            <p>You must be a current student, staff member, or alumni of a Canadian post-secondary institution to register an account. High school features are disabled at the platform level. By registering, you confirm you meet this requirement.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>3. Your account</h2>
            <ul className={styles.list}>
              <li>You are responsible for maintaining the confidentiality of your password.</li>
              <li>You must provide accurate information. Impersonating another person or institution is prohibited.</li>
              <li>You may not share your account or create accounts on behalf of others.</li>
              <li>Notify us immediately at <a href="mailto:support@digitalkampus.ca" className={styles.link}>support@digitalkampus.ca</a> if you suspect unauthorized access.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className={styles.list}>
              <li>Harass, bully, or threaten other users.</li>
              <li>Post false, defamatory, or misleading content.</li>
              <li>Scrape, crawl, or collect data from the Service without our written permission.</li>
              <li>Attempt to gain unauthorized access to any part of the Service.</li>
              <li>Use the Service to send unsolicited commercial messages.</li>
              <li>Post or transmit content that infringes third-party intellectual property rights.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>5. Messaging and contact requests</h2>
            <p>Direct 1-to-1 messaging between students requires an accepted contact request from both parties. We enforce this at the database level. You may not attempt to circumvent this requirement.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>6. Scholarships and financial aid</h2>
            <p>Digital Kampus scholarship matching is always <strong>free for students</strong>. We will never charge you to view, match, or apply for scholarships, bursaries, grants, or other financial aid listed on the platform. Any service that claims to be Digital Kampus and charges for scholarship access is fraudulent.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>7. Intellectual property</h2>
            <p>The Digital Kampus name, logo, and platform design are our intellectual property. Content you post remains yours; you grant us a non-exclusive licence to display it within the Service.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>8. Disclaimer and limitation of liability</h2>
            <p>The Service is provided "as is." School and scholarship data is for informational purposes only — always verify with the institution or awarding body. To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>9. Termination</h2>
            <p>We may suspend or terminate your account for material violations of these Terms. You may delete your account at any time from your profile settings.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>10. Changes</h2>
            <p>We will notify you of material changes by email at least 14 days before they take effect. Continued use constitutes acceptance.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>11. Contact</h2>
            <p>Questions about these Terms? Email <a href="mailto:legal@digitalkampus.ca" className={styles.link}>legal@digitalkampus.ca</a>.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

import type { Metadata } from 'next'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import ClubRegisterForm from './ClubRegisterForm'
import styles from './register.module.css'

export const metadata: Metadata = {
  title: 'Register Your Club | Digital Kampus',
  description: 'List your campus club or student organization on Digital Kampus to reach thousands of students at your school.',
  robots: { index: true, follow: true },
}

export default function RegisterClubPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>For club organizers</span>
            <h1 className={styles.h1}>Register your club</h1>
            <p className={styles.lead}>List your organization and reach students at your school who are looking to get involved.</p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formWrap}>
            <ClubRegisterForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

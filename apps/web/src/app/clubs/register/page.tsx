import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
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
            <form className={styles.form} action="/api/clubs/register" method="POST">
              <h2 className={styles.formH}>Club details</h2>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="clubName">Club / organization name <span aria-hidden>*</span></label>
                <input id="clubName" name="clubName" type="text" required className={styles.input} placeholder="e.g. UBC Robotics Club" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="school">School <span aria-hidden>*</span></label>
                <input id="school" name="school" type="text" required className={styles.input} list="schools-list" placeholder="Start typing your school…" />
                <datalist id="schools-list">
                  <option value="University of British Columbia" />
                  <option value="Simon Fraser University" />
                  <option value="University of Toronto" />
                  <option value="McGill University" />
                  <option value="University of Waterloo" />
                </datalist>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="category">Category <span aria-hidden>*</span></label>
                  <select id="category" name="category" required className={styles.input}>
                    <option value="">Select one…</option>
                    <option>Academic</option>
                    <option>Arts & Culture</option>
                    <option>Athletics & Fitness</option>
                    <option>Community & Volunteering</option>
                    <option>Cultural & International</option>
                    <option>Environmental</option>
                    <option>Professional & Career</option>
                    <option>Social & Networking</option>
                    <option>Technology & Engineering</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="members">Current members</label>
                  <input id="members" name="members" type="number" min="1" className={styles.input} placeholder="e.g. 45" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="description">Description <span aria-hidden>*</span></label>
                <textarea id="description" name="description" required rows={4} className={styles.textarea}
                  placeholder="Tell students what your club does, who it's for, and what they'll get out of joining." />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="meetSchedule">Meeting schedule</label>
                <input id="meetSchedule" name="meetSchedule" type="text" className={styles.input} placeholder="e.g. Every Tuesday at 6 PM in ICCS 246" />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="website">Club website or social link</label>
                <input id="website" name="website" type="url" className={styles.input} placeholder="https://…" />
              </div>

              <h2 className={styles.formH} style={{ marginTop: 12 }}>Your contact information</h2>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contactName">Your name <span aria-hidden>*</span></label>
                  <input id="contactName" name="contactName" type="text" required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contactEmail">School email <span aria-hidden>*</span></label>
                  <input id="contactEmail" name="contactEmail" type="email" required className={styles.input} placeholder="you@student.yourschool.ca" />
                </div>
              </div>

              <div className={styles.checkField}>
                <input id="terms" name="terms" type="checkbox" required className={styles.check} />
                <label htmlFor="terms" className={styles.checkLabel}>
                  I confirm this is an official or recognized club at my institution. I agree to the{' '}
                  <Link href="/terms" className={styles.link}>Terms of Service</Link>.
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>Submit for review</button>
              <p className={styles.note}>We typically review submissions within 2 business days.</p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

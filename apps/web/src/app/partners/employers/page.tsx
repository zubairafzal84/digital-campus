import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../partners.module.css'

export const metadata: Metadata = {
  title: 'Hire Students | Digital Kampus',
  description: 'Post jobs and internships to verified Canadian college and university students. Reach the next generation of talent on Digital Kampus.',
}

const BENEFITS = [
  { icon: '🎓', title: 'Verified student talent', body: 'Every candidate is a verified, active student at a Canadian post-secondary institution.' },
  { icon: '🔍', title: 'Smart targeting', body: 'Target by school, programme, year of study, and province. Reach the students most relevant to you.' },
  { icon: '📋', title: 'Co-op & internship ready', body: 'Students on Digital Kampus are actively seeking co-ops, internships, and part-time positions.' },
  { icon: '🇨🇦', title: 'Across Canada', body: 'Reach students at over 100 Canadian colleges and universities from coast to coast.' },
]

export default function EmployersPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>For employers & recruiters</span>
            <h1 className={styles.h1}>Hire Canada's next generation of talent</h1>
            <p className={styles.lead}>Post jobs and internships directly to verified students at Canadian colleges and universities.</p>
            <Link href="#employer-form" className={styles.cta}>Post a job</Link>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsInner}>
            <h2 className={styles.sectionH}>Why recruit on Digital Kampus?</h2>
            <div className={styles.benefitGrid}>
              {BENEFITS.map(b => (
                <div key={b.title} className={styles.benefitCard}>
                  <span className={styles.benefitIcon}>{b.icon}</span>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitBody}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.formSection} id="employer-form">
          <div className={styles.formWrap}>
            <h2 className={styles.formH}>Get early access</h2>
            <p className={styles.formSub}>Employer job board features are coming soon. Register your company to get notified and secure early-access pricing.</p>
            <form className={styles.form} action="/api/partners/employers" method="POST">
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contactName">Your name</label>
                  <input id="contactName" name="contactName" type="text" required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" required className={styles.input} />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="company">Company name</label>
                  <input id="company" name="company" type="text" required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="size">Company size</label>
                  <select id="size" name="size" className={styles.input}>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-1000">201–1,000</option>
                    <option value="1000+">1,000+</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="roles">Types of roles you hire for</label>
                <input id="roles" name="roles" type="text" className={styles.input} placeholder="e.g. Software engineering, data science, marketing" />
              </div>
              <button type="submit" className={styles.submitBtn}>Register interest</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../partners.module.css'

export const metadata: Metadata = {
  title: 'List Your Rental | Digital Kampus',
  description: 'Reach verified student tenants at Canadian universities. List your rental on Digital Kampus for free.',
  openGraph: { title: 'List Your Rental | Digital Kampus', description: 'Reach verified student tenants near top Canadian campuses.' },
}

const BENEFITS = [
  { icon: '🎓', title: 'Verified student tenants', body: 'Every student on Digital Kampus is verified through their institution email, so you know who you\'re renting to.' },
  { icon: '📍', title: 'Campus-proximity search', body: 'Students filter by walking distance to their campus. Your listing appears when they search nearby.' },
  { icon: '💬', title: 'Direct messaging', body: 'Once a student sends a contact request and you accept, you can coordinate viewings in-app.' },
  { icon: '🆓', title: 'Free to list', body: 'Listing your rental is completely free. We\'re building the infrastructure for student housing in Canada.' },
]

export default function LandlordsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>For landlords & property managers</span>
            <h1 className={styles.h1}>List your rental, reach student tenants</h1>
            <p className={styles.lead}>Free listings, verified students, direct messaging — all in one place.</p>
            <Link href="#list-form" className={styles.cta}>List your property</Link>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsInner}>
            <h2 className={styles.sectionH}>Why list on Digital Kampus?</h2>
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

        <section className={styles.formSection} id="list-form">
          <div className={styles.formWrap}>
            <h2 className={styles.formH}>Register your interest</h2>
            <p className={styles.formSub}>We're rolling out landlord accounts across Canada. Leave your info and we'll reach out when listings go live in your area.</p>
            <form className={styles.form} action="/api/partners/landlords" method="POST">
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required className={styles.input} />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="city">City</label>
                <input id="city" name="city" type="text" required className={styles.input} placeholder="e.g. Vancouver, BC" />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="units">Number of units</label>
                <select id="units" name="units" className={styles.input}>
                  <option value="1">1 unit</option>
                  <option value="2-5">2–5 units</option>
                  <option value="6-20">6–20 units</option>
                  <option value="20+">20+ units</option>
                </select>
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

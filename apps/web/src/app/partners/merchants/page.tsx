import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../partners.module.css'

export const metadata: Metadata = {
  title: 'Student Discounts | Partner with Digital Kampus',
  description: 'Offer student discounts to thousands of verified Canadian post-secondary students on Digital Kampus.',
}

const BENEFITS = [
  { icon: '🛒', title: 'Reach student buyers', body: 'Canadian students spend billions annually on textbooks, food, tech, and entertainment. Reach them where they plan campus life.' },
  { icon: '✅', title: 'Verified students only', body: 'Every student is verified through their institution. No fake accounts, no public coupon leaks.' },
  { icon: '📊', title: 'Redemption analytics', body: 'See how many students viewed and redeemed your offer, by campus and by date.' },
  { icon: '🏷️', title: 'Student-exclusive pricing', body: 'Offer student-only prices. Discounts are only visible to authenticated, verified students.' },
]

export default function MerchantsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>For businesses & merchants</span>
            <h1 className={styles.h1}>Offer student discounts, build campus loyalty</h1>
            <p className={styles.lead}>Student-exclusive deals visible only to verified Canadian post-secondary students.</p>
            <Link href="#merchant-form" className={styles.cta}>Become a partner</Link>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsInner}>
            <h2 className={styles.sectionH}>Why partner with Digital Kampus?</h2>
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

        <section className={styles.formSection} id="merchant-form">
          <div className={styles.formWrap}>
            <h2 className={styles.formH}>Apply to become a partner</h2>
            <p className={styles.formSub}>Tell us about your business and the offer you'd like to make to students.</p>
            <form className={styles.form} action="/api/partners/merchants" method="POST">
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bizName">Business name</label>
                  <input id="bizName" name="bizName" type="text" required className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Contact email</label>
                  <input id="email" name="email" type="email" required className={styles.input} />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="category">Business category</label>
                <select id="category" name="category" className={styles.input}>
                  <option>Food & Beverage</option>
                  <option>Technology & Software</option>
                  <option>Books & Supplies</option>
                  <option>Fitness & Wellness</option>
                  <option>Fashion & Apparel</option>
                  <option>Entertainment</option>
                  <option>Financial Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="offer">Proposed student offer</label>
                <input id="offer" name="offer" type="text" className={styles.input} placeholder="e.g. 20% off for verified students" />
              </div>
              <button type="submit" className={styles.submitBtn}>Submit application</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

import Link from 'next/link'
import { DashboardPreview } from './DashboardPreview'
import styles from './Hero.module.css'

const CHIPS = [
  { icon: '📖', label: 'Academics' },
  { icon: '🤝', label: 'Community' },
  { icon: '💸', label: 'Funding' },
  { icon: '🏠', label: 'Housing' },
  { icon: '🛍', label: 'Deals' },
]

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.left}>
        <div className={styles.tag} aria-label="Made for Canada">
          🍁 Built for Canadian students · EN&nbsp;/&nbsp;FR
        </div>

        <h1 className={styles.h1}>
          Your campus.<br />
          <span className={styles.hi}>All of it.</span>
        </h1>

        <p className={styles.p}>
          Study, connect, find housing, and grab deals — free for Canadian students.
        </p>

        <form
          action="/schools"
          method="GET"
          role="search"
          className={styles.search}
          aria-label="Find your school"
        >
          <input
            name="q"
            type="search"
            placeholder="Find your school or programme…"
            aria-label="Search schools and programmes"
            autoComplete="off"
          />
          <button type="submit" aria-label="Search">
            Search
          </button>
        </form>

        <div className={styles.chips} aria-label="Platform features">
          {CHIPS.map(({ icon, label }) => (
            <span key={label} className={styles.chip}>
              {icon} {label}
            </span>
          ))}
        </div>

        <div className={styles.ctas}>
          <Link href="/signup" className={styles.ctaPrimary}>
            Get started free
          </Link>
          <Link href="/schools" className={styles.ctaSecondary}>
            Browse schools →
          </Link>
        </div>
      </div>

      <div className={styles.right} aria-hidden="true">
        <DashboardPreview />
      </div>
    </section>
  )
}

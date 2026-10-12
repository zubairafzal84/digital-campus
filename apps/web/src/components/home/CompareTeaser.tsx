import Link from 'next/link'
import styles from './CompareTeaser.module.css'

const POPULAR = [
  { label: 'UBC vs SFU', href: '/compare/ubc-vs-sfu' },
  { label: 'McGill vs UofT', href: '/compare/mcgill-vs-uoft' },
  { label: 'Best CS schools in Canada', href: '/compare/computer-science-canada' },
  { label: 'Engineering in Ontario', href: '/compare/engineering-ontario' },
  { label: 'Quebec universities', href: '/schools?province=QC' },
]

export function CompareTeaser() {
  return (
    <section className={styles.section} aria-labelledby="compare-h">
      <div className={styles.inner}>
        <p className={styles.tag}>Compare schools</p>
        <h2 className={styles.h2} id="compare-h">
          UBC vs SFU vs UofT.<br />See the real difference.
        </h2>
        <p className={styles.sub}>
          Compare tuition, programmes, acceptance rates, campus life, and scholarships side by side — for free.
        </p>
        <ul className={styles.chips} role="list">
          {POPULAR.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={styles.chip}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/compare" className={styles.cta}>
          Compare schools →
        </Link>
      </div>
    </section>
  )
}

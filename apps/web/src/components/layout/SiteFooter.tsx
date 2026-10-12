import Link from 'next/link'
import Image from 'next/image'
import styles from './SiteFooter.module.css'

const COLS = [
  {
    title: 'Students',
    links: [
      { label: 'Grade Tracker', href: '/dashboard/grades' },
      { label: 'Clubs & Events', href: '/clubs' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Housing', href: '/housing' },
      { label: 'Student Deals', href: '/deals' },
      { label: 'Study Groups', href: '/study-groups' },
      { label: 'Student Profiles', href: '/students' },
      { label: 'Rate Professors', href: '/professors' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Schools', href: '/schools' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Compare', href: '/compare' },
      { label: 'Cities', href: '/schools?view=city' },
      { label: 'Provinces', href: '/schools?view=province' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Institutions', href: '/schools' },
      { label: 'Merchants', href: '/partners/merchants' },
      { label: 'Landlords', href: '/partners/landlords' },
      { label: 'Employers', href: '/partners/employers' },
      { label: 'Clubs', href: '/clubs/register' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Accessibility', href: '/about' },
      { label: 'Contact', href: '/about' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src="/brand/digital-kampus-logo-horizontal-trimmed.png"
              alt="Digital Kampus"
              width={200}
              height={48}
              className={styles.logo}
            />
            <p className={styles.tagline}>
              Canada's student-life platform.<br />
              Free for students, in English and French.
            </p>
          </div>
          {COLS.map(({ title, links }) => (
            <div key={title} className={styles.col}>
              <h3 className={styles.colTitle}>{title}</h3>
              <ul className={styles.colLinks}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={styles.colLink}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span className={styles.legal}>
            © 2026 Digital Kampus. Canada.
            <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms</Link>
            <Link href="/accessibility" className={styles.legalLink}>Accessibility</Link>
          </span>
          <button className={styles.langToggle} aria-label="Switch to French">
            🇨🇦 Français
          </button>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import styles from './SiteNav.module.css'

const NAV_LINKS = [
  { href: '/schools', label: 'Schools', labelFr: 'Établissements' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/compare', label: 'Compare', labelFr: 'Comparer' },
  { href: '/scholarships', label: 'Scholarships', labelFr: 'Bourses' },
  { href: '/housing', label: 'Housing', labelFr: 'Logement' },
  { href: '/student-life', label: 'Student Life', labelFr: 'Vie étudiante' },
]

export function SiteNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logoLink} aria-label="Digital Kampus — home">
          <Image
            src="/brand/digital-kampus-logo-horizontal-trimmed.png"
            alt="Digital Kampus"
            width={220}
            height={52}
            priority
            className={styles.logo}
          />
        </Link>

        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.ctas}>
          <button className={styles.lang} aria-label="Switch to French">
            FR
          </button>
          <Link href="/login" className={styles.ghost}>
            Sign in
          </Link>
          <Link href="/signup" className={styles.solid}>
            Get started
          </Link>
        </div>
      </nav>
    </header>
  )
}

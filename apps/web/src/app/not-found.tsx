import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './not-found.module.css'

const NAV_LINKS = [
  { label: 'Schools', href: '/schools', desc: 'Browse Canadian institutions' },
  { label: 'Scholarships', href: '/scholarships', desc: 'Find funding for your studies' },
  { label: 'Clubs', href: '/clubs', desc: 'Discover student organisations' },
  { label: 'Housing', href: '/housing', desc: 'Find student-friendly rentals' },
  { label: 'Students', href: '/students', desc: 'Connect with peers at your school' },
  { label: 'Compare', href: '/compare', desc: 'Side-by-side school comparisons' },
]

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.inner}>
          <span className={styles.code}>404</span>
          <h1 className={styles.h1}>Page not found</h1>
          <p className={styles.body}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>Back to home</Link>
            <Link href="/schools" className={styles.secondary}>Browse schools</Link>
          </div>
          <nav className={styles.navGrid} aria-label="Helpful links">
            {NAV_LINKS.map(({ label, href, desc }) => (
              <Link key={href} href={href} className={styles.navCard}>
                <span className={styles.navLabel}>{label}</span>
                <span className={styles.navDesc}>{desc}</span>
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  )
}

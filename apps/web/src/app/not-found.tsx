import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <div className={styles.inner}>
          <span className={styles.code}>404</span>
          <h1 className={styles.h1}>Page not found</h1>
          <p className={styles.body}>The page you're looking for doesn't exist or has been moved.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>Back to home</Link>
            <Link href="/schools" className={styles.secondary}>Browse schools</Link>
          </div>
        </div>
      </main>
    </>
  )
}

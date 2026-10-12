'use client'

import Link from 'next/link'
import styles from './not-found.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code} style={{ fontSize: '72px', color: '#fca5a5' }}>Oops</span>
        <h1 className={styles.h1}>Something went wrong</h1>
        <p className={styles.body}>An unexpected error occurred. Please try again or go back home.</p>
        {error.digest && (
          <p style={{ fontSize: '12px', color: 'var(--faint)', marginBottom: '20px' }}>
            Error ID: {error.digest}
          </p>
        )}
        <div className={styles.actions}>
          <button onClick={reset} className={styles.primary}>Try again</button>
          <Link href="/" className={styles.secondary}>Back to home</Link>
        </div>
      </div>
    </main>
  )
}

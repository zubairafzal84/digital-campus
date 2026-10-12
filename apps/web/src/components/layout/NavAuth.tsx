'use client'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import styles from './SiteNav.module.css'

export function NavAuth() {
  return (
    <>
      <SignedOut>
        <Link href="/login" className={styles.ghost}>Sign in</Link>
        <Link href="/signup" className={styles.solid}>Get started</Link>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" className={styles.ghost}>Dashboard</Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}

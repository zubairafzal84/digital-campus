import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Sign In | Digital Kampus',
  description: 'Sign in to your Digital Kampus student account.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <SignIn
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: '#6B3EF2',
              colorBackground: '#ffffff',
              borderRadius: '12px',
              fontFamily: 'inherit',
            },
            elements: {
              card: styles.clerkCard,
              rootBox: styles.clerkRoot,
            },
          }}
        />
      </main>
    </>
  )
}

import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from '../auth.module.css'

export const metadata: Metadata = {
  title: 'Create Account | Digital Kampus',
  description: 'Create a free Digital Kampus student account.',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        <SignUp
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

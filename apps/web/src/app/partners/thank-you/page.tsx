import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from '../partners.module.css'

export const metadata: Metadata = {
  title: 'Thank You | Digital Kampus',
  robots: { index: false, follow: false },
}

const COPY: Record<string, { heading: string; body: string }> = {
  landlord: {
    heading: "We've got your listing interest",
    body: "We're rolling out landlord accounts across Canada. You'll hear from us when listings go live in your area — usually within a few weeks.",
  },
  employer: {
    heading: "Early access registered",
    body: "Employer job board features are coming soon. We'll reach out to set up your company account before the public launch.",
  },
  merchant: {
    heading: "Partner application received",
    body: "Our team reviews merchant applications within 5 business days. If your offer is a good fit we'll be in touch to get your student discount live.",
  },
}

export default function PartnerThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  return (
    <ThankYouInner searchParamsPromise={searchParams} />
  )
}

async function ThankYouInner({ searchParamsPromise }: { searchParamsPromise: Promise<{ type?: string }> }) {
  const sp = await searchParamsPromise
  const type = sp.type ?? 'landlord'
  const { heading, body } = COPY[type] ?? COPY.landlord

  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>You're on the list</span>
            <h1 className={styles.h1}>{heading}</h1>
            <p className={styles.lead}>{body}</p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formWrap} style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
            <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 400, margin: '0 auto 32px' }}>
              In the meantime, explore what Digital Kampus has to offer students.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/schools" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
                Browse schools
              </Link>
              <Link href="/" style={{ fontSize: 14, color: 'var(--purple)', fontWeight: 700, alignSelf: 'center', textDecoration: 'none' }}>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

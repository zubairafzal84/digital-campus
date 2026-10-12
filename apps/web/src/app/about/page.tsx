import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { JsonLd } from '@/components/seo/JsonLd'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Digital Kampus | Canadian Student Life Platform',
  description: 'Digital Kampus is a Canadian student-life platform connecting students at colleges and universities across Canada. Built in Canada for Canadian students.',
  alternates: {
    canonical: 'https://digitalkampus.ca/about',
    languages: { 'en-CA': 'https://digitalkampus.ca/about', 'fr-CA': 'https://digitalkampus.ca/fr/a-propos' },
  },
}

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digital Kampus',
  url: 'https://digitalkampus.ca',
  logo: 'https://digitalkampus.ca/logo.svg',
  foundingDate: '2024',
  foundingLocation: { '@type': 'Place', addressCountry: 'CA' },
  description: 'Digital Kampus is a bilingual Canadian student-life platform for post-secondary students.',
  contactPoint: { '@type': 'ContactPoint', email: 'hello@digitalkampus.ca', contactType: 'Customer Support' },
}

const VALUES = [
  { title: 'Students first', body: 'Every feature, every pricing decision, every policy starts with one question: is this good for students? Scholarship matching is free. It will stay free.' },
  { title: 'Privacy by default', body: 'Your profile is private unless you choose otherwise. We protect it server-side — not just with a noindex tag. We never sell your data.' },
  { title: 'Bilingual from day one', body: 'Canada is officially bilingual. Digital Kampus is built in English and French, with full feature parity in both languages.' },
  { title: 'No fake social proof', body: 'We never display fabricated statistics, simulated activity, or artificial engagement. Every number on our platform is real.' },
]

const TEAM = [
  { name: 'Coming soon', role: 'We\'re building in the open. Team page launching with our public beta.' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={orgLd} />
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>Built for Canadian students.<br />By Canadians.</h1>
            <p className={styles.lead}>
              Digital Kampus is a bilingual student-life platform for post-secondary students at Canadian colleges and universities.
              We connect students to their campus — scholarships, housing, clubs, grades, and each other.
            </p>
          </div>
        </section>

        <section className={styles.missionSection}>
          <div className={styles.missionInner}>
            <div className={styles.missionText}>
              <h2 className={styles.h2}>Our mission</h2>
              <p>
                Navigating Canadian post-secondary education is harder than it needs to be.
                Students miss scholarships they're eligible for. They can't find housing near campus.
                They don't know which clubs exist or how to get involved.
              </p>
              <p>
                Digital Kampus is the platform we wished existed when we were students.
                A single, bilingual place to manage campus life — without ads, without noise, without gatekeeping.
              </p>
            </div>
            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>200+</span>
                <span className={styles.statLabel}>Canadian institutions</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>$4.2B+</span>
                <span className={styles.statLabel}>in scholarships tracked</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>2</span>
                <span className={styles.statLabel}>official languages</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>🇨🇦</span>
                <span className={styles.statLabel}>Built in Canada</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className={styles.valuesInner}>
            <h2 className={styles.h2}>What we stand for</h2>
            <div className={styles.valuesGrid}>
              {VALUES.map(v => (
                <div key={v.title} className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueBody}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaH}>Join Digital Kampus</h2>
            <p className={styles.ctaBody}>Free for students. Always.</p>
            <div className={styles.ctaBtns}>
              <Link href="/signup" className={styles.primary}>Create free account</Link>
              <Link href="/schools" className={styles.secondary}>Browse schools</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

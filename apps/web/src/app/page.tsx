import type { Metadata } from 'next'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Hero } from '@/components/home/Hero'
import { TrustedBy } from '@/components/home/TrustedBy'
import { Features } from '@/components/home/Features'
import { CompareTeaser } from '@/components/home/CompareTeaser'
import { BrowseByProvince } from '@/components/home/BrowseByProvince'
import { HowItWorks } from '@/components/home/HowItWorks'
import { HomeFaq } from '@/components/home/HomeFaq'
import { StatsBelt } from '@/components/home/StatsBelt'
import { FeatureShowcase } from '@/components/home/FeatureShowcase'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Digital Kampus — Canada's Free Student-Life Platform',
  description:
    'Track grades, find student housing, discover scholarships, join clubs, and save on deals. Free for Canadian college and university students — in English and French.',
  alternates: {
    canonical: 'https://digitalkampus.ca',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Digital Kampus',
  url: 'https://digitalkampus.ca',
  description:
    'Free bilingual (English/French) student-life platform for Canadian colleges and universities.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://digitalkampus.ca/schools?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digital Kampus',
  url: 'https://digitalkampus.ca',
  logo: 'https://digitalkampus.ca/brand/digital-kampus-logo-horizontal-trimmed.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@digitalkampus.ca',
    availableLanguage: ['English', 'French'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={orgSchema} />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <Features />
        <FeatureShowcase />
        <CompareTeaser />
        <BrowseByProvince />
        <HowItWorks />
        <HomeFaq />
        <StatsBelt />
      </main>
      <SiteFooter />
    </>
  )
}

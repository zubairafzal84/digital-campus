import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Scholarships & Bursaries for Canadian Students | Digital Kampus',
  description:
    '80+ Canadian scholarships from federal, provincial, institutional and private sources. Free matching for every student — deadline alerts included.',
  alternates: {
    canonical: 'https://digitalkampus.ca/scholarships',
    languages: {
      'en-CA': 'https://digitalkampus.ca/scholarships',
      'fr-CA': 'https://digitalkampus.ca/fr/bourses',
    },
  },
}

export default function ScholarshipsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

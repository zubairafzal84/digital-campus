import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0D16' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://digitalkampus.ca'),
  title: {
    default: 'Digital Kampus — Canada's Student-Life Platform',
    template: '%s | Digital Kampus',
  },
  description:
    'Free bilingual (EN/FR) platform for Canadian college and university students. Track grades, find housing, discover scholarships, join clubs, and save on deals — all in one place.',
  keywords: [
    'Canadian university',
    'college student app',
    'student housing Canada',
    'scholarships Canada',
    'campus life',
    'student portal',
    'bilingual student app',
    'plateforme étudiante Canada',
  ],
  authors: [{ name: 'Digital Kampus', url: 'https://digitalkampus.ca' }],
  creator: 'Digital Kampus',
  publisher: 'Digital Kampus',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
    url: 'https://digitalkampus.ca',
    siteName: 'Digital Kampus',
    title: 'Digital Kampus — Canada's Student-Life Platform',
    description:
      'Free bilingual platform for Canadian college and university students — grades, housing, scholarships, clubs, and deals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Kampus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Kampus — Canada's Student-Life Platform',
    description:
      'Free bilingual platform for Canadian students — grades, housing, scholarships, clubs, deals.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://digitalkampus.ca',
    languages: {
      'en-CA': 'https://digitalkampus.ca',
      'fr-CA': 'https://digitalkampus.ca/fr',
    },
  },
  verification: {
    google: 'REPLACE_WITH_GSC_TOKEN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

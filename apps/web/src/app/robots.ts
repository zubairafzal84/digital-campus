import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/profile',
          '/api/',
          '/admin/',
          '/update-password',
          '/forgot-password/confirm',
          '/signup/confirm',
          '/clubs/register/success',
          '/partners/thank-you',
        ],
      },
    ],
    sitemap: 'https://digitalkampus.ca/sitemap.xml',
  }
}

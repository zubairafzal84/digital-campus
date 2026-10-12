import type { MetadataRoute } from 'next'
import { ARTICLES } from './resources/articles-data'

const BASE = 'https://digitalkampus.ca'

const SCHOOL_SLUGS = [
  // Original 12
  'ubc', 'sfu', 'uoft', 'mcgill', 'uwaterloo',
  'queens', 'ualberta', 'uvic', 'dal', 'bcit', 'seneca', 'humber',
  // Expanded universities
  'western', 'mcmaster', 'ucalgary', 'umanitoba', 'uottawa', 'carleton',
  'concordia', 'yorku', 'ryerson', 'udem', 'laval',
  // Additional universities
  'usask', 'usherbrooke', 'uqam', 'stfx', 'mun', 'unb', 'upei',
  // Colleges & polytechnics
  'georgebrown', 'centennial', 'mohawk', 'conestoga', 'algonquin', 'sheridan',
  'langara', 'kwantlen', 'nait', 'sait', 'nscc',
]

const CLUB_SLUGS = [
  'ubc-computer-science-club',
  'mcgill-debating-union',
  'uoft-muslim-students-association',
  'sfu-hiking-club',
  'carleton-film-collective',
  'ualberta-sustainability-network',
]

const COMPARE_SLUGS = ['ubc-vs-sfu', 'uoft-vs-ubc', 'uoft-vs-mcgill', 'sfu-vs-uvic']

const HOUSING_SLUGS = [
  'kitsilano-1br-near-ubc',
  'shared-room-sfu-burnaby',
  '2br-ottawa-carleton-uottawa',
  'basement-suite-u-of-t',
  '3br-student-house-montreal-mcgill',
  'studio-university-of-alberta',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/schools`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/scholarships`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/clubs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/housing`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/students`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/partners/landlords`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/partners/employers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/partners/merchants`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/clubs/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/study-groups`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/deals`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/professors`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE}/surveys`, lastModified: now, changeFrequency: 'daily', priority: 0.75 },
    { url: `${BASE}/surveys/create`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/surveys/for-organizations`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE}/events/create`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/volunteer`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
  ]

  const schoolPages: MetadataRoute.Sitemap = SCHOOL_SLUGS.map((slug) => ({
    url: `${BASE}/schools/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const clubPages: MetadataRoute.Sitemap = CLUB_SLUGS.map((slug) => ({
    url: `${BASE}/clubs/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  const comparePages: MetadataRoute.Sitemap = COMPARE_SLUGS.map((slug) => ({
    url: `${BASE}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const housingPages: MetadataRoute.Sitemap = HOUSING_SLUGS.map((slug) => ({
    url: `${BASE}/housing/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const scholarshipPages: MetadataRoute.Sitemap = [
    'vanier-cgs', 'trudeau-foundation', 'nserc-pgsd', 'sshrc-doctoral', 'ontario-grad', 'rbc-future-launch',
  ].map((slug) => ({
    url: `${BASE}/scholarships/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const resourcePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    ...ARTICLES.map((a) => ({
      url: `${BASE}/resources/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [...staticPages, ...schoolPages, ...clubPages, ...comparePages, ...housingPages, ...scholarshipPages, ...resourcePages]
}

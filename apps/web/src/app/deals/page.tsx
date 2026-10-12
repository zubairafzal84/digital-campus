import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './deals.module.css'

export const metadata: Metadata = {
  title: 'Student Deals & Perks | Digital Kampus',
  description:
    'Exclusive student discounts on Spotify, Apple, Amazon Prime, Adobe, GitHub, VIA Rail, and hundreds more. Verified deals for Canadian college and university students.',
  alternates: {
    languages: { 'fr-CA': '/fr/deals' },
  },
  openGraph: {
    title: 'Student Deals & Perks | Digital Kampus',
    description:
      'Save on software, travel, food, and more. Real verified discounts for enrolled Canadian students.',
    url: 'https://digitalkampus.ca/deals',
    type: 'website',
  },
}

type Category =
  | 'All'
  | 'Entertainment'
  | 'Tech'
  | 'Shopping'
  | 'Travel'
  | 'Food'
  | 'Books'
  | 'Design'
  | 'Productivity'
  | 'Education'
  | 'Platform'

interface Deal {
  id: string
  name: string
  provider: string
  discount: string
  category: Exclude<Category, 'All'>
  description: string
  ctaText: string
  ctaUrl: string
  isVerified: boolean
  badgeColor: string
  badgeInitial: string
  /** Higher number = shown first */
  priority: number
}

const DEALS: Deal[] = [
  {
    id: 'github-student',
    name: 'GitHub Student Developer Pack',
    provider: 'GitHub / Microsoft',
    discount: '$200k+ FREE',
    category: 'Tech',
    description:
      'Free GitHub Copilot AI coding assistant, free domain names, AWS/Azure/DigitalOcean credits, JetBrains IDEs, and dozens of other dev tools — all free while you\'re a student.',
    ctaText: 'Get Pack',
    ctaUrl: 'https://education.github.com/pack',
    isVerified: true,
    badgeColor: '#1a1a2e',
    badgeInitial: 'GH',
    priority: 100,
  },
  {
    id: 'spotify-student',
    name: 'Spotify Premium Student',
    provider: 'Spotify',
    discount: '50% OFF',
    category: 'Entertainment',
    description:
      'Get Spotify Premium for $5.99/mo (regular $11.99). Ad-free music, offline listening, and unlimited skips. Verified via SheerID — just confirm your enrollment.',
    ctaText: 'Get Deal',
    ctaUrl: 'https://www.spotify.com/ca-en/student/',
    isVerified: true,
    badgeColor: '#1DB954',
    badgeInitial: 'S',
    priority: 95,
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud Student',
    provider: 'Adobe',
    discount: '60% OFF',
    category: 'Tech',
    description:
      'Full Creative Cloud suite (Photoshop, Illustrator, Premiere Pro, and 20+ apps) for approximately $22/mo instead of $54.99/mo. Requires proof of enrollment.',
    ctaText: 'Get Deal',
    ctaUrl: 'https://www.adobe.com/ca/creativecloud/buy/students.html',
    isVerified: true,
    badgeColor: '#E93A3A',
    badgeInitial: 'Ai',
    priority: 90,
  },
  {
    id: 'apple-education',
    name: 'Apple Education Pricing',
    provider: 'Apple Canada',
    discount: 'UP TO 15% OFF',
    category: 'Tech',
    description:
      'Save up to 15% on Mac, iPad, and accessories for school. Visit the Apple Education Store with your student ID — no verification service needed.',
    ctaText: 'Shop Apple EDU',
    ctaUrl: 'https://www.apple.com/ca/shop/education',
    isVerified: true,
    badgeColor: '#555555',
    badgeInitial: '',
    priority: 88,
  },
  {
    id: 'amazon-prime-student',
    name: 'Amazon Prime Student',
    provider: 'Amazon Canada',
    discount: '6 MONTHS FREE',
    category: 'Shopping',
    description:
      'Six months free then $4.99/mo (vs $9.99 regular). Free two-day shipping, Prime Video, Prime Music, and exclusive student deals. Renews until graduation.',
    ctaText: 'Start Free Trial',
    ctaUrl: 'https://www.amazon.ca/joinstudent',
    isVerified: true,
    badgeColor: '#FF9900',
    badgeInitial: 'a',
    priority: 85,
  },
  {
    id: 'notion-education',
    name: 'Notion Education Plan',
    provider: 'Notion',
    discount: '100% FREE',
    category: 'Productivity',
    description:
      'Free Personal Pro plan for students — unlimited blocks, file uploads, and version history. The all-in-one workspace trusted by millions of students worldwide.',
    ctaText: 'Get Free Plan',
    ctaUrl: 'https://www.notion.so/product/notion-for-education',
    isVerified: true,
    badgeColor: '#1a1a1a',
    badgeInitial: 'N',
    priority: 82,
  },
  {
    id: 'figma-education',
    name: 'Figma Education Plan',
    provider: 'Figma',
    discount: '100% FREE',
    category: 'Design',
    description:
      'Free Figma Professional plan for verified students and educators. Unlimited projects, team collaboration, and all Pro features — the industry-standard design tool.',
    ctaText: 'Get Free Plan',
    ctaUrl: 'https://www.figma.com/education/',
    isVerified: true,
    badgeColor: '#F24E1E',
    badgeInitial: 'F',
    priority: 80,
  },
  {
    id: 'unidays',
    name: 'UNiDAYS Student Discounts',
    provider: 'UNiDAYS',
    discount: '1000+ BRANDS',
    category: 'Platform',
    description:
      'Free to join. Access verified student discounts at Nike, ASOS, Samsung, Dell, H&M, and 1,000+ more brands. Verify once, save everywhere.',
    ctaText: 'Join Free',
    ctaUrl: 'https://www.unidays.com/CA/join',
    isVerified: true,
    badgeColor: '#6B3EF2',
    badgeInitial: 'U',
    priority: 78,
  },
  {
    id: 'student-beans',
    name: 'Student Beans',
    provider: 'Student Beans',
    discount: '100s OF DEALS',
    category: 'Platform',
    description:
      'One free verification unlocks hundreds of student discounts across fashion, tech, food, and travel. Available across major Canadian retailers and global brands.',
    ctaText: 'Join Free',
    ctaUrl: 'https://www.studentbeans.com/ca',
    isVerified: true,
    badgeColor: '#00B4D8',
    badgeInitial: 'SB',
    priority: 76,
  },
  {
    id: 'microsoft-azure',
    name: 'Azure Dev Tools for Teaching',
    provider: 'Microsoft',
    discount: 'FREE CREDITS',
    category: 'Tech',
    description:
      'Free Azure cloud credits, Microsoft software, and developer tools for students at participating Canadian institutions. Access through your school\'s IT portal.',
    ctaText: 'Learn More',
    ctaUrl: 'https://azureforeducation.microsoft.com/en-us/Institutions',
    isVerified: true,
    badgeColor: '#0078D4',
    badgeInitial: 'Az',
    priority: 74,
  },
  {
    id: 'via-rail',
    name: 'VIA Rail Student Discount',
    provider: 'VIA Rail Canada',
    discount: '35% OFF',
    category: 'Travel',
    description:
      'Save 35% on train travel across Canada with a valid ISIC student card. Book online or at the station — great for visiting home or exploring Canada on a budget.',
    ctaText: 'Book Trains',
    ctaUrl: 'https://www.viarail.ca/en/fares-and-trains/student-discount',
    isVerified: true,
    badgeColor: '#003087',
    badgeInitial: 'VIA',
    priority: 70,
  },
  {
    id: 'enterprise-student',
    name: 'Enterprise / Alamo Student Rate',
    provider: 'Enterprise Holdings',
    discount: '10–20% OFF',
    category: 'Travel',
    description:
      'Student discount on car rentals at Enterprise and Alamo. Book through the student portal or enter your promo code at checkout — great for road trips and moving.',
    ctaText: 'Book Car',
    ctaUrl: 'https://www.enterprise.ca/en/car-rental/drivers/students.html',
    isVerified: true,
    badgeColor: '#00843D',
    badgeInitial: 'E',
    priority: 65,
  },
  {
    id: 'coursera-institutions',
    name: 'Coursera via Your Institution',
    provider: 'Coursera',
    discount: 'FREE COURSES',
    category: 'Education',
    description:
      'Many Canadian universities provide free Coursera access to enrolled students. Check with your institution — includes certificates from top universities and companies.',
    ctaText: 'Explore Courses',
    ctaUrl: 'https://www.coursera.org/campus',
    isVerified: false,
    badgeColor: '#0056D2',
    badgeInitial: 'Co',
    priority: 60,
  },
  {
    id: 'goodfood-student',
    name: 'Good Food / HelloFresh Student Promo',
    provider: 'Good Food & HelloFresh',
    discount: '20% OFF',
    category: 'Food',
    description:
      'First three meal kit boxes at 20% off. Fresh ingredients and chef-designed recipes delivered to your door — perfect for busy students learning to cook.',
    ctaText: 'Get Promo',
    ctaUrl: 'https://www.makegoodfood.ca/en/promotions',
    isVerified: false,
    badgeColor: '#4CAF50',
    badgeInitial: 'GF',
    priority: 55,
  },
  {
    id: 'chapters-student',
    name: 'Chapters / Indigo Student Discount',
    provider: 'Chapters Indigo',
    discount: '10% OFF',
    category: 'Books',
    description:
      'Save 10% on books, stationery, and lifestyle items at Chapters/Indigo through Student Beans verification. Canada\'s largest bookseller — perfect for textbooks and pleasure reading.',
    ctaText: 'Shop & Save',
    ctaUrl: 'https://www.chapters.indigo.ca/en-ca/',
    isVerified: false,
    badgeColor: '#8B0000',
    badgeInitial: 'CI',
    priority: 50,
  },
]

const CATEGORIES: Category[] = [
  'All',
  'Tech',
  'Entertainment',
  'Shopping',
  'Travel',
  'Food',
  'Books',
  'Design',
  'Productivity',
  'Education',
  'Platform',
]

const SORTED_DEALS = [...DEALS].sort((a, b) => b.priority - a.priority)

export default function DealsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.h1}>
          Student Deals &amp; <span>Perks</span>
        </h1>
        <p className={styles.sub}>
          Verified discounts on software, travel, food, and more — exclusively for enrolled Canadian
          college and university students.
        </p>
      </section>

      {/* Filter bar — static render; filtering is handled client-side via URL or JS.
          For now we render all categories as accessible anchor landmarks. */}
      <nav className={styles.filterBar} aria-label="Filter deals by category">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === 'All' ? '#deals-grid' : `#cat-${cat.toLowerCase()}`}
            className={`${styles.filterBtn} ${cat === 'All' ? styles.filterBtnActive : ''}`}
            aria-label={`Show ${cat} deals`}
          >
            {cat}
          </a>
        ))}
      </nav>

      {/* Deal cards */}
      <div id="deals-grid" className={styles.grid} role="list" aria-label="Student deals">
        {SORTED_DEALS.map((deal) => (
          <article
            key={deal.id}
            id={`cat-${deal.category.toLowerCase()}`}
            className={styles.card}
            role="listitem"
            aria-label={`${deal.name} — ${deal.discount}`}
          >
            <div className={styles.cardTop}>
              <div
                className={styles.cardBadge}
                style={{ background: deal.badgeColor }}
                aria-hidden="true"
              >
                {deal.badgeInitial || deal.name.charAt(0)}
              </div>
              <span className={styles.discountPill}>{deal.discount}</span>
            </div>

            <div>
              <p className={styles.cardCategory}>{deal.category}</p>
              <h2 className={styles.cardName}>{deal.name}</h2>
              <p className={styles.cardProvider}>{deal.provider}</p>
            </div>

            <p className={styles.cardDesc}>{deal.description}</p>

            <div className={styles.cardFooter}>
              {deal.isVerified && (
                <span className={styles.verifiedBadge}>Verified Deal</span>
              )}
              <a
                href={deal.ctaUrl}
                className={styles.ctaBtn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${deal.ctaText} — ${deal.name} (opens in new tab)`}
              >
                {deal.ctaText}
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Merchant partnership CTA */}
      <section className={styles.merchantCta} aria-labelledby="merchant-heading">
        <strong id="merchant-heading">Do you offer student discounts?</strong>
        <p>
          Reach thousands of verified Canadian students on Digital Kampus. List your deal for free.
        </p>
        <Link href="/partners/merchants" className={styles.partnerBtn}>
          Partner with us
        </Link>
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './housing.module.css'

export const metadata: Metadata = {
  title: 'Housing | Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

type ListingType = 'Studio' | '1 BR' | '2 BR' | 'Shared Room'

type Listing = {
  id: number
  type: ListingType
  title: string
  neighbourhood: string
  city: string
  province: string
  rent: number
  beds: string
  baths: string
  amenities: string[]
  available: string
  isVerified: boolean
  landlordName: string
}

const LISTINGS: Listing[] = [
  {
    id: 1,
    type: '1 BR',
    title: 'Bright 1-Bedroom near UBC',
    neighbourhood: 'Kitsilano',
    city: 'Vancouver',
    province: 'BC',
    rent: 1950,
    beds: '1',
    baths: '1',
    amenities: ['Laundry', 'WiFi', 'Furnished'],
    available: 'Nov 1, 2026',
    isVerified: true,
    landlordName: 'Pacific Properties',
  },
  {
    id: 2,
    type: 'Shared Room',
    title: 'Shared House near SFU Burnaby',
    neighbourhood: 'Burnaby Heights',
    city: 'Vancouver',
    province: 'BC',
    rent: 950,
    beds: 'Shared',
    baths: '2',
    amenities: ['Laundry', 'WiFi', 'Utilities'],
    available: 'Oct 15, 2026',
    isVerified: true,
    landlordName: 'Mountain View Rentals',
  },
  {
    id: 3,
    type: 'Studio',
    title: 'Modern Studio in the Annex near U of T',
    neighbourhood: 'The Annex',
    city: 'Toronto',
    province: 'ON',
    rent: 1750,
    beds: 'Studio',
    baths: '1',
    amenities: ['WiFi', 'Furnished', 'Utilities'],
    available: 'Nov 1, 2026',
    isVerified: true,
    landlordName: 'Annex Homes Inc.',
  },
  {
    id: 4,
    type: '1 BR',
    title: 'Cozy 1-Bedroom near McGill',
    neighbourhood: 'Plateau-Mont-Royal',
    city: 'Montreal',
    province: 'QC',
    rent: 1450,
    beds: '1',
    baths: '1',
    amenities: ['Laundry', 'Heating', 'Pet-Friendly'],
    available: 'Dec 1, 2026',
    isVerified: false,
    landlordName: 'Rivard Properties',
  },
  {
    id: 5,
    type: 'Shared Room',
    title: 'Shared Room near University of Waterloo',
    neighbourhood: 'Uptown Waterloo',
    city: 'Waterloo',
    province: 'ON',
    rent: 900,
    beds: 'Shared',
    baths: '1',
    amenities: ['WiFi', 'Laundry', 'Parking'],
    available: 'Oct 20, 2026',
    isVerified: true,
    landlordName: 'Waterloo Student Housing',
  },
  {
    id: 6,
    type: '2 BR',
    title: "2-Bedroom near Queen's University",
    neighbourhood: 'University District',
    city: 'Kingston',
    province: 'ON',
    rent: 2100,
    beds: '2',
    baths: '1',
    amenities: ['Laundry', 'Parking', 'Pet-Friendly'],
    available: 'Jan 1, 2027',
    isVerified: false,
    landlordName: 'Kingston Rentals',
  },
  {
    id: 7,
    type: '1 BR',
    title: '1-Bedroom in Garneau near U of Alberta',
    neighbourhood: 'Garneau',
    city: 'Edmonton',
    province: 'AB',
    rent: 1350,
    beds: '1',
    baths: '1',
    amenities: ['Laundry', 'Heating', 'Parking'],
    available: 'Nov 15, 2026',
    isVerified: true,
    landlordName: 'Garneau Housing Co.',
  },
  {
    id: 8,
    type: 'Studio',
    title: 'Studio Suite near UVic',
    neighbourhood: 'Saanich',
    city: 'Victoria',
    province: 'BC',
    rent: 1600,
    beds: 'Studio',
    baths: '1',
    amenities: ['WiFi', 'Furnished', 'Utilities'],
    available: 'Oct 31, 2026',
    isVerified: true,
    landlordName: 'Island Living Rentals',
  },
  {
    id: 9,
    type: 'Shared Room',
    title: 'Shared House near Dalhousie',
    neighbourhood: 'South End',
    city: 'Halifax',
    province: 'NS',
    rent: 1050,
    beds: 'Shared',
    baths: '2',
    amenities: ['Laundry', 'WiFi', 'Heating'],
    available: 'Nov 1, 2026',
    isVerified: false,
    landlordName: 'Halifax Student Homes',
  },
  {
    id: 10,
    type: '1 BR',
    title: '1-Bedroom near BCIT Burnaby',
    neighbourhood: 'Metrotown',
    city: 'Vancouver',
    province: 'BC',
    rent: 1800,
    beds: '1',
    baths: '1',
    amenities: ['Laundry', 'Parking', 'WiFi'],
    available: 'Dec 1, 2026',
    isVerified: true,
    landlordName: 'Metrotown Suites',
  },
  {
    id: 11,
    type: '1 BR',
    title: '1-Bedroom near Seneca College',
    neighbourhood: 'North York',
    city: 'Toronto',
    province: 'ON',
    rent: 1650,
    beds: '1',
    baths: '1',
    amenities: ['Laundry', 'WiFi', 'Furnished'],
    available: 'Nov 1, 2026',
    isVerified: true,
    landlordName: 'York Residential',
  },
  {
    id: 12,
    type: '2 BR',
    title: '2-Bedroom near Humber College',
    neighbourhood: 'Etobicoke',
    city: 'Toronto',
    province: 'ON',
    rent: 2200,
    beds: '2',
    baths: '1',
    amenities: ['Parking', 'Laundry', 'Pet-Friendly'],
    available: 'Dec 15, 2026',
    isVerified: false,
    landlordName: 'Humber Valley Rentals',
  },
]

const CITIES = [
  { label: 'All cities', value: '' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Montreal', value: 'Montreal' },
  { label: 'Waterloo', value: 'Waterloo' },
  { label: 'Kingston', value: 'Kingston' },
  { label: 'Edmonton', value: 'Edmonton' },
  { label: 'Victoria', value: 'Victoria' },
  { label: 'Halifax', value: 'Halifax' },
]

const TYPES = [
  { label: 'All types', value: '' },
  { label: 'Studio', value: 'Studio' },
  { label: '1 BR', value: '1 BR' },
  { label: '2 BR', value: '2 BR' },
  { label: 'Shared Room', value: 'Shared Room' },
]

const PRICE_RANGES = [
  { label: 'Any price', value: '' },
  { label: 'Under $1,000', value: '0-999' },
  { label: '$1,000 – $1,500', value: '1000-1500' },
  { label: '$1,500 – $2,000', value: '1500-2000' },
  { label: 'Over $2,000', value: '2001-9999' },
]

function matchesPrice(rent: number, priceParam: string): boolean {
  if (!priceParam) return true
  const [min, max] = priceParam.split('-').map(Number)
  return rent >= min && rent <= max
}

function HousingCard({ listing }: { listing: Listing }) {
  const bedsLabel =
    listing.beds === 'Studio'
      ? 'Studio'
      : listing.beds === 'Shared'
        ? 'Shared room'
        : `${listing.beds} bed`

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.priceBadge}>
          ${listing.rent.toLocaleString()}
          <span className={styles.perMo}>/mo</span>
        </span>
        {listing.isVerified && (
          <span className={styles.verifiedBadge}>Verified</span>
        )}
      </div>
      <h3 className={styles.cardTitle}>{listing.title}</h3>
      <p className={styles.meta}>
        {listing.neighbourhood} &middot; {listing.city}, {listing.province}
      </p>
      <p className={styles.meta}>
        {bedsLabel} &middot; {listing.baths} bath
      </p>
      <div className={styles.amenities}>
        {listing.amenities.map((a) => (
          <span key={a} className={styles.chip}>
            {a}
          </span>
        ))}
      </div>
      <p className={styles.available}>Available {listing.available}</p>
      <Link href="/partners/landlords" className={styles.contactBtn}>
        Contact landlord
      </Link>
    </article>
  )
}

export default async function DashboardHousingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const cityFilter = typeof sp.city === 'string' ? sp.city : ''
  const typeFilter = typeof sp.type === 'string' ? sp.type : ''
  const priceFilter = typeof sp.price === 'string' ? sp.price : ''

  const filtered = LISTINGS.filter((l) => {
    if (cityFilter && l.city !== cityFilter) return false
    if (typeFilter && l.type !== (typeFilter as ListingType)) return false
    if (!matchesPrice(l.rent, priceFilter)) return false
    return true
  })

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Housing</h1>
          <p className={styles.sub}>
            Browse verified listings near Canadian campuses.
          </p>
        </div>
        <Link href="/partners/landlords" className={styles.browseBtn}>
          List your property →
        </Link>
      </header>

      <form method="get" className={styles.filterBar}>
        <select
          name="city"
          defaultValue={cityFilter}
          className={styles.filterSelect}
          aria-label="Filter by city"
        >
          {CITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          name="type"
          defaultValue={typeFilter}
          className={styles.filterSelect}
          aria-label="Filter by type"
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          name="price"
          defaultValue={priceFilter}
          className={styles.filterSelect}
          aria-label="Filter by price"
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.filterBtn}>
          Filter
        </button>
        {(cityFilter || typeFilter || priceFilter) && (
          <a href="/dashboard/housing" className={styles.clearBtn}>
            Clear filters
          </a>
        )}
      </form>

      <p className={styles.resultCount}>
        {filtered.length} listing{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No listings match your filters.</p>
          <a href="/dashboard/housing" className={styles.emptyLink}>
            Clear filters →
          </a>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((l) => (
            <HousingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      <section className={styles.cta}>
        <h2 className={styles.ctaH}>Are you a landlord?</h2>
        <p className={styles.ctaP}>
          Reach thousands of verified students across Canada by listing your
          property on Digital Kampus — always free to post.
        </p>
        <Link href="/partners/landlords" className={styles.ctaBtn}>
          List your property
        </Link>
      </section>
    </main>
  )
}

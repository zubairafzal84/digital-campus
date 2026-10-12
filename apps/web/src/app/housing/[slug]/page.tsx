import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import styles from './housing-detail.module.css'

const LISTINGS = [
  {
    slug: 'kitsilano-1br-near-ubc',
    title: '1BR near UBC — Kitsilano',
    rent: 1850,
    bedrooms: 1,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'UBC',
    schoolSlug: 'ubc',
    walkMin: 18,
    address: 'Kitsilano, Vancouver, BC',
    city: 'Vancouver',
    province: 'BC',
    amenities: ['In-suite laundry', 'Bike storage', 'Transit nearby', 'Balcony'],
    available: '2027-01-01',
    description: "Bright 1-bedroom apartment in Kitsilano, 18 minutes by transit or bike to UBC campus. The unit features updated kitchen appliances, generous closet space, and access to a shared bike storage room. On major bus routes with frequent service to UBC and downtown Vancouver.",
    petFriendly: false,
    smokingAllowed: false,
    furnished: false,
    parkingIncluded: false,
    utilitiesIncluded: false,
    internet: false,
    deposit: 1850,
    leaseTerm: '12-month',
    contactName: 'Property Manager',
  },
  {
    slug: 'shared-room-sfu-burnaby',
    title: 'Shared room — close to SFU Burnaby',
    rent: 850,
    bedrooms: 1,
    bathrooms: 1,
    type: 'shared',
    nearSchool: 'SFU',
    schoolSlug: 'sfu',
    walkMin: 12,
    address: 'Burnaby Heights, BC',
    city: 'Burnaby',
    province: 'BC',
    amenities: ['Utilities included', 'Internet included', 'Furnished', 'Shared kitchen'],
    available: '2026-12-01',
    description: "Private bedroom in a 4-bedroom shared student house, 12 minutes walk to SFU Burnaby campus. Utilities (hydro, heat, water) and high-speed internet included in the rent. Common areas include a full kitchen, living room, and backyard. Other roommates are current SFU students.",
    petFriendly: false,
    smokingAllowed: false,
    furnished: true,
    parkingIncluded: false,
    utilitiesIncluded: true,
    internet: true,
    deposit: 850,
    leaseTerm: '8-month or 12-month',
    contactName: 'House Manager',
  },
  {
    slug: '2br-ottawa-carleton-uottawa',
    title: '2BR apartment — downtown Ottawa',
    rent: 2100,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'Carleton / uOttawa',
    schoolSlug: 'carleton',
    walkMin: 22,
    address: 'Centretown, Ottawa, ON',
    city: 'Ottawa',
    province: 'ON',
    amenities: ['Underground parking', 'Dishwasher', 'Central AC', 'Gym'],
    available: '2027-01-15',
    description: "Spacious 2-bedroom apartment in Centretown, close to both Carleton and uOttawa campuses. The building includes underground parking, gym access, and an on-site superintendent. Modern kitchen with dishwasher and stainless steel appliances. Perfect for two students splitting costs.",
    petFriendly: true,
    smokingAllowed: false,
    furnished: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    internet: false,
    deposit: 2100,
    leaseTerm: '12-month',
    contactName: 'Building Super',
  },
  {
    slug: 'basement-suite-u-of-t',
    title: 'Basement suite near U of T St. George',
    rent: 1650,
    bedrooms: 1,
    bathrooms: 1,
    type: 'basement',
    nearSchool: 'U of T',
    schoolSlug: 'uoft',
    walkMin: 8,
    address: 'Annex, Toronto, ON',
    city: 'Toronto',
    province: 'ON',
    amenities: ['2-min walk to subway', 'In-suite laundry', 'Hydro included', 'Separate entrance'],
    available: '2026-12-15',
    description: "Self-contained basement suite in the Annex, 8 minutes walk to U of T St. George campus. Separate entrance, in-suite washer/dryer, and hydro (electricity) included in rent. Quiet neighbourhood with great access to the Bloor-Spadina subway station. Ideal for a focused grad student or professional.",
    petFriendly: false,
    smokingAllowed: false,
    furnished: false,
    parkingIncluded: false,
    utilitiesIncluded: true,
    internet: false,
    deposit: 1650,
    leaseTerm: '12-month',
    contactName: 'Owner',
  },
  {
    slug: '3br-student-house-montreal-mcgill',
    title: '3BR student house — Plateau, Montréal',
    rent: 2400,
    bedrooms: 3,
    bathrooms: 1,
    type: 'house',
    nearSchool: 'McGill',
    schoolSlug: 'mcgill',
    walkMin: 25,
    address: 'Plateau-Mont-Royal, Montréal, QC',
    city: 'Montréal',
    province: 'QC',
    amenities: ['Private balcony', 'Dishwasher', 'Fully furnished', 'Bike parking'],
    available: '2027-05-01',
    description: "Fully furnished 3-bedroom house in Plateau-Mont-Royal, available May 1 for the summer and fall semesters. Walking distance to McGill (Sherbrooke station) via metro. Two floors with a private balcony and a shared courtyard. Perfect for a group of McGill or Concordia students looking to share costs.",
    petFriendly: true,
    smokingAllowed: false,
    furnished: true,
    parkingIncluded: false,
    utilitiesIncluded: false,
    internet: false,
    deposit: 2400,
    leaseTerm: '8-month or 12-month',
    contactName: 'Property Owner',
  },
  {
    slug: 'studio-university-of-alberta',
    title: 'Studio — near University of Alberta',
    rent: 1100,
    bedrooms: 0,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'UAlberta',
    schoolSlug: 'ualberta',
    walkMin: 10,
    address: 'Garneau, Edmonton, AB',
    city: 'Edmonton',
    province: 'AB',
    amenities: ['Heat & water included', 'Gym access', 'Secure building', 'LRT nearby'],
    available: '2027-01-01',
    description: "Quiet studio apartment in Garneau, one of Edmonton's most walkable student neighbourhoods, 10 minutes from the University of Alberta main campus. Heat and water included in rent. The building has a well-equipped gym and secure fob entry. On multiple LRT and bus routes.",
    petFriendly: false,
    smokingAllowed: false,
    furnished: false,
    parkingIncluded: false,
    utilitiesIncluded: false,
    internet: false,
    deposit: 1100,
    leaseTerm: '12-month',
    contactName: 'Building Manager',
  },
]

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = LISTINGS.find((l) => l.slug === slug)
  if (!listing) return {}
  return {
    title: `${listing.title} — $${listing.rent}/mo | Digital Kampus Housing`,
    description: `${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms}-bed`} ${listing.type} in ${listing.address}. $${listing.rent}/mo, available ${listing.available}. Near ${listing.nearSchool}.`,
    robots: { index: false, follow: false },
  }
}

const TYPE_EMOJI: Record<string, string> = {
  apartment: '🏢',
  shared: '🏠',
  basement: '🏡',
  house: '🏘️',
}

export default async function HousingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = LISTINGS.find((l) => l.slug === slug)
  if (!listing) notFound()

  const bedsLabel = listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''}`

  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Housing', href: '/housing' },
              { label: listing.title },
            ]} />
          </div>
        </section>

        <div className={styles.inner}>
          <div className={styles.layout}>
            <div className={styles.main}>
              {/* Image placeholder */}
              <div className={styles.imgBlock}>
                <div className={styles.imgMain}>
                  <span className={styles.imgEmoji}>{TYPE_EMOJI[listing.type] ?? '🏠'}</span>
                  <span className={styles.typePill}>{listing.type}</span>
                </div>
              </div>

              <div className={styles.titleRow}>
                <div>
                  <h1 className={styles.h1}>{listing.title}</h1>
                  <p className={styles.address}>{listing.address}</p>
                </div>
                <div className={styles.rentBlock}>
                  <span className={styles.rent}>${listing.rent.toLocaleString()}</span>
                  <span className={styles.perMo}>/month</span>
                </div>
              </div>

              <div className={styles.specs}>
                <span className={styles.spec}>{bedsLabel}</span>
                <span className={styles.specDot}>·</span>
                <span className={styles.spec}>{listing.bathrooms} bath</span>
                <span className={styles.specDot}>·</span>
                <span className={styles.spec}>{listing.walkMin} min walk to {listing.nearSchool}</span>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionH}>About this listing</h2>
                <p className={styles.description}>{listing.description}</p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionH}>Amenities</h2>
                <ul className={styles.amenityList}>
                  {listing.amenities.map((a) => (
                    <li key={a} className={styles.amenityItem}>
                      <span className={styles.checkmark}>✓</span> {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionH}>Details</h2>
                <div className={styles.detailGrid}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Lease term</span>
                    <span className={styles.detailVal}>{listing.leaseTerm}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Available</span>
                    <span className={styles.detailVal}>{listing.available}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Deposit</span>
                    <span className={styles.detailVal}>${listing.deposit.toLocaleString()}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Furnished</span>
                    <span className={styles.detailVal}>{listing.furnished ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Utilities included</span>
                    <span className={styles.detailVal}>{listing.utilitiesIncluded ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Pet-friendly</span>
                    <span className={styles.detailVal}>{listing.petFriendly ? 'Yes' : 'No'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Parking</span>
                    <span className={styles.detailVal}>{listing.parkingIncluded ? 'Included' : 'Not included'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <div className={styles.contactAvatar}>{listing.contactName.charAt(0)}</div>
                  <div>
                    <p className={styles.contactName}>{listing.contactName}</p>
                    <p className={styles.contactRole}>Verified landlord</p>
                  </div>
                </div>

                <div className={styles.rentSummary}>
                  <span className={styles.rentLarge}>${listing.rent.toLocaleString()}<span className={styles.rentMo}>/mo</span></span>
                  <span className={styles.availBadge}>Available {listing.available}</span>
                </div>

                <Link href="/signup" className={styles.contactBtn}>
                  Create account to contact
                </Link>
                <p className={styles.contactNote}>
                  Sign up free. Contact requests require your acceptance before any messaging begins.
                </p>

                <div className={styles.nearSchoolBadge}>
                  <span>🎓</span>
                  <span>{listing.walkMin} min walk to <Link href={`/schools/${listing.schoolSlug}`}>{listing.nearSchool}</Link></span>
                </div>
              </div>

              <div className={styles.safetyCard}>
                <h3 className={styles.safetyH}>Renting safely</h3>
                <ul className={styles.safetyList}>
                  <li>Never send money before viewing</li>
                  <li>Meet in person or video before signing</li>
                  <li>Contact requests require your acceptance</li>
                  <li>Report suspicious listings to our team</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

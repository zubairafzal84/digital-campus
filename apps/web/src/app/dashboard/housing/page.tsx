import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './housing.module.css'

export const metadata: Metadata = {
  title: 'Housing | Dashboard | Digital Kampus',
  robots: { index: false, follow: false },
}

const SAVED = [
  {
    id: 1,
    title: 'Kitsilano 1BR near UBC',
    slug: 'kitsilano-1br-near-ubc',
    price: 1850,
    type: 'Apartment',
    distance: '2.4 km to campus',
    status: 'Available',
  },
  {
    id: 2,
    title: 'Shared room near SFU Burnaby',
    slug: 'shared-room-sfu-burnaby',
    price: 750,
    type: 'Shared',
    distance: '0.8 km to campus',
    status: 'Available',
  },
]

export default function DashboardHousingPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Housing</h1>
          <p className={styles.sub}>Browse listings near your school.</p>
        </div>
        <Link href="/housing" className={styles.browseBtn}>Browse all →</Link>
      </header>

      <section>
        <h2 className={styles.sectionH}>Saved listings</h2>
        {SAVED.length === 0 ? (
          <div className={styles.empty}>
            <p>No saved listings yet.</p>
            <Link href="/housing" className={styles.emptyLink}>Browse housing →</Link>
          </div>
        ) : (
          <div className={styles.listingGrid}>
            {SAVED.map(({ id, title, slug, price, type, distance, status }) => (
              <Link key={id} href={`/housing/${slug}`} className={styles.listingCard}>
                <div className={styles.listingTop}>
                  <span className={styles.listingType}>{type}</span>
                  <span className={styles.listingStatus}>{status}</span>
                </div>
                <h3 className={styles.listingTitle}>{title}</h3>
                <p className={styles.listingMeta}>{distance}</p>
                <p className={styles.listingPrice}>${price.toLocaleString()}<span>/mo</span></p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaH}>Looking for housing near your school?</h2>
        <p className={styles.ctaP}>Search verified listings near all 12 Canadian campuses on Digital Kampus.</p>
        <Link href="/housing" className={styles.ctaBtn}>Browse housing</Link>
        <p className={styles.ctaNote}>Are you a landlord? <Link href="/partners/landlords" className={styles.ctaInline}>List your property →</Link></p>
      </section>
    </main>
  )
}

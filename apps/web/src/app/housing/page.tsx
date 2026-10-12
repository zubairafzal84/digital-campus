import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import styles from './housing.module.css'

export const metadata: Metadata = {
  title: 'Student Housing Near Canadian Universities | Digital Kampus',
  description:
    'Find verified student rentals near your campus. Apartments, shared houses, and basement suites near top Canadian colleges and universities.',
  alternates: {
    canonical: 'https://digitalkampus.ca/housing',
    languages: {
      'en-CA': 'https://digitalkampus.ca/housing',
      'fr-CA': 'https://digitalkampus.ca/fr/logement',
    },
  },
}

const LISTINGS = [
  {
    id: 1,
    title: '1BR near UBC — Kitsilano',
    rent: 1850,
    bedrooms: 1,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'UBC',
    walkMin: 18,
    address: 'Kitsilano, Vancouver, BC',
    amenities: ['Laundry', 'Bike storage', 'Transit nearby'],
    available: '2027-01-01',
  },
  {
    id: 2,
    title: 'Shared room — close to SFU Burnaby',
    rent: 850,
    bedrooms: 1,
    bathrooms: 1,
    type: 'shared',
    nearSchool: 'SFU',
    walkMin: 12,
    address: 'Burnaby Heights, BC',
    amenities: ['Utilities included', 'Internet', 'Furnished'],
    available: '2026-12-01',
  },
  {
    id: 3,
    title: '2BR apartment — downtown Ottawa (Carleton/uOttawa)',
    rent: 2100,
    bedrooms: 2,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'Carleton / uOttawa',
    walkMin: 22,
    address: 'Centretown, Ottawa, ON',
    amenities: ['Parking', 'Dishwasher', 'AC'],
    available: '2027-01-15',
  },
  {
    id: 4,
    title: 'Basement suite near U of T St. George',
    rent: 1650,
    bedrooms: 1,
    bathrooms: 1,
    type: 'basement',
    nearSchool: 'U of T',
    walkMin: 8,
    address: 'Annex, Toronto, ON',
    amenities: ['Transit 2 min', 'Laundry', 'Hydro included'],
    available: '2026-12-15',
  },
  {
    id: 5,
    title: '3BR student house — Plateau, Montréal (McGill)',
    rent: 2400,
    bedrooms: 3,
    bathrooms: 1,
    type: 'house',
    nearSchool: 'McGill',
    walkMin: 25,
    address: 'Plateau-Mont-Royal, Montréal, QC',
    amenities: ['Balcony', 'Dishwasher', 'Furnished'],
    available: '2027-05-01',
  },
  {
    id: 6,
    title: 'Studio — near University of Alberta',
    rent: 1100,
    bedrooms: 0,
    bathrooms: 1,
    type: 'apartment',
    nearSchool: 'UAlberta',
    walkMin: 10,
    address: 'Garneau, Edmonton, AB',
    amenities: ['Heat included', 'Gym access', 'Quiet building'],
    available: '2027-01-01',
  },
]

export default function HousingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span> › </span>
              <span aria-current="page">Housing</span>
            </nav>
            <h1 className={styles.h1}>
              Student Housing Near<br />
              <span className={styles.hi}>Your Campus</span>
            </h1>
            <p className={styles.sub}>Verified rentals near top Canadian schools. No fake listings.</p>
            <form className={styles.searchForm} role="search" action="/housing">
              <input
                type="search"
                name="q"
                placeholder="Search by school, city, or neighbourhood…"
                className={styles.searchInput}
                aria-label="Search housing"
              />
              <select className={styles.select} aria-label="Bedrooms">
                <option value="">Bedrooms</option>
                <option value="0">Studio</option>
                <option value="1">1 BR</option>
                <option value="2">2 BR</option>
                <option value="3">3+ BR</option>
              </select>
              <button type="submit" className={styles.searchBtn}>Search</button>
            </form>
          </div>
        </section>

        <section className={styles.listings}>
          <div className={styles.inner}>
            <div className={styles.topRow}>
              <p className={styles.count}>{LISTINGS.length} listings near popular schools</p>
              <Link href="/signup" className={styles.alertBtn}>🔔 Set rent alerts →</Link>
            </div>
            <div className={styles.grid}>
              {LISTINGS.map((l) => (
                <div key={l.id} className={styles.card}>
                  <div className={styles.cardImg}>
                    <div className={styles.imgPlaceholder}>{l.type === 'shared' ? '🏠' : l.type === 'apartment' ? '🏢' : l.type === 'basement' ? '🏡' : '🏘️'}</div>
                    <span className={styles.typePill}>{l.type}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span className={styles.rent}>${l.rent.toLocaleString()}<span className={styles.perMo}>/mo</span></span>
                      <span className={styles.nearSchool}>Near {l.nearSchool} · {l.walkMin} min walk</span>
                    </div>
                    <h2 className={styles.cardTitle}>{l.title}</h2>
                    <p className={styles.address}>{l.address}</p>
                    <div className={styles.specs}>
                      <span>{l.bedrooms === 0 ? 'Studio' : `${l.bedrooms} bed`}</span>
                      <span>·</span>
                      <span>{l.bathrooms} bath</span>
                    </div>
                    <div className={styles.amenities}>
                      {l.amenities.map((a) => <span key={a} className={styles.amenity}>{a}</span>)}
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.available}>Available {l.available}</span>
                      <Link href="/signup" className={styles.contactBtn}>Contact landlord →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.landlordCta}>
          <div className={styles.inner}>
            <div className={styles.landlordBox}>
              <div>
                <h2 className={styles.landlordH}>Are you a landlord?</h2>
                <p className={styles.landlordP}>List your property for free and reach thousands of verified students near your school.</p>
              </div>
              <Link href="/landlord" className={styles.landlordBtn}>List your property →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

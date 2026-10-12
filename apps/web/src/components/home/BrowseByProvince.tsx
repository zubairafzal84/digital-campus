import Link from 'next/link'
import styles from './BrowseByProvince.module.css'

const PROVINCES = [
  { code: 'ON', name: 'Ontario', count: 52, cities: 'Toronto · Ottawa · London' },
  { code: 'BC', name: 'British Columbia', count: 28, cities: 'Vancouver · Victoria · Kelowna' },
  { code: 'QC', name: 'Quebec', count: 44, cities: 'Montréal · Québec City · Sherbrooke' },
  { code: 'AB', name: 'Alberta', count: 19, cities: 'Edmonton · Calgary · Lethbridge' },
  { code: 'NS', name: 'Nova Scotia', count: 11, cities: 'Halifax · Sydney · Truro' },
  { code: 'MB', name: 'Manitoba', count: 9, cities: 'Winnipeg · Brandon' },
]

export function BrowseByProvince() {
  return (
    <section className={styles.section} aria-labelledby="prov-h">
      <div className={styles.inner}>
        <p className={styles.tag}>Browse by province</p>
        <h2 className={styles.h2} id="prov-h">Find schools near you.</h2>
        <p className={styles.sub}>Explore Canadian colleges and universities by province.</p>
        <div className={styles.grid}>
          {PROVINCES.map(({ code, name, count, cities }) => (
            <Link
              key={code}
              href={`/schools?province=${code}`}
              className={styles.card}
              aria-label={`Schools in ${name}`}
            >
              <div className={styles.name}>{name}</div>
              <div className={styles.count}>{count} schools</div>
              <div className={styles.cities}>{cities}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

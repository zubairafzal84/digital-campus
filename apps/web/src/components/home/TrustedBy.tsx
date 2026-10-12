import styles from './TrustedBy.module.css'

const SCHOOLS = [
  'SFU', 'UBC', 'UofT', 'McGill', 'uOttawa', 'TMU', 'Concordia',
  'Dalhousie', 'UAlberta', 'Western', "Queen's", 'Waterloo',
]

export function TrustedBy() {
  return (
    <section className={styles.bar} aria-label="Schools on Digital Kampus">
      <div className={styles.inner}>
        <span className={styles.label}>Students from</span>
        <ul className={styles.schools} role="list">
          {SCHOOLS.map((s) => (
            <li key={s} className={styles.school}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

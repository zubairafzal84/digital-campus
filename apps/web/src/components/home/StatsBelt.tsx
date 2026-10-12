import styles from './StatsBelt.module.css'

const STATS = [
  { num: '200+', label: 'Institutions' },
  { num: '$4.2B', label: 'Scholarships indexed' },
  { num: 'EN/FR', label: 'Fully bilingual' },
  { num: 'Free.', label: 'For students, always' },
]

export function StatsBelt() {
  return (
    <section className={styles.belt} aria-label="Platform stats">
      <div className={styles.inner}>
        {STATS.map(({ num, label }) => (
          <div key={label} className={styles.stat}>
            <div className={styles.num}>{num}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

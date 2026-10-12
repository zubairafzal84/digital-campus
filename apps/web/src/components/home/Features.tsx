import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '📖',
    title: 'Grade Tracker',
    body: 'Track every assessment, project your final grade, and stay on top of your GPA.',
  },
  {
    icon: '🤝',
    title: 'Clubs & Events',
    body: 'Find every student org on your campus. Join, RSVP, and run your own elections.',
  },
  {
    icon: '💸',
    title: 'Scholarships',
    body: 'Free matching and deadline alerts for thousands of grants and bursaries. Always free.',
  },
  {
    icon: '🏠',
    title: 'Student Housing',
    body: 'Verified listings near your campus from landlords who welcome students.',
  },
  {
    icon: '🛍',
    title: 'Student Deals',
    body: 'Local offers redeemable in-store via QR or online with one click.',
  },
  {
    icon: '🎓',
    title: 'School Profiles',
    body: 'Compare 200+ Canadian colleges and universities with verified programme data.',
  },
]

export function Features() {
  return (
    <section className={styles.section} aria-labelledby="features-h">
      <div className={styles.inner}>
        <p className={styles.tag}>Built for students</p>
        <h2 className={styles.h2} id="features-h">
          One place for everything campus.
        </h2>
        <p className={styles.sub}>
          Every tool your student life needs — built in, free, in English or French.
        </p>
        <div className={styles.grid}>
          {FEATURES.map(({ icon, title, body }) => (
            <article key={title} className={styles.card}>
              <div className={styles.ico} aria-hidden="true">
                {icon}
              </div>
              <h3 className={styles.cardH}>{title}</h3>
              <p className={styles.cardP}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import styles from './HowItWorks.module.css'

const STEPS = [
  {
    num: '01',
    title: 'Find your school',
    body: 'Search for your college or university and verify your student status in seconds.',
  },
  {
    num: '02',
    title: 'Set up your profile',
    body: 'Add your programme, year, and interests. We tailor everything to your campus.',
  },
  {
    num: '03',
    title: 'Explore and connect',
    body: 'Track grades, join clubs, apply to scholarships, and find housing — all in one place.',
  },
]

export function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-h">
      <div className={styles.inner}>
        <p className={styles.tag}>Getting started</p>
        <h2 className={styles.h2} id="how-h">You're three steps away.</h2>
        <div className={styles.grid}>
          {STEPS.map(({ num, title, body }) => (
            <div key={num} className={styles.step}>
              <div className={styles.num}>{num}</div>
              <h3 className={styles.stepH}>{title}</h3>
              <p className={styles.stepP}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

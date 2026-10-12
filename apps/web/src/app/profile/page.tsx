import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './profile.module.css'

export const metadata: Metadata = {
  title: 'Profile | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function ProfilePage() {
  return (
    <>
      <SiteNav />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.h1}>Your profile</h1>
          <p className={styles.sub}>Your profile is private. Only students you've connected with can see it.</p>

          <div className={styles.grid}>
            <aside className={styles.sidebar}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>AM</div>
                <button className={styles.changeAvatar}>Change photo</button>
              </div>
              <nav className={styles.profileNav}>
                {[
                  { label: 'Personal info', href: '#personal', active: true },
                  { label: 'Education', href: '#education' },
                  { label: 'Privacy', href: '#privacy' },
                  { label: 'Notifications', href: '#notifications' },
                  { label: 'Account & security', href: '#security' },
                ].map(({ label, href, active }) => (
                  <Link key={href} href={href} className={`${styles.navLink} ${active ? styles.navActive : ''}`}>{label}</Link>
                ))}
              </nav>
            </aside>

            <main className={styles.main}>
              <section className={styles.section} id="personal">
                <h2 className={styles.sectionH}>Personal information</h2>
                <form className={styles.form}>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>First name</label>
                      <input type="text" defaultValue="Alex" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Last name</label>
                      <input type="text" defaultValue="Martin" className={styles.input} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input type="email" defaultValue="alex.martin@student.ubc.ca" className={styles.input} readOnly />
                    <p className={styles.hint}>Your school email is used for verification only.</p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Preferred language</label>
                    <select className={styles.input}>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <button type="submit" className={styles.saveBtn}>Save changes</button>
                </form>
              </section>

              <section className={styles.section} id="education">
                <h2 className={styles.sectionH}>Education</h2>
                <form className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>School</label>
                    <input type="text" defaultValue="University of British Columbia" className={styles.input} readOnly />
                    <p className={styles.hint}>Contact support to change your institution.</p>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Programme</label>
                      <input type="text" defaultValue="BSc Computer Science" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Year</label>
                      <select className={styles.input} defaultValue="3">
                        <option value="1">1st year</option>
                        <option value="2">2nd year</option>
                        <option value="3">3rd year</option>
                        <option value="4">4th year</option>
                        <option value="grad">Graduate</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className={styles.saveBtn}>Save changes</button>
                </form>
              </section>

              <section className={styles.section} id="privacy">
                <h2 className={styles.sectionH}>Privacy</h2>
                <div className={styles.toggleList}>
                  {[
                    { label: 'Show my profile to other students', sub: 'Only students you\'ve connected with can message you.', on: true },
                    { label: 'Appear in campus search', sub: 'Students at your school can find your public profile.', on: false },
                    { label: 'Share grades with clubs', sub: 'Some clubs use GPA for eligibility checks.', on: false },
                  ].map(({ label, sub, on }) => (
                    <div key={label} className={styles.toggleRow}>
                      <div>
                        <p className={styles.toggleLabel}>{label}</p>
                        <p className={styles.toggleSub}>{sub}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={on}
                        className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
                      >
                        <span className={styles.toggleThumb} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className={styles.privacyNote}>
                  Your grades and private messages are never publicly indexed.
                  <Link href="/privacy" className={styles.inlineLink}> Privacy policy →</Link>
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

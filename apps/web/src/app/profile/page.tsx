import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SiteNav } from '@/components/layout/SiteNav'
import styles from './profile.module.css'

export const metadata: Metadata = {
  title: 'Profile | Digital Kampus',
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const user = await currentUser()

  const firstName   = user?.firstName ?? ''
  const lastName    = user?.lastName  ?? ''
  const email       = user?.emailAddresses?.[0]?.emailAddress ?? ''
  const avatarInitials = ((firstName[0] ?? '') + (lastName[0] ?? '')).toUpperCase() || 'DK'
  const avatarUrl   = user?.imageUrl

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
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={`${firstName} ${lastName}`} className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatar}>{avatarInitials}</div>
                )}
              </div>
              <nav className={styles.profileNav}>
                {[
                  { label: 'Personal info', href: '#personal', active: true },
                  { label: 'Education',     href: '#education' },
                  { label: 'Privacy',       href: '#privacy' },
                  { label: 'Notifications', href: '#notifications' },
                  { label: 'Account & security', href: '#security' },
                ].map(({ label, href, active }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${styles.navLink} ${active ? styles.navActive : ''}`}
                  >
                    {label}
                  </Link>
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
                      <input type="text" name="firstName" defaultValue={firstName} className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Last name</label>
                      <input type="text" name="lastName" defaultValue={lastName} className={styles.input} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input type="email" defaultValue={email} className={styles.input} readOnly />
                    <p className={styles.hint}>
                      Email is managed by your account provider.{' '}
                      <Link href="/dashboard" className={styles.inlineLink}>Manage account →</Link>
                    </p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Preferred language</label>
                    <select className={styles.input}>
                      <option value="en">English</option>
                      <option value="fr">Français (coming soon)</option>
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
                    <input type="text" placeholder="e.g. University of British Columbia" className={styles.input} />
                    <p className={styles.hint}>Contact support to change your institution after verification.</p>
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Programme</label>
                      <input type="text" placeholder="e.g. BSc Computer Science" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Year</label>
                      <select className={styles.input} defaultValue="1">
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
                    { label: 'Show my profile to other students', sub: "Only students you've connected with can message you.", on: true },
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

              <section className={styles.section} id="security">
                <h2 className={styles.sectionH}>Account &amp; security</h2>
                <p className={styles.hint}>
                  Password changes, connected social accounts, and two-factor authentication are managed
                  through your account provider.
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

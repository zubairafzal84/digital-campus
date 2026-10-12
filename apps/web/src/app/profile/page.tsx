import type { Metadata } from 'next'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SiteNav } from '@/components/layout/SiteNav'
import { PersonalInfoForm, EducationForm, PrivacyToggles } from './ProfileForms'
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
          <p className={styles.sub}>Your profile is private. Only students you&#39;ve connected with can see it.</p>

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
                  { label: 'Personal info',      href: '#personal' },
                  { label: 'Education',          href: '#education' },
                  { label: 'Privacy',            href: '#privacy' },
                  { label: 'Account & security', href: '#security' },
                ].map(({ label, href }) => (
                  <Link key={href} href={href} className={styles.navLink}>{label}</Link>
                ))}
              </nav>
            </aside>

            <main className={styles.main}>
              <section className={styles.section} id="personal">
                <h2 className={styles.sectionH}>Personal information</h2>
                <PersonalInfoForm firstName={firstName} lastName={lastName} email={email} />
              </section>

              <section className={styles.section} id="education">
                <h2 className={styles.sectionH}>Education</h2>
                <EducationForm isVerified={false} />
              </section>

              <section className={styles.section} id="privacy">
                <h2 className={styles.sectionH}>Privacy</h2>
                <PrivacyToggles isPublic={false} />
                <p className={styles.privacyNote}>
                  Your grades and private messages are never publicly indexed.{' '}
                  <Link href="/privacy" className={styles.inlineLink}>Privacy policy →</Link>
                </p>
              </section>

              <section className={styles.section} id="security">
                <h2 className={styles.sectionH}>Account &amp; security</h2>
                <p className={styles.hint}>
                  Password changes, connected social accounts, and two-factor authentication are managed
                  through your account provider (Clerk).
                </p>
                <a
                  href="https://accounts.clerk.com/user"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.saveBtn}
                  style={{ display: 'inline-block', marginTop: '12px', textDecoration: 'none' }}
                >
                  Manage account →
                </a>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

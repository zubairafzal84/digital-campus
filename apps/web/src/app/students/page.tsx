import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { createClient } from '@/lib/supabase/server'
import styles from './students.module.css'

export const metadata: Metadata = {
  title: 'Find Students | Digital Kampus',
  description:
    'Discover students at Canadian colleges and universities. Browse public profiles and send contact requests.',
  alternates: {
    canonical: 'https://digitalkampus.ca/students',
    languages: {
      'en-CA': 'https://digitalkampus.ca/students',
      'fr-CA': 'https://digitalkampus.ca/fr/etudiants',
    },
  },
  robots: { index: false }, // student directory: noindex until opted-in feature is confirmed
}

const INSTITUTIONS = [
  { slug: 'ubc', name: 'UBC' },
  { slug: 'sfu', name: 'SFU' },
  { slug: 'uoft', name: 'U of T' },
  { slug: 'mcgill', name: 'McGill' },
  { slug: 'uwaterloo', name: 'Waterloo' },
  { slug: 'queens', name: "Queen's" },
  { slug: 'ualberta', name: 'U of Alberta' },
  { slug: 'uvic', name: 'UVic' },
  { slug: 'dal', name: 'Dalhousie' },
  { slug: 'bcit', name: 'BCIT' },
  { slug: 'seneca', name: 'Seneca' },
  { slug: 'humber', name: 'Humber' },
]

/** Derive up to two uppercase initials from a display name or fallback string. */
function getInitials(displayName: string | null | undefined): string {
  if (!displayName) return '?'
  const parts = displayName.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

interface StudentProfile {
  account_id: string
  display_name: string | null
  programme: string | null
  year_of_study: number | null
  institution_name: string | null
}

interface PageProps {
  searchParams: Promise<{ institution?: string }>
}

export default async function StudentsPage({ searchParams }: PageProps) {
  const { institution: institutionFilter } = await searchParams

  const supabase = await createClient()

  let query = supabase
    .from('student_profiles')
    .select(`
      account_id,
      display_name,
      programme,
      year_of_study,
      institutions ( name_en )
    `)
    .eq('is_public', true)
    .limit(24)

  if (institutionFilter) {
    // Filter via the joined institutions table slug
    query = query.eq('institutions.slug', institutionFilter)
  }

  const { data: rows } = await query

  const students: StudentProfile[] = (rows ?? []).map((r: any) => ({
    account_id: r.account_id,
    display_name: r.display_name,
    programme: r.programme ?? null,
    year_of_study: r.year_of_study ?? null,
    institution_name: r.institutions?.name_en ?? null,
  }))

  const selectedInstitution = INSTITUTIONS.find(i => i.slug === institutionFilter)

  return (
    <>
      <SiteNav />
      <main className={styles.page}>
        {/* ── Header ─────────────────────────────────────── */}
        <header className={styles.header}>
          <h1 className={styles.h1}>Find Students</h1>
          <p className={styles.sub}>
            Browse public profiles from students across Canada. Send a contact
            request to connect.
          </p>
        </header>

        {/* ── Filter bar ─────────────────────────────────── */}
        <form
          className={styles.filterBar}
          method="GET"
          action="/students"
          aria-label="Filter students by institution"
        >
          <label htmlFor="institution-filter">Institution</label>
          <select
            id="institution-filter"
            name="institution"
            className={styles.select}
            defaultValue={institutionFilter ?? ''}
            aria-label="Filter by institution"
          >
            <option value="">All institutions</option>
            {INSTITUTIONS.map(({ slug, name }) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--purple)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Filter
          </button>
          {institutionFilter && (
            <Link
              href="/students"
              style={{
                fontSize: '0.875rem',
                color: 'var(--purple)',
                textDecoration: 'underline',
              }}
            >
              Clear
            </Link>
          )}
        </form>

        {/* ── Student grid ───────────────────────────────── */}
        <div className={styles.grid} role="list" aria-label="Student profiles">
          {students.length === 0 ? (
            <div className={styles.emptyState} role="listitem">
              <strong>No students found</strong>
              {institutionFilter && selectedInstitution ? (
                <p>
                  No public profiles at {selectedInstitution.name} yet.{' '}
                  <Link href="/students">View all students</Link>
                </p>
              ) : (
                <p>No public student profiles are available right now.</p>
              )}
            </div>
          ) : (
            students.map((student) => {
              const initials = getInitials(student.display_name)
              const label = student.display_name ?? 'Student'
              return (
                <article
                  key={student.account_id}
                  className={styles.card}
                  role="listitem"
                  aria-label={`${label}${student.institution_name ? ` at ${student.institution_name}` : ''}`}
                >
                  {/* Avatar */}
                  <div className={styles.cardAvatar} aria-hidden="true">
                    {initials}
                  </div>

                  {/* Body */}
                  <div className={styles.cardBody}>
                    <p className={styles.cardName}>{label}</p>

                    {student.institution_name && (
                      <p className={styles.cardInstitution}>
                        {student.institution_name}
                      </p>
                    )}

                    {student.programme && (
                      <p className={styles.cardProgramme}>
                        {student.programme}
                      </p>
                    )}

                    {student.year_of_study != null && (
                      <p className={styles.cardYear}>
                        Year {student.year_of_study}
                      </p>
                    )}
                  </div>

                  {/* Connect — requires auth; /profile is the starting point */}
                  <Link
                    href="/profile"
                    className={styles.connectBtn}
                    aria-label={`Connect with ${label} — sign in required`}
                    title="Sign in to send a contact request"
                  >
                    Connect
                  </Link>
                </article>
              )
            })
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import styles from './users.module.css'

export const metadata: Metadata = {
  title: 'Users | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getUserData() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const [{ data: profiles }, { data: verifications }] = await Promise.all([
    supabase
      .from('student_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('student_verifications')
      .select('account_id, status'),
  ])

  const verificationMap = new Map<string, string>()
  for (const v of verifications ?? []) {
    verificationMap.set(v.account_id, v.status)
  }

  return { profiles: profiles ?? [], verificationMap }
}

function truncateId(id: string) {
  return id.length > 16 ? id.slice(0, 16) + '…' : id
}

export default async function UsersPage() {
  const { profiles, verificationMap } = await getUserData()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Users</h1>
        <span className={styles.count}>{profiles.length} student profile{profiles.length !== 1 ? 's' : ''}</span>
      </header>

      <div className={styles.tableWrap}>
        {profiles.length === 0 ? (
          <div className={styles.empty}>No student profiles yet</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Programme</th>
                <th>Year of Study</th>
                <th>Language</th>
                <th>Public Profile</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => {
                const verStatus = verificationMap.get(profile.account_id)
                return (
                  <tr key={profile.account_id}>
                    <td className={styles.idCell} title={profile.account_id}>
                      {truncateId(profile.account_id)}
                    </td>
                    <td>{profile.programme ?? '—'}</td>
                    <td>{profile.year_of_study ?? '—'}</td>
                    <td>
                      {profile.preferred_language ? (
                        <span className={styles.typeChip}>{profile.preferred_language}</span>
                      ) : '—'}
                    </td>
                    <td>{profile.is_profile_public ? 'Yes' : 'No'}</td>
                    <td>
                      {verStatus === 'verified' ? (
                        <span className={styles.verified}>Verified</span>
                      ) : verStatus ? (
                        <span className={styles.pending}>Pending</span>
                      ) : (
                        <span className={styles.none}>None</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}

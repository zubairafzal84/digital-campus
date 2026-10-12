import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import styles from './scholarships.module.css'

export const metadata: Metadata = {
  title: 'Scholarships | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getScholarships() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const { data } = await supabase
    .from('scholarships')
    .select('id, name_en, amount_max, deadline_month, is_published, created_at')
    .order('name_en')
    .limit(200)

  return data ?? []
}

export default async function ScholarshipsAdminPage() {
  const scholarships = await getScholarships()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Scholarships</h1>
        <div className={styles.actions}>
          <span className={styles.count}>{scholarships.length} total</span>
          <Link href="/scholarships/new" className={styles.addBtn}>+ Add scholarship</Link>
        </div>
      </header>

      {scholarships.length === 0 ? (
        <div className={styles.empty}>
          <p>No scholarships in the database yet.</p>
          <p className={styles.emptyHint}>The web app uses static scholarship data; add records here to enable dynamic matching.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount (max)</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((s) => (
                <tr key={s.id} style={{ cursor: 'pointer' }}>
                  <td className={styles.nameCell}>
                    <Link href={`/scholarships/${s.id}`} className={styles.rowLink}>{s.name_en}</Link>
                  </td>
                  <td>{s.amount_max ? `$${Number(s.amount_max).toLocaleString()}` : '—'}</td>
                  <td>{s.deadline_month ?? '—'}</td>
                  <td>
                    <span className={s.is_published ? styles.published : styles.draft}>
                      {s.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <Link href={`/scholarships/${s.id}`} className={styles.editLink}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

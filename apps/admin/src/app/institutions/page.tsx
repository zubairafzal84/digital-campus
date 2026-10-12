import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import styles from './institutions.module.css'

export const metadata: Metadata = {
  title: 'Institutions | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getInstitutions() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const { data } = await supabase
    .from('institutions')
    .select('id, name_en, province, type, is_published, created_at')
    .order('name_en')
    .limit(200)

  return data ?? []
}

const PROVINCE_LABEL: Record<string, string> = {
  BC: 'British Columbia', ON: 'Ontario', QC: 'Québec', AB: 'Alberta',
  NS: 'Nova Scotia', MB: 'Manitoba', SK: 'Saskatchewan', NB: 'New Brunswick',
  NL: 'Newfoundland', PE: 'PEI', NT: 'NWT', YT: 'Yukon', NU: 'Nunavut',
}

export default async function InstitutionsPage() {
  const institutions = await getInstitutions()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Institutions</h1>
        <div className={styles.actions}>
          <span className={styles.count}>{institutions.length} total</span>
          <Link href="/institutions/new" className={styles.addBtn}>+ Add institution</Link>
        </div>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Province</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.id}>
                <td className={styles.nameCell}>{inst.name_en}</td>
                <td>{PROVINCE_LABEL[inst.province] ?? inst.province}</td>
                <td>
                  <span className={styles.typeChip}>{inst.type}</span>
                </td>
                <td>
                  <span className={inst.is_published ? styles.published : styles.draft}>
                    {inst.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <Link href={`/institutions/${inst.id}`} className={styles.editLink}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

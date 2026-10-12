import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import styles from './enquiries.module.css'

export const metadata: Metadata = {
  title: 'Partner Enquiries | Admin',
  robots: { index: false, follow: false },
}

export const revalidate = 0

async function getEnquiries() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } },
  )

  const { data, error } = await supabase
    .from('partner_enquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return []
  return data ?? []
}

const TYPE_LABELS: Record<string, string> = {
  landlord: 'Landlord',
  employer: 'Employer',
  merchant: 'Merchant',
  club: 'Club',
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  reviewed: '#3b82f6',
  approved: '#10b981',
  rejected: '#ef4444',
}

export default async function PartnerEnquiriesPage() {
  const enquiries = await getEnquiries()

  const counts = enquiries.reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] ?? 0) + 1
    return acc
  }, {})

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Partner Enquiries</h1>
        <div className={styles.counts}>
          {Object.entries(counts).map(([type, n]) => (
            <span key={type} className={styles.countChip}>
              {TYPE_LABELS[type] ?? type}: {n}
            </span>
          ))}
        </div>
      </header>

      {enquiries.length === 0 ? (
        <p className={styles.empty}>No enquiries yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Key details</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => {
                const d = e.data as Record<string, string>
                const name = d.contactName ?? d.bizName ?? d.name ?? '—'
                const email = d.contactEmail ?? d.email ?? '—'
                return (
                  <tr key={e.id}>
                    <td>
                      <span className={styles.typeChip}>{TYPE_LABELS[e.type] ?? e.type}</span>
                    </td>
                    <td>
                      <span
                        className={styles.statusDot}
                        style={{ background: STATUS_COLORS[e.status] ?? '#9ca3af' }}
                      />
                      {e.status}
                    </td>
                    <td className={styles.dateCell}>
                      {new Date(e.created_at).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className={styles.detailCell}>
                      <strong>{name}</strong>
                      <span className={styles.emailSpan}>{email}</span>
                      {d.company && <span className={styles.extra}>{d.company}</span>}
                      {d.city && <span className={styles.extra}>{d.city}</span>}
                      {d.clubName && <span className={styles.extra}>{d.clubName}</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

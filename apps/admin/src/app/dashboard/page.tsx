import type { Metadata } from 'next'
import styles from './admin.module.css'

export const metadata: Metadata = { title: 'Dashboard' }

const STATS = [
  { label: 'Total students', value: '12,840', change: '+340 this week', color: 'var(--purple)' },
  { label: 'Active schools', value: '47', change: '+2 this month', color: 'var(--navy)' },
  { label: 'Scholarships matched', value: '4,210', change: 'This month', color: 'var(--green)' },
  { label: 'Pending verifications', value: '23', change: 'Needs review', color: 'var(--amber)' },
]

const RECENT_SCHOOLS = [
  { name: 'University of British Columbia', status: 'active', students: 3200 },
  { name: 'Simon Fraser University', status: 'active', students: 1840 },
  { name: 'McGill University', status: 'active', students: 2100 },
  { name: 'Carleton University', status: 'pending', students: 0 },
  { name: 'Concordia University', status: 'pending', students: 0 },
]

export default function AdminDashboard() {
  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <div className={styles.logoArea}>
          <span className={styles.logoMark}>DK</span>
          <span className={styles.logoLabel}>Admin</span>
        </div>
        <ul className={styles.navLinks}>
          {[
            { label: 'Dashboard', href: '/dashboard', active: true },
            { label: 'Schools', href: '/dashboard/schools' },
            { label: 'Students', href: '/dashboard/students' },
            { label: 'Scholarships', href: '/dashboard/scholarships' },
            { label: 'Housing', href: '/dashboard/housing' },
            { label: 'Verifications', href: '/dashboard/verifications' },
            { label: 'Settings', href: '/dashboard/settings' },
          ].map(({ label, href, active }) => (
            <li key={href}>
              <a href={href} className={`${styles.navLink} ${active ? styles.navActive : ''}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.h1}>Dashboard</h1>
            <p className={styles.sub}>Digital Kampus platform overview</p>
          </div>
          <span className={styles.dateBadge}>Oct 12, 2026</span>
        </div>

        <div className={styles.statGrid}>
          {STATS.map(({ label, value, change, color }) => (
            <div key={label} className={styles.statCard}>
              <p className={styles.statLabel}>{label}</p>
              <p className={styles.statValue} style={{ color }}>{value}</p>
              <p className={styles.statChange}>{change}</p>
            </div>
          ))}
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableH}>Schools</h2>
            <a href="/dashboard/schools" className={styles.tableLink}>View all →</a>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SCHOOLS.map(({ name, status, students }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${status === 'active' ? styles.statusActive : styles.statusPending}`}>
                      {status}
                    </span>
                  </td>
                  <td>{students > 0 ? students.toLocaleString() : '—'}</td>
                  <td>
                    <a href="#" className={styles.rowAction}>Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { template: '%s | DK Admin', default: 'Digital Kampus Admin' },
  robots: { index: false, follow: false },
}

const NAV = [
  { href: '/dashboard',          label: 'Overview',         icon: '◉' },
  { href: '/institutions',       label: 'Institutions',     icon: '🏛' },
  { href: '/scholarships',       label: 'Scholarships',     icon: '🎓' },
  { href: '/partner-enquiries',  label: 'Enquiries',        icon: '📬' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :root {
            --navy: #0A1F5D; --purple: #6B3EF2; --lav: #E9E2FF;
            --bg: #F1F5F9; --white: #ffffff; --border: #E2E8F0;
            --fg: #0F172A; --muted: #475569; --faint: #94A3B8;
            --green: #16A34A; --red: #EF4444; --amber: #D97706;
            --font: system-ui, -apple-system, sans-serif;
          }
          body { font-family: var(--font); background: var(--bg); color: var(--fg); display: flex; min-height: 100vh; }
          .admin-sidebar {
            width: 220px; min-height: 100vh; background: var(--navy); display: flex;
            flex-direction: column; flex-shrink: 0; padding: 0 0 24px;
          }
          .admin-wordmark {
            padding: 24px 20px 20px;
            font-weight: 900; font-size: 1rem; color: #fff; letter-spacing: -0.02em;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .admin-wordmark span { color: var(--lav); }
          .admin-nav { display: flex; flex-direction: column; gap: 2px; padding: 16px 12px; flex: 1; }
          .admin-link {
            display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px;
            color: rgba(255,255,255,0.65); font-size: 0.875rem; font-weight: 600;
            text-decoration: none; transition: background 0.12s, color 0.12s;
          }
          .admin-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
          .admin-main { flex: 1; min-width: 0; }
          @media (max-width: 640px) {
            body { flex-direction: column; }
            .admin-sidebar { width: 100%; min-height: auto; flex-direction: row; padding: 0; }
            .admin-wordmark { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.08); padding: 14px 16px; }
            .admin-nav { flex-direction: row; padding: 8px 12px; gap: 4px; flex-wrap: wrap; }
          }
        `}</style>
      </head>
      <body>
        <nav className="admin-sidebar" aria-label="Admin navigation">
          <div className="admin-wordmark">DK <span>Admin</span></div>
          <div className="admin-nav">
            {NAV.map(({ href, label, icon }) => (
              <Link key={href} href={href} className="admin-link">
                <span>{icon}</span>{label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="admin-main">{children}</div>
      </body>
    </html>
  )
}

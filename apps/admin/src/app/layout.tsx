import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { template: '%s | DK Admin', default: 'Digital Kampus Admin' },
  robots: { index: false, follow: false },
}

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
          body { font-family: var(--font); background: var(--bg); color: var(--fg); }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}

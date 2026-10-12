import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Survey Complete — Thank You | Digital Kampus',
  robots: { index: false },
}

/* ── Inline styles (minimal, no module import needed) ─────────────
   The completion page is a small focused screen. We inline the styles
   rather than importing another CSS module so the bundle stays lean.
── */

export default function SurveyCompletePage() {
  return (
    <>
      <style>{`
        .sv-complete-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg, #f8f7fe);
          padding: 40px 16px;
          font-family: var(--font-body, system-ui, sans-serif);
        }

        .sv-complete-card {
          background: var(--white, #ffffff);
          border: 1.5px solid var(--border, #e2dcfc);
          border-radius: 24px;
          padding: 56px 40px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 40px rgba(107, 62, 242, 0.08);
        }

        .sv-check-wrap {
          width: 80px;
          height: 80px;
          margin: 0 auto 28px;
        }

        .sv-check-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6B3EF2, #8B5CFF);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sv-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes sv-pop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .sv-check-icon {
          width: 38px;
          height: 38px;
          stroke: #ffffff;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: sv-draw 0.45s 0.3s ease forwards;
        }

        @keyframes sv-draw {
          to { stroke-dashoffset: 0; }
        }

        .sv-complete-title {
          font-family: var(--font-heading, system-ui, sans-serif);
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 900;
          color: var(--fg, #1a1a2e);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .sv-complete-sub {
          font-size: 16px;
          color: var(--muted, #5a5a7a);
          line-height: 1.65;
          margin-bottom: 32px;
        }

        .sv-reward-box {
          background: #dcfce7;
          border: 1px solid #86efac;
          border-radius: 14px;
          padding: 18px 22px;
          margin-bottom: 32px;
          text-align: left;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .sv-reward-box {
            background: rgba(21, 128, 61, 0.12);
            border-color: rgba(134, 239, 172, 0.25);
          }
        }

        :root[data-theme="dark"] .sv-reward-box {
          background: rgba(21, 128, 61, 0.12);
          border-color: rgba(134, 239, 172, 0.25);
        }

        .sv-reward-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #15803d;
          margin-bottom: 4px;
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .sv-reward-label { color: #4ade80; }
        }
        :root[data-theme="dark"] .sv-reward-label { color: #4ade80; }

        .sv-reward-desc {
          font-size: 14px;
          color: var(--fg, #1a1a2e);
          line-height: 1.55;
        }

        .sv-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sv-btn-primary {
          display: block;
          padding: 14px 24px;
          background: var(--purple, #6B3EF2);
          color: #ffffff;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s;
          text-align: center;
        }

        .sv-btn-primary:hover {
          background: #8B5CFF;
        }

        .sv-btn-secondary {
          display: block;
          padding: 12px 24px;
          background: transparent;
          color: var(--muted, #5a5a7a);
          border: 1.5px solid var(--border, #e2dcfc);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          text-align: center;
        }

        .sv-btn-secondary:hover {
          background: var(--lav, #E9E2FF);
          color: var(--purple, #6B3EF2);
          border-color: var(--purple, #6B3EF2);
        }

        @media (max-width: 480px) {
          .sv-complete-card {
            padding: 40px 24px;
          }
        }
      `}</style>

      <div className="sv-complete-page">
        <div className="sv-complete-card">
          {/* Animated checkmark */}
          <div className="sv-check-wrap" aria-hidden="true">
            <div className="sv-check-circle">
              <svg className="sv-check-icon" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <h1 className="sv-complete-title">
            Thank you for completing the survey!
          </h1>

          <p className="sv-complete-sub">
            Your response has been recorded. Your feedback helps shape products,
            services, and research that benefit Canadian students.
          </p>

          {/* Reward info — shown when there's a reward to claim.
              In production this would be populated from the survey record. */}
          {/* Uncomment and wire to survey.reward when API is live:
          {survey.reward && (
            <div className="sv-reward-box">
              <p className="sv-reward-label">Your reward</p>
              <p className="sv-reward-desc">
                🎁 {survey.reward} — the organizer will contact you via the email on your
                Digital Kampus profile within 5 business days.
              </p>
            </div>
          )} */}

          <div className="sv-actions">
            <Link href="/surveys" className="sv-btn-primary">
              Take another survey →
            </Link>
            <Link href="/dashboard" className="sv-btn-secondary">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import styles from './HomeFaq.module.css'

const FAQS = [
  {
    q: 'Is Digital Kampus free for students?',
    a: 'Yes — always. Every core student feature is free: grade tracking, clubs, scholarship matching, housing search, and deals. No hidden fees, no premium tier that locks basic tools.',
  },
  {
    q: 'Which Canadian schools are on Digital Kampus?',
    a: "We're launching with major universities and colleges across Ontario, British Columbia, Quebec, and Alberta — including SFU, UBC, UofT, McGill, uOttawa, and more. Don't see yours? Request it.",
  },
  {
    q: 'Is the platform available in French?',
    a: 'Yes. Digital Kampus is fully bilingual — English and Canadian French throughout. Switch languages anytime from any page.',
  },
  {
    q: 'Is my student data private?',
    a: 'Your grades, messages, and profile are never publicly indexed or shared. We comply with PIPEDA and Quebec Law 25. You control what others see.',
  },
  {
    q: 'How is scholarship matching different from other sites?',
    a: 'We match you based on your actual programme, school, province, and background — and we alert you before deadlines. No spam, no upselling. Matching is and always will be free.',
  },
]

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={styles.section} aria-labelledby="faq-h">
      <div className={styles.inner}>
        <p className={styles.tag}>Common questions</p>
        <h2 className={styles.h2} id="faq-h">Answers, right here.</h2>
        <div className={styles.list}>
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className={styles.item}>
              <button
                className={styles.q}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{q}</span>
                <span className={styles.icon} aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div className={styles.a} role="region">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

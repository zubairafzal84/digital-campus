'use client'

import { useState } from 'react'
import styles from './faq-accordion.module.css'

export interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <button
              className={styles.trigger}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className={styles.question}>{item.q}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={styles.panel}
              hidden={!isOpen}
            >
              <div className={styles.answer}>{item.a}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

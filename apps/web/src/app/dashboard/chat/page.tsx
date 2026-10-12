import type { Metadata } from 'next'
import styles from './chat.module.css'

export const metadata: Metadata = {
  title: 'Messages | Digital Kampus',
  robots: { index: false, follow: false },
}

const THREADS = [
  {
    id: '1',
    name: 'Jordan Lee',
    school: 'UBC',
    lastMsg: 'Are you going to the study session on Thursday?',
    time: '2m ago',
    unread: 2,
    connected: true,
  },
  {
    id: '2',
    name: 'Priya Nair',
    school: 'UBC',
    lastMsg: 'I found those notes from last week\'s lecture',
    time: '1h ago',
    unread: 0,
    connected: true,
  },
  {
    id: '3',
    name: 'Marcus Okafor',
    school: 'UBC',
    lastMsg: 'Hey! Loved your post about the hackathon.',
    time: '3h ago',
    unread: 1,
    connected: false,
  },
  {
    id: '4',
    name: 'Sofia Reyes',
    school: 'UBC',
    lastMsg: 'Thanks for the club recommendation!',
    time: 'Yesterday',
    unread: 0,
    connected: true,
  },
]

const ACTIVE = THREADS[0]

const MESSAGES = [
  { id: '1', from: 'them', text: 'Hey! Are you studying for the CPSC 310 midterm?', time: '10:02 AM' },
  { id: '2', from: 'me', text: 'Yeah just started going through the lecture notes', time: '10:05 AM' },
  { id: '3', from: 'them', text: 'Want to do a study session? I booked a room in IKB for Thursday 2–5pm', time: '10:06 AM' },
  { id: '4', from: 'me', text: 'That works! I\'ll bring the practice exams I found', time: '10:08 AM' },
  { id: '5', from: 'them', text: 'Are you going to the study session on Thursday?', time: '10:10 AM' },
]

export default function ChatPage() {
  return (
    <div className={styles.layout}>
      {/* Thread list */}
      <aside className={styles.threads}>
        <div className={styles.threadsHeader}>
          <h1 className={styles.h1}>Messages</h1>
        </div>
        <div className={styles.threadList}>
          {THREADS.map(t => (
            <div key={t.id} className={`${styles.thread} ${t.id === ACTIVE.id ? styles.threadActive : ''}`}>
              <div className={styles.threadAvatar}>{t.name.split(' ').map(n => n[0]).join('')}</div>
              <div className={styles.threadInfo}>
                <div className={styles.threadTop}>
                  <span className={styles.threadName}>{t.name}</span>
                  <span className={styles.threadTime}>{t.time}</span>
                </div>
                <span className={styles.threadMsg}>{t.lastMsg}</span>
              </div>
              {t.unread > 0 && <span className={styles.unreadBadge}>{t.unread}</span>}
            </div>
          ))}
        </div>
      </aside>

      {/* Active conversation */}
      <main className={styles.convo}>
        <div className={styles.convoHeader}>
          <div className={styles.convoAvatar}>{ACTIVE.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <p className={styles.convoName}>{ACTIVE.name}</p>
            <p className={styles.convoSchool}>{ACTIVE.school} · Connected</p>
          </div>
        </div>

        <div className={styles.messages}>
          {MESSAGES.map(m => (
            <div key={m.id} className={`${styles.bubble} ${m.from === 'me' ? styles.bubbleMe : styles.bubbleThem}`}>
              <p className={styles.bubbleText}>{m.text}</p>
              <span className={styles.bubbleTime}>{m.time}</span>
            </div>
          ))}
        </div>

        {ACTIVE.connected ? (
          <form className={styles.compose}>
            <input
              type="text"
              className={styles.composeInput}
              placeholder="Write a message…"
              autoComplete="off"
            />
            <button type="submit" className={styles.sendBtn} aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        ) : (
          <div className={styles.contactGate}>
            <p className={styles.gateText}>
              Accept {ACTIVE.name}&apos;s contact request to reply.
            </p>
            <div className={styles.gateBtns}>
              <button className={styles.acceptBtn}>Accept request</button>
              <button className={styles.declineBtn}>Decline</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

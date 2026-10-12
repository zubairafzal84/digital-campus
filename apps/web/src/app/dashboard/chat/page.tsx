import type { Metadata } from 'next'
import ChatClient from './ChatClient'

export const metadata: Metadata = {
  title: 'Messages | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function ChatPage() {
  return <ChatClient />
}

import type { Metadata } from 'next'
import GradeTracker from './GradeTracker'

export const metadata: Metadata = {
  title: 'Grades | Digital Kampus',
  robots: { index: false, follow: false },
}

export default function GradesPage() {
  return <GradeTracker />
}

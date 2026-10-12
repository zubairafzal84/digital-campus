import { NextResponse } from 'next/server'

// Sign-out is handled by Clerk's UserButton component.
export async function POST() {
  return NextResponse.json(
    { error: 'Sign-out is handled by Clerk. Call signOut() from @clerk/nextjs.' },
    { status: 410 },
  )
}

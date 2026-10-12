import { NextResponse } from 'next/server'

// Auth is handled by Clerk. This endpoint is no longer active.
export async function POST() {
  return NextResponse.json(
    { error: 'Authentication is handled by Clerk. Use the /login page.' },
    { status: 410 },
  )
}

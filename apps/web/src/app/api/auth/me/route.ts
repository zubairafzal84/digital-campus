import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/auth/me
// Returns the current user's Clerk userId, or null if not authenticated.
// Used by client components to check session state without a full page reload.
export async function GET() {
  const { userId } = await auth()
  return NextResponse.json({ userId: userId ?? null })
}

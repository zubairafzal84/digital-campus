import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const email = (form.get('email') as string | null)?.trim().toLowerCase()

  if (!email) {
    return NextResponse.redirect(new URL('/forgot-password?error=missing_email', request.url))
  }

  const supabase = await createClient()
  // Always redirect to confirm page even if email not found — don't leak user existence
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${new URL(request.url).origin}/api/auth/callback?type=recovery`,
  })

  return NextResponse.redirect(new URL('/forgot-password/confirm', request.url))
}

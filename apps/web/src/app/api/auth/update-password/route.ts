import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const password  = form.get('password')  as string | null
  const password2 = form.get('password2') as string | null

  if (!password || password.length < 8) {
    return NextResponse.redirect(new URL('/update-password?error=too_short', request.url))
  }
  if (password !== password2) {
    return NextResponse.redirect(new URL('/update-password?error=mismatch', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return NextResponse.redirect(new URL('/update-password?error=update_failed', request.url))
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}

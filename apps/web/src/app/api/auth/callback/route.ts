import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL('/login?error=exchange_failed', request.url))
  }

  // Password recovery links should go to the update-password page
  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/update-password', origin))
  }

  const redirectUrl = next.startsWith('/') ? `${origin}${next}` : origin
  return NextResponse.redirect(new URL(redirectUrl))
}

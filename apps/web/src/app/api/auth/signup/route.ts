import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.redirect(new URL('/signup?error=missing_fields', request.url))
  }

  if (password.length < 8) {
    return NextResponse.redirect(new URL('/signup?error=password_too_short', request.url))
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
      emailRedirectTo: `${request.nextUrl.origin}/api/auth/callback`,
    },
  })

  if (error) {
    const params = new URLSearchParams({ error: error.message })
    return NextResponse.redirect(new URL(`/signup?${params}`, request.url))
  }

  return NextResponse.redirect(new URL('/signup/confirm', request.url))
}

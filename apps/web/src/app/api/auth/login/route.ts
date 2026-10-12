import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = request.nextUrl.searchParams.get('next') ?? '/dashboard'

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?error=missing_fields', request.url))
  }

  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const params = new URLSearchParams({ error: 'invalid_credentials' })
    return NextResponse.redirect(new URL(`/login?${params}`, request.url))
  }

  return NextResponse.redirect(new URL(next, request.url))
}

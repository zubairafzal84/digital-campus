import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()

  const bizName = (form.get('bizName') as string | null)?.trim()
  const email   = (form.get('email')   as string | null)?.trim()

  if (!bizName || !email) {
    return NextResponse.redirect(new URL('/partners/merchants?error=missing_fields', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.from('partner_enquiries').insert({
    type: 'merchant',
    data: {
      bizName,
      email,
      category: form.get('category') ?? null,
      offer:    form.get('offer')    ?? null,
    },
  })

  if (error) {
    console.error('merchant enquiry insert error', error.message)
    return NextResponse.redirect(new URL('/partners/merchants?error=server', request.url))
  }

  return NextResponse.redirect(new URL('/partners/thank-you?type=merchant', request.url))
}

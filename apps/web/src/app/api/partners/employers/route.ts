import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()

  const contactName = (form.get('contactName') as string | null)?.trim()
  const email       = (form.get('email')       as string | null)?.trim()
  const company     = (form.get('company')     as string | null)?.trim()

  if (!contactName || !email || !company) {
    return NextResponse.redirect(new URL('/partners/employers?error=missing_fields', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.from('partner_enquiries').insert({
    type: 'employer',
    data: {
      contactName,
      email,
      company,
      size:  form.get('size')  ?? null,
      roles: form.get('roles') ?? null,
    },
  })

  if (error) {
    console.error('employer enquiry insert error', error.message)
    return NextResponse.redirect(new URL('/partners/employers?error=server', request.url))
  }

  return NextResponse.redirect(new URL('/partners/thank-you?type=employer', request.url))
}

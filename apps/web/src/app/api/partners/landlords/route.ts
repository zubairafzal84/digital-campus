import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()

  const name  = (form.get('name')  as string | null)?.trim()
  const email = (form.get('email') as string | null)?.trim()
  const city  = (form.get('city')  as string | null)?.trim()

  if (!name || !email || !city) {
    return NextResponse.redirect(new URL('/partners/landlords?error=missing_fields', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.from('partner_enquiries').insert({
    type: 'landlord',
    data: { name, email, city, units: form.get('units') ?? null },
  })

  if (error) {
    console.error('landlord enquiry insert error', error.message)
    return NextResponse.redirect(new URL('/partners/landlords?error=server', request.url))
  }

  return NextResponse.redirect(new URL('/partners/thank-you?type=landlord', request.url))
}

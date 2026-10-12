import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()

  const clubName    = (form.get('clubName')    as string | null)?.trim()
  const school      = (form.get('school')      as string | null)?.trim()
  const category    = (form.get('category')    as string | null)?.trim()
  const contactName = (form.get('contactName') as string | null)?.trim()
  const contactEmail= (form.get('contactEmail')as string | null)?.trim()
  const description = (form.get('description') as string | null)?.trim()

  if (!clubName || !school || !category || !contactName || !contactEmail || !description) {
    return NextResponse.redirect(new URL('/clubs/register?error=missing_fields', request.url))
  }

  // Basic school-email domain check — must look like an institutional address
  if (!contactEmail.includes('.') || contactEmail.includes('+')) {
    return NextResponse.redirect(new URL('/clubs/register?error=invalid_email', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.from('partner_enquiries').insert({
    type: 'club',
    data: {
      clubName,
      school,
      category,
      members:      form.get('members')      ?? null,
      description,
      meetSchedule: form.get('meetSchedule') ?? null,
      website:      form.get('website')      ?? null,
      contactName,
      contactEmail,
    },
  })

  if (error) {
    console.error('club register insert error', error.message)
    return NextResponse.redirect(new URL('/clubs/register?error=server', request.url))
  }

  return NextResponse.redirect(new URL('/clubs/register/success', request.url))
}

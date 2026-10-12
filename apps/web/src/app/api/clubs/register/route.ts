import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { clubName, school, category, description } = body

  if (!clubName || !school || !category || !description) {
    return NextResponse.json(
      { error: 'clubName, school, category, and description are required.' },
      { status: 400 }
    )
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('partner_enquiries').insert({
      type: 'club',
      data: body,
      status: 'pending',
    })

    if (error) {
      console.error('[clubs/register] DB error:', error)
      return NextResponse.json({ error: 'Database error.' }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: 'Club registration submitted.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[clubs/register] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

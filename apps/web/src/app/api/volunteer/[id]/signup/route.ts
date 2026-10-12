import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Params) {
  const supabase = await createClient()
  const { id: opportunity_id } = await params

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  // Check opportunity exists and is published
  const { data: opp, error: oppError } = await supabase
    .from('volunteer_opportunities')
    .select('id, spots_available, spots_filled, is_published')
    .eq('id', opportunity_id)
    .single()

  if (oppError || !opp) {
    return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 })
  }

  if (!opp.is_published) {
    return NextResponse.json({ error: 'Opportunity is not available' }, { status: 403 })
  }

  const { message } = await req.json().catch(() => ({ message: '' }))

  // Determine status: waitlisted if no spots left
  const spotsLeft = opp.spots_available != null
    ? opp.spots_available - (opp.spots_filled ?? 0)
    : Infinity

  const status = spotsLeft <= 0 ? 'waitlisted' : 'pending'

  const { data, error } = await supabase
    .from('volunteer_signups')
    .insert({
      opportunity_id,
      user_id: user.id,
      message: message ?? null,
      status,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already signed up for this opportunity' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Increment spots_filled
  if (status === 'pending') {
    await supabase.rpc('increment_spots_filled', { opp_id: opportunity_id }).maybeSingle()
  }

  return NextResponse.json({ signup: data }, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const supabase = await createClient()
  const { id: opportunity_id } = await params

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const { error } = await supabase
    .from('volunteer_signups')
    .delete()
    .eq('opportunity_id', opportunity_id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

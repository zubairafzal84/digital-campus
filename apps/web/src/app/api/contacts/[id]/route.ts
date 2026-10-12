import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { action } = body

  if (action !== 'accept' && action !== 'decline') {
    return NextResponse.json(
      { error: 'action must be "accept" or "decline"' },
      { status: 400 }
    )
  }

  const { id } = await params
  const supabase = await createClient()

  const { data: contactRequest, error: fetchError } = await supabase
    .from('contact_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !contactRequest) {
    return NextResponse.json({ error: 'Contact request not found' }, { status: 404 })
  }

  if (contactRequest.recipient_id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const newStatus = action === 'accept' ? 'accepted' : 'declined'

  const { error: updateError } = await supabase
    .from('contact_requests')
    .update({ status: newStatus })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

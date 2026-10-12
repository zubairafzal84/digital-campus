import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('conversations')
    .select('id, participant_ids, last_message_at, created_at')
    .contains('participant_ids', [userId])
    .order('last_message_at', { ascending: false, nullsFirst: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const conversations = (data ?? []).map((row) => {
    const otherUserId = (row.participant_ids as string[]).find((id) => id !== userId) ?? null
    return {
      id: row.id,
      otherUserId,
      lastMessageAt: row.last_message_at,
      createdAt: row.created_at,
    }
  })

  return NextResponse.json(conversations)
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { contact_request_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { contact_request_id } = body
  if (!contact_request_id) {
    return NextResponse.json({ error: 'contact_request_id is required' }, { status: 400 })
  }

  const supabase = await createClient()

  // Verify the contact request exists, is accepted, and the current user is a participant
  const { data: contactRequest, error: crError } = await supabase
    .from('contact_requests')
    .select('id, sender_id, recipient_id, status')
    .eq('id', contact_request_id)
    .single()

  if (crError || !contactRequest) {
    return NextResponse.json({ error: 'Contact request not found' }, { status: 404 })
  }

  if (contactRequest.status !== 'accepted') {
    return NextResponse.json(
      { error: 'Contact request must be accepted before starting a conversation' },
      { status: 403 },
    )
  }

  if (contactRequest.sender_id !== userId && contactRequest.recipient_id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const participantIds = [contactRequest.sender_id, contactRequest.recipient_id]

  // Check if a conversation already exists for this contact request
  const { data: existing, error: existingError } = await supabase
    .from('conversations')
    .select('id')
    .eq('contact_request_id', contact_request_id)
    .maybeSingle()

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 })
  }

  if (existing) {
    return NextResponse.json(
      { error: 'A conversation already exists for this contact request', id: existing.id },
      { status: 409 },
    )
  }

  const { data: conversation, error: insertError } = await supabase
    .from('conversations')
    .insert({
      participant_ids: participantIds,
      contact_request_id,
    })
    .select('id')
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ id: conversation.id }, { status: 201 })
}

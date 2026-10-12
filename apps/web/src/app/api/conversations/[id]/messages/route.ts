import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const MAX_BODY_LENGTH = 4000

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = await createClient()

  // Verify the user is a participant in this conversation
  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .select('id, participant_ids')
    .eq('id', id)
    .single()

  if (convError || !conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
  }

  if (!(conversation.participant_ids as string[]).includes(userId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('id, sender_id, body, sent_at')
    .eq('conversation_id', id)
    .order('sent_at', { ascending: true })

  if (msgError) {
    return NextResponse.json({ error: msgError.message }, { status: 500 })
  }

  const result = (messages ?? []).map((m) => ({
    id: m.id,
    senderId: m.sender_id,
    body: m.body,
    sentAt: m.sent_at,
  }))

  return NextResponse.json(result)
}

export async function POST(request: Request, { params }: RouteContext) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = await createClient()

  // Verify the user is a participant in this conversation
  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .select('id, participant_ids')
    .eq('id', id)
    .single()

  if (convError || !conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
  }

  if (!(conversation.participant_ids as string[]).includes(userId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: { body?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const messageBody = body.body
  if (typeof messageBody !== 'string' || messageBody.trim().length === 0) {
    return NextResponse.json({ error: 'body must be a non-empty string' }, { status: 400 })
  }
  if (messageBody.length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: `body must not exceed ${MAX_BODY_LENGTH} characters` },
      { status: 400 },
    )
  }

  const { data: message, error: insertError } = await supabase
    .from('messages')
    .insert({
      conversation_id: id,
      sender_id: userId,
      body: messageBody,
    })
    .select('id, sent_at')
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // Update last_message_at on the conversation
  await supabase
    .from('conversations')
    .update({ last_message_at: message.sent_at })
    .eq('id', id)

  return NextResponse.json({ id: message.id, sentAt: message.sent_at }, { status: 201 })
}

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { recipient_id } = body

  if (!recipient_id) {
    return NextResponse.json({ error: 'recipient_id is required' }, { status: 400 })
  }

  if (recipient_id === userId) {
    return NextResponse.json({ error: 'Cannot send contact request to yourself' }, { status: 400 })
  }

  const supabase = await createClient()

  const { error } = await supabase.from('contact_requests').insert({
    sender_id: userId,
    recipient_id,
    status: 'pending',
    created_at: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  const { data: sent, error: sentError } = await supabase
    .from('contact_requests')
    .select('*')
    .eq('sender_id', userId)

  if (sentError) {
    return NextResponse.json({ error: sentError.message }, { status: 500 })
  }

  const { data: received, error: receivedError } = await supabase
    .from('contact_requests')
    .select('*')
    .eq('recipient_id', userId)

  if (receivedError) {
    return NextResponse.json({ error: receivedError.message }, { status: 500 })
  }

  return NextResponse.json({ sent, received })
}

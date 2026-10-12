import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// POST /api/events/[id]/rsvp
// Auth required. RSVP to an event. Body: { status: 'going' | 'maybe' | 'not_going' }
// Upserts the RSVP so toggling works.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: eventId } = await params
  const body = await request.json().catch(() => null)
  const status = body?.status

  if (!status || !['going', 'maybe', 'not_going'].includes(status)) {
    return NextResponse.json(
      { error: 'status must be one of: going, maybe, not_going' },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  // Verify the event exists and is published
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, max_attendees, current_attendees')
    .eq('id', eventId)
    .eq('is_published', true)
    .single()

  if (eventError || !event) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  }

  // Check capacity for 'going' RSVPs
  if (
    status === 'going' &&
    event.max_attendees !== null &&
    event.current_attendees >= event.max_attendees
  ) {
    return NextResponse.json({ error: 'This event is at full capacity.' }, { status: 409 })
  }

  // Upsert the RSVP
  const { data: rsvp, error: rsvpError } = await supabase
    .from('event_rsvps')
    .upsert(
      { event_id: eventId, user_id: userId, status },
      { onConflict: 'event_id,user_id' },
    )
    .select('id, status')
    .single()

  if (rsvpError) {
    return NextResponse.json({ error: rsvpError.message }, { status: 500 })
  }

  return NextResponse.json({ rsvp }, { status: 200 })
}

// DELETE /api/events/[id]/rsvp
// Auth required. Cancel RSVP.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { id: eventId } = await params
  const supabase = await createClient()

  const { error } = await supabase
    .from('event_rsvps')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

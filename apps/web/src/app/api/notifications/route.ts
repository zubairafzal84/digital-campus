import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, title, body, action_url, is_read, created_at')
    .eq('account_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const notifications = (data ?? []).map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    actionUrl: n.action_url,
    isRead: n.is_read,
    createdAt: n.created_at,
  }))

  return NextResponse.json(notifications)
}

export async function PATCH(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const supabase = await createClient()

  if (body.all === true) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('account_id', userId)
      .eq('is_read', false)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  const ids: string[] = body.ids
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'Provide ids array or all: true' }, { status: 400 })
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .in('id', ids)
    .eq('account_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

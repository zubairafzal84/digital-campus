import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/surveys/mine
// Returns all surveys created by the authenticated user (any status).
// Used by the organization survey dashboard.
export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('surveys')
    .select(`
      id,
      title,
      description,
      organization_name,
      status,
      reward_description,
      estimated_minutes,
      closes_at,
      max_participants,
      current_participants,
      created_at,
      tags,
      is_featured,
      plan
    `)
    .eq('created_by', userId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ surveys: data ?? [] })
}

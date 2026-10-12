import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const supabase = await createClient()

  const { data: professor, error: professorError } = await supabase
    .from('professors')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (professorError) {
    if (professorError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Professor not found' }, { status: 404 })
    }
    return NextResponse.json({ error: professorError.message }, { status: 500 })
  }

  const { data: ratings, error: ratingsError } = await supabase
    .from('professor_ratings')
    .select('*')
    .eq('professor_id', id)
    .order('created_at', { ascending: false })

  if (ratingsError) {
    return NextResponse.json({ error: ratingsError.message }, { status: 500 })
  }

  return NextResponse.json({ professor, ratings: ratings ?? [] })
}

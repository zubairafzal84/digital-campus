-- Social Events: privacy controls, categories, comments
-- Extends the events table and adds event_comments.

-- ---- Extend events ----

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS visibility text
    CHECK (visibility IN ('public','friends','private','unlisted'))
    DEFAULT 'public';

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS event_category text
    CHECK (event_category IN (
      'watch_party','study_session','pickup_game','potluck',
      'hiking','gaming','movie','music','campus_tour','cultural','other'
    ))
    DEFAULT 'other';

-- share_token: random hex for unlisted share links
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS share_token text
    UNIQUE DEFAULT encode(gen_random_bytes(8), 'hex');

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS cover_emoji text DEFAULT '🎉';

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT ARRAY[]::text[];

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS comments_enabled boolean DEFAULT true;

-- Back-fill share_token for existing rows that got NULL (DEFAULT only applies to new rows)
UPDATE events SET share_token = encode(gen_random_bytes(8), 'hex') WHERE share_token IS NULL;

CREATE INDEX IF NOT EXISTS events_visibility_idx      ON events (visibility);
CREATE INDEX IF NOT EXISTS events_event_category_idx  ON events (event_category);

-- ---- event_comments ----

CREATE TABLE IF NOT EXISTS event_comments (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id   uuid        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id    text        NOT NULL,
  content    text        NOT NULL CHECK (char_length(content) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS event_comments_event_id_idx ON event_comments (event_id);
CREATE INDEX IF NOT EXISTS event_comments_user_id_idx  ON event_comments (user_id);

ALTER TABLE event_comments ENABLE ROW LEVEL SECURITY;

-- Public events: anyone can read comments
CREATE POLICY "public_read_comments_on_public_events"
  ON event_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_comments.event_id
        AND e.visibility = 'public'
        AND e.is_published = true
    )
  );

-- Unlisted events: anyone with access (RLS on events handles this)
CREATE POLICY "read_comments_on_unlisted_events"
  ON event_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_comments.event_id
        AND e.visibility = 'unlisted'
        AND e.is_published = true
    )
  );

-- Auth users can read comments on events they created (private events)
CREATE POLICY "creator_read_comments"
  ON event_comments
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_comments.event_id
        AND e.created_by = auth.uid()::text
    )
  );

-- Auth users can read their own comments regardless of event visibility
CREATE POLICY "user_read_own_comments"
  ON event_comments
  FOR SELECT
  USING (user_id = auth.uid()::text);

-- Authenticated users can post comments
CREATE POLICY "auth_insert_comment"
  ON event_comments
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()::text
  );

-- Users can delete their own comments
CREATE POLICY "user_delete_own_comment"
  ON event_comments
  FOR DELETE
  USING (user_id = auth.uid()::text);

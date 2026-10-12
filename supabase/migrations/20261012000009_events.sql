-- Campus Events Calendar
-- Students discover and RSVP to events. Organizers can be clubs, schools, or companies.

-- ---- events ----
CREATE TABLE IF NOT EXISTS events (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title              text        NOT NULL,
  description        text,
  event_type         text        NOT NULL DEFAULT 'other'
                       CHECK (event_type IN (
                         'academic','social','sports','arts','career','volunteer','frosh','other'
                       )),
  school_slug        text,
  club_id            text,
  organizer_name     text,
  location           text,
  is_online          boolean     NOT NULL DEFAULT false,
  online_url         text,
  starts_at          timestamptz NOT NULL,
  ends_at            timestamptz,
  max_attendees      int,
  current_attendees  int         NOT NULL DEFAULT 0,
  is_free            boolean     NOT NULL DEFAULT true,
  price_cents        int         NOT NULL DEFAULT 0,
  image_url          text,
  created_by         text,
  is_published       boolean     NOT NULL DEFAULT true,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_starts_at_idx    ON events (starts_at);
CREATE INDEX IF NOT EXISTS events_school_slug_idx  ON events (school_slug);
CREATE INDEX IF NOT EXISTS events_event_type_idx   ON events (event_type);
CREATE INDEX IF NOT EXISTS events_is_published_idx ON events (is_published);

-- ---- event_rsvps ----
CREATE TABLE IF NOT EXISTS event_rsvps (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id   uuid        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id    text        NOT NULL,
  status     text        NOT NULL DEFAULT 'going'
               CHECK (status IN ('going','maybe','not_going')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);

CREATE INDEX IF NOT EXISTS event_rsvps_event_id_idx ON event_rsvps (event_id);
CREATE INDEX IF NOT EXISTS event_rsvps_user_id_idx  ON event_rsvps (user_id);

-- ---- Trigger: maintain current_attendees count ----
CREATE OR REPLACE FUNCTION update_event_attendees()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    IF NEW.status = 'going' THEN
      UPDATE events SET current_attendees = current_attendees + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF (TG_OP = 'UPDATE') THEN
    IF OLD.status != 'going' AND NEW.status = 'going' THEN
      UPDATE events SET current_attendees = current_attendees + 1 WHERE id = NEW.event_id;
    ELSIF OLD.status = 'going' AND NEW.status != 'going' THEN
      UPDATE events SET current_attendees = GREATEST(0, current_attendees - 1) WHERE id = NEW.event_id;
    END IF;
  ELSIF (TG_OP = 'DELETE') THEN
    IF OLD.status = 'going' THEN
      UPDATE events SET current_attendees = GREATEST(0, current_attendees - 1) WHERE id = OLD.event_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS trg_event_rsvp_attendees ON event_rsvps;
CREATE TRIGGER trg_event_rsvp_attendees
  AFTER INSERT OR UPDATE OR DELETE ON event_rsvps
  FOR EACH ROW EXECUTE FUNCTION update_event_attendees();

-- ---- Row Level Security ----
ALTER TABLE events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- events: anyone can read published events
CREATE POLICY "public_read_published_events"
  ON events
  FOR SELECT
  USING (is_published = true);

-- events: creator can read their own events (including unpublished)
CREATE POLICY "creator_read_own_events"
  ON events
  FOR SELECT
  USING (created_by = auth.uid()::text);

-- events: authenticated users can insert events
CREATE POLICY "auth_insert_event"
  ON events
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()::text
  );

-- events: creator can update their own events
CREATE POLICY "creator_update_event"
  ON events
  FOR UPDATE
  USING (created_by = auth.uid()::text)
  WITH CHECK (created_by = auth.uid()::text);

-- events: creator can delete their own events
CREATE POLICY "creator_delete_event"
  ON events
  FOR DELETE
  USING (created_by = auth.uid()::text);

-- event_rsvps: users can read their own RSVPs
CREATE POLICY "user_read_own_rsvps"
  ON event_rsvps
  FOR SELECT
  USING (user_id = auth.uid()::text);

-- event_rsvps: anyone can read rsvp counts (aggregate) — individual rsvps limited to own
-- event organizer can see attendee list
CREATE POLICY "organizer_read_event_rsvps"
  ON event_rsvps
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_rsvps.event_id
        AND e.created_by = auth.uid()::text
    )
  );

-- event_rsvps: authenticated users can insert their own RSVP
CREATE POLICY "user_insert_own_rsvp"
  ON event_rsvps
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()::text
  );

-- event_rsvps: users can update their own RSVP
CREATE POLICY "user_update_own_rsvp"
  ON event_rsvps
  FOR UPDATE
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- event_rsvps: users can delete their own RSVP
CREATE POLICY "user_delete_own_rsvp"
  ON event_rsvps
  FOR DELETE
  USING (user_id = auth.uid()::text);

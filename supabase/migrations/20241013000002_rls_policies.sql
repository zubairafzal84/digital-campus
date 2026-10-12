-- RLS policies for Digital Kampus
-- Requires the schema migration (000001) to have run first.

-- ============================================================
-- student_profiles
-- ============================================================
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Students can read their own profile
CREATE POLICY "student_profiles_select_own"
  ON public.student_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Students can read profiles of users they are connected with
CREATE POLICY "student_profiles_select_connected"
  ON public.student_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.contact_requests cr
      WHERE cr.status = 'accepted'
        AND (
          (cr.sender_id = auth.uid() AND cr.recipient_id = student_profiles.user_id)
          OR
          (cr.recipient_id = auth.uid() AND cr.sender_id = student_profiles.user_id)
        )
    )
  );

-- Students can update only their own profile
CREATE POLICY "student_profiles_update_own"
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Students can insert their own profile (one per user)
CREATE POLICY "student_profiles_insert_own"
  ON public.student_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- contact_requests
-- ============================================================
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Users see requests they sent or received
CREATE POLICY "contact_requests_select"
  ON public.contact_requests FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can create requests where they are the sender
CREATE POLICY "contact_requests_insert"
  ON public.contact_requests FOR INSERT
  WITH CHECK (auth.uid() = sender_id AND sender_id <> recipient_id);

-- Recipients can accept or decline; senders can cancel (update status)
CREATE POLICY "contact_requests_update"
  ON public.contact_requests FOR UPDATE
  USING (auth.uid() = recipient_id OR auth.uid() = sender_id);

-- ============================================================
-- conversations
-- ============================================================
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Only participants can see a conversation
CREATE POLICY "conversations_select"
  ON public.conversations FOR SELECT
  USING (auth.uid() = participant_a OR auth.uid() = participant_b);

-- Only participants can update (e.g. mark read)
CREATE POLICY "conversations_update"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = participant_a OR auth.uid() = participant_b);

-- ============================================================
-- messages
-- ============================================================
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Only participants of the parent conversation can read messages
CREATE POLICY "messages_select"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
    )
  );

-- Only the sender can insert a message
CREATE POLICY "messages_insert"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
    )
  );

-- ============================================================
-- notifications
-- ============================================================
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "notifications_update_own"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- enrolments
-- ============================================================
ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrolments_select_own"
  ON public.enrolments FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "enrolments_insert_own"
  ON public.enrolments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- ============================================================
-- assessments
-- ============================================================
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assessments_select_own"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrolments e
      WHERE e.id = assessments.enrolment_id
        AND e.student_id = auth.uid()
    )
  );

-- ============================================================
-- scholarship_matches
-- ============================================================
ALTER TABLE public.scholarship_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "scholarship_matches_select_own"
  ON public.scholarship_matches FOR SELECT
  USING (auth.uid() = student_id);

-- Service role / edge functions write matches; students can only read
-- ============================================================
-- verifications (student email verification records)
-- ============================================================
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "verifications_select_own"
  ON public.verifications FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================
-- Schools and scholarships are public read-only
-- ============================================================
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schools_select_public"
  ON public.schools FOR SELECT
  USING (status = 'active');

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "scholarships_select_public"
  ON public.scholarships FOR SELECT
  USING (true);

-- ============================================================
-- Clubs are public read, insert requires auth
-- ============================================================
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clubs_select_public"
  ON public.clubs FOR SELECT
  USING (status = 'active');

CREATE POLICY "clubs_insert_auth"
  ON public.clubs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

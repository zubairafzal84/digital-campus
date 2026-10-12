-- RLS policies for Digital Kampus
-- Matches table names in 20261012000001_initial_schema.sql

-- ============================================================
-- student_profiles  (private — own + accepted contacts only)
-- ============================================================
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sp_select_own"
  ON public.student_profiles FOR SELECT
  USING (auth.uid() = account_id);

CREATE POLICY "sp_select_connected"
  ON public.student_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.contact_requests cr
      WHERE cr.status = 'accepted'
        AND (
          (cr.sender_id = auth.uid() AND cr.recipient_id = student_profiles.account_id)
          OR
          (cr.recipient_id = auth.uid() AND cr.sender_id = student_profiles.account_id)
        )
    )
  );

CREATE POLICY "sp_update_own"
  ON public.student_profiles FOR UPDATE
  USING (auth.uid() = account_id)
  WITH CHECK (auth.uid() = account_id);

CREATE POLICY "sp_insert_own"
  ON public.student_profiles FOR INSERT
  WITH CHECK (auth.uid() = account_id);

-- ============================================================
-- contact_requests
-- ============================================================
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cr_select"
  ON public.contact_requests FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "cr_insert"
  ON public.contact_requests FOR INSERT
  WITH CHECK (auth.uid() = sender_id AND sender_id <> recipient_id);

CREATE POLICY "cr_update"
  ON public.contact_requests FOR UPDATE
  USING (auth.uid() = recipient_id OR auth.uid() = sender_id);

-- ============================================================
-- conversations  (private to participants)
-- ============================================================
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conv_select"
  ON public.conversations FOR SELECT
  USING (auth.uid() = participant_a OR auth.uid() = participant_b);

CREATE POLICY "conv_update"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = participant_a OR auth.uid() = participant_b);

-- ============================================================
-- messages
-- ============================================================
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "msg_select"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
    )
  );

CREATE POLICY "msg_insert"
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

CREATE POLICY "notif_select_own"
  ON public.notifications FOR SELECT
  USING (auth.uid() = account_id);

CREATE POLICY "notif_update_own"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = account_id);

-- ============================================================
-- enrolments
-- ============================================================
ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrol_select_own"
  ON public.enrolments FOR SELECT
  USING (auth.uid() = (SELECT account_id FROM student_profiles WHERE id = student_id));

-- ============================================================
-- assessments
-- ============================================================
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "assess_select_own"
  ON public.assessments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrolments e
      JOIN public.student_profiles sp ON sp.id = e.student_id
      WHERE e.id = assessments.enrolment_id
        AND sp.account_id = auth.uid()
    )
  );

-- ============================================================
-- scholarship_matches
-- ============================================================
ALTER TABLE public.scholarship_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_select_own"
  ON public.scholarship_matches FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM student_profiles WHERE account_id = auth.uid()
    )
  );

-- ============================================================
-- student_verifications
-- ============================================================
ALTER TABLE public.student_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sv_select_own"
  ON public.student_verifications FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM student_profiles WHERE account_id = auth.uid()
    )
  );

-- ============================================================
-- Institutions: public read of published institutions
-- ============================================================
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inst_select_public"
  ON public.institutions FOR SELECT
  USING (is_published = true);

-- ============================================================
-- Scholarships: public read of published scholarships
-- ============================================================
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sch_select_public"
  ON public.scholarships FOR SELECT
  USING (is_published = true);

-- ============================================================
-- Clubs: public read of published clubs
-- ============================================================
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clubs_select_public"
  ON public.clubs FOR SELECT
  USING (is_published = true);

CREATE POLICY "clubs_insert_auth"
  ON public.clubs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================
-- Programmes: public read of published programmes
-- ============================================================
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prog_select_public"
  ON public.programmes FOR SELECT
  USING (is_published = true);

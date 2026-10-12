-- Additional RLS policies for Digital Kampus
-- Adds Clerk-compatible (::text cast) policies for conversations, messages,
-- notifications, and contact_requests.
--
-- Note: auth.uid() in Supabase returns a uuid type, but Clerk populates
-- the JWT sub claim as a text string (e.g. "user_2abc..."). Casting
-- auth.uid()::text ensures comparisons work against text-typed FK columns.

-- ============================================================
-- conversations
-- ============================================================

-- Allow a user to start a conversation when they are one of the participants.
-- Complements the existing conv_update policy with text-cast version for Clerk.
CREATE POLICY "Participants can create conversation"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid()::text = ANY(participant_ids::text[]));

-- Allow participants to update last_message_at (Clerk-compatible text cast).
-- Complements the existing conv_update SELECT-based policy.
CREATE POLICY "Participants can update conversation"
  ON public.conversations FOR UPDATE
  USING (auth.uid()::text = ANY(participant_ids::text[]));

-- ============================================================
-- messages
-- ============================================================

-- Allow conversation participants to insert messages.
-- Uses participant_ids array for Clerk-compatible lookup.
CREATE POLICY "Participants can insert message"
  ON public.messages FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id
      FROM public.conversations
      WHERE auth.uid()::text = ANY(participant_ids::text[])
    )
  );

-- Allow the original sender to soft-delete their own message (set is_deleted=true).
CREATE POLICY "Sender can delete own message"
  ON public.messages FOR UPDATE
  USING (sender_id = auth.uid()::text);

-- ============================================================
-- notifications
-- ============================================================

-- Allow service-role or system context to insert notifications on behalf of users.
-- The service role bypasses RLS; this INSERT policy covers any edge case
-- where notifications are inserted within a user session context.
CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (account_id = auth.uid()::text);

-- ============================================================
-- contact_requests
-- ============================================================

-- Allow a student to send a contact request where they are the sender.
-- Clerk-compatible text-cast version alongside the existing cr_insert policy.
CREATE POLICY "Student can send contact request"
  ON public.contact_requests FOR INSERT
  WITH CHECK (sender_id = auth.uid()::text);

-- Allow a recipient to accept or decline an incoming contact request.
-- Clerk-compatible text-cast version alongside the existing cr_update policy.
CREATE POLICY "Recipient can respond to contact request"
  ON public.contact_requests FOR UPDATE
  USING (recipient_id = auth.uid()::text);

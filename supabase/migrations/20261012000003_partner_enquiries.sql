-- Partner and club registration enquiries
-- Stores interest form submissions pending admin review

CREATE TABLE public.partner_enquiries (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT NOT NULL CHECK (type IN ('landlord', 'employer', 'merchant', 'club')),
  data       JSONB NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.partner_enquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert (submit a form), but cannot read rows
CREATE POLICY "enquiry_insert_public"
  ON public.partner_enquiries FOR INSERT
  WITH CHECK (true);

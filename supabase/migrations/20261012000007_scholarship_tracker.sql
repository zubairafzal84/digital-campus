-- Scholarship application tracker + saved items
-- auth.uid() returns the Clerk user ID as text via the JWT sub claim

-- ────────────────────────────────────────────────────────────────────
-- scholarship_applications
-- ────────────────────────────────────────────────────────────────────
create table if not exists public.scholarship_applications (
  id                uuid        default gen_random_uuid() primary key,
  student_id        text        not null,
  scholarship_id    text        not null,
  scholarship_name  text        not null,
  amount_max        int,
  status            text        not null default 'bookmarked'
                    check (status in ('bookmarked','in_progress','submitted','awarded','rejected')),
  deadline_date     date,
  notes             text,
  applied_at        timestamptz,
  created_at        timestamptz not null default now(),
  unique (student_id, scholarship_id)
);

alter table public.scholarship_applications enable row level security;

create policy "Student can select own applications"
  on public.scholarship_applications for select
  using (student_id = auth.uid()::text);

create policy "Student can insert own applications"
  on public.scholarship_applications for insert
  with check (student_id = auth.uid()::text);

create policy "Student can update own applications"
  on public.scholarship_applications for update
  using (student_id = auth.uid()::text);

create policy "Student can delete own applications"
  on public.scholarship_applications for delete
  using (student_id = auth.uid()::text);

-- ────────────────────────────────────────────────────────────────────
-- saved_items  (generic bookmark table)
-- ────────────────────────────────────────────────────────────────────
create table if not exists public.saved_items (
  id          uuid  default gen_random_uuid() primary key,
  user_id     text  not null,
  item_type   text  not null
              check (item_type in ('scholarship','housing','club','job','professor')),
  item_id     text  not null,
  item_title  text,
  item_url    text,
  created_at  timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

alter table public.saved_items enable row level security;

create policy "User can select own saved items"
  on public.saved_items for select
  using (user_id = auth.uid()::text);

create policy "User can insert own saved items"
  on public.saved_items for insert
  with check (user_id = auth.uid()::text);

create policy "User can update own saved items"
  on public.saved_items for update
  using (user_id = auth.uid()::text);

create policy "User can delete own saved items"
  on public.saved_items for delete
  using (user_id = auth.uid()::text);

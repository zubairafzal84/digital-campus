-- Digital Kampus — Initial Schema
-- All 42 entities; bilingual; PIPEDA / Quebec Law 25 compliant

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";           -- fuzzy search
create extension if not exists "unaccent";           -- bilingual search
create extension if not exists "postgis" schema extensions;  -- geo (housing)

-- ─── Enums ───────────────────────────────────────────────────────────────────
create type user_role as enum (
  'superadmin','trust_safety','verification','editorial_seo','finance',
  'support','institution_rep','club_admin','student',
  'merchant_admin','merchant_staff','landlord','employer'
);
create type verification_status as enum ('pending','verified','rejected','expired');
create type institution_type as enum ('university','college','cegep','polytechnic');
create type programme_level as enum (
  'certificate','diploma','bachelor','graduate_certificate',
  'master','doctoral','post_doctoral'
);
create type programme_delivery as enum ('in_person','online','hybrid');
create type term_type as enum ('fall','winter','spring','summer');
create type assessment_type as enum (
  'assignment','quiz','midterm','final','project','lab','presentation','participation'
);
create type club_category as enum (
  'academic','cultural','sports','arts','political','religious',
  'professional','social','service','technology','other'
);
create type event_type as enum ('general','academic','social','career','sports','cultural','fundraiser');
create type scholarship_type as enum ('scholarship','bursary','grant','award','fellowship');
create type scholarship_funder as enum ('institution','government','private','foundation','external');
create type housing_type as enum ('apartment','room','house','condo','basement','townhouse');
create type listing_status as enum ('draft','active','paused','expired','rented');
create type merchant_category as enum (
  'food_drink','retail','health_wellness','technology','services',
  'entertainment','travel','other'
);
create type deal_type as enum ('percent_off','fixed_off','bogo','free_item','special_price');
create type job_type as enum ('full_time','part_time','co_op','internship','contract','volunteer');
create type notification_type as enum (
  'assignment_due','exam_reminder','scholarship_deadline','club_event',
  'housing_match','new_deal','grade_posted','message','system'
);
create type language as enum ('en','fr');
create type province as enum (
  'AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'
);

-- ─── Institutions ─────────────────────────────────────────────────────────────
create table institutions (
  id                       uuid primary key default uuid_generate_v4(),
  slug                     text not null unique,
  name_en                  text not null,
  name_fr                  text,
  short_name               text not null,
  type                     institution_type not null,
  province                 province not null,
  city                     text not null,
  address                  text,
  postal_code              text,
  website_url              text,
  logo_url                 text,
  banner_url               text,
  description_en           text,
  description_fr           text,
  founded_year             int,
  total_enrolment          int,
  acceptance_rate          numeric(5,2),
  qs_ranking               int,
  macleans_ranking         int,
  domestic_tuition_min     numeric(10,2),
  domestic_tuition_max     numeric(10,2),
  international_tuition_min numeric(10,2),
  international_tuition_max numeric(10,2),
  is_verified              boolean not null default false,
  is_published             boolean not null default false,
  verified_at              timestamptz,
  data_source              text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);
create index on institutions (province);
create index on institutions (type);
create index on institutions using gin (name_en gin_trgm_ops);

-- ─── Campuses ────────────────────────────────────────────────────────────────
create table campuses (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid not null references institutions (id) on delete cascade,
  name_en         text not null,
  name_fr         text,
  address         text not null,
  city            text not null,
  province        province not null,
  postal_code     text,
  lat             double precision,
  lng             double precision,
  is_main         boolean not null default false,
  created_at      timestamptz not null default now()
);
create index on campuses (institution_id);

-- ─── Programmes ──────────────────────────────────────────────────────────────
create table programmes (
  id                          uuid primary key default uuid_generate_v4(),
  institution_id              uuid not null references institutions (id) on delete cascade,
  slug                        text not null,
  name_en                     text not null,
  name_fr                     text,
  level                       programme_level not null,
  delivery                    programme_delivery not null default 'in_person',
  duration_years              numeric(4,1),
  domestic_tuition_per_year   numeric(10,2),
  international_tuition_per_year numeric(10,2),
  description_en              text,
  description_fr              text,
  requirements_en             text,
  requirements_fr             text,
  co_op_available             boolean not null default false,
  is_published                boolean not null default false,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  unique (institution_id, slug)
);
create index on programmes (institution_id);
create index on programmes (level);
create index on programmes using gin (name_en gin_trgm_ops);

-- ─── Courses ─────────────────────────────────────────────────────────────────
create table courses (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid not null references institutions (id) on delete cascade,
  programme_id    uuid references programmes (id) on delete set null,
  code            text not null,
  name_en         text not null,
  name_fr         text,
  credits         numeric(4,1) not null default 3,
  description_en  text,
  description_fr  text,
  created_at      timestamptz not null default now(),
  unique (institution_id, code)
);
create index on courses (institution_id);
create index on courses (programme_id);

-- ─── Terms ───────────────────────────────────────────────────────────────────
create table terms (
  id                   uuid primary key default uuid_generate_v4(),
  institution_id       uuid not null references institutions (id) on delete cascade,
  type                 term_type not null,
  year                 int not null,
  start_date           date not null,
  end_date             date not null,
  registration_start   date,
  registration_end     date,
  created_at           timestamptz not null default now()
);
create index on terms (institution_id);

-- ─── Accounts ────────────────────────────────────────────────────────────────
-- Mirrors auth.users; never expose raw auth.users to clients
create table accounts (
  id                 uuid primary key references auth.users (id) on delete cascade,
  email              text not null,
  display_name       text not null,
  avatar_url         text,
  preferred_language language not null default 'en',
  roles              user_role[] not null default '{student}',
  is_active          boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ─── Student Profiles ─────────────────────────────────────────────────────────
-- Private by default — never publicly indexed
create table student_profiles (
  id                   uuid primary key default uuid_generate_v4(),
  account_id           uuid not null unique references accounts (id) on delete cascade,
  institution_id       uuid not null references institutions (id),
  campus_id            uuid references campuses (id),
  programme_id         uuid references programmes (id),
  student_id_number    text,          -- hashed with pgcrypto before insert
  year_of_study        int,
  expected_graduation  date,
  bio                  text,
  pronouns             text,
  is_public            boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
create index on student_profiles (institution_id);
-- Row-level security: only the owning account and admins can select private profiles
alter table student_profiles enable row level security;

create policy "Student can read own profile"
  on student_profiles for select
  using (account_id = auth.uid());

create policy "Student can update own profile"
  on student_profiles for update
  using (account_id = auth.uid());

create policy "Public profiles are visible to authenticated users"
  on student_profiles for select
  using (is_public = true and auth.role() = 'authenticated');

-- ─── Student Verification ────────────────────────────────────────────────────
create table student_verifications (
  id               uuid primary key default uuid_generate_v4(),
  account_id       uuid not null references accounts (id) on delete cascade,
  institution_id   uuid not null references institutions (id),
  method           text not null check (method in ('edu_email','student_card','institution_api')),
  status           verification_status not null default 'pending',
  submitted_at     timestamptz not null default now(),
  reviewed_at      timestamptz,
  reviewer_id      uuid references accounts (id),
  rejection_reason text,
  expires_at       timestamptz
);
create index on student_verifications (account_id);
create index on student_verifications (status);
alter table student_verifications enable row level security;

create policy "Student sees own verifications"
  on student_verifications for select
  using (account_id = auth.uid());

-- ─── Enrolments ──────────────────────────────────────────────────────────────
create table enrolments (
  id          uuid primary key default uuid_generate_v4(),
  student_id  uuid not null references student_profiles (id) on delete cascade,
  course_id   uuid not null references courses (id),
  term_id     uuid not null references terms (id),
  section     text,
  instructor  text,
  created_at  timestamptz not null default now(),
  unique (student_id, course_id, term_id)
);
create index on enrolments (student_id);
alter table enrolments enable row level security;
create policy "Student sees own enrolments"
  on enrolments for all using (
    student_id in (select id from student_profiles where account_id = auth.uid())
  );

-- ─── Assessments ─────────────────────────────────────────────────────────────
create table assessments (
  id            uuid primary key default uuid_generate_v4(),
  enrolment_id  uuid not null references enrolments (id) on delete cascade,
  name          text not null,
  type          assessment_type not null,
  weight        numeric(5,2) not null check (weight >= 0 and weight <= 100),
  score         numeric(6,2),
  max_score     numeric(6,2) not null default 100,
  due_date      timestamptz,
  submitted_at  timestamptz,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index on assessments (enrolment_id);
alter table assessments enable row level security;
create policy "Student sees own assessments"
  on assessments for all using (
    enrolment_id in (
      select e.id from enrolments e
      join student_profiles sp on sp.id = e.student_id
      where sp.account_id = auth.uid()
    )
  );

-- ─── Clubs ───────────────────────────────────────────────────────────────────
create table clubs (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid not null references institutions (id) on delete cascade,
  name            text not null,
  slug            text not null,
  category        club_category not null,
  description     text,
  logo_url        text,
  banner_url      text,
  website_url     text,
  email           text,
  is_verified     boolean not null default false,
  is_published    boolean not null default false,
  member_count    int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (institution_id, slug)
);
create index on clubs (institution_id);
create index on clubs (category);

create table club_memberships (
  id          uuid primary key default uuid_generate_v4(),
  club_id     uuid not null references clubs (id) on delete cascade,
  account_id  uuid not null references accounts (id) on delete cascade,
  role        text not null default 'member' check (role in ('member','executive','president')),
  joined_at   timestamptz not null default now(),
  unique (club_id, account_id)
);
create index on club_memberships (club_id);
create index on club_memberships (account_id);

-- ─── Events ──────────────────────────────────────────────────────────────────
create table events (
  id              uuid primary key default uuid_generate_v4(),
  club_id         uuid references clubs (id) on delete cascade,
  institution_id  uuid not null references institutions (id),
  title           text not null,
  type            event_type not null default 'general',
  description     text,
  location        text,
  starts_at       timestamptz not null,
  ends_at         timestamptz,
  is_online       boolean not null default false,
  meeting_url     text,
  max_attendees   int,
  is_published    boolean not null default false,
  created_by      uuid not null references accounts (id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on events (institution_id);
create index on events (starts_at);

create table event_rsvps (
  id          uuid primary key default uuid_generate_v4(),
  event_id    uuid not null references events (id) on delete cascade,
  account_id  uuid not null references accounts (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (event_id, account_id)
);

-- ─── Scholarships ────────────────────────────────────────────────────────────
-- Scholarship matching is always FREE to students (enforced at app layer)
create table scholarships (
  id                 uuid primary key default uuid_generate_v4(),
  institution_id     uuid references institutions (id),
  name_en            text not null,
  name_fr            text,
  type               scholarship_type not null,
  funder             scholarship_funder not null,
  funder_name        text not null,
  description_en     text not null,
  description_fr     text,
  amount_min         numeric(12,2),
  amount_max         numeric(12,2),
  is_renewable       boolean not null default false,
  deadline           date,
  application_url    text,
  eligibility_en     text,
  eligibility_fr     text,
  provinces          province[] not null default '{}',
  programme_ids      uuid[] not null default '{}',
  is_published       boolean not null default false,
  is_verified        boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index on scholarships (institution_id);
create index on scholarships (deadline);
create index on scholarships using gin (provinces);
create index on scholarships using gin (name_en gin_trgm_ops);

create table scholarship_matches (
  id              uuid primary key default uuid_generate_v4(),
  student_id      uuid not null references student_profiles (id) on delete cascade,
  scholarship_id  uuid not null references scholarships (id) on delete cascade,
  match_score     int not null check (match_score >= 0 and match_score <= 100),
  alerted_at      timestamptz,
  applied_at      timestamptz,
  created_at      timestamptz not null default now(),
  unique (student_id, scholarship_id)
);
alter table scholarship_matches enable row level security;
create policy "Student sees own matches"
  on scholarship_matches for select
  using (
    student_id in (select id from student_profiles where account_id = auth.uid())
  );

-- ─── Housing ─────────────────────────────────────────────────────────────────
create table landlord_profiles (
  id             uuid primary key default uuid_generate_v4(),
  account_id     uuid not null unique references accounts (id) on delete cascade,
  business_name  text,
  phone          text,
  verified_at    timestamptz,
  is_verified    boolean not null default false,
  created_at     timestamptz not null default now()
);

create table housing_listings (
  id                      uuid primary key default uuid_generate_v4(),
  landlord_id             uuid not null references landlord_profiles (id) on delete cascade,
  title                   text not null,
  type                    housing_type not null,
  address                 text not null,
  city                    text not null,
  province                province not null,
  postal_code             text not null,
  lat                     double precision,
  lng                     double precision,
  bedrooms                int not null,
  bathrooms               numeric(3,1) not null,
  rent_per_month          numeric(10,2) not null,
  available_from          date not null,
  lease_term_months       int,
  description             text,
  amenities               text[] not null default '{}',
  utilities_included      text[] not null default '{}',
  pets_allowed            boolean not null default false,
  furnished               boolean not null default false,
  images                  text[] not null default '{}',
  nearby_institutions     uuid[] not null default '{}',
  status                  listing_status not null default 'draft',
  is_student_friendly     boolean not null default true,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index on housing_listings (province, city);
create index on housing_listings (status);
create index on housing_listings using gin (nearby_institutions);

-- ─── Merchants & Deals ────────────────────────────────────────────────────────
create table merchant_profiles (
  id                   uuid primary key default uuid_generate_v4(),
  account_id           uuid not null unique references accounts (id) on delete cascade,
  business_name        text not null,
  category             merchant_category not null,
  description          text,
  logo_url             text,
  website_url          text,
  address              text,
  city                 text,
  province             province,
  phone                text,
  is_verified          boolean not null default false,
  subscription_active  boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table deals (
  id                      uuid primary key default uuid_generate_v4(),
  merchant_id             uuid not null references merchant_profiles (id) on delete cascade,
  title                   text not null,
  description             text not null,
  type                    deal_type not null,
  discount_value          numeric(10,2),
  original_price          numeric(10,2),
  deal_price              numeric(10,2),
  code                    text,
  qr_payload              text,
  terms                   text,
  image_url               text,
  eligible_institutions   uuid[] not null default '{}',
  starts_at               timestamptz,
  expires_at              timestamptz,
  max_redemptions         int,
  redemption_count        int not null default 0,
  is_published            boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index on deals (merchant_id);
create index on deals (expires_at);
create index on deals using gin (eligible_institutions);

create table deal_redemptions (
  id           uuid primary key default uuid_generate_v4(),
  deal_id      uuid not null references deals (id) on delete cascade,
  account_id   uuid not null references accounts (id) on delete cascade,
  redeemed_at  timestamptz not null default now(),
  unique (deal_id, account_id)
);

-- ─── Employers & Jobs ────────────────────────────────────────────────────────
create table employer_profiles (
  id            uuid primary key default uuid_generate_v4(),
  account_id    uuid not null unique references accounts (id) on delete cascade,
  company_name  text not null,
  industry      text,
  website_url   text,
  logo_url      text,
  description   text,
  is_verified   boolean not null default false,
  created_at    timestamptz not null default now()
);

create table job_postings (
  id                     uuid primary key default uuid_generate_v4(),
  employer_id            uuid not null references employer_profiles (id) on delete cascade,
  title                  text not null,
  type                   job_type not null,
  description            text not null,
  requirements           text,
  location               text,
  province               province,
  is_remote              boolean not null default false,
  salary_min             numeric(12,2),
  salary_max             numeric(12,2),
  application_url        text,
  apply_email            text,
  deadline               date,
  eligible_institutions  uuid[] not null default '{}',
  is_published           boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index on job_postings (type);
create index on job_postings (deadline);

-- ─── Messaging ────────────────────────────────────────────────────────────────
-- Contact request must be accepted before any 1:1 messaging
create table contact_requests (
  id            uuid primary key default uuid_generate_v4(),
  sender_id     uuid not null references accounts (id) on delete cascade,
  recipient_id  uuid not null references accounts (id) on delete cascade,
  message       text,
  status        text not null default 'pending' check (status in ('pending','accepted','declined')),
  created_at    timestamptz not null default now(),
  responded_at  timestamptz,
  check (sender_id <> recipient_id)
);
create index on contact_requests (recipient_id, status);
alter table contact_requests enable row level security;
create policy "See own contact requests"
  on contact_requests for select
  using (sender_id = auth.uid() or recipient_id = auth.uid());

create table conversations (
  id                  uuid primary key default uuid_generate_v4(),
  participant_ids     uuid[] not null,
  contact_request_id  uuid not null unique references contact_requests (id),
  created_at          timestamptz not null default now(),
  last_message_at     timestamptz
);
alter table conversations enable row level security;
create policy "Participants see conversation"
  on conversations for select
  using (auth.uid() = any(participant_ids));

create table messages (
  id               uuid primary key default uuid_generate_v4(),
  conversation_id  uuid not null references conversations (id) on delete cascade,
  sender_id        uuid not null references accounts (id),
  body             text not null,   -- encrypted at rest; E2EE not yet live
  is_deleted       boolean not null default false,
  sent_at          timestamptz not null default now()
);
create index on messages (conversation_id, sent_at desc);
alter table messages enable row level security;
create policy "Participants see messages"
  on messages for select
  using (
    conversation_id in (
      select id from conversations where auth.uid() = any(participant_ids)
    )
  );

-- ─── Notifications ────────────────────────────────────────────────────────────
create table notifications (
  id          uuid primary key default uuid_generate_v4(),
  account_id  uuid not null references accounts (id) on delete cascade,
  type        notification_type not null,
  title       text not null,
  body        text not null,
  action_url  text,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index on notifications (account_id, is_read, created_at desc);
alter table notifications enable row level security;
create policy "Account sees own notifications"
  on notifications for all using (account_id = auth.uid());

-- ─── updated_at triggers ─────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_institutions_updated before update on institutions
  for each row execute function set_updated_at();
create trigger trg_programmes_updated before update on programmes
  for each row execute function set_updated_at();
create trigger trg_accounts_updated before update on accounts
  for each row execute function set_updated_at();
create trigger trg_student_profiles_updated before update on student_profiles
  for each row execute function set_updated_at();
create trigger trg_assessments_updated before update on assessments
  for each row execute function set_updated_at();
create trigger trg_clubs_updated before update on clubs
  for each row execute function set_updated_at();
create trigger trg_events_updated before update on events
  for each row execute function set_updated_at();
create trigger trg_scholarships_updated before update on scholarships
  for each row execute function set_updated_at();
create trigger trg_housing_updated before update on housing_listings
  for each row execute function set_updated_at();
create trigger trg_merchant_updated before update on merchant_profiles
  for each row execute function set_updated_at();
create trigger trg_deals_updated before update on deals
  for each row execute function set_updated_at();
create trigger trg_jobs_updated before update on job_postings
  for each row execute function set_updated_at();

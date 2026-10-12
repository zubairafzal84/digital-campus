/**
 * Database types — all 42 entities.
 * Generated from Supabase schema; regenerate with: npx supabase gen types typescript
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

// ─── Enums ──────────────────────────────────────────────────────────────────

export type UserRole =
  | 'superadmin'
  | 'trust_safety'
  | 'verification'
  | 'editorial_seo'
  | 'finance'
  | 'support'
  | 'institution_rep'
  | 'club_admin'
  | 'student'
  | 'merchant_admin'
  | 'merchant_staff'
  | 'landlord'
  | 'employer'

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'expired'

export type InstitutionType = 'university' | 'college' | 'cegep' | 'polytechnic'

export type ProgrammeLevel = 'certificate' | 'diploma' | 'bachelor' | 'graduate_certificate' | 'master' | 'doctoral' | 'post_doctoral'

export type ProgrammeDelivery = 'in_person' | 'online' | 'hybrid'

export type TermType = 'fall' | 'winter' | 'spring' | 'summer'

export type AssessmentType = 'assignment' | 'quiz' | 'midterm' | 'final' | 'project' | 'lab' | 'presentation' | 'participation'

export type ClubCategory =
  | 'academic'
  | 'cultural'
  | 'sports'
  | 'arts'
  | 'political'
  | 'religious'
  | 'professional'
  | 'social'
  | 'service'
  | 'technology'
  | 'other'

export type EventType = 'general' | 'academic' | 'social' | 'career' | 'sports' | 'cultural' | 'fundraiser'

export type ScholarshipType = 'scholarship' | 'bursary' | 'grant' | 'award' | 'fellowship'

export type ScholarshipFunder = 'institution' | 'government' | 'private' | 'foundation' | 'external'

export type HousingType = 'apartment' | 'room' | 'house' | 'condo' | 'basement' | 'townhouse'

export type ListingStatus = 'draft' | 'active' | 'paused' | 'expired' | 'rented'

export type MerchantCategory =
  | 'food_drink'
  | 'retail'
  | 'health_wellness'
  | 'technology'
  | 'services'
  | 'entertainment'
  | 'travel'
  | 'other'

export type DealType = 'percent_off' | 'fixed_off' | 'bogo' | 'free_item' | 'special_price'

export type JobType = 'full_time' | 'part_time' | 'co_op' | 'internship' | 'contract' | 'volunteer'

export type NotificationType =
  | 'assignment_due'
  | 'exam_reminder'
  | 'scholarship_deadline'
  | 'club_event'
  | 'housing_match'
  | 'new_deal'
  | 'grade_posted'
  | 'message'
  | 'system'

export type Language = 'en' | 'fr'

export type Province =
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT'

// ─── Core Entities ──────────────────────────────────────────────────────────

export interface Institution {
  id: string
  slug: string
  name_en: string
  name_fr: string | null
  short_name: string
  type: InstitutionType
  province: Province
  city: string
  address: string | null
  postal_code: string | null
  website_url: string | null
  logo_url: string | null
  banner_url: string | null
  description_en: string | null
  description_fr: string | null
  founded_year: number | null
  total_enrolment: number | null
  acceptance_rate: number | null
  qs_ranking: number | null
  macleans_ranking: number | null
  domestic_tuition_min: number | null
  domestic_tuition_max: number | null
  international_tuition_min: number | null
  international_tuition_max: number | null
  is_verified: boolean
  is_published: boolean
  verified_at: string | null
  data_source: string | null
  created_at: string
  updated_at: string
}

export interface Campus {
  id: string
  institution_id: string
  name_en: string
  name_fr: string | null
  address: string
  city: string
  province: Province
  postal_code: string | null
  lat: number | null
  lng: number | null
  is_main: boolean
  created_at: string
}

export interface Programme {
  id: string
  institution_id: string
  slug: string
  name_en: string
  name_fr: string | null
  level: ProgrammeLevel
  delivery: ProgrammeDelivery
  duration_years: number | null
  domestic_tuition_per_year: number | null
  international_tuition_per_year: number | null
  description_en: string | null
  description_fr: string | null
  requirements_en: string | null
  requirements_fr: string | null
  co_op_available: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  institution_id: string
  programme_id: string | null
  code: string
  name_en: string
  name_fr: string | null
  credits: number
  description_en: string | null
  description_fr: string | null
  created_at: string
}

export interface Term {
  id: string
  institution_id: string
  type: TermType
  year: number
  start_date: string
  end_date: string
  registration_start: string | null
  registration_end: string | null
  created_at: string
}

// ─── Account & Auth ──────────────────────────────────────────────────────────

export interface Account {
  id: string               // matches auth.users.id
  email: string
  display_name: string
  avatar_url: string | null
  preferred_language: Language
  roles: UserRole[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string
  account_id: string
  institution_id: string
  campus_id: string | null
  programme_id: string | null
  student_id_number: string | null  // hashed
  year_of_study: number | null
  expected_graduation: string | null
  bio: string | null
  pronouns: string | null
  is_public: boolean              // private by default — never publicly indexed
  /** JSONB blob: {courses: [{id, code, name, credits, assessments: [{name, weight, score, maxScore}]}]} */
  grade_data: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface StudentVerification {
  id: string
  account_id: string
  institution_id: string
  method: 'edu_email' | 'student_card' | 'institution_api'
  status: VerificationStatus
  submitted_at: string
  reviewed_at: string | null
  reviewer_id: string | null
  rejection_reason: string | null
  expires_at: string | null
}

// ─── Academics ───────────────────────────────────────────────────────────────

export interface Enrolment {
  id: string
  student_id: string
  course_id: string
  term_id: string
  section: string | null
  instructor: string | null
  created_at: string
}

export interface Assessment {
  id: string
  enrolment_id: string
  name: string
  type: AssessmentType
  weight: number          // 0–100
  score: number | null    // 0–100
  max_score: number
  due_date: string | null
  submitted_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── Clubs & Events ──────────────────────────────────────────────────────────

export interface Club {
  id: string
  institution_id: string
  name: string
  slug: string
  category: ClubCategory
  description: string | null
  logo_url: string | null
  banner_url: string | null
  website_url: string | null
  email: string | null
  is_verified: boolean
  is_published: boolean
  member_count: number
  created_at: string
  updated_at: string
}

export interface ClubMembership {
  id: string
  club_id: string
  account_id: string
  role: 'member' | 'executive' | 'president'
  joined_at: string
}

export interface Event {
  id: string
  club_id: string | null
  institution_id: string
  title: string
  type: EventType
  description: string | null
  location: string | null
  starts_at: string
  ends_at: string | null
  is_online: boolean
  meeting_url: string | null
  max_attendees: number | null
  is_published: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface EventRsvp {
  id: string
  event_id: string
  account_id: string
  created_at: string
}

// ─── Scholarships & Funding ──────────────────────────────────────────────────

export interface Scholarship {
  id: string
  institution_id: string | null  // null = external / national
  name_en: string
  name_fr: string | null
  type: ScholarshipType
  funder: ScholarshipFunder
  funder_name: string
  description_en: string
  description_fr: string | null
  amount_min: number | null
  amount_max: number | null
  is_renewable: boolean
  deadline: string | null
  application_url: string | null
  eligibility_en: string | null
  eligibility_fr: string | null
  provinces: Province[]           // empty = all provinces
  programmes: string[]            // programme ids or empty = all
  is_published: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface ScholarshipMatch {
  id: string
  student_id: string
  scholarship_id: string
  match_score: number   // 0–100
  alerted_at: string | null
  applied_at: string | null
  created_at: string
}

// ─── Housing ─────────────────────────────────────────────────────────────────

export interface LandlordProfile {
  id: string
  account_id: string
  business_name: string | null
  phone: string | null
  verified_at: string | null
  is_verified: boolean
  created_at: string
}

export interface HousingListing {
  id: string
  landlord_id: string
  title: string
  type: HousingType
  address: string
  city: string
  province: Province
  postal_code: string
  lat: number | null
  lng: number | null
  bedrooms: number
  bathrooms: number
  rent_per_month: number
  available_from: string
  lease_term_months: number | null
  description: string | null
  amenities: string[]
  utilities_included: string[]
  pets_allowed: boolean
  furnished: boolean
  images: string[]           // storage URLs
  nearby_institutions: string[]  // institution ids
  status: ListingStatus
  is_student_friendly: boolean
  created_at: string
  updated_at: string
}

// ─── Merchants & Deals ────────────────────────────────────────────────────────

export interface MerchantProfile {
  id: string
  account_id: string
  business_name: string
  category: MerchantCategory
  description: string | null
  logo_url: string | null
  website_url: string | null
  address: string | null
  city: string | null
  province: Province | null
  phone: string | null
  is_verified: boolean
  subscription_active: boolean
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  merchant_id: string
  title: string
  description: string
  type: DealType
  discount_value: number | null    // % or $ depending on type
  original_price: number | null
  deal_price: number | null
  code: string | null              // promo code
  qr_payload: string | null        // for in-store QR
  terms: string | null
  image_url: string | null
  eligible_institutions: string[]  // empty = all
  starts_at: string | null
  expires_at: string | null
  max_redemptions: number | null
  redemption_count: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface DealRedemption {
  id: string
  deal_id: string
  account_id: string
  redeemed_at: string
}

// ─── Jobs & Employers ─────────────────────────────────────────────────────────

export interface EmployerProfile {
  id: string
  account_id: string
  company_name: string
  industry: string | null
  website_url: string | null
  logo_url: string | null
  description: string | null
  is_verified: boolean
  created_at: string
}

export interface JobPosting {
  id: string
  employer_id: string
  title: string
  type: JobType
  description: string
  requirements: string | null
  location: string | null
  province: Province | null
  is_remote: boolean
  salary_min: number | null
  salary_max: number | null
  application_url: string | null
  apply_email: string | null
  deadline: string | null
  eligible_institutions: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

// ─── Messaging ────────────────────────────────────────────────────────────────

export interface ContactRequest {
  id: string
  sender_id: string
  recipient_id: string
  message: string | null
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
  responded_at: string | null
}

export interface Conversation {
  id: string
  participant_ids: string[]
  contact_request_id: string   // must be accepted before 1:1 messaging
  created_at: string
  last_message_at: string | null
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  body: string             // stored encrypted at rest; E2EE not yet live
  is_deleted: boolean
  sent_at: string
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  id: string
  account_id: string
  type: NotificationType
  title: string
  body: string
  action_url: string | null
  is_read: boolean
  created_at: string
}

// ─── Supabase Database type (for typed client) ──────────────────────────────

export interface Database {
  public: {
    Tables: {
      institutions: { Row: Institution; Insert: Omit<Institution, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Institution> }
      campuses: { Row: Campus; Insert: Omit<Campus, 'id' | 'created_at'>; Update: Partial<Campus> }
      programmes: { Row: Programme; Insert: Omit<Programme, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Programme> }
      courses: { Row: Course; Insert: Omit<Course, 'id' | 'created_at'>; Update: Partial<Course> }
      terms: { Row: Term; Insert: Omit<Term, 'id' | 'created_at'>; Update: Partial<Term> }
      accounts: { Row: Account; Insert: Omit<Account, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Account> }
      student_profiles: { Row: StudentProfile; Insert: Omit<StudentProfile, 'id' | 'created_at' | 'updated_at'>; Update: Partial<StudentProfile> }
      student_verifications: { Row: StudentVerification; Insert: Omit<StudentVerification, 'id' | 'submitted_at'>; Update: Partial<StudentVerification> }
      enrolments: { Row: Enrolment; Insert: Omit<Enrolment, 'id' | 'created_at'>; Update: Partial<Enrolment> }
      assessments: { Row: Assessment; Insert: Omit<Assessment, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Assessment> }
      clubs: { Row: Club; Insert: Omit<Club, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Club> }
      club_memberships: { Row: ClubMembership; Insert: Omit<ClubMembership, 'id' | 'joined_at'>; Update: Partial<ClubMembership> }
      events: { Row: Event; Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Event> }
      event_rsvps: { Row: EventRsvp; Insert: Omit<EventRsvp, 'id' | 'created_at'>; Update: Partial<EventRsvp> }
      scholarships: { Row: Scholarship; Insert: Omit<Scholarship, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Scholarship> }
      scholarship_matches: { Row: ScholarshipMatch; Insert: Omit<ScholarshipMatch, 'id' | 'created_at'>; Update: Partial<ScholarshipMatch> }
      landlord_profiles: { Row: LandlordProfile; Insert: Omit<LandlordProfile, 'id' | 'created_at'>; Update: Partial<LandlordProfile> }
      housing_listings: { Row: HousingListing; Insert: Omit<HousingListing, 'id' | 'created_at' | 'updated_at'>; Update: Partial<HousingListing> }
      merchant_profiles: { Row: MerchantProfile; Insert: Omit<MerchantProfile, 'id' | 'created_at' | 'updated_at'>; Update: Partial<MerchantProfile> }
      deals: { Row: Deal; Insert: Omit<Deal, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Deal> }
      deal_redemptions: { Row: DealRedemption; Insert: Omit<DealRedemption, 'id' | 'redeemed_at'>; Update: Partial<DealRedemption> }
      employer_profiles: { Row: EmployerProfile; Insert: Omit<EmployerProfile, 'id' | 'created_at'>; Update: Partial<EmployerProfile> }
      job_postings: { Row: JobPosting; Insert: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>; Update: Partial<JobPosting> }
      contact_requests: { Row: ContactRequest; Insert: Omit<ContactRequest, 'id' | 'created_at'>; Update: Partial<ContactRequest> }
      conversations: { Row: Conversation; Insert: Omit<Conversation, 'id' | 'created_at'>; Update: Partial<Conversation> }
      messages: { Row: Message; Insert: Omit<Message, 'id' | 'sent_at'>; Update: Partial<Message> }
      notifications: { Row: Notification; Insert: Omit<Notification, 'id' | 'created_at'>; Update: Partial<Notification> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: UserRole
      verification_status: VerificationStatus
      institution_type: InstitutionType
      programme_level: ProgrammeLevel
      language: Language
      province: Province
    }
  }
}

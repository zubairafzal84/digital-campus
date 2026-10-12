-- Digital Kampus seed data
-- Matches the schema in 20261012000001_initial_schema.sql

-- ============================================================
-- Institutions
-- ============================================================
INSERT INTO public.institutions (
  id, slug, name_en, name_fr, short_name, type, province, city,
  website_url, founded_year, total_enrolment, acceptance_rate,
  domestic_tuition_min, domestic_tuition_max,
  international_tuition_min, international_tuition_max,
  is_verified, is_published
)
VALUES
  (gen_random_uuid(), 'ubc',   'University of British Columbia', 'Université de la Colombie-Britannique', 'UBC', 'university', 'BC', 'Vancouver', 'https://ubc.ca', 1908, 66000, 52, 6571, 7571, 39271, 41271, true, true),
  (gen_random_uuid(), 'sfu',   'Simon Fraser University',        'Université Simon Fraser',                'SFU', 'university', 'BC', 'Burnaby',   'https://sfu.ca', 1965, 37000, 65, 6282, 7282, 26082, 28082, true, true),
  (gen_random_uuid(), 'uoft',  'University of Toronto',          'Université de Toronto',                  'UofT','university', 'ON', 'Toronto',   'https://utoronto.ca', 1827, 97000, 43, 6100, 7500, 57020, 59520, true, true),
  (gen_random_uuid(), 'mcgill','McGill University',              'Université McGill',                      'McGill','university','QC','Montréal',  'https://mcgill.ca',  1821, 40000, 46, 4338, 5338, 25000, 27000, true, true),
  (gen_random_uuid(), 'uwaterloo','University of Waterloo',      'Université de Waterloo',                 'UW',  'university', 'ON', 'Waterloo',  'https://uwaterloo.ca', 1959, 42000, 53, 6700, 7700, 37000, 39000, true, true),
  (gen_random_uuid(), 'queens','Queen''s University',            'Université Queen''s',                    'Queen''s','university','ON','Kingston', 'https://queensu.ca', 1841, 25000, 42, 6500, 7500, 48000, 50000, true, true),
  (gen_random_uuid(), 'ualberta','University of Alberta',        'Université de l''Alberta',               'UAlberta','university','AB','Edmonton', 'https://ualberta.ca', 1908, 40000, 58, 5600, 6600, 28000, 30000, true, true),
  (gen_random_uuid(), 'uvic',  'University of Victoria',         'Université de Victoria',                 'UVic', 'university','BC','Victoria',  'https://uvic.ca',    1963, 22000, 70, 5660, 6660, 29000, 31000, true, true),
  (gen_random_uuid(), 'dal',   'Dalhousie University',           'Université Dalhousie',                   'Dal', 'university', 'NS', 'Halifax',   'https://dal.ca',     1818, 19000, 62, 9000, 10000, 22000, 24000, true, true),
  (gen_random_uuid(), 'bcit',  'British Columbia Institute of Technology','Institut de technologie de la C.-B.','BCIT','polytechnic','BC','Burnaby','https://bcit.ca', 1964, 48000, 75, 4500, 5500, 18000, 20000, true, true),
  (gen_random_uuid(), 'seneca','Seneca Polytechnic',             'Sénéca Polytechnique',                   'Seneca','college',  'ON', 'Toronto',   'https://senecacollege.ca', 1967, 35000, 80, 3800, 4800, 16500, 18500, true, true),
  (gen_random_uuid(), 'humber','Humber College',                 'Collège Humber',                         'Humber','college', 'ON', 'Etobicoke', 'https://humber.ca',  1967, 30000, 78, 3700, 4700, 15800, 17800, true, true),
  -- Expanded universities
  (gen_random_uuid(), 'western',  'Western University',                  'Université Western',                         'Western',  'university',  'ON', 'London',      'https://uwo.ca',          1878, 32000, 58, 6800, 7800, 32000, 34000, true,  true),
  (gen_random_uuid(), 'mcmaster', 'McMaster University',                 'Université McMaster',                        'Mac',       'university',  'ON', 'Hamilton',    'https://mcmaster.ca',     1887, 37000, 55, 7200, 8200, 30000, 32000, true,  true),
  (gen_random_uuid(), 'ucalgary', 'University of Calgary',               'Université de Calgary',                      'UCalgary',  'university',  'AB', 'Calgary',     'https://ucalgary.ca',     1966, 35000, 60, 6000, 7000, 28500, 30500, true,  true),
  (gen_random_uuid(), 'umanitoba','University of Manitoba',              'Université du Manitoba',                     'UManitoba', 'university',  'MB', 'Winnipeg',    'https://umanitoba.ca',    1877, 30000, 65, 4600, 5600, 18500, 20500, true,  true),
  (gen_random_uuid(), 'uottawa',  'University of Ottawa',                'Université d''Ottawa',                       'UOttawa',   'university',  'ON', 'Ottawa',      'https://uottawa.ca',      1848, 44000, 68, 6800, 7800, 29000, 31000, true,  true),
  (gen_random_uuid(), 'carleton', 'Carleton University',                 'Université Carleton',                        'Carleton',  'university',  'ON', 'Ottawa',      'https://carleton.ca',     1942, 30000, 72, 6400, 7400, 27500, 29500, true,  true),
  (gen_random_uuid(), 'concordia','Concordia University',                'Université Concordia',                       'Concordia', 'university',  'QC', 'Montréal',    'https://concordia.ca',    1974, 51000, 66, 4700, 5700, 21000, 23000, true,  true),
  (gen_random_uuid(), 'yorku',    'York University',                     'Université York',                            'York',      'university',  'ON', 'Toronto',     'https://yorku.ca',        1959, 55000, 64, 6600, 7600, 31000, 33000, true,  true),
  (gen_random_uuid(), 'ryerson',  'Toronto Metropolitan University',     'Université métropolitaine de Toronto',       'TMU',       'university',  'ON', 'Toronto',     'https://torontomu.ca',    1948, 48000, 62, 7200, 8200, 29000, 31000, true,  true),
  (gen_random_uuid(), 'udem',     'Université de Montréal',              'Université de Montréal',                     'UdeM',      'university',  'QC', 'Montréal',    'https://umontreal.ca',    1878, 67000, 55, 4000, 5000, 20000, 22000, true,  true),
  (gen_random_uuid(), 'laval',    'Université Laval',                    'Université Laval',                           'Laval',     'university',  'QC', 'Québec City', 'https://ulaval.ca',       1852, 50000, 58, 3800, 4800, 19000, 21000, true,  true),
  (gen_random_uuid(), 'usask',    'University of Saskatchewan',          'Université de la Saskatchewan',              'USask',     'university',  'SK', 'Saskatoon',   'https://usask.ca',        1907, 26000, 68, 5600, 6600, 22000, 24000, true,  true),
  (gen_random_uuid(), 'mun',      'Memorial University of Newfoundland', 'Université Memorial de Terre-Neuve',         'MUN',       'university',  'NL', 'St. John''s', 'https://mun.ca',          1925, 19000, 70, 3200, 4200, 11500, 13500, true,  true),
  (gen_random_uuid(), 'unb',      'University of New Brunswick',         'Université du Nouveau-Brunswick',            'UNB',       'university',  'NB', 'Fredericton', 'https://unb.ca',          1785, 10000, 72, 7700, 8700, 17000, 19000, true,  true),
  -- Colleges & polytechnics
  (gen_random_uuid(), 'georgebrown','George Brown College',              'Collège George Brown',                       'GBC',       'college',     'ON', 'Toronto',     'https://georgebrown.ca',  1967, 31000, 80, 3900, 4900, 16000, 18000, false, true),
  (gen_random_uuid(), 'sheridan',  'Sheridan College',                   'Collège Sheridan',                           'Sheridan',  'college',     'ON', 'Brampton',    'https://sheridancollege.ca',1967,24000, 79, 3800, 4800, 15500, 17500, false, true),
  (gen_random_uuid(), 'algonquin', 'Algonquin College',                  'Collège Algonquin',                          'AC',        'college',     'ON', 'Ottawa',      'https://algonquincollege.com',1957,22000,82, 3600, 4600, 15000, 17000, false, true),
  (gen_random_uuid(), 'kwantlen',  'Kwantlen Polytechnic University',    'Université polytechnique Kwantlen',          'KPU',       'polytechnic', 'BC', 'Surrey',      'https://kpu.ca',          1981, 20000, 80, 4200, 5200, 17500, 19500, false, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Scholarships
-- ============================================================
INSERT INTO public.scholarships (
  id, name_en, name_fr, type, funder, funder_name,
  amount_min, amount_max, is_renewable, deadline,
  application_url, description_en, provinces,
  is_published, is_verified
)
VALUES
  (gen_random_uuid(),
   'Schulich Leader Scholarship', 'Bourse Schulich Leader',
   'scholarship', 'private', 'Schulich Foundation',
   100000, 100000, true, '2025-03-31',
   'https://schulichleaders.com',
   'Canada''s most coveted undergraduate STEM scholarship. Four-year award for students entering university with exceptional academic and leadership achievements.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'TD Scholarship for Community Leadership', 'Bourse TD pour le leadership communautaire',
   'scholarship', 'foundation', 'TD Bank Group',
   70000, 70000, true, '2025-03-01',
   'https://td.com/scholarship',
   'Recognizes young Canadians who demonstrate outstanding commitment to community service. $17,500/year for four years.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Canada Student Grant for Full-Time Students', 'Bourse canadienne pour étudiants à temps plein',
   'grant', 'government', 'Government of Canada',
   3000, 4200, true, NULL,
   'https://canada.ca/student-grants',
   'Non-repayable federal grant for eligible low- and middle-income students in full-time post-secondary studies.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Loran Award', 'Prix Loran',
   'award', 'foundation', 'Loran Scholars Foundation',
   100000, 100000, true, '2024-11-01',
   'https://loranscholar.ca',
   'Recognizes character, service, and leadership potential. Recipients receive mentorship, a summer stipend, and a national network of peers.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'RBC Future Launch Scholarship', 'Bourse RBC Lancement de carrière',
   'bursary', 'foundation', 'Royal Bank of Canada',
   10000, 10000, false, '2025-02-15',
   'https://rbc.com/futurelaunch',
   'Supports young Canadians who face barriers to entering the workforce, with funding and mentorship.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'BMO First Canadian Scholarship', 'Bourse BMO Premier Canadien',
   'scholarship', 'foundation', 'BMO Financial Group',
   5000, 5000, true, '2025-04-30',
   'https://bmo.com/scholarship',
   'Awarded to students from underrepresented communities entering their first year of post-secondary education at a Canadian institution. Covers tuition and living expenses.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Vanier Canada Graduate Scholarship', 'Bourse d''études supérieures du Canada Vanier',
   'scholarship', 'government', 'Government of Canada (CIHR/NSERC/SSHRC)',
   50000, 50000, true, '2025-11-01',
   'https://vanier.gc.ca',
   'Canada''s most prestigious doctoral scholarship. Awarded to world-class doctoral students who demonstrate leadership skills and high academic achievement ($50,000/year for 3 years).',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'NSERC Postgraduate Scholarship – Doctoral (PGS D)', 'Bourse d''études supérieures du Canada au niveau du doctorat (BESC D) du CRSNG',
   'scholarship', 'government', 'Natural Sciences and Engineering Research Council of Canada',
   21000, 21000, true, '2025-10-17',
   'https://www.nserc-crsng.gc.ca/Students-Etudiants/PG-CS/PGSD-BESCD_eng.asp',
   'Supports full-time graduate students engaged in doctoral programs in natural sciences or engineering. Award provides $21,000/year for up to 3 years.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Pierre Elliott Trudeau Foundation Doctoral Scholarship', 'Bourse doctorale de la Fondation Pierre Elliott Trudeau',
   'scholarship', 'foundation', 'Pierre Elliott Trudeau Foundation',
   40000, 40000, true, '2025-12-01',
   'https://www.trudeaufoundation.ca',
   'Awarded to exceptional doctoral candidates in social sciences and humanities who demonstrate leadership, engagement with Canadian society, and a commitment to public dialogue.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true),

  (gen_random_uuid(),
   'Ontario Graduate Scholarship (OGS)', 'Bourse d''études supérieures de l''Ontario (BESO)',
   'scholarship', 'government', 'Government of Ontario',
   15000, 15000, true, '2025-01-14',
   'https://osap.gov.on.ca/OSAPPortal/en/OtherOSAPGrants/OSAP004117.html',
   'Merit-based provincial scholarship supporting master''s and doctoral students studying at an eligible Ontario university. $5,000/term for 3 terms.',
   ARRAY['ON']::province[],
   true, true),

  (gen_random_uuid(),
   'SSHRC Doctoral Fellowship', 'Bourse de doctorat du CRSH',
   'scholarship', 'government', 'Social Sciences and Humanities Research Council of Canada',
   20000, 20000, true, '2025-10-15',
   'https://www.sshrc-crsh.gc.ca/funding-financement/programs-programmes/fellowships/doctoral-doctorat-eng.aspx',
   'Supports Canadian citizens and permanent residents engaged in full-time doctoral programs in the social sciences and humanities. Valued at $20,000/year for up to 4 years.',
   ARRAY['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK']::province[],
   true, true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Clubs
-- Requires institutions to exist first.
-- Using a subquery to look up institution by slug.
-- ============================================================
INSERT INTO public.clubs (id, institution_id, name, slug, category, description, member_count, is_published)
SELECT
  gen_random_uuid(),
  i.id,
  c.name,
  c.slug,
  c.category::club_category,
  c.description,
  c.member_count,
  true
FROM (VALUES
  ('ubc',    'UBC Robotics Club',             'ubc-robotics',      'technology', 'Design, build, and compete with autonomous robots. Weekly build sessions and national competitions.', 120),
  ('ubc',    'UBC Debate Society',            'ubc-debate',        'academic',   'Competitive and recreational debate in parliamentary formats. Open to all experience levels.',      85),
  ('ubc',    'UBC Photography Club',          'ubc-photography',   'arts',       'Weekly photo walks, darkroom workshops, and an annual exhibition. All skill levels welcome.',       67),
  ('uoft',   'UofT AI Club',                  'uoft-ai',           'technology', 'Reading groups, workshops, and project teams exploring machine learning and AI research.',           210),
  ('uoft',   'UofT Sustainability Network',   'uoft-sustainability','social',    'Campus sustainability initiatives, community gardens, and advocacy at UofT.',                        143),
  ('sfu',    'SFU Entrepreneurship Society',  'sfu-entrepreneurship','professional','Speaker series, startup pitch competitions, and mentorship from local founders.',                190)
) AS c (institution_slug, name, slug, category, description, member_count)
JOIN institutions i ON i.slug = c.institution_slug
ON CONFLICT DO NOTHING;

-- ============================================================
-- Professors
-- Generic academic names — not based on any real specific person.
-- rating_count = 0, all avg_ fields = NULL (no fabricated ratings).
-- ============================================================
INSERT INTO public.professors (name, school_slug, department, courses, is_published)
VALUES
  ('Dr. Sarah Chen',        'ubc',       'Computer Science',          ARRAY['CPSC 110', 'CPSC 313'],         true),
  ('Prof. James Okafor',    'uoft',      'Electrical Engineering',    ARRAY['ECE 302', 'ECE 410'],           true),
  ('Dr. Marie Tremblay',    'mcgill',    'Biochemistry',              ARRAY['BIOL 200', 'BIOL 460'],         true),
  ('Prof. Arun Sharma',     'uwaterloo', 'Mathematics',               ARRAY['MATH 135', 'MATH 235'],         true),
  ('Dr. Fatima Al-Hassan',  'ualberta',  'Economics',                 ARRAY['ECON 101', 'ECON 281'],         true),
  ('Prof. David Kowalski',  'dal',       'History',                   ARRAY['HIST 1001', 'HIST 2201'],       true),
  ('Dr. Priya Nair',        'sfu',       'Psychology',                ARRAY['PSYC 100', 'PSYC 280'],         true),
  ('Prof. Étienne Bouchard','uottawa',   'Political Science',         ARRAY['POL 1101', 'POL 2302'],         true),
  ('Dr. Kenji Watanabe',    'ubc',       'Physics & Astronomy',       ARRAY['PHYS 101', 'PHYS 301'],         true),
  ('Prof. Amara Diallo',    'mcmaster',  'Health Sciences',           ARRAY['HLTHSCI 2A06', 'HLTHSCI 3P03'], true)
ON CONFLICT DO NOTHING;

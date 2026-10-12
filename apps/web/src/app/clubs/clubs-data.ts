export type ClubCategory =
  | 'Student Government'
  | 'Academic'
  | 'Cultural'
  | 'Sports'
  | 'Arts'
  | 'Tech'
  | 'Community'
  | 'Environment'
  | 'Politics'
  | 'Media'

export interface ClubEvent {
  title: string
  date: string
  location: string
}

export interface Club {
  id: string
  name: string
  universitySlug: string
  university: string
  category: ClubCategory
  members: number
  description: string
  founded?: number
  website?: string
  nextEvent?: string
  events: ClubEvent[]
}

export const UNIVERSITIES: { slug: string; name: string }[] = [
  { slug: 'ubc', name: 'University of British Columbia' },
  { slug: 'uoft', name: 'University of Toronto' },
  { slug: 'mcgill', name: 'McGill University' },
  { slug: 'waterloo', name: 'University of Waterloo' },
  { slug: 'western', name: 'Western University' },
  { slug: 'mcmaster', name: 'McMaster University' },
  { slug: 'queens', name: "Queen's University" },
  { slug: 'ucalgary', name: 'University of Calgary' },
  { slug: 'ualberta', name: 'University of Alberta' },
  { slug: 'carleton', name: 'Carleton University' },
  { slug: 'concordia', name: 'Concordia University' },
]

export const ALL_CATEGORIES: ClubCategory[] = [
  'Student Government',
  'Academic',
  'Cultural',
  'Sports',
  'Arts',
  'Tech',
  'Community',
  'Environment',
  'Politics',
  'Media',
]

export const CLUBS: Club[] = [
  // ── UBC ─────────────────────────────────────────────────────────────────
  {
    id: 'ubc-ams',
    name: 'Alma Mater Society (AMS)',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Student Government',
    members: 55000,
    description:
      'The AMS is the student government for all undergraduates at UBC Vancouver, providing services, clubs support, and student advocacy since 1915.',
    founded: 1915,
    website: 'https://www.ams.ubc.ca',
    nextEvent: 'AMS General Meeting — Nov 5',
    events: [
      { title: 'AMS General Meeting', date: 'Nov 5, 2026', location: 'SUB Council Chambers' },
      { title: 'AMS Clubs Funding Workshop', date: 'Nov 19, 2026', location: 'SUB 206' },
    ],
  },
  {
    id: 'ubc-engineering-undergraduate-society',
    name: 'UBC Engineering Undergraduate Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Student Government',
    members: 8200,
    description:
      'The EUS represents all undergraduate engineering students at UBC, running Engineering Week, formal dinners, and the annual career fair.',
    founded: 1915,
    website: 'https://www.ubcengineers.ca',
    nextEvent: 'Engineering Week Kickoff — Nov 10',
    events: [
      { title: 'Engineering Week Kickoff', date: 'Nov 10, 2026', location: 'Kaiser Building Atrium' },
      { title: 'Engineering Career Fair', date: 'Nov 25, 2026', location: 'Nest Building' },
    ],
  },
  {
    id: 'ubc-science-undergraduate-society',
    name: 'UBC Science Undergraduate Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Academic',
    members: 12000,
    description:
      'The SUS represents over 12,000 science undergraduates at UBC, advocating for academic excellence and organising social, volunteer, and professional development events.',
    founded: 1918,
    website: 'https://sus.ubc.ca',
    nextEvent: 'SUS Fall Social — Nov 7',
    events: [
      { title: 'SUS Fall Social', date: 'Nov 7, 2026', location: 'SUB Atrium' },
      { title: 'Research Symposium', date: 'Dec 3, 2026', location: 'Wesbrook 100' },
    ],
  },
  {
    id: 'ubc-debate-club',
    name: 'UBC Debate Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Academic',
    members: 280,
    description:
      'One of the oldest clubs at UBC, the Debate Club trains students in competitive parliamentary debate and hosts weekly practices and inter-university tournaments.',
    founded: 1919,
    website: 'https://ubcdebate.ca',
    nextEvent: 'Fall Open Tournament — Nov 14',
    events: [
      { title: 'Fall Open Tournament', date: 'Nov 14–15, 2026', location: 'Buchanan A Block' },
      { title: 'Weekly Practice', date: 'Every Tuesday 6 PM', location: 'Buchanan B310' },
    ],
  },
  {
    id: 'ubc-film-society',
    name: 'UBC Film Society',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Arts',
    members: 420,
    description:
      'The UBC Film Society screens classic, indie, and contemporary films on campus, and runs student filmmaking workshops and a production fund.',
    founded: 1968,
    website: 'https://ubcfilmsociety.ca',
    nextEvent: 'Kubrick Retrospective Night — Nov 8',
    events: [
      { title: 'Kubrick Retrospective Night', date: 'Nov 8, 2026 7 PM', location: 'Norm Theatre' },
      { title: 'Student Film Showcase', date: 'Dec 6, 2026', location: 'Norm Theatre' },
    ],
  },
  {
    id: 'ubc-alpine-club',
    name: 'UBC Alpine Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Sports',
    members: 600,
    description:
      'The UBC Alpine Club offers ski and snowboard trips, avalanche safety courses, and backcountry tours across BC mountains all winter long.',
    founded: 1936,
    website: 'https://ubcalpine.ca',
    nextEvent: 'Whistler Season Opener — Nov 28',
    events: [
      { title: 'Whistler Season Opener', date: 'Nov 28, 2026', location: 'Whistler Mountain' },
      { title: 'Avalanche Safety Course', date: 'Dec 12, 2026', location: 'UBC Nest Meeting Room' },
    ],
  },
  {
    id: 'ubc-sailing-club',
    name: 'UBC Sailing Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Sports',
    members: 310,
    description:
      'Based at the UBC Sailing Centre on Jericho Beach, the club offers lessons, racing programs, and social sailing on English Bay for students of all skill levels.',
    founded: 1950,
    website: 'https://ubcsailing.ca',
    nextEvent: 'End of Season Regatta — Nov 1',
    events: [
      { title: 'End of Season Regatta', date: 'Nov 1, 2026', location: 'Jericho Beach Sailing Centre' },
      { title: 'Winter Social', date: 'Nov 22, 2026', location: 'Jericho Sailing Centre Clubhouse' },
    ],
  },
  {
    id: 'ubc-photography-club',
    name: 'UBC Photography Club',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Arts',
    members: 195,
    description:
      'The UBC Photography Club hosts weekly photo walks, darkroom sessions, and an annual gallery exhibition showcasing student photography in every genre.',
    nextEvent: 'Photo Walk — Spanish Banks — Nov 9',
    events: [
      { title: 'Photo Walk — Spanish Banks', date: 'Nov 9, 2026 2 PM', location: 'Spanish Banks Parking Lot' },
      { title: 'Annual Gallery Exhibition', date: 'Dec 1, 2026', location: 'UBC Nest Gallery' },
    ],
  },
  {
    id: 'ubc-muslim-students-association',
    name: 'UBC Muslim Students Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 870,
    description:
      "The UBC MSA provides a welcoming community for Muslim students through weekly Jumu'ah prayers, halal food events, interfaith dialogues, and social gatherings.",
    founded: 1964,
    website: 'https://ubcmsa.ca',
    nextEvent: 'Halal Food Festival — Nov 6',
    events: [
      { title: 'Halal Food Festival', date: 'Nov 6, 2026 11 AM–3 PM', location: 'UBC Nest Plaza' },
      { title: 'Interfaith Dialogue Night', date: 'Nov 20, 2026', location: 'Irving K. Barber Centre' },
    ],
  },
  {
    id: 'ubc-indian-students-association',
    name: 'UBC Indian Students Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 540,
    description:
      'UBCISA celebrates South Asian culture through Diwali events, Holi celebrations, Bollywood nights, and mentorship programs for incoming students.',
    website: 'https://ubcisa.ca',
    nextEvent: 'Diwali Gala — Nov 15',
    events: [
      { title: 'Diwali Gala', date: 'Nov 15, 2026', location: 'UBC Nest Ballroom' },
      { title: 'Classical Dance Workshop', date: 'Dec 5, 2026', location: 'Swing Space Room 221' },
    ],
  },
  {
    id: 'ubc-cssa',
    name: 'UBC Chinese Students & Scholars Association',
    universitySlug: 'ubc',
    university: 'University of British Columbia',
    category: 'Cultural',
    members: 1200,
    description:
      'CSSA supports Chinese students and scholars at UBC through orientation services, cultural events including the Spring Festival Gala, and academic networking.',
    founded: 1985,
    website: 'https://ubccssa.ca',
    nextEvent: 'Autumn Moon Festival — Nov 3',
    events: [
      { title: 'Autumn Moon Festival', date: 'Nov 3, 2026', location: 'UBC Nest Ballroom' },
      { title: 'Spring Festival Gala Planning', date: 'Nov 17, 2026', location: 'UBC Nest 206' },
    ],
  },

  // ── University of Toronto ────────────────────────────────────────────────
  {
    id: 'uoft-utsu',
    name: 'University of Toronto Students Union (UTSU)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 66000,
    description:
      'UTSU is the student union representing over 66,000 undergraduates at UTSG, providing advocacy, services, health insurance, and clubs funding.',
    founded: 1902,
    website: 'https://www.utsu.ca',
    nextEvent: 'UTSU Town Hall — Nov 12',
    events: [
      { title: 'UTSU Town Hall', date: 'Nov 12, 2026', location: 'Sidney Smith Hall 1073' },
      { title: 'Student Leadership Summit', date: 'Nov 26, 2026', location: 'University College' },
    ],
  },
  {
    id: 'uoft-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 6500,
    description:
      "EngSoc is the student society for U of T's Faculty of Applied Science and Engineering, organising Godiva Week, career fairs, and the Iron Ring ceremony.",
    founded: 1885,
    website: 'https://engsoc.skule.ca',
    nextEvent: 'Cannon Guard Event — Nov 4',
    events: [
      { title: 'Cannon Guard Event', date: 'Nov 4, 2026', location: 'Engineering Quad' },
      { title: 'Iron Ring Ceremony', date: 'Nov 22, 2026', location: 'Convocation Hall' },
    ],
  },
  {
    id: 'uoft-uc-debating-union',
    name: 'UC Debating Union',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Academic',
    members: 190,
    description:
      'The University College Debating Union is one of the oldest debating societies in North America, competing nationally and internationally in parliamentary debate.',
    founded: 1854,
    website: 'https://ucdebating.ca',
    nextEvent: 'Competitive Training Session — Nov 4',
    events: [
      { title: 'Competitive Training Session', date: 'Nov 4, 2026 7 PM', location: 'University College 179' },
      { title: 'Hart House Invitational', date: 'Nov 21–22, 2026', location: 'Hart House' },
    ],
  },
  {
    id: 'uoft-hart-house',
    name: 'Hart House',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Community',
    members: 9500,
    description:
      "Hart House is U of T's historic cultural and recreational centre, offering art, music, debates, fitness, and community programming to students, staff, and alumni.",
    founded: 1919,
    website: 'https://harthouse.ca',
    nextEvent: 'Hart House Debates — Nov 13',
    events: [
      { title: 'Hart House Debates', date: 'Nov 13, 2026 7 PM', location: 'Hart House Debates Room' },
      { title: 'Winter Art Exhibition Opening', date: 'Dec 4, 2026', location: 'Hart House Art Gallery' },
    ],
  },
  {
    id: 'uoft-victoria-usac',
    name: 'Victoria University Students Administrative Council',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 4200,
    description:
      'VUSAC is the student government for Victoria University students, running Victoria College events, clubs, and student services on the St. George campus.',
    founded: 1912,
    website: 'https://vusac.ca',
    nextEvent: 'Vic Formals — Nov 19',
    events: [
      { title: 'Vic Formals', date: 'Nov 19, 2026 6 PM', location: 'Old Vic Common Room' },
      { title: 'VUSAC Council Meeting', date: 'Nov 3, 2026', location: 'Victoria College 215' },
    ],
  },
  {
    id: 'uoft-film-society',
    name: 'U of T Film Society',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Arts',
    members: 350,
    description:
      'The U of T Film Society screens independent and art-house films on campus and hosts director Q&As, student film showcases, and filmmaker workshops throughout the year.',
    founded: 1948,
    website: 'https://uoftfilmsociety.ca',
    nextEvent: 'French New Wave Screening — Nov 7',
    events: [
      { title: 'French New Wave Screening', date: 'Nov 7, 2026 7 PM', location: 'Innis Town Hall' },
      { title: 'Student Shorts Festival', date: 'Dec 5, 2026', location: 'Innis Town Hall' },
    ],
  },
  {
    id: 'uoft-essu',
    name: 'Engineering Science Students Union (ESSU)',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Student Government',
    members: 1100,
    description:
      "ESSU represents Engineering Science students at U of T, organising EngSci-specific events, academic support sessions, and the famous EngSci Banquet.",
    founded: 1957,
    website: 'https://essu.skule.ca',
    nextEvent: 'EngSci Banquet — Nov 29',
    events: [
      { title: 'EngSci Banquet', date: 'Nov 29, 2026', location: 'U of T Faculty Club' },
      { title: 'Fall Academic Mixer', date: 'Nov 6, 2026', location: 'Engineering Building Atrium' },
    ],
  },
  {
    id: 'uoft-trinity-literary-institute',
    name: 'Trinity College Literary Institute',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Academic',
    members: 380,
    description:
      "One of Canada's oldest debating and intellectual societies, the Trinity Literary Institute hosts weekly debates, guest lectures, and the annual Address Dinner.",
    founded: 1852,
    website: 'https://trinitycollegeutoronto.ca',
    nextEvent: 'Weekly Debate — Nov 6',
    events: [
      { title: 'Weekly Debate', date: 'Nov 6, 2026 8 PM', location: 'Trinity College Strachan Hall' },
      { title: 'Annual Address Dinner', date: 'Nov 27, 2026', location: 'Strachan Hall' },
    ],
  },
  {
    id: 'uoft-skule-nite',
    name: 'Skule Nite',
    universitySlug: 'uoft',
    university: 'University of Toronto',
    category: 'Arts',
    members: 150,
    description:
      "Skule Nite is U of T Engineering's annual comedy variety show, entirely written, directed, and performed by engineering students. Running continuously since 1927.",
    founded: 1927,
    website: 'https://skulenite.skule.ca',
    nextEvent: 'Auditions — Nov 2',
    events: [
      { title: 'Auditions', date: 'Nov 2, 2026 6 PM', location: 'Engineering Atrium' },
      { title: 'Skule Nite 2027 Performances', date: 'Jan 30, 2027', location: 'Isabel Bader Theatre' },
    ],
  },

  // ── McGill ───────────────────────────────────────────────────────────────
  {
    id: 'mcgill-ssmu',
    name: 'Students Society of McGill University (SSMU)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Student Government',
    members: 24000,
    description:
      'SSMU is the official undergraduate student government at McGill, providing clubs support, advocacy, health and wellness services, and campus-wide events.',
    founded: 1908,
    website: 'https://ssmu.ca',
    nextEvent: 'SSMU Council Meeting — Nov 5',
    events: [
      { title: 'SSMU Council Meeting', date: 'Nov 5, 2026', location: 'Shatner Building Council Chambers' },
      { title: 'Clubs & Services Fair', date: 'Nov 18, 2026', location: 'SSMU Ballroom' },
    ],
  },
  {
    id: 'mcgill-dps',
    name: 'McGill Debating Union (DPS)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Academic',
    members: 230,
    description:
      'The Debating and Public Speaking Society is one of the oldest clubs at McGill, competing nationally and internationally with weekly practice debates in English and French.',
    founded: 1905,
    website: 'https://mcgilldebating.com',
    nextEvent: 'McGill Open Tournament — Nov 14',
    events: [
      { title: 'McGill Open Tournament', date: 'Nov 14–15, 2026', location: 'Leacock Building' },
      { title: 'Weekly Practice', date: 'Every Wednesday 7 PM', location: 'Leacock 14' },
    ],
  },
  {
    id: 'mcgill-eus',
    name: 'Engineering Undergraduate Society (EUS)',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Student Government',
    members: 5200,
    description:
      'The EUS represents undergraduate engineering students at McGill, organising E-Week, the Engineering Games, academic support, and the annual EUS Ball.',
    founded: 1913,
    website: 'https://eusmc.ca',
    nextEvent: 'E-Week Opening Ceremony — Nov 16',
    events: [
      { title: 'E-Week Opening Ceremony', date: 'Nov 16, 2026', location: 'McConnell Engineering Building' },
      { title: 'EUS Ball', date: 'Nov 29, 2026', location: 'Hilton Bonaventure Hotel, Montreal' },
    ],
  },
  {
    id: 'mcgill-tribune',
    name: 'McGill Tribune',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Media',
    members: 165,
    description:
      'The McGill Tribune is a student-run biweekly newspaper covering campus news, arts, science, and opinion, published since 1980 in print and online.',
    founded: 1980,
    website: 'https://www.mcgilltribune.com',
    nextEvent: 'Editorial Meeting — Nov 4',
    events: [
      { title: 'Editorial Meeting', date: 'Nov 4, 2026 6 PM', location: 'Tribune Office, Shatner B-19' },
      { title: 'Spring Recruitment Fair', date: 'Nov 18, 2026', location: 'Shatner Building Atrium' },
    ],
  },
  {
    id: 'mcgill-daily',
    name: 'The McGill Daily',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Media',
    members: 140,
    description:
      "Founded in 1911, The McGill Daily is one of Canada's oldest student newspapers, publishing twice weekly with a focus on investigative journalism and social justice.",
    founded: 1911,
    website: 'https://www.mcgilldaily.com',
    nextEvent: 'Editorial Training — Nov 3',
    events: [
      { title: 'Editorial Training', date: 'Nov 3, 2026 5 PM', location: 'Daily Office, Shatner B-26' },
      { title: 'End of Semester Gala', date: 'Dec 4, 2026', location: 'Montreal venue TBC' },
    ],
  },
  {
    id: 'mcgill-international-students-network',
    name: 'McGill International Students Network',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Cultural',
    members: 1600,
    description:
      'MISN connects international students at McGill through cultural events, an orientation buddy program, language exchanges, and social outings across Montreal.',
    website: 'https://misn.ca',
    nextEvent: 'Cultural Fusion Night — Nov 8',
    events: [
      { title: 'Cultural Fusion Night', date: 'Nov 8, 2026 6 PM', location: 'Shatner Ballroom' },
      { title: 'Montreal City Exploration', date: 'Nov 22, 2026', location: 'Meeting at Sherbrooke Metro' },
    ],
  },
  {
    id: 'mcgill-philosophy-students-association',
    name: 'McGill Philosophy Students Association',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Academic',
    members: 210,
    description:
      'The PSA hosts philosophy talks, reading groups, discussion panels, and the annual Trent Symposium for undergraduate philosophy students across Quebec.',
    founded: 1970,
    nextEvent: 'Consciousness Colloquium — Nov 11',
    events: [
      { title: 'Consciousness Colloquium', date: 'Nov 11, 2026 7 PM', location: 'Leacock 927' },
      { title: "Reading Group: Rawls' Theory of Justice", date: 'Nov 25, 2026 5 PM', location: 'Leacock 419' },
    ],
  },
  {
    id: 'mcgill-music-undergraduate-association',
    name: 'McGill Music Undergraduate Association',
    universitySlug: 'mcgill',
    university: 'McGill University',
    category: 'Arts',
    members: 380,
    description:
      'The MUA represents music undergraduates at the Schulich School of Music, organising recitals, festivals, academic panels, and student ensemble showcases.',
    founded: 1923,
    website: 'https://mcgillmua.ca',
    nextEvent: 'Fall Recital Series — Nov 10',
    events: [
      { title: 'Fall Recital Series', date: 'Nov 10, 2026 7:30 PM', location: 'Pollack Concert Hall' },
      { title: 'MUA Mixer', date: 'Nov 17, 2026', location: 'Schulich School Lounge' },
    ],
  },

  // ── University of Waterloo ───────────────────────────────────────────────
  {
    id: 'waterloo-feds',
    name: 'Federation of Students (Feds)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 38000,
    description:
      'Feds is the official undergraduate student government at UWaterloo, running student services, the SLC, campus events, and clubs administration.',
    founded: 1967,
    website: 'https://wusa.ca',
    nextEvent: 'Feds Council Meeting — Nov 6',
    events: [
      { title: 'Feds Council Meeting', date: 'Nov 6, 2026', location: 'Student Life Centre' },
      { title: 'Clubs Day', date: 'Nov 20, 2026', location: 'SLC Great Hall' },
    ],
  },
  {
    id: 'waterloo-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 10000,
    description:
      'EngSoc represents Waterloo Engineering students, organising Orientation, WEEF funding, the Iron Warrior newspaper, and faculty-wide events throughout the academic year.',
    founded: 1963,
    website: 'https://engsoc.uwaterloo.ca',
    nextEvent: 'Iron Ring Ceremony — Nov 21',
    events: [
      { title: 'Iron Ring Ceremony', date: 'Nov 21, 2026', location: 'Engineering 5 Atrium' },
      { title: 'EngSoc Games Night', date: 'Nov 7, 2026', location: 'CPH 3607' },
    ],
  },
  {
    id: 'waterloo-mathsoc',
    name: 'Mathematics Society (MathSoc)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Academic',
    members: 9000,
    description:
      'MathSoc is the student society for Math faculty students at UWaterloo, providing the tutorial centre, Pi Day celebrations, math competitions, and social events.',
    founded: 1967,
    website: 'https://mathsoc.uwaterloo.ca',
    nextEvent: 'Midterm Study Jam — Nov 3',
    events: [
      { title: 'Midterm Study Jam', date: 'Nov 3, 2026 6 PM', location: 'MC 2035' },
      { title: 'Pi Day Fundraiser Planning', date: 'Nov 17, 2026', location: 'Math 3 Lounge' },
    ],
  },
  {
    id: 'waterloo-csc',
    name: 'Computer Science Club (CSC)',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 2100,
    description:
      'The CSC is a hub for CS and tech enthusiasts at UWaterloo, running industry talks, hackathons, competitive programming sessions, and the popular CS Coffee & Code.',
    founded: 1978,
    website: 'https://csclub.uwaterloo.ca',
    nextEvent: 'Google Engineers Talk — Nov 9',
    events: [
      { title: 'Google Engineers Talk', date: 'Nov 9, 2026 5 PM', location: 'MC 2054' },
      { title: 'Fall Hackathon', date: 'Nov 22–23, 2026', location: 'Engineering 5 & 7' },
    ],
  },
  {
    id: 'waterloo-data-science-club',
    name: 'Waterloo Data Science Club',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 760,
    description:
      'The Waterloo Data Science Club connects students passionate about ML, AI, and data analysis through workshops, Kaggle teams, and industry speaker events.',
    website: 'https://uwdatascience.ca',
    nextEvent: 'ML Workshop: Transformers — Nov 5',
    events: [
      { title: 'ML Workshop: Transformers', date: 'Nov 5, 2026 6 PM', location: 'QNC 1501' },
      { title: 'Data Science Case Competition', date: 'Nov 27, 2026', location: 'Engineering 5' },
    ],
  },
  {
    id: 'waterloo-science-society',
    name: 'Science Society',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Academic',
    members: 5500,
    description:
      'The UWaterloo Science Society represents science faculty undergrads, coordinating academic resources, social events, and the annual Science Olympics competition.',
    founded: 1970,
    website: 'https://sciencesociety.uwaterloo.ca',
    nextEvent: 'Science Olympics — Nov 15',
    events: [
      { title: 'Science Olympics', date: 'Nov 15, 2026', location: 'Biology Building' },
      { title: 'Science Formal', date: 'Nov 28, 2026', location: 'Delta Hotel Waterloo' },
    ],
  },
  {
    id: 'waterloo-arts-student-union',
    name: 'Arts Student Union',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Student Government',
    members: 4800,
    description:
      'The ASU is the student government for UWaterloo Arts faculty students, hosting film nights, lecture series, and the annual Arts Formal.',
    founded: 1972,
    website: 'https://asuonline.ca',
    nextEvent: 'Arts Faculty Mixer — Nov 12',
    events: [
      { title: 'Arts Faculty Mixer', date: 'Nov 12, 2026 5 PM', location: 'Hagey Hall Foyer' },
      { title: 'Arts Formal', date: 'Nov 28, 2026', location: 'UW Grad House' },
    ],
  },
  {
    id: 'waterloo-midnight-sun',
    name: 'Midnight Sun Solar Car Team',
    universitySlug: 'waterloo',
    university: 'University of Waterloo',
    category: 'Tech',
    members: 420,
    description:
      'One of the top solar vehicle teams in North America, Midnight Sun designs, builds, and races solar-powered cars in the Bridgestone World Solar Challenge in Australia.',
    founded: 1988,
    website: 'https://uwmidsun.com',
    nextEvent: 'Car Testing Day — Nov 8',
    events: [
      { title: 'Car Testing Day', date: 'Nov 8, 2026', location: 'Engineering Parking Lot C' },
      { title: 'Technical Review', date: 'Nov 22, 2026', location: 'E5 Design Lab' },
    ],
  },

  // ── Western University ───────────────────────────────────────────────────
  {
    id: 'western-usc',
    name: 'University Students Council (USC)',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Student Government',
    members: 32000,
    description:
      "The USC is Western's undergraduate student government, delivering student services, clubs funding, health & dental coverage, and major campus events including Homecoming.",
    founded: 1921,
    website: 'https://westernusc.ca',
    nextEvent: 'USC Council Meeting — Nov 4',
    events: [
      { title: 'USC Council Meeting', date: 'Nov 4, 2026', location: 'UCC 300A' },
      { title: 'Western Winter Wonderland', date: 'Dec 5, 2026', location: 'UCC Atrium' },
    ],
  },
  {
    id: 'western-engineering-society',
    name: 'Western Engineering Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Student Government',
    members: 5200,
    description:
      "WES represents engineering undergraduates at Western, running Engineering Frosh Week, the Engineering Student Centre, and the annual Engineer's Ball.",
    founded: 1920,
    website: 'https://westernengineering.ca',
    nextEvent: 'Engineers Without Borders Info Night — Nov 11',
    events: [
      { title: 'Engineers Without Borders Info Night', date: 'Nov 11, 2026 6 PM', location: 'SEB 1200' },
      { title: "Engineer's Ball", date: 'Nov 28, 2026', location: 'London Convention Centre' },
    ],
  },
  {
    id: 'western-debate-society',
    name: 'Western Debate Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 230,
    description:
      'The Western Debate Society competes in parliamentary debate across North America and runs workshops on public speaking and argumentation open to all students.',
    founded: 1970,
    website: 'https://westerndebate.ca',
    nextEvent: 'Western Fall Open — Nov 14',
    events: [
      { title: 'Western Fall Open', date: 'Nov 14–15, 2026', location: 'University Community Centre' },
      { title: 'Skills Workshop', date: 'Nov 5, 2026 7 PM', location: 'SSC 4210' },
    ],
  },
  {
    id: 'western-film-society',
    name: 'Western Film Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Arts',
    members: 310,
    description:
      'The Western Film Society screens art house, international, and cult classics on campus, and hosts the annual Reel Diversity Film Festival celebrating global cinema.',
    founded: 1969,
    website: 'https://westernfilm.ca',
    nextEvent: 'Bergman Retrospective — Nov 6',
    events: [
      { title: 'Bergman Retrospective', date: 'Nov 6, 2026 7 PM', location: 'UCC Theatres' },
      { title: 'Student Director Showcase', date: 'Nov 27, 2026', location: 'Arts and Humanities Building' },
    ],
  },
  {
    id: 'western-mustangs-fan-club',
    name: 'Western Mustangs Fan Club',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Sports',
    members: 3800,
    description:
      'The Western Mustangs Fan Club organises student attendance at varsity games, pre-game tailgates, spirit events, and travel to away games for football, basketball, and hockey.',
    nextEvent: 'Homecoming Football Tailgate — Nov 1',
    events: [
      { title: 'Homecoming Football Tailgate', date: 'Nov 1, 2026 12 PM', location: 'Alumni Field Lot' },
      { title: 'Basketball Spirit Night', date: 'Nov 19, 2026', location: 'Alumni Hall' },
    ],
  },
  {
    id: 'western-medical-science-society',
    name: 'Western Medical Science Society',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 1800,
    description:
      'The WMSS supports pre-med students at Western with MCAT prep resources, medical school application workshops, shadowing opportunities, and healthcare volunteer placements.',
    nextEvent: 'MCAT Strategy Workshop — Nov 9',
    events: [
      { title: 'MCAT Strategy Workshop', date: 'Nov 9, 2026 5 PM', location: 'MSB 384' },
      { title: 'Med School Application Panel', date: 'Nov 23, 2026 6 PM', location: 'Kresge Building' },
    ],
  },
  {
    id: 'western-psychology-students-association',
    name: 'Psychology Students Association',
    universitySlug: 'western',
    university: 'Western University',
    category: 'Academic',
    members: 1400,
    description:
      'PSA connects psychology students at Western through research nights, mental health awareness events, professor panels, and a peer mentorship program for first-year students.',
    nextEvent: 'Research Night — Nov 17',
    events: [
      { title: 'Research Night', date: 'Nov 17, 2026 5:30 PM', location: 'Westminster Hall' },
      { title: 'Mental Health Awareness Week', date: 'Nov 3, 2026', location: 'UCC Atrium' },
    ],
  },

  // ── McMaster University ──────────────────────────────────────────────────
  {
    id: 'mcmaster-msu',
    name: 'McMaster Students Union (MSU)',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Student Government',
    members: 23000,
    description:
      "The MSU is McMaster's undergraduate student government, operating the MUSC student centre, clubs administration, health insurance, and university advocacy.",
    founded: 1918,
    website: 'https://msumcmaster.ca',
    nextEvent: 'MSU Board Meeting — Nov 4',
    events: [
      { title: 'MSU Board Meeting', date: 'Nov 4, 2026', location: 'MUSC 201' },
      { title: 'Clubs and Societies Fair', date: 'Nov 19, 2026', location: 'MUSC Great Hall' },
    ],
  },
  {
    id: 'mcmaster-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Student Government',
    members: 7800,
    description:
      "McMaster EngSoc is the student society for all engineering undergrads, running Engineering Orientation, the Iron Ring ceremony, career fairs, and the annual Eng Ball.",
    founded: 1917,
    website: 'https://macengsociety.ca',
    nextEvent: 'EngSoc Formal — Nov 22',
    events: [
      { title: 'EngSoc Formal', date: 'Nov 22, 2026', location: 'Hamilton Convention Centre' },
      { title: 'Design Team Showcase', date: 'Nov 8, 2026', location: 'CIBC Hall' },
    ],
  },
  {
    id: 'mcmaster-debate-society',
    name: 'McMaster Debate Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Academic',
    members: 175,
    description:
      "McMaster's competitive debate team competes nationally in Canadian university circuits and runs weekly workshops plus an annual open tournament hosted on campus.",
    nextEvent: 'McMaster Open — Nov 13',
    events: [
      { title: 'McMaster Open', date: 'Nov 13–14, 2026', location: 'University Hall' },
      { title: 'Public Speaking Boot Camp', date: 'Nov 6, 2026 6 PM', location: 'Togo Salmon Hall 117' },
    ],
  },
  {
    id: 'mcmaster-silhouette',
    name: 'The Silhouette',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Media',
    members: 120,
    description:
      "The Silhouette is McMaster's independent student newspaper, published weekly since 1930, covering campus news, investigations, sports, arts, and student life.",
    founded: 1930,
    website: 'https://www.thesil.ca',
    nextEvent: 'Weekly Meeting — Nov 3',
    events: [
      { title: 'Weekly Editorial Meeting', date: 'Nov 3, 2026 5 PM', location: 'MUSC 225' },
      { title: 'Photography Workshop', date: 'Nov 10, 2026', location: 'MUSC 225' },
    ],
  },
  {
    id: 'mcmaster-international-student-society',
    name: 'McMaster International Student Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Cultural',
    members: 1900,
    description:
      'MISS supports international students at McMaster through cultural festivals, an airport pickup program, language partner exchange, and social and networking events.',
    website: 'https://missmcmaster.ca',
    nextEvent: 'International Cultural Night — Nov 15',
    events: [
      { title: 'International Cultural Night', date: 'Nov 15, 2026 5 PM', location: 'MUSC Great Hall' },
      { title: 'Language Exchange Mixer', date: 'Nov 29, 2026', location: 'MUSC Atrium' },
    ],
  },
  {
    id: 'mcmaster-macengineers',
    name: 'MacEngineers',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Tech',
    members: 840,
    description:
      "MacEngineers is McMaster's tech-focused club for engineering innovators, running design sprints, robotics showcases, hackathons, and industry partnership events.",
    nextEvent: 'MacHacks Hackathon — Nov 22',
    events: [
      { title: 'MacHacks Hackathon', date: 'Nov 22–23, 2026', location: 'CIBC Hall' },
      { title: 'Industry Tech Talk: Shopify', date: 'Nov 8, 2026', location: 'JHE 264' },
    ],
  },
  {
    id: 'mcmaster-science-society',
    name: 'Science Society',
    universitySlug: 'mcmaster',
    university: 'McMaster University',
    category: 'Academic',
    members: 4500,
    description:
      "The McMaster Science Society represents science faculty undergraduates, providing academic support, socials, research networking nights, and science-focused career fairs.",
    founded: 1957,
    website: 'https://sciencesociety.mcmaster.ca',
    nextEvent: 'Science Formal — Nov 29',
    events: [
      { title: 'Science Formal', date: 'Nov 29, 2026', location: 'Liuna Station Hamilton' },
      { title: 'Research Fair', date: 'Nov 13, 2026', location: 'Burke Science Building' },
    ],
  },

  // ── Queen's University ───────────────────────────────────────────────────
  {
    id: 'queens-ams',
    name: 'Alma Mater Society (AMS)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 24000,
    description:
      "The AMS is Queen's student government, one of the oldest in North America, delivering student services, clubs support, health & dental, and the iconic Orientation Week.",
    founded: 1858,
    website: 'https://myams.org',
    nextEvent: 'AMS Assembly — Nov 5',
    events: [
      { title: 'AMS Assembly', date: 'Nov 5, 2026', location: 'AMS Council Chambers, JDUC' },
      { title: 'Winter Carnival Planning Night', date: 'Nov 19, 2026', location: 'JDUC Ballroom' },
    ],
  },
  {
    id: 'queens-engsoc',
    name: 'Engineering Society (EngSoc)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 5000,
    description:
      "Queen's EngSoc runs the Engineering Frosh Week, formal dinner series, the charity Bed Race, and provides academic and professional development resources for engineering students.",
    founded: 1908,
    website: 'https://engsoc.queensu.ca',
    nextEvent: 'EngSoc Formal Dinner — Nov 20',
    events: [
      { title: 'EngSoc Formal Dinner', date: 'Nov 20, 2026', location: 'Ban Righ Hall' },
      { title: 'Charity Bed Race', date: 'Nov 12, 2026', location: 'University Ave' },
    ],
  },
  {
    id: 'queens-asus',
    name: 'Arts and Science Undergraduate Society (ASUS)',
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Student Government',
    members: 12000,
    description:
      "ASUS represents Arts and Science students at Queen's, running the faculty Orientation Week, Tricolour Weekend, and academic resource programs.",
    founded: 1924,
    website: 'https://asusqueens.ca',
    nextEvent: 'Tricolour Weekend Study Break — Nov 7',
    events: [
      { title: 'Tricolour Weekend Study Break', date: 'Nov 7, 2026', location: 'John Deutsch University Centre' },
      { title: 'ASUS Council Meeting', date: 'Nov 14, 2026', location: 'ASUS Office, JDUC 242' },
    ],
  },
  {
    id: 'queens-debating-union',
    name: "Queen's Debating Union",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Academic',
    members: 210,
    description:
      "Queen's Debating Union is one of Canada's premier debate societies, fielding competitive teams nationally and hosting the annual Queen's Invitational Tournament.",
    founded: 1877,
    website: 'https://queensdebating.ca',
    nextEvent: "Queen's Invitational Tournament — Nov 14",
    events: [
      { title: "Queen's Invitational Tournament", date: 'Nov 14–15, 2026', location: 'Theological Hall' },
      { title: 'Weekly Practice', date: 'Every Thursday 6 PM', location: 'Theological Hall' },
    ],
  },
  {
    id: 'queens-journal',
    name: "Queen's Journal",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Media',
    members: 140,
    description:
      "Canada's oldest continuously published student newspaper, founded in 1873. The Journal covers Queen's campus, Kingston, and national student news in print and digital.",
    founded: 1873,
    website: 'https://queensjournal.ca',
    nextEvent: 'Writers Meeting — Nov 3',
    events: [
      { title: 'Writers Meeting', date: 'Nov 3, 2026 5 PM', location: 'Journal Office, JDUC 149' },
      { title: 'Photography Masterclass', date: 'Nov 10, 2026', location: 'JDUC 149' },
    ],
  },
  {
    id: 'queens-film-and-media',
    name: "Queen's Film and Media",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Arts',
    members: 270,
    description:
      "Queen's Film and Media screens films, hosts scriptwriting workshops, and showcases student short films at its annual Film Festival.",
    nextEvent: 'Documentary Screening Night — Nov 6',
    events: [
      { title: 'Documentary Screening Night', date: 'Nov 6, 2026 7 PM', location: 'Stirling Hall Theatre' },
      { title: 'Student Film Festival', date: 'Dec 4, 2026', location: 'Isabel Bader Centre' },
    ],
  },
  {
    id: 'queens-model-united-nations',
    name: "Queen's Model United Nations",
    universitySlug: 'queens',
    university: "Queen's University",
    category: 'Politics',
    members: 320,
    description:
      "QMUN is one of Canada's largest MUN teams, competing internationally and hosting the annual Queen's Model United Nations Conference each spring.",
    founded: 1993,
    website: 'https://qmun.ca',
    nextEvent: 'QMUN Fall Training Day — Nov 5',
    events: [
      { title: 'QMUN Fall Training Day', date: 'Nov 5, 2026', location: 'Dunning Hall' },
      { title: 'Harvard HMUN Preparation', date: 'Nov 18, 2026 6 PM', location: 'Political Studies Lounge' },
    ],
  },

  // ── University of Calgary ────────────────────────────────────────────────
  {
    id: 'ucalgary-students-union',
    name: "Students' Union (SU)",
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Student Government',
    members: 31000,
    description:
      "The UCalgary SU is the student government for undergraduates, running campus services, clubs support, the Dinos Loyalty Program, and advocacy to UCalgary administration.",
    founded: 1966,
    website: 'https://su.ucalgary.ca',
    nextEvent: 'SU Council Meeting — Nov 3',
    events: [
      { title: 'SU Council Meeting', date: 'Nov 3, 2026', location: 'MacEwan Student Centre 368' },
      { title: 'Fall Clubs Day', date: 'Nov 17, 2026', location: 'MacEwan Student Centre' },
    ],
  },
  {
    id: 'ucalgary-engineering-students-society',
    name: 'Engineering Students Society',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Student Government',
    members: 6300,
    description:
      "The UCalgary ESS represents all engineering undergrads and runs Frosh Week, the Iron Ring ceremony, Schulich Engineering Outreach, and the annual Engineers Ball.",
    founded: 1953,
    website: 'https://ess.ucalgary.ca',
    nextEvent: 'Engineers Ball — Nov 22',
    events: [
      { title: 'Engineers Ball', date: 'Nov 22, 2026', location: 'Hotel Arts Calgary' },
      { title: 'Engineering Expo', date: 'Nov 8, 2026', location: 'ICT Building Atrium' },
    ],
  },
  {
    id: 'ucalgary-debate-club',
    name: 'UCalgary Debate Club',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 145,
    description:
      'The UCalgary Debate Club trains students in competitive parliamentary debate, competing at regional and national tournaments and hosting inter-department debates on campus.',
    nextEvent: 'Debate Practice — Nov 4',
    events: [
      { title: 'Debate Practice', date: 'Nov 4, 2026 7 PM', location: 'MacEwan Student Centre 206' },
      { title: 'Calgary Invitational', date: 'Nov 21–22, 2026', location: 'Social Sciences Building' },
    ],
  },
  {
    id: 'ucalgary-science-students-association',
    name: 'Science Students Association',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 5800,
    description:
      'The SSA represents science undergrads at UCalgary, running the annual SciPalooza event, tutoring services, research symposiums, and a competitive scholarship program.',
    founded: 1965,
    nextEvent: 'SciPalooza — Nov 18',
    events: [
      { title: 'SciPalooza Science Social', date: 'Nov 18, 2026', location: 'MacEwan Student Centre Ballroom' },
      { title: 'Research Symposium', date: 'Dec 3, 2026', location: 'Science Theatres' },
    ],
  },
  {
    id: 'ucalgary-dinos-athletics-club',
    name: 'Dinos Athletics Club',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Sports',
    members: 2100,
    description:
      'The Dinos Athletics Club organises student attendance, spirit events, and volunteer opportunities at UCalgary Dinos varsity games across football, hockey, basketball, and swimming.',
    nextEvent: 'Dinos vs. UAlberta Hockey — Nov 7',
    events: [
      { title: 'Dinos vs. UAlberta Hockey', date: 'Nov 7, 2026 7 PM', location: 'Father David Bauer Arena' },
      { title: 'Dinos Football Playoffs', date: 'Nov 14, 2026', location: 'McMahon Stadium' },
    ],
  },
  {
    id: 'ucalgary-business-students-association',
    name: 'Business Students Association',
    universitySlug: 'ucalgary',
    university: 'University of Calgary',
    category: 'Academic',
    members: 3500,
    description:
      'The Haskayne BSA connects business students at UCalgary with industry, running case competitions, networking mixers, mentorship programs, and the Haskayne Speaker Series.',
    founded: 1970,
    website: 'https://haskaynebs.ca',
    nextEvent: 'Business Case Competition — Nov 14',
    events: [
      { title: 'Business Case Competition', date: 'Nov 14, 2026', location: 'Scurfield Hall' },
      { title: 'Haskayne Speaker Series', date: 'Nov 26, 2026 12 PM', location: 'Scurfield Hall 225' },
    ],
  },

  // ── University of Alberta ────────────────────────────────────────────────
  {
    id: 'ualberta-students-union',
    name: "Students' Union (SU)",
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Student Government',
    members: 38000,
    description:
      "The UAlberta SU is one of Canada's oldest and largest student governments, operating the Students' Union Building, clubs, health plan, and student advocacy services.",
    founded: 1912,
    website: 'https://www.su.ualberta.ca',
    nextEvent: 'SU Council Meeting — Nov 4',
    events: [
      { title: 'SU Council Meeting', date: 'Nov 4, 2026', location: 'SUB 6-59' },
      { title: 'Student Rights Awareness Week', date: 'Nov 17, 2026', location: 'SUB Main Floor' },
    ],
  },
  {
    id: 'ualberta-engineering-students-society',
    name: 'Engineering Students Society (ESS)',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Student Government',
    members: 8100,
    description:
      "The UAlberta ESS represents all undergraduate engineering students, organising E-Week, the Iron Ring ceremony, career fairs, and the annual Grand Prix Go-Kart Race.",
    founded: 1907,
    website: 'https://ess.engineering.ualberta.ca',
    nextEvent: 'E-Week Opening Night — Nov 9',
    events: [
      { title: 'E-Week Opening Night', date: 'Nov 9, 2026', location: 'ETLC Atrium' },
      { title: 'Grand Prix Go-Kart Race', date: 'Nov 14, 2026', location: 'North Parking Lot' },
    ],
  },
  {
    id: 'ualberta-science-students-association',
    name: 'Science Students Association',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Academic',
    members: 6400,
    description:
      'The UAlberta SSA runs academic support services, social events, and research networking opportunities for undergraduate science students across all departments.',
    founded: 1960,
    nextEvent: 'Study Hall Session — Nov 5',
    events: [
      { title: 'Study Hall Session', date: 'Nov 5, 2026 6 PM', location: 'CCIS L2-190' },
      { title: 'Science Formal', date: 'Nov 28, 2026', location: 'Hotel Macdonald' },
    ],
  },
  {
    id: 'ualberta-gateway',
    name: 'The Gateway',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Media',
    members: 110,
    description:
      "The Gateway is the University of Alberta's student newspaper, published since 1910, covering campus news, investigations, culture, and opinion in print and online.",
    founded: 1910,
    website: 'https://www.thegatewayonline.ca',
    nextEvent: 'News Team Meeting — Nov 3',
    events: [
      { title: 'News Team Meeting', date: 'Nov 3, 2026 5 PM', location: 'Gateway Office, SUB 3-04' },
      { title: 'Journalism Workshop', date: 'Nov 17, 2026', location: 'Hub Mall' },
    ],
  },
  {
    id: 'ualberta-international-students-association',
    name: 'International Students Association',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Cultural',
    members: 2300,
    description:
      'The UAlberta ISA supports international students through orientation programs, cultural nights, visa and immigration help sessions, and social meetups across Edmonton.',
    website: 'https://ualbertaisa.ca',
    nextEvent: 'Cultural Night — Nov 12',
    events: [
      { title: 'Cultural Night', date: 'Nov 12, 2026 6 PM', location: 'SUB Ballroom' },
      { title: 'Winter Survival Guide for Newcomers', date: 'Nov 4, 2026', location: 'SUB Main Floor' },
    ],
  },
  {
    id: 'ualberta-students-for-sustainability',
    name: 'Students for Sustainability',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Environment',
    members: 390,
    description:
      'Students for Sustainability at UAlberta campaigns on climate action, runs the campus community garden, coordinates plastic-free initiatives, and connects with local environmental groups.',
    website: 'https://sfsualberta.ca',
    nextEvent: 'Climate Action Rally — Nov 7',
    events: [
      { title: 'Climate Action Rally', date: 'Nov 7, 2026 12 PM', location: 'Convocation Plaza' },
      { title: 'Community Garden Winterizing', date: 'Nov 1, 2026', location: 'East Campus Garden' },
    ],
  },
  {
    id: 'ualberta-computing-science-student-society',
    name: 'Computing Science Student Society (CS3)',
    universitySlug: 'ualberta',
    university: 'University of Alberta',
    category: 'Tech',
    members: 1650,
    description:
      'CS3 is the student society for Computing Science students at UAlberta, running hackathons, industry talks, a competitive programming club, and the annual CS Games qualifier.',
    website: 'https://cs3ualberta.ca',
    nextEvent: 'Industry Networking Night — Nov 10',
    events: [
      { title: 'Industry Networking Night', date: 'Nov 10, 2026 5:30 PM', location: 'Computing Science Centre' },
      { title: 'Competitive Programming Round', date: 'Nov 24, 2026', location: 'CS Lab CSC 259' },
    ],
  },

  // ── Carleton University ──────────────────────────────────────────────────
  {
    id: 'carleton-cusa',
    name: 'Carleton University Students Association (CUSA)',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Student Government',
    members: 25000,
    description:
      'CUSA is the undergraduate student government at Carleton, operating student clubs, the CUSA Pub (Roosters), student services, and advocacy with the university.',
    founded: 1942,
    website: 'https://www.cusaonline.ca',
    nextEvent: 'CUSA Council Meeting — Nov 4',
    events: [
      { title: 'CUSA Council Meeting', date: 'Nov 4, 2026', location: 'Unicentre 508' },
      { title: 'Fall Carnival', date: 'Nov 18, 2026', location: 'Unicentre Atrium' },
    ],
  },
  {
    id: 'carleton-film-society',
    name: 'Carleton Film Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Arts',
    members: 135,
    description:
      'The Carleton Film Society screens classic cinema, runs student filmmaking workshops, and hosts the annual Ravens Reel Film Competition for student short films.',
    founded: 1969,
    nextEvent: 'Italian Neorealism Night — Nov 6',
    events: [
      { title: 'Italian Neorealism Night', date: 'Nov 6, 2026 7 PM', location: 'Richcraft Hall 2400' },
      { title: 'Ravens Reel Competition', date: 'Dec 3, 2026', location: 'Richcraft Hall Theatre' },
    ],
  },
  {
    id: 'carleton-debate-club',
    name: 'Carleton Debate Club',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Academic',
    members: 160,
    description:
      'The Carleton Debate Club fields competitive parliamentary debate teams at regional, national, and international tournaments and runs open public debates on campus.',
    nextEvent: 'Weekly Practice — Nov 5',
    events: [
      { title: 'Weekly Practice', date: 'Nov 5, 2026 7 PM', location: 'Paterson Hall 246' },
      { title: 'Carleton Open Invitational', date: 'Nov 20–21, 2026', location: 'Richcraft Hall' },
    ],
  },
  {
    id: 'carleton-engineering-students-society',
    name: 'Carleton Engineering Students Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Student Government',
    members: 4800,
    description:
      'CESS represents engineering students at Carleton, running Frosh Week, the Iron Ring ceremony, engineering competitions, and social events throughout the year.',
    founded: 1964,
    website: 'https://cesscarleton.ca',
    nextEvent: 'Robotics Showcase — Nov 13',
    events: [
      { title: 'Robotics Showcase', date: 'Nov 13, 2026', location: 'Canal Building Atrium' },
      { title: 'Engineering Formal', date: 'Nov 28, 2026', location: 'Shaw Centre Ottawa' },
    ],
  },
  {
    id: 'carleton-architecture-students-society',
    name: 'Architecture Students Society',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Academic',
    members: 580,
    description:
      "The ASS represents students at Carleton's Azrieli School of Architecture & Urbanism, organising studio critiques, design competitions, and architectural site tours.",
    nextEvent: 'Midterm Critique Night — Nov 9',
    events: [
      { title: 'Midterm Critique Night', date: 'Nov 9, 2026', location: 'Architecture Building Studio' },
      { title: 'Studio Culture Night', date: 'Nov 23, 2026', location: 'Architecture Building' },
    ],
  },
  {
    id: 'carleton-journalism-students-association',
    name: 'Journalism Students Association',
    universitySlug: 'carleton',
    university: 'Carleton University',
    category: 'Media',
    members: 290,
    description:
      "The JSA represents students in Carleton's nationally renowned Journalism school, hosting industry panels, CBC and Globe & Mail career workshops, and an annual journalism awards gala.",
    founded: 1945,
    nextEvent: 'Journalism Panel: Digital Media — Nov 11',
    events: [
      { title: 'Journalism Panel: Digital Media', date: 'Nov 11, 2026 5 PM', location: 'River Building 3224' },
      { title: 'Annual Journalism Awards Gala', date: 'Nov 28, 2026', location: 'Alumni Theatre' },
    ],
  },

  // ── Concordia University ─────────────────────────────────────────────────
  {
    id: 'concordia-csu',
    name: 'Concordia Student Union (CSU)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Student Government',
    members: 35000,
    description:
      "The CSU is Concordia's undergraduate student government, running student services, clubs, the People's Potato free lunch, legal advocacy, and the annual campus events program.",
    founded: 1974,
    website: 'https://csu.qc.ca',
    nextEvent: 'CSU General Assembly — Nov 5',
    events: [
      { title: 'CSU General Assembly', date: 'Nov 5, 2026', location: 'Hall Building H-110' },
      { title: "People's Potato Weekly Lunch", date: 'Every Wednesday 12 PM', location: 'Hall Building H-760' },
    ],
  },
  {
    id: 'concordia-eca',
    name: 'Engineering & Computer Science Association (ECA)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Student Government',
    members: 7200,
    description:
      'The ECA represents engineering and computer science undergraduates at Concordia, running E-Week, the Iron Ring ceremony, hackathons, and faculty networking events.',
    founded: 1952,
    website: 'https://encs.concordia.ca/eca',
    nextEvent: 'ECA Hackathon — Nov 15',
    events: [
      { title: 'ECA Hackathon', date: 'Nov 15–16, 2026', location: 'EV Building' },
      { title: 'E-Week Kickoff', date: 'Nov 8, 2026', location: 'EV Atrium' },
    ],
  },
  {
    id: 'concordia-fasa',
    name: 'Fine Arts Student Alliance (FASA)',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Arts',
    members: 2800,
    description:
      "FASA represents Concordia's Fine Arts faculty students, advocating for arts funding and organising gallery openings, art fairs, and the annual FASA Art Market.",
    founded: 1971,
    website: 'https://fasaconcordia.com',
    nextEvent: 'FASA Art Market — Nov 14',
    events: [
      { title: 'FASA Art Market', date: 'Nov 14, 2026 11 AM–6 PM', location: 'Grey Nuns Building Atrium' },
      { title: 'Student Exhibition Opening', date: 'Nov 21, 2026', location: 'VAV Gallery' },
    ],
  },
  {
    id: 'concordia-cjlo',
    name: 'CJLO — Concordia Campus Radio',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Media',
    members: 210,
    description:
      "CJLO 1690 AM is Concordia's campus and community radio station, broadcasting music, talk, and arts programming 24/7 and training students in radio production.",
    founded: 1997,
    website: 'https://cjlo.com',
    nextEvent: 'CJLO Fall Volunteer Orientation — Nov 3',
    events: [
      { title: 'CJLO Fall Volunteer Orientation', date: 'Nov 3, 2026 6 PM', location: 'Hall Building H-648' },
      { title: 'Radiothon Fundraiser', date: 'Nov 20, 2026', location: 'Live on Air — 1690 AM' },
    ],
  },
  {
    id: 'concordia-documentary-film-association',
    name: 'Concordia Documentary Film Association',
    universitySlug: 'concordia',
    university: 'Concordia University',
    category: 'Arts',
    members: 180,
    description:
      'The CDFA supports documentary filmmaking at Concordia through screenings, practitioner talks, equipment workshops, and the annual Docurama film showcase.',
    nextEvent: 'Docurama Showcase — Nov 18',
    events: [
      { title: 'Docurama Showcase', date: 'Nov 18, 2026 6 PM', location: "Concordia Cinema, J.A. DeSève" },
      { title: 'Documentary Filmmaking Masterclass', date: 'Nov 7, 2026', location: 'Visual Arts Building VA-114' },
    ],
  },
]

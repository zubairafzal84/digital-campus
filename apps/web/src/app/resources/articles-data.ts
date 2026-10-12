export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readMinutes: number
  publishedAt: string
  content: string
  tags: string[]
  relatedSlugs: string[]
}

export const CATEGORIES = [
  'Scholarships',
  'Housing',
  'Student Finance',
  'Career & Co-op',
  'Campus Life',
  'Health & Wellness',
  'Study Tips',
] as const

export const ARTICLES: Article[] = [
  {
    id: 'how-to-apply-for-osap-2025',
    slug: 'how-to-apply-for-osap-2025',
    title: 'How to Apply for OSAP: Step-by-Step Guide for Ontario Students',
    excerpt:
      'OSAP can cover tuition, books, and living costs — but only if you apply correctly and on time. This guide walks you through eligibility, the application process, and how to maximize your grant.',
    category: 'Student Finance',
    readMinutes: 7,
    publishedAt: '2025-08-15',
    tags: ['OSAP', 'Ontario', 'Financial Aid', 'Grants', 'Loans'],
    relatedSlugs: ['student-budget-canada', 'canadian-student-scholarship-guide'],
    content: `## What Is OSAP?

The Ontario Student Assistance Program (OSAP) is the provincial government's financial aid program for post-secondary students. It combines non-repayable grants and repayable loans to help cover tuition, books, housing, and other education-related costs. For the 2025–26 academic year, eligible students can receive up to roughly $12,000 or more in combined aid, depending on income and family size.

## Who Is Eligible?

To qualify for OSAP you must:

- Be a Canadian citizen, permanent resident, or protected person
- Be an Ontario resident (lived in Ontario for 12 consecutive months before starting school, not counting time in school)
- Be enrolled at a designated Ontario college or university
- Be in financial need (assessed based on family income)
- Maintain satisfactory academic progress

Full-time students get the most funding. Part-time students can apply through the Part-Time OSAP stream, which offers smaller amounts.

**International students are not eligible for OSAP.** If you are an international student, look at institutional scholarships, your country's government aid programs, and private bursaries.

## Grant vs. Loan: What's the Difference?

OSAP funding comes in two forms:

**Ontario Student Grant (OSG)** — This is free money. You do not pay it back. The grant is automatically calculated based on your household income and family size. Students from families earning under roughly $175,000 a year typically qualify for some grant amount. The lower the family income, the larger the grant.

**Student Loan** — This portion must be repaid after you leave school. Repayment begins six months after your last day of study. Loans accrue no interest while you are in school.

Most students receive a mix of both. OSAP shows you exactly how much is grant versus loan in your funding offer.

## When to Apply

The OSAP application opens in early spring for the upcoming fall semester. Key dates for 2025–26:

- **Application opens:** April 2025
- **Recommended deadline for fall semester:** June 30, 2025 (ensures funding arrives before school starts)
- **Absolute latest:** 60 days before your last day of school for the year

Apply as early as possible. Processing takes 4–6 weeks, and you need the assessment before you can confirm your enrolment aid at your school.

## What Documents You Need

Before sitting down to apply at **ontario.ca/osap**, gather the following:

1. **Social Insurance Number (SIN)** — Required for both you and a parent/spouse if their income is assessed
2. **Notice of Assessment (NOA)** — Your most recent CRA tax return. OSAP can auto-populate this if you consent to share with CRA
3. **Parent or spouse income information** — If you are a dependent student (under 22 and not married/common-law for 2+ years), your parents' income is assessed
4. **Institution and program details** — Your school's name, program code, start/end dates
5. **Expected income while in school** — Part-time jobs count

You apply online; no paper forms are needed.

## How the Application Works

1. **Create an OSAP account** at ontario.ca/osap using your SIN
2. **Complete the application** — It takes about 30–45 minutes. Answer every section carefully; errors cause delays
3. **Consent to income verification** — Allow OSAP to pull your CRA tax info automatically
4. **Submit and wait** — Processing typically takes 4–6 weeks
5. **Review your funding letter** — You'll receive an email when your assessment is ready. Log in to view your grant and loan breakdown
6. **Accept your funding** — Accept the offer online and add your bank account for direct deposit
7. **Your school confirms enrolment** — Once the school certifies you are enrolled, funds are released

## Tips to Maximize Your Grant

- **File your taxes even if you have no income.** OSAP uses your tax return to assess your grant. A missing return means OSAP assumes higher income.
- **Apply for the fall and winter together.** A full-year application often results in higher grants than two separate applications.
- **Report accurate living costs.** If you live away from home, report rent and utilities honestly; these increase your assessed need.
- **Declare your dependents.** If you have children, they significantly increase your eligible amount.
- **Check the 30% Off Ontario Tuition grant.** Automatically factored in, but confirm it appears on your assessment.

## After You Graduate

You have a six-month non-repayment period after leaving school. After that, your loan enters the National Student Loans Service Centre (NSLSC) system. You can choose repayment plans, apply for the Repayment Assistance Plan (RAP) if income is low, and consolidate provincial and federal portions. Provincial grants never require repayment.

OSAP is the single most important financial tool for Ontario students. Apply early, file your taxes, and check your funding letter for accuracy every year.`,
  },
  {
    id: 'best-student-housing-toronto',
    slug: 'best-student-housing-toronto',
    title: 'Best Neighbourhoods for Students in Toronto (2025 Guide)',
    excerpt:
      'Toronto is expensive, but some neighbourhoods offer much better value than others. Here is a practical breakdown of where to live near UofT, TMU, and York.',
    category: 'Housing',
    readMinutes: 8,
    publishedAt: '2025-09-01',
    tags: ['Toronto', 'Housing', 'UofT', 'TMU', 'York', 'Rentals'],
    relatedSlugs: ['student-budget-canada', 'best-student-cities-canada'],
    content: `## The Toronto Student Housing Landscape

Toronto is Canada's largest city and one of its most expensive rental markets. Average one-bedroom rent sits around $2,200–$2,500/month in 2025, and studios rarely come in under $1,700. That said, thousands of students live here affordably by choosing the right neighbourhood, finding roommates, and understanding which transit routes shave commute time.

This guide covers the best areas for students attending the University of Toronto (St. George campus), Toronto Metropolitan University (TMU, formerly Ryerson), and York University.

## The Annex — Best for UofT Students

**Average rent:** $1,600–$2,000/month (1BR), $900–$1,100/room in a shared house

The Annex sits directly north of UofT's St. George campus, bounded by Bloor Street, Spadina, and Dupont. It's the archetypal student neighbourhood — tree-lined streets, century homes converted into rooming houses, and coffee shops on every block.

**Pros:**
- 5–15 minute walk to UofT's main buildings
- Extremely walkable; most errands done on foot
- Excellent restaurants and independent bookstores
- Safe, tight-knit community

**Cons:**
- One of the pricier student areas in Toronto
- Old housing stock means some units lack A/C and have outdated plumbing
- Parking nearly impossible

Transit: Spadina and Bathurst subway stations on Line 2.

## Kensington Market — Affordable and Vibrant

**Average rent:** $1,400–$1,800/month (1BR), $800–$1,000/room shared

Just west of the Annex and south of Bloor, Kensington Market is a bohemian neighbourhood known for vintage shops, independent food vendors, and a very walkable, dense streetscape. It appeals to arts and social-science students.

**Pros:**
- Cheaper than the Annex for comparable units
- Short walk or bike ride to both UofT and TMU
- Some of the best multicultural food in Canada at very low prices
- Vibrant community events year-round

**Cons:**
- Noisy on weekends (it is an entertainment district)
- Limited parking; bike theft is a known issue
- Some streets are poorly lit

Transit: Walking distance to College (Line 1) and Spadina (Line 2) stations.

## Little Italy (College West) — Good for TMU and UofT

**Average rent:** $1,500–$1,900/month (1BR), $850–$1,050/room shared

College Street west of Bathurst is where students who want slightly more space and a calmer vibe end up. The neighbourhood borders Kensington and has the same transit access.

**Pros:**
- Excellent restaurants and bars
- Slightly quieter than Kensington
- Good transit connections westward

**Cons:**
- Further from TMU's Yonge–Dundas location (20–25 min by transit)

## Downtown East (St. James Town / Church-Yonge) — Best for TMU

**Average rent:** $1,500–$2,100/month (1BR), $900–$1,150/room shared

St. James Town is one of Toronto's densest postal codes — high-rise apartment towers with more competitive rents than downtown west. It is a 5–10 minute walk east from TMU's main campus.

**Pros:**
- Very close to TMU
- High-rise buildings often include laundry, gym, and security
- Close to the Financial District for part-time jobs
- Excellent transit — multiple TTC streetcar and subway connections

**Cons:**
- Some buildings are aging; inspect units carefully
- Less charming neighbourhood feel than Annex or Kensington

## Scarborough — Most Affordable, Furthest Out

**Average rent:** $1,200–$1,600/month (1BR), $700–$900/room shared

Scarborough (particularly near University of Toronto Scarborough / UTSC and Centennial College) offers some of the city's lowest rents. Trade-off is commute time to downtown.

**Pros:**
- Significantly cheaper than central neighbourhoods
- Good access to UTSC and Centennial
- Large STC shopping mall nearby

**Cons:**
- 45–60 minute commute to UofT's St. George campus by transit
- Car ownership is helpful; walkability scores are low

Transit: Scarborough RT (replacement LRT under construction) and Kennedy Station on Line 2.

## Etobicoke — Budget Option Near York

**Average rent:** $1,300–$1,700/month (1BR), $750–$950/room shared

For York University students, Etobicoke and the Jane–Finch corridor offer cheaper rents than downtown. York's Keele campus is in a suburban area and most students commute.

**Pros:**
- Cheapest rents of any area on this list
- Quiet and residential
- Good access to York via the Finch West LRT (opened 2024)

**Cons:**
- Far from downtown (45+ min)
- Limited walkability; a car helps

## Finding a Place: Tips for Toronto

1. **Start looking 3–4 months before move-in.** Toronto's market is fast-moving.
2. **Use Facebook Marketplace and Kijiji** alongside Rentals.ca and Zumper.
3. **Inspect before signing.** Ask about heating costs (some older homes have expensive gas bills), laundry, and pest history.
4. **Understand Ontario lease law.** One-year leases roll month-to-month automatically; landlords cannot increase rent during a fixed term.
5. **Get renter's insurance.** It costs $15–$25/month and is almost always required by landlords.`,
  },
  {
    id: 'canadian-student-scholarship-guide',
    slug: 'canadian-student-scholarship-guide',
    title: 'The Complete Guide to Canadian Student Scholarships',
    excerpt:
      'There are billions of dollars in scholarship funding available to Canadian students every year — most of it goes unclaimed. Here is how to find, apply for, and win scholarships at every level.',
    category: 'Scholarships',
    readMinutes: 9,
    publishedAt: '2025-07-20',
    tags: ['Scholarships', 'Canada', 'Financial Aid', 'NSERC', 'Vanier'],
    relatedSlugs: ['how-to-apply-for-osap-2025', 'nserc-usra-guide'],
    content: `## Why Most Scholarship Money Goes Unclaimed

Every year, Canadian universities, federal agencies, provincial governments, and private foundations distribute hundreds of millions of dollars in scholarship funding. Studies consistently find that a significant portion of private scholarship funds go unclaimed — not because students are ineligible, but because they do not know the awards exist or they believe the application is too difficult.

This guide breaks down every type of scholarship available to Canadian students, explains how to find them, and gives you a realistic application strategy.

## Types of Scholarships

### Federal Government Scholarships

Canada's federal research councils are the most prestigious scholarship sources:

**Vanier Canada Graduate Scholarships** — $50,000/year for three years of doctoral study. Extremely competitive; roughly 166 awarded annually across all fields.

**NSERC (Natural Sciences and Engineering)** — Undergraduate awards (USRA), master's (PGS M), and doctoral (PGS D) fellowships for science and engineering students. PGS D pays $21,000/year for two years.

**SSHRC (Social Sciences and Humanities)** — Equivalent to NSERC but for arts, humanities, and social sciences. SSHRC Doctoral Fellowship: $20,000/year for up to four years.

**CIHR (Canadian Institutes of Health Research)** — Health and medical research scholarships. Doctoral: $35,000/year.

**Canada Graduate Scholarships — Master's (CGS M)** — All three councils offer $17,500 for one year of master's study. Apply through your university.

### Provincial Scholarships

Each province runs its own programs:

- **Ontario:** Ontario Graduate Scholarship ($15,000/year, funded jointly with universities), Queen Elizabeth II Graduate Scholarships in Science & Technology
- **BC:** BC Graduate Scholarship ($15,000/year), Pacific Century Scholarship
- **Alberta:** Alberta Graduate Excellence Scholarship
- **Quebec:** FRQSC, FRQNT, FRQS doctoral scholarships ($20,000–$25,000/year)

Check your province's student aid office for current amounts — they change annually.

### Institutional Scholarships

Every Canadian university offers entrance scholarships (merit-based, awarded on admission) and in-course scholarships (awarded to continuing students by department or faculty). These are often underutilized because students do not know to apply.

**How to find them:**
1. Log in to your student portal and search for "awards and financial assistance"
2. Email your department's graduate coordinator (even undergrads) to ask about departmental awards
3. Check your university's award database (usually called "Award Finder" or similar)

Entrance scholarships can range from $1,000 to $40,000 and are sometimes awarded automatically at admission.

### Private and Corporate Scholarships

This is where unclaimed money is most concentrated. Thousands of foundations, corporations, associations, and families fund scholarships that target specific communities, fields, hobbies, or hometowns.

**Examples:**
- **RBC Future Launch Scholarship** — $5,000, for students facing barriers
- **Loran Scholars Foundation** — $100,000+ over four years, for character and leadership
- **TD Scholarships for Community Leadership** — $70,000 over four years
- **Schulich Leader Scholarships** — $80,000–$100,000 for STEM at 20 universities
- **McCall MacBain Scholarships at McGill** — Full ride for master's students
- **Indspire scholarships** — For First Nations, Métis, and Inuit students

Search ScholarshipsCanada.com and your provincial student aid site for comprehensive databases.

## Application Tips That Actually Work

**Write your narrative early.** Most scholarship applications ask some version of "tell us about yourself and your goals." Spend time on this. The students who win do not write generic essays — they connect specific experiences to specific goals.

**Target fit, not prestige.** A $1,000 local bursary with 10 applicants is statistically easier to win than the Vanier. Build a portfolio of applications across prestige levels.

**Get strong references early.** Professors write hundreds of reference letters. Ask 3–4 months in advance, provide your CV, transcript, and a draft of your personal statement, and remind them of your best work together.

**Apply even if you think you are underqualified.** Many applicants self-select out. GPA cutoffs are minimums, not averages.

**Track every deadline.** Use a spreadsheet: scholarship name, amount, deadline, documents required, submitted date, result. This is not optional — missing one deadline wastes all the preparation work.

## Common Mistakes

- **Waiting until 4th year.** Many scholarships are for all years, and applying early builds practice.
- **Not tailoring essays.** Reviewers can tell when you paste the same essay.
- **Ignoring small awards.** $500 from five sources is $2,500.
- **Not following format instructions.** Font, word count, and margin rules are elimination filters, not suggestions.

## Timeline: When to Apply for What

| Period | Action |
|--------|--------|
| August–September | Entrance scholarship deadlines for next year at many universities |
| October–November | Major federal scholarship deadlines (NSERC, SSHRC, CIHR) |
| January–February | Provincial and many institutional scholarship deadlines |
| Rolling | Many private scholarships; check monthly |

Start a spreadsheet now. Apply this year, even if you are unsure. The process itself teaches you how to present your own story.`,
  },
  {
    id: 'coop-vs-internship-canada',
    slug: 'coop-vs-internship-canada',
    title: "Co-op vs Internship in Canada: What's the Difference?",
    excerpt:
      "Canada's co-op model is one of the most rigorous work-integrated learning systems in the world. But co-op and internship are not interchangeable — here's what you need to know.",
    category: 'Career & Co-op',
    readMinutes: 6,
    publishedAt: '2025-08-01',
    tags: ['Co-op', 'Internship', 'Career', 'Waterloo', 'Work Experience'],
    relatedSlugs: ['best-student-cities-canada', 'nserc-usra-guide'],
    content: `## The Canadian Co-op System Explained

Canada is internationally recognized for co-operative education (co-op), particularly through the University of Waterloo, which runs the largest co-op program in the world with over 20,000 students and 7,000 employers. But the difference between a co-op and an internship confuses many students — and even some employers.

## What Is a Co-op?

A co-op (cooperative education) is a structured, academic program in which students alternate between study terms and paid work terms. The work component is part of your academic record.

**Key characteristics of a co-op:**
- **Accredited by your institution.** Your work term appears on your transcript and is evaluated by your school's co-op office.
- **Alternating terms.** You switch between school and work on a schedule set by the program — often every four months.
- **Coordinated placement.** The school's co-op office connects you to employers, manages contracts, and ensures the work is educationally relevant.
- **Required for graduation** in many programs (especially at Waterloo, McMaster Engineering, UBC co-op streams, etc.)
- **Evaluated.** Your employer submits a work-term evaluation, and you write a work-term report. These are graded.

The University of Waterloo's system is the gold standard: students complete five 4-month work terms, typically graduating with 20 months of full-time, relevant work experience before ever holding a "real" job. Waterloo co-op students frequently land roles at Google, Microsoft, Shopify, and global banks while still undergrads.

**Co-op pay (2025 averages):**
- Engineering / Computer Science: $22–$40/hour
- Business / Accounting: $18–$28/hour
- Sciences: $17–$25/hour

## What Is an Internship?

An internship is a work experience arrangement — typically voluntary from the degree-requirement standpoint — that is usually done in the summer between academic years.

**Key characteristics of an internship:**
- **Not accredited.** It does not appear on your transcript and is not evaluated by your school (unless you enrol in a course credit option, where one exists).
- **Usually one term (summer).** Most internships run May–August, 12–16 weeks.
- **Self-arranged.** You find and apply for internships yourself through job boards, LinkedIn, or your network. The school has no formal role.
- **Not required for graduation** in most programs.
- **Unpaid internships are mostly illegal in Canada.** Ontario, BC, and most provinces classify unpaid internships as violations of employment standards unless the role is part of an accredited program. Legitimate internships are paid.

**Internship pay (2025):** Similar to co-op rates, but more variable. Smaller companies pay less; FAANG-tier internships can pay $40–$60/hour.

## Programs with Strong Co-op

Universities with formal co-op streams (these are selective — you apply to the co-op stream specifically):

- **University of Waterloo** — Nearly every program has co-op; the school is structured around it
- **Simon Fraser University** — One of the largest co-op programs in BC
- **University of Victoria** — Strong co-op in Engineering and Science
- **McMaster University** — Engineering co-op is well-regarded
- **Carleton University** — Engineering and IT have strong co-op
- **University of Guelph** — Agriculture, science, and business co-op
- **Dalhousie University** — CS and Engineering co-op

## Which Should You Choose?

If your school offers a co-op stream in your program, **apply for it.** The coordinated placement, academic credit, and employer reputation networks are hard to replicate on your own.

If your school does not offer co-op, **pursue internships aggressively.** Start applying in January for summer positions. Many large employers (RBC, Deloitte, Shopify, Amazon Canada) have structured internship programs with formal recruiting cycles.

**Both on a resume?** Yes. A student who has done a co-op and a separate summer internship is highly competitive. The co-op demonstrates commitment and structured learning; the internship shows initiative.

## The Bottom Line

| Feature | Co-op | Internship |
|---------|-------|------------|
| Academic credit | Yes | Usually no |
| School-coordinated | Yes | No |
| Required for graduation | Often | No |
| Timing | Alternating terms | Summer (usually) |
| Length | 4–8 months per term | 3–4 months |
| Transcript | Yes | No |

If Waterloo-style co-op is right for your career goals, it is one of the strongest career investments you can make as a Canadian student.`,
  },
  {
    id: 'student-budget-canada',
    slug: 'student-budget-canada',
    title: 'How to Budget as a Canadian Student: A Practical Guide',
    excerpt:
      'Canadian city costs vary dramatically — Vancouver is brutal, Montreal is manageable, mid-sized cities hit a sweet spot. Here is how to set a realistic student budget wherever you are.',
    category: 'Student Finance',
    readMinutes: 7,
    publishedAt: '2025-09-10',
    tags: ['Budget', 'Student Finance', 'Cost of Living', 'Canada', 'OSAP'],
    relatedSlugs: ['how-to-apply-for-osap-2025', 'best-student-housing-toronto'],
    content: `## Student Budgeting in Canada: Starting Point

The average Canadian undergraduate spends between $20,000 and $35,000 per year, including tuition, housing, food, and personal expenses. The range is large because costs vary enormously by city, school, and lifestyle. Understanding what drives costs — and where to cut — is the foundation of financial stability during your degree.

## Average Annual Costs by City (2025)

These are full-year estimates for a single student living off-campus. On-campus residence typically costs 10–15% more than equivalent off-campus rentals.

**Vancouver / UBC / SFU**
- Rent: $14,400–$18,000/year ($1,200–$1,500/month for a room in a shared house)
- Food: $4,800–$6,000/year
- Transit: $1,200/year (U-Pass included for most students)
- Books and supplies: $1,200/year
- Personal and misc: $2,400/year
- **Total (excluding tuition): $24,000–$28,600/year**

Vancouver consistently ranks as Canada's most expensive student city. Students attending UBC or SFU should factor this into their financial planning — OSAP is BC-based (StudentAidBC) and provincial grants may not fully close the gap.

**Toronto / UofT / TMU / York**
- Rent: $12,000–$15,600/year ($1,000–$1,300/month shared)
- Food: $4,800–$6,000/year
- Transit: $1,440/year (TTC, student monthly pass)
- Books and supplies: $1,200/year
- Personal: $2,400/year
- **Total (excluding tuition): $21,840–$26,200/year**

**Ottawa / Carleton / uOttawa**
- Rent: $9,600–$13,200/year ($800–$1,100/month shared)
- Food: $4,200–$5,400/year
- Transit: $768/year (student OC Transpo pass)
- **Total (excluding tuition): $17,568–$21,600/year**

**Waterloo / Laurier**
- Rent: $8,400–$10,800/year ($700–$900/month shared)
- Food: $4,200/year
- **Total (excluding tuition): $15,000–$18,000/year**

**Montreal / McGill / Concordia / UQAM**
- Rent: $8,400–$10,800/year ($700–$900/month shared)
- Food: $3,600–$4,800/year
- Transit: $840/year (STM student pass)
- **Total (excluding tuition): $14,000–$18,000/year**

Montreal is the most affordable major student city in Canada. Quebec tuition for Quebec residents is also substantially lower (under $3,000/year at most universities, compared to $7,000–$12,000 in other provinces). Out-of-province students pay higher fees.

## Income Sources for Students

**OSAP / Provincial Grants and Loans**
Ontario, BC, Alberta, and other provinces provide direct grants and loans. Maximum combined aid varies by province and income. Ontario students can receive up to $12,000+ in grants and loans annually.

**Part-Time Work**
Most students work 10–20 hours per week during school. At $18/hour (Ontario minimum wage in 2025), 15 hours/week for 32 school weeks generates roughly $8,640 before tax.

**International Student Work Rules:** International students on a study permit can work **up to 24 hours per week off-campus** during academic sessions (increased from 20 hours in 2024). On-campus work has no hour limit. During scheduled breaks (reading week, summer), you can work full-time.

**Co-op and Summer Work**
Co-op students earn full-time salaries during work terms — often $20–$35/hour. This is the single most powerful income source for eligible students.

## Student Discounts That Actually Matter

- **Transit:** Almost every Canadian city offers student monthly passes at 20–40% off adult rates. Apply for a U-Pass at enrollment if your school offers one.
- **Spotify / Apple Music / YouTube Premium** — student pricing cuts costs 50%+
- **Microsoft Office 365** — many schools provide it free
- **Amazon Prime Student** — 6-month free trial, then half-price
- **SPC Card** — $12/year, discounts at 350+ Canadian retailers
- **Via Rail** — student discount card for train travel
- **Cineplex / movie theatres** — student pricing applies all week

## Food Budget Tips

Food is where most students overspend or undereat. A realistic $350–$500/month food budget is achievable:

- Cook 5–6 days a week; eating out daily easily doubles costs
- Costco or No Frills membership saves $600–$1,000/year vs convenience stores
- Learn 8–10 base meals that cost $3–5 per serving and rotate them
- Use apps like Flipp for local grocery flyers
- Campus cafeteria meal plans are usually poor value — opt out if you can

## A Simple Monthly Budget Template

| Category | Estimate |
|----------|----------|
| Rent (shared, mid-city) | $900 |
| Groceries | $350 |
| Transit | $80 |
| Phone | $40 (student plan) |
| Personal / Hygiene | $60 |
| Entertainment | $80 |
| Books / Supplies | $100 |
| Emergency fund | $50 |
| **Total** | **$1,660** |

At 15 hours/week at $18/hour you earn ~$270/week or ~$1,080/month after tax. Combined with OSAP grants and a summer income buffer, this is manageable. The key is tracking every expense in the first semester until habits form.`,
  },
  {
    id: 'frosh-week-survival-guide',
    slug: 'frosh-week-survival-guide',
    title: "Frosh Week Survival Guide: What to Expect in Your First Week",
    excerpt:
      "Frosh week is louder and more disorienting than anyone warns you. Here's what it actually looks like, how to pace yourself, and how to make connections that last.",
    category: 'Campus Life',
    readMinutes: 5,
    publishedAt: '2025-08-20',
    tags: ['Frosh Week', 'Orientation', 'Campus Life', 'First Year', 'Social'],
    relatedSlugs: ['student-mental-health-resources-canada', 'student-budget-canada'],
    content: `## What Is Frosh Week?

Frosh week (also called Orientation Week or O-Week) is the week before classes officially start — usually late August or early September — when universities organize events to welcome new students. Almost every Canadian university runs one.

It is loud, busy, and often exhausting. It is also genuinely one of the best opportunities to meet people you'll know for the rest of your degree. The students who opt out entirely often regret it.

## What Actually Happens

Frosh week varies by school and faculty, but expect a mix of:

**Day 1–2:**
- Registration and check-in for residence (if you're in rez)
- Campus tours led by upper-year Frosh leaders (identifiable by matching shirts)
- Meeting your faculty's frosh group (usually 20–30 students assigned together)
- Ice-breakers that range from awkward to genuinely fun
- Meals in communal dining halls — these are great for meeting people

**Day 3–5:**
- Faculty-specific events (Engineering schools often have legendary traditions)
- Club and society fair — **do not skip this** (more below)
- Academic orientation sessions with department advisors
- Campus-wide social events — concerts, outdoor movies, carnival games
- Evening events that range from trivia nights to larger parties

## The Club Fair: The Most Important Hour of Frosh Week

Every Canadian university has a student union that hosts a clubs/societies fair during orientation. Hundreds of student clubs set up tables in the gym or quad and recruit new members.

**Go. Walk every aisle.**

Student clubs are how you find your people, build your resume, and create the social infrastructure of your university life. At schools like UofT, there are 1,000+ registered clubs. Somewhere in there are people with exactly your interests.

What to do at the club fair:
- Sign up for email lists with your student email (you can unsubscribe later)
- Talk to the club members; ask "what does your club actually do week to week?"
- Focus on 2–3 clubs max to start; joining 10 and attending none is worse than joining one
- Look specifically at your faculty-based clubs, professional associations (accounting, engineering, premed), cultural associations, and sports

## Tips for Introverts

Frosh week is designed for extroverts by extroverts. If large groups drain you, here is what works:

**Find one person, not a group.** In the dining hall or during a tour, talk to the person standing alone. You are both in exactly the same position. Even a brief conversation helps you feel less anonymous.

**Give yourself permission to leave early.** Going to two events and leaving at 10pm is better than not going at all.

**Use the quieter morning events.** Academic panels, campus tours, and registration help sessions are lower-stimulation but still involve meeting people.

**Dorms are loud but so is everyone.** If you are in residence, leave your door open during the day. This sounds trivial but it is the single most effective way to meet dorm neighbors.

## What to Bring to Frosh Week

- **Student card (pick it up ASAP).** You need it for almost everything: library, dining halls, gym access, transit discounts.
- **Comfortable shoes.** You will walk 5–10km a day.
- **Phone charger and portable battery.** Events are long.
- **Light rain jacket.** Canadian September weather varies.
- **Cash and card.** Some activities require payment.
- **Notebook or phone notes.** Write down names of people you want to follow up with.

## Registering for Clubs and Activities

After the fair, most clubs hold their first general meeting in week 2 or 3 of the semester. Show up. It is awkward the first time and normal the second.

Your student union website (usually yourstudentunion.com or similar) lists all registered clubs, their email contacts, and Instagram/Discord links. This is the backup list when you can not remember which clubs you signed up for at the fair.

## The Practical Stuff You Actually Need to Do Week One

Beyond the social events, week one requires administrative tasks. Do not let the frosh events crowd these out:

1. **Verify your course registration** — log in to the student portal and confirm every course appears correctly
2. **Set up your student email** — all institutional communications go here
3. **Get your library card activated** — often requires an in-person visit
4. **Find your classrooms before day one** — buildings on Canadian campuses are large and confusing
5. **Locate the campus health center and student wellness office** — you will want to know where these are before you need them

Frosh week passes fast. It can feel overwhelming, and that is normal. The goal is not to meet everyone — it is to meet a few people, find one or two clubs worth returning to, and feel like you belong. All three are achievable in one week.`,
  },
  {
    id: 'student-mental-health-resources-canada',
    slug: 'student-mental-health-resources-canada',
    title: 'Mental Health Resources for Canadian Students',
    excerpt:
      'Mental health struggles affect the majority of Canadian post-secondary students. Here are the free, accessible services available — on campus, provincially, and nationally.',
    category: 'Health & Wellness',
    readMinutes: 6,
    publishedAt: '2025-09-15',
    tags: ['Mental Health', 'Wellness', 'Counselling', 'Good2Talk', 'Here2Talk'],
    relatedSlugs: ['frosh-week-survival-guide', 'student-budget-canada'],
    content: `## The Reality of Student Mental Health in Canada

According to the Canadian Association of College and University Student Services (CACUSS) and the National College Health Assessment, over 60% of Canadian post-secondary students report feeling overwhelming anxiety in a given year, and nearly 40% report depression severe enough to impact their functioning. These numbers have increased consistently since 2015.

This is not weakness. Academic pressure, financial stress, social transitions, and — for many students — being away from home for the first time create genuine mental health challenges. The good news is that Canada has a strong network of free and low-cost support services specifically for students.

## On-Campus Counselling

Every accredited Canadian university and college has a student counselling or psychological services centre. These services are covered by your tuition fees — you pay for them whether you use them or not.

**What they offer:**
- Short-term individual counselling (typically 4–8 sessions)
- Group therapy programs (anxiety, depression, grief, trauma, identity)
- Psychiatric consultations (medication assessment and management)
- Crisis walk-in services
- Workshops and self-help programs

**How to access:** Go to your school's student wellness/counselling website and book online or call the front desk. For urgent support, most campuses have same-day or next-day crisis appointments.

**Limitation:** On-campus services have wait times. At large schools (UofT, UBC, McGill), the wait for a first regular appointment can be 3–6 weeks. Use the crisis line below for urgent situations and ask about the waitlist during your initial intake.

## Good2Talk — Ontario's Free Student Helpline

**Phone:** 1-866-925-5454 | **Text:** GOOD2TALKON to 686868 | **Website:** good2talk.ca

Good2Talk is a 24/7, completely free, confidential helpline operated for post-secondary students in Ontario. It is run by professional counsellors — not volunteers or automated chatbots.

You can call or text for:
- Acute anxiety or panic
- Feeling depressed or hopeless
- Relationship and social issues
- Academic stress and burnout
- Crisis support

There is no wrong reason to call Good2Talk. Feeling overwhelmed and not knowing why is enough.

## Here2Talk — National Service

**Phone:** 1-888-402-4433 | **App:** Here2Talk (iOS and Android) | **Website:** here2talk.ca

Here2Talk is the federal government's national student mental health program, available across all provinces and territories. Like Good2Talk, it is free, confidential, and 24/7.

The app allows text-based counselling sessions with professional counsellors, which many students prefer over phone calls.

## Crisis Lines

If you or someone you know is in immediate mental health crisis:

- **Talk Suicide Canada:** 1-833-456-4566 (24/7) or text 45645 (4pm–midnight EST)
- **Crisis Services Canada:** 1-833-456-4566
- **Kids Help Phone (up to age 29):** 1-800-668-6868 or text CONNECT to 686868
- **Emergency services:** 911

Do not hesitate. These lines exist for exactly these moments.

## Student Wellness Apps

Several apps are free or discounted for students and have evidence backing their effectiveness:

**Wysa** — AI-based CBT support tool. Available free with student email at many universities.

**MindShift CBT** — Developed by Anxiety Canada specifically for anxiety management. Free.

**Headspace / Calm** — Meditation and sleep tools. Headspace offers a free student version.

**Woebot** — CBT-based chatbot for depression and anxiety. Free.

**Silvercloud** — Online CBT modules. Available free through many university health portals.

Apps are not a replacement for counselling, but they are useful between sessions or while waiting for an appointment.

## International Student Resources

International students face unique mental health pressures: culture shock, family expectations, language barriers, immigration anxiety, and isolation. Most on-campus counselling services have counsellors who speak multiple languages or are trained in cross-cultural care.

ICES (International Centre for Excellence in Student Services) and your university's international student office often have dedicated wellness programming. Ask specifically about services for international students when you call or visit counselling.

## Normalizing Getting Help

The biggest barrier to mental health support is the belief that you should be able to handle it alone, or that your problems are not serious enough. Neither is true.

Counselling is not for people who are "broken." It is a skill-building tool. The students who use it are not weaker — they are investing in their ability to function. Many high-achieving students, athletes, and leaders in every field see therapists regularly.

If you have never spoken to a counsellor and feel curious, the first appointment is free and low-stakes. You can go once, decide it is not for you, and have lost nothing. Most students who go at least twice continue.

Asking for help is one of the strongest academic decisions you can make.`,
  },
  {
    id: 'best-student-cities-canada',
    slug: 'best-student-cities-canada',
    title: 'Best Cities to Study in Canada: Ranked for 2025',
    excerpt:
      "Canada has no shortage of great university cities, but they vary enormously in cost, job market, culture, and weather. Here's how the major ones stack up for students.",
    category: 'Campus Life',
    readMinutes: 8,
    publishedAt: '2025-07-10',
    tags: ['Student Cities', 'Canada', 'Cost of Living', 'University', 'Rankings'],
    relatedSlugs: ['student-budget-canada', 'best-student-housing-toronto'],
    content: `## What Makes a Great Student City?

The best student city is the one that fits your specific priorities — affordability, career access, cultural diversity, outdoor activities, or simply proximity to where you grew up. This ranking weights six factors: tuition costs, cost of living, job market access, student life quality, transit and walkability, and overall livability.

## 1. Waterloo, Ontario — Best Overall Value

**Population:** ~140,000 | **Major institutions:** University of Waterloo, Wilfrid Laurier University

Waterloo punches far above its weight. The University of Waterloo's co-op program is the largest in the world, and the resulting talent pipeline has made the Waterloo Region home to hundreds of tech companies — including major offices of Google, Shopify, and OpenText.

**Tuition:** $8,000–$14,000/year domestic
**Average student rent:** $700–$900/month (shared)
**Job market:** Excellent, especially for tech, engineering, accounting, and business
**Transit:** LRT (ION) connects Waterloo to Kitchener; decent but not Toronto-tier
**Weather:** Cold winters, warm summers — classic Ontario

**Best for:** Engineering, computer science, mathematics, business students with career goals in tech or finance.

## 2. Montreal, Quebec — Best for Cost and Culture

**Population:** ~2 million | **Major institutions:** McGill, Concordia, UQAM, Université de Montréal

Montreal is extraordinary. It combines world-class universities, a vibrant arts and nightlife scene, and the lowest cost of living of any major Canadian city — and Quebec residents pay tuition rates that feel like a different country compared to Ontario or BC.

**Tuition:** Under $3,000/year for Quebec residents; $9,000–$12,000 for out-of-province domestic students
**Average student rent:** $700–$900/month (shared)
**Job market:** Strong in tech (Ubisoft, Lightspeed, CAE), creative industries, finance, and aerospace
**Transit:** Excellent metro system; very bikeable city
**Weather:** Cold, snowy winters (embrace it); warm summers with outstanding outdoor festivals
**Language:** Bilingualism is an asset; most services are in French but Montreal is majority English in many student zones

**Best for:** Arts, design, business, technology students; anyone prioritizing cost and city experience.

## 3. Vancouver, British Columbia — Best City, Hardest Budget

**Population:** ~675,000 metro | **Major institutions:** UBC, SFU, BCIT, Emily Carr

Vancouver is breathtaking — mountains, ocean, mild winters, world-class food. It is also punishingly expensive. Rent is the highest in Canada; a room in a shared house near UBC runs $1,200–$1,500/month. Students who budget carefully and plan ahead (ideally securing co-op income) can thrive here.

**Tuition:** $6,000–$12,000/year domestic
**Average student rent:** $1,200–$1,500/month (shared)
**Job market:** Strong in tech (Amazon, Microsoft, Sony), film, green energy, and finance
**Transit:** SkyTrain is excellent; U-Pass reduces costs significantly
**Weather:** Mild and rainy winters; beautiful summers; no real winter sports accessible from the city proper

**Best for:** Students who value city experience and outdoor lifestyle and are willing to budget aggressively or earn through co-op.

## 4. Toronto, Ontario — Biggest City, Biggest Opportunities

**Population:** ~3 million metro | **Major institutions:** UofT, TMU, York, Humber, George Brown, Seneca

Toronto is Canada's economic capital. It has the largest job market, the most diverse population, and the highest concentration of internship and entry-level opportunities in the country. It also has Toronto rents.

**Tuition:** $7,000–$12,000/year domestic
**Average student rent:** $1,000–$1,300/month (shared, off-campus)
**Job market:** Best in Canada for finance, consulting, media, law, tech, and healthcare
**Transit:** Good subway and streetcar system; U-Pass available at most schools
**Weather:** Cold winters, hot summers; snowfall but not extreme

**Best for:** Students targeting major employers in business, finance, or any field where network access and internship proximity matter.

## 5. Ottawa, Ontario — Underrated and Affordable

**Population:** ~1.1 million | **Major institutions:** University of Ottawa, Carleton University

Ottawa is chronically underrated. It is cleaner, calmer, and significantly cheaper than Toronto, while offering a strong job market anchored by the federal public service, tech, and defence sectors. Both universities are bilingual assets in a bilingual city.

**Tuition:** $7,000–$11,000/year domestic
**Average student rent:** $800–$1,100/month (shared)
**Job market:** Government, tech (Shopify, Huawei, BlackBerry had large presences), healthcare
**Transit:** STO bus network; new LRT is operational and expanding
**Weather:** Harsh winters, beautiful summers; skating on the Rideau Canal is iconic

**Best for:** Government, law, public policy, bilingual students, and anyone wanting Toronto-calibre education at significantly lower cost.

## 6. Calgary, Alberta — No Provincial Income Tax, Booming Economy

**Population:** ~1.3 million | **Major institutions:** University of Calgary, SAIT, Mount Royal University

Alberta has no provincial income tax. For a part-time student working 15 hours a week, this means $800–$1,200 more per year compared to Ontario or BC. Calgary's economy has diversified well beyond oil — tech, engineering, agribusiness, and film sectors are growing.

**Tuition:** $6,000–$10,000/year domestic
**Average student rent:** $850–$1,100/month (shared)
**Job market:** Engineering, business, energy, tech; strong internship culture
**Transit:** C-Train LRT is free in the downtown core for students
**Weather:** Famously changeable; can be -30°C in February but a chinook can bring +15°C the next day; lower humidity makes cold more bearable

**Best for:** Engineering, energy, and business students; anyone who values financial upside from working during school.

## Kingston, Ontario — Honourable Mention

Queen's University gives Kingston a student population that is enormous relative to city size, creating an intensely social campus environment. Very affordable ($750–$950/month shared), safe, and academically excellent — but limited job market post-graduation means most students relocate after finishing.`,
  },
  {
    id: 'wes-credential-evaluation-canada',
    slug: 'wes-credential-evaluation-canada',
    title: 'How to Get Your Credentials Evaluated in Canada (WES Guide)',
    excerpt:
      'If you studied outside Canada, WES credential evaluation is often required for admission and immigration. Here is exactly how the process works, what it costs, and how long it takes.',
    category: 'Student Finance',
    readMinutes: 7,
    publishedAt: '2025-08-10',
    tags: ['WES', 'International Students', 'Credentials', 'Immigration', 'Admission'],
    relatedSlugs: ['canadian-student-scholarship-guide', 'student-budget-canada'],
    content: `## What Is WES?

World Education Services (WES) is an independent, non-profit organization that evaluates academic credentials earned outside Canada. When you studied at a foreign institution, Canadian universities, employers, and immigration authorities need a standardized way to assess your qualifications. WES provides that service.

WES Canada (wes.org/ca) is one of the most widely recognized credential evaluation organizations for Canadian purposes — used by IRCC (Immigration, Refugees and Citizenship Canada) for immigration applications, and by most universities for admission assessment.

## Two Types of WES Evaluations

### ECA (Educational Credential Assessment)

The ECA is required by IRCC for immigration applications under programs such as Express Entry (Federal Skilled Worker), Canadian Experience Class, and Provincial Nominee Programs.

**What it produces:** A statement confirming your foreign degree is equivalent to a Canadian credential, and verifying completion of secondary or post-secondary education.

**Who needs it:** Anyone applying for permanent residence or certain work permits under economic immigration streams.

### ICAP (International Credential Advantage Package)

ICAP is the evaluation used for admission to Canadian post-secondary institutions. It provides a detailed course-by-course analysis of your academic record.

**What it produces:** A comprehensive report showing Canadian equivalencies for each year of study, with GPA converted to the 4.0 scale (using WES's conversion formula).

**Who needs it:** International students applying to Canadian universities or colleges for graduate study; some undergraduate programs.

## Cost (2025)

| Product | Fee |
|---------|-----|
| ECA (basic) | CAD $220 |
| ICAP | CAD $280 |
| ICAP + ECA combined | CAD $320 |
| Additional report (per copy) | CAD $45 |
| Courier delivery | $35–$70 depending on country |

These are WES fees only. You also pay the credential-sending fees charged by your foreign institution, which vary widely ($20–$200+ depending on country).

## Timeline

WES processing time has varied significantly in recent years due to volume. As of 2025:

- **Standard processing:** 7–14 business days **after** all documents are received
- **Document receipt:** This is the variable. WES requires official documents sent directly from your institution. Processing does not begin until the file is complete.
- **Total time from application to completed report:** 4–12 weeks is common, depending on how quickly your institution can send documents

**Start early.** University and immigration deadlines are fixed; WES processing is not. Many applicants lose admission offers or miss Express Entry rounds because they applied to WES too late.

## Documents Required

WES requires official documents sent directly from your institution in sealed envelopes or via electronic verification systems. You do not send documents yourself (except for a few countries with special arrangements).

**For a degree:**
1. Your official transcripts for every year of post-secondary study
2. A copy of your degree certificate / graduation certificate
3. If applicable, a translation (must be a WES-approved translator)

**For secondary school (required for ECA):**
1. Your secondary school final transcript or leaving certificate

Documents must be in English or French, or accompanied by a certified translation.

**Documents WES accepts electronically:** Many countries now support direct electronic transcript delivery through services like Digitary, EMGS (Malaysia), or national clearinghouse systems. Check the WES "Country Specific Instructions" page — it lists exactly what your country requires.

## How the Application Process Works

1. **Create a WES account** at wes.org/ca and choose your product (ECA or ICAP)
2. **Enter your academic history** — schools attended, degrees earned, graduation dates
3. **Request documents** — WES gives you a reference number and specific instructions for your country. Contact your institution's registrar and request that they send transcripts directly to WES using this reference number
4. **Monitor your file** — Log in to track which documents WES has received. A complete file status triggers evaluation
5. **Receive your report** — Digital delivery to your WES account; physical copy mailed to you; additional reports mailed to institutions you specified

## How It Affects Admission and Immigration

**Admission:** Most Canadian graduate schools require a WES ICAP or equivalent evaluation. Some schools do their own internal evaluation; check each institution's requirements. Having a WES report ready speeds up admission decisions.

**Immigration (Express Entry):** IRCC uses the ECA to verify that you meet the education requirement for your points profile. A 4-year bachelor's degree evaluated as "equivalent to a Canadian bachelor's degree" earns you 120–140 CRS points depending on your age and language scores.

**Professional licensing:** Some regulated professions (nursing, engineering, accounting) require additional evaluation by professional bodies (e.g., Engineers Canada, CPA Canada) on top of WES.

## Common Mistakes to Avoid

- **Applying before requesting documents.** Start by contacting your institution's registrar to confirm they can send directly to WES. If there are delays or complications, you want to know early.
- **Sending documents yourself.** WES typically does not accept documents submitted by the applicant. Follow country-specific instructions carefully.
- **Not ordering enough copies.** You need separate reports for each school and each immigration application stream. Order extras upfront — it is cheaper than re-applying.
- **Using WES for Quebec.** Quebec has its own evaluation service: Bureau de coopération interuniversitaire (BCI). If you are applying to Quebec universities, check which service they require.`,
  },
  {
    id: 'nserc-usra-guide',
    slug: 'nserc-usra-guide',
    title: 'NSERC USRA: How to Get an Undergraduate Research Award',
    excerpt:
      "NSERC's Undergraduate Student Research Awards pay $4,500 for 16 weeks of full-time research — and they look exceptional on graduate school applications. Here's the full guide.",
    category: 'Scholarships',
    readMinutes: 6,
    publishedAt: '2025-07-30',
    tags: ['NSERC', 'USRA', 'Research', 'Undergraduate', 'Grad School'],
    relatedSlugs: ['canadian-student-scholarship-guide', 'coop-vs-internship-canada'],
    content: `## What Is the NSERC USRA?

The Natural Sciences and Engineering Research Council of Canada (NSERC) awards Undergraduate Student Research Awards (USRAs) to support undergraduate research in natural sciences and engineering. The program is funded by the federal government and administered through universities.

**The award:** $4,500 from NSERC for 16 weeks of full-time research. Universities are required to top up this amount by at least 25%, so most students receive $5,625–$6,500+ for the summer, with some universities contributing significantly more. The research supervisor also receives a contribution from the university for hosting you.

This is not just about the money. A USRA signals to graduate admissions committees that you were selected for supervised research as an undergraduate — a credential that carries real weight.

## Eligibility Requirements

To be eligible for a NSERC USRA you must:

- Be a **Canadian citizen or permanent resident** (not open to international students)
- Be registered as a full-time undergraduate student at a Canadian university
- Have a **cumulative GPA of at least 3.0/4.0** (or equivalent — B average)
- Be in **natural sciences or engineering** (computer science, physics, chemistry, biology, mathematics, engineering disciplines, earth sciences, etc.)
- Not have already completed a bachelor's degree
- Not be applying in the same year you would graduate

## The Process: How to Get One

### Step 1: Find a Supervisor

This is the hardest part. You need a faculty member who (a) holds an NSERC research grant, (b) is willing to supervise you, and (c) has a project that fits your interests and background.

**How to find supervisors:**
- Browse your department's faculty page. Read research profiles.
- Look at who is publishing work you find interesting.
- Check NSERC's awards database (nserc-crsng.gc.ca) to confirm who holds active Discovery Grants in your department.
- Attend departmental seminars — professors who see your face at seminars are more likely to remember you.

**How to approach them:**
Email the professor directly. Keep it brief (3 paragraphs max). Mention: (1) who you are and your year of study, (2) which specific aspect of their research interests you and why (cite a paper), (3) that you are applying for a NSERC USRA and asking if they are accepting students. Attach your transcript and a short (1 page) CV.

Response rates are 20–40%. Email 5–8 professors. Some will respond within a week; some take months. Start this process in October or November for a summer award.

### Step 2: Prepare Your Application

The USRA application has two components:

**Student's section:**
- Academic history and GPA
- A brief statement (usually 500–1,000 words) describing your research interests, relevant experience, and how this project fits your goals
- Your transcript

**Supervisor's section:**
- The supervisor fills out a section describing the research project, confirming your suitability, and endorsing the application

The student statement is your primary differentiator. Be specific: describe the project you plan to work on, the techniques involved, and why this experience matters for your career path. Generic statements about "wanting to gain research experience" are weak. Specific, informed descriptions of the actual scientific questions being explored are strong.

### Step 3: Internal University Competition

Universities receive a quota of USRA positions from NSERC (based on their size and research activity). Large universities like UofT, UBC, and Waterloo may have 100+ positions; smaller schools might have 5–15. Your application goes through an **internal departmental or faculty-level competition**.

Departments typically rank applicants by GPA, quality of the student statement, and the supervisor's endorsement. The department submits their top candidates to the faculty or central awards office, which finalizes the university's allocation.

**Deadline:** Most universities require completed USRA applications in January–February for summer awards. Check your university's NSERC/awards office website in September for the exact date.

## What the Experience Is Actually Like

A USRA is a 16-week full-time research position, typically May–August. You work in the supervisor's lab or research group, usually alongside graduate students.

**Typical activities depending on field:**
- Lab sciences: running experiments, analyzing data, maintaining equipment, literature reviews
- Computer science / mathematics: coding, algorithm development, data analysis, paper writing
- Engineering: design, simulation, prototype testing

Most supervisors run weekly or bi-weekly meetings. The environment is collaborative but often self-directed — you are expected to take ownership of your project.

At the end of the term, you typically present your results at a lab group meeting or departmental poster session. Some students co-author a paper or conference submission from their USRA work.

## How It Helps Graduate School Applications

For students considering a master's or PhD:

- NSERC USRA holders are highly competitive candidates for NSERC CGS-M and PGS awards at the graduate level
- Having completed supervised undergraduate research signals that you understand what research involves — a non-trivial signal given that many graduate students struggle with open-ended research for the first time
- Your USRA supervisor becomes a strong reference; they have worked with you daily and can speak to your capabilities in detail
- The work may become part of your graduate school research, accelerating your timeline

Even one summer of USRA-funded research meaningfully differentiates an application to competitive master's programs in science and engineering.

## Can You Apply More Than Once?

Yes. You can hold up to **three** NSERC USRAs during your undergraduate degree, though each requires a separate application and supervisor. Students in 4-year programs who apply in second and third year can hold two awards. Students in 5-year co-op or double-degree programs can potentially hold three.

Each subsequent application is stronger because you have prior research experience. The combination of three USRAs with strong publications or conference presentations makes a graduate school application extremely competitive for major fellowships.`,
  },
]

export const FEATURED_ARTICLE = ARTICLES[0]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== undefined)
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((a) => a.category === category)
}

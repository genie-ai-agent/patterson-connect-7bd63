export type Category = 'elders' | 'serve' | 'play' | 'events' | 'clubs';

export type Contact = {
  kind: 'tel' | 'url' | 'email';
  value: string;
  label: string;
};

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  category: Category;
  blurb: string;
  where: string;
  cadence: string;
  /** how much real face-to-face conversation happens, 1-5 */
  people: number;
  /** how fast you can start, 5 = you could walk in this week */
  ease: number;
  spark: string;
  details: string[];
  contacts: Contact[];
};

export const categories: {
  id: Category;
  label: string;
  tagline: string;
  emoji: string;
}[] = [
  {
    id: 'elders',
    label: 'Sit with elders',
    tagline: 'where the thank-you lands the same afternoon',
    emoji: '\u2615',
  },
  {
    id: 'serve',
    label: 'Serve the town',
    tagline: 'food, books, neighbors, hands-on',
    emoji: '\uD83E\uDD6A',
  },
  {
    id: 'play',
    label: 'Play & sweat',
    tagline: 'the fastest way to meet somebody new',
    emoji: '\uD83C\uDFD3',
  },
  {
    id: 'events',
    label: 'Big town moments',
    tagline: 'the weekends everybody shows up for',
    emoji: '\uD83C\uDF8A',
  },
  {
    id: 'clubs',
    label: 'Clubs & lifers',
    tagline: 'same faces every month, for years',
    emoji: '\uD83E\uDD1D',
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'friendly-visitor',
    title: 'Friendly Visitor',
    org: 'Stanislaus County Aging & Veterans Services',
    category: 'elders',
    blurb:
      'You get matched with a senior in the community who lives alone with almost no company, and you just... hang out. Coffee, talking, cards, whatever the two of you land on.',
    where: 'Homes around Patterson / Stanislaus County',
    cadence: 'Minimum two visits a month, days and times are yours',
    people: 5,
    ease: 4,
    spark:
      'This is the one where you will know, in the first visit, exactly how much you mattered to somebody.',
    details: [
      '18+, short orientation, volunteer application and a fingerprint background check',
      'The county pays for the background check',
      'Mileage reimbursement available',
    ],
    contacts: [
      { kind: 'tel', value: '+12095587825', label: '(209) 558-7825' },
      {
        kind: 'url',
        value: 'https://www.stancounty.com/aging/volunteer.shtm',
        label: 'Program page',
      },
    ],
  },
  {
    id: 'relief-buddy',
    title: 'Senior Relief Buddy',
    org: 'Stanislaus County Aging & Veterans Services',
    category: 'elders',
    blurb:
      'You spend a few hours with a frail elder so their family caregiver can go breathe. Two people are grateful for every single shift.',
    where: 'Around Stanislaus County',
    cadence: 'Called occasionally, about 3-4 hours at a time',
    people: 5,
    ease: 3,
    spark:
      'Built for "occasionally" on purpose. The program literally expects you to come and go.',
    details: [
      'Fingerprint background check, visitor orientation, plus a 4-hour class',
      'Training covers memory loss, activity ideas and keeping healthy boundaries',
      'Mileage reimbursement available',
    ],
    contacts: [
      { kind: 'tel', value: '+12095587825', label: '(209) 558-7825' },
      {
        kind: 'url',
        value: 'https://www.stancounty.com/volunteer',
        label: 'County volunteer program',
      },
    ],
  },
  {
    id: 'hammon-center',
    title: 'Hammon Senior Center',
    org: 'City of Patterson',
    category: 'elders',
    blurb:
      'Yarn Works, social sewing, Loteria, floral arranging, cooking class, dances, billiards, pool day, Kindness Day, the table tennis tournament. The place runs on warm bodies and it is five minutes from downtown.',
    where: '1033 W. Las Palmas Ave, Patterson',
    cadence: 'Open Mon-Fri, 8am-3pm. Pick a program, pick a day',
    people: 5,
    ease: 5,
    spark:
      'The lowest-effort joy in town: walk in, ask what day needs an extra pair of hands, stay for Loteria.',
    details: [
      'Members are 50+, and community members can volunteer at programs and events',
      'There is a monthly newsletter with the full activity calendar',
      'Same building as the Recreation & Community Services office',
    ],
    contacts: [
      { kind: 'tel', value: '+12098958180', label: '(209) 895-8180' },
      {
        kind: 'url',
        value: 'https://www.pattersonca.gov/423/Hammon-Senior-Center',
        label: 'Center page',
      },
    ],
  },
  {
    id: 'senior-lunch',
    title: 'The daily senior lunch',
    org: 'Elderly Nutrition Program, Patterson Senior Center',
    category: 'elders',
    blurb:
      'A hot lunch runs Monday through Friday at the Patterson site, and a room full of people eat it together. Ask about helping serve, then sit down and eat with them.',
    where: 'Patterson Senior Center, 1033 W. Las Palmas Ave',
    cadence: 'Weekdays, one lunch at a time',
    people: 5,
    ease: 4,
    spark:
      'Nobody is lonely at a table. You being at it is the whole program.',
    details: [
      'Meals are for adults 60+, with a suggested $3 donation; guests pay the full $5.50',
      'Patterson is one of nine congregate lunch sites in the county',
      'Call the Senior Information Line to ask how to help at the Patterson site',
    ],
    contacts: [
      { kind: 'tel', value: '+12095588698', label: '(209) 558-8698' },
      {
        kind: 'url',
        value: 'https://www.stancounty.com/aging/htc-senior-meals.shtm',
        label: 'Lunch program',
      },
    ],
  },
  {
    id: 'community-hospice',
    title: 'Patient & family companion',
    org: 'Community Hospice & Health Services',
    category: 'elders',
    blurb:
      'Sit with hospice patients at home or in a facility as a friend would: talk, listen, read, run an errand. They also place volunteers in pet therapy, music and art, and veteran advocacy.',
    where: 'Modesto-based, serves the Patterson area',
    cadence: 'Flexible, shaped around your week',
    people: 5,
    ease: 2,
    spark:
      'The heaviest and the most profound thing on this page. People remember the person who stayed.',
    details: [
      'Full training and ongoing support provided before you are placed',
      'Other roles: community ambassador, event support, Hope Chest thrift stores',
      'Call the Volunteer Department to start',
    ],
    contacts: [
      { kind: 'tel', value: '+12095786300', label: '(209) 578-6300' },
      { kind: 'url', value: 'https://hospiceheart.org/volunteer', label: 'Volunteer page' },
    ],
  },
  {
    id: 'love-patterson',
    title: 'Love Patterson Day',
    org: 'Love Patterson',
    category: 'serve',
    blurb:
      'One Saturday, the whole town picks up a project: hygiene kits, food bank sorting, work at the senior center, yards for neighbors who cannot do it themselves. You sign up for a project, you meet the crew on it.',
    where: 'Projects all over Patterson. Office at 100 N. Fourth St, Suite 4',
    cadence: 'Once a year, late April (2026 was April 18)',
    people: 4,
    ease: 5,
    spark:
      'Easiest crowd in town to make friends in, because everyone there chose to be there.',
    details: [
      'Projects open for sign-up on their site ahead of the day',
      'Family-friendly and genuinely beginner-friendly',
      'Check the site for the next year\u2019s date before you plan around it',
    ],
    contacts: [
      { kind: 'url', value: 'https://lovepatterson.com', label: 'lovepatterson.com' },
      { kind: 'tel', value: '+12094845032', label: '(209) 484-5032' },
    ],
  },
  {
    id: 'food-pantry',
    title: 'Westside Food Pantry',
    org: 'Patterson Westside Food Pantry',
    category: 'serve',
    blurb:
      'Sorting, stocking and handing groceries to neighbors, face to face. Local grocers donate into it and volunteers move all of it.',
    where: '20 S. 5th Street, Patterson',
    cadence: 'Occasional shifts',
    people: 4,
    ease: 4,
    spark:
      'Hand somebody food and watch their shoulders drop. Instant, unmistakable.',
    details: [
      'Listed with the Patterson-Westley Chamber service groups',
      'A regular Love Patterson Day project too, if you want to try it once first',
    ],
    contacts: [
      {
        kind: 'url',
        value: 'https://pattersonwestleychamber.org/service-groups',
        label: 'Chamber service groups',
      },
    ],
  },
  {
    id: 'library',
    title: 'Patterson Library branch',
    org: 'Stanislaus County Library',
    category: 'serve',
    blurb:
      'Help with children\u2019s and adult programs, keep the shelves alive, or take materials out to homebound customers, which is really a visit with a book attached.',
    where: 'Patterson branch, downtown Patterson',
    cadence: 'Set your own rhythm with the branch',
    people: 3,
    ease: 4,
    spark:
      'Storytimes, clubs, classes and workshops run here. It is the quiet social hub of the town.',
    details: [
      'All 13 county branches take volunteers; Patterson is one of them',
      'Homebound delivery is the most one-on-one version of this',
    ],
    contacts: [
      { kind: 'tel', value: '+12098926473', label: '(209) 892-6473' },
      {
        kind: 'url',
        value: 'https://www.stanislauslibrary.org',
        label: 'County library',
      },
    ],
  },
  {
    id: 'county-volunteer',
    title: 'One-time county events',
    org: 'Stanislaus County Volunteer Program',
    category: 'serve',
    blurb:
      'The county keeps a list that runs from single-day events to long-term placements across a dozen departments, including a one-time event sign-up form for exactly the "I want to try something" mood.',
    where: 'Countywide',
    cadence: 'One-off events or ongoing, your call',
    people: 3,
    ease: 5,
    spark: 'Good low-stakes sampler if you want to test the feeling before committing.',
    details: [
      'Aging & Veterans coordinator: Vicki Ocaranza, (209) 525-4619',
      'Downloadable one-time event sign-up form on the page',
      'Also lists United Way and Love Stanislaus County',
    ],
    contacts: [
      { kind: 'tel', value: '+12095254619', label: '(209) 525-4619' },
      { kind: 'url', value: 'https://www.stancounty.com/volunteer', label: 'Opportunity list' },
    ],
  },
  {
    id: 'pickleball-dropin',
    title: 'Pickleball drop-in',
    org: 'Walnut Grove School Gym',
    category: 'play',
    blurb:
      'Three bucks, no team, no sign-up. You rotate through games with whoever showed up, which is how pickleball works and why everybody there talks to everybody.',
    where: '775 N Hartley St, Patterson',
    cadence: 'Fridays 6-9pm and Sundays 10am-1pm',
    people: 5,
    ease: 5,
    spark:
      'Highest odds on this page of leaving with a new number. Rotating partners is built into the sport.',
    details: [
      '$3 entry',
      'Beginners rotate in with everyone else',
      'Call the rec office to confirm the night before you drive over',
    ],
    contacts: [
      { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
      {
        kind: 'url',
        value: 'https://www.pickleheads.com/courts/us/california/patterson/walnut-grove-school-gym',
        label: 'Court details',
      },
    ],
  },
  {
    id: 'pickleball-league',
    title: 'Adult pickleball league',
    org: 'Patterson Recreation & Community Services',
    category: 'play',
    blurb:
      'Six weeks of round-robin play plus a championship week. Sign up as a pair, or as a free agent and get put with somebody, which is the single most efficient way to make one new friend in this town.',
    where: 'Patterson community complex',
    cadence: '7 weeks, one night a week',
    people: 5,
    ease: 4,
    spark: 'Free agent is the move. You get assigned a partner and six weeks to click.',
    details: [
      'Beginner and intermediate divisions',
      '13-minute games or first to 11, minimum four games a night',
      'There is also a $3 pickleball clinic if you want the rules first',
    ],
    contacts: [
      { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
      { kind: 'url', value: 'https://www.pattersonca.gov/2031/Sports-Leagues', label: 'League info' },
    ],
  },
  {
    id: 'volleyball-league',
    title: 'Adult volleyball league',
    org: 'Patterson Recreation & Community Services',
    category: 'play',
    blurb:
      'Eight-week season, seven weeks of play and a tournament at the end. Rosters run 6 to 9 people, so one team is basically a built-in friend group with a schedule.',
    where: 'Patterson community complex',
    cadence: '8 weeks, one night a week',
    people: 5,
    ease: 3,
    spark: 'Teams that survive a season together end up at each other\u2019s birthdays.',
    details: [
      'All levels, including people getting back into it',
      'Minimum 6 players per team, up to 9 on a roster',
      'Ask the rec office to place you on a team that needs bodies',
    ],
    contacts: [
      { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
      { kind: 'url', value: 'https://www.pattersonca.gov/2031/Sports-Leagues', label: 'League info' },
    ],
  },
  {
    id: 'del-puerto',
    title: 'Del Puerto Canyon hikes',
    org: 'Diablo Range, west of town on CA-130',
    category: 'play',
    blurb:
      'The most biologically diverse corner of Stanislaus County, fifteen minutes from downtown. Three trails, roughly a mile, two miles and four miles. Bring people, or join a guided group hike and meet them there.',
    where: 'Del Puerto Canyon Rd / CA-130, west of Patterson',
    cadence: 'Whenever you feel like it',
    people: 4,
    ease: 5,
    spark:
      'Two hours of walking next to somebody is how real conversation actually happens.',
    details: [
      'Easy trail is just over a mile, medium just over two, hard just over four',
      'Save Mount Diablo\u2019s free Discover Diablo program runs guided hikes in the range, Patterson included',
      'Creek, frogs and fish on the easy loop',
    ],
    contacts: [
      {
        kind: 'url',
        value: 'https://savemountdiablo.org/blog/save-mount-diablo-expands-its-free-discover-diablo-hikes-and-outings-program-for-2026',
        label: 'Discover Diablo hikes',
      },
    ],
  },
  {
    id: 'apricot-fiesta',
    title: 'Apricot Fiesta',
    org: 'Patterson Apricot Fiesta',
    category: 'events',
    blurb:
      'The 55th Fiesta: June 4-6, 2027, downtown around the City Circle. Parade, free concerts all weekend, craft and commercial street fair, arm wrestling, cornhole, a pickleball tournament, Lions Club BBQ, fireworks at dusk. Volunteers and committee people are how it happens.',
    where: 'Downtown Patterson, City Circle',
    cadence: 'Once a year, plus committee meetings before it',
    people: 5,
    ease: 3,
    spark:
      'Work a booth for one shift and you will know half the town by Sunday night.',
    details: [
      '2027 dates: Friday June 4 through Sunday June 6',
      'Kickoff weekend before: Wine & Cheese and Miss Patterson Meet & Greet May 28, bake contest May 29',
      'Email or call the Fiesta office about volunteering',
    ],
    contacts: [
      { kind: 'email', value: 'office@apricotfiesta.com', label: 'office@apricotfiesta.com' },
      { kind: 'tel', value: '+12098923118', label: '(209) 892-3118' },
      { kind: 'url', value: 'https://apricotfiesta.com', label: 'apricotfiesta.com' },
    ],
  },
  {
    id: 'farm-to-fork',
    title: 'Farm to Fork',
    org: 'City of Patterson Recreation & Community Services',
    category: 'events',
    blurb:
      'A long-table fundraiser in the historic downtown City Circle celebrating the valley\u2019s farming, and every ticket funds youth and senior programs. Go as a guest, or help put it on.',
    where: 'Historic downtown City Circle, Patterson',
    cadence: 'Once a year, late September',
    people: 4,
    ease: 4,
    spark: 'Dinner where you sit with strangers and leave with neighbors.',
    details: [
      '2026 edition ran Saturday, September 26',
      'Proceeds go to youth and senior programming',
      'Call the Recreation office about tickets or helping',
    ],
    contacts: [
      { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
      {
        kind: 'url',
        value: 'https://www.pattersonca.gov/218/Recreation-Community-Services',
        label: 'Recreation department',
      },
    ],
  },
  {
    id: 'rotary',
    title: 'Patterson Rotary',
    org: 'Rotary Club of Patterson',
    category: 'clubs',
    blurb:
      'Meets the first Wednesday of the month at Mils Bar & Grill. They run Touch-A-Truck for Heroes and hand out dictionaries at Apricot Valley and Grayson schools. Show up as a guest first, nobody minds.',
    where: 'Mils Bar & Grill, Patterson',
    cadence: 'First Wednesday, monthly',
    people: 5,
    ease: 4,
    spark:
      'The decades-long-friendship option. Same table, same people, year after year.',
    details: [
      'Dinner-meeting format, so it is social before it is business',
      'Touch-A-Truck is their big public event: trucks, music, bubble bus, petting zoo',
      'Message them on Instagram to ask about visiting a meeting',
    ],
    contacts: [
      {
        kind: 'url',
        value: 'https://www.instagram.com/patterson_rotary',
        label: '@patterson_rotary',
      },
    ],
  },
  {
    id: 'service-groups',
    title: 'The rest of the service clubs',
    org: 'Patterson-Westley Chamber of Commerce',
    category: 'clubs',
    blurb:
      'The chamber keeps one page listing every service group in town with its meeting night and a phone number: Lions, the pantry, Love Patterson, the whole roster. It is the cheat sheet for this entire subject.',
    where: 'Patterson and Westley',
    cadence: 'Most meet monthly, evenings',
    people: 4,
    ease: 5,
    spark: 'Scan it, pick the night that fits your week, go be a guest.',
    details: [
      'Meeting nights and times listed per group',
      'Includes the groups that staff Fiesta booths and holiday drives',
    ],
    contacts: [
      {
        kind: 'url',
        value: 'https://pattersonwestleychamber.org/service-groups',
        label: 'Service groups list',
      },
    ],
  },
];

export const startHere = ['pickleball-dropin', 'hammon-center', 'friendly-visitor'];

export const upcoming: { when: string; what: string; note: string }[] = [
  {
    when: 'Every Friday',
    what: 'Pickleball drop-in, 6-9pm',
    note: 'Walnut Grove School Gym, $3, no partner needed',
  },
  {
    when: 'Every Sunday',
    what: 'Pickleball drop-in, 10am-1pm',
    note: 'Same gym, slower crowd, easier to talk',
  },
  {
    when: 'Weekdays',
    what: 'Hammon Senior Center programs, 8am-3pm',
    note: 'Loteria, yarn works, cooking class, billiards',
  },
  {
    when: 'First Wednesday',
    what: 'Patterson Rotary dinner meeting',
    note: 'Mils Bar & Grill. Guests welcome',
  },
  {
    when: 'Late April',
    what: 'Love Patterson city-wide volunteer day',
    note: 'Projects open on lovepatterson.com beforehand',
  },
  {
    when: 'Late September',
    what: 'Farm to Fork at the City Circle',
    note: 'Benefits youth and senior programs',
  },
  {
    when: 'June 4-6, 2027',
    what: '55th Apricot Fiesta',
    note: 'Parade, concerts, fireworks, pickleball tournament',
  },
];

export type Vibe = 'elders' | 'serve' | 'play' | 'events' | 'clubs';

export type Option = {
  id: string;
  emoji: string;
  /** what it is, in four words or less */
  label: string;
  /** when / where / how much, tiny */
  tag: string;
  vibe: Vibe;
  call?: { kind: 'tel' | 'url' | 'email'; value: string; label: string };
};

/** 25 real things to do in and near Patterson, CA.
 *  Short labels on purpose: the card has to read in one glance. */
export const options: Option[] = [
  {
    id: 'friendly-visitor',
    emoji: '\u2615',
    label: 'Visit a lonely senior',
    tag: 'Twice a month \u00b7 county program',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12095587825', label: '(209) 558-7825' },
  },
  {
    id: 'relief-buddy',
    emoji: '\uD83E\uDEE1',
    label: 'Cover for a caregiver',
    tag: '3-4 hours \u00b7 whenever you can',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12095587825', label: '(209) 558-7825' },
  },
  {
    id: 'hammon-center',
    emoji: '\uD83C\uDCCF',
    label: 'Loter\u00eda at the senior center',
    tag: 'Weekdays 8-3 \u00b7 W Las Palmas',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12098958180', label: '(209) 895-8180' },
  },
  {
    id: 'senior-lunch',
    emoji: '\uD83C\uDF72',
    label: 'Serve the senior lunch',
    tag: 'Weekday middays \u00b7 one at a time',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12095588698', label: '(209) 558-8698' },
  },
  {
    id: 'community-hospice',
    emoji: '\uD83D\uDD6F\uFE0F',
    label: 'Sit with hospice patients',
    tag: 'Flexible \u00b7 training first',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12095786300', label: '(209) 578-6300' },
  },
  {
    id: 'library-homebound',
    emoji: '\uD83D\uDCD6',
    label: 'Take books to the homebound',
    tag: 'County library \u00b7 your schedule',
    vibe: 'elders',
    call: { kind: 'tel', value: '+12095588949', label: '(209) 558-8949' },
  },
  {
    id: 'love-patterson',
    emoji: '\uD83E\uDDE4',
    label: 'Love Patterson Day',
    tag: 'One Saturday every April',
    vibe: 'serve',
    call: { kind: 'url', value: 'https://lovepatterson.com', label: 'lovepatterson.com' },
  },
  {
    id: 'food-pantry',
    emoji: '\uD83E\uDD6B',
    label: 'Hand out groceries',
    tag: 'Westside Food Pantry \u00b7 S 5th St',
    vibe: 'serve',
    call: {
      kind: 'url',
      value: 'https://pattersonwestleychamber.org/service-groups',
      label: 'Pantry listing',
    },
  },
  {
    id: 'library',
    emoji: '\uD83D\uDCDA',
    label: 'Help at the library',
    tag: 'Patterson branch \u00b7 your hours',
    vibe: 'serve',
    call: { kind: 'tel', value: '+12098926473', label: '(209) 892-6473' },
  },
  {
    id: 'county-volunteer',
    emoji: '\uD83D\uDCCB',
    label: 'One-day county gig',
    tag: 'Single events \u00b7 no commitment',
    vibe: 'serve',
    call: { kind: 'tel', value: '+12095254619', label: '(209) 525-4619' },
  },
  {
    id: 'animal-shelter',
    emoji: '\uD83D\uDC15',
    label: 'Walk shelter dogs',
    tag: 'Modesto \u00b7 flexible shifts',
    vibe: 'serve',
    call: { kind: 'tel', value: '+12095674662', label: '(209) 567-4662' },
  },
  {
    id: 'habitat',
    emoji: '\uD83D\uDD28',
    label: 'Habitat build day',
    tag: 'Stanislaus County \u00b7 no skills needed',
    vibe: 'serve',
    call: { kind: 'tel', value: '+12095754585', label: '(209) 575-4585' },
  },
  {
    id: 'med-reserve',
    emoji: '\uD83E\uDE7A',
    label: 'Medical Reserve Corps',
    tag: 'County health events \u00b7 on call',
    vibe: 'serve',
    call: { kind: 'tel', value: '+12095588332', label: '(209) 558-8332' },
  },
  {
    id: 'pickleball-dropin',
    emoji: '\uD83C\uDFD3',
    label: 'Pickleball drop-in',
    tag: 'Fri 6pm, Sun 10am \u00b7 $3',
    vibe: 'play',
    call: { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
  },
  {
    id: 'pickleball-league',
    emoji: '\uD83C\uDFC6',
    label: 'Pickleball league, solo',
    tag: '7 weeks \u00b7 they assign a partner',
    vibe: 'play',
    call: { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
  },
  {
    id: 'volleyball-league',
    emoji: '\uD83C\uDFD0',
    label: 'Join a volleyball team',
    tag: '8 weeks \u00b7 one night a week',
    vibe: 'play',
    call: { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
  },
  {
    id: 'del-puerto',
    emoji: '\uD83E\uDD7E',
    label: 'Hike Del Puerto Canyon',
    tag: '15 minutes west \u00b7 free',
    vibe: 'play',
    call: {
      kind: 'url',
      value: 'https://savemountdiablo.org/discover-diablo',
      label: 'Guided hikes',
    },
  },
  {
    id: 'coach-kids',
    emoji: '\uD83C\uDFC0',
    label: 'Coach a kids team',
    tag: 'Ask the rec office \u00b7 seasonal',
    vibe: 'play',
    call: { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
  },
  {
    id: 'farmers-market',
    emoji: '\uD83C\uDF53',
    label: 'Farmers market night',
    tag: 'Wednesdays 4-8pm \u00b7 South Park',
    vibe: 'events',
    call: {
      kind: 'url',
      value: 'https://www.facebook.com/p/Patterson-Farmers-Market-100055892876056',
      label: 'Market page',
    },
  },
  {
    id: 'apricot-fiesta',
    emoji: '\uD83C\uDF51',
    label: 'Work the Apricot Fiesta',
    tag: 'June \u00b7 downtown City Circle',
    vibe: 'events',
    call: { kind: 'email', value: 'office@apricotfiesta.com', label: 'office@apricotfiesta.com' },
  },
  {
    id: 'farm-to-fork',
    emoji: '\uD83C\uDF77',
    label: 'Farm to Fork dinner',
    tag: 'Late September \u00b7 City Circle',
    vibe: 'events',
    call: { kind: 'tel', value: '+12098958080', label: '(209) 895-8080' },
  },
  {
    id: 'night-out',
    emoji: '\uD83D\uDE92',
    label: 'National Night Out',
    tag: 'First Tuesday in August \u00b7 Garza Park',
    vibe: 'events',
    call: {
      kind: 'url',
      value: 'https://www.facebook.com/StanSheriffPPS',
      label: 'Sheriff PPS page',
    },
  },
  {
    id: 'christmas-festival',
    emoji: '\uD83C\uDF84',
    label: 'Christmas Festival',
    tag: 'December \u00b7 downtown Patterson',
    vibe: 'events',
    call: {
      kind: 'url',
      value: 'https://pattersonwestleychamber.org/christmas-festival',
      label: 'Festival events',
    },
  },
  {
    id: 'rotary',
    emoji: '\uD83E\uDD1D',
    label: 'Rotary dinner at Mils',
    tag: 'First Wednesday \u00b7 guests welcome',
    vibe: 'clubs',
    call: {
      kind: 'url',
      value: 'https://www.instagram.com/patterson_rotary',
      label: '@patterson_rotary',
    },
  },
  {
    id: 'service-groups',
    emoji: '\uD83C\uDF97\uFE0F',
    label: 'Pick a service club',
    tag: 'Monthly meetings \u00b7 chamber list',
    vibe: 'clubs',
    call: {
      kind: 'url',
      value: 'https://pattersonwestleychamber.org/service-groups',
      label: 'Club list',
    },
  },
];

export const byId = new Map(options.map((o) => [o.id, o]));

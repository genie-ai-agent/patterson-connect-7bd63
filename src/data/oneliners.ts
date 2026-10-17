/** One short line per opportunity. Six to nine words, phone-screen sized.
 *  Funny where funny fits. The hospice one stays straight on purpose. */
export const oneLiners: Record<string, string> = {
  'friendly-visitor': 'Visit a senior who will out-talk her',
  'relief-buddy': 'Give a fried caregiver an afternoon off',
  'hammon-center': 'Loteria against sharks who never lose',
  'senior-lunch': 'Serve lunch, get called mija forty times',
  'community-hospice': 'Sit with someone who needs the company',
  'love-patterson': 'Whole town shows up wearing work gloves',
  'food-pantry': 'Thursday groceries, unreasonable number of hugs',
  library: 'Shelve books, get quietly judged by regulars',
  'county-volunteer': 'One-off county gigs, zero commitment, free shirt',
  'pickleball-dropin': 'Three bucks to lose to a retiree',
  'pickleball-league': 'Show up alone, get handed a partner',
  'volleyball-league': 'Same team weekly, immediate group chat',
  'del-puerto': 'Wildflowers, twenty minutes west, no excuses',
  'apricot-fiesta': 'June, and an unholy amount of apricots',
  'farm-to-fork': 'Long-table dinner in an actual orchard',
  rotary: 'Dinner at Mils with the town deciders',
  'service-groups': 'Lions, Soroptimist, matching vests, monthly',
};

export function oneFor(id: string, fallback: string): string {
  return oneLiners[id] ?? fallback;
}

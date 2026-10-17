/** One short line per opportunity. Six to nine words, phone-screen sized. */
export const oneLiners: Record<string, string> = {
  'friendly-visitor': 'Visit a senior who lives alone',
  'relief-buddy': 'Give a worn-out caregiver an afternoon off',
  'hammon-center': 'Loteria, sewing and dancing at the senior center',
  'senior-lunch': 'Serve the weekday lunch to seniors',
  'community-hospice': 'Keep someone company near the end',
  'love-patterson': 'One Saturday, the whole town shows up',
  'food-pantry': 'Hand out groceries on a Thursday',
  library: 'Help out at the Patterson library',
  'county-volunteer': 'One-off county events, zero commitment',
  'pickleball-dropin': 'Three bucks, Friday night, Walnut Grove gym',
  'pickleball-league': 'Sign up alone, get handed a partner',
  'volleyball-league': 'Same team, one night a week',
  'del-puerto': 'Wildflower hikes 20 minutes west of town',
  'apricot-fiesta': "The town's big June festival",
  'farm-to-fork': 'Long-table dinner in the orchard, September',
  rotary: 'Dinner at Mils, first Wednesday monthly',
  'service-groups': 'Lions, Soroptimist and the rest, monthly',
};

export function oneFor(id: string, fallback: string): string {
  return oneLiners[id] ?? fallback;
}

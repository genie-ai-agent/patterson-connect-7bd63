/** Rotating jokes. One shows above the winner each round, one below the button. */
export const verdicts = [
  'The people have spoken',
  'Decided. No appeals',
  'This is binding now',
  'Catrina has been volunteered',
  'Sorry Catrina, democracy',
  'The town has chosen violence',
  'Locked in, clipboard out',
  'Your vote is now her Tuesday',
];

export const kickers = [
  'Somebody tell her.',
  'She finds out later.',
  'She did ask for suggestions.',
  'No takebacks, we checked.',
  'Her calendar is a group project now.',
  'This is what she gets for being nice.',
];

export function pickOne(list: string[], seed: number): string {
  return list[Math.abs(seed) % list.length];
}

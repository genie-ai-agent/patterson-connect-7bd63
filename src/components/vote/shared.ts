import { opportunities, type Category, type Opportunity } from '../../data/opportunities';

export const blockFor: Record<Category, string> = {
  elders: 'bg-block-3 text-ink',
  serve: 'bg-block-1 text-ink',
  play: 'bg-block-4 text-ink',
  events: 'bg-block-2 text-ink',
  clubs: 'bg-block-5 text-ink',
};

export const barFor: Record<Category, string> = {
  elders: 'bg-block-3',
  serve: 'bg-block-1',
  play: 'bg-block-4',
  events: 'bg-block-2',
  clubs: 'bg-block-5',
};

export const emojiFor: Record<Category, string> = {
  elders: '\u2615',
  serve: '\uD83E\uDD6A',
  play: '\uD83C\uDFD3',
  events: '\uD83C\uDF8A',
  clubs: '\uD83E\uDD1D',
};

export const byId = new Map<string, Opportunity>(opportunities.map((o) => [o.id, o]));

/** Two different opportunities, never the same pair twice in a row. */
export function pickPair(avoid?: [string, string]): [Opportunity, Opportunity] {
  for (let tries = 0; tries < 24; tries += 1) {
    const a = opportunities[Math.floor(Math.random() * opportunities.length)];
    const b = opportunities[Math.floor(Math.random() * opportunities.length)];
    if (a.id === b.id) continue;
    if (avoid && avoid.includes(a.id) && avoid.includes(b.id)) continue;
    // a matchup across two different vibes is a real choice; two pickleball
    // leagues against each other is not
    if (tries < 16 && a.category === b.category) continue;
    return [a, b];
  }
  return [opportunities[0], opportunities[1]];
}

export type Score = { cast: number; matched: number };

const KEY = 'patterson-vote-score';

export function readScore(): Score {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { cast: 0, matched: 0 };
    const parsed = JSON.parse(raw) as Score;
    return {
      cast: Number.isFinite(parsed.cast) ? parsed.cast : 0,
      matched: Number.isFinite(parsed.matched) ? parsed.matched : 0,
    };
  } catch {
    return { cast: 0, matched: 0 };
  }
}

export function writeScore(score: Score): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(score));
  } catch {
    /* private browsing, nothing to do */
  }
}

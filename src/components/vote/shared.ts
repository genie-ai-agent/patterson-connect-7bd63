import { options, type Option, type Vibe } from '../../data/options';

/** One soft colour per vibe. Cards are solid colour, type is knocked out. */
export const tint: Record<Vibe, string> = {
  elders: 'bg-block-3 text-white',
  serve: 'bg-block-1 text-white',
  play: 'bg-block-4 text-white',
  events: 'bg-block-2 text-ink',
  clubs: 'bg-block-5 text-white',
};

/** Bar fill on the results screen: same hue, washed out so ink stays legible. */
export const wash: Record<Vibe, string> = {
  elders: 'bg-block-3/30',
  serve: 'bg-block-1/30',
  play: 'bg-block-4/30',
  events: 'bg-block-2/45',
  clubs: 'bg-block-5/30',
};

/** Two options from different vibes, never repeating the last pair. */
export function pickPair(avoid?: [string, string]): [Option, Option] {
  for (let tries = 0; tries < 30; tries += 1) {
    const a = options[Math.floor(Math.random() * options.length)];
    const b = options[Math.floor(Math.random() * options.length)];
    if (a.id === b.id) continue;
    if (avoid && avoid.includes(a.id) && avoid.includes(b.id)) continue;
    if (tries < 20 && a.vibe === b.vibe) continue;
    return [a, b];
  }
  return [options[0], options[1]];
}

export function hrefFor(opt: Option): string | null {
  if (!opt.call) return null;
  if (opt.call.kind === 'tel') return `tel:${opt.call.value}`;
  if (opt.call.kind === 'email') return `mailto:${opt.call.value}`;
  return opt.call.value;
}

export function actionFor(opt: Option): string {
  if (!opt.call) return 'Details';
  if (opt.call.kind === 'tel') return `Call ${opt.call.label}`;
  if (opt.call.kind === 'email') return 'Email them';
  return 'Open details';
}

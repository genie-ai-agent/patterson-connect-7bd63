import { opportunities } from '../../data/opportunities';
import { oneFor } from '../../data/oneliners';
import type { Tallies } from '../../lib/db';
import { emojiFor } from './shared';

/** The whole board, plain rows. Tapping a row calls or opens it. */
export default function Standings({ tallies }: { tallies: Tallies }) {
  const ranked = [...opportunities]
    .map((o) => ({ opp: o, votes: tallies[o.id] ?? 0 }))
    .sort((a, b) => b.votes - a.votes || a.opp.title.localeCompare(b.opp.title))
    .slice(0, 5);

  const total = Object.values(tallies).reduce((sum, n) => sum + n, 0);

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-16">
      <h2 className="font-heading text-xl font-black sm:text-2xl">What the town picks</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {total === 0 ? 'No votes yet. Yours goes first.' : `${total} ${total === 1 ? 'vote' : 'votes'} so far. Tap a row to reach them.`}
      </p>

      <ol className="mt-4 divide-y-2 divide-ink border-y-2 border-ink">
        {ranked.map(({ opp, votes }, i) => {
          const contact = opp.contacts[0];
          const href =
            contact.kind === 'tel'
              ? `tel:${contact.value}`
              : contact.kind === 'email'
                ? `mailto:${contact.value}`
                : contact.value;
          return (
            <li key={opp.id}>
              <a
                href={href}
                target={contact.kind === 'url' ? '_blank' : undefined}
                rel={contact.kind === 'url' ? 'noreferrer' : undefined}
                className="flex min-h-[3.5rem] items-center gap-3 py-3 transition-colors hover:bg-secondary/40"
              >
                <span className="font-heading w-5 text-lg font-black tabular-nums">{i + 1}</span>
                <span aria-hidden="true" className="text-xl">
                  {emojiFor[opp.category]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{opp.title}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {oneFor(opp.id, opp.cadence)}
                  </span>
                </span>
                <span className="shrink-0 text-sm font-bold tabular-nums">{votes}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

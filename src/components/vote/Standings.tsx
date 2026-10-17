import { useMemo, useState } from 'react';
import { opportunities } from '../../data/opportunities';
import { barFor, emojiFor, type Score } from './shared';
import type { Tallies } from '../../lib/db';

type Props = {
  tallies: Tallies;
  total: number;
  flash: string | null;
  score: Score;
};

export default function Standings({ tallies, total, flash, score }: Props) {
  const [showAll, setShowAll] = useState(false);

  const ranked = useMemo(
    () =>
      opportunities
        .map((o) => ({ o, votes: tallies[o.id] ?? 0 }))
        .sort((a, b) => b.votes - a.votes || a.o.title.localeCompare(b.o.title)),
    [tallies],
  );

  const top = ranked[0]?.votes ?? 0;
  const rows = showAll ? ranked : ranked.slice(0, 8);

  return (
    <div
      className="border-2 border-paper bg-paper p-5 text-ink sm:p-7"
      style={{ boxShadow: '10px 10px 0 0 var(--block-4)' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-ink pb-3">
        <h3 className="font-heading text-[clamp(1.7rem,6vw,2.4rem)] leading-[0.95]">
          The board
        </h3>
        <p className="kicker text-muted-foreground">
          {total} {total === 1 ? 'vote' : 'votes'} cast
          {score.cast > 0 && total > 0 ? ` \u00b7 ${score.cast} by you` : ''}
        </p>
      </div>

      {total === 0 ? (
        <p className="py-6 text-[1.0625rem] leading-[1.55] text-muted-foreground">
          Nobody has voted yet. Whoever taps first sets the whole board, so go
          pick a side.
        </p>
      ) : (
        <>
          <ol className="mt-5 space-y-3">
            {rows.map(({ o, votes }, i) => {
              const pct = top > 0 ? Math.max(3, Math.round((votes / top) * 100)) : 0;
              return (
                <li key={o.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="w-5 shrink-0 font-sans text-[0.7rem] font-black tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span aria-hidden="true">{emojiFor[o.category]}</span>
                      <span
                        className={`truncate font-heading text-[1.1rem] leading-tight sm:text-[1.3rem] ${
                          flash === o.id ? 'text-primary italic' : ''
                        }`}
                      >
                        {o.title}
                      </span>
                    </span>
                    <span className="shrink-0 font-sans text-[0.85rem] font-black tabular-nums">
                      {votes}
                    </span>
                  </div>
                  <div className="mt-1.5 h-3 w-full border-2 border-ink bg-muted">
                    <div
                      className={`h-full ${barFor[o.category]} transition-[width] duration-700 ease-out`}
                      style={{ width: votes === 0 ? '0%' : `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

          {ranked.length > 8 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="kicker mt-5 min-h-[46px] w-full border-2 border-ink bg-card px-4 transition-colors hover:bg-secondary"
            >
              {showAll ? 'Show the top 8' : `Show all ${ranked.length}`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

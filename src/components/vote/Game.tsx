import { useEffect, useState } from 'react';
import type { Opportunity } from '../../data/opportunities';
import { oneFor } from '../../data/oneliners';
import { castVote, loadTallies, type Tallies } from '../../lib/db';
import Choice from './Choice';
import Standings from './Standings';
import { blockFor, emojiFor, pickPair } from './shared';

type Picked = { won: Opportunity; lost: Opportunity };

export default function Game() {
  const [pair, setPair] = useState<[Opportunity, Opportunity]>(() => pickPair());
  const [picked, setPicked] = useState<Picked | null>(null);
  const [tallies, setTallies] = useState<Tallies>({});
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadTallies()
      .then(setTallies)
      .catch(() => setTallies({}));
  }, []);

  async function pick(won: Opportunity, lost: Opportunity) {
    if (saving) return;
    setSaving(true);
    setFailed(false);
    setPicked({ won, lost });
    setTallies((prev) => ({ ...prev, [won.id]: (prev[won.id] ?? 0) + 1 }));
    try {
      await castVote(won.id, lost.id);
    } catch {
      setFailed(true);
    } finally {
      setSaving(false);
    }
  }

  function next() {
    setPair((prev) => pickPair([prev[0].id, prev[1].id]));
    setPicked(null);
    setFailed(false);
    loadTallies()
      .then(setTallies)
      .catch(() => undefined);
  }

  return (
    <>
      <section className="mx-auto w-full max-w-2xl px-4 pt-8 pb-10 sm:pt-12">
        {picked ? (
          <Result picked={picked} failed={failed} onNext={next} />
        ) : (
          <>
            <h1 className="font-heading text-center text-3xl leading-[1.05] font-black sm:text-5xl">
              Which should I do?
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
              Tap one. That's the whole thing.
            </p>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
              <Choice opp={pair[0]} disabled={saving} onPick={() => pick(pair[0], pair[1])} />
              <Choice opp={pair[1]} disabled={saving} onPick={() => pick(pair[1], pair[0])} />
            </div>
          </>
        )}
      </section>
      <Standings tallies={tallies} />
    </>
  );
}

function Result({
  picked,
  failed,
  onNext,
}: {
  picked: Picked;
  failed: boolean;
  onNext: () => void;
}) {
  const { won } = picked;
  return (
    <div>
      <p className="text-center text-sm font-bold tracking-[0.2em] uppercase">You picked</p>
      <div
        className={`${blockFor[won.category]} mt-3 border-4 border-ink px-5 py-7 shadow-lg sm:px-8 sm:py-9`}
      >
        <span aria-hidden="true" className="text-4xl leading-none sm:text-5xl">
          {emojiFor[won.category]}
        </span>
        <h2 className="font-heading mt-2 text-3xl leading-[1.05] font-black sm:text-4xl">
          {won.title}
        </h2>
        <p className="mt-2 text-base leading-snug opacity-90">{oneFor(won.id, won.cadence)}</p>
        <p className="mt-1 text-sm opacity-80">{won.cadence}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {won.contacts.map((c) => (
            <a
              key={c.value}
              href={
                c.kind === 'tel'
                  ? `tel:${c.value}`
                  : c.kind === 'email'
                    ? `mailto:${c.value}`
                    : c.value
              }
              target={c.kind === 'url' ? '_blank' : undefined}
              rel={c.kind === 'url' ? 'noreferrer' : undefined}
              className="min-h-[2.75rem] border-2 border-ink bg-paper px-4 py-2 font-bold text-ink shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:hover:-translate-y-0.5"
            >
              {c.kind === 'tel' ? 'Call ' : c.kind === 'email' ? 'Email ' : ''}
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {failed ? (
        <p className="mt-3 text-center text-sm font-semibold text-destructive">
          Your vote didn't save. The pick still stands, try the next one.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onNext}
        className="mt-4 min-h-[3.25rem] w-full border-4 border-ink bg-ink px-6 py-3 font-heading text-lg font-black text-paper shadow-md transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none md:hover:-translate-y-0.5"
      >
        Next two →
      </button>
    </div>
  );
}

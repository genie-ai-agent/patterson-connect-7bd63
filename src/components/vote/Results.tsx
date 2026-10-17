import { useEffect, useState } from 'react';
import type { Option } from '../../data/options';
import { actionFor, hrefFor, wash } from './shared';

type Props = {
  picked: Option;
  other: Option;
  pickedVotes: number;
  otherVotes: number;
  failed: boolean;
  onNext: () => void;
};

/** Poll results: two bars that fill, the winner's number counting up. */
export default function Results({
  picked,
  other,
  pickedVotes,
  otherVotes,
  failed,
  onNext,
}: Props) {
  const total = Math.max(pickedVotes + otherVotes, 1);
  const pickedPct = Math.round((pickedVotes / total) * 100);
  const otherPct = 100 - pickedPct;

  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setGrown(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const href = hrefFor(picked);
  const alone = total === 1;

  return (
    <div className="pop">
      <p className="text-center text-sm font-semibold tracking-wide text-muted-foreground">
        {alone ? 'First vote on this one.' : `You and ${pickedPct}% of Patterson.`}
      </p>

      <div className="mt-5 space-y-3">
        <Bar opt={picked} pct={grown ? pickedPct : 0} shown={pickedPct} mine />
        <Bar opt={other} pct={grown ? otherPct : 0} shown={otherPct} mine={false} />
      </div>

      {href ? (
        <a
          href={href}
          target={picked.call?.kind === 'url' ? '_blank' : undefined}
          rel={picked.call?.kind === 'url' ? 'noreferrer' : undefined}
          className="mt-5 flex min-h-[3.25rem] items-center justify-center rounded-full border border-ink/15 bg-card px-6 font-semibold shadow-soft transition active:scale-[0.985] md:hover:-translate-y-0.5"
        >
          {actionFor(picked)}
        </a>
      ) : null}

      <button
        type="button"
        onClick={onNext}
        className="mt-3 flex min-h-[3.5rem] w-full items-center justify-center rounded-full bg-ink px-6 font-heading text-lg font-black text-paper shadow-soft transition active:scale-[0.985] md:hover:-translate-y-0.5"
      >
        Next →
      </button>

      {failed ? (
        <p className="mt-3 text-center text-sm font-semibold text-destructive">
          That vote didn't save. Try the next one.
        </p>
      ) : null}
    </div>
  );
}

function Bar({
  opt,
  pct,
  shown,
  mine,
}: {
  opt: Option;
  pct: number;
  shown: number;
  mine: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] bg-card shadow-soft ${
        mine ? '' : 'opacity-70'
      }`}
    >
      <div
        className={`${wash[opt.vibe]} absolute inset-y-0 left-0 transition-[width] duration-[900ms] ease-out`}
        style={{ width: `${pct}%` }}
      />
      <div className="relative flex items-center gap-3 px-5 py-4">
        <span aria-hidden="true" className="text-2xl">
          {opt.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-heading block truncate text-lg font-black sm:text-xl">
            {opt.label}
          </span>
        </span>
        <span className="font-heading shrink-0 text-xl font-black tabular-nums sm:text-2xl">
          {shown}%
        </span>
      </div>
    </div>
  );
}

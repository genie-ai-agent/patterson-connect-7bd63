import { useCallback, useEffect, useMemo, useState } from 'react';
import { Trophy, Vote as VoteIcon } from 'lucide-react';
import type { Opportunity } from '../../data/opportunities';
import { castVote, loadTallies, type Tallies } from '../../lib/db';
import { cn } from '../../lib/utils';
import {
  blockFor,
  byId,
  emojiFor,
  pickPair,
  readScore,
  writeScore,
  type Score,
} from './shared';
import Standings from './Standings';

type Phase = 'loading' | 'ready' | 'saving' | 'result' | 'error';

const STEPS = [
  'Tap the side you want to win.',
  'The board moves the second you tap.',
  'Whatever is leading is where I show up.',
];

export default function VoteGame() {
  const [tallies, setTallies] = useState<Tallies>({});
  const [pair, setPair] = useState<[Opportunity, Opportunity] | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [picked, setPicked] = useState<Opportunity | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [score, setScore] = useState<Score>({ cast: 0, matched: 0 });

  const total = useMemo(
    () => Object.values(tallies).reduce((a, b) => a + b, 0),
    [tallies],
  );

  const refresh = useCallback(async () => {
    try {
      setTallies(await loadTallies());
      setProblem(null);
      return true;
    } catch (err) {
      setProblem(err instanceof Error ? err.message : 'standings unavailable');
      return false;
    }
  }, []);

  useEffect(() => {
    setScore(readScore());
    setPair(pickPair());
    void (async () => {
      const ok = await refresh();
      setPhase(ok ? 'ready' : 'error');
    })();
  }, [refresh]);

  const nextRound = useCallback(() => {
    setPair((prev) => pickPair(prev ? [prev[0].id, prev[1].id] : undefined));
    setPicked(null);
    setPhase('ready');
  }, []);

  const retry = useCallback(() => {
    setPhase('loading');
    void (async () => {
      const ok = await refresh();
      setPhase(ok ? 'ready' : 'error');
    })();
  }, [refresh]);

  const vote = useCallback(
    async (choice: Opportunity, other: Opportunity) => {
      if (phase !== 'ready') return;
      setPicked(choice);
      setPhase('saving');

      // judged against the board as it stood *before* this tap landed, which
      // is what turns a vote into a guess
      const matched = (tallies[choice.id] ?? 0) > (tallies[other.id] ?? 0);

      try {
        await castVote(choice.id, other.id);
      } catch (err) {
        setProblem(err instanceof Error ? err.message : 'your vote did not save');
        setPhase('error');
        return;
      }

      const next: Score = {
        cast: score.cast + 1,
        matched: score.matched + (matched ? 1 : 0),
      };
      setScore(next);
      writeScore(next);
      await refresh();
      setPhase('result');
    },
    [phase, refresh, score, tallies],
  );

  const leaderId = useMemo(() => {
    let best: string | null = null;
    for (const [slug, n] of Object.entries(tallies)) {
      if (best === null || n > (tallies[best] ?? 0)) best = slug;
    }
    return best;
  }, [tallies]);

  const settled = phase === 'result';

  return (
    <section
      id="vote"
      className="relative overflow-hidden border-y-2 border-ink bg-ink text-paper"
    >
      <div className="press-stripe h-2 w-full" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-12 gap-x-5 gap-y-7">
          {/* the pitch */}
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker flex items-center gap-2 text-secondary">
              <VoteIcon className="h-4 w-4" aria-hidden="true" />
              The town decides
            </p>
            <h2 className="mt-3 font-heading text-[clamp(2.3rem,10vw,4rem)] leading-[0.9] text-paper">
              Which should I<br />
              <span className="sunset-text italic">do next?</span>
            </h2>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-[1.55] text-paper/80">
              One tap, no sign-up, and it counts for real. Vote as many matchups
              as you want.
            </p>

            <ol className="mt-6 space-y-2">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-baseline gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-secondary font-sans text-[0.7rem] font-black text-secondary">
                    {i + 1}
                  </span>
                  <span className="text-[0.95rem] leading-snug text-paper/80">
                    {s}
                  </span>
                </li>
              ))}
            </ol>

            {score.cast > 0 && (
              <p className="kicker mt-6 inline-block border-2 border-secondary px-3 py-1.5 text-secondary">
                You: {score.cast} {score.cast === 1 ? 'vote' : 'votes'} &middot;
                with the town {score.matched}/{score.cast}
              </p>
            )}

            {leaderId && total > 0 && (
              <div
                className="mt-6 flex items-start gap-3 border-2 border-paper bg-secondary p-4 text-ink"
                style={{ boxShadow: '6px 6px 0 0 var(--block-3)' }}
              >
                <Trophy className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="kicker">Winning right now</p>
                  <p className="mt-1 font-heading text-[1.5rem] leading-[1.1]">
                    {byId.get(leaderId)?.title ?? leaderId}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* the matchup */}
          <div className="col-span-12 lg:col-span-7">
            {phase === 'loading' && (
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-60 animate-pulse border-2 border-paper/30 bg-paper/10"
                  />
                ))}
              </div>
            )}

            {phase === 'error' && (
              <div
                className="border-2 border-paper bg-paper p-6 text-ink"
                style={{ boxShadow: '10px 10px 0 0 var(--primary)' }}
              >
                <p className="font-heading text-[1.9rem] leading-[0.95]">
                  The board is not answering.
                </p>
                <p className="mt-3 text-[1rem] leading-[1.5] text-muted-foreground">
                  {problem}
                </p>
                <button
                  type="button"
                  onClick={retry}
                  className="kicker mt-5 inline-flex min-h-[46px] items-center border-2 border-ink bg-primary px-5 text-primary-foreground"
                >
                  Try again
                </button>
              </div>
            )}

            {pair && phase !== 'loading' && phase !== 'error' && (
              <div className="relative grid gap-4 sm:grid-cols-2">
                {pair.map((o) => {
                  const isPick = picked?.id === o.id;
                  const votes = tallies[o.id] ?? 0;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={phase !== 'ready'}
                      onClick={() => void vote(o, pair.find((x) => x.id !== o.id)!)}
                      className={cn(
                        'min-h-[15rem] border-2 border-paper p-5 text-left transition-transform duration-150',
                        isPick ? 'bg-secondary text-ink' : 'bg-paper text-ink',
                        settled && !isPick && 'opacity-40',
                        phase === 'ready'
                          ? 'hover:-translate-y-1 active:translate-y-0'
                          : 'cursor-default',
                      )}
                      style={{
                        boxShadow: isPick
                          ? '10px 10px 0 0 var(--block-3)'
                          : '6px 6px 0 0 var(--paper)',
                      }}
                    >
                      <span
                        className={cn(
                          'kicker inline-block px-2 py-1',
                          blockFor[o.category],
                        )}
                      >
                        {emojiFor[o.category]} {o.cadence}
                      </span>
                      <span className="mt-3 block font-heading text-[clamp(1.6rem,5.5vw,2.1rem)] leading-[0.95]">
                        {o.title}
                      </span>
                      <span className="kicker mt-2 block text-primary">{o.org}</span>
                      <span className="mt-3 block text-[0.98rem] leading-[1.5]">
                        {o.spark}
                      </span>
                      <span className="kicker mt-4 block">
                        {settled ? (
                          <>
                            {votes} {votes === 1 ? 'vote' : 'votes'}
                            {isPick ? ' \u00b7 your pick' : ''}
                          </>
                        ) : phase === 'saving' && isPick ? (
                          'Counting\u2026'
                        ) : (
                          <span className="text-primary">Tap to vote &rarr;</span>
                        )}
                      </span>
                    </button>
                  );
                })}
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-primary px-3 py-1 font-heading text-xl text-primary-foreground sm:block"
                  aria-hidden="true"
                >
                  VS
                </span>
              </div>
            )}

            {settled && picked && (
              <div
                className="pop mt-4 border-2 border-paper bg-paper p-5 text-ink"
                style={{ boxShadow: '10px 10px 0 0 var(--secondary)' }}
                aria-live="polite"
              >
                <p className="font-heading text-[clamp(1.5rem,5vw,2rem)] leading-[1]">
                  Counted. You put me on {picked.title}.
                </p>
                <p className="mt-2 text-[0.98rem] leading-[1.5] text-muted-foreground">
                  {picked.where} &middot; {picked.cadence}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 border-t-2 border-ink pt-4">
                  {picked.contacts.map((c) => (
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
                      rel={c.kind === 'url' ? 'noopener' : undefined}
                      className="kicker inline-flex min-h-[46px] items-center border-2 border-ink bg-secondary px-4 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {c.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={nextRound}
                    className="kicker inline-flex min-h-[46px] items-center border-2 border-ink bg-primary px-5 text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Next matchup &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* the board */}
          <div className="col-span-12">
            <Standings
              tallies={tallies}
              total={total}
              flash={picked?.id ?? null}
              score={score}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

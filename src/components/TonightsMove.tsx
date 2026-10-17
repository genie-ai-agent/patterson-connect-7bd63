import { useEffect, useRef, useState } from 'react';
import { Dice5, Phone, Mail, ExternalLink } from 'lucide-react';
import { categories, opportunities, type Opportunity } from '../data/opportunities';
import { cn } from '../lib/utils';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/** what the town is actually doing today, by weekday */
const TODAY: Record<number, string> = {
  0: 'Pickleball drop-in at Walnut Grove gym, 1\u20134pm. Three dollars.',
  1: 'Hammon Senior Center is open, lunch at 11:30. Walk in and ask what needs doing.',
  2: 'Senior center activity day. Loteria, sewing, cards, somebody short a partner.',
  3: 'First Wednesday? Rotary eats at Mils. Otherwise the senior center is open.',
  4: 'Food pantry and library days. Both take walk-up help.',
  5: 'Pickleball drop-in at Walnut Grove gym, 6\u20139pm. Best night of the week for this.',
  6: 'Trailhead day. Del Puerto Canyon in the morning, farmers market crowd after.',
};

function iconFor(kind: Opportunity['contacts'][number]['kind']) {
  return kind === 'tel' ? Phone : kind === 'email' ? Mail : ExternalLink;
}

function hrefFor(c: Opportunity['contacts'][number]) {
  return c.kind === 'tel' ? `tel:${c.value}` : c.kind === 'email' ? `mailto:${c.value}` : c.value;
}

export default function TonightsMove() {
  const [pick, setPick] = useState<Opportunity | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [spins, setSpins] = useState(0);
  const [today, setToday] = useState<{ day: string; line: string } | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const d = new Date();
    setToday({ day: DAYS[d.getDay()], line: TODAY[d.getDay()] });
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const landing = Math.floor(Math.random() * opportunities.length);
    let step = 0;
    const total = 16;

    const tick = () => {
      step += 1;
      setCursor((c) => (c + 1) % opportunities.length);
      if (step < total) {
        timers.current.push(window.setTimeout(tick, 60 + step * 11));
      } else {
        setPick(opportunities[landing]);
        setSpinning(false);
        setSpins((n) => n + 1);
      }
    };
    timers.current.push(window.setTimeout(tick, 60));
  };

  const reel = opportunities[cursor];
  const cat = pick ? categories.find((c) => c.id === pick.category) : null;

  return (
    <section
      id="spin"
      className="relative overflow-hidden border-y-2 border-ink bg-ink text-paper"
    >
      <div className="press-stripe h-2 w-full" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-12 gap-x-5 gap-y-7">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-secondary">Can&rsquo;t decide</p>
            <h2 className="mt-3 font-heading text-[clamp(2.3rem,10vw,4rem)] leading-[0.9] text-paper">
              Let the town<br />
              <span className="sunset-text italic">pick for you</span>
            </h2>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-[1.55] text-paper/80">
              One tap, one plan, one phone number. If you hate it, tap again.
            </p>

            <button
              type="button"
              onClick={spin}
              className={cn(
                'mt-6 inline-flex min-h-[58px] w-full items-center justify-center gap-3 border-2 border-paper bg-primary px-7 font-sans text-[0.82rem] font-black uppercase tracking-[0.18em] text-primary-foreground transition-transform active:scale-[0.98] sm:w-auto',
                !spinning && 'hover:-translate-y-0.5',
                spinning && 'opacity-80',
              )}
              style={{ boxShadow: '5px 5px 0 0 var(--secondary)' }}
            >
              <Dice5
                className={cn('h-5 w-5', spinning && 'animate-spin')}
                aria-hidden="true"
              />
              {spinning ? 'Rolling\u2026' : pick ? 'Roll again' : 'Roll me a plan'}
            </button>

            {spins > 1 && (
              <p className="kicker mt-3 text-paper/55">
                {spins} rolls deep &middot; just call one of them
              </p>
            )}

            {today && (
              <div className="mt-8 border-l-4 border-secondary pl-4">
                <p className="kicker text-secondary">Today is {today.day}</p>
                <p className="mt-1.5 font-heading text-[1.35rem] italic leading-[1.2] text-paper sm:text-2xl">
                  {today.line}
                </p>
              </div>
            )}
          </div>

          {/* the reel */}
          <div className="col-span-12 lg:col-span-7">
            <div
              className={cn(
                'border-2 border-paper bg-paper p-5 text-ink sm:p-7',
                !spinning && pick && 'pop',
              )}
              style={{ boxShadow: '10px 10px 0 0 var(--block-3)' }}
              aria-live="polite"
            >
              {spinning ? (
                <div className="flicker">
                  <p className="kicker text-muted-foreground">Shuffling the whole town</p>
                  <p className="mt-3 font-heading text-[clamp(1.8rem,7vw,2.8rem)] leading-[0.95]">
                    {reel.title}
                  </p>
                  <p className="kicker mt-3 text-primary">{reel.org}</p>
                </div>
              ) : pick ? (
                <div>
                  <p className="kicker text-primary">
                    {cat?.emoji} {cat?.label} &middot; {pick.cadence}
                  </p>
                  <h3 className="mt-3 font-heading text-[clamp(1.9rem,8vw,3.1rem)] leading-[0.93]">
                    {pick.title}
                  </h3>
                  <p className="mt-3 text-[1.0625rem] leading-[1.55]">{pick.blurb}</p>
                  <p className="mt-4 border-l-4 border-block-3 pl-4 font-heading text-[1.25rem] italic leading-[1.25]">
                    {pick.spark}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t-2 border-ink pt-4">
                    {pick.contacts.map((c) => {
                      const Icon = iconFor(c.kind);
                      return (
                        <a
                          key={c.value}
                          href={hrefFor(c)}
                          target={c.kind === 'url' ? '_blank' : undefined}
                          rel={c.kind === 'url' ? 'noopener' : undefined}
                          className="inline-flex min-h-[46px] items-center gap-2 border-2 border-ink bg-secondary px-4 text-[0.72rem] font-black uppercase tracking-[0.12em] text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {c.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="deco block text-[4.5rem] text-primary/30" aria-hidden="true">
                    ?
                  </span>
                  <p className="mt-2 font-heading text-[clamp(1.8rem,7vw,2.7rem)] leading-[0.95]">
                    {opportunities.length} doors, one roll
                  </p>
                  <p className="mt-3 max-w-md text-[1.0625rem] leading-[1.55] text-muted-foreground">
                    Every result is a real program with a real number. Hit the button and
                    commit to whatever comes up.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

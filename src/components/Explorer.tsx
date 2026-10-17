import { useEffect, useMemo, useState } from 'react';
import { Heart, Phone, Mail, ExternalLink } from 'lucide-react';
import {
  categories,
  opportunities,
  type Category,
  type Opportunity,
} from '../data/opportunities';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from './ui/card';

const STORE_KEY = 'patterson-shortlist-v1';

type Sort = 'people' | 'ease';

const blockFor: Record<Category, { bg: string; fg: string; text: string; border: string }> = {
  elders: {
    bg: 'bg-block-3',
    fg: 'text-block-3-foreground',
    text: 'text-block-3',
    border: 'border-block-3',
  },
  serve: {
    bg: 'bg-block-1',
    fg: 'text-block-1-foreground',
    text: 'text-block-1',
    border: 'border-block-1',
  },
  play: {
    bg: 'bg-block-4',
    fg: 'text-block-4-foreground',
    text: 'text-block-4',
    border: 'border-block-4',
  },
  events: {
    bg: 'bg-block-2',
    fg: 'text-block-2-foreground',
    text: 'text-block-2',
    border: 'border-block-2',
  },
  clubs: {
    bg: 'bg-block-5',
    fg: 'text-block-5-foreground',
    text: 'text-block-5',
    border: 'border-block-5',
  },
};

function Meter({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: 'primary' | 'accent';
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="kicker text-[0.6rem] text-muted-foreground">{label}</span>
      <span className="flex gap-1" aria-label={`${label}: ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              'h-3 w-3 border-2 border-ink',
              n <= value
                ? tone === 'primary'
                  ? 'bg-primary'
                  : 'bg-block-4'
                : 'bg-transparent',
            )}
          />
        ))}
      </span>
    </div>
  );
}

function ContactLink({ contact }: { contact: Opportunity['contacts'][number] }) {
  const href =
    contact.kind === 'tel'
      ? `tel:${contact.value}`
      : contact.kind === 'email'
        ? `mailto:${contact.value}`
        : contact.value;
  const Icon = contact.kind === 'tel' ? Phone : contact.kind === 'email' ? Mail : ExternalLink;

  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="min-h-[44px] border-2 border-ink bg-background px-4 font-sans text-[0.72rem] font-black uppercase tracking-[0.12em] hover:bg-primary hover:text-primary-foreground"
    >
      <a
        href={href}
        target={contact.kind === 'url' ? '_blank' : undefined}
        rel={contact.kind === 'url' ? 'noopener' : undefined}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {contact.label}
      </a>
    </Button>
  );
}

function OppCard({
  item,
  index,
  saved,
  onToggle,
}: {
  item: Opportunity;
  index: number;
  saved: boolean;
  onToggle: (id: string) => void;
}) {
  const cat = categories.find((c) => c.id === item.category);
  const block = blockFor[item.category];

  return (
    <Card className="lift mb-6 gap-0 break-inside-avoid rounded-none border-2 border-ink py-0 shadow-lg">
      {/* category plate */}
      <div
        className={cn(
          'flex items-stretch justify-between gap-3 border-b-2 border-ink',
          block.bg,
          block.fg,
        )}
      >
        <span className="kicker flex items-center gap-2 px-4 py-3 text-[0.65rem]">
          <span aria-hidden="true" className="text-base leading-none">
            {cat?.emoji}
          </span>
          {cat?.label}
        </span>
        <span className="flex items-stretch">
          <span className="deco flex items-center border-l-2 border-ink px-3 text-2xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${item.title} from shortlist` : `Save ${item.title}`}
            className={cn(
              'flex w-12 shrink-0 items-center justify-center border-l-2 border-ink transition-colors active:scale-95',
              saved ? 'bg-primary text-primary-foreground' : 'bg-card text-ink hover:bg-secondary',
            )}
          >
            <Heart
              className={cn('h-5 w-5', saved && 'heart-pop fill-current')}
              aria-hidden="true"
            />
          </button>
        </span>
      </div>

      <CardContent className="px-5 py-5">
        <CardTitle className="font-heading text-[clamp(1.6rem,6vw,2.1rem)] font-black leading-[0.95] tracking-[-0.02em]">
          {item.title}
        </CardTitle>
        <CardDescription className={cn('kicker mt-2 text-[0.625rem]', block.text)}>
          {item.org}
        </CardDescription>

        <p className="mt-4 text-[1.0625rem] leading-[1.55]">{item.blurb}</p>

        <p
          className={cn(
            'mt-5 border-l-4 pl-4 font-heading text-[1.3rem] italic leading-[1.25]',
            block.border,
          )}
        >
          {item.spark}
        </p>

        <dl className="mt-5 border-t border-ink text-sm">
          <div className="flex gap-3 border-b border-ink/30 py-2">
            <dt className="kicker w-16 shrink-0 pt-0.5 text-[0.6rem] text-muted-foreground">
              Where
            </dt>
            <dd className="flex-1">{item.where}</dd>
          </div>
          <div className="flex gap-3 py-2">
            <dt className="kicker w-16 shrink-0 pt-0.5 text-[0.6rem] text-muted-foreground">
              When
            </dt>
            <dd className="flex-1">{item.cadence}</dd>
          </div>
        </dl>

        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span aria-hidden="true" className={block.text}>
                &#9656;
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-2 bg-muted p-3">
          <Meter value={item.people} label="Face time" tone="primary" />
          <Meter value={item.ease} label="Easy to start" tone="accent" />
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-2 border-t-2 border-ink bg-background px-5 py-4">
        {item.contacts.map((c) => (
          <ContactLink key={c.value} contact={c} />
        ))}
      </CardFooter>
    </Card>
  );
}

export default function Explorer() {
  const [active, setActive] = useState<Category | 'all' | 'saved'>('all');
  const [sort, setSort] = useState<Sort>('people');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) setSavedIds(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(savedIds));
    } catch {
      /* ignore */
    }
  }, [savedIds, ready]);

  const toggle = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const list = useMemo(() => {
    const base =
      active === 'all'
        ? opportunities
        : active === 'saved'
          ? opportunities.filter((o) => savedIds.includes(o.id))
          : opportunities.filter((o) => o.category === active);

    return [...base].sort((a, b) =>
      sort === 'people'
        ? b.people - a.people || b.ease - a.ease
        : b.ease - a.ease || b.people - a.people,
    );
  }, [active, sort, savedIds]);

  const chips: { id: Category | 'all' | 'saved'; label: string; emoji?: string }[] = [
    { id: 'all', label: `All ${opportunities.length}` },
    ...categories.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
    { id: 'saved', label: `Shortlist ${savedIds.length ? `(${savedIds.length})` : ''}`.trim() },
  ];

  const activeCat = categories.find((c) => c.id === active);

  return (
    <section id="explore" className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="rule-heavy grid grid-cols-12 gap-x-4 gap-y-3 pt-6">
        <div className="col-span-12 md:col-span-8">
          <p className="kicker text-primary">Everything, filtered</p>
          <h2 className="mt-3 font-heading text-[clamp(2.3rem,9vw,4.75rem)] leading-[0.9]">
            Pick your<br />
            <span className="italic">kind of people</span>
          </h2>
        </div>
        <p className="col-span-12 self-end text-base leading-relaxed text-muted-foreground md:col-span-4">
          Face time is how much real conversation happens. Easy to start is how fast you
          could be in the room.
        </p>
      </div>

      {/* filing tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setActive(chip.id)}
            aria-pressed={active === chip.id}
            className={cn(
              'min-h-[44px] border-2 border-ink px-4 font-sans text-[0.7rem] font-black uppercase tracking-[0.14em] transition-all',
              active === chip.id
                ? 'bg-ink text-paper shadow-[4px_4px_0_0_var(--primary)]'
                : 'bg-card hover:-translate-y-0.5 hover:bg-secondary',
            )}
          >
            {chip.emoji ? `${chip.emoji} ` : ''}
            {chip.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-y border-ink py-3">
        <span className="kicker mr-1 text-[0.6rem] text-muted-foreground">Sort by</span>
        {(
          [
            { id: 'people', label: 'Most face time' },
            { id: 'ease', label: 'Easiest to start' },
          ] as { id: Sort; label: string }[]
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSort(opt.id)}
            aria-pressed={sort === opt.id}
            className={cn(
              'min-h-[40px] border-2 px-3 font-sans text-[0.7rem] font-black uppercase tracking-[0.12em] transition-colors',
              sort === opt.id
                ? 'border-ink bg-primary text-primary-foreground'
                : 'border-ink/30 bg-transparent text-muted-foreground hover:border-ink hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {activeCat && (
        <p className="mt-5 font-heading text-[clamp(1.5rem,6vw,2.25rem)] italic leading-tight">
          <span className="text-primary">&ldquo;</span>
          {activeCat.tagline}
          <span className="text-primary">&rdquo;</span>
        </p>
      )}

      <p className="kicker mt-5 text-muted-foreground">
        {list.length} {list.length === 1 ? 'listing' : 'listings'}
      </p>

      {list.length === 0 ? (
        <div className="mt-6 border-2 border-ink bg-card p-8 text-center shadow-lg">
          <span className="deco block text-6xl text-primary/25" aria-hidden="true">
            00
          </span>
          <p className="mt-3 font-heading text-[clamp(1.6rem,7vw,2.5rem)] leading-tight">
            {active === 'saved' ? 'Your shortlist is empty' : 'Nothing in that one yet'}
          </p>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            {active === 'saved'
              ? 'Tap the heart on anything that sounds like your kind of night and it lands here, even after you close the tab.'
              : 'Try another filter.'}
          </p>
          <Button
            onClick={() => setActive('all')}
            size="lg"
            className="mt-6 min-h-[48px] border-2 border-ink bg-secondary px-6 font-sans text-[0.75rem] font-black uppercase tracking-[0.18em] text-secondary-foreground shadow-md hover:bg-secondary"
          >
            Show everything
          </Button>
        </div>
      ) : (
        <div className="mt-6 columns-1 gap-6 md:columns-2">
          {list.map((item, i) => (
            <OppCard
              key={item.id}
              item={item}
              index={i}
              saved={savedIds.includes(item.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      {savedIds.length > 0 && active !== 'saved' && (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-2 border-ink bg-secondary p-4 text-secondary-foreground shadow-md">
          <Badge className="rounded-none border-2 border-ink bg-ink px-2.5 py-1 font-sans text-[0.65rem] font-black uppercase tracking-[0.16em] text-paper">
            {savedIds.length} saved
          </Badge>
          <p className="font-heading text-lg italic">Your shortlist is waiting.</p>
          <Button
            onClick={() => setActive('saved')}
            size="sm"
            className="ml-auto min-h-[40px] border-2 border-ink bg-card px-4 font-sans text-[0.68rem] font-black uppercase tracking-[0.14em] text-foreground hover:bg-card"
          >
            Open it
          </Button>
        </div>
      )}
    </section>
  );
}

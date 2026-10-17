import { useEffect, useMemo, useState } from 'react';
import type { Option } from '../../data/options';
import { castVote, loadVotes, type VoteRow } from '../../lib/db';
import Card from './Card';
import Results from './Results';
import { pickPair } from './shared';

export default function Poll() {
  const [pair, setPair] = useState<[Option, Option]>(() => pickPair());
  const [picked, setPicked] = useState<Option | null>(null);
  const [rows, setRows] = useState<VoteRow[]>([]);
  const [round, setRound] = useState(1);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadVotes()
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  const [a, b] = pair;
  const head = useMemo(() => {
    let forA = 0;
    let forB = 0;
    for (const r of rows) {
      if (r.slug === a.id && r.loser === b.id) forA += 1;
      else if (r.slug === b.id && r.loser === a.id) forB += 1;
    }
    return { forA, forB };
  }, [rows, a.id, b.id]);

  async function pick(won: Option, lost: Option) {
    if (saving || picked) return;
    setSaving(true);
    setFailed(false);
    setPicked(won);
    setRows((prev) => [{ slug: won.id, loser: lost.id }, ...prev]);
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
    setRound((n) => n + 1);
    loadVotes()
      .then(setRows)
      .catch(() => undefined);
  }

  const other = picked ? (picked.id === a.id ? b : a) : null;

  return (
    <section className="mx-auto w-full max-w-xl px-5 pt-10 pb-14 sm:pt-16">
      <h1 className="font-heading text-center text-[2.35rem] leading-[0.95] font-black sm:text-6xl">
        What should <span className="italic">Catrina</span> do?
      </h1>
      <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
        {picked ? 'She gets no say in this.' : 'Tap one.'}
      </p>

      <div className="mt-7 sm:mt-9">
        {picked && other ? (
          <Results
            picked={picked}
            other={other}
            pickedVotes={picked.id === a.id ? head.forA : head.forB}
            otherVotes={picked.id === a.id ? head.forB : head.forA}
            failed={failed}
            onNext={next}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <Card opt={a} disabled={saving} onPick={() => pick(a, b)} />
            <Card opt={b} disabled={saving} onPick={() => pick(b, a)} />
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs tracking-[0.18em] text-muted-foreground/80 uppercase">
        Round {round}
      </p>
    </section>
  );
}

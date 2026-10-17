import type { Opportunity } from '../../data/opportunities';
import { oneFor } from '../../data/oneliners';
import { blockFor, emojiFor } from './shared';

type Props = {
  opp: Opportunity;
  onPick: () => void;
  disabled: boolean;
};

/** One of the two big tap targets. Emoji, name, one line. Nothing else. */
export default function Choice({ opp, onPick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      className={`${blockFor[opp.category]} flex min-h-[9.5rem] w-full flex-col justify-center gap-2 border-4 border-ink px-5 py-7 text-left shadow-lg transition-transform duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60 sm:min-h-[14rem] sm:gap-3 sm:px-7 sm:py-9 md:hover:-translate-y-1`}
    >
      <span aria-hidden="true" className="text-4xl leading-none sm:text-5xl">
        {emojiFor[opp.category]}
      </span>
      <span className="font-heading text-2xl leading-[1.05] font-black sm:text-3xl">
        {opp.title}
      </span>
      <span className="text-[0.95rem] leading-snug opacity-90 sm:text-base">
        {oneFor(opp.id, opp.cadence)}
      </span>
    </button>
  );
}

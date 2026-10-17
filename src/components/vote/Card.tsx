import type { Option } from '../../data/options';
import { tint } from './shared';

type Props = {
  opt: Option;
  disabled: boolean;
  onPick: () => void;
};

/** One of the two tap targets: emoji, four words, a whisper of detail. */
export default function Card({ opt, disabled, onPick }: Props) {
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      className={`${tint[opt.vibe]} group relative flex min-h-[8.5rem] w-full flex-col items-start justify-end gap-1.5 overflow-hidden rounded-[1.75rem] px-6 py-6 text-left shadow-soft transition duration-200 ease-out active:scale-[0.985] disabled:opacity-70 sm:min-h-[15rem] sm:px-7 sm:py-7 md:hover:-translate-y-1 md:hover:shadow-lift`}
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 right-4 text-[5.5rem] leading-none opacity-20 transition-transform duration-300 group-hover:scale-110 sm:text-[7rem]"
      >
        {opt.emoji}
      </span>
      <span aria-hidden="true" className="text-3xl leading-none sm:text-4xl">
        {opt.emoji}
      </span>
      <span className="font-heading relative text-[1.6rem] leading-[1.02] font-black sm:text-[2.1rem]">
        {opt.label}
      </span>
      <span className="relative text-[0.8rem] leading-snug opacity-80 sm:text-sm">{opt.tag}</span>
    </button>
  );
}

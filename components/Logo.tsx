/** Five-petal mark with a gold center. */
export function PetalMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--color-gold)" strokeWidth="0.8" />
      <g transform="translate(20 20.5)" fill="var(--color-rose)" fillOpacity="0.85">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} rx="3.8" ry="7.4" transform={`rotate(${r}) translate(0 -5.2)`} />
        ))}
      </g>
      <circle cx="20" cy="20.5" r="2.6" fill="var(--color-gold)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <PetalMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-semibold tracking-[0.01em] text-ink">
          Petal <span className="italic font-medium text-rose-deep">&amp;</span> Polish
        </span>{" "}
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.34em] text-gold-deep">Nail Studio</span>
      </span>
    </span>
  );
}

import Image from "next/image";
import { artists, booking, hours } from "@/content";
import { PetalMark } from "@/components/Logo";
import { Check } from "./Check";

const dayName = (d: number) => hours.find((h) => h.day === d)?.label ?? "";

export default function StepArtist({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const options = [
    {
      id: booking.anyArtist.id,
      name: booking.anyArtist.name,
      line: booking.anyArtist.note,
      meta: "Whoever is free at your time",
      photo: null as string | null,
    },
    ...artists.map((a) => ({
      id: a.id,
      name: a.name,
      line: a.specialty,
      meta: `Off ${a.daysOff.map((d) => `${dayName(d)}s`).join(", ")}`,
      photo: a.photo,
    })),
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const on = o.id === selected;
        return (
          <li key={o.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(o.id)}
              className={`relative flex w-full items-center gap-4 rounded-2xl border p-3 pr-4 text-left transition-all duration-300 ${
                on
                  ? "border-rose-deep bg-blush/60 shadow-[0_0_0_1px_var(--color-rose-deep)]"
                  : "border-line bg-milk hover:border-rose/80 hover:bg-blush/30"
              }`}
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-blush">
                {o.photo ? (
                  <Image src={o.photo} alt="" fill sizes="64px" className="object-cover object-top" />
                ) : (
                  <span className="grid h-full w-full place-items-center">
                    <PetalMark className="h-10 w-10" />
                  </span>
                )}
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-xl font-semibold leading-tight text-ink">{o.name}</span>
                <span className="mt-0.5 block text-sm text-rose-deep">{o.line}</span>
                <span className="mt-1 block text-xs text-muted">{o.meta}</span>
              </span>
              {on && <Check className="absolute -right-2 -top-2" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

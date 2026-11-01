"use client";

import { useState } from "react";
import { categories } from "@/content";
import { formatDuration } from "@/lib/slots";
import { Clock } from "@/components/ui/Icons";
import { Check } from "./Check";

export default function StepService({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const initial = Math.max(
    0,
    categories.findIndex((c) => c.items.some((s) => s.id === selected)),
  );
  const [cat, setCat] = useState(initial);

  return (
    <div>
      <div className="-mx-1 flex flex-wrap gap-2 px-1" role="group" aria-label="Service category">
        {categories.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === cat}
            onClick={() => setCat(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              i === cat ? "bg-ink text-white" : "border border-line bg-milk text-ink/75 hover:border-rose-deep hover:text-rose-deep"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {categories[cat].items.map((s) => {
          const on = s.id === selected;
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(s.id)}
                className={`relative flex h-full w-full flex-col rounded-2xl border p-4 text-left transition-all duration-300 ${
                  on
                    ? "border-rose-deep bg-blush/60 shadow-[0_0_0_1px_var(--color-rose-deep)]"
                    : "border-line bg-milk hover:border-rose/80 hover:bg-blush/30"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-xl font-semibold leading-tight text-ink">{s.name}</span>
                  <span className="font-serif text-xl font-semibold text-rose-deep">${s.price}</span>
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</span>
                <span className="mt-3 flex items-center gap-3 text-xs text-ink/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock /> {formatDuration(s.duration)}
                  </span>
                  {s.badge && (
                    <span className="rounded-full bg-sage-light px-2 py-0.5 font-semibold text-sage-deep">{s.badge}</span>
                  )}
                </span>
                {on && <Check className="absolute -right-2 -top-2" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

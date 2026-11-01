"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { addons, addonsCategory, categories, servicesSection, type Service } from "@/content";
import { formatDuration } from "@/lib/slots";
import BookButton from "@/components/ui/BookButton";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { Clock } from "@/components/ui/Icons";

const tabs = [...categories, { ...addonsCategory, items: addons }];

export default function Services() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];
  const isAddons = tab.id === addonsCategory.id;

  // Roving tabindex: arrows move between tabs, Home/End jump to the ends.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    let next = active;
    if (e.key in map) next = (active + map[e.key] + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
    refs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section id="services" aria-labelledby="services-title" className="relative px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="services-title" {...servicesSection} align="center" />

        <Reveal className="mt-10 md:mt-12">
          <div
            role="tablist"
            aria-label="Service categories"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-auto sm:w-fit sm:flex-wrap sm:justify-center sm:rounded-full sm:border sm:border-line sm:bg-milk sm:p-1.5 [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    on
                      ? "bg-rose-deep text-white shadow-[0_10px_24px_-12px_rgb(162_84_95/0.8)]"
                      : "border border-line bg-milk text-ink/75 hover:text-rose-deep sm:border-transparent sm:bg-transparent"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-8 md:mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mx-auto max-w-xl text-center font-serif text-xl italic text-ink/75">{tab.blurb}</p>
              <ul className={`mt-8 grid gap-4 md:grid-cols-2 ${isAddons ? "lg:grid-cols-4 lg:gap-4" : "lg:gap-5"}`}>
                {tab.items.map((s) =>
                  isAddons ? <AddonCard key={s.id} s={s} /> : <ServiceCard key={s.id} s={s} />,
                )}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <li className="card group flex flex-col rounded-[26px] p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
      <div className="flex items-baseline gap-3">
        <h3 className="font-serif text-[1.65rem] font-semibold leading-tight text-ink">{s.name}</h3>
        <span className="mb-1.5 flex-1 border-b border-dotted border-gold/60" aria-hidden="true" />
        <p className="font-serif text-[1.75rem] font-semibold text-rose-deep">
          <span className="sr-only">Price: </span>${s.price}
        </p>
      </div>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{s.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex flex-wrap items-center gap-2 text-sm text-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock /> {formatDuration(s.duration)}
          </span>
          {s.badge && (
            <span className="rounded-full bg-sage-light px-2.5 py-0.5 text-xs font-semibold text-sage-deep">{s.badge}</span>
          )}
        </span>
        <BookButton
          preset={{ serviceId: s.id }}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full border border-powder px-4 text-sm font-semibold text-rose-deep transition-colors hover:border-rose-deep hover:bg-rose-deep hover:text-white"
          aria-label={`Book ${s.name}`}
        >
          Book <Arrow dir="right" />
        </BookButton>
      </div>
    </li>
  );
}

function AddonCard({ s }: { s: Service }) {
  return (
    <li className="card flex flex-col rounded-[22px] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-xl font-semibold leading-tight text-ink">{s.name}</h3>
        <p className="font-serif text-xl font-semibold text-rose-deep">
          <span className="sr-only">Price: </span>+${s.price}
        </p>
      </div>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink/65">
          <Clock /> +{s.duration} min
        </span>
        <BookButton
          preset={{ addonId: s.id }}
          className="inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold text-rose-deep transition-colors hover:text-rose-dark"
          aria-label={`Add ${s.name} to a booking`}
        >
          + Add
        </BookButton>
      </div>
    </li>
  );
}

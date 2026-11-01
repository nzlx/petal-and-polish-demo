"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { booking, site } from "@/content";
import { downloadIcs } from "@/lib/ics";
import { formatDate, formatDuration, formatTime, shopTimeToUtc } from "@/lib/slots";
import { Petal } from "@/components/ui/Icons";
import { getArtist, getService, pickedAddons, totals, type BookingState } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Success({ state, onReset }: { state: BookingState; onReset: () => void }) {
  const service = getService(state.serviceId)!;
  const extras = pickedAddons(state);
  const total = totals(state);
  const artist = getArtist(state.assignedArtistId)!;
  const first = state.details.name.split(/\s+/)[0];
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    title.current?.focus({ preventScroll: true });
  }, []);

  const what = [service.name, ...extras.map((a) => a.name)].join(" + ");

  const addToCalendar = () =>
    downloadIcs({
      start: shopTimeToUtc(state.date!, state.time!),
      minutes: total.duration,
      title: `${service.name} with ${artist.firstName} at ${site.shortName}`,
      description: `${what}. Confirmation ${state.confirmation}. ${booking.policy}`,
    });

  return (
    <div className="py-4 text-center sm:py-8">
      <div className="relative mx-auto h-24 w-24">
        {/* Petals bloom outward around the check */}
        {[0, 72, 144, 216, 288].map((r, i) => (
          <span key={r} className="absolute inset-0" style={{ transform: `rotate(${r}deg)` }} aria-hidden="true">
            <m.span
              className="absolute left-1/2 top-1/2 -ml-2.5 -mt-4 block text-rose"
              initial={{ y: 0, opacity: 0, scale: 0.4 }}
              animate={{ y: -66, opacity: [0, 1, 0], scale: 1 }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.05, ease: "easeOut" }}
            >
              <Petal className="h-8 w-5" />
            </m.span>
          </span>
        ))}
        <m.div
          className="relative grid h-24 w-24 place-items-center rounded-full bg-rose-deep text-white shadow-[0_20px_50px_-12px_rgb(162_84_95/0.7)]"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
            <m.path
              d="M12 25l8 8 16-17"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            />
          </svg>
        </m.div>
      </div>

      <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease }}>
        <h3 ref={title} tabIndex={-1} className="mt-8 font-serif text-4xl font-semibold text-ink outline-none sm:text-5xl">
          {booking.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink/80">
          See you {formatDate(state.date!, { weekday: "long", month: "long", day: "numeric" })} at {formatTime(state.time!)},{" "}
          {first}.
        </p>

        <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-line bg-cream/70 p-5 text-left">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
            <span>Confirmation</span>
            <span className="font-mono text-sm tracking-wider text-rose-deep">{state.confirmation}</span>
          </div>
          <div className="rule-gold my-4" />
          <p className="font-serif text-xl font-semibold text-ink">{service.name}</p>
          {extras.length > 0 && <p className="mt-0.5 text-sm text-ink/75">+ {extras.map((a) => a.name).join(", ")}</p>}
          <p className="mt-1 text-sm text-muted">
            with {artist.name} · {formatDuration(total.duration)} · ${total.price}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" className="btn btn-rose w-full sm:w-auto" onClick={addToCalendar}>
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <rect x="3" y="4.5" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 8.5h14M7 2.8v3.4M13 2.8v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Add to calendar
          </button>
          <button type="button" className="btn btn-outline w-full sm:w-auto" onClick={onReset}>
            Book another appointment
          </button>
        </div>
        <p className="mx-auto mt-6 max-w-sm text-sm text-muted">{booking.success.text}</p>
      </m.div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { booking } from "@/content";
import { BOOKING_EVENT, type BookingPreset } from "@/lib/booking-bus";
import { scrollToTarget } from "@/lib/scroll";
import { dayStatus, formatDate, formatDuration, formatTime, slotsFor } from "@/lib/slots";
import {
  DONE,
  REVIEW,
  S,
  artistLabel,
  getService,
  initialState,
  pickedAddons,
  totals,
  validate,
  type BookingState,
  type Details,
} from "./types";
import StepService from "./StepService";
import StepAddons from "./StepAddons";
import StepArtist from "./StepArtist";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import DetailsForm from "./DetailsForm";
import Review from "./Review";
import Success from "./Success";
import { Arrow } from "@/components/ui/Arrow";

type Action =
  | { type: "preset"; preset: BookingPreset }
  | { type: "service"; id: string }
  | { type: "toggleAddon"; id: string }
  | { type: "addonsDone" }
  | { type: "artist"; id: string }
  | { type: "date"; key: string }
  | { type: "time"; time: string; assignedArtistId: string }
  | { type: "details"; details: Details }
  | { type: "goto"; step: number }
  | { type: "confirm"; code: string }
  | { type: "reset" };

/** First step that still needs an answer. */
function missingStep(s: BookingState) {
  if (!s.serviceId) return S.service;
  if (!s.addonsDone) return S.addons;
  if (!s.artistId) return S.artist;
  if (!s.date) return S.date;
  if (!s.time) return S.time;
  return Object.keys(validate(s.details)).length ? S.details : REVIEW;
}

/** After the service, add-ons or artist change, keep the date/time only if they still fit. */
function revalidate(s: BookingState): BookingState {
  const { duration } = totals(s);
  if (!s.serviceId || !s.artistId || !s.date) return s;
  const st = dayStatus(s.date, s.artistId, duration);
  if (st !== "open" && st !== "few") return { ...s, date: null, time: null, assignedArtistId: null };
  if (!s.time) return s;
  const slot = slotsFor(s.date, s.artistId, duration).find((x) => x.time === s.time);
  return slot?.available ? { ...s, assignedArtistId: slot.artistId ?? null } : { ...s, time: null, assignedArtistId: null };
}

function advance(prev: BookingState, next: BookingState): BookingState {
  const missing = Math.min(missingStep(next), S.details);
  const step = missing > prev.step ? missing : prev.step + 1;
  return { ...next, step, dir: 1 };
}

function reducer(s: BookingState, a: Action): BookingState {
  switch (a.type) {
    case "preset": {
      const base = s.step === DONE ? initialState : s;
      const { serviceId, artistId, addonId } = a.preset;
      const next = revalidate({
        ...base,
        serviceId: serviceId ?? base.serviceId,
        artistId: artistId ?? base.artistId,
        addonIds: addonId && !base.addonIds.includes(addonId) ? [...base.addonIds, addonId] : base.addonIds,
      });
      // An add-on from the menu lands on the add-ons step (or the service step if none is picked yet).
      const step = addonId ? (next.serviceId ? S.addons : S.service) : Math.min(missingStep(next), S.details);
      return { ...next, step, dir: 1 };
    }
    case "service":
      return advance(s, revalidate({ ...s, serviceId: a.id }));
    case "toggleAddon": {
      const addonIds = s.addonIds.includes(a.id) ? s.addonIds.filter((x) => x !== a.id) : [...s.addonIds, a.id];
      return revalidate({ ...s, addonIds });
    }
    case "addonsDone":
      return advance(s, { ...s, addonsDone: true });
    case "artist":
      return advance(s, revalidate({ ...s, artistId: a.id }));
    case "date":
      return advance(s, { ...s, date: a.key, time: s.date === a.key ? s.time : null });
    case "time":
      return advance(s, { ...s, time: a.time, assignedArtistId: a.assignedArtistId });
    case "details":
      return { ...s, details: a.details, step: REVIEW, dir: 1 };
    case "goto":
      return { ...s, step: a.step, dir: a.step < s.step ? -1 : 1 };
    case "confirm":
      return { ...s, confirmation: a.code, step: DONE, dir: 1 };
    case "reset":
      return { ...initialState, dir: -1 };
  }
}

const headings = [
  "Choose a service",
  "Add a little extra",
  "Choose your artist",
  "Pick a date",
  "Pick a time",
  "Your details",
  "Review & confirm",
];

function confirmationCode() {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 6; i++) c += abc[Math.floor(Math.random() * abc.length)];
  return `PP-${c}`;
}

export default function BookingWizard() {
  const [s, dispatch] = useReducer(reducer, initialState);
  const cardRef = useRef<HTMLDivElement>(null);
  const userNav = useRef(false);
  const service = getService(s.serviceId);
  const extras = pickedAddons(s);
  const total = totals(s);
  const reachable = missingStep(s);

  const act = useCallback((a: Action) => {
    userNav.current = true;
    dispatch(a);
  }, []);

  // Preset from "Book with Mia", service cards and add-on buttons elsewhere on the page.
  useEffect(() => {
    const onPreset = (e: Event) => act({ type: "preset", preset: (e as CustomEvent<BookingPreset>).detail ?? {} });
    window.addEventListener(BOOKING_EVENT, onPreset);
    return () => window.removeEventListener(BOOKING_EVENT, onPreset);
  }, [act]);

  // Keep the card in view when a step changes while scrolled down a long list.
  useEffect(() => {
    if (!userNav.current || !cardRef.current) return;
    if (cardRef.current.getBoundingClientRect().top < 76) scrollToTarget(cardRef.current, { offset: -88 });
  }, [s.step]);

  const focusHeading = () => {
    if (!userNav.current) return;
    cardRef.current?.querySelector<HTMLElement>("[data-step-heading]")?.focus({ preventScroll: true });
  };

  const goto = (step: number) => act({ type: "goto", step });

  const renderStep = () => {
    switch (s.step) {
      case S.service:
        return <StepService selected={s.serviceId} onSelect={(id) => act({ type: "service", id })} />;
      case S.addons:
        return <StepAddons selected={s.addonIds} onToggle={(id) => act({ type: "toggleAddon", id })} />;
      case S.artist:
        return <StepArtist selected={s.artistId} onSelect={(id) => act({ type: "artist", id })} />;
      case S.date:
        return (
          <Calendar
            selected={s.date}
            artistId={s.artistId!}
            duration={total.duration}
            onSelect={(key) => act({ type: "date", key })}
          />
        );
      case S.time:
        return (
          <TimeSlots
            date={s.date!}
            artistId={s.artistId!}
            duration={total.duration}
            selected={s.time}
            onSelect={(time, assignedArtistId) => act({ type: "time", time, assignedArtistId })}
            onChangeDate={() => goto(S.date)}
          />
        );
      case S.details:
        return <DetailsForm initial={s.details} onSubmit={(details) => act({ type: "details", details })} />;
      case REVIEW:
        return <Review state={s} onEdit={goto} onConfirm={() => act({ type: "confirm", code: confirmationCode() })} />;
      default:
        return <Success state={s} onReset={() => act({ type: "reset" })} />;
    }
  };

  const chips = [
    service && { step: S.service, label: service.name },
    ...extras.map((x) => ({ step: S.addons, label: `+ ${x.name}` })),
    s.artistId && { step: S.artist, label: artistLabel(s.artistId) },
    s.date && { step: S.date, label: formatDate(s.date, { weekday: "short", month: "short", day: "numeric" }) },
    s.time && { step: S.time, label: formatTime(s.time) },
  ].filter(Boolean) as { step: number; label: string }[];

  const inWizard = s.step < DONE;
  const showFooter = inWizard && s.step !== REVIEW && (s.step > 0 || !!service);
  const canContinue = s.step !== S.addons && s.step < S.details && reachable > s.step;

  return (
    <div ref={cardRef} className="card mx-auto max-w-3xl rounded-[32px] p-4 pb-6 sm:p-8">
      {inWizard && (
        <>
          <Progress step={s.step} reachable={reachable} onGo={goto} />
          {chips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your selections">
              {chips.map((c) => (
                <li key={`${c.step}-${c.label}`}>
                  <button
                    type="button"
                    onClick={() => goto(c.step)}
                    className="rounded-full border border-line bg-cream px-3 py-1.5 text-xs text-ink/85 transition-colors hover:border-rose-deep hover:text-rose-deep"
                    aria-label={`${c.label}. Change ${booking.steps[c.step].toLowerCase()}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {!inWizard
          ? "Appointment confirmed"
          : s.step === REVIEW
            ? headings[REVIEW]
            : `Step ${s.step + 1} of ${booking.steps.length}: ${headings[s.step]}`}
      </p>

      <div className={inWizard ? "relative mt-6 min-h-[320px]" : "relative"}>
        <AnimatePresence mode="wait" custom={s.dir} initial={false}>
          <m.div
            key={s.step}
            custom={s.dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 24 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -24 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={(def) => def === "center" && focusHeading()}
          >
            {inWizard && (
              <h3 data-step-heading tabIndex={-1} className="mb-5 font-serif text-[1.75rem] font-semibold text-ink outline-none sm:text-3xl">
                {headings[s.step]}
              </h3>
            )}
            {renderStep()}
          </m.div>
        </AnimatePresence>
      </div>

      {showFooter && (
        <div className="mt-8 border-t border-line pt-5">
          {service && <Total price={total.price} duration={total.duration} count={extras.length} className="mb-4 sm:hidden" />}
          <div className="flex items-center justify-between gap-3">
            {s.step > 0 ? (
              <button type="button" className="btn btn-outline px-5" onClick={() => goto(s.step - 1)}>
                <Arrow dir="left" /> Back
              </button>
            ) : (
              <span />
            )}
            {service && <Total price={total.price} duration={total.duration} count={extras.length} className="hidden sm:flex" />}
            {s.step === S.addons ? (
              <button type="button" className="btn btn-rose" onClick={() => act({ type: "addonsDone" })}>
                {extras.length ? "Continue" : "Skip add-ons"} <Arrow dir="right" />
              </button>
            ) : s.step === S.details ? (
              <button type="submit" form="booking-details" className="btn btn-rose">
                Review<span className="hidden sm:inline">&nbsp;booking</span> <Arrow dir="right" />
              </button>
            ) : canContinue ? (
              <button type="button" className="btn btn-rose" onClick={() => goto(s.step + 1)}>
                Continue <Arrow dir="right" />
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** Live total: re-keys on change so the number gently pops when add-ons are toggled. */
function Total({ price, duration, count, className = "" }: { price: number; duration: number; count: number; className?: string }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 sm:flex-col sm:items-center sm:gap-0 ${className}`} aria-live="polite">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        Total{count > 0 && ` · ${count} add-on${count > 1 ? "s" : ""}`}
      </span>
      <span className="flex items-baseline gap-2">
        <m.span
          key={price}
          initial={{ opacity: 0.4, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-2xl font-semibold text-rose-deep"
        >
          ${price}
        </m.span>
        <span className="text-sm text-muted">· {formatDuration(duration)}</span>
      </span>
    </div>
  );
}

function Progress({ step, reachable, onGo }: { step: number; reachable: number; onGo: (n: number) => void }) {
  const last = booking.steps.length - 1;
  const current = Math.min(step, last);
  const pct = step >= REVIEW ? 100 : (step / booking.steps.length) * 100;
  return (
    <nav aria-label="Booking progress">
      {/* Phone and small tablet: compact counter + bar */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-muted">{step >= REVIEW ? "Almost done" : `Step ${current + 1} of ${booking.steps.length}`}</span>
          <span className="font-semibold text-rose-deep">{step >= REVIEW ? "Review" : booking.steps[current]}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blush">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose to-rose-deep transition-[width] duration-700 ease-out"
            style={{ width: `${Math.max(pct, 6)}%` }}
          />
        </div>
      </div>

      {/* Desktop: labeled steps */}
      <ol className="hidden items-center gap-1.5 md:flex">
        {booking.steps.map((label, i) => {
          const done = i < step;
          const active = i === step;
          const can = i <= reachable && !active;
          return (
            <li key={label} className="flex flex-1 items-center gap-1.5 last:flex-none">
              <button
                type="button"
                disabled={!can}
                onClick={() => onGo(i)}
                aria-current={active ? "step" : undefined}
                className={`group flex items-center gap-2 rounded-full py-1 pr-1.5 text-sm transition-colors ${
                  active ? "font-semibold text-ink" : done ? "text-rose-deep hover:text-ink" : "text-muted"
                } disabled:cursor-default`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                    active
                      ? "border-rose-deep bg-rose-deep text-white"
                      : done
                        ? "border-rose bg-blush text-rose-deep"
                        : "border-line bg-milk text-muted"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {label}
              </button>
              {i < last && <span className={`h-px flex-1 ${i < step ? "bg-rose" : "bg-line"}`} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { contacts, giftCards } from "@/content";
import { getLenis } from "@/lib/scroll";
import { PetalMark } from "@/components/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { PhoneIcon } from "@/components/ui/Icons";

const finishes = [
  "bg-[linear-gradient(135deg,#f6e7e3_0%,#edd3cf_55%,#e4c2bd_100%)]",
  "bg-[linear-gradient(135deg,#f3dcd6_0%,#d9a3a3_60%,#c28588_100%)]",
  "bg-[linear-gradient(135deg,#eef2ea_0%,#d3dccb_55%,#b9c6b1_100%)]",
];

export default function GiftCards() {
  const featured = giftCards.amounts.findIndex((a) => a.featured);
  const [picked, setPicked] = useState(featured < 0 ? 0 : featured);
  const [open, setOpen] = useState(false);
  const amount = giftCards.amounts[picked].value;
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="gift-cards" aria-labelledby="gift-title" className="relative px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="gift-title" eyebrow={giftCards.eyebrow} title={giftCards.title} subtitle={giftCards.subtitle} align="center" />

        <Reveal className="mt-12">
          <div
            role="radiogroup"
            aria-label="Gift card amount"
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 pt-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {giftCards.amounts.map((a, i) => {
              const on = i === picked;
              return (
                <button
                  key={a.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setPicked(i)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const n = (i + d + giftCards.amounts.length) % giftCards.amounts.length;
                    setPicked(n);
                    (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                  }}
                  tabIndex={on ? 0 : -1}
                  className={`group relative w-[80%] shrink-0 snap-center text-left transition-transform duration-500 sm:w-auto ${on ? "-translate-y-1.5" : "hover:-translate-y-1"}`}
                >
                  <GiftCardArt value={a.value} finish={finishes[i % finishes.length]} active={on} />
                  <span className="mt-3 flex items-center justify-between px-1">
                    <span className="text-sm text-muted">{a.note}</span>
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                        on ? "border-rose-deep bg-rose-deep" : "border-powder bg-milk"
                      }`}
                      aria-hidden="true"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
                    </span>
                  </span>
                  {a.featured && (
                    <span className="absolute -top-3 left-5 rounded-full bg-sage-deep px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white">
                      Most gifted
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <button type="button" className="btn btn-rose h-14 px-8 text-base" onClick={() => setOpen(true)}>
            {giftCards.cta} · ${amount}
          </button>
          <p className="text-sm text-muted">{giftCards.fineprint}</p>
        </Reveal>
      </div>

      <ComingSoon open={open} amount={amount} finish={finishes[picked % finishes.length]} onClose={close} />
    </section>
  );
}

function GiftCardArt({ value, finish, active }: { value: number; finish: string; active?: boolean }) {
  return (
    <span
      className={`relative block aspect-[1.6] overflow-hidden rounded-[22px] p-5 shadow-[0_24px_50px_-28px_rgb(122_74_70/0.6)] ring-1 ring-inset ring-white/60 transition-shadow duration-500 ${finish} ${
        active ? "shadow-[0_30px_60px_-26px_rgb(162_84_95/0.7)] outline outline-2 outline-offset-4 outline-rose-deep/60" : ""
      }`}
    >
      {/* Satin sheen that sweeps across on hover */}
      <span
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.55)_50%,transparent_65%)] transition-transform duration-[1.2s] ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="absolute -bottom-10 -right-8 h-40 w-40 rounded-full border border-white/50" aria-hidden="true" />
      <span className="absolute -bottom-4 -right-2 h-28 w-28 rounded-full border border-white/40" aria-hidden="true" />
      <span className="relative flex h-full flex-col justify-between">
        <span className="flex items-center gap-2">
          <PetalMark className="h-7 w-7" />
          <span className="font-serif text-lg font-semibold text-ink">Petal &amp; Polish</span>
        </span>
        <span className="flex items-end justify-between">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-ink/70">Gift card</span>
          <span className="font-serif text-5xl font-semibold leading-none text-ink">${value}</span>
        </span>
      </span>
    </span>
  );
}

function ComingSoon({ open, amount, finish, onClose }: { open: boolean; amount: number; finish: string; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);

  // Lock the page, trap focus and hand it back to the CTA on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialog.current) return;
      const f = [...dialog.current.querySelectorAll<HTMLElement>("a,button")];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f.at(-1)?.focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      opener?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/25 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-soon-title"
            aria-describedby="gift-soon-text"
            className="wash relative w-full max-w-md overflow-hidden rounded-[32px] border border-line p-6 text-center shadow-[0_40px_80px_-30px_rgb(61_44_46/0.45)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-line bg-milk text-ink transition-colors hover:border-rose-deep hover:text-rose-deep"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <m.div
              className="mx-auto mt-4 w-56 rotate-[-4deg]"
              initial={{ rotate: -12, y: 10, opacity: 0 }}
              animate={{ rotate: -4, y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GiftCardArt value={amount} finish={finish} />
            </m.div>

            <p className="eyebrow eyebrow-center mt-8">Gift Cards</p>
            <h3 id="gift-soon-title" className="mt-2 font-serif text-4xl font-semibold text-ink">
              {giftCards.comingSoon.title}
            </h3>
            <p id="gift-soon-text" className="mt-3 text-muted">
              {giftCards.comingSoon.text}
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a href={contacts.phoneHref} className="btn btn-rose h-12">
                <PhoneIcon /> Call {contacts.phoneDisplay}
              </a>
              <button type="button" data-autofocus className="btn btn-outline h-12" onClick={onClose}>
                Back to the site
              </button>
            </div>
            <p className="mt-5 text-xs text-muted">{giftCards.comingSoon.note}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

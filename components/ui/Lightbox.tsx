"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { getLenis } from "@/lib/scroll";
import { Arrow } from "./Arrow";

type Item = { src: string; w: number; h: number; title: string; alt: string };

export default function Lightbox({
  items,
  index,
  onChange,
}: {
  items: Item[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;

  const go = (d: number) => index !== null && onChange((index + d + items.length) % items.length);

  // Lock the page while open and hand focus back to the thumbnail on close.
  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement as HTMLElement;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = [...dialog.current.querySelectorAll<HTMLElement>("button")];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f.at(-1)?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <m.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, photo ${index + 1} of ${items.length}`}
          className="fixed inset-0 z-[80] flex flex-col bg-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            else if (dy > 90) onChange(null);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm text-muted">
              <span className="tabular-nums text-ink">{index + 1}</span> / {items.length}
            </p>
            <button
              data-close
              type="button"
              onClick={() => onChange(null)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-milk text-ink transition-colors hover:border-rose-deep hover:text-rose-deep"
              aria-label="Close"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && onChange(null)}>
            <AnimatePresence initial={false}>
              <m.div
                key={item.src}
                className="pointer-events-none absolute inset-2 sm:inset-x-20 sm:inset-y-0"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" quality={75} className="object-contain" />
              </m.div>
            </AnimatePresence>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </div>

          <div className="flex items-center justify-between gap-3 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:justify-center">
            <MobileNav label="Previous photo" dir="left" onClick={() => go(-1)} />
            <p className="text-center font-serif text-2xl font-medium italic text-ink">{item.title}</p>
            <MobileNav label="Next photo" dir="right" onClick={() => go(1)} />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-milk bg-milk/85 text-ink transition-colors hover:border-rose-deep hover:text-rose-deep sm:grid ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Arrow dir={side} className="h-5 w-5" />
    </button>
  );
}

/** Phones get prev/next under the photo, within thumb reach. */
function MobileNav({ label, dir, onClick }: { label: string; dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-milk text-ink sm:hidden"
    >
      <Arrow dir={dir} className="h-5 w-5" />
    </button>
  );
}

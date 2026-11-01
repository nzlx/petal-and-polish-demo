"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { contacts, nav } from "@/content";
import { groupedHours } from "@/lib/hours";
import { getLenis } from "@/lib/scroll";
import Logo from "./Logo";
import BookButton from "./ui/BookButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Esc, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel.current) return;
      const items = [menuBtn.current!, ...panel.current.querySelectorAll<HTMLElement>("a,button")];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        items.at(-1)?.focus();
      } else if (!e.shiftKey && i === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-line bg-cream/95 shadow-[0_12px_30px_-24px_rgb(122_74_70/0.35)] md:bg-cream/80 md:backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="Petal & Polish Nail Studio, back to top" className="rounded-md" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.92rem]">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="relative text-ink/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-rose-deep after:transition-transform after:duration-300 hover:text-rose-deep hover:after:scale-x-100"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={contacts.phoneHref}
            className="hidden text-sm font-medium text-ink/85 transition-colors hover:text-rose-deep md:inline"
          >
            {contacts.phoneDisplay}
          </a>
          <BookButton className="btn btn-rose hidden h-10 min-h-0 px-5 text-sm sm:inline-flex">Book Appointment</BookButton>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-milk/70 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="mobile-menu"
            className="wash fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto border-t border-line lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile" className="px-6 pb-10 pt-6">
              <ul>
                {nav.map((n, i) => (
                  <m.li
                    key={n.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05 }}
                  >
                    <a
                      href={n.href}
                      onClick={close}
                      className="flex items-center justify-between border-b border-powder/70 py-4 font-serif text-3xl font-medium text-ink"
                    >
                      {n.label}
                      <span className="text-base text-rose-deep" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>
              <BookButton className="btn btn-rose mt-8 h-14 w-full text-base" onClickCapture={close}>
                Book Appointment
              </BookButton>
              <a href={contacts.phoneHref} className="btn btn-outline mt-3 h-14 w-full text-base">
                Call {contacts.phoneDisplay}
              </a>
              <div className="mt-8 text-sm text-muted">
                <p className="eyebrow mb-2">Hours</p>
                {groupedHours().map((g) => (
                  <p key={g.days}>
                    {g.days} · {g.time}
                  </p>
                ))}
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

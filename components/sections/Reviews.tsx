"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviews, reviewsSection } from "@/content";
import { Arrow } from "@/components/ui/Arrow";
import SectionHeader from "@/components/ui/SectionHeader";

// DEMO CONTENT: reviews and the rating summary come from content.ts and are fictional.
const AUTOPLAY_MS = 6000;

export default function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(1);
  const paused = useRef(false);
  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  const pages = Math.max(reviews.length - perView + 1, 1);

  const step = () => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return 0;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || "0");
  };

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const s = step();
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(i * s, max), behavior: "smooth" });
  }, []);

  // Keep the active index and cards-per-view in sync with the scroll position and width.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const s = step();
      if (s) setActive(Math.round(el.scrollLeft / s));
    };
    const onResize = () => {
      const s = step();
      if (s) setPerView(Math.max(1, Math.round(el.clientWidth / s)));
      onScroll();
    };
    onResize();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Autoplay: only while on screen, and never with reduced motion.
  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || paused.current || document.hidden) return;
      const a = activeRef.current;
      goTo(a + 1 >= pages ? 0 : a + 1);
    }, AUTOPLAY_MS);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [pages, goTo]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="wash relative py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader id="reviews-title" eyebrow={reviewsSection.eyebrow} title={reviewsSection.title}>
          <p className="mt-4 flex items-center gap-3 text-ink/80">
            <Stars />
            <span>
              <strong className="font-semibold text-ink">{reviewsSection.rating}</strong> average from {reviewsSection.count}{" "}
              reviews
            </span>
          </p>
        </SectionHeader>
        <div className="flex gap-2">
          <CtrlButton label="Previous review" dir="left" disabled={active <= 0} onClick={() => goTo(active - 1)} />
          <CtrlButton label="Next review" dir="right" disabled={active >= pages - 1} onClick={() => goTo(active + 1)} />
        </div>
      </div>

      <div
        className="mx-auto mt-10 max-w-6xl"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onPointerDown={pause}
      >
        <ul
          ref={track}
          aria-label="Customer reviews"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r, i) => (
            <li
              key={r.name}
              aria-roledescription="slide"
              aria-label={`Review ${i + 1} of ${reviews.length}`}
              className="card flex w-[86%] shrink-0 snap-start flex-col rounded-[28px] p-6 sm:w-[calc(50%-0.5rem)] sm:p-8 lg:w-[calc(33.333%-0.667rem)]"
            >
              <svg viewBox="0 0 32 24" className="h-6 w-8 text-rose" aria-hidden="true">
                <path
                  d="M0 24V14C0 6.3 4.2 1.6 12.2 0l1.4 3C9.2 4.4 7 7 6.7 10.5H12V24H0zm18 0V14c0-7.7 4.2-12.4 12.2-14l1.4 3c-4.4 1.4-6.6 4-6.9 7.5H30V24H18z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="mt-5 flex-1 font-serif text-[1.35rem] font-medium italic leading-snug text-ink/85">{r.text}</blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="font-semibold text-ink">{r.name}</p>
                  <p className="text-sm text-muted">via {r.source}</p>
                </div>
                <Stars count={r.rating} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-1" role="group" aria-label="Choose review">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-8 w-8 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-rose-deep" : "w-1.5 bg-powder"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5 text-gold" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < count ? "" : "opacity-25"}`} aria-hidden="true">
          <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7L10 1.8z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

function CtrlButton({
  label,
  dir,
  disabled,
  onClick,
}: {
  label: string;
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-12 w-12 place-items-center rounded-full border border-line bg-milk text-ink transition-colors hover:border-rose-deep hover:text-rose-deep disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
    >
      <Arrow dir={dir} className="h-5 w-5" />
    </button>
  );
}

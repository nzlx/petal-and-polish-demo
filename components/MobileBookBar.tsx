"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { contacts } from "@/content";
import BookButton from "./ui/BookButton";
import { PhoneIcon } from "./ui/Icons";

/** Phone-only floating "Book" pill: shows after the hero, hides while the booking form is on screen. */
export default function MobileBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const book = document.getElementById("book");
    const io = new IntersectionObserver(([e]) => setBookingVisible(e.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    if (book) io.observe(book);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !bookingVisible;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="flex gap-2 rounded-full border border-line bg-milk/95 p-1.5 shadow-[0_20px_40px_-14px_rgb(122_74_70/0.45)] backdrop-blur">
            <BookButton className="btn btn-rose h-12 flex-1 text-base">Book</BookButton>
            <a
              href={contacts.phoneHref}
              aria-label={`Call ${contacts.phoneDisplay}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-blush text-rose-deep"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}


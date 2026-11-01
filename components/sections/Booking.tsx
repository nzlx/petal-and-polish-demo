import { booking } from "@/content";
import BookingWizard from "@/components/booking/BookingWizard";
import Reveal from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/SectionHeader";

export default function Booking() {
  return (
    <section id="book" aria-labelledby="book-title" className="wash relative px-4 py-20 sm:px-6 md:py-28">
      <div className="rule-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow eyebrow-center">{booking.eyebrow}</p>
        <h2 id="book-title" className="mt-3 font-serif text-[2.6rem] font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
          <Accent text={booking.title} />
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">{booking.subtitle}</p>
      </Reveal>
      <Reveal className="mt-10 md:mt-12" delay={0.1}>
        <BookingWizard />
      </Reveal>
      <p className="mx-auto mt-6 max-w-md text-center text-xs text-muted">{booking.demoNote}</p>
      <div className="rule-gold absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}

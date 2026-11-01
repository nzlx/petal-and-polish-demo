import { contacts, visit } from "@/content";
import Reveal from "@/components/ui/Reveal";
import Hours from "@/components/ui/Hours";
import MapPlaceholder from "@/components/ui/MapPlaceholder";
import { Accent } from "@/components/ui/SectionHeader";
import { PhoneIcon } from "@/components/ui/Icons";

export default function Visit() {
  const a = contacts.address;
  return (
    <section id="visit" aria-labelledby="visit-title" className="wash relative px-4 py-20 sm:px-6 md:py-28">
      <div className="rule-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal>
          <p className="eyebrow">{visit.eyebrow}</p>
          <h2 id="visit-title" className="mt-3 font-serif text-[2.6rem] font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
            <Accent text={visit.title} />
          </h2>

          <address className="mt-6 not-italic">
            <p className="text-xl text-ink">{a.street}</p>
            <p className="text-xl text-ink">
              {a.city}, {a.state} {a.zip}
            </p>
            <p className="mt-2 text-sm text-muted">{visit.parking}</p>
            <p className="mt-1 text-sm text-muted">{visit.walkIns}</p>
          </address>

          <div className="mt-8">
            <Hours />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={contacts.phoneHref} className="btn btn-rose h-14 px-7 text-base">
              <PhoneIcon />
              Call {contacts.phoneDisplay}
            </a>
            <a href={contacts.directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline h-14 px-7 text-base">
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M10 18s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="8" r="2.2" fill="currentColor" />
              </svg>
              Get Directions
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-6">
          <MapPlaceholder />
        </Reveal>
      </div>
    </section>
  );
}

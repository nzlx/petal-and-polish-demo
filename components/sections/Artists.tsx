import Image from "next/image";
import { artists, artistsSection } from "@/content";
import BookButton from "@/components/ui/BookButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Artists() {
  return (
    <section id="artists" aria-labelledby="artists-title" className="wash relative py-20 md:py-28">
      <div className="rule-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader id="artists-title" {...artistsSection} />
      </div>

      {/* Phones: swipeable row. Tablet and up: grid. */}
      <ul className="mx-auto mt-12 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-6 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {artists.map((a, i) => (
          <Reveal as="li" key={a.id} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <article className="card group flex h-full flex-col rounded-[32px] p-3 pb-5 transition-transform duration-500 hover:-translate-y-1.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[22px] bg-blush">
                <Image
                  src={a.photo}
                  alt={a.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 78vw"
                  quality={70}
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col px-2 pt-5 text-center">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">{a.role}</p>
                <h3 className="mt-1.5 font-serif text-[1.75rem] font-semibold leading-tight text-ink">{a.name}</h3>
                <p className="mt-1 text-sm font-medium text-rose-deep">{a.specialty}</p>
                <ul className="mt-3 flex flex-wrap justify-center gap-1.5" aria-label={`${a.firstName}'s specialties`}>
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-full bg-sage-light px-2.5 py-1 text-xs font-medium text-sage-deep">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.bio}</p>
                <BookButton preset={{ artistId: a.id }} className="btn btn-outline mt-5 h-11 min-h-0 w-full text-sm">
                  Book with {a.firstName}
                </BookButton>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
      <div className="rule-gold absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}

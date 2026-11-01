"use client";

import { useState } from "react";
import Image from "next/image";
import { gallery } from "@/content";
import Lightbox from "@/components/ui/Lightbox";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

const tileClass = {
  feature: "col-span-2 row-span-2",
  tall: "row-span-2",
  regular: "",
} as const;

const tileSizes = {
  feature: "(min-width: 1024px) 540px, (min-width: 640px) 66vw, 100vw",
  tall: "(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw",
  regular: "(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw",
} as const;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader id="gallery-title" eyebrow={gallery.eyebrow} title={gallery.title} subtitle={gallery.subtitle} />

        <div className="@container mt-12">
          <ul className="bento grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {gallery.items.map((g, i) => {
              const feature = g.tile === "feature";
              return (
                <Reveal as="li" key={g.src} delay={(i % 4) * 0.06} y={20} className={tileClass[g.tile]}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className={`group relative block h-full w-full overflow-hidden bg-blush text-left ${
                      feature ? "rounded-[32px] rounded-tl-[120px]" : "rounded-[24px]"
                    }`}
                    aria-label={`Open photo: ${g.title}`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes={tileSizes[g.tile]}
                      quality={60}
                      style={{ objectPosition: g.pos }}
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                    {/* Caption: always on touch screens, on hover/focus where a mouse is available. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 bottom-2 flex flex-col rounded-2xl bg-milk/90 px-3 py-2.5 backdrop-blur-sm transition-all duration-500 sm:inset-x-3 sm:bottom-3 sm:px-4 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
                    >
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-deep">{g.tag}</span>
                      <span
                        className={`mt-0.5 leading-snug text-ink ${feature ? "font-serif text-2xl font-semibold sm:text-3xl" : "text-[0.8rem] font-semibold sm:text-sm"}`}
                      >
                        {g.title}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>

      <Lightbox items={gallery.items} index={open} onChange={setOpen} />
    </section>
  );
}

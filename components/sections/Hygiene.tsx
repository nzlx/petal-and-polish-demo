import Image from "next/image";
import { hygiene } from "@/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { Shield } from "@/components/ui/Icons";

const icons: Record<string, React.ReactNode> = {
  autoclave: (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="12.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 10v5M7 3.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  single: (
    <>
      <rect x="9.5" y="2.5" width="5" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(35 12 12)" />
      <path d="M4 20l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  tub: (
    <>
      <path d="M3.5 10.5h17l-1.6 6.8a3 3 0 01-2.9 2.2H8a3 3 0 01-2.9-2.2l-1.6-6.8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 7c0-1 1-1.5 1-2.5M12 7c0-1 1-1.5 1-2.5M16 7c0-1 1-1.5 1-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  air: (
    <path
      d="M3 9h11a2.5 2.5 0 10-2.5-2.5M3 13h15a2.5 2.5 0 11-2.5 2.5M3 17h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
};

export default function Hygiene() {
  return (
    <section id="hygiene" aria-labelledby="hygiene-title" className="relative px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] rounded-tr-[140px] bg-blush sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={hygiene.image.src}
              alt={hygiene.image.alt}
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-milk px-4 py-3 shadow-[0_20px_40px_-24px_rgb(122_74_70/0.55)] sm:left-auto sm:right-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-light text-sage-deep">
              <Shield className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-ink">{hygiene.badge}</span>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeader id="hygiene-title" eyebrow={hygiene.eyebrow} title={hygiene.title} subtitle={hygiene.subtitle} />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {hygiene.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-light text-sage-deep">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    {icons[p.icon]}
                  </svg>
                </span>
                <span>
                  <span className="block font-serif text-xl font-semibold leading-tight text-ink">{p.title}</span>
                  <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-muted">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

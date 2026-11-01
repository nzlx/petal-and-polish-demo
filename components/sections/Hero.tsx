import Image from "next/image";
import { hero } from "@/content";
import BookButton from "@/components/ui/BookButton";
import Parallax from "@/components/ui/Parallax";
import { Petal, Shield, Star } from "@/components/ui/Icons";

export default function Hero() {
  // One unbreakable line per phrase: the line count is the same with the fallback and the web font (no CLS).
  const lines = hero.title.split(/(?<=[,.])\s+/);
  const lastLine = lines.length - 1;
  let w = 0;

  return (
    <section id="top" aria-label="Welcome" className="relative isolate overflow-hidden">
      {/* Soft color washes and drifting petals */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_85%_20%,rgb(237_211_207/0.8),transparent_70%),radial-gradient(45%_40%_at_5%_90%,rgb(232_237_227/0.95),transparent_70%),radial-gradient(40%_30%_at_40%_0%,rgb(246_231_227/0.9),transparent_70%)]"
        aria-hidden="true"
      />
      <Petal className="float absolute left-[6%] top-28 -z-10 hidden h-10 w-7 rotate-[-25deg] text-powder md:block" />
      <Petal
        className="float absolute right-[44%] top-[18%] -z-10 hidden h-7 w-5 rotate-[30deg] text-sage lg:block"
        style={{ animationDelay: "-2s" }}
      />
      <Petal
        className="float absolute bottom-16 left-[42%] -z-10 hidden h-9 w-6 rotate-[70deg] text-rose/60 md:block"
        style={{ animationDelay: "-4s" }}
      />

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-4 pb-14 pt-28 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:gap-8 md:pb-20 md:pt-32 lg:gap-16">
        <div>
          <p className="eyebrow fade-up" style={{ animationDelay: "0s" }}>
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-[3.25rem] font-medium leading-[0.98] tracking-[-0.01em] text-ink sm:text-7xl md:text-6xl lg:text-[5.1rem] xl:text-[5.6rem]">
            {lines.map((line, li) => {
              const words = line.split(" ");
              return (
                <span key={line} className="block whitespace-nowrap">
                  {words.map((word, i) => {
                    const last = li === lastLine && i === words.length - 1;
                    return (
                      <span key={word}>
                        <span className="word-in" style={{ animationDelay: `${0.04 + w++ * 0.06}s` }}>
                          {last ? <em className="font-medium text-rose-deep">{word}</em> : word}
                        </span>{" "}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "0.35s" }}>
            {hero.subtitle}
          </p>

          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ animationDelay: "0.45s" }}>
            <BookButton className="btn btn-rose h-14 whitespace-nowrap px-8 text-base">{hero.cta}</BookButton>
            <a href="#services" className="btn btn-outline h-14 whitespace-nowrap px-7 text-base">
              {hero.secondaryCta}
            </a>
          </div>

          <ul className="fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/80" style={{ animationDelay: "0.55s" }}>
            <li className="flex items-center gap-2">
              <span className="flex gap-0.5 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-ink">{hero.badges.rating.value}</strong> · {hero.badges.rating.label}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-sage-deep" />
              {hero.badges.hygiene}
            </li>
          </ul>
        </div>

        {/* Arched photo with an offset gold outline */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm md:max-w-none">
          <div
            className="absolute -inset-y-3 left-4 right-[-0.75rem] rounded-t-full border border-gold/60 md:-right-4 md:left-6"
            aria-hidden="true"
          />
          <div className="arch-in relative aspect-[4/5] overflow-hidden rounded-t-full bg-blush shadow-[0_40px_80px_-40px_rgb(122_74_70/0.55)]">
            <Parallax className="absolute inset-0" amount={0.12}>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                fetchPriority="high"
                quality={60}
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 90vw"
                className="scale-110 object-cover object-[50%_40%]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-rose/20 via-transparent to-transparent" aria-hidden="true" />
          </div>

          <div
            className="fade-up absolute -left-3 bottom-8 rounded-2xl border border-line bg-milk/95 px-4 py-3 shadow-[0_20px_40px_-24px_rgb(122_74_70/0.55)] sm:-left-8"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="font-serif text-3xl font-semibold leading-none text-ink">
              21<span className="text-rose-deep">+</span>
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">Days of shine</p>
          </div>
          <div
            className="float absolute -right-2 top-[22%] hidden rounded-full border border-line bg-milk/95 px-4 py-2 text-sm font-medium text-sage-deep shadow-[0_16px_30px_-20px_rgb(122_74_70/0.5)] sm:block md:-right-6"
            style={{ animationDelay: "-1s" }}
          >
            Gel-X · Builder gel · Art
          </div>
        </div>
      </div>
    </section>
  );
}

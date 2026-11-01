# Petal & Polish Nail Studio (demo)

A one-page website for a fictional boutique nail salon in Scottsdale, Arizona, built as a portfolio piece.

> **This is a demo.** Petal & Polish Nail Studio is not a real business. The address, phone number (a reserved 555-01xx number), nail artists and reviews are made up. The online booking runs entirely in the browser: no appointment is created and nothing you type is sent anywhere.

## Highlights

- **Online booking with add-ons:** service → add-ons (French tips, chrome, nail art, gems, paraffin…) → artist (or "first available") → date → time → contact details → review → confirmation. The total price and appointment length update live as add-ons are toggled, and availability is recalculated for the longer appointment. Slots are generated on the client in Arizona time (America/Phoenix), respect opening hours, artists' days off and appointment length, and stay consistent between visits. The confirmation screen offers an "Add to calendar" `.ics` file generated in the browser.
- **Services & prices in tabs** (Manicures, Pedicures, Extensions, Nail Art, Add-ons), keyboard-accessible. Every service has a "Book" button, and every add-on an "+ Add" button that pre-fills the booking.
- **"Book with [artist]"** buttons jump to the booking with that artist already chosen.
- Bento photo gallery with a keyboard- and swipe-friendly lightbox, gift cards ($50/$100/$150) with a "Coming soon" demo screen, reviews slider, hygiene & safety section, hours with a live "Open now" badge and a stylized map.
- Light spa aesthetic: cream, blush and sage palette with fine gold details, Cormorant Garamond + DM Sans, arched photo frames, soft motion.
- Mobile-first, with a floating "Book" bar on phones.
- Accessibility: semantic landmarks, alt text, visible focus, ARIA tabs, keyboard-navigable calendar, lightbox and dialog, `prefers-reduced-motion` support.
- SEO: metadata, Open Graph image, JSON-LD (`NailSalon`), sitemap and robots.txt.
- Lighthouse: mobile Performance 89–91, desktop 100; Accessibility, Best Practices and SEO 100.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, statically generated) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for animations, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- `next/image` for responsive, optimized images; self-hosted fonts (Cormorant Garamond, DM Sans)

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

## Customizing

All copy lives in [`content.ts`](content.ts): business name, contacts, hours, services, add-ons and prices, artists, gallery, gift cards, reviews and the hygiene text. Three headline options are listed above `hero` in that file. Photos are in `public/images`. Changing those two places is enough to rebrand the site for another salon.

Optional environment variable: `NEXT_PUBLIC_SITE_URL` sets the canonical URL used in metadata, the sitemap and Open Graph tags.

## Project structure

```
app/            layout, page, global styles, OG image, sitemap, robots, fonts
components/
  booking/      booking steps (service, add-ons, artist, calendar, time, details, review, success)
  sections/     page sections (hero, services, artists, gallery, booking, gift cards, reviews, hygiene, visit)
  ui/           shared pieces (reveal, parallax, lightbox, hours, map, icons)
lib/            availability engine (slots.ts), .ics export, scroll helpers
content.ts      all site content
```

## Credits

Photos from [Unsplash](https://unsplash.com) under the Unsplash License. See [CREDITS.md](CREDITS.md). The people in the photos are not the fictional artists named on the site.

Designed and built by **NeoCode**.

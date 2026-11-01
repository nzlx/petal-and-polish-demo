/**
 * All site copy lives here: texts, prices, artists, reviews, hours and contacts.
 * Petal & Polish Nail Studio is a fictional business. The address and phone number are
 * made up (555-01xx numbers are reserved for fiction).
 */

export const site = {
  name: "Petal & Polish Nail Studio",
  shortName: "Petal & Polish",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://petal-and-polish-demo.vercel.app",
  description:
    "Boutique nail studio in Old Town Scottsdale, AZ. Gel manicures, spa pedicures, Gel-X, builder gel and custom nail art with hospital-grade sterilization. Book online in a minute.",
  established: 2016,
  credit: { label: "Demo website by NeoCode", href: "https://neocodestudio.vercel.app" },
};

export const contacts = {
  phoneDisplay: "(480) 555-0176",
  phoneHref: "tel:+14805550176",
  email: "hello@petalandpolish.example",
  address: {
    street: "4217 N Marshall Way, Suite 105",
    city: "Scottsdale",
    state: "AZ",
    zip: "85251",
  },
  // Placeholder: points to the city, not to a real storefront.
  directionsHref: "https://maps.google.com/?q=Old+Town+Scottsdale,+AZ",
  // Arizona stays on MST all year (no daylight saving time).
  timeZone: "America/Phoenix",
};

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Facebook", href: "#" },
];

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Artists", href: "#artists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Gift Cards", href: "#gift-cards" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

/** Weekly hours. day: 0 = Sunday … 6 = Saturday. Times are 24h, studio-local (Scottsdale, MST). */
export const hours: { day: number; label: string; open: string | null; close: string | null }[] = [
  { day: 1, label: "Monday", open: "09:00", close: "19:00" },
  { day: 2, label: "Tuesday", open: "09:00", close: "19:00" },
  { day: 3, label: "Wednesday", open: "09:00", close: "19:00" },
  { day: 4, label: "Thursday", open: "09:00", close: "20:00" },
  { day: 5, label: "Friday", open: "09:00", close: "20:00" },
  { day: 6, label: "Saturday", open: "09:00", close: "18:00" },
  { day: 0, label: "Sunday", open: "10:00", close: "16:00" },
];

/**
 * Headline options (pick one for `hero.title`):
 *  1. "Beautiful nails, beautifully calm."   ← in use
 *  2. "Your hour of calm, finished in polish."
 *  3. "Soft hands. Clean tools. Lasting color."
 * The last word is set in rose italic.
 */
export const hero = {
  eyebrow: "Old Town Scottsdale · Since 2016",
  title: "Beautiful nails, beautifully calm.",
  subtitle:
    "A light-filled studio for gel manicures, spa pedicures, Gel-X and hand-painted nail art. Sterilized tools, unhurried appointments and color that lasts.",
  cta: "Book Appointment",
  secondaryCta: "View Services",
  image: {
    src: "/images/hero-hands.jpg",
    alt: "A hand with a soft pink almond manicure resting on a cream faux-fur throw",
  },
  badges: {
    rating: { value: "4.9", label: "800+ five-star visits" },
    hygiene: "Autoclave-sterilized tools",
  },
};

export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  badge?: string;
};

export type Category = { id: string; label: string; blurb: string; items: Service[] };

/** Bookable services, grouped into the tabs on the menu. Add-ons live in `addons` below. */
export const categories: Category[] = [
  {
    id: "manicures",
    label: "Manicures",
    blurb: "Every manicure includes shaping, cuticle care, a warm towel and a hand massage.",
    items: [
      {
        id: "classic-mani",
        name: "Classic Manicure",
        price: 35,
        duration: 30,
        description: "Shape, cuticle care, hand massage and your choice of regular polish.",
      },
      {
        id: "gel-mani",
        name: "Gel Manicure",
        price: 50,
        duration: 45,
        description: "Chip-free gel color that stays glossy for two to three weeks. Over 200 shades.",
        badge: "Most booked",
      },
      {
        id: "spa-mani",
        name: "Petal Spa Manicure",
        price: 58,
        duration: 50,
        description: "Rose sugar scrub, hydrating mask, hot towels and an extended massage before polish.",
      },
      {
        id: "dry-mani",
        name: "Signature Dry Manicure",
        price: 65,
        duration: 70,
        description: "Precision e-file cuticle work with no soaking, finished with gel for the cleanest look.",
      },
    ],
  },
  {
    id: "pedicures",
    label: "Pedicures",
    blurb: "Pipeless tubs with a fresh disposable liner for every guest. Always.",
    items: [
      {
        id: "classic-pedi",
        name: "Classic Pedicure",
        price: 45,
        duration: 40,
        description: "Warm soak, nail and cuticle care, callus smoothing, massage and polish.",
      },
      {
        id: "gel-pedi",
        name: "Gel Pedicure",
        price: 60,
        duration: 50,
        description: "Our classic pedicure finished with long-wear gel. Perfect for sandal season, which is most of the year here.",
      },
      {
        id: "spa-pedi",
        name: "Signature Spa Pedicure",
        price: 75,
        duration: 60,
        description: "Sea-salt soak, sugar scrub, clay mask, hot stones and a paraffin wrap for very soft feet.",
        badge: "Guest favorite",
      },
      {
        id: "rose-pedi",
        name: "Deluxe Rose Pedicure",
        price: 90,
        duration: 75,
        description: "Rose petal soak, collagen mask and a 15-minute massage. Bring a friend and book side by side.",
      },
    ],
  },
  {
    id: "extensions",
    label: "Extensions",
    blurb: "Length and strength without the damage. Includes shaping and a solid gel color.",
    items: [
      {
        id: "gelx",
        name: "Gel-X Full Set",
        price: 85,
        duration: 90,
        description: "Soft-gel tips in any length or shape, bonded for a natural feel and a 3 to 4 week wear.",
        badge: "Trending",
      },
      {
        id: "builder",
        name: "Builder Gel Overlay",
        price: 70,
        duration: 75,
        description: "Strengthening structured gel on your natural nails. Ideal if you're growing them out.",
      },
      {
        id: "builder-fill",
        name: "Builder Gel Fill",
        price: 60,
        duration: 60,
        description: "Rebalance and refresh your builder gel at 3 to 4 weeks, with a new color.",
      },
      {
        id: "hard-gel",
        name: "Sculpted Gel Extensions",
        price: 95,
        duration: 105,
        description: "Hand-sculpted on forms for a custom apex and ultra-thin, glassy finish.",
      },
    ],
  },
  {
    id: "nail-art",
    label: "Nail Art",
    blurb: "Gel manicure plus design. Send inspo photos ahead and we'll plan your set together.",
    items: [
      {
        id: "minimal-art",
        name: "Minimal Art Manicure",
        price: 65,
        duration: 60,
        description: "Gel manicure with fine lines, dots or micro-French on every nail.",
      },
      {
        id: "signature-art",
        name: "Signature Art Set",
        price: 85,
        duration: 90,
        description: "Hand-painted florals, abstract swirls or chrome accents, fully customized.",
        badge: "Artist pick",
      },
      {
        id: "bridal",
        name: "Bridal Nails",
        price: 95,
        duration: 90,
        description: "A trial-quality set with a soft-glam design and a complimentary paraffin dip.",
      },
      {
        id: "3d-art",
        name: "3D & Charms Set",
        price: 110,
        duration: 105,
        description: "Gems, pearls, 3D gel and charms for the statement set you'll get stopped about.",
      },
    ],
  },
];

/** Add-ons can be stacked on any service in the booking wizard. */
export const addons: Service[] = [
  { id: "french", name: "French Tips", price: 10, duration: 10, description: "Classic, colored or micro-French." },
  { id: "chrome", name: "Chrome or Cat-Eye", price: 15, duration: 10, description: "Glazed, mirror or magnetic finish." },
  { id: "accent-art", name: "Accent Nail Art", price: 10, duration: 10, description: "A hand-painted design on two nails." },
  { id: "full-art", name: "Full Hand-Painted Art", price: 25, duration: 25, description: "A custom design on all ten nails." },
  { id: "gems", name: "Gems & Charms", price: 12, duration: 10, description: "Crystals, pearls or gold accents." },
  { id: "removal", name: "Soak-Off Removal", price: 15, duration: 15, description: "Gentle removal of gel or extensions." },
  { id: "paraffin", name: "Paraffin Wax Dip", price: 12, duration: 10, description: "Warm, deeply moisturizing wrap." },
  { id: "hot-stone", name: "Hot Stone Massage", price: 15, duration: 10, description: "Ten extra minutes of pure calm." },
];

export const addonsCategory = {
  id: "add-ons",
  label: "Add-ons",
  blurb: "Stack any of these on your service. You can add them while booking, too.",
};

export type Artist = {
  id: string;
  name: string;
  firstName: string;
  role: string;
  specialty: string;
  tags: string[];
  bio: string;
  photo: string;
  photoAlt: string;
  /** Weekdays this artist is off (0 = Sunday). */
  daysOff: number[];
};

export const artists: Artist[] = [
  {
    id: "sofia",
    name: "Sofia Ramirez",
    firstName: "Sofia",
    role: "Owner & Lead Artist",
    specialty: "Builder gel & natural nail health",
    tags: ["Builder gel", "Russian manicure"],
    bio: "Opened Petal & Polish in 2016 after eight years at Scottsdale resort spas. Sofia is obsessed with strong, healthy nails and the perfect almond shape.",
    photo: "/images/artist-sofia.jpg",
    photoAlt: "Sofia Ramirez smiling on a cream sofa in a sunlit room",
    daysOff: [0],
  },
  {
    id: "mia",
    name: "Mia Chen",
    firstName: "Mia",
    role: "Senior Nail Artist",
    specialty: "Gel-X & sculpted extensions",
    tags: ["Gel-X", "Sculpted gel"],
    bio: "Mia's Gel-X sets are known for lasting a full four weeks without a single lift. Bring your inspo photos. She lives for a challenge.",
    photo: "/images/artist-mia.jpg",
    photoAlt: "Mia Chen in a white shirt, smiling with her arms crossed",
    daysOff: [2],
  },
  {
    id: "ava",
    name: "Ava Brooks",
    firstName: "Ava",
    role: "Nail Artist",
    specialty: "Hand-painted art & chrome",
    tags: ["Fine-line art", "Chrome"],
    bio: "Fine-line florals, tiny portraits, glazed-donut chrome. If you can pin it, Ava can paint it, usually with a little extra sparkle.",
    photo: "/images/artist-ava.jpg",
    photoAlt: "Ava Brooks in a black top and gold necklaces, smiling",
    daysOff: [3],
  },
  {
    id: "claire",
    name: "Claire Whitman",
    firstName: "Claire",
    role: "Pedicure & Spa Specialist",
    specialty: "Spa pedicures & classic French",
    tags: ["Spa pedicure", "French"],
    bio: "A licensed massage therapist turned nail artist. Guests say her Signature Spa Pedicure is the most relaxing hour of their month.",
    photo: "/images/artist-claire.jpg",
    photoAlt: "Claire Whitman with her hair pinned back, in a white top against a pale wall",
    daysOff: [1],
  },
];

export const artistsSection = {
  eyebrow: "Nail Artists",
  title: "Meet your artists",
  subtitle: "Four licensed artists, each with a specialty. Pick your favorite or let us match you.",
};

export const booking = {
  eyebrow: "Online Booking",
  title: "Reserve your seat",
  subtitle: "Choose a service, add a little extra and pick a time that works. It takes about a minute.",
  daysAhead: 21,
  slotStep: 30, // minutes between start times
  minLeadMinutes: 60, // earliest booking from "now"
  steps: ["Service", "Add-ons", "Artist", "Date", "Time", "Details"],
  anyArtist: { id: "any", name: "First available artist", note: "Fastest way to get in" },
  demoNote: "This is a demo. No appointment is created and nothing you enter leaves your browser.",
  success: {
    title: "You're all set!",
    text: "A confirmation text and email would normally be on the way. This is a demo, so nothing was sent.",
  },
  policy: "Need to reschedule? Just let us know 24 hours ahead. We hold your seat for 10 minutes.",
};

export const servicesSection = {
  eyebrow: "Services & Prices",
  title: "The menu",
  subtitle: "Transparent prices, no surprise upcharges. Every service starts with a quick consultation.",
};

export const gallery = {
  eyebrow: "Gallery",
  title: "Fresh from the table",
  subtitle: "A few recent sets from our artists. Tap any photo for a closer look.",
  /**
   * Bento grid: one "feature" tile (2×2), one "tall" tile (1×2) and six regular tiles. In this order they fill
   * 4×3 on desktop, 3×4 on tablets and 2×6 on phones with no gaps, so keep the count and order of tile types.
   * pos = object-position for the crop.
   */
  items: [
    {
      src: "/images/work-glitter-gel.jpg",
      w: 1599,
      h: 1600,
      tile: "feature",
      pos: "50% 45%",
      tag: "Gel manicure",
      title: "Mauve, milk & silver glitter",
      alt: "Short square nails in mauve, milky white and silver glitter against a white knit sweater",
    },
    {
      src: "/images/work-french.jpg",
      w: 1067,
      h: 1600,
      tile: "regular",
      pos: "50% 55%",
      tag: "French",
      title: "Soft classic French",
      alt: "Natural nails with a soft white French tip holding a tiny daisy",
    },
    {
      src: "/images/work-floral-art.jpg",
      w: 1067,
      h: 1600,
      tile: "regular",
      pos: "50% 50%",
      tag: "Nail art",
      title: "Pearl & eucalyptus",
      alt: "Sheer pink almond nails with gold studs and pearl accents holding a eucalyptus sprig",
    },
    {
      src: "/images/work-builder-pink.jpg",
      w: 1200,
      h: 1600,
      tile: "tall",
      pos: "50% 45%",
      tag: "Builder gel",
      title: "Sheer pink builder gel",
      alt: "Glossy sheer pink builder gel nails resting on a folded white cloth",
    },
    {
      src: "/images/work-navy-gold.jpg",
      w: 1280,
      h: 1600,
      tile: "regular",
      pos: "50% 45%",
      tag: "Nail art",
      title: "Navy, gold & moon",
      alt: "Almond nails in navy, white and gold foil with a crescent moon design",
    },
    {
      src: "/images/work-spa-pedicure.jpg",
      w: 1600,
      h: 1068,
      tile: "regular",
      pos: "40% 50%",
      tag: "Spa pedicure",
      title: "Signature Spa Pedicure",
      alt: "Feet soaking in warm water with fresh orchid and plumeria flowers",
    },
    {
      src: "/images/work-chrome.jpg",
      w: 1317,
      h: 1600,
      tile: "regular",
      pos: "50% 40%",
      tag: "Chrome",
      title: "Mirror chrome stilettos",
      alt: "Long stiletto nails with silver chrome, gems and black line art",
    },
    {
      src: "/images/work-valentine.jpg",
      w: 1600,
      h: 1067,
      tile: "regular",
      pos: "45% 50%",
      tag: "Hand-painted",
      title: "Valentine's script",
      alt: "Red and nude almond nails with the word love hand-painted in script",
    },
  ] satisfies {
    src: string;
    w: number;
    h: number;
    tile: "feature" | "tall" | "regular";
    pos: string;
    tag: string;
    title: string;
    alt: string;
  }[],
};

export const giftCards = {
  eyebrow: "Gift Cards",
  title: "Give the gift of an hour off",
  subtitle: "Birthdays, Mother's Day, bridesmaids or just because. Delivered by email in seconds, good for any service.",
  amounts: [
    { value: 50, note: "A gel manicure" },
    { value: 100, note: "Mani + spa pedicure", featured: true },
    { value: 150, note: "The full pamper day" },
  ],
  cta: "Send a Gift Card",
  fineprint: "Never expires. Redeemable for services and retail at the studio.",
  comingSoon: {
    title: "Coming soon",
    text: "Online gift cards are launching shortly. In the meantime, call or stop by the studio and we'll wrap one up for you.",
    note: "Demo screen: no payment is taken on this site.",
  },
};

// DEMO CONTENT: the reviews below are fictional and written for this portfolio demo.
export const reviews = [
  {
    name: "Jessica L.",
    source: "Google",
    rating: 5,
    text: "Cleanest salon I've been to in Scottsdale. They open a sealed tool pouch right in front of you. My gel lasted three full weeks.",
  },
  {
    name: "Brianna K.",
    source: "Yelp",
    rating: 5,
    text: "Mia did my Gel-X for my sister's wedding and I've never gotten so many compliments. Four weeks later, not one lift.",
  },
  {
    name: "Megan R.",
    source: "Google",
    rating: 5,
    text: "The Signature Spa Pedicure with Claire is my monthly reset. Hot stones, paraffin, the works. I nearly fell asleep.",
  },
  {
    name: "Taylor S.",
    source: "Google",
    rating: 5,
    text: "Brought Ava a blurry Pinterest screenshot and she made it better than the original. The fine-line florals are unreal.",
  },
  {
    name: "Amanda P.",
    source: "Yelp",
    rating: 5,
    text: "Booking online took thirty seconds and I could add French tips right there, so the price was clear before I even walked in.",
  },
  {
    name: "Rachel D.",
    source: "Google",
    rating: 5,
    text: "Sofia's builder gel finally let my natural nails grow out. Calm music, real cucumber water, zero rush. My happy place.",
  },
];

export const reviewsSection = {
  eyebrow: "Reviews",
  title: "Kind words from our guests",
  // DEMO CONTENT: fictional rating summary for the portfolio demo.
  rating: "4.9",
  count: "800+",
};

export const hygiene = {
  eyebrow: "Hygiene & Safety",
  title: "Clean you can see",
  subtitle:
    "Your health comes first. We follow and exceed Arizona State Board of Cosmetology standards, and we're happy to show you how.",
  image: { src: "/images/hygiene-tools.jpg", alt: "Clean cuticle scissors, a wooden pusher and a gel polish bottle on soft blush paper" },
  points: [
    {
      icon: "autoclave",
      title: "Autoclave-sterilized metal tools",
      text: "The same medical-grade sterilization dentists use. Your tools come in a sealed pouch opened in front of you.",
    },
    {
      icon: "single",
      title: "Single-use files & buffers",
      text: "Anything porous is used once and thrown away, or given to you to take home.",
    },
    {
      icon: "tub",
      title: "Pipeless pedicure tubs",
      text: "No hidden jets to harbor bacteria, plus a fresh disposable liner for every single guest.",
    },
    {
      icon: "air",
      title: "Fresh air & clean stations",
      text: "Hospital-grade disinfectant between every appointment and a ventilation system that keeps the air clear.",
    },
  ],
  badge: "Licensed artists · State Board compliant",
};

export const visit = {
  eyebrow: "Location & Hours",
  title: "Visit the studio",
  parking: "Free parking behind the building. We're two blocks from the Scottsdale Waterfront.",
  walkIns: "Walk-ins welcome when we have an open seat. Booking ahead guarantees your time.",
};

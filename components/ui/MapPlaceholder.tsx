import { contacts, site } from "@/content";

/** Illustrative map: soft pastel streets of an Old Town grid, no real location data. */
export default function MapPlaceholder() {
  return (
    <figure className="card relative overflow-hidden rounded-[32px] p-0">
      <svg viewBox="0 0 480 420" className="block h-auto w-full" role="img" aria-label="Illustrated map showing the studio's location">
        <defs>
          <pattern id="blocks" width="56" height="56" patternUnits="userSpaceOnUse">
            <rect width="56" height="56" fill="#f8efe9" />
            <rect x="6" y="6" width="44" height="44" rx="6" fill="#f3e4dd" />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="45%" r="70%">
            <stop offset="60%" stopColor="#fffdfa" stopOpacity="0" />
            <stop offset="100%" stopColor="#fffdfa" stopOpacity="0.85" />
          </radialGradient>
        </defs>
        <rect width="480" height="420" fill="url(#blocks)" />
        {/* Canal */}
        <path d="M-10 300C80 280 140 330 230 318S380 250 490 262" fill="none" stroke="#d6e2e3" strokeWidth="22" strokeLinecap="round" />
        <path d="M-10 300C80 280 140 330 230 318S380 250 490 262" fill="none" stroke="#c3d5d7" strokeWidth="1.5" />
        {/* Parks */}
        <rect x="314" y="62" width="100" height="92" rx="18" fill="#e3eadc" />
        <circle cx="342" cy="96" r="9" fill="#cdd9c4" />
        <circle cx="378" cy="122" r="12" fill="#cdd9c4" />
        <circle cx="392" cy="86" r="7" fill="#cdd9c4" />
        <rect x="40" y="40" width="80" height="60" rx="14" fill="#e3eadc" />
        {/* Streets */}
        <path d="M-10 196H490" stroke="#fffdfa" strokeWidth="16" />
        <path d="M238 -10V430" stroke="#fffdfa" strokeWidth="16" />
        <path d="M128 -10V430M-10 84H490M360 170V430" stroke="#fffdfa" strokeWidth="8" />
        <g fill="#9a8584" fontFamily="system-ui, sans-serif" fontSize="10.5" letterSpacing="1.6" fontWeight="600">
          <text x="18" y="186">E CAMELBACK RD</text>
          <text x="252" y="118" transform="rotate(-90 252 118)">
            N MARSHALL WAY
          </text>
          <text x="300" y="248" fill="#8aa3a6">
            ARIZONA CANAL
          </text>
          <text x="322" y="176">OLD TOWN</text>
        </g>
        <rect width="480" height="420" fill="url(#fade)" />
        {/* Pin */}
        <g transform="translate(238 182)">
          <circle r="40" fill="#d9a3a3" className="pin-pulse" />
          <path d="M0 8C-10-4-16-12-16-20a16 16 0 0132 0c0 8-6 16-16 28z" transform="translate(0 -14)" fill="#a2545f" />
          <circle cy="-34" r="6" fill="#fffdfa" />
        </g>
      </svg>
      <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-milk/95 px-4 py-3 shadow-[0_12px_30px_-20px_rgb(122_74_70/0.5)]">
        <span>
          <span className="block font-serif text-xl font-semibold text-ink">{site.shortName}</span>
          <span className="block text-sm text-muted">
            {contacts.address.street.split(",")[0]}, {contacts.address.city}
          </span>
        </span>
        <span className="shrink-0 text-xs text-muted">Map for illustration</span>
      </figcaption>
    </figure>
  );
}

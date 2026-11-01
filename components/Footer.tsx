import { contacts, nav, site, socials } from "@/content";
import { groupedHours } from "@/lib/hours";
import Logo from "./Logo";

const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </>
  ),
  TikTok: (
    <path
      d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6a6.8 6.8 0 01-3.8-1.2v5.9c0 3.6-2.6 5.9-5.8 5.9a5.6 5.6 0 01-5.6-5.7c0-3.4 2.9-5.9 6.5-5.4v2.8c-1.8-.4-3.6.7-3.6 2.6 0 1.6 1.2 2.8 2.8 2.8 1.7 0 2.8-1.2 2.8-3.2V3h2.8z"
      fill="currentColor"
    />
  ),
  Pinterest: (
    <path
      d="M12.2 2.5C7 2.5 4.4 6.2 4.4 9.3c0 1.9.7 3.6 2.2 4.2.3.1.5 0 .6-.3l.2-.9c.1-.3 0-.4-.2-.7-.5-.5-.8-1.3-.8-2.3 0-3 2.2-5.6 5.8-5.6 3.2 0 4.9 1.9 4.9 4.5 0 3.4-1.5 6.3-3.8 6.3-1.2 0-2.2-1-1.9-2.3.4-1.5 1.1-3.1 1.1-4.2 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.3c-.4 1.9-.1 4.2 0 4.4 0 .1.2.2.3.1.1-.1 1.5-1.9 2-3.6l.8-3.1c.4.7 1.5 1.4 2.7 1.4 3.6 0 6-3.3 6-7.6 0-3.3-2.8-6.4-7.1-6.4z"
      fill="currentColor"
    />
  ),
  Facebook: (
    <path
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z"
      fill="currentColor"
    />
  ),
};

export default function Footer() {
  const a = contacts.address;
  const year = new Date().getFullYear();
  return (
    <footer className="wash relative px-4 pb-28 pt-16 sm:px-6 md:pb-10">
      <div className="rule-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Manicures, pedicures, extensions and nail art in Old Town Scottsdale since {site.established}.
          </p>
          <ul className="mt-5 flex gap-2" aria-label="Social media">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`${s.label} (demo link)`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-powder bg-milk/70 text-ink/75 transition-colors hover:border-rose-deep hover:text-rose-deep"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    {icons[s.label]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-block py-1.5 text-ink/80 transition-colors hover:text-rose-deep">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Hours</h2>
          <dl className="mt-4 space-y-1.5 text-sm">
            {groupedHours().map((g) => (
              <div key={g.days} className="flex gap-3">
                <dt className="w-20 shrink-0 text-ink/90">{g.days}</dt>
                <dd className="text-muted">{g.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="eyebrow">Contact</h2>
          <address className="mt-4 space-y-1.5 text-sm not-italic text-muted">
            <p>
              <a href={contacts.phoneHref} className="text-ink/90 transition-colors hover:text-rose-deep">
                {contacts.phoneDisplay}
              </a>
            </p>
            <p>{a.street}</p>
            <p>
              {a.city}, {a.state} {a.zip}
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-powder/80 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. A fictional business created for a portfolio demo.
        </p>
        <p>
          <a href={site.credit.href} className="text-ink/75 underline-offset-4 transition-colors hover:text-rose-deep hover:underline">
            {site.credit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}

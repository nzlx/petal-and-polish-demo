"use client";

import { useEffect, useState } from "react";
import { hours } from "@/content";
import { shortTime } from "@/lib/hours";
import { shopNow, toMinutes, weekdayOf } from "@/lib/slots";

/** Weekly hours with today highlighted and a live open/closed badge (Arizona time). Status renders after mount. */
export default function Hours() {
  const [now, setNow] = useState<{ day: number; open: boolean; note: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const n = shopNow();
      const day = weekdayOf(n.key);
      const h = hours.find((x) => x.day === day);
      const open = !!h?.open && !!h.close && n.minutes >= toMinutes(h.open) && n.minutes < toMinutes(h.close);
      let note = "";
      if (open) note = `until ${shortTime(h!.close!)}`;
      else {
        for (let i = 0; i < 7; i++) {
          const d = (day + i) % 7;
          const x = hours.find((y) => y.day === d);
          if (!x?.open) continue;
          if (i === 0 && n.minutes >= toMinutes(x.open)) continue;
          note = `opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : x.label} at ${shortTime(x.open)}`;
          break;
        }
      }
      setNow({ day, open, note });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card rounded-[28px] p-5 sm:p-6">
      <div className="flex min-h-7 flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="eyebrow">Hours</h3>
        {now && (
          <p
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-sm ${now.open ? "bg-sage-light" : "bg-blush"}`}
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              {now.open && <span className="absolute inset-0 animate-ping rounded-full bg-ok/50" />}
              <span className={`relative h-2 w-2 rounded-full ${now.open ? "bg-ok" : "bg-rose-deep"}`} />
            </span>
            <span className={`font-semibold ${now.open ? "text-ok" : "text-rose-deep"}`}>{now.open ? "Open now" : "Closed"}</span>
            <span className="text-muted">· {now.note}</span>
          </p>
        )}
      </div>
      <dl className="mt-4 divide-y divide-line">
        {hours.map((h) => {
          const today = now?.day === h.day;
          return (
            <div
              key={h.day}
              className={`-mx-3 flex justify-between rounded-xl px-3 py-2.5 ${today ? "bg-blush/80 text-rose-deep" : "text-ink/85"}`}
            >
              <dt className={today ? "font-semibold" : ""}>
                {h.label}
                {today && <span className="sr-only"> (today)</span>}
              </dt>
              <dd className={`tabular-nums ${h.open ? "" : "text-muted"} ${today ? "font-semibold" : ""}`}>
                {h.open && h.close ? `${shortTime(h.open)} – ${shortTime(h.close)}` : "Closed"}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

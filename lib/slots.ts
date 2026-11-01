import { artists, booking, contacts, hours, type Artist } from "@/content";

/**
 * Demo availability engine. Everything is computed in the browser: each artist's
 * schedule is filled with pseudo-random "taken" quarter-hour cells, seeded by date + artist,
 * so the same day always shows the same openings. Add-ons make an appointment longer,
 * so the same day can have fewer open times once extras are picked.
 */

export type DateKey = string; // "YYYY-MM-DD", studio-local
export type Slot = { time: string; available: boolean; artistId?: string };

const CELL = 15;

const pad = (n: number) => String(n).padStart(2, "0");

export function toKey(y: number, m: number, d: number): DateKey {
  return `${y}-${pad(m)}-${pad(d)}`;
}

export function parseKey(key: DateKey) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d };
}

/** Weekday (0 = Sunday) of a studio-local date. */
export function weekdayOf(key: DateKey) {
  const { y, m, d } = parseKey(key);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function addDays(key: DateKey, days: number): DateKey {
  const { y, m, d } = parseKey(key);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return toKey(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** Current date and minutes-since-midnight in Scottsdale, whatever the visitor's own time zone. */
export function shopNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: contacts.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { key: toKey(get("year"), get("month"), get("day")), minutes: get("hour") * 60 + get("minute") };
}

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const fromMinutes = (n: number) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;

export function hoursOn(key: DateKey) {
  const h = hours.find((x) => x.day === weekdayOf(key));
  return h?.open && h.close ? { open: toMinutes(h.open), close: toMinutes(h.close) } : null;
}

export function worksOn(artist: Artist, key: DateKey) {
  return !!hoursOn(key) && !artist.daysOff.includes(weekdayOf(key));
}

/** Small deterministic hash → [0, 1). */
function rand(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/** How full a day is: Fridays and Saturdays book up faster. */
function density(key: DateKey) {
  const wd = weekdayOf(key);
  return wd === 6 ? 0.42 : wd === 5 ? 0.34 : 0.22;
}

/** Bookings come in 45-minute blocks, so a taken cell drags its neighbours along. */
function cellTaken(artistId: string, key: DateKey, minute: number) {
  const block = minute - (minute % 45);
  return rand(`${key}|${artistId}|${block}`) < density(key);
}

function artistSlots(artist: Artist, key: DateKey, duration: number, earliest: number): Slot[] {
  const h = hoursOn(key);
  if (!h || !worksOn(artist, key)) return [];
  const out: Slot[] = [];
  for (let t = h.open; t + duration <= h.close; t += booking.slotStep) {
    let free = t >= earliest;
    for (let c = t; free && c < t + duration; c += CELL) {
      if (cellTaken(artist.id, key, c)) free = false;
    }
    out.push({ time: fromMinutes(t), available: free, artistId: free ? artist.id : undefined });
  }
  return out;
}

/** Earliest bookable minute on a given day (respects the lead time for "today"). */
function earliestOn(key: DateKey, now = shopNow()) {
  if (key < now.key) return Infinity;
  if (key > now.key) return 0;
  const m = now.minutes + booking.minLeadMinutes;
  return Math.ceil(m / booking.slotStep) * booking.slotStep;
}

export function slotsFor(key: DateKey, artistId: string, duration: number, now = shopNow()): Slot[] {
  const earliest = earliestOn(key, now);
  if (artistId !== booking.anyArtist.id) {
    const a = artists.find((x) => x.id === artistId);
    return a ? artistSlots(a, key, duration, earliest) : [];
  }
  // "First available": merge every working artist, picking whoever is free (order varies per slot).
  const per = artists.map((a) => ({ id: a.id, slots: artistSlots(a, key, duration, earliest) })).filter((x) => x.slots.length);
  if (!per.length) return [];
  const times = per.reduce((acc, p) => (p.slots.length > acc.length ? p.slots : acc), per[0].slots).map((s) => s.time);
  return times.map((time) => {
    const free = per.map((p) => p.slots.find((s) => s.time === time && s.available)).filter((s): s is Slot => !!s);
    if (!free.length) return { time, available: false };
    const pick = free[Math.floor(rand(`${key}|any|${time}`) * free.length)];
    return { time, available: true, artistId: pick.artistId };
  });
}

export type DayStatus = "closed" | "off" | "past" | "full" | "few" | "open";

export function dayStatus(key: DateKey, artistId: string, duration: number, now = shopNow()): DayStatus {
  if (key < now.key) return "past";
  if (!hoursOn(key)) return "closed";
  if (artistId !== booking.anyArtist.id) {
    const a = artists.find((x) => x.id === artistId);
    if (a && !worksOn(a, key)) return "off";
  }
  const free = slotsFor(key, artistId, duration, now).filter((s) => s.available).length;
  return free === 0 ? "full" : free <= 3 ? "few" : "open";
}

/* ----- formatting ----- */

export function formatTime(t: string) {
  const m = toMinutes(t);
  const h = Math.floor(m / 60);
  return `${((h + 11) % 12) + 1}:${pad(m % 60)} ${h < 12 ? "AM" : "PM"}`;
}

export function formatDate(key: DateKey, opts: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }) {
  const { y, m, d } = parseKey(key);
  return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "75 min" → "1 hr 15 min". */
export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

/** Converts a studio-local wall time to a UTC Date (DST-safe, though Arizona doesn't observe it). */
export function shopTimeToUtc(key: DateKey, time: string) {
  const { y, m, d } = parseKey(key);
  const mins = toMinutes(time);
  const guess = Date.UTC(y, m - 1, d, Math.floor(mins / 60), mins % 60);
  let utc = guess;
  for (let i = 0; i < 2; i++) {
    const local = shopNow(new Date(utc));
    const { y: ly, m: lm, d: ld } = parseKey(local.key);
    const asUtc = Date.UTC(ly, lm - 1, ld, Math.floor(local.minutes / 60), local.minutes % 60);
    utc += guess - asUtc;
  }
  return new Date(utc);
}

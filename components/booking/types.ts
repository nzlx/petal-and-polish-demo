import { addons, artists, booking, categories } from "@/content";

export type Details = { name: string; phone: string; email: string; notes: string };

export type BookingState = {
  step: number; // 0–5 = wizard steps, 6 = review, 7 = done
  dir: 1 | -1;
  serviceId: string | null;
  addonIds: string[];
  addonsDone: boolean; // the add-ons step was answered (even with none picked)
  artistId: string | null; // artist id or booking.anyArtist.id
  date: string | null;
  time: string | null;
  assignedArtistId: string | null; // who actually takes the slot (matters for "any")
  details: Details;
  confirmation: string | null;
};

export const S = { service: 0, addons: 1, artist: 2, date: 3, time: 4, details: 5 } as const;
export const REVIEW = 6;
export const DONE = 7;

export const emptyDetails: Details = { name: "", phone: "", email: "", notes: "" };

export const initialState: BookingState = {
  step: 0,
  dir: 1,
  serviceId: null,
  addonIds: [],
  addonsDone: false,
  artistId: null,
  date: null,
  time: null,
  assignedArtistId: null,
  details: emptyDetails,
  confirmation: null,
};

const allServices = categories.flatMap((c) => c.items);

export const getService = (id: string | null) => allServices.find((s) => s.id === id) ?? null;
export const getAddon = (id: string) => addons.find((a) => a.id === id) ?? null;
export const getArtist = (id: string | null) => artists.find((a) => a.id === id) ?? null;
export const artistLabel = (id: string | null) =>
  id === booking.anyArtist.id ? booking.anyArtist.name : (getArtist(id)?.name ?? "");

/** Picked add-ons in menu order. */
export const pickedAddons = (s: Pick<BookingState, "addonIds">) => addons.filter((a) => s.addonIds.includes(a.id));

/** Service + add-ons: what the guest pays and how long the seat is held. */
export function totals(s: Pick<BookingState, "serviceId" | "addonIds">) {
  const service = getService(s.serviceId);
  const extras = pickedAddons(s);
  return {
    price: (service?.price ?? 0) + extras.reduce((n, a) => n + a.price, 0),
    duration: (service?.duration ?? 0) + extras.reduce((n, a) => n + a.duration, 0),
  };
}

/** US phone mask: (480) 555-0176. */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function validate(d: Details) {
  const errors: Partial<Record<keyof Details, string>> = {};
  if (d.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = d.phone.replace(/\D/g, "");
  if (digits.length !== 10) errors.phone = "Enter a 10-digit US phone number.";
  else if (/^[01]/.test(digits)) errors.phone = "That area code doesn't look right.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) errors.email = "Enter a valid email, like name@example.com.";
  return errors;
}

import { scrollToTarget } from "@/lib/scroll";

export type BookingPreset = { serviceId?: string; artistId?: string; addonId?: string };

export const BOOKING_EVENT = "petal-polish:book";

/** Opens the booking wizard with a service, artist and/or add-on already picked. */
export function openBooking(preset: BookingPreset = {}) {
  window.dispatchEvent(new CustomEvent<BookingPreset>(BOOKING_EVENT, { detail: preset }));
  scrollToTarget("#book");
}

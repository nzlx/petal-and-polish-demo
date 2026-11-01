"use client";

import { useState } from "react";
import { booking } from "@/content";
import { formatDate, formatDuration, formatTime } from "@/lib/slots";
import { Arrow } from "@/components/ui/Arrow";
import { S, getArtist, getService, pickedAddons, totals, type BookingState } from "./types";

type Props = { state: BookingState; onEdit: (step: number) => void; onConfirm: () => void };

export default function Review({ state, onEdit, onConfirm }: Props) {
  const [busy, setBusy] = useState(false);
  const service = getService(state.serviceId)!;
  const extras = pickedAddons(state);
  const total = totals(state);
  const assigned = getArtist(state.assignedArtistId);
  const isAny = state.artistId === booking.anyArtist.id;

  const rows = [
    { step: S.artist, label: "Artist", value: assigned?.name ?? "", extra: isAny ? "First available" : assigned?.role },
    { step: S.date, label: "Date", value: formatDate(state.date!) },
    { step: S.time, label: "Time", value: formatTime(state.time!), extra: `About ${formatDuration(total.duration)}` },
    { step: S.details, label: "Contact", value: state.details.name, extra: `${state.details.phone} · ${state.details.email}` },
  ];

  const confirm = () => {
    setBusy(true);
    // Simulated network round-trip: this demo never sends anything.
    setTimeout(onConfirm, 900);
  };

  return (
    <div>
      {/* Itemized receipt: service + each add-on */}
      <div className="rounded-2xl border border-line bg-cream/70 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Your service</p>
          <div className="flex gap-1">
            <EditBtn label="service" onClick={() => onEdit(S.service)} />
            <EditBtn label="add-ons" text="Add-ons" onClick={() => onEdit(S.addons)} />
          </div>
        </div>
        <ul className="mt-3 space-y-2">
          <Line name={service.name} meta={formatDuration(service.duration)} price={`$${service.price}`} strong />
          {extras.map((a) => (
            <Line key={a.id} name={`+ ${a.name}`} meta={`${a.duration} min`} price={`$${a.price}`} />
          ))}
        </ul>
        <div className="rule-gold my-4" />
        <div className="flex items-baseline justify-between">
          <span className="text-ink/80">
            Total <span className="text-sm text-muted">· pay at the studio</span>
          </span>
          <span className="font-serif text-3xl font-semibold text-rose-deep">${total.price}</span>
        </div>
      </div>

      <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-milk">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3 px-4 py-3.5">
            <dt className="w-20 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{r.label}</dt>
            <dd className="min-w-0 flex-1">
              <span className="block text-ink">{r.value}</span>
              {r.extra && <span className="block break-words text-sm text-muted">{r.extra}</span>}
            </dd>
            <EditBtn label={r.label.toLowerCase()} onClick={() => onEdit(r.step)} />
          </div>
        ))}
        {state.details.notes && (
          <div className="flex items-start gap-3 px-4 py-3.5">
            <dt className="w-20 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Notes</dt>
            <dd className="min-w-0 flex-1 break-words text-sm text-ink/90">{state.details.notes}</dd>
          </div>
        )}
      </dl>

      <p className="mt-4 px-1 text-sm text-muted">{booking.policy}</p>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
        <button type="button" className="btn btn-outline px-5" onClick={() => onEdit(S.details)} disabled={busy}>
          <Arrow dir="left" /> Back
        </button>
        <button type="button" className="btn btn-rose min-w-[11rem]" onClick={confirm} disabled={busy} aria-busy={busy}>
          {busy ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Booking…
            </>
          ) : (
            "Confirm appointment"
          )}
        </button>
      </div>
    </div>
  );
}

function Line({ name, meta, price, strong }: { name: string; meta: string; price: string; strong?: boolean }) {
  return (
    <li className="flex items-baseline gap-3">
      <span className={`min-w-0 ${strong ? "font-serif text-xl font-semibold text-ink" : "text-ink/85"}`}>{name}</span>
      <span className="flex-1 border-b border-dotted border-gold/50" aria-hidden="true" />
      <span className="shrink-0 text-xs text-muted">{meta}</span>
      <span className={`w-12 shrink-0 text-right tabular-nums ${strong ? "font-semibold text-ink" : "text-ink/85"}`}>{price}</span>
    </li>
  );
}

function EditBtn({ label, text = "Edit", onClick }: { label: string; text?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded-full px-2 py-1 text-sm font-medium text-rose-deep underline-offset-4 hover:underline"
      aria-label={`Edit ${label}`}
    >
      {text}
    </button>
  );
}

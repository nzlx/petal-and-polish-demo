"use client";

import { useMemo } from "react";
import { booking } from "@/content";
import { formatDate, formatTime, slotsFor, toMinutes } from "@/lib/slots";
import { getArtist } from "./types";

type Props = {
  date: string;
  artistId: string;
  duration: number;
  selected: string | null;
  onSelect: (time: string, assignedArtistId: string) => void;
  onChangeDate: () => void;
};

const groups = [
  { label: "Morning", from: 0, to: 12 * 60 },
  { label: "Afternoon", from: 12 * 60, to: 17 * 60 },
  { label: "Evening", from: 17 * 60, to: 24 * 60 },
];

export default function TimeSlots({ date, artistId, duration, selected, onSelect, onChangeDate }: Props) {
  const slots = useMemo(() => slotsFor(date, artistId, duration), [date, artistId, duration]);
  const free = slots.filter((s) => s.available).length;
  const isAny = artistId === booking.anyArtist.id;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-ink/90">
          {formatDate(date)}{" "}
          <span className="text-muted">
            · {free} open {free === 1 ? "time" : "times"}
          </span>
        </p>
        <button type="button" onClick={onChangeDate} className="text-rose-deep underline-offset-4 hover:underline">
          Change date
        </button>
      </div>

      <div className="mt-5 space-y-6">
        {groups.map((g) => {
          const list = slots.filter((s) => {
            const t = toMinutes(s.time);
            return t >= g.from && t < g.to;
          });
          if (!list.length) return null;
          return (
            <fieldset key={g.label}>
              <legend className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{g.label}</legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {list.map((s) => {
                  const on = s.time === selected;
                  const who = isAny && s.artistId ? getArtist(s.artistId)?.firstName : null;
                  return (
                    <button
                      key={s.time}
                      type="button"
                      disabled={!s.available}
                      aria-pressed={on}
                      aria-label={`${formatTime(s.time)}${s.available ? (who ? `, with ${who}` : "") : ", taken"}`}
                      onClick={() => s.artistId && onSelect(s.time, s.artistId)}
                      className={`flex min-h-12 flex-col items-center justify-center rounded-xl border px-1 py-2 text-sm font-medium tabular-nums transition-colors ${
                        on
                          ? "border-rose-deep bg-rose-deep text-white"
                          : s.available
                            ? "border-line bg-milk text-ink hover:border-rose-deep/70 hover:text-rose-deep"
                            : "cursor-not-allowed border-transparent bg-transparent text-ink/25 line-through"
                      }`}
                    >
                      {formatTime(s.time)}
                      {who && <span className={`text-[11px] font-normal ${on ? "text-white/80" : "text-muted"}`}>with {who}</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>
    </div>
  );
}

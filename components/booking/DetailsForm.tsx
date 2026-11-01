"use client";

import { useState } from "react";
import { formatPhone, validate, type Details } from "./types";

type Field = keyof Details;

export default function DetailsForm({ initial, onSubmit }: { initial: Details; onSubmit: (d: Details) => void }) {
  const [v, setV] = useState<Details>(initial);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const errors = validate(v);

  const set = (f: Field, value: string) => setV((p) => ({ ...p, [f]: f === "phone" ? formatPhone(value) : value }));
  const show = (f: Field) => (touched[f] ? errors[f as keyof typeof errors] : undefined);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      setTouched({ name: true, phone: true, email: true });
      const first = (["name", "phone", "email"] as const).find((f) => errors[f]);
      e.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    onSubmit({ ...v, name: v.name.trim(), email: v.email.trim(), notes: v.notes.trim() });
  };

  return (
    <form id="booking-details" noValidate onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <Input
        label="Full name"
        name="name"
        autoComplete="name"
        value={v.name}
        error={show("name")}
        onChange={(x) => set("name", x)}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        className="sm:col-span-2"
        placeholder="Emily Parker"
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={v.phone}
        error={show("phone")}
        onChange={(x) => set("phone", x)}
        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
        placeholder="(480) 555-0100"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={v.email}
        error={show("email")}
        onChange={(x) => set("email", x)}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        placeholder="emily@example.com"
      />
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm text-ink/90">
          Notes for your artist <span className="text-muted">(optional)</span>
        </span>
        <textarea
          name="notes"
          rows={3}
          maxLength={300}
          value={v.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Inspo ideas, nail shape, allergies or anything we should know…"
          className="w-full resize-none rounded-xl border border-line bg-milk px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-rose-deep focus:outline-none"
        />
      </label>
      <p className="text-xs text-muted sm:col-span-2">
        We&apos;ll only use your details to confirm the appointment. No spam, ever.
      </p>
    </form>
  );
}

type InputProps = {
  label: string;
  name: Field;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  className?: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode" | "autoComplete" | "placeholder">;

function Input({ label, name, value, error, onChange, onBlur, className = "", ...rest }: InputProps) {
  const id = `bk-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink/90">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`h-12 w-full rounded-xl border bg-milk px-4 text-base text-ink placeholder:text-muted/60 focus:outline-none ${
          error ? "border-danger/80 focus:border-danger" : "border-line focus:border-rose-deep"
        }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

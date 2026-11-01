export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        d="M6.6 2.8l1.6 3.4c.2.5.1 1-.3 1.4L6.6 8.8a10 10 0 004.6 4.6l1.2-1.3c.4-.4.9-.5 1.4-.3l3.4 1.6c.5.2.8.8.6 1.4l-.6 2c-.2.6-.7 1-1.3 1C8.4 17.6 2.4 11.6 2.2 4.1c0-.6.4-1.1 1-1.3l2-.6c.6-.2 1.2.1 1.4.6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Clock({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.8V8l2.2 1.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7L10 1.8z" fill="currentColor" />
    </svg>
  );
}

export function Shield({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 2l6.5 2.5v5c0 4-2.8 7.2-6.5 8.5C6.3 16.7 3.5 13.5 3.5 9.5v-5L10 2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 10l2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-3.5 w-3.5", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Decorative petal, used as soft floating ornaments. */
export function Petal({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 60" className={className} style={style} aria-hidden="true">
      <path d="M20 2C32 14 38 30 30 46c-3 6-7 10-10 12-3-2-7-6-10-12C2 30 8 14 20 2z" fill="currentColor" />
      <path d="M20 8v46" stroke="rgb(255 255 255 / 0.45)" strokeWidth="0.8" />
    </svg>
  );
}

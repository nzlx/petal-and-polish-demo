import { CheckIcon } from "@/components/ui/Icons";

export function Check({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-6 w-6 place-items-center rounded-full bg-rose-deep text-white shadow-[0_6px_14px_-4px_rgb(162_84_95/0.7)] ${className}`}
      aria-hidden="true"
    >
      <CheckIcon strokeWidth={2.2} />
    </span>
  );
}

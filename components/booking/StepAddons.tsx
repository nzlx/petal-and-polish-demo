import { addons } from "@/content";
import { CheckIcon } from "@/components/ui/Icons";

/** Optional extras: toggle any number; the running total in the wizard footer updates live. */
export default function StepAddons({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div>
      <p className="-mt-2 mb-5 text-muted">Optional. Pick as many as you like, or skip this step.</p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {addons.map((a) => {
          const on = selected.includes(a.id);
          return (
            <li key={a.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => onToggle(a.id)}
                className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                  on
                    ? "border-rose-deep bg-blush/60 shadow-[0_0_0_1px_var(--color-rose-deep)]"
                    : "border-line bg-milk hover:border-rose/80 hover:bg-blush/30"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition-colors duration-300 ${
                    on ? "border-rose-deep bg-rose-deep text-white" : "border-powder bg-milk text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <CheckIcon strokeWidth={2.4} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{a.name}</span>
                  <span className="block text-sm text-muted">{a.description}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-serif text-lg font-semibold text-rose-deep">+${a.price}</span>
                  <span className="block text-xs text-muted">+{a.duration} min</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

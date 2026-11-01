import Reveal from "./Reveal";

export default function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${center ? "eyebrow-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 font-serif text-[2.6rem] font-medium leading-[1.02] text-ink sm:text-5xl md:text-6xl">
        <Accent text={title} />
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed text-muted ${center ? "mx-auto max-w-lg" : "max-w-xl"}`}>{subtitle}</p>
      )}
      {children}
    </Reveal>
  );
}

/** Sets the last word of a heading in rose italic. */
export function Accent({ text }: { text: string }) {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i + 1)}
      <em className="font-medium text-rose-deep">{text.slice(i + 1)}</em>
    </>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "auto",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "auto" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p
        data-reveal
        className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
          dark ? "text-brand-soft" : "text-brand-ink"
        }`}
      >
        {index && <span className={dark ? "text-white/35" : "text-subtle"}>{index} /</span>}
        {eyebrow}
      </p>
      <h2
        data-split
        className={`mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[52px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal="0.1"
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/60" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

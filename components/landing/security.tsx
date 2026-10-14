import { AppIcon, Glyph, type IconName } from "./icons";
import { SectionHeading } from "./section-heading";

const points: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "lock",
    title: "Encrypted sessions",
    text: "Every sign-in runs over an encrypted session, so your account stays yours.",
  },
  {
    icon: "mailCheck",
    title: "Email verification",
    text: "New accounts confirm their email before they get into a workspace.",
  },
  {
    icon: "key",
    title: "Password reset",
    text: "Locked out? A secure reset link goes straight to your verified inbox.",
  },
  {
    icon: "layers",
    title: "Workspace isolation",
    text: "Each company has its own workspace with roles and permissions set by the owner.",
  },
];

export function Security() {
  return (
    <section id="security" className="relative overflow-hidden border-t border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            index="06"
            eyebrow="Security and trust"
            title={
              <>
                Encrypted sessions.{" "}
                <span className="text-gradient-brand">Your data stays in your workspace.</span>
              </>
            }
          />
          <div data-reveal-stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {points.map(({ icon, title, text }) => (
              <div key={title} className="spotlight-card rounded-2xl border border-card bg-page p-5">
                <AppIcon name={icon} />
                <h3 className="mt-4 font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="relative mx-auto grid aspect-square w-full max-w-md place-items-center">
          <div className="halo inset-0 opacity-60" aria-hidden="true" />
          <div className="spin-slower absolute inset-0 rounded-full border border-dashed border-line" />
          <div className="spin-slow absolute inset-[12%] rounded-full border border-card">
            <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_20px_4px_rgba(37,99,235,0.5)]" />
          </div>
          <div className="spin-slower absolute inset-[26%] rounded-full border border-card">
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_16px_3px_rgba(124,58,237,0.5)]" />
          </div>

          <div className="relative grid size-36 place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#1b2547] to-[#070a1c] shadow-[0_30px_80px_-20px_rgba(37,99,235,0.6),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent" />
            <Glyph name="shield" className="relative size-20" />
            <div className="scan-line absolute inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_12px_2px_rgba(165,243,252,0.7)]" />
          </div>

          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-card bg-surface px-3.5 py-1.5 font-mono text-[11px] text-muted shadow-sm">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500 align-middle" />
            session: encrypted
          </div>
        </div>
      </div>
    </section>
  );
}

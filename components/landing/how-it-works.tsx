import { ArrowRight, Check, Mail } from "lucide-react";
import { AppIcon, Glyph, type IconName } from "./icons";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-page py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="05"
          eyebrow="How it works"
          title={
            <>
              Up and running <span className="text-gradient-brand">in three steps.</span>
            </>
          }
          description="No migration project, no consultants. Create your workspace, bring your people in and start working."
        />

        <div data-steps className="relative mt-16">
          {/* progress line: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-line lg:left-0 lg:top-[19px] lg:h-px lg:w-full" aria-hidden="true">
            <div
              data-steps-line
              className="h-full w-full origin-top bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 lg:origin-left lg:bg-gradient-to-r"
            />
          </div>

          <ol data-reveal-stagger className="relative grid gap-10 lg:grid-cols-3 lg:gap-6">
            <Step n="01" icon="plus" title="Create a workspace" text="Sign up, verify your email and name your workspace. You're the owner from day one.">
              <div className="space-y-2.5">
                <Field label="Workspace name" value="Acme Inc" />
                <div className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand text-[12.5px] font-medium text-white">
                  Create workspace <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Step>

            <Step n="02" icon="invite" title="Invite your team" text="Add teammates by email and give each one the right role and permissions.">
              <div className="space-y-2">
                {[
                  ["maya@acme.co", "Admin"],
                  ["jon@acme.co", "Member"],
                ].map(([email, role]) => (
                  <div key={email} className="flex items-center gap-2 rounded-lg border border-card bg-surface px-3 py-2">
                    <Mail className="size-3.5 text-subtle" />
                    <span className="flex-1 truncate text-[12.5px] text-ink">{email}</span>
                    <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[10.5px] text-muted">{role}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 px-1 text-[11.5px] text-emerald-600 dark:text-emerald-400">
                  <Check className="size-3.5" strokeWidth={2.4} /> Invites sent by email
                </div>
              </div>
            </Step>

            <Step n="03" icon="grid" title="Run everything in one place" text="Projects, customers and AI working together, live for everyone on the team.">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["projects", "Projects"],
                    ["pipeline", "Deals"],
                    ["team", "Team"],
                    ["ai", "AI"],
                  ] as const
                ).map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-card bg-surface px-3 py-2.5 text-[12.5px] text-ink">
                    <Glyph name={icon} tone="auto" className="size-4" /> {label}
                  </div>
                ))}
              </div>
            </Step>
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  icon,
  title,
  text,
  children,
}: {
  n: string;
  icon: IconName;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative pl-14 lg:pl-0 lg:pt-14">
      <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-card bg-surface font-mono text-[12px] font-medium text-brand-ink shadow-sm">
        {n}
      </span>
      <div className="flex items-center gap-3">
        <AppIcon name={icon} size="sm" />
        <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
      <div className="spotlight-card mt-6 rounded-2xl border border-card bg-surface-2/60 p-4 dark:bg-white/[0.02]">{children}</div>
    </li>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-card bg-surface px-3 py-2">
      <div className="text-[10.5px] text-subtle">{label}</div>
      <div className="text-[13px] font-medium text-ink">{value}</div>
    </div>
  );
}

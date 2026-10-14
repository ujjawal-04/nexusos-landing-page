import { ArrowUpRight, Bell, CircleCheck, Search, Trophy } from "lucide-react";
import { AppIcon, Glyph, type IconName } from "./icons";
import { LogoMark } from "./logo";

const sidebar: { icon: IconName; label: string; active?: boolean }[] = [
  { icon: "grid", label: "Dashboard", active: true },
  { icon: "projects", label: "Projects" },
  { icon: "pipeline", label: "Deals" },
  { icon: "team", label: "Contacts" },
  { icon: "files", label: "Files" },
  { icon: "ai", label: "AI assistant" },
  { icon: "email", label: "Reports" },
];

// Illustrative product data for the mock (not real customer figures).
const stages = [
  { label: "Lead", value: "$18.4k", height: 92 },
  { label: "Qualified", value: "$13.1k", height: 68 },
  { label: "Proposal", value: "$10.6k", height: 54 },
  { label: "Won", value: "$6.1k", height: 34 },
];

const tasks = [
  { title: "Send proposal to Northwind", tag: "Sales", owner: "MR", tone: "bg-sky-300" },
  { title: "Q4 roadmap review", tag: "Product", owner: "JL", tone: "bg-violet-300" },
  { title: "Onboard new teammate", tag: "Team", owner: "AK", tone: "bg-amber-200" },
];

const inset = "rounded-xl border border-card bg-surface-2/50 dark:bg-white/[0.03]";

export function ProductMock() {
  return (
    <div className="relative">
      <div className="halo -inset-x-16 -top-24 bottom-0" aria-hidden="true" />

      <div className="panel relative overflow-hidden rounded-2xl text-left">
        {/* top bar */}
        <div className="flex h-11 items-center gap-3 border-b border-line px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center gap-2 rounded-md bg-surface-2 font-mono text-[10.5px] text-subtle dark:bg-white/5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> app.nexusos / workspace
          </div>
          <div className="hidden items-center gap-3 text-subtle sm:flex">
            <Search className="size-3.5" />
            <Bell className="size-3.5" />
          </div>
        </div>

        <div className="flex">
          {/* sidebar */}
          <aside className="hidden w-52 shrink-0 border-r border-line p-3 md:block">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
              <LogoMark className="size-6" />
              <div className="leading-tight">
                <div className="text-[12.5px] font-medium text-ink">Acme Inc</div>
                <div className="text-[10.5px] text-subtle">Workspace</div>
              </div>
            </div>
            <nav className="mt-4 space-y-0.5">
              {sidebar.map(({ icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] ${
                    active ? "bg-surface-2 font-medium text-ink dark:bg-white/[0.08]" : "text-muted"
                  }`}
                >
                  <Glyph name={icon} tone="auto" className={`size-4 ${active ? "" : "opacity-60"}`} />
                  {label}
                </div>
              ))}
            </nav>
            <div className={`mt-6 p-2.5 ${inset}`}>
              <div className="flex items-center gap-1.5 text-[10.5px] text-muted">
                <span className="live-dot size-1.5 rounded-full bg-emerald-500" /> 4 teammates online
              </div>
              <div className="mt-2 flex -space-x-1.5">
                {["JL", "MR", "AK", "SP"].map((initials, i) => (
                  <span
                    key={initials}
                    className={`grid size-6 place-items-center rounded-full text-[9px] font-semibold text-navy ring-2 ring-surface ${
                      ["bg-sky-300", "bg-violet-300", "bg-amber-200", "bg-emerald-300"][i]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* main */}
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">Overview</div>
                <div className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">Good morning, team</div>
              </div>
              <div className="hidden items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-[12px] font-medium text-white sm:flex">
                + New deal
              </div>
            </div>

            {/* stats */}
            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              <Stat icon="pipeline" label="Open pipeline">
                $<span data-count="48.2" data-decimals="1">48.2</span>k
                <span className="block align-middle text-[10px] font-medium text-emerald-600 sm:ml-1.5 sm:inline sm:text-[11px] dark:text-emerald-400">
                  +12%
                </span>
              </Stat>
              <Stat icon="projects" label="Tasks due today">
                <span data-count="7">7</span>
              </Stat>
              <Stat icon="insight" label="Win rate">
                <span data-count="32">32</span>%
              </Stat>
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_1fr]">
              {/* pipeline bars */}
              <div className={`p-4 ${inset}`}>
                <div className="flex items-center justify-between">
                  <div className="text-[12.5px] font-medium text-ink">Pipeline by stage</div>
                  <div className="flex items-center gap-1 text-[10.5px] text-subtle">
                    This quarter <ArrowUpRight className="size-3" />
                  </div>
                </div>
                <div className="mt-4 grid h-32 grid-cols-4 items-end gap-3">
                  {stages.map((stage, i) => (
                    <div key={stage.label} className="flex h-full flex-col justify-end gap-2">
                      <div className="text-center font-mono text-[10px] text-muted">{stage.value}</div>
                      <div
                        className={`bar-grow rounded-md ${
                          stage.label === "Won"
                            ? "bg-gradient-to-t from-emerald-500/60 to-emerald-400"
                            : "bg-gradient-to-t from-brand/50 to-brand-light"
                        }`}
                        style={{ height: `${stage.height}%`, "--i": i } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-4 gap-3 text-center text-[10.5px] text-subtle">
                  {stages.map((stage) => (
                    <div key={stage.label}>{stage.label}</div>
                  ))}
                </div>
              </div>

              {/* tasks */}
              <div className={`hidden p-4 sm:block ${inset}`}>
                <div className="text-[12.5px] font-medium text-ink">Due today</div>
                <ul className="mt-3 space-y-2.5">
                  {tasks.map((task) => (
                    <li key={task.title} className="flex items-center gap-2.5">
                      <span className="size-3.5 shrink-0 rounded-full border border-subtle/50" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12px] text-ink">{task.title}</div>
                        <div className="text-[10.5px] text-subtle">{task.tag}</div>
                      </div>
                      <span className={`grid size-5 place-items-center rounded-full text-[8.5px] font-semibold text-navy ${task.tone}`}>
                        {task.owner}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI tip */}
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-brand/20 bg-gradient-to-r from-brand/[0.08] via-violet-500/[0.05] to-transparent p-3.5 sm:flex-row sm:items-center dark:border-brand-light/25 dark:from-brand/15 dark:via-violet-600/10">
              <AppIcon name="ai" size="sm" />
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-ink">Nexus AI</div>
                <div className="text-[12px] text-muted">3 deals have gone quiet this week. Want me to draft follow-ups?</div>
              </div>
              <span className="self-start rounded-lg bg-ink px-3 py-1.5 text-[11.5px] font-medium text-page sm:self-auto">
                Draft follow-ups
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating toast */}
      <div className="toast-in absolute -right-1 -top-5 z-10 sm:-right-6 sm:top-16">
        <div className="float-y panel flex items-center gap-2.5 rounded-xl px-3.5 py-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15">
            <Trophy className="size-3.5 text-emerald-600 dark:text-emerald-300" />
          </span>
          <div className="text-left">
            <div className="text-[12px] font-medium text-ink">Acme Corp moved to Won</div>
            <div className="flex items-center gap-1 text-[10.5px] text-subtle">
              <CircleCheck className="size-3" /> just now · synced for everyone
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <div className={`p-2.5 sm:p-4 ${inset}`}>
      <div className="flex items-center justify-between text-[10px] text-muted sm:text-[11.5px]">
        <span className="truncate">{label}</span>
        <Glyph name={icon} tone="auto" className="hidden size-4 sm:block" />
      </div>
      <div className="mt-1.5 text-base font-semibold tracking-tight text-ink tabular-nums sm:mt-2 sm:text-2xl">{children}</div>
    </div>
  );
}

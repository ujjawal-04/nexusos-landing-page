import { Building2, CalendarDays, Mail, UserPlus } from "lucide-react";
import { AppIcon, Glyph, type IconName } from "./icons";
import { SectionHeading } from "./section-heading";

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-page py-24 sm:py-32">
      <div className="grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="Modules"
          title={
            <>
              Everything your business runs on.{" "}
              <span className="text-gradient-brand">In one place.</span>
            </>
          }
          description="Stop stitching together a task app, a CRM, a chat tool and a spreadsheet. NexusOS keeps the work, the customers and the people in one workspace."
        />

        <div data-reveal-stagger className="mt-16 grid gap-4 lg:grid-cols-3">
          <Card
            className="lg:col-span-2"
            icon="projects"
            path="projects"
            title="Projects and tasks"
            text="Boards, owners and due dates the whole team can follow. Everyone knows what's next and who's on it."
          >
            <KanbanVisual />
          </Card>

          <Card
            icon="ai"
            path="ai"
            title="AI assistant"
            text="Summaries, email drafts, insights and weekly reports from an assistant that knows your work."
          >
            <AiVisual />
          </Card>

          <Card
            icon="realtime"
            path="live"
            title="Real-time teamwork"
            text="Changes show up live for everyone. No refreshing, no stale copies."
          >
            <RealtimeVisual />
          </Card>

          <Card
            className="lg:col-span-2"
            icon="pipeline"
            path="crm"
            title="Customers and pipeline"
            text="Leads, contacts, companies and deals in one place, moving from Lead to Won in plain sight."
          >
            <CrmVisual />
          </Card>

          <Card
            icon="team"
            path="team"
            title="Workspaces and roles"
            text="Every company gets its own workspace. The owner invites teammates by email with roles and permissions."
          >
            <RolesVisual />
          </Card>

          <Card
            icon="email"
            path="mail"
            title="Email notifications"
            text="Verification, invites and weekly reports land in the inbox, right when they matter."
          >
            <EmailVisual />
          </Card>

          <Card
            icon="files"
            path="files"
            title="File attachments"
            text="Attach proposals, briefs and contracts right on the work item they belong to."
          >
            <FilesVisual />
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  path,
  title,
  text,
  className = "",
  children,
}: {
  icon: IconName;
  path: string;
  title: string;
  text: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`spotlight-card group flex flex-col overflow-hidden rounded-2xl border border-card bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(37,99,235,0.35)] ${className}`}
    >
      {/* window chrome */}
      <div className="flex h-9 items-center gap-2 border-b border-line px-3.5">
        <span className="flex gap-1">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="font-mono text-[10.5px] text-subtle">nexus://{path}</span>
        <span className="ml-auto size-1.5 rounded-full bg-emerald-500/80" />
      </div>
      <div className="relative flex min-h-48 flex-1 items-center justify-center overflow-hidden border-b border-line bg-surface-2/50 p-5 dark:bg-white/[0.015]">
        {children}
      </div>
      <div className="flex gap-4 p-6">
        <AppIcon name={icon} />
        <div>
          <h3 className="text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- Card visuals ---------- */

const chip = "rounded-lg border border-card bg-surface px-3 py-2.5 shadow-sm";

function KanbanVisual() {
  const columns = [
    { name: "To do", items: ["Draft launch brief", "Collect assets"] },
    { name: "In progress", items: ["Website refresh"] },
    { name: "Done", items: ["Kickoff call", "Budget sign-off"] },
  ];
  return (
    <div className="w-full max-w-xl">
      <div className="relative grid grid-cols-3 gap-3">
        {columns.map((column) => (
          <div key={column.name} className="rounded-xl bg-surface-2 p-2 dark:bg-white/[0.03]">
            <div className="mb-2 flex items-center justify-between px-1 text-[11px] font-medium text-subtle">
              {column.name}
              <span className="font-mono">{column.items.length}</span>
            </div>
            <div className="h-[52px]" />
            <div className="space-y-2">
              {column.items.map((item) => (
                <div key={item} className={`${chip} text-[12px] text-ink`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* card hopping across the board */}
        <div className="pointer-events-none absolute left-2 top-8" style={{ width: "calc((100% - 1.5rem) / 3 - 1rem)" }}>
          <div className={`kanban-hop ${chip} border-brand/40 shadow-lg shadow-brand/10`}>
            <div className="text-[12px] font-medium text-ink">Pricing page copy</div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[10.5px] text-subtle">
                <CalendarDays className="size-3" /> Fri
              </span>
              <span className="grid size-5 place-items-center rounded-full bg-violet-300 text-[8.5px] font-semibold text-navy">JL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className="w-full max-w-xs space-y-2.5">
      <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-brand px-3.5 py-2 text-[12.5px] text-white">
        Summarize this week for me
      </div>
      <div className="w-[88%] rounded-2xl rounded-bl-md border border-card bg-surface px-3.5 py-2.5 text-[12.5px] text-ink shadow-sm">
        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-brand-ink">
          <Glyph name="ai" tone="auto" className="size-3.5" /> Nexus AI
        </div>
        14 tasks closed, 2 deals advanced to Proposal…
      </div>
      <div className="flex w-fit items-center gap-1 rounded-full border border-card bg-surface px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot size-1.5 rounded-full bg-brand-ink" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}

function RealtimeVisual() {
  return (
    <div className="relative h-40 w-full max-w-xs">
      <div className={`${chip} absolute left-2 top-6 w-44`}>
        <div className="text-[12px] font-medium text-ink">Client onboarding</div>
        <div className="mt-2 h-1.5 rounded-full bg-surface-2">
          <div className="h-full w-2/3 rounded-full bg-brand" />
        </div>
      </div>
      <div className={`${chip} absolute bottom-3 right-2 w-40`}>
        <div className="flex items-center gap-1.5 text-[11px] text-subtle">
          <span className="live-dot size-1.5 rounded-full bg-emerald-500" /> Live
        </div>
        <div className="mt-1 text-[12px] font-medium text-ink">Status → In review</div>
      </div>
      <Cursor className="cursor-a left-10 top-1" name="Maya" color="bg-violet-500" fill="#8B5CF6" />
      <Cursor className="cursor-b right-12 top-20" name="Jon" color="bg-sky-500" fill="#0EA5E9" />
    </div>
  );
}

function Cursor({ className, name, color, fill }: { className: string; name: string; color: string; fill: string }) {
  return (
    <div className={`absolute z-10 ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M1 1l5.2 13.5 2-5.6 5.6-2z" fill={fill} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className={`ml-3 rounded-full px-2 py-0.5 text-[10.5px] font-medium text-white ${color}`}>{name}</span>
    </div>
  );
}

function CrmVisual() {
  const contacts = [
    { name: "Priya Shah", company: "Northwind", stage: "Proposal", tone: "text-violet-600 bg-violet-500/10 dark:text-violet-300" },
    { name: "Leo Martins", company: "Globex", stage: "Qualified", tone: "text-sky-600 bg-sky-500/10 dark:text-sky-300" },
    { name: "Dana Okafor", company: "Acme Corp", stage: "Won", tone: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-300" },
  ];
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-card bg-surface shadow-sm">
      <div className="grid grid-cols-[1.3fr_1fr_auto] gap-3 border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
        <span>Contact</span>
        <span>Company</span>
        <span>Stage</span>
      </div>
      {contacts.map((c) => (
        <div key={c.name} className="grid grid-cols-[1.3fr_1fr_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-0">
          <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
            <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-[9px] font-semibold text-muted">
              {c.name.split(" ").map((n) => n[0]).join("")}
            </span>
            {c.name}
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <Building2 className="size-3.5" /> {c.company}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${c.tone}`}>{c.stage}</span>
        </div>
      ))}
    </div>
  );
}

function RolesVisual() {
  const members = [
    { initials: "AK", role: "Owner", tone: "bg-amber-200" },
    { initials: "JL", role: "Admin", tone: "bg-violet-300" },
    { initials: "MR", role: "Member", tone: "bg-sky-300" },
  ];
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className={`${chip} flex items-center gap-2`}>
        <UserPlus className="size-3.5 text-brand-ink" />
        <span className="flex-1 truncate text-[12px] text-subtle">teammate@company.com</span>
        <span className="rounded-md bg-brand px-2 py-1 text-[10.5px] font-medium text-white">Invite</span>
      </div>
      {members.map((m) => (
        <div key={m.initials} className={`${chip} flex items-center gap-2.5 py-2`}>
          <span className={`grid size-6 place-items-center rounded-full text-[9px] font-semibold text-navy ${m.tone}`}>{m.initials}</span>
          <span className="h-2 flex-1 rounded-full bg-surface-2" />
          <span className="flex items-center gap-1 rounded-md border border-card px-2 py-0.5 text-[10.5px] text-muted">
            {m.role === "Owner" && <Glyph name="shield" tone="auto" className="size-3.5" />}
            {m.role}
          </span>
        </div>
      ))}
    </div>
  );
}

function EmailVisual() {
  const mails: { subject: string; icon: IconName }[] = [
    { subject: "Your weekly report is ready", icon: "report" },
    { subject: "You're invited to Acme Inc", icon: "invite" },
    { subject: "Verify your email address", icon: "mailCheck" },
  ];
  return (
    <div className="relative h-40 w-full max-w-xs">
      {mails.map((mail, i) => (
        <div
          key={mail.subject}
          className={`${chip} absolute inset-x-0 flex items-center gap-2.5`}
          style={{ top: `${i * 30 + 14}px`, transform: `scale(${1 - (2 - i) * 0.05})`, zIndex: i }}
        >
          <AppIcon name={mail.icon} size="sm" />
          <div className="min-w-0">
            <div className="truncate text-[12px] font-medium text-ink">{mail.subject}</div>
            <div className="flex items-center gap-1 text-[10.5px] text-subtle">
              <Mail className="size-3" /> NexusOS
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FilesVisual() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className={`${chip} flex items-center gap-2.5`}>
        <span className="grid size-8 place-items-center rounded-lg bg-rose-500/10 font-mono text-[9px] font-semibold text-rose-500">PDF</span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-medium text-ink">proposal-v3.pdf</div>
          <div className="text-[10.5px] text-subtle">2.4 MB · Northwind deal</div>
        </div>
      </div>
      <div className={chip}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-sky-500/10 font-mono text-[9px] font-semibold text-sky-500">IMG</span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-medium text-ink">homepage-mock.png</div>
            <div className="text-[10.5px] text-subtle">Uploading…</div>
          </div>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-surface-2">
          <div className="upload-bar h-full rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

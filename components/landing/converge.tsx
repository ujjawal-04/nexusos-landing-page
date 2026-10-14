import { AppIcon, type IconName } from "./icons";
import { LogoMark } from "./logo";

type Tile = {
  icon: IconName;
  before: string;
  after: string;
  note: string;
  x: number;
  y: number;
  r: number;
};

// x / y are fractions of the stage size used for the scattered starting position.
const left: Tile[] = [
  { icon: "projects", before: "Task tracker", after: "Projects and tasks", note: "Boards, owners, due dates", x: -0.18, y: -0.42, r: -9 },
  { icon: "pipeline", before: "Sales spreadsheet", after: "Customers and pipeline", note: "Lead → Qualified → Proposal → Won", x: -0.3, y: 0.05, r: 7 },
  { icon: "ai", before: "Separate AI chat", after: "AI assistant", note: "Knows your workspace", x: -0.14, y: 0.45, r: -5 },
];

const right: Tile[] = [
  { icon: "realtime", before: "Status meetings", after: "Real-time updates", note: "Live for everyone", x: 0.2, y: -0.4, r: 8 },
  { icon: "team", before: "Shared passwords", after: "Roles and permissions", note: "Owner invites by email", x: 0.32, y: 0.08, r: -8 },
  { icon: "email", before: "Inbox threads", after: "Email and reports", note: "Invites, weekly reports", x: 0.16, y: 0.46, r: 6 },
];

export function Converge() {
  return (
    <section
      id="one-workspace"
      data-converge
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-page py-24 lg:py-16"
    >
      <div className="grid-bg-light pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink">
            <span className="text-subtle">01 /</span> One workspace
          </p>
          <div className="mt-4 grid">
            <h2
              data-converge-before
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-subtle opacity-0 sm:text-5xl lg:text-[56px]"
            >
              Six tools. Six logins. <br className="hidden sm:block" />
              Nothing in sync.
            </h2>
            <h2
              data-converge-after
              className="col-start-1 row-start-1 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px]"
            >
              Six tools became <br className="hidden sm:block" />
              <span className="text-gradient-brand">one workspace.</span>
            </h2>
          </div>
        </div>

        <div data-converge-stage className="relative mx-auto mt-12 max-w-5xl lg:mt-14">
          <div
            data-converge-frame
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border border-card bg-surface shadow-[0_40px_100px_-50px_rgba(15,23,42,0.45)]"
          >
            <div className="flex h-11 items-center gap-3 border-b border-line px-4">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </div>
              <span className="font-mono text-[11px] text-subtle">nexus://acme-inc</span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                <span className="live-dot size-1.5 rounded-full bg-emerald-500" /> all in sync
              </span>
            </div>
          </div>

          <div className="relative grid gap-3 p-3 pt-14 sm:p-5 sm:pt-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10 lg:p-8 lg:pt-[4.5rem]">
            <ul className="grid gap-3">
              {left.map((tile) => (
                <TileCard key={tile.icon} tile={tile} side="left" />
              ))}
            </ul>

            <div data-converge-core className="relative mx-auto grid size-40 place-items-center lg:size-48">
              <span className="spin-slower absolute inset-0 rounded-full border border-dashed border-line" />
              <span className="spin-slow absolute inset-5 rounded-full border border-card">
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_14px_3px_rgba(37,99,235,0.5)]" />
              </span>
              <span className="halo inset-6" />
              <div className="relative text-center">
                <LogoMark className="mx-auto size-14 drop-shadow-[0_12px_24px_rgba(37,99,235,0.45)] lg:size-16" />
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">Nexus core</div>
              </div>
            </div>

            <ul className="grid gap-3">
              {right.map((tile) => (
                <TileCard key={tile.icon} tile={tile} side="right" />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TileCard({ tile, side }: { tile: Tile; side: "left" | "right" }) {
  return (
    <li data-tile data-x={tile.x} data-y={tile.y} data-r={tile.r} className="relative">
      {/* connector to the core */}
      <span
        data-converge-link
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-px w-10 bg-gradient-to-r lg:block ${
          side === "left"
            ? "left-full origin-left from-brand/70 to-brand/0"
            : "right-full origin-right from-brand/0 to-brand/70"
        }`}
      />

      <div data-tile-after className="flex items-center gap-3.5 rounded-2xl border border-card bg-page p-3.5 dark:bg-white/[0.02]">
        <AppIcon name={tile.icon} />
        <div className="min-w-0">
          <div className="text-[15px] font-semibold tracking-tight text-ink">{tile.after}</div>
          <div className="truncate text-[13px] text-muted">{tile.note}</div>
        </div>
      </div>

      {/* the scattered "before" state: a lonely browser tab */}
      <div
        data-tile-before
        aria-hidden="true"
        className="invisible absolute inset-0 flex items-center gap-3.5 rounded-2xl border border-dashed border-subtle/40 bg-surface p-3.5 opacity-0 shadow-xl shadow-black/5"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-surface-2 font-mono text-[11px] text-subtle">tab</span>
        <div>
          <div className="text-[15px] font-medium text-muted line-through decoration-subtle/50">{tile.before}</div>
          <div className="font-mono text-[11px] text-subtle">another login · another tab</div>
        </div>
      </div>
    </li>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Check, CornerDownLeft } from "lucide-react";
import { Glyph, type IconName } from "./icons";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- ⌘K command bar ---------- */

const commands = [
  { text: "Move Acme Corp to Won", result: "Deal updated · synced for everyone" },
  { text: "Draft follow-ups for quiet deals", result: "3 drafts ready to review" },
  { text: "Assign launch brief to Maya, due Friday", result: "Task added to Launch board" },
  { text: "Invite jon@acme.co as Member", result: "Invite sent by email" },
];

export function CommandBar() {
  const [state, setState] = useState({ i: 0, chars: 0, done: false });
  const command = commands[state.i];

  useEffect(() => {
    if (reducedMotion()) {
      if (state.done) return;
      const id = window.setTimeout(() => setState({ i: 0, chars: commands[0].text.length, done: true }), 0);
      return () => window.clearTimeout(id);
    }
    const { i, chars, done } = state;
    const full = commands[i].text.length;
    let delay = 45;
    let next = { i, chars: chars + 1, done };
    if (!done && chars >= full) {
      delay = 450;
      next = { i, chars, done: true };
    } else if (done) {
      delay = 2200;
      next = { i: (i + 1) % commands.length, chars: 0, done: false };
    } else if (chars === 0) {
      delay = 600;
    }
    const id = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(id);
  }, [state]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="panel flex h-14 items-center gap-3 rounded-2xl px-4">
        <Glyph name="command" tone="auto" className="size-5 shrink-0" />
        <div className="min-w-0 flex-1 truncate text-left text-[15px] text-ink">
          <span className="sr-only">Example command: {command.text}</span>
          <span aria-hidden="true" className={state.done ? "" : "caret"}>
            {command.text.slice(0, state.chars)}
          </span>
          {state.chars === 0 && !state.done && (
            <span aria-hidden="true" className="text-subtle">Ask NexusOS to do something…</span>
          )}
        </div>
        <kbd className="hidden items-center gap-1 rounded-md border border-card bg-surface-2 px-2 py-1 font-mono text-[11px] text-subtle sm:flex">
          <CornerDownLeft className="size-3" /> enter
        </kbd>
      </div>
      <div
        aria-hidden="true"
        className={`absolute left-4 top-full mt-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[12.5px] text-emerald-700 dark:text-emerald-200 transition-all duration-300 ${
          state.done ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        <Check className="size-3.5" strokeWidth={2.4} /> {command.result}
      </div>
    </div>
  );
}

/* ---------- Live activity feed ---------- */

type FeedEvent = { who: string; tone: string; text: string; icon: IconName; module: string };

const events: FeedEvent[] = [
  { who: "MR", tone: "bg-violet-300", text: "Maya moved Acme Corp to Won", icon: "pipeline", module: "CRM" },
  { who: "AI", tone: "bg-gradient-to-br from-sky-300 to-violet-300", text: "Nexus AI drafted 3 follow-ups", icon: "ai", module: "AI" },
  { who: "JL", tone: "bg-sky-300", text: "Jon completed Q4 roadmap review", icon: "projects", module: "Projects" },
  { who: "AK", tone: "bg-amber-200", text: "Priya joined the workspace as Admin", icon: "team", module: "Team" },
  { who: "AI", tone: "bg-gradient-to-br from-sky-300 to-violet-300", text: "Weekly report sent to the team", icon: "report", module: "Email" },
  { who: "SP", tone: "bg-emerald-300", text: "proposal-v3.pdf added to Northwind", icon: "files", module: "Files" },
  { who: "LM", tone: "bg-rose-300", text: "Leo created “Pricing page copy”", icon: "projects", module: "Projects" },
];

const VISIBLE = 5;

export function LiveFeed() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const rows = Array.from({ length: VISIBLE }, (_, k) => {
    const n = tick - k;
    return { key: n, event: events[((n % events.length) + events.length) % events.length], age: k };
  });

  return (
    <div className="panel w-full overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Live activity</span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-emerald-600 dark:text-emerald-300">
          <span className="live-dot size-1.5 rounded-full bg-emerald-400" /> synced
        </span>
      </div>
      <ul className="relative h-[300px] overflow-hidden p-2" aria-label="Example workspace activity">
        {rows.map(({ key, event, age }) => (
          <li
            key={key}
            className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-opacity duration-500 ${
              age === 0 ? "feed-in bg-surface-2 dark:bg-white/[0.05]" : ""
            }`}
            style={{ opacity: 1 - age * 0.16 }}
          >
            <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-navy ${event.tone}`}>
              {event.who}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] text-ink">{event.text}</div>
              <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[10.5px] text-subtle">
                <Glyph name={event.icon} tone="auto" className="size-3" /> {event.module} · {age === 0 ? "just now" : `${age * 2 + 1}m ago`}
              </div>
            </div>
          </li>
        ))}
        <li aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent dark:from-[#0b0e22]" />
      </ul>
    </div>
  );
}

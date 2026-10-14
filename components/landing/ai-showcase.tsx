"use client";

import { useEffect, useState } from "react";
import { AppIcon, Glyph, type IconName } from "./icons";

type Mode = {
  id: string;
  icon: IconName;
  label: string;
  blurb: string;
  prompt: string;
  answer: string;
};

const TAB_MS = 7000;

const modes: Mode[] = [
  {
    id: "summaries",
    icon: "ai",
    label: "Summaries",
    blurb: "Catch up on any project, deal or customer in seconds.",
    prompt: "Summarize the Acme Corp account",
    answer:
      "Acme Corp is in Proposal at $12,400. Last touch was 6 days ago. Two open tasks: send revised pricing (Maya, due Thu) and book a security review. Sentiment from recent notes is positive.",
  },
  {
    id: "drafts",
    icon: "email",
    label: "Email drafts",
    blurb: "Follow-ups and replies written with the context of your work.",
    prompt: "Draft a follow-up to Northwind",
    answer:
      "Hi Priya, thanks again for the call on Tuesday. I've attached the updated proposal with the onboarding timeline we discussed. Would Thursday work for a quick review with your team?",
  },
  {
    id: "insights",
    icon: "insight",
    label: "Insights",
    blurb: "Spot what needs attention before it slips.",
    prompt: "What needs my attention this week?",
    answer:
      "3 deals have gone quiet this week. 5 tasks on Website refresh are overdue, mostly waiting on design. Win rate is up from last month. Want me to draft follow-ups for the quiet deals?",
  },
  {
    id: "reports",
    icon: "report",
    label: "Weekly reports",
    blurb: "A clear weekly report, written for you and sent by email.",
    prompt: "Generate this week's report",
    answer:
      "This week: 14 tasks completed, 2 deals moved to Proposal, 1 deal won. Pipeline is up 12%. Top risk: the launch project is 3 days behind. Report sent to the team by email.",
  },
];

export function AiShowcase() {
  const [active, setActive] = useState(0);
  const mode = modes[active];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div role="tablist" aria-label="AI assistant capabilities" className="space-y-2">
        {modes.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`ai-tab-${m.id}`}
              aria-selected={selected}
              aria-controls="ai-panel"
              onClick={() => setActive(i)}
              className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 sm:p-5 ${
                selected ? "glass border-white/15" : "border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-3">
                <AppIcon name={m.icon} className={`transition-opacity ${selected ? "" : "opacity-50"}`} />
                <span className={`text-[17px] font-semibold tracking-tight ${selected ? "text-white" : "text-white/55"}`}>
                  {m.label}
                </span>
              </div>
              <p
                className={`grid transition-all duration-500 ${
                  selected ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span className="overflow-hidden text-[15px] leading-relaxed text-white/60">{m.blurb}</span>
              </p>
              {selected && (
                <span
                  key={active}
                  className="tab-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
                  style={{ "--tab-ms": `${TAB_MS}ms` } as React.CSSProperties}
                  onAnimationEnd={() => setActive((v) => (v + 1) % modes.length)}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div className="halo -inset-16" aria-hidden="true" />
        <div
          id="ai-panel"
          role="tabpanel"
          aria-labelledby={`ai-tab-${mode.id}`}
          className="glass-strong relative overflow-hidden rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <AppIcon name="ai" size="sm" />
              <span className="text-sm font-medium text-white">Nexus AI</span>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
              <span className="live-dot size-1.5 rounded-full bg-emerald-400" /> knows your workspace
            </span>
          </div>

          <div className="min-h-[320px] space-y-4 p-5 sm:p-6">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-[14px] text-white">
              {mode.prompt}
            </div>
            <Typewriter key={mode.id} text={mode.answer} />
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3.5">
            <div className="flex-1 truncate rounded-lg bg-white/5 px-3 py-2 text-[13px] text-white/35">
              Ask anything about your workspace…
            </div>
            <span className="rounded-lg bg-white px-3 py-2 text-[12.5px] font-medium text-navy">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => setCount(text.length), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 2;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);

  const done = count >= text.length;

  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/15 bg-white/[0.04] px-4 py-3.5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-brand-soft">
        <Glyph name="ai" className="size-3.5" /> Nexus AI
      </div>
      <p className="sr-only">{text}</p>
      <p className={`text-[14.5px] leading-relaxed text-white/80 ${done ? "" : "caret"}`} aria-hidden="true">
        {text.slice(0, count)}
      </p>
    </div>
  );
}

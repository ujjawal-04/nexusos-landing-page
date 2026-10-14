import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "./background-beams";
import { CommandBar, LiveFeed } from "./hero-live";
import { Glyph } from "./icons";
import { ProductMock } from "./product-mock";

const plainWords = ["Run", "your", "whole", "business"];
const highlightWords = ["from", "one", "workspace."];

const delay = (d: string) => ({ "--d": d }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-page pt-28 text-ink dark:bg-navy sm:pt-36">
      <Backdrop spotlight />

      <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 lg:px-8">
        <div>
          <p
            className="fade-up inline-flex items-center gap-2.5 rounded-full border border-card bg-surface/70 py-1 pl-1 pr-3.5 text-[13px] text-muted shadow-sm dark:bg-white/[0.04] dark:shadow-none"
            style={delay("0s")}
          >
            <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-ink dark:bg-amber-200/15 dark:text-amber-200/90">
              NexusOS
            </span>
            The Intelligent Business Operating System
          </p>

          <h1 className="mt-7 max-w-3xl text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[78px]">
            <span className="sr-only">Run your whole business from one workspace.</span>
            <span aria-hidden="true">
              {plainWords.map((word, i) => (
                <span key={word} className="hero-word mr-[0.22em]" style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>
              ))}
              <br className="hidden sm:block" />
              {highlightWords.map((word, i) => (
                <span
                  key={word}
                  className="hero-word text-gradient-hero mr-[0.22em] pb-[0.06em] last:mr-0"
                  style={{ "--i": i + plainWords.length } as React.CSSProperties}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-muted" style={delay("0.75s")}>
            Projects, customers and your team, kept in step for everyone in real time.
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay("0.9s")}>
            <Link
              href="/register"
              data-magnetic
              className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-medium"
            >
              Create a workspace <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              data-magnetic
              className="inline-flex h-12 items-center justify-center rounded-xl border border-card bg-surface px-6 text-[15px] font-medium text-ink shadow-sm transition-colors hover:bg-surface-2 dark:bg-white/[0.04] dark:shadow-none dark:hover:bg-white/10"
            >
              Log in
            </Link>
          </div>

          <div className="fade-up mt-12 pb-10" style={delay("1.05s")}>
            <CommandBar />
          </div>
        </div>

        <div className="fade-up hidden pb-10 lg:block" style={delay("1.2s")}>
          <LiveFeed />
          <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-subtle">
            {(
              [
                ["lock", "Encrypted"],
                ["realtime", "Real-time"],
                ["ai", "AI built in"],
              ] as const
            ).map(([icon, label]) => (
              <span
                key={label}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-card bg-surface/70 py-2 dark:bg-white/[0.03]"
              >
                <Glyph name={icon} tone="auto" className="size-3.5" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="fade-up relative z-10 mx-auto mt-10 max-w-7xl px-3 pb-20 sm:px-6 sm:pb-28 lg:px-8" style={delay("1.3s")}>
        <div data-mock-tilt className="will-change-transform">
          <ProductMock />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-page" />
    </section>
  );
}

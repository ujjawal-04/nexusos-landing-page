import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "./background-beams";

export function FinalCta() {
  return (
    <section className="bg-page px-3 py-16 sm:px-6 sm:py-24">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy px-6 py-20 text-center text-white shadow-[0_40px_120px_-40px_rgba(37,99,235,0.6)] ring-1 ring-white/10 sm:py-28">
        <Backdrop theme="dark" />
        <div className="relative">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-soft">
            Get started
          </p>
          <h2
            data-split
            className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-6xl"
          >
            Run your whole business <span className="text-gradient">from one workspace.</span>
          </h2>
          <p data-reveal="0.1" className="mx-auto mt-6 max-w-lg text-base text-white/60 sm:text-lg">
            Create your workspace, invite your team and keep everyone in step from day one.
          </p>
          <div data-reveal="0.2" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              data-magnetic
              className="btn-primary inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-medium sm:w-auto"
            >
              Create a workspace <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              data-magnetic
              className="glass inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10 sm:w-auto"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "AI assistant", href: "#ai" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Trust",
    links: [{ label: "Security", href: "#security" }],
  },
  {
    title: "Account",
    links: [
      { label: "Create a workspace", href: "/register" },
      { label: "Log in", href: "/login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            The Intelligent Business Operating System. Projects, customers and your team in one workspace.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-[13px] text-subtle sm:flex-row sm:px-6">
          <p>© NexusOS. All rights reserved.</p>
          <a href="#top" className="font-mono text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>

      {/* oversized wordmark sign-off */}
      <div className="relative h-[17vw] max-h-64 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 select-none text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] lg:text-[19rem]">
          <span className="bg-gradient-to-b from-ink/[0.14] to-ink/0 bg-clip-text text-transparent">
            Nexus<span className="bg-gradient-to-b from-brand-light/50 to-brand/0 bg-clip-text">OS</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { LOGIN_URL, REGISTER_URL } from "./links";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { LogoMark } from "./logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#ai", label: "AI" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#security", label: "Security" },
];

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header id="site-nav" data-scrolled="false" className="site-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="nav-shell mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-transparent px-3 transition-[background,border-color,box-shadow] duration-300 sm:px-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="NexusOS home">
          <LogoMark />
          <span className="text-[17px] font-semibold tracking-tight text-ink">
            Nexus<span className="text-brand-ink">OS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label="Toggle colour theme"
          >
            <Sun className="hidden size-[18px] dark:block" />
            <Moon className="size-[18px] dark:hidden" />
          </button>
          <Link
            href={LOGIN_URL}
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:block"
          >
            Log in
          </Link>
          <Link
            href={REGISTER_URL}
            className="btn-primary hidden items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium sm:inline-flex"
          >
            Create a workspace
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-6xl rounded-2xl border border-card bg-surface p-2 shadow-2xl shadow-black/20 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-[15px] text-ink hover:bg-surface-2"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-3">
            <Link href={LOGIN_URL} className="rounded-xl border border-card px-4 py-2.5 text-center text-sm font-medium text-ink">
              Log in
            </Link>
            <Link href={REGISTER_URL} className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium">
              Get started <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

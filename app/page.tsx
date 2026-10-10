"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  KanbanSquare,
  Menu,
  MessageSquareText,
  Moon,
  Network,
  Plus,
  Search,
  Sparkles,
  Sun,
  Users,
  X,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: KanbanSquare,
    eyebrow: "WORKSPACE",
    title: "Move from idea to done.",
    description:
      "Projects, tasks, owners and deadlines in one calm, connected workspace. Keep the whole team moving without the status meetings.",
    className: "feature-blue",
  },
  {
    icon: Network,
    eyebrow: "CUSTOMERS",
    title: "Every relationship, in context.",
    description:
      "Companies, contacts, leads and deals live beside the work they unlock. Turn a conversation into momentum.",
    className: "feature-cream",
  },
  {
    icon: Sparkles,
    eyebrow: "INTELLIGENCE",
    title: "An assistant that knows your work.",
    description:
      "Summarize a record, draft the email, find the answer or surface the next best move — without leaving your workspace.",
    className: "feature-lilac",
  },
];

const navItems = ["Product", "Solutions", "Resources", "Pricing"];

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-product", {
        y: 50,
        opacity: 0,
        rotate: 2,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%" },
        });
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className={darkMode ? "site-shell" : "site-shell light-shell"}>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="NexusOS home">
          <span className="brand-mark">N</span>
          <span>Nexus<span className="brand-muted">OS</span></span>
        </Link>
        <nav className={mobileMenuOpen ? "main-nav nav-open" : "main-nav"}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>
              {item}
              {item !== "Pricing" && <ChevronDown size={13} />}
            </a>
          ))}
          <Link href="/login" className="mobile-login" onClick={() => setMobileMenuOpen(false)}>
            Log in <ArrowRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle theme">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link href="/login" className="header-login">Log in</Link>
          <Link href="/login" className="button button-small">Get started <ArrowRight size={15} /></Link>
          <button className="menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="announcement"><span><Sparkles size={13} /> Introducing Nexus AI</span><ArrowRight size={14} /></div>
            <h1>Run your whole business <em>from one workspace.</em></h1>
            <p className="hero-text">
              Projects, customers, and your team — kept in step for everyone.
              NexusOS is the operating system for ambitious businesses.
            </p>
            <div className="hero-actions">
              <Link href="/login" className="button button-primary">Start for free <ArrowRight size={17} /></Link>
              <a href="#product" className="text-link">See how it works <ArrowRight size={16} /></a>
            </div>
            <div className="hero-note"><span className="avatars"><i>J</i><i>M</i><i>A</i></span> Join 2,000+ teams building better <span className="dot-separator">•</span> No credit card required</div>
          </div>

          <div id="product" className="hero-product product-window">
            <div className="window-topbar"><div className="window-dots"><i /><i /><i /></div><span className="window-url"><span className="secure-dot" /> app.nexusos.com / workspace</span><div className="window-actions"><Search size={14} /><Bell size={14} /><span className="mini-avatar">U</span></div></div>
            <div className="product-body">
              <aside className="product-sidebar">
                <div className="mini-brand"><span className="brand-mark small">N</span><b>NexusOS</b></div>
                <div className="workspace-switch"><span className="workspace-icon">Q</span><span><b>qr scan</b><small>Workspace</small></span><ChevronDown size={12} /></div>
                <div className="side-section"><small>WORKSPACE</small><span className="side-active"><KanbanSquare size={14} /> Dashboard</span><span><FileText size={14} /> Projects</span><span><Check size={14} /> My tasks</span><span><CalendarDays size={14} /> Calendar</span></div>
                <div className="side-section"><small>CRM</small><span><CircleDollarSign size={14} /> Deals</span><span><Users size={14} /> Contacts</span><span><Network size={14} /> Companies</span></div>
              </aside>
              <div className="product-main">
                <div className="product-heading"><div><p className="muted-label">SATURDAY, 10 OCTOBER</p><h3>Good evening, Ujjawal</h3><p>Here&apos;s your workspace at a glance.</p></div><button className="new-button"><Plus size={14} /> New task</button></div>
                <div className="metric-grid"><Metric label="Projects" value="12" note="+2 this month" icon={<KanbanSquare size={14} />} /><Metric label="Open tasks" value="38" note="6 due today" icon={<Check size={14} />} /><Metric label="Pipeline value" value="₹84.2k" note="+18.4% this month" icon={<CircleDollarSign size={14} />} /><Metric label="Completion" value="72%" note="+8.2% this week" icon={<Zap size={14} />} /></div>
                <div className="dashboard-grid"><div className="dashboard-card task-card"><div className="card-heading"><b>My tasks</b><span>View all <ArrowRight size={12} /></span></div><Task title="Prepare Q4 growth plan" tag="Strategy" color="purple" /><Task title="Follow up with Acme team" tag="Sales" color="orange" /><Task title="Review landing page copy" tag="Marketing" color="blue" /></div><div className="dashboard-card pipeline-card"><div className="card-heading"><b>Sales pipeline</b><span>Open board <ArrowRight size={12} /></span></div><div className="pipeline-value">₹42,600 <small>weighted value</small></div><div className="progress"><span /></div><div className="pipeline-legend"><span>Won <b>₹12,400</b></span><span>In progress <b>₹30,200</b></span></div></div></div>
                <div className="ai-card"><span className="ai-spark"><Sparkles size={16} /></span><div><b>Nexus AI has a suggestion</b><p>3 deals have gone quiet this week. Want me to draft follow-up emails?</p></div><button className="ai-action">Review <ArrowRight size={14} /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip"><p>Trusted by teams who refuse to work in silos</p><div className="logo-row"><b>acme<span>✦</span></b><b>northstar</b><b className="logo-serif">Morrow</b><b>Orbital<span className="logo-circle">◉</span></b><b className="logo-spaced">FIELDWORK</b></div></section>

        <section id="solutions" className="section-pad manifesto reveal"><p className="eyebrow">ONE WORKSPACE. ZERO CHAOS.</p><h2>The tools you need.<br /><span>Nothing you don&apos;t.</span></h2><p className="section-lede">NexusOS brings your projects, customers, calendar and intelligence together — so your team can spend less time switching and more time building.</p></section>

        <section id="resources" className="feature-grid section-pad">{features.map(({ icon: Icon, eyebrow, title, description, className }) => <article key={title} className={`feature-card reveal ${className}`}><div className="feature-icon"><Icon size={21} /></div><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{description}</p><a href="#product">Explore {eyebrow.toLowerCase()} <ArrowRight size={15} /></a></article>)}</section>

        <section id="pricing" className="intelligence-section section-pad reveal"><div><p className="eyebrow">BUILT FOR MOMENTUM</p><h2>When your tools<br /><em>think together,</em><br />your team moves faster.</h2><p className="section-lede">From the first task to the final report, every detail is connected. Give your team the clarity to do their best work.</p><Link href="/login" className="button button-primary">Build your workspace <ArrowRight size={17} /></Link></div><div className="orbit-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><Sparkles size={27} /><span>Nexus<br />AI</span></div><div className="orbit-tag tag-top"><MessageSquareText size={14} /> Draft email</div><div className="orbit-tag tag-right"><FileText size={14} /> Weekly report</div><div className="orbit-tag tag-bottom"><Search size={14} /> Find anything</div></div></section>

        <section className="cta-section section-pad reveal"><div className="cta-grid" /><p className="eyebrow">READY WHEN YOU ARE</p><h2>Make work feel<br /><em>like it flows.</em></h2><p>Start your workspace in minutes. Bring your team, your customers and your next big idea.</p><Link href="/login" className="button button-light">Get started for free <ArrowRight size={17} /></Link></section>
      </main>

      <footer className="site-footer"><div className="brand"><span className="brand-mark">N</span><span>Nexus<span className="brand-muted">OS</span></span></div><p>One workspace for everything that matters.</p><div><a href="#product">Product</a><a href="#solutions">Solutions</a><a href="#resources">Resources</a><Link href="/login">Log in</Link></div><small>© 2026 NexusOS. Built for the next chapter.</small></footer>
    </div>
  );
}

function Metric({ label, value, note, icon }: { label: string; value: string; note: string; icon: React.ReactNode }) {
  return <div className="metric"><div className="metric-title"><span>{label}</span>{icon}</div><b>{value}</b><small>{note}</small></div>;
}

function Task({ title, tag, color }: { title: string; tag: string; color: string }) {
  return <div className="task-row"><span className={`check-circle ${color}`}><Check size={11} /></span><span><b>{title}</b><small>{tag} · Today</small></span><ArrowRight size={13} /></div>;
}

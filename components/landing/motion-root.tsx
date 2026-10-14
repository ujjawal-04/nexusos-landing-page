"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const NAV_OFFSET = 72;

/**
 * Owns every GSAP effect on the page. Lenis smooths the native scroll (no transformed
 * wrapper), so pinning and position: fixed behave normally and scrolling stays on the compositor.
 * Sections stay server-rendered and opt in through data attributes:
 *   data-reveal / data-reveal-stagger   fade up on enter
 *   data-split                          headline line reveal
 *   data-count                          number count-up
 *   data-mock-tilt                      3D tilt that flattens on scroll
 *   data-converge                       scattered tools assemble into one workspace (desktop)
 *   data-pipeline                       pinned deal journey (desktop)
 *   data-steps                          "how it works" progress line
 *   data-magnetic                       buttons that lean toward the pointer
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const nav = document.getElementById("site-nav");
    const mm = gsap.matchMedia();
    let lenis: Lenis | null = null;

    // Always on: navbar state and scroll progress.
    const base = gsap.context(() => {
      ScrollTrigger.create({
        start: 24,
        end: "max",
        onToggle: (self) => nav?.setAttribute("data-scrolled", String(self.isActive)),
      });
      gsap.to("#scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });
    });

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
      },
      (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1,
                stagger: 0.09,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 32,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: Number(el.dataset.reveal) || 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 32,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-mock-tilt]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotateX: 14, transformPerspective: 1800, transformOrigin: "50% 0%", force3D: true },
            {
              rotateX: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 95%", end: "top 25%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const counter = { value: 0 };
          el.textContent = counter.value.toFixed(decimals);
          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = counter.value.toFixed(decimals);
            },
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          });
        });

        const steps = document.querySelector<HTMLElement>("[data-steps]");
        if (steps) {
          gsap.fromTo(
            steps.querySelectorAll("[data-steps-line]"),
            { scaleX: 0, scaleY: 0 },
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: steps, start: "top 70%", end: "bottom 60%", scrub: true },
            },
          );
        }

        if (desktop) {
          setupConverge();
          setupPipeline();
        }
        const cleanupMagnetic = setupMagnetic();

        return () => {
          cleanupMagnetic();
          gsap.ticker.remove(tick);
          lenis?.destroy();
          lenis = null;
        };
      },
    );

    // Pause decorative CSS loops in sections that are off screen.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting)),
      { rootMargin: "100px 0px" },
    );
    document.querySelectorAll("main section, footer").forEach((el) => io.observe(el));

    // Pointer-follow glow on spotlight cards (delegated, rAF-throttled).
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (event.target as Element | null)?.closest<HTMLElement>(".spotlight-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash) return;
      const toTop = hash === "#" || hash === "#top";
      const target = toTop ? null : document.querySelector<HTMLElement>(hash);
      if (!toTop && !target) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target ?? 0, { offset: target ? -NAV_OFFSET : 0, duration: 1.4 });
      } else {
        const top = target ? target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET : 0;
        window.scrollTo({ top, behavior: "smooth" });
      }
      history.replaceState(null, "", toTop ? location.pathname : hash);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("click", onClick);
      mm.revert();
      base.revert();
    };
  }, []);

  return <>{children}</>;
}

/** Pins the "one workspace" section: scattered tool tabs fly in and become NexusOS modules. */
function setupConverge() {
  const section = document.querySelector<HTMLElement>("[data-converge]");
  if (!section) return;
  const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", section);
  const stage = section.querySelector<HTMLElement>("[data-converge-stage]");
  if (!stage || !tiles.length) return;

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=1400",
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  tl.from(
    tiles,
    {
      x: (_, el: HTMLElement) => Number(el.dataset.x) * stage.offsetWidth,
      y: (_, el: HTMLElement) => Number(el.dataset.y) * stage.offsetHeight,
      rotate: (_, el: HTMLElement) => Number(el.dataset.r),
      scale: 0.86,
      duration: 1,
      stagger: 0.04,
    },
    0,
  )
    .from("[data-tile-after]", { autoAlpha: 0, duration: 0.35, stagger: 0.04 }, 0.6)
    .fromTo("[data-tile-before]", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.35, stagger: 0.04 }, 0.6)
    .from("[data-converge-frame]", { autoAlpha: 0, scale: 0.97, duration: 0.4 }, 0.75)
    .from("[data-converge-core]", { autoAlpha: 0, scale: 0.5, duration: 0.4, ease: "back.out(2)" }, 0.85)
    .from("[data-converge-link]", { scaleX: 0, duration: 0.3, stagger: 0.03 }, 1)
    .fromTo("[data-converge-before]", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25 }, 0.55)
    .fromTo("[data-converge-after]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.8)
    .to({}, { duration: 0.3 });
}

/** Pins the pipeline section and walks the highlighted deal through Lead → Won. */
function setupPipeline() {
  const section = document.querySelector<HTMLElement>("[data-pipeline]");
  if (!section) return;
  const deal = section.querySelector<HTMLElement>("[data-deal]");
  const columns = gsap.utils.toArray<HTMLElement>("[data-stage-col]", section);
  const items = gsap.utils.toArray<HTMLElement>("[data-stage-item]", section);
  const wonBadge = section.querySelector<HTMLElement>("[data-deal-won]");
  if (!deal || columns.length < 2) return;

  const setActive = (index: number) =>
    items.forEach((item, i) => item.setAttribute("data-active", String(i === index)));

  const offsetTo = (i: number) => () => columns[i].offsetLeft - columns[0].offsetLeft;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=1500",
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => setActive(Math.min(columns.length - 1, Math.floor(self.progress * columns.length))),
    },
  });

  columns.slice(1).forEach((_, i) => {
    tl.to(deal, { x: offsetTo(i + 1), duration: 1 }).to({}, { duration: 0.35 });
  });
  if (wonBadge) tl.fromTo(wonBadge, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.4 }, "<-0.2");
}

function setupMagnetic() {
  const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.2);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}

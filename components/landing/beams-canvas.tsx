"use client";

import { useEffect, useRef } from "react";

type Pt = [number, number];

const VIEW_W = 1440;
const VIEW_H = 900;
const LINE_COUNT = 26;
const SAMPLES_PER_SEGMENT = 48;
const PULSE_TAIL = 26; // in sample points

// Wavy curves sweeping from bottom-left to top-right (same geometry as the original SVG beams).
function buildLine(i: number): Pt[] {
  const o = i * 19 - 250;
  const l = i * 6;
  const p0: Pt = [-260 + o, 1020 - l];
  const c1: Pt = [120 + o, 860 - l];
  const c2: Pt = [180 + o, 640 - l];
  const p1: Pt = [520 + o, 600 - l];
  const c4: Pt = [960 + o, 470 - l];
  const p2: Pt = [1080 + o, 250 - l];
  const c6: Pt = [1380 + o, -40 - l];
  const p3: Pt = [1760 + o, -140 - l];
  const reflect = (p: Pt, c: Pt): Pt => [2 * p[0] - c[0], 2 * p[1] - c[1]];
  const segments: Pt[][] = [
    [p0, c1, c2, p1],
    [p1, reflect(p1, c2), c4, p2],
    [p2, reflect(p2, c4), c6, p3],
  ];
  const points: Pt[] = [];
  segments.forEach(([a, b, c, d], s) => {
    for (let k = s === 0 ? 0 : 1; k <= SAMPLES_PER_SEGMENT; k++) {
      const t = k / SAMPLES_PER_SEGMENT;
      const u = 1 - t;
      points.push([
        u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
        u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
      ]);
    }
  });
  return points;
}

const LINES = Array.from({ length: LINE_COUNT }, (_, i) => buildLine(i));
const PULSES = LINES.map((points, i) => ({ points, i }))
  .filter(({ i }) => i % 3 === 1)
  .map(({ points, i }) => ({
    points,
    duration: 7 + ((i * 37) % 9),
    phase: ((i * 53) % 13) / 13,
  }));

// cyan → indigo → violet
const STOPS: [number, number, number][] = [
  [34, 211, 238],
  [99, 102, 241],
  [168, 85, 247],
];
function pulseColor(t: number, alpha: number) {
  const x = Math.min(1, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(x));
  const f = x - i;
  const [r, g, b] = STOPS[i].map((v, k) => Math.round(v + (STOPS[i + 1][k] - v) * f));
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * "Background beams" drawn on canvas: static lines are painted once per resize/theme change,
 * and only the small light pulses are redrawn per frame, and only while visible.
 */
export function BeamsCanvas({ theme = "auto", className = "" }: { theme?: "auto" | "dark"; className?: string }) {
  const staticRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const staticCanvas = staticRef.current;
    const pulseCanvas = pulseRef.current;
    const host = staticCanvas?.parentElement;
    if (!staticCanvas || !pulseCanvas || !host) return;
    const sctx = staticCanvas.getContext("2d");
    const pctx = pulseCanvas.getContext("2d");
    if (!sctx || !pctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let scale = 1;
    let ox = 0;
    let oy = 0;
    let dark = true;
    let frame = 0;
    let visible = false;
    let start = performance.now();

    const isDark = () => theme === "dark" || document.documentElement.getAttribute("data-theme") === "dark";

    const map = ([x, y]: Pt): Pt => [x * scale + ox, y * scale + oy];

    const drawStatic = () => {
      dark = isDark();
      sctx.clearRect(0, 0, width, height);
      const g = sctx.createLinearGradient(0, height, width, 0);
      const base = dark ? "255,255,255" : "15,23,42";
      const peak = dark ? 0.08 : 0.07;
      g.addColorStop(0, `rgba(${base},0)`);
      g.addColorStop(0.35, `rgba(${base},${peak})`);
      g.addColorStop(0.75, `rgba(${base},${peak * 0.65})`);
      g.addColorStop(1, `rgba(${base},0)`);
      sctx.strokeStyle = g;
      sctx.lineWidth = 0.7;
      for (const points of LINES) {
        sctx.beginPath();
        points.forEach((p, k) => {
          const [x, y] = map(p);
          if (k === 0) sctx.moveTo(x, y);
          else sctx.lineTo(x, y);
        });
        sctx.stroke();
      }
    };

    const drawPulses = (now: number) => {
      pctx.clearRect(0, 0, width, height);
      pctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      pctx.lineCap = "round";
      const elapsed = (now - start) / 1000;
      for (const pulse of PULSES) {
        const n = pulse.points.length;
        const progress = (elapsed / pulse.duration + pulse.phase) % 1;
        const head = Math.floor(progress * (n + PULSE_TAIL));
        const from = Math.max(0, head - PULSE_TAIL);
        const to = Math.min(n - 1, head);
        if (to - from < 2) continue;
        const [hx, hy] = map(pulse.points[to]);
        const [tx, ty] = map(pulse.points[from]);
        const g = pctx.createLinearGradient(tx, ty, hx, hy);
        const t = to / n;
        g.addColorStop(0, pulseColor(t, 0));
        g.addColorStop(1, pulseColor(t, dark ? 1 : 0.85));
        pctx.strokeStyle = g;
        pctx.beginPath();
        for (let k = from; k <= to; k++) {
          const [x, y] = map(pulse.points[k]);
          if (k === from) pctx.moveTo(x, y);
          else pctx.lineTo(x, y);
        }
        pctx.lineWidth = 4;
        pctx.globalAlpha = 0.25;
        pctx.stroke();
        pctx.lineWidth = 1.6;
        pctx.globalAlpha = 1;
        pctx.stroke();
      }
    };

    const loop = (now: number) => {
      drawPulses(now);
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      if (reduced || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      for (const [canvas, ctx] of [
        [staticCanvas, sctx],
        [pulseCanvas, pctx],
      ] as const) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      // cover-fit the 1440×900 design space (like preserveAspectRatio="xMidYMid slice")
      scale = Math.max(width / VIEW_W, height / VIEW_H);
      ox = (width - VIEW_W * scale) / 2;
      oy = (height - VIEW_H * scale) / 2;
      drawStatic();
      if (!frame) drawPulses(start + 4000);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(host);

    const mo = new MutationObserver(() => {
      if (isDark() !== dark) {
        drawStatic();
        if (!frame) drawPulses(performance.now());
      }
    });
    if (theme === "auto") mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    start = performance.now();
    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme]);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={staticRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={pulseRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

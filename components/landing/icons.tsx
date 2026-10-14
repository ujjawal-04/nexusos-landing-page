import { useId } from "react";

/**
 * NexusOS icon set: 24px duotone glyphs drawn with the brand gradient.
 * `d` = primary strokes, `fill` = soft duotone shapes, `solid` = accent marks.
 */
const glyphs = {
  projects: {
    fill: <rect x="3.5" y="4" width="5" height="16" rx="1.6" />,
    d: (
      <>
        <rect x="3.5" y="4" width="5" height="16" rx="1.6" />
        <rect x="9.5" y="4" width="5" height="11" rx="1.6" />
        <rect x="15.5" y="4" width="5" height="7" rx="1.6" />
      </>
    ),
  },
  pipeline: {
    fill: <path d="M4 5h16l-5.5 6.5V18l-5 2v-8.5z" />,
    d: <path d="M4 5h16l-5.5 6.5V18l-5 2v-8.5z" />,
  },
  ai: {
    fill: <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />,
    d: <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />,
    solid: <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />,
  },
  realtime: {
    d: <path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" />,
    solid: <circle cx="12" cy="12" r="2.2" />,
  },
  team: {
    fill: <circle cx="9" cy="8" r="3.2" />,
    d: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M15.2 4.9a3.2 3.2 0 0 1 0 6.2M17.2 13.9a5.5 5.5 0 0 1 3.3 5.6" />
      </>
    ),
  },
  email: {
    fill: <rect x="3" y="5.5" width="18" height="13" rx="2.5" />,
    d: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3.8 7.5l8.2 5.8 8.2-5.8" />
      </>
    ),
  },
  files: {
    fill: <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z" />,
    d: (
      <>
        <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z" />
        <path d="M14 3v5h5M8.5 13h7M8.5 16.5h4.5" />
      </>
    ),
  },
  shield: {
    fill: <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />,
    d: (
      <>
        <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </>
    ),
  },
  lock: {
    fill: <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />,
    d: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2" />
      </>
    ),
  },
  mailCheck: {
    fill: <rect x="3" y="5.5" width="18" height="13" rx="2.5" />,
    d: (
      <>
        <path d="M21 11V8a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 8v8a2.5 2.5 0 0 0 2.5 2.5H12" />
        <path d="M3.8 7.5l8.2 5.8 8.2-5.8M15 17.5l2 2 4-4" />
      </>
    ),
  },
  key: {
    fill: <circle cx="8" cy="15.5" r="4.2" />,
    d: (
      <>
        <circle cx="8" cy="15.5" r="4.2" />
        <path d="M11 12.5L19.5 4M16 7.5l2.5 2.5M13.8 9.7l1.8 1.8" />
      </>
    ),
  },
  layers: {
    fill: <path d="M12 3l9 4.5-9 4.5-9-4.5z" />,
    d: (
      <>
        <path d="M12 3l9 4.5-9 4.5-9-4.5z" />
        <path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" />
      </>
    ),
  },
  insight: {
    fill: <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />,
    d: (
      <>
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
        <path d="M9.5 19h5M10.5 21.5h3" />
      </>
    ),
  },
  report: {
    fill: <rect x="4" y="3.5" width="16" height="17" rx="2.5" />,
    d: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M8.5 16.5v-3M12 16.5V9M15.5 16.5v-5" />
      </>
    ),
  },
  plus: {
    fill: <rect x="3.5" y="3.5" width="17" height="17" rx="4" />,
    d: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <path d="M12 8.5v7M8.5 12h7" />
      </>
    ),
  },
  invite: {
    fill: <circle cx="10" cy="8" r="3.4" />,
    d: (
      <>
        <circle cx="10" cy="8" r="3.4" />
        <path d="M3.8 20a6.2 6.2 0 0 1 10.6-4.4M18.5 14v6M15.5 17h6" />
      </>
    ),
  },
  grid: {
    fill: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
      </>
    ),
    d: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
      </>
    ),
  },
  command: {
    d: <path d="M9 9V6.5A2.5 2.5 0 1 0 6.5 9H9zm0 0v6m0-6h6m-6 6H6.5A2.5 2.5 0 1 0 9 17.5V15zm0 0h6m0 0v2.5a2.5 2.5 0 1 0 2.5-2.5H15zm0 0V9m0 0V6.5A2.5 2.5 0 1 1 17.5 9H15z" />,
  },
} satisfies Record<string, { d: React.ReactNode; fill?: React.ReactNode; solid?: React.ReactNode }>;

export type IconName = keyof typeof glyphs;

/** Bare gradient glyph. `tone="auto"` follows the page theme; the default suits dark surfaces. */
export function Glyph({
  name,
  className = "size-5",
  tone = "dark",
}: {
  name: IconName;
  className?: string;
  tone?: "dark" | "auto";
}) {
  const id = useId();
  const glyph: { d: React.ReactNode; fill?: React.ReactNode; solid?: React.ReactNode } = glyphs[name];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          {tone === "auto" ? (
            <>
              <stop style={{ stopColor: "var(--glyph-a)" }} />
              <stop offset="0.5" style={{ stopColor: "var(--glyph-b)" }} />
              <stop offset="1" style={{ stopColor: "var(--glyph-c)" }} />
            </>
          ) : (
            <>
              <stop stopColor="#BAE6FD" />
              <stop offset="0.5" stopColor="#93C5FD" />
              <stop offset="1" stopColor="#C4B5FD" />
            </>
          )}
        </linearGradient>
      </defs>
      {glyph.fill && (
        <g fill={`url(#${id})`} fillOpacity="0.28">
          {glyph.fill}
        </g>
      )}
      <g stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {glyph.d}
      </g>
      {glyph.solid && <g fill={`url(#${id})`}>{glyph.solid}</g>}
    </svg>
  );
}

const tileSizes = {
  sm: { tile: "size-8 rounded-[9px]", glyph: "size-4" },
  md: { tile: "size-10 rounded-xl", glyph: "size-5" },
  lg: { tile: "size-12 rounded-[14px]", glyph: "size-6" },
};

/** Glyph on a dark app tile, styled after the NexusOS logo mark. */
export function AppIcon({
  name,
  size = "md",
  className = "",
}: {
  name: IconName;
  size?: keyof typeof tileSizes;
  className?: string;
}) {
  const s = tileSizes[size];
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-b from-[#1b2547] to-[#070a1c] shadow-[0_6px_16px_-6px_rgba(6,8,24,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] ${s.tile} ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent" />
      <Glyph name={name} className={`relative ${s.glyph}`} />
    </span>
  );
}

import { useId } from "react";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  const id = useId();
  const bg = `${id}-bg`;
  const shine = `${id}-shine`;

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={shine} x1="16" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${bg})`} />
      <rect width="32" height="32" rx="8" fill={`url(#${shine})`} />
      <path
        d="M9 24V8h4l6 9.6V8h4v16h-4l-6-9.6V24z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** `tone="dark"` is for dark backgrounds (white wordmark, soft-blue "OS"). */
export function Logo({
  tone = "auto",
  className = "",
}: {
  tone?: "auto" | "dark";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span
        className={`text-[17px] font-semibold tracking-tight ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        Nexus
        <span className={tone === "dark" ? "text-brand-soft" : "text-brand-ink"}>OS</span>
      </span>
    </span>
  );
}

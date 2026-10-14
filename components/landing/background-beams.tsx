import { BeamsCanvas } from "./beams-canvas";

/**
 * Section backdrop: drifting glows, a faint 44px grid, wavy beams and an optional spotlight.
 * `theme="auto"` follows light/dark mode; `theme="dark"` is for always-navy sections.
 */
export function Backdrop({
  spotlight = false,
  theme = "auto",
  beamsClassName = "",
}: {
  spotlight?: boolean;
  theme?: "auto" | "dark";
  beamsClassName?: string;
}) {
  const t = theme === "dark" ? "dark" : "auto";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`glow glow-${t}-blue -left-[15%] top-0 h-[44rem] w-[44rem]`} />
      <div className={`glow glow-${t}-violet -right-[12%] top-[20%] h-[40rem] w-[40rem]`} />
      <div className={`glow glow-${t}-cyan left-[30%] -bottom-[15%] h-[34rem] w-[34rem]`} />
      <div className={`grid-${t} absolute inset-0`} />
      <BeamsCanvas theme={theme} className={beamsClassName} />
      {spotlight && <div className="spotlight" />}
    </div>
  );
}

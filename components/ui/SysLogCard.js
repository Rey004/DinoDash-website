"use client";

/**
 * SysLogCard — the recurring "SYS.LOG" popup from the extension.
 * Black & white only.
 *
 * Props:
 *  - children: the log message
 *  - className: extra classes (positioning, etc.)
 *  - withBattery: shows the small battery icon top-right of the body
 */
export default function SysLogCard({ children, className = "", withBattery = true }) {
  return (
    <div
      className={`relative inline-flex min-w-[260px] max-w-[360px] flex-col border border-white/40 bg-black/85 backdrop-blur-sm ${className}`}
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-white/20 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          {/* traffic lights — kept B/W as outlined dots */}
          <span className="h-2 w-2 rounded-full border border-white/70 bg-white/10" />
          <span className="h-2 w-2 rounded-full border border-white/70 bg-white/10" />
          <span className="h-2 w-2 rounded-full border border-white/70 bg-white/10" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
          sys.log
        </span>
      </div>

      {/* body */}
      <div className="flex items-start gap-2 px-3 py-2.5">
        <span className="select-none font-mono text-[12px] leading-snug text-white/90">{">"}</span>
        <div className="flex-1 font-mono text-[12px] leading-snug text-white/90">
          {children}
        </div>
        {withBattery && <BatteryIcon />}
      </div>
    </div>
  );
}

function BatteryIcon() {
  return (
    <span
      aria-hidden
      className="ml-2 mt-[2px] inline-flex h-3 w-5 shrink-0 items-center justify-end border border-white/70"
      style={{ position: "relative" }}
    >
      <span className="absolute -right-[3px] top-1/2 h-1.5 w-[2px] -translate-y-1/2 bg-white/70" />
      <span className="mr-[2px] inline-block h-[6px] w-[10px] bg-white/80" />
    </span>
  );
}

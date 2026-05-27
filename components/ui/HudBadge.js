"use client";

/**
 * HudBadge — bordered pill used for things like "TODAY'S RUN 0/3" or
 * "HI 00766  00134" in the extension HUD.
 */
export default function HudBadge({ label, value, arrow = false, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-3 border border-white/40 bg-black/70 px-3 py-2 backdrop-blur-sm ${className}`}
    >
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
          {label}
        </span>
      )}
      {value && (
        <span className="font-mono text-sm tracking-[0.15em] text-white">
          {value}
        </span>
      )}
      {arrow && (
        <span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center border border-white/40 text-[10px] text-white/80"
        >
          ›
        </span>
      )}
    </div>
  );
}

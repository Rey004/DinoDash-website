"use client";

/**
 * PressKey — the in-game hint line, e.g.:
 *   Press [ SPACE ] to start · [ ↓ ] to duck under flyers
 *
 * Renders the keycap-styled letter and the surrounding text.
 */
export default function PressKey({ children, k }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.25em] text-white/70">
      <span>press</span>
      <Key>{k}</Key>
      <span>{children}</span>
    </span>
  );
}

export function Key({ children, className = "" }) {
  return (
    <kbd
      className={`inline-flex min-w-[44px] items-center justify-center border border-white/60 bg-white/5 px-2 py-[2px] font-mono text-[11px] tracking-[0.25em] text-white shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)] ${className}`}
    >
      {children}
    </kbd>
  );
}

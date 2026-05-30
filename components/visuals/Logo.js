"use client";

/**
 * Logo
 * Single source of truth for the DinoDash mark.
 * Drop the artwork at public/assets/logo.png and it will render here.
 *
 * Props:
 *  - size: pixel height of the mark (default 28)
 *  - withWordmark: show the "dinodash" text next to the mark
 *  - className: extra classes
 */
export default function Logo({
  size = 28,
  withWordmark = true,
  wordmarkClass = "font-mono text-[11px] uppercase tracking-[0.3em] text-white",
  className = "",
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="relative inline-block shrink-0"
        style={{ width: size, height: size }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand/logo-dark.webp"
          alt="DinoDash logo"
          width={size}
          height={size}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </span>
      {withWordmark && <span className={wordmarkClass}>dinodash</span>}
    </span>
  );
}

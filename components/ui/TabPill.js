"use client";

/**
 * TabPill — fully-rounded pill tabs from the BROWSING MEMORY panel.
 */
export default function TabPill({ label, active = false, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex select-none items-center justify-center rounded-full border px-5 py-1.5 font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
        active
          ? "border-white bg-white text-black"
          : "border-white/30 bg-transparent text-white/70 hover:border-white/60 hover:text-white"
      } ${className}`}
    >
      {label}
    </button>
  );
}

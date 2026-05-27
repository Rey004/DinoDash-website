"use client";

/**
 * Chip — filter chip with a small leading bullet.
 */
export default function Chip({ label, icon, active = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
        active
          ? "border-white bg-white text-black"
          : "border-white/30 bg-transparent text-white/70"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          active ? "bg-black" : "bg-white/70"
        }`}
      />
      {icon && <span className="opacity-70">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}

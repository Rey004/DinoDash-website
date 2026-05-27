"use client";

/**
 * CornerButton — small rounded square buttons used in the bottom corners
 * of the extension UI (history pull, theme, settings, bookmarks, etc.)
 */
export default function CornerButton({ label, children, className = "" }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:border-white hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

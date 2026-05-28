"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — thin progress bar pinned to the bottom edge of the
 * viewport. Width tracks the page's scroll position from 0% (top) to
 * 100% (bottom).
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] h-[3px] bg-white/10"
    >
      <div
        className="h-full bg-white"
        style={{
          width: `${(progress * 100).toFixed(2)}%`,
          transition: "width 80ms linear",
          boxShadow: "0 0 16px rgba(255,255,255,0.55), 0 0 4px rgba(255,255,255,0.85)",
        }}
      />
    </div>
  );
}

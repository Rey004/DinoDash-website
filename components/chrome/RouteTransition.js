"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * RouteTransition — full-screen black overlay that flashes on every
 * route change. Sits above everything else (z-200).
 *
 * Why click-driven instead of pathname-driven:
 *   App Router only updates `usePathname()` after the new route's RSC
 *   payload has streamed in. If we keyed off pathname alone the overlay
 *   would land mid-navigation and feel late. Instead we capture clicks
 *   on internal links, drop the curtain immediately, then dismiss it
 *   when the pathname has committed (with a minimum hold so even fast
 *   transitions feel deliberate).
 */
const MIN_HOLD_MS = 450; // minimum on-screen time
const SAFETY_MS = 4000; // hard timeout in case navigation never fires

export default function RouteTransition() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const enteredAt = useRef(0);
  const safetyTimer = useRef(null);

  // 1) listen for clicks on internal links and show the curtain
  useEffect(() => {
    const onClick = (e) => {
      // only primary clicks, no modifiers
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      if (e.defaultPrevented) return;

      const link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      if (link.target === "_blank") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href) return;

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // external / cross-origin
      if (url.origin !== window.location.origin) return;
      // hash on same path — let SmoothScroller handle it, no curtain
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash
      ) {
        return;
      }
      // same exact url — nothing to do
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        !url.hash
      ) {
        return;
      }

      enteredAt.current = performance.now();
      setTarget(url.pathname);
      setShow(true);

      // safety net — if route change never lands, hide anyway
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => setShow(false), SAFETY_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, []);

  // 2) dismiss the curtain when pathname commits, respecting min hold
  useEffect(() => {
    if (!show) return;
    if (target && pathname !== target) return; // not yet committed
    const elapsed = performance.now() - enteredAt.current;
    const remaining = Math.max(0, MIN_HOLD_MS - elapsed);
    const t = setTimeout(() => setShow(false), remaining);
    return () => clearTimeout(t);
  }, [pathname, show, target]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="route-transition"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          {/* faint grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

          {/* corner ticks */}
          <span className="pointer-events-none absolute left-6 top-6 h-3 w-3 border-l border-t border-white/40" />
          <span className="pointer-events-none absolute right-6 top-6 h-3 w-3 border-r border-t border-white/40" />
          <span className="pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l border-white/40" />
          <span className="pointer-events-none absolute bottom-6 right-6 h-3 w-3 border-b border-r border-white/40" />

          {/* mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/brand/logo-dark.webp"
              alt=""
              draggable={false}
              className="h-10 w-auto object-contain"
            />
            <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] text-white/65">
              loading ·{" "}
              {target === "/" || (!target && pathname === "/")
                ? "home"
                : (target || pathname).replace(/^\//, "")}
            </span>
            {/* scan line */}
            <span className="relative mt-3 inline-block h-px w-32 overflow-hidden bg-white/20">
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 0.9,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-y-0 left-0 block w-1/2 bg-white"
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

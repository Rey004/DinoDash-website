"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * SiteLoader — full-screen intro that runs on the home page.
 *
 * Mounted via the root layout, so it sits above SiteHeader and Act1Boot.
 * Only renders on "/" — every other route returns nothing from the
 * initial state, no DOM, no work.
 *
 * Why state is set synchronously at render:
 *   Reading sessionStorage / Math.random / Date.now during render
 *   causes hydration mismatches. We only branch on `pathname`, which
 *   Next.js gives us identically on server and client, so the initial
 *   markup matches and React doesn't throw the loader away mid-mount.
 *
 * Persistence:
 *   None — the loader runs every full page load. Adding sessionStorage
 *   reintroduced the hydration race; if you want once-per-tab, do it
 *   from inside an effect after first paint, not at render time.
 */
const TOTAL_MS = 3500;
const BOOT_LINES = [
  "> handshake … ok",
  "> theme · dark valley loaded",
  "> physics · 60fps locked",
  "> world · ready",
  "> welcome, runner.",
];

export default function SiteLoader() {
  const pathname = usePathname();
  const [show, setShow] = useState(pathname === "/");
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / TOTAL_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const flashTimer = setTimeout(() => setFlash(true), TOTAL_MS - 240);
    const dismiss = setTimeout(() => setShow(false), TOTAL_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(flashTimer);
      clearTimeout(dismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round(progress * 100);
  const linesVisible = Math.floor(
    Math.min(1, progress / 0.85) * BOOT_LINES.length
  );
  const phase =
    progress < 0.25
      ? "boot"
      : progress < 0.55
      ? "loading world"
      : progress < 0.85
      ? "warming engine"
      : "ready";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="site-loader"
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-none fixed inset-0 z-[210] flex flex-col items-center justify-center overflow-hidden bg-black"
        >
          {/* faint grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
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

          {/* scanlines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
              mixBlendMode: "overlay",
            }}
          />

          {/* moving scan beam */}
          <motion.div
            aria-hidden
            initial={{ y: "-30%" }}
            animate={{ y: "130%" }}
            transition={{
              duration: 1.6,
              ease: "linear",
              repeat: Infinity,
            }}
            className="pointer-events-none absolute inset-x-0 h-40 opacity-60"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            }}
          />

          {/* corner ticks */}
          <span className="pointer-events-none absolute left-5 top-5 h-3 w-3 border-l border-t border-white/40" />
          <span className="pointer-events-none absolute right-5 top-5 h-3 w-3 border-r border-t border-white/40" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b border-l border-white/40" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b border-r border-white/40" />

          {/* corner meta */}
          <div className="absolute left-12 top-5 font-mono text-[9px] uppercase leading-none tracking-[0.5em] text-white/45">
            sys · dinodash
          </div>
          <div className="absolute right-12 top-5 flex items-center gap-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.5em] text-white/45">
            <span className="inline-block h-1 w-1 animate-pulse bg-white/70" />
            online
          </div>
          <div className="absolute right-12 bottom-5 font-mono text-[9px] uppercase leading-none tracking-[0.5em] text-white/45 tabular-nums">
            seed · {Math.floor(progress * 9999).toString().padStart(4, "0")}
          </div>
          <div className="absolute left-12 bottom-5 font-mono text-[9px] uppercase leading-none tracking-[0.5em] text-white/45">
            v0.1 · locally hosted
          </div>

          {/* center stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* logo with breathing glow */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0 rgba(255,255,255,0))",
                  "drop-shadow(0 0 18px rgba(255,255,255,0.25))",
                  "drop-shadow(0 0 0 rgba(255,255,255,0))",
                ],
              }}
              transition={{
                duration: 2.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-dark.webp"
                alt=""
                draggable={false}
                className="h-16 w-auto object-contain sm:h-20"
              />
            </motion.div>

            {/* phase + percentage */}
            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-white/75">
              <span>{phase}</span>
              <span className="inline-block h-1 w-1 rounded-full bg-white/50" />
              <span className="tabular-nums text-white">
                {String(pct).padStart(3, "0")}%
              </span>
              <span className="ml-1 inline-block h-3 w-1 translate-y-[2px] bg-white animate-blink" />
            </div>

            {/* progress bar */}
            <div className="relative mt-5 h-px w-64 overflow-hidden bg-white/15">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 block bg-white"
                style={{ width: `${pct}%` }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 block w-12 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  left: `calc(${pct}% - 24px)`,
                  opacity: pct > 2 && pct < 99 ? 1 : 0,
                }}
              />
            </div>

            {/* boot lines */}
            <ul className="mt-7 w-72 space-y-1 font-mono text-[11px] tracking-[0.05em] text-white/80">
              {BOOT_LINES.slice(0, linesVisible).map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* white flash near the end */}
          <AnimatePresence>
            {flash && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 bg-white"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

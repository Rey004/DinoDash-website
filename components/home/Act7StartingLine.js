"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Act 7 — The Call
 * Minimal CTA section with subtle decorative framing.
 */
export default function Act7StartingLine() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setPressed(true);
        setTimeout(() => setPressed(false), 600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="act7"
      className="relative isolate flex min-h-[80svh] w-full items-center justify-center overflow-hidden bg-ink px-5 py-20 text-paper sm:px-6 sm:py-24"
    >
      {/* corner crop marks on the section itself */}
      <CornerTicks />

      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-2xl text-center">
        {/* badge */}
        <div className="inline-flex items-center gap-2 border border-white/25 bg-black/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.5em] text-white/50 backdrop-blur-sm">
          <span className="inline-block h-1 w-1 animate-pulse bg-white/80" />
          act 07 · the call
        </div>

        {/* dino with floating accent dots */}
        <div className="relative mx-auto mt-10 h-[120px] w-[160px] sm:h-[140px] sm:w-[180px]">
          {/* orbit dots */}
          <FloatDot delay={0} top="14%" left="6%" />
          <FloatDot delay={0.6} top="6%" left="74%" />
          <FloatDot delay={1.1} top="42%" left="92%" />
          <FloatDot delay={0.3} top="58%" left="2%" />

          <motion.div
            animate={pressed ? { y: [0, -52, 0] } : { y: [0, -3, 0] }}
            transition={
              pressed
                ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute inset-x-0 bottom-0 mx-auto h-full w-[120px] sm:w-[140px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/dino/idle-dino.webp"
              alt="DinoDash"
              draggable={false}
              className="h-full w-full object-contain object-bottom"
            />
          </motion.div>
        </div>

        {/* short horizon under dino */}
        <div className="mx-auto mt-1 h-px w-[180px] bg-white/30" />

        {/* headline */}
        <h2 className="mt-10 font-mono text-2xl uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-3xl">
          ready to run?
        </h2>

        {/* decorative double rule above CTA */}
        <DecorRule className="mt-8" />

        {/* CTA */}
        <motion.a
          href="https://chromewebstore.google.com/detail/dinodash-interactive-new/biplgpkmcbidebfejmdkgppgifjpdggi?hl=en&authuser=0"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            setPressed(true);
            setTimeout(() => setPressed(false), 600);
          }}
          whileTap={{ scale: 0.97 }}
          className="btn-press group mt-6 inline-flex items-center gap-3 border border-white bg-white px-7 py-3.5 font-mono text-[13px] uppercase tracking-[0.3em] text-black hover:bg-black hover:text-white"
        >
          add to chrome
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.a>

        {/* decorative double rule below CTA */}
        <DecorRule className="mt-6" mirror />

        {/* tiny hint */}
        <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
          click · or hit space
        </div>
      </div>
    </section>
  );
}

/* ----- decorative pieces ----- */

function CornerTicks() {
  return (
    <>
      <span className="pointer-events-none absolute left-6 top-6 h-3 w-3 border-l border-t border-white/30 sm:left-10 sm:top-10" />
      <span className="pointer-events-none absolute right-6 top-6 h-3 w-3 border-r border-t border-white/30 sm:right-10 sm:top-10" />
      <span className="pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l border-white/30 sm:bottom-10 sm:left-10" />
      <span className="pointer-events-none absolute bottom-6 right-6 h-3 w-3 border-b border-r border-white/30 sm:bottom-10 sm:right-10" />
    </>
  );
}

/* horizontal rule with tick marks and a small diamond at center */
function DecorRule({ className = "", mirror = false }) {
  return (
    <div className={`mx-auto flex w-[min(420px,86%)] items-center gap-3 ${className}`}>
      <Side mirror={mirror} />
      <span
        aria-hidden
        className="block h-1.5 w-1.5 rotate-45 border border-white/50 bg-black"
      />
      <Side mirror={!mirror} />
    </div>
  );
}

function Side({ mirror }) {
  return (
    <div className="relative h-px flex-1 bg-white/25">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`absolute block w-px bg-white/40 ${mirror ? "bottom-0 h-[5px]" : "top-0 h-[5px] -translate-y-full"}`}
          style={{ left: `${(i / 4) * 100}%` }}
        />
      ))}
    </div>
  );
}

function FloatDot({ delay = 0, top, left }) {
  return (
    <motion.span
      aria-hidden
      style={{ top, left }}
      animate={{ y: [0, -8, 0], opacity: [0.3, 0.85, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute block h-1 w-1 rounded-full bg-white/70"
    />
  );
}

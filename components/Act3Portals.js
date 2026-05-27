"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Act 4 — Choose your dimension
 *
 * Two real "open" portals (Dark Valley + Mystic Forest) using the
 * provided artwork, plus a third minimal locked card for the next theme.
 */
export default function Act3Portals() {
  return (
    <section id="act3" className="relative w-full bg-ink text-paper">
      <div className="mx-4 flex items-end justify-between gap-4 pb-8 pt-20 sm:mx-8 sm:gap-6 sm:pb-10 sm:pt-24">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
            act 04
          </div>
          <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
            choose your dimension
          </h2>
        </div>
        <p className="hidden max-w-md font-mono text-sm text-white/60 sm:block">
          each theme is a fully realized world. switch them anytime.
        </p>
      </div>

      <div className="mx-4 grid grid-cols-1 gap-6 pb-20 sm:mx-8 sm:gap-8 sm:pb-24 md:grid-cols-2 lg:grid-cols-3">
        <Portal
          tag="theme · 01"
          title="Dark Valley"
          desc="rain-soaked neon city. the run feels heavier when the sky's open."
          src="/assets/dark-valley.webp"
          dataAsset="act3-dark-valley"
        />
        <Portal
          tag="theme · 02"
          title="Mystic Forest"
          desc="ancient pines breathing slow green light. fireflies for company."
          src="/assets/mystic-forest.webp"
          dataAsset="act3-mystic-forest"
        />
        <LockedPortal />
      </div>
    </section>
  );
}

function Portal({ tag, title, desc, src, dataAsset }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.02]);
  const lift = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.45, 1, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ scale, y: lift }}
      className="group relative aspect-[4/5] overflow-hidden border border-white/15 bg-black sm:aspect-[3/4]"
    >
      {/* artwork */}
      <motion.img
        src={src}
        alt={title}
        data-asset={dataAsset}
        style={{ scale: imgScale, opacity: imgOpacity }}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* readability gradient — heavier at the bottom for the title block */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* corner ticks */}
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-white/40" />

      {/* tag — top-left */}
      <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/30 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.35em] text-white/75 backdrop-blur-sm">
        <span className="inline-block h-1 w-1 rounded-full bg-white/80" />
        {tag}
      </div>

      {/* title block — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-mono text-2xl uppercase tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-sm font-mono text-[11px] leading-relaxed text-white/75">
          {desc}
        </p>
      </div>
    </motion.article>
  );
}

/* MINIMAL LOCKED CARD — no fake mystery glyph, just clean monospace meta */
function LockedPortal() {
  return (
    <article className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-white/15 bg-black p-5 sm:aspect-[3/4]">
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-white/40" />

      {/* tag */}
      <div className="inline-flex w-fit items-center gap-2 border border-white/25 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.35em] text-white/55 backdrop-blur-sm">
        <span className="inline-block h-1 w-1 animate-pulse bg-white/80" />
        theme · ??
      </div>

      {/* center status */}
      <div className="flex flex-1 items-center justify-center">
        <div className="border border-white/30 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.45em] text-white/70">
          locked
        </div>
      </div>

      {/* footer */}
      <div>
        <h3 className="font-mono text-2xl uppercase tracking-tight text-white/80">
          next theme
        </h3>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-white/55">
          the community decides what opens next.
        </p>
        <a
          href="/feedback"
          className="btn-press group mt-4 inline-flex items-center gap-2 border border-white/40 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 hover:border-white hover:text-white"
        >
          vote now
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

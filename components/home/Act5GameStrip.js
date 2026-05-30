"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Act 4 — The Game, On Rails
 *
 * Concept: a two-cell display that uses both sprites side-by-side, each
 * paired with one of the game's defining behaviours. Below: a compact
 * feature list explaining what the game actually does.
 */
const FEATURES = [
  {
    k: "physics",
    v: "60fps · deterministic",
    note: "every run plays the same on every machine.",
  },
  {
    k: "obstacles",
    v: "procedural · seeded",
    note: "no two runs look alike. seeds repeat for replays.",
  },
  {
    k: "save",
    v: "localStorage · forever",
    note: "your high score lives on your device, not in a database.",
  },
  {
    k: "controls",
    v: "space · ↓",
    note: "jump and duck. that's the whole vocabulary.",
  },
];

export default function Act5GameStrip() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // gentle drift on the cell row as the user scrolls
  const stripX = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      id="act4"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-ink py-20 text-paper sm:py-32"
    >
      <div className="mx-4 flex items-end justify-between gap-4 pb-8 sm:mx-8 sm:gap-6 sm:pb-12">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
            act 05
          </div>
          <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
            the game, on rails
          </h2>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:block">
          two states · whole game
        </div>
      </div>

      {/* TWO STATE CELLS */}
      <motion.div
        style={{ x: stripX }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-8"
      >
        <Cell
          number="01"
          state="standby"
          title="press space to begin"
          src="/assets/dino/idle-dino.webp"
        />
        <Cell
          number="02"
          state="run"
          title="hold the line. duck the rest."
          src="/assets/dino/run-dino.webp"
        />
      </motion.div>

      {/* FEATURE LIST */}
      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-px overflow-hidden border border-white/15 bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <FeatureCell key={f.k} {...f} />
        ))}
      </div>
    </section>
  );
}

/* big visual cell with the dino on a horizon line */
function Cell({ number, state, title, src }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden border border-white/15 bg-black">
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-white/40" />

      {/* meta */}
      <div className="absolute left-3 top-3 z-10 font-mono text-[9px] uppercase tracking-[0.4em] text-white/55">
        state · {number}
      </div>
      <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.4em] text-white/55">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
        {state}
      </div>

      {/* horizon */}
      <div className="absolute bottom-[18%] left-6 right-6 h-px bg-white/25" />

      {/* dino anchored to the line */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: "calc(18% - 2px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`DinoDash ${state}`}
          className="w-auto object-contain object-bottom"
          style={{ height: "min(220px, 32vw)" }}
          draggable={false}
        />
      </div>

      {/* caption — bottom strip */}
      <div className="absolute inset-x-3 bottom-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/85">
        {title}
      </div>
    </div>
  );
}

function FeatureCell({ k, v, note }) {
  return (
    <div className="bg-ink p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
        {k}
      </div>
      <div className="mt-1.5 font-mono text-[14px] uppercase tracking-[0.18em] text-white">
        {v}
      </div>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/60">
        {note}
      </p>
    </div>
  );
}

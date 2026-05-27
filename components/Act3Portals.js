"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AssetSlot from "./AssetSlot";
import Rain from "./Rain";
import HudBadge from "./ui/HudBadge";
import SysLogCard from "./ui/SysLogCard";

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
          each theme is a fully realized world. as you scroll, the portals open.
        </p>
      </div>

      <div className="mx-4 grid grid-cols-1 gap-6 pb-20 sm:mx-8 sm:gap-8 sm:pb-24 md:grid-cols-2 lg:grid-cols-3">
        <Portal
          id="dark-valley"
          tag="theme · 01"
          title="Dark Valley"
          desc="rain-soaked neon city. crimson pulse. asphalt sheen. the run feels heavier when it's wet."
          variant="valley"
          syslog="Graphics recalibrated to Dark Valley."
          score="00766"
        />
        <Portal
          id="mystic-forest"
          tag="theme · 02"
          title="Mystic Forest"
          desc="ancient pines breathing slow green light. fireflies as obstacles. a quieter kind of run."
          variant="forest"
          syslog="Score: 100. Acceleration levels dangerous!"
          score="00134"
        />
        <Portal id="locked" tag="theme · ??" title="?" desc="" variant="locked" />
      </div>
    </section>
  );
}

function Portal({ id, tag, title, desc, variant, syslog, score }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const open = useTransform(scrollYProgress, [0, 0.55, 1], [0.3, 1, 1]);
  const dinoX = useTransform(scrollYProgress, [0.25, 0.85], [-60, 0]);
  const dinoOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const parallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const isLocked = variant === "locked";

  return (
    <motion.article
      ref={ref}
      style={{ scale, y: lift }}
      className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-black sm:aspect-[3/4]"
    >
      <motion.div style={{ y: parallax, opacity: open }} className="absolute inset-0">
        {variant === "valley" && <ValleyBackdrop />}
        {variant === "forest" && <ForestBackdrop />}
        {variant === "locked" && <LockedBackdrop />}
      </motion.div>

      {!isLocked && (
        <div className="absolute bottom-[14%] left-0 right-0 h-px bg-white/30" />
      )}

      {!isLocked && (
        <motion.div
          style={{ x: dinoX, opacity: dinoOpacity }}
          className="absolute bottom-[14%] left-1/2 -translate-x-1/2"
        >
          <AssetSlot
            id={`act3-dino-${id}`}
            className="h-[26%] min-h-[140px] w-[180px] border-0"
          >
            dino · walk
          </AssetSlot>
        </motion.div>
      )}

      {/* in-portal HUD, mirroring the extension */}
      {!isLocked && (
        <>
          <div className="absolute right-3 top-3">
            <HudBadge label="hi" value={score} />
          </div>
          {syslog && (
            <div className="absolute left-1/2 top-3 -translate-x-1/2">
              <SysLogCard className="min-w-0 max-w-[78%]">{syslog}</SysLogCard>
            </div>
          )}
        </>
      )}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
        {tag}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-mono text-2xl uppercase tracking-tight text-white">
          {isLocked ? "?" : title}
        </h3>
        {!isLocked && (
          <p className="mt-2 max-w-sm font-mono text-xs leading-relaxed text-white/70">
            {desc}
          </p>
        )}
        {isLocked && (
          <p className="mt-2 max-w-sm font-mono text-xs leading-relaxed text-white/70">
            community vote decides what opens next.
          </p>
        )}
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border border-white/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.4em] text-white/80">
            locked · vote to unlock
          </div>
        </div>
      )}
    </motion.article>
  );
}

function ValleyBackdrop() {
  return (
    <div className="absolute inset-0">
      <AssetSlot id="act3-valley-bg" className="absolute inset-0 border-0">
        dark valley · neon city silhouette
      </AssetSlot>
      <Rain density={70} opacity={0.35} seed={7} />
      <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 animate-breathe" />
    </div>
  );
}

function ForestBackdrop() {
  return (
    <div className="absolute inset-0">
      <AssetSlot id="act3-forest-bg" className="absolute inset-0 border-0">
        mystic forest · pines + fireflies
      </AssetSlot>
      <Fireflies />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 animate-breathe" />
    </div>
  );
}

function LockedBackdrop() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-mono text-[160px] leading-none text-white/20">?</div>
      </div>
    </div>
  );
}

function Fireflies() {
  const dots = Array.from({ length: 24 }).map((_, i) => {
    const left = (i * 53.7) % 100;
    const top = (i * 31.3) % 100;
    const dur = 4 + ((i * 7) % 5);
    return { left, top, dur, key: i };
  });
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((d) => (
        <span
          key={d.key}
          className="absolute h-1 w-1 rounded-full bg-white/80"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            animation: `breathe ${d.dur}s ease-in-out ${d.key * 0.13}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

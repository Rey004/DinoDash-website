"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rain from "../visuals/Rain";
import SysLogCard from "../ui/SysLogCard";
import HudBadge from "../ui/HudBadge";
import CornerButton from "../ui/CornerButton";
import { Key } from "../ui/PressKey";

const LINES = [
  "> initializing DinoDash...",
  "> loading Dark Valley theme...",
  "> Welcome back, runner. System ready.",
];

export default function Act1Boot() {
  const [shown, setShown] = useState([""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [showLog, setShowLog] = useState(true);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= LINES.length) {
      setDone(true);
      // hide the log immediately when typing is done
      setShowLog(false);
      return;
    }
    const current = LINES[lineIdx];
    if (charIdx <= current.length) {
      const tick = setTimeout(
        () => {
          setShown((arr) => {
            const next = [...arr];
            next[lineIdx] = current.slice(0, charIdx);
            return next;
          });
          setCharIdx((c) => c + 1);
        },
        18 + (charIdx === 0 ? 220 : 0)
      );
      return () => clearTimeout(tick);
    }
    const advance = setTimeout(() => {
      setShown((arr) => [...arr, ""]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 320);
    return () => clearTimeout(advance);
  }, [charIdx, lineIdx, done]);

  return (
    <section
      id="act1"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* CINEMATIC BACKDROP — shown from the start, brightens once boot completes */}
      <motion.div
        initial={{ opacity: 0.4, scale: 1.06 }}
        animate={{ opacity: done ? 1 : 0.55, scale: done ? 1 : 1.04 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src="/assets/scenery/background.webp"
          alt=""
          data-asset="act1-skyline-bg"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(1.4) contrast(1.15) brightness(1.05)" }}
          draggable={false}
        />
        <Rain density={90} opacity={0.4} seed={11} />
        {/* horizon */}
        <div className="absolute bottom-[14%] left-0 right-0 h-px bg-white/30" />
        {/* dino — small idle, feet on the horizon */}
        <div
          className="absolute left-[10%] h-[18vh] min-h-[120px] w-auto"
          style={{ bottom: "calc(14% - 4px)" }}
          data-asset="act1-dino"
        >
          <img
            src="/assets/dino/idle-dino.webp"
            alt="DinoDash dino, idle stance"
            className="h-full w-full object-contain object-bottom"
            draggable={false}
          />
        </div>
        {/* vignette + readability gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* faint scanlines */}
      <div className="scanlines absolute inset-0" aria-hidden />

      {/* HERO CENTERPIECE */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-20 text-center sm:px-6 sm:pb-32 sm:pt-24 md:px-10">
        {/* SYS.LOG — types out, then fades away once done */}
        <AnimatePresence>
          {showLog && (
            <motion.div
              key="syslog"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <SysLogCard>
                <div className="flex flex-col gap-1">
                  {(done ? LINES.map((l) => l.replace(/^>\s?/, "")) : shown).map(
                    (ln, i) => {
                      const isCurrent = !done && i === lineIdx;
                      const text = done
                        ? ln
                        : (ln || "").replace(/^>\s?/, "");
                      return (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-white/50">{">"}</span>
                          <span className="text-white/90">{text}</span>
                          {isCurrent && (
                            <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-[2px] bg-white animate-blink" />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </SysLogCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAGLINE PILL — appears after boot finishes */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 border border-white/30 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm"
        >
          <span className="inline-block h-2 w-2 animate-pulse bg-white" />
          chrome new tab · reimagined
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="font-mono text-3xl uppercase leading-[1.1] tracking-[0.04em] text-white glow-text sm:text-5xl md:text-6xl"
        >
          your new tab,
          <br />
          <span className="text-white/95">transformed.</span>
        </motion.h1>

        {/* SUBHEADING */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/70 sm:text-[15px]"
        >
          DinoDash turns the dead Chrome new tab into a cinematic dino runner.
          Browsing memory, daily streaks, and a world that breathes — all
          locally on your device.
        </motion.p>

        {/* CTA ROW */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          <a
            href="#act7"
            className="btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
          >
            add to chrome
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#act2"
            className="btn-press inline-flex items-center gap-2 border border-white/40 bg-black/40 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm hover:border-white hover:text-white"
          >
            see the difference
          </a>
        </motion.div>

      </div>

      {/* TODAY'S RUN HUD — desktop only, would crowd mobile hero */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.25, x: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute right-6 top-20 z-30 hidden sm:right-10 md:block"
      >
        <HudBadge label="today's run" value="0/3" arrow />
      </motion.div>

      {/* CORNER CONTROLS — desktop only */}
      <div className="group/corner absolute bottom-5 left-6 z-30 hidden items-center gap-2 opacity-25 transition-opacity hover:opacity-100 sm:left-10 md:flex">
        <CornerButton label="bookmarks">★</CornerButton>
        <CornerButton label="reactions">♡</CornerButton>
        <div className="ml-2 inline-flex h-9 items-center gap-2 rounded-full border border-white/30 bg-black/70 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          enhanced mode
        </div>
      </div>
      <div className="absolute bottom-5 right-6 z-30 hidden items-center gap-2 opacity-25 transition-opacity hover:opacity-100 sm:right-10 md:flex">
        <CornerButton label="memory">▥</CornerButton>
        <CornerButton label="theme">◐</CornerButton>
        <CornerButton label="settings">⚙</CornerButton>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
        <div className="flex flex-col items-center gap-2">
          <span>scroll</span>
          <span className="h-8 w-px animate-pulse bg-white/60" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  DummyLogo,
  DummyTodaysRun,
  DummySyslog,
  DummySearch,
  DummyMemoryPanel,
  DummyCornerLeft,
  DummyCornerRight,
} from "./ui/DummyWidgets";

/**
 * Act 3 — The Anatomy
 *
 * Two-column layout: preview frame on the left, sticky info column on
 * the right. The preview frame contains seven non-overlapping widget
 * slots. As you scroll, exactly one widget is highlighted at full
 * opacity; the rest fade to ~12%.
 *
 * Each widget is a `Spot` placeholder. To swap with a real screenshot,
 * replace its `<DummyXxx />` child with an `<img>` (see ASSETS.md for
 * the cropping notes per slot).
 */
export default function Act5ExplodedTab() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const STEPS = [
    {
      key: "syslog",
      title: "the sys.log",
      body:
        "the dashboard talks to you. greetings, score milestones, theme changes — all in-game style.",
    },
    {
      key: "todays-run",
      title: "today's run",
      body: "a tiny daily streak target lives in the corner. a nudge, never a guilt trip.",
    },
    {
      key: "search",
      title: "the prompt",
      body:
        "press SPACE and the search bar becomes the starting line. one keystroke from search to sprint.",
    },
    {
      key: "memory",
      title: "browsing memory",
      body:
        "every site you've visited, instantly searchable. by category, by hour, by anchor.",
    },
    {
      key: "logo",
      title: "the brand strip",
      body: "the dinodash mark in the corner — quiet, not shouting. it's your tab now.",
    },
    {
      key: "corners",
      title: "quick controls",
      body:
        "bookmarks, reactions, memory, theme, settings. everything one click away in the corners.",
    },
  ];

  const stepIdx = useTransform(scrollYProgress, [0.05, 0.95], [0, STEPS.length - 0.001]);
  const stepWeight = (i) =>
    useTransform(stepIdx, [i - 0.55, i, i + 0.55], [0, 1, 0]);

  const wSyslog = stepWeight(0);
  const wTodays = stepWeight(1);
  const wSearch = stepWeight(2);
  const wMemory = stepWeight(3);
  const wLogo = stepWeight(4);
  const wCorners = stepWeight(5);

  return (
    <section
      id="act5"
      ref={ref}
      className="relative w-full bg-ink text-paper"
      style={{ height: "260svh" }}
    >
      <div className="sticky top-0 flex min-h-[100svh] w-full flex-col">
        {/* Header — flush with screen edges */}
        <div className="mx-4 flex items-end justify-between gap-4 pb-6 pt-20 sm:mx-8 sm:gap-6 sm:pt-24">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
              act 03
            </div>
            <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
              the anatomy
            </h2>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:block">
            scroll to explore
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-4 pb-10 sm:px-8 sm:gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          {/* LEFT — preview frame */}
          <div className="relative w-full">
            <div
              className="relative w-full overflow-hidden border border-white/15 bg-black"
              style={{ aspectRatio: "1919 / 1021" }}
            >
              <img
                src="/assets/dino-new-tab.webp"
                alt="DinoDash new tab"
                data-asset="act5-tab-screenshot"
                className="absolute inset-0 h-full w-full object-cover object-center blur-sm"
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Widgets — non-overlapping bounding boxes, smaller */}
              <div className="pointer-events-none absolute inset-0">
                {/* Top row */}
                <Spot
                  weight={wLogo}
                  className="absolute left-[2%] top-[4%] h-[8%] w-[12%]"
                  data-asset="act5-logo"
                >
                  <DummyLogo />
                </Spot>

                <Spot
                  weight={wSyslog}
                  className="absolute left-1/2 top-[4%] h-[14%] w-[22%] -translate-x-1/2"
                  data-asset="act5-syslog"
                >
                  <DummySyslog />
                </Spot>

                <Spot
                  weight={wTodays}
                  className="absolute right-[2%] top-[4%] h-[8%] w-[14%]"
                  data-asset="act5-todays-run"
                >
                  <DummyTodaysRun />
                </Spot>

                {/* Middle row */}
                <Spot
                  weight={wSearch}
                  className="absolute left-[18%] top-[38%] h-[28%] w-[40%]"
                  data-asset="act5-search"
                >
                  <DummySearch />
                </Spot>

                <Spot
                  weight={wMemory}
                  className="absolute right-[2%] top-[26%] h-[52%] w-[22%]"
                  data-asset="act5-memory-panel"
                >
                  <DummyMemoryPanel />
                </Spot>

                {/* Bottom row */}
                <Spot
                  weight={wCorners}
                  className="absolute bottom-[4%] left-[2%] h-[8%] w-[24%]"
                  data-asset="act5-corner-left"
                >
                  <DummyCornerLeft />
                </Spot>

                <Spot
                  weight={wCorners}
                  className="absolute bottom-[4%] left-[28%] h-[8%] w-[14%]"
                  data-asset="act5-corner-right"
                >
                  <DummyCornerRight />
                </Spot>
              </div>
            </div>
          </div>

          {/* RIGHT — info column */}
          <div className="relative w-full">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              the pieces
            </div>

            <div className="relative mt-3 min-h-[200px]">
              {STEPS.map((s, i) => (
                <StepCaption
                  key={s.key}
                  index={i}
                  total={STEPS.length}
                  weight={[wSyslog, wTodays, wSearch, wMemory, wLogo, wCorners][i]}
                  title={s.title}
                  body={s.body}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <StepDot
                  key={s.key}
                  weight={[wSyslog, wTodays, wSearch, wMemory, wLogo, wCorners][i]}
                />
              ))}
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                {STEPS.length} pieces
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Spot — positioned widget cell. Brightens when its `weight` is 1
 * (highlighted), drops to ~12% otherwise.
 */
function Spot({ children, className = "", weight, ...rest }) {
  // non-active widgets fade out completely; only the highlighted one shows
  const opacity = useTransform(weight, [0, 0.4, 1], [0, 0.05, 1]);
  const scale = useTransform(weight, [0, 1], [0.98, 1.04]);
  const glow = useTransform(
    weight,
    [0, 1],
    [
      "drop-shadow(0 0 0 rgba(255,255,255,0))",
      "drop-shadow(0 8px 22px rgba(255,255,255,0.25))",
    ]
  );
  return (
    <motion.div style={{ opacity }} className={className} {...rest}>
      <motion.div style={{ scale, filter: glow }} className="h-full w-full origin-center">
        {children}
      </motion.div>
    </motion.div>
  );
}

function StepCaption({ index, total, weight, title, body }) {
  const opacity = useTransform(weight, [0.5, 0.9, 1], [0, 1, 1]);
  const y = useTransform(weight, [0.5, 1], [10, 0]);
  const idx = String(index + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        <span>{idx}</span>
        <span className="h-px w-6 bg-white/30" />
        <span>{tot}</span>
      </div>
      <h3 className="mt-3 font-mono text-2xl uppercase tracking-tight text-white sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-white/70 sm:text-[15px]">
        {body}
      </p>
    </motion.div>
  );
}

function StepDot({ weight }) {
  const w = useTransform(weight, [0, 1], [12, 32]);
  const o = useTransform(weight, [0, 1], [0.25, 1]);
  return <motion.span style={{ width: w, opacity: o }} className="block h-[2px] bg-white" />;
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Act2Curtain() {
  const wrapRef = useRef(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  const onMove = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const mm = (e) => onMove(e.clientX);
    const tm = (e) => e.touches[0] && onMove(e.touches[0].clientX);
    const up = () => setDragging(false);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, onMove]);

  // tiny initial nudge so users notice the handle is interactive
  useEffect(() => {
    const t1 = setTimeout(() => setPct(62), 900);
    const t2 = setTimeout(() => setPct(50), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
  };

  return (
    <section id="act2" className="relative min-h-[100svh] w-full bg-ink text-paper">
      <SectionHeader index="02" title="the contrast" subtitle="drag to feel it" />

      <div
        ref={wrapRef}
        className="relative mx-auto mb-10 mt-10 w-full max-w-5xl select-none overflow-hidden border border-white/15 bg-black sm:mt-16"
        style={{ aspectRatio: "1919 / 1021" }}
      >
        {/* LEFT — default Chrome new tab screenshot */}
        <div className="absolute inset-0 bg-white">
          <img
            src="/assets/default-new-tab.webp"
            alt="Default Chrome new tab"
            data-asset="act2-default-tab"
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>

        {/* RIGHT — DinoDash new tab screenshot, clipped by pct */}
        <div
          className="absolute inset-0 overflow-hidden bg-black"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          aria-hidden
        >
          <img
            src="/assets/dino-new-tab.webp"
            alt="DinoDash new tab"
            data-asset="act2-dino-tab"
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>

        {/* labels */}
        <div className="pointer-events-none absolute left-4 top-4 z-20 inline-flex items-center gap-2 border border-black/30 bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-black/80 backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
          before · default new tab
        </div>
        <div className="pointer-events-none absolute right-4 top-4 z-20 inline-flex items-center gap-2 border border-white/40 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
          after · dinodash
        </div>

        {/* divider + handle */}
        <div
          className="absolute inset-y-0 z-30 w-[2px] bg-white"
          style={{ left: `calc(${pct}% - 1px)` }}
        />
        <button
          type="button"
          aria-label="Drag to compare"
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          onKeyDown={onKey}
          className={`absolute z-40 -translate-x-1/2 -translate-y-1/2 select-none border border-white bg-black text-white shadow-[0_0_0_4px_rgba(0,0,0,0.6)] focus:outline-none ${
            dragging ? "scale-[1.06]" : ""
          }`}
          style={{
            left: `${pct}%`,
            top: "50%",
            width: 56,
            height: 56,
            borderRadius: 9999,
            transition: "transform 120ms ease",
            cursor: "ew-resize",
          }}
        >
          <span className="flex h-full w-full items-center justify-center font-mono text-base">
            ‹ ›
          </span>
        </button>
      </div>

      <div className="mx-auto mb-24 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 sm:px-0">
        <p className="max-w-xl font-mono text-sm leading-relaxed text-white/70">
          the default new tab is a blank stare. dinodash gives it weather, motion, and a heartbeat.
        </p>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          drag · arrow keys
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ index, title, subtitle }) {
  return (
    <div className="mx-4 flex items-end justify-between gap-4 pb-6 pt-20 sm:mx-8 sm:gap-6 sm:pt-24">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
          act {index}
        </div>
        <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:block">
          {subtitle}
        </div>
      )}
    </div>
  );
}

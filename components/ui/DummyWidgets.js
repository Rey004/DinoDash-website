"use client";

import { useEffect, useState } from "react";

/**
 * DummyWidgets — minimal placeholder content for Act 3.
 * Just a thin border + the gist of each widget. No corner ticks,
 * no scanlines, no decoration.
 */

function Frame({ children, className = "" }) {
  return (
    <div
      className={`h-full w-full overflow-hidden border border-white/40 bg-black/85 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* --------- logo strip --------- */
export function DummyLogo() {
  return (
    <Frame>
      <div className="flex h-full items-center gap-1.5 px-2">
        <span className="inline-block h-3 w-3 border border-white/70" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/85">
          dinodash
        </span>
      </div>
    </Frame>
  );
}

/* --------- today's run hud --------- */
export function DummyTodaysRun() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v + 1) % 4), 1300);
    return () => clearInterval(t);
  }, []);
  return (
    <Frame>
      <div className="flex h-full items-center justify-between gap-1.5 px-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
          run
        </span>
        <span className="font-mono text-[12px] tracking-[0.15em] text-white">
          {n}/3
        </span>
        <span className="font-mono text-[10px] text-white/70">›</span>
      </div>
    </Frame>
  );
}

/* --------- sys.log popup --------- */
export function DummySyslog() {
  return (
    <Frame>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/15 px-2 py-1">
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full border border-white/70" />
            <span className="h-1 w-1 rounded-full border border-white/70" />
            <span className="h-1 w-1 rounded-full border border-white/70" />
          </div>
          <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/55">
            sys.log
          </span>
        </div>
        <div className="flex flex-1 items-center gap-1.5 px-2">
          <span className="font-mono text-[10px] text-white/55">{">"}</span>
          <span className="flex-1">
            <ShimmerLine width="80%" height={4} />
            <span className="mt-1 block">
              <ShimmerLine width="55%" height={4} delay="0.2s" />
            </span>
          </span>
          <span className="inline-block h-2.5 w-[2px] bg-white/80 animate-blink" />
        </div>
      </div>
    </Frame>
  );
}

/* --------- search bar centerpiece --------- */
export function DummySearch() {
  return (
    <Frame className="border-white/25">
      <div className="flex h-full flex-col items-center justify-center gap-2 px-3">
        <div className="font-mono text-[18px] uppercase tracking-[0.2em] text-white/80">
          Google
        </div>
        <div className="flex w-full items-center gap-1.5 rounded-full border border-white/40 bg-black/60 px-3 py-1">
          <span className="font-mono text-[10px] text-white/50">⌕</span>
          <span className="flex-1">
            <ShimmerLine width="60%" height={3} />
          </span>
          <span className="inline-block h-2 w-px bg-white/80 animate-blink" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-white/45">
          press
          <kbd className="inline-flex min-w-[28px] items-center justify-center border border-white/60 bg-white/5 px-1 py-px text-[7px] tracking-[0.2em]">
            SPACE
          </kbd>
          to start
        </div>
      </div>
    </Frame>
  );
}

/* --------- browsing memory panel --------- */
export function DummyMemoryPanel() {
  return (
    <Frame>
      <div className="flex h-full flex-col gap-2 p-2">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">
          memory
        </div>
        <div className="flex gap-1">
          <span className="rounded-full border border-white bg-white px-2 py-px font-mono text-[7px] uppercase tracking-[0.25em] text-black">
            history
          </span>
          <span className="rounded-full border border-white/30 px-2 py-px font-mono text-[7px] uppercase tracking-[0.25em] text-white/55">
            stats
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 shrink-0 border border-white/30" />
              <div className="flex-1 space-y-0.5">
                <ShimmerLine width={`${72 - i * 8}%`} height={3} delay={`${i * 0.08}s`} />
                <ShimmerLine width={`${42 - i * 5}%`} height={2} delay={`${i * 0.12}s`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* --------- bottom-left corner — bookmarks · likes · enhanced mode --------- */
export function DummyCornerLeft() {
  return (
    <Frame>
      <div className="flex h-full items-center gap-1 px-1.5">
        <Btn>★</Btn>
        <Btn>♡</Btn>
        <span className="ml-0.5 inline-flex h-5 items-center gap-1 rounded-full border border-white/30 px-1.5 font-mono text-[7px] uppercase tracking-[0.25em] text-white/75">
          <span className="inline-block h-1 w-1 rounded-full bg-white animate-pulse" />
          enhanced
        </span>
      </div>
    </Frame>
  );
}

/* --------- bottom-right corner — memory · theme · settings --------- */
export function DummyCornerRight() {
  return (
    <Frame>
      <div className="flex h-full items-center justify-end gap-1 px-1.5">
        <Btn>▥</Btn>
        <Btn>◐</Btn>
        <Btn>⚙</Btn>
      </div>
    </Frame>
  );
}

function Btn({ children }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center border border-white/40 text-[9px] text-white/75">
      {children}
    </span>
  );
}

/* --------- shared shimmer line --------- */
function ShimmerLine({ width = "60%", height = 4, delay = "0s" }) {
  return (
    <span
      className="block bg-white/15"
      style={{
        width,
        height,
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.05) 100%)",
        backgroundSize: "200% 100%",
        animation: `shimmer 1.8s linear ${delay} infinite`,
      }}
    />
  );
}

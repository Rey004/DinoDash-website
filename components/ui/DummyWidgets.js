"use client";

import { useEffect, useState } from "react";

/**
 * DummyWidgets — minimal placeholder content for Act 3.
 * Sizes scale down at small breakpoints so the widgets stay legible
 * inside a smaller preview frame on phones and tablets.
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
      <div className="flex h-full items-center gap-1 px-1 sm:gap-1.5 sm:px-2">
        <span className="inline-block h-2 w-2 border border-white/70 sm:h-3 sm:w-3" />
        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/85 sm:text-[9px] sm:tracking-[0.3em]">
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
      <div className="flex h-full items-center justify-between gap-1 px-1.5 sm:gap-1.5 sm:px-2">
        <span className="font-mono text-[6px] uppercase tracking-[0.25em] text-white/60 sm:text-[8px] sm:tracking-[0.3em]">
          run
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-white sm:text-[12px] sm:tracking-[0.15em]">
          {n}/3
        </span>
        <span className="font-mono text-[8px] text-white/70 sm:text-[10px]">›</span>
      </div>
    </Frame>
  );
}

/* --------- sys.log popup --------- */
export function DummySyslog() {
  return (
    <Frame>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/15 px-1.5 py-0.5 sm:px-2 sm:py-1">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <span className="h-[2px] w-[2px] rounded-full border border-white/70 sm:h-1 sm:w-1" />
            <span className="h-[2px] w-[2px] rounded-full border border-white/70 sm:h-1 sm:w-1" />
            <span className="h-[2px] w-[2px] rounded-full border border-white/70 sm:h-1 sm:w-1" />
          </div>
          <span className="font-mono text-[5px] uppercase tracking-[0.25em] text-white/55 sm:text-[7px] sm:tracking-[0.3em]">
            sys.log
          </span>
        </div>
        <div className="flex flex-1 items-center gap-1 px-1.5 sm:gap-1.5 sm:px-2">
          <span className="font-mono text-[8px] text-white/55 sm:text-[10px]">{">"}</span>
          <span className="flex-1">
            <ShimmerLine width="80%" height={3} />
            <span className="mt-0.5 block sm:mt-1">
              <ShimmerLine width="55%" height={3} delay="0.2s" />
            </span>
          </span>
          <span className="inline-block h-2 w-px bg-white/80 animate-blink sm:h-2.5 sm:w-[2px]" />
        </div>
      </div>
    </Frame>
  );
}

/* --------- search bar centerpiece --------- */
export function DummySearch() {
  return (
    <Frame className="border-white/25">
      <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 sm:gap-2 sm:px-3">
        <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/80 sm:text-[18px] sm:tracking-[0.2em]">
          Google
        </div>
        <div className="flex w-full items-center gap-1 rounded-full border border-white/40 bg-black/60 px-2 py-0.5 sm:gap-1.5 sm:px-3 sm:py-1">
          <span className="font-mono text-[8px] text-white/50 sm:text-[10px]">⌕</span>
          <span className="flex-1">
            <ShimmerLine width="60%" height={2} />
          </span>
          <span className="inline-block h-1.5 w-px bg-white/80 animate-blink sm:h-2" />
        </div>
        <div className="flex items-center gap-1 font-mono text-[6px] uppercase tracking-[0.2em] text-white/45 sm:gap-1.5 sm:text-[8px] sm:tracking-[0.25em]">
          press
          <kbd className="inline-flex min-w-[20px] items-center justify-center border border-white/60 bg-white/5 px-0.5 py-px text-[5px] tracking-[0.15em] sm:min-w-[28px] sm:px-1 sm:text-[7px] sm:tracking-[0.2em]">
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
      <div className="flex h-full flex-col gap-1.5 p-1.5 sm:gap-2 sm:p-2">
        <div className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/80 sm:text-[9px] sm:tracking-[0.25em]">
          memory
        </div>
        <div className="flex gap-0.5 sm:gap-1">
          <span className="rounded-full border border-white bg-white px-1.5 py-px font-mono text-[5px] uppercase tracking-[0.2em] text-black sm:px-2 sm:text-[7px] sm:tracking-[0.25em]">
            history
          </span>
          <span className="rounded-full border border-white/30 px-1.5 py-px font-mono text-[5px] uppercase tracking-[0.2em] text-white/55 sm:px-2 sm:text-[7px] sm:tracking-[0.25em]">
            stats
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-hidden sm:gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1 sm:gap-1.5">
              <span className="inline-block h-2 w-2 shrink-0 border border-white/30 sm:h-3 sm:w-3" />
              <div className="flex-1 space-y-0.5">
                <ShimmerLine width={`${72 - i * 8}%`} height={2} delay={`${i * 0.08}s`} />
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
      <div className="flex h-full items-center gap-0.5 px-1 sm:gap-1 sm:px-1.5">
        <Btn>★</Btn>
        <Btn>♡</Btn>
        <span className="ml-0.5 inline-flex h-3.5 items-center gap-0.5 rounded-full border border-white/30 px-1 font-mono text-[5px] uppercase tracking-[0.2em] text-white/75 sm:h-5 sm:gap-1 sm:px-1.5 sm:text-[7px] sm:tracking-[0.25em]">
          <span className="inline-block h-[3px] w-[3px] rounded-full bg-white animate-pulse sm:h-1 sm:w-1" />
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
      <div className="flex h-full items-center justify-end gap-0.5 px-1 sm:gap-1 sm:px-1.5">
        <Btn>▥</Btn>
        <Btn>◐</Btn>
        <Btn>⚙</Btn>
      </div>
    </Frame>
  );
}

function Btn({ children }) {
  return (
    <span className="inline-flex h-3.5 w-3.5 items-center justify-center border border-white/40 text-[6px] text-white/75 sm:h-5 sm:w-5 sm:text-[9px]">
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

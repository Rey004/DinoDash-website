"use client";

import { useEffect, useState } from "react";

/**
 * ErrorScreen — shared UI for both 404 and runtime errors.
 *
 * Styled as a DinoDash SYS.LOG crash dump:
 *   - giant ghost code in the background (404 / 500)
 *   - small bordered card with status, message, and a typewriter detail
 *   - two action buttons (primary + secondary)
 *
 * Either action can be a link (`href`) or a callback (`onClick`).
 */
export default function ErrorScreen({
  code,
  status,
  message,
  detail,
  digest,
  primary,
  secondary,
}) {
  return (
    <main className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink px-6 py-24 text-paper">
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

      {/* giant ghost code */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-mono uppercase leading-[0.85] tracking-[-0.02em] text-white/[0.05]"
        style={{ fontSize: "clamp(140px, 32vw, 460px)" }}
      >
        {code}
      </span>

      {/* corner crop marks */}
      <span className="pointer-events-none absolute left-6 top-6 h-3 w-3 border-l border-t border-white/30 sm:left-10 sm:top-10" />
      <span className="pointer-events-none absolute right-6 top-6 h-3 w-3 border-r border-t border-white/30 sm:right-10 sm:top-10" />
      <span className="pointer-events-none absolute bottom-6 left-6 h-3 w-3 border-b border-l border-white/30 sm:bottom-10 sm:left-10" />
      <span className="pointer-events-none absolute bottom-6 right-6 h-3 w-3 border-b border-r border-white/30 sm:bottom-10 sm:right-10" />

      {/* card */}
      <div className="relative w-full max-w-xl">
        <div className="border border-white/30 bg-black/80 backdrop-blur-sm">
          {/* sys.log title bar */}
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-white/70" />
              <span className="h-2 w-2 rounded-full border border-white/70" />
              <span className="h-2 w-2 rounded-full border border-white/70" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
              sys.log · crash
            </span>
          </div>

          {/* body */}
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
              status · {code}
            </div>
            <h1 className="mt-3 font-mono text-2xl uppercase tracking-tight text-white sm:text-3xl">
              {status}
            </h1>

            <p className="mt-4 font-sans text-[15px] leading-relaxed text-white/75">
              {message}
            </p>

            {detail && <CrashLine text={detail} />}

            {digest && (
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                digest · <span className="text-white/55">{digest}</span>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ActionButton {...primary} primary />
              {secondary && <ActionButton {...secondary} />}
            </div>
          </div>
        </div>

        {/* tiny meta line below the card */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-white/70" />
            running locally · no error sent off-device
          </span>
          <a href="/" className="hover:text-white">
            ← home
          </a>
        </div>
      </div>
    </main>
  );
}

/** monospace line with a blinking caret — feels like a fresh log entry */
function CrashLine({ text }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    setShown("");
    const t = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [text]);
  return (
    <pre className="mt-5 whitespace-pre-wrap border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-[12px] leading-relaxed text-white/80">
      {shown}
      <span className="ml-0.5 inline-block h-3 w-1 translate-y-[2px] bg-white animate-blink" />
    </pre>
  );
}

function ActionButton({ label, href, onClick, primary = false }) {
  const cls = primary
    ? "btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
    : "btn-press group inline-flex items-center gap-2 border border-white/40 bg-black/40 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-white/80 hover:border-white hover:text-white";

  const inner = (
    <>
      {label}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

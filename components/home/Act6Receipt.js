"use client";

import { motion } from "framer-motion";

const ROWS = [
  ["storage", "your device"],
  ["tabs", "your device"],
  ["history", "your device"],
  ["bookmarks", "your device"],
  ["analytics", "none"],
  ["accounts", "not required"],
];

export default function Act6Receipt() {
  return (
    <section
      id="act6"
      className="relative w-full overflow-hidden bg-ink py-20 text-paper sm:py-32"
    >
      <div className="mx-4 flex items-end justify-between gap-4 pb-8 sm:mx-8 sm:gap-6 sm:pb-12">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
            act 06
          </div>
          <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight sm:text-4xl md:text-5xl">
            your data, itemized
          </h2>
        </div>
        <p className="hidden max-w-md font-mono text-sm text-white/60 sm:block">
          here is the entire bill for using dinodash.
        </p>
      </div>

      <div className="flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[420px] bg-paper text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 14px), 95% 100%, 90% calc(100% - 8px), 85% 100%, 80% calc(100% - 8px), 75% 100%, 70% calc(100% - 8px), 65% 100%, 60% calc(100% - 8px), 55% 100%, 50% calc(100% - 8px), 45% 100%, 40% calc(100% - 8px), 35% 100%, 30% calc(100% - 8px), 25% 100%, 20% calc(100% - 8px), 15% 100%, 10% calc(100% - 8px), 5% 100%, 0 calc(100% - 14px))",
          }}
        >
          {/* faint paper texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          <div className="relative px-6 pb-10 pt-7 font-mono text-[12px] leading-[1.65] text-black">
            <div className="text-center tracking-[0.3em]">— — — — — — — — — — —</div>
            <div className="mt-2 text-center text-[15px] font-bold tracking-[0.35em]">
              DINODASH RECEIPT
            </div>
            <div className="mt-1 text-center tracking-[0.3em]">— — — — — — — — — — —</div>

            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-black/60">
              <span>order #00001</span>
              <span>{new Date().toISOString().slice(0, 10)}</span>
            </div>

            <div className="mt-5 space-y-1.5">
              {ROWS.map(([k, v]) => (
                <Row key={k} k={k} v={v} />
              ))}
            </div>

            <div className="mt-5 dotted" />
            <div className="mt-3 flex items-center justify-between text-[12px] uppercase tracking-[0.2em]">
              <span>total data sent out</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[12px] uppercase tracking-[0.2em]">
              <span>servers contacted</span>
              <span className="font-bold">0</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[12px] uppercase tracking-[0.2em]">
              <span>tracking pixels</span>
              <span className="font-bold">0</span>
            </div>

            <div className="mt-5 dotted" />
            <p className="mt-4 text-center text-[12px] leading-relaxed">
              no servers. no tracking. no funny business.
            </p>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-black/60">
              thank you for running locally
            </p>

            <div className="mt-5 flex items-center justify-center gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="h-6 w-[2px] bg-black"
                  style={{ opacity: i % 3 === 0 ? 1 : 0.6, transform: `scaleY(${0.6 + ((i * 7) % 5) * 0.1})` }}
                />
              ))}
            </div>
            <div className="mt-2 text-center text-[10px] tracking-[0.4em] text-black/70">
              ║ DD-0001-LOCAL ║
            </div>
          </div>
        </motion.div>
      </div>

      <p className="mx-auto mt-12 max-w-xl px-4 text-center font-mono text-sm text-white/60">
        every byte stays on your machine. we built dinodash so you'd never have
        to take our word for it — there's nothing to take.
      </p>
    </section>
  );
}

function Row({ k, v }) {
  // dotted leader between key and value, like a real receipt
  return (
    <div className="flex items-baseline justify-between gap-2 text-[12px]">
      <span className="whitespace-nowrap">{k}</span>
      <span
        aria-hidden
        className="mx-2 flex-1 translate-y-[-3px] border-b border-dotted border-black/60"
      />
      <span className="whitespace-nowrap">{v}</span>
    </div>
  );
}

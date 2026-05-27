"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/* --------- content (dummy — swap with real copy later) --------- */

const MANIFESTO_LINES = [
  "we believe a new tab should welcome you, not waste you.",
  "we believe your data should live where you do — on your machine.",
  "we believe small joys, repeated 100 times a day, change a year.",
  "we believe a dino should run forever.",
];

const TIMELINE = [
  {
    year: "2023",
    title: "the first idle dino",
    body: "a 12-line html prototype that bounced on a horizon line. that's it. that was the whole pitch.",
  },
  {
    year: "2024 q1",
    title: "physics, themes, the run loop",
    body: "the dino learned to jump, duck, and hate cacti. dark valley showed up first. mystic forest followed.",
  },
  {
    year: "2024 q3",
    title: "browsing memory",
    body: "the new tab grew a sidebar. history became searchable, categorized, and pin-able — locally only.",
  },
  {
    year: "2025",
    title: "v1.0 — the cinematic build",
    body: "every panel, popup, and pixel got a once-over. the website you're on is part of the same release.",
  },
  {
    year: "next",
    title: "?",
    body: "a third theme. the community decides what it is.",
  },
];

/* --------- page --------- */

export default function AboutPage() {
  return (
    <>
      <SiteHeader revealAfter={0} />
      <main className="relative bg-ink text-paper">
        <Hero />
        <Manifesto />
        <Timeline />
        <Creator />
        <Outro />
      </main>
      <SiteFooter />
    </>
  );
}

/* ===== HERO ===== */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 px-5 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40">
      {/* faint grid */}
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

      {/* corner ticks */}
      <CornerTicks />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        {/* LEFT — copy */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/45">
            file · about.md
          </div>
          <h1 className="mt-4 font-mono text-4xl uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
            a tab that
            <br />
            <span className="text-white/60">runs.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-white/70 sm:text-base">
            DinoDash is a chrome new tab built around a single belief — the moment
            you open a tab is a small one, and small things, repeated, become big
            ones. so we made the small thing alive.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Pill>est. 2023</Pill>
            <Pill>v1.0.0</Pill>
            <Pill>locally hosted</Pill>
            <Pill>open to feedback</Pill>
          </div>
        </div>

        {/* RIGHT — logo */}
        <HeroLogo />
      </div>
    </section>
  );
}

function HeroLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[360px]"
    >
      {/* outer frame */}
      <div className="absolute inset-0 border border-white/15 bg-white/[0.02]">
        <CornerTicksSmall />
      </div>

      {/* faint orbiting rings */}
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute inset-6 rounded-full border border-white/10"
      />
      <motion.span
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute inset-12 rounded-full border border-dashed border-white/15"
      />

      {/* logo, gentle pulse */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo-dark.webp"
          alt="DinoDash logo"
          draggable={false}
          className="h-[55%] w-auto object-contain"
        />
      </motion.div>

      {/* meta strip */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/45">
        <span>mark · 0001</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1 w-1 animate-pulse bg-white/70" />
          live
        </span>
      </div>
    </motion.div>
  );
}

/* ===== MANIFESTO — typewriter list ===== */

function Manifesto() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="01" title="manifesto" subtitle="four lines we keep" />

        <ul className="mt-12 space-y-3">
          {MANIFESTO_LINES.map((line, i) => (
            <ManifestoLine key={i} index={i} line={line} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ManifestoLine({ index, line }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = 280 + index * 600;
    const startTimer = setTimeout(() => {
      const tick = setInterval(() => {
        i += 1;
        setShown(line.slice(0, i));
        if (i >= line.length) {
          clearInterval(tick);
          setDone(true);
        }
      }, 14);
    }, start);
    return () => clearTimeout(startTimer);
  }, [line, index]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex items-start gap-4 border-b border-white/10 py-4"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 tabular-nums">
        {num}
      </span>
      <span className="font-mono text-[14px] leading-relaxed text-white sm:text-[16px]">
        {shown}
        {!done && (
          <span className="ml-0.5 inline-block h-3 w-1 translate-y-[2px] bg-white animate-blink" />
        )}
      </span>
    </motion.li>
  );
}

/* ===== TIMELINE ===== */

function Timeline() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="03" title="how we got here" subtitle="a short log" />

        <ol className="mt-12 space-y-10">
          {TIMELINE.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-[80px_1fr] items-baseline gap-4 sm:grid-cols-[140px_1fr] sm:gap-8"
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.3em] text-white/55 tabular-nums">
                {item.year}
              </div>
              <div className="border-l border-white/15 pl-5 sm:pl-7">
                <h3 className="font-mono text-lg uppercase tracking-tight text-white sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl font-sans text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ===== CREATOR CARD ===== */

function Creator() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="04" title="the maker" subtitle="who" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-white/15 bg-white/10 md:grid-cols-[280px_1fr]"
        >
          {/* portrait cell — uses the dino as a stand-in */}
          <div className="relative aspect-square bg-ink md:aspect-auto">
            <CornerTicksSmall />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/idle-dino.webp"
                alt=""
                className="h-[60%] w-auto object-contain"
                draggable={false}
              />
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/45">
              <span>portrait</span>
              <span>id · 0001</span>
            </div>
          </div>

          {/* details */}
          <div className="bg-ink p-6 sm:p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
              dossier
            </div>
            <h3 className="mt-2 font-mono text-3xl uppercase tracking-tight text-white sm:text-4xl">
              Revanshu Pusadkar
            </h3>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.3em] text-white/55">
              designer · engineer · part-time runner
            </p>

            <p className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-white/75">
              builds tools that pay attention. dinodash started as a way to
              make the most boring 200 milliseconds of the day — opening a new
              tab — feel a little less boring.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/10 sm:grid-cols-3">
              <Meta label="based in" value="ind / earth" />
              <Meta label="caffeine" value="online" />
              <Meta label="dms" value="open" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/feedback"
                className="btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
              >
                say hi
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <SocialLink
                href="https://instagram.com/revanshu04"
                label="instagram"
              />
              <SocialLink href="https://x.com/Revanshu04" label="x" />
              <SocialLink
                href="https://linkedin.com/in/revanshu-pusadkar"
                label="linkedin"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== OUTRO ===== */

function Outro() {
  return (
    <section className="relative px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40">
          end of file
        </div>
        <h2 className="mt-5 font-mono text-2xl uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-3xl md:text-4xl">
          built once. yours forever.
        </h2>
        <p className="mt-5 font-sans text-[15px] leading-relaxed text-white/65">
          install it, change the theme, or rip it out tomorrow. nothing follows
          you home.
        </p>
        <a
          href="/#act7"
          className="btn-press group mt-8 inline-flex items-center gap-3 border border-white bg-white px-6 py-3 font-mono text-[12px] uppercase tracking-[0.3em] text-black hover:bg-black hover:text-white"
        >
          add to chrome
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

/* ===== shared bits ===== */

function SectionHeader({ index, title, subtitle }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
          {index} · {subtitle}
        </div>
        <h2 className="mt-2 font-mono text-2xl uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
      <span aria-hidden className="hidden h-px w-32 bg-white/15 sm:block" />
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 border border-white/30 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
      <span className="inline-block h-1 w-1 rounded-full bg-white/70" />
      {children}
    </span>
  );
}

function Meta({ label, value }) {
  return (
    <div className="bg-ink p-3 sm:p-4">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/45">
        {label}
      </div>
      <div className="mt-1 font-mono text-[13px] tracking-[0.1em] text-white">
        {value}
      </div>
    </div>
  );
}

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="btn-press inline-flex items-center gap-2 border border-white/30 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 hover:border-white hover:text-white"
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
      {label}
    </a>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="pointer-events-none absolute left-5 top-24 h-3 w-3 border-l border-t border-white/30 sm:left-10 sm:top-32" />
      <span className="pointer-events-none absolute right-5 top-24 h-3 w-3 border-r border-t border-white/30 sm:right-10 sm:top-32" />
      <span className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b border-l border-white/30 sm:left-10" />
      <span className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b border-r border-white/30 sm:right-10" />
    </>
  );
}

function CornerTicksSmall() {
  return (
    <>
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-white/40" />
    </>
  );
}

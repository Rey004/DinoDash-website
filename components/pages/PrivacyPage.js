"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteFooter from "../chrome/SiteFooter";
import SiteHeader from "../chrome/SiteHeader";

const PRINCIPLES = [
  "we collect zero personal data, search queries, or browsing history.",
  "we contact zero external servers. no tracking pixels, no telemetry.",
  "all data lives on your machine and stays on your machine.",
  "you have full control to inspect, export, or wipe your local storage at any time.",
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader revealAfter={0} />
      <main className="relative bg-ink text-paper">
        <Hero />
        <Principles />
        <Details />
        <Compliance />
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

      <CornerTicks />

      <div className="relative mx-auto max-w-5xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/45">
          file · privacy_policy.md
        </div>
        <h1 className="mt-4 font-mono text-4xl uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
          privacy
          <br />
          <span className="text-white/60">guarantee.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-[15px] leading-relaxed text-white/70 sm:text-base">
          DinoDash is built with a local-first architecture. That means we don't ask you to trust us with your data because we don't have a way to collect it in the first place.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Pill>no servers</Pill>
          <Pill>no tracking</Pill>
          <Pill>local storage</Pill>
          <Pill>gdpr & ccpa compliant</Pill>
        </div>
      </div>
    </section>
  );
}

/* ===== PRINCIPLES ===== */
function Principles() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="01" title="core principles" subtitle="how we operate" />

        <ul className="mt-12 space-y-3">
          {PRINCIPLES.map((line, i) => (
            <PrincipleLine key={i} index={i} line={line} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrincipleLine({ index, line }) {
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

/* ===== DETAILED SECTIONS ===== */
function Details() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="02" title="data itemization" subtitle="what happens to your bytes" />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Data Collection */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              collection
            </div>
            <h3 className="mt-2 font-mono text-lg uppercase tracking-tight text-white">
              Data Collection & Usage
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
              DinoDash does not collect any personal, sensitive, or user-identifying data. We do not use any analytics services (like Google Analytics) or cookies. When you open a new tab, all widgets load completely locally without executing any remote tracking code.
            </p>
          </div>

          {/* Local Storage */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              storage
            </div>
            <h3 className="mt-2 font-mono text-lg uppercase tracking-tight text-white">
              Local Synchronization
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
              Any data generated during your runs—such as daily streaks, high scores, bookmarks, reaction statuses, and customized themes—is stored exclusively on your device. We use standard browser storage APIs (`chrome.storage.local`). We have no servers to sync or receive this data.
            </p>
          </div>

          {/* Third Party Sharing */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              sharing
            </div>
            <h3 className="mt-2 font-mono text-lg uppercase tracking-tight text-white">
              Third-Party Disclosures
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
              Since we do not collect or store any user data on our own infrastructure, there is no data to share. We do not sell, rent, or distribute any user information to third-party advertisers, data brokers, or marketing networks.
            </p>
          </div>

          {/* Permissions */}
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              permissions
            </div>
            <h3 className="mt-2 font-mono text-lg uppercase tracking-tight text-white">
              Extension Permissions
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/70">
              DinoDash requests only the minimum set of permissions necessary to function as a replacement new tab. The permission scope (e.g., storage, bookmarks, or tabs access) is used solely within the sandboxed environment of your device to power the respective dashboard widgets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== COMPLIANCE ===== */
function Compliance() {
  return (
    <section className="relative border-b border-white/10 px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader index="03" title="regulatory compliance" subtitle="developer standards" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-12 border border-white/15 bg-white/[0.02] p-6 sm:p-10"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
            manifest · developer_compliance
          </div>
          <h3 className="mt-2 font-mono text-2xl uppercase tracking-tight text-white sm:text-3xl">
            Chrome Web Store Compliance
          </h3>
          
          <p className="mt-6 font-sans text-[15px] leading-relaxed text-white/75">
            DinoDash complies fully with the Chrome Web Store Developer Agreement and User Data Privacy Policies. Specifically:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            <Meta label="User Data Protection" value="local-only storage" />
            <Meta label="No Tracking Policy" value="zero analytics scripts" />
            <Meta label="GDPR Rights" value="user controls all local files" />
            <Meta label="Single Purpose" value="cinematic tab runner" />
          </div>

          <p className="mt-8 font-sans text-sm leading-relaxed text-white/60">
            For further inquiries regarding Chrome Extension user safety guidelines or to inspect the open-source code for DinoDash, please refer to the GitHub repository.
          </p>
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
          end of policy
        </div>
        <h2 className="mt-5 font-mono text-2xl uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-3xl md:text-4xl">
          locally hosted. yours forever.
        </h2>
        <p className="mt-5 font-sans text-[15px] leading-relaxed text-white/65">
          If you have questions about how DinoDash handles your data, feel free to inspect the codebase or contact us directly.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/about#creator"
            className="btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
          >
            contact developer
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
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
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
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

"use client";

import { useState } from "react";
import TabPill from "./TabPill";
import Chip from "./Chip";
import BarRow from "./BarRow";

/**
 * BrowsingMemoryPanel — the right-side "BROWSING MEMORY" panel
 * shown in the extension. History tab + Analytics tab.
 * All B/W.
 */
export default function BrowsingMemoryPanel({ initialTab = "history", className = "" }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <aside
      className={`relative flex h-full w-full flex-col border-l border-white/15 bg-black/85 backdrop-blur-sm ${className}`}
    >
      <header className="px-5 pb-3 pt-5">
        <h3 className="font-mono text-[15px] uppercase tracking-[0.25em] text-white">
          browsing memory
        </h3>
      </header>
      <div className="px-5">
        <div className="flex items-center gap-2">
          <TabPill
            label="history"
            active={tab === "history"}
            onClick={() => setTab("history")}
          />
          <TabPill
            label="analytics"
            active={tab === "analytics"}
            onClick={() => setTab("analytics")}
          />
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden">
        {tab === "history" ? <HistoryTab /> : <AnalyticsTab />}
      </div>
    </aside>
  );
}

function HistoryTab() {
  const items = [
    { title: "Feed | LinkedIn", host: "linkedin.com", time: "03:46 PM" },
    { title: "Revanshu Pusadkar (@Revansh…) / X", host: "x.com", time: "03:46 PM" },
    { title: "Revanshu Pusadkar (@Revansh…) / X", host: "x.com", time: "03:46 PM" },
    { title: "Revanshu Pusadkar | LinkedIn", host: "linkedin.com", time: "03:46 PM" },
    { title: "Revanshu Pusadkar | LinkedIn", host: "linkedin.com", time: "03:45 PM" },
    { title: "Feed | LinkedIn", host: "linkedin.com", time: "03:45 PM" },
    { title: "x.com", host: "x.com", time: "03:45 PM" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto px-5 pb-5 no-scrollbar">
      <div className="border border-white/20 bg-white/[0.02] px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
          <span>⌕</span>
          <span>Search title or URL…</span>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            type
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
            filter by category
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { l: "Coding", i: "<>" },
            { l: "Research" },
            { l: "Design" },
            { l: "Social" },
            { l: "Entertainment" },
            { l: "Shopping" },
            { l: "Other" },
          ].map((c) => (
            <Chip key={c.l} label={c.l} icon={c.i} />
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          no filters · showing every category
        </p>
      </div>

      <div className="mt-1">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          today
        </div>
        <ul className="divide-y divide-white/10">
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-3 py-2">
              <span className="inline-block h-7 w-7 shrink-0 border border-white/30" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-mono text-[12px] text-white">
                  {it.title}
                </div>
                <div className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {it.host} · {it.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const cats = [
    { label: "Coding", percent: 31, intensity: "high" },
    { label: "Other", percent: 26, intensity: "low" },
    { label: "Research", percent: 17, intensity: "mid" },
    { label: "Social", percent: 11, intensity: "mid" },
    { label: "Design", percent: 8, intensity: "low" },
    { label: "Entertainment", percent: 7, intensity: "low" },
  ];

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto px-5 pb-5 no-scrollbar">
      <section>
        <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white">
          category distribution
        </h4>
        <div className="border-t border-white/15 pt-1">
          {cats.map((c) => (
            <BarRow key={c.label} {...c} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white">
          smart insights
        </h4>
        <div className="border border-white/30 p-3">
          <p className="font-mono text-[12px] leading-relaxed text-white/85">
            <span className="text-white">128</span> pages across{" "}
            <span className="text-white">26</span> sites.{" "}
            <span className="text-white">Coding</span> leads at{" "}
            <span className="text-white">31%</span>, with{" "}
            <span className="text-white">Other</span> at{" "}
            <span className="text-white">26%</span>.
          </p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/75">
            Most active around <span className="text-white">12–3pm</span> (
            <span className="text-white">31%</span> of visits).
          </p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/75">
            <span className="text-white">Tue</span> is your busiest day this range.
          </p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/75">
            <span className="text-white">github.com</span> alone is{" "}
            <span className="text-white">31%</span> of your visits — a strong anchor site.
          </p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-white/75">
            Roughly <span className="text-white">56%</span> of your time leans toward focus work.
          </p>
        </div>
      </section>

      <section>
        <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white">
          suggestions
        </h4>
        <div className="border border-white/30 p-3">
          <div className="flex items-start gap-3">
            <span className="mt-[2px] inline-flex h-6 w-8 shrink-0 items-center justify-center border border-white/40 text-[10px] text-white/70">
              ▭
            </span>
            <p className="font-mono text-[12px] leading-relaxed text-white/85">
              Coding leads at 31% — strong builder mode. Pin your top dev sites to launch them in one click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

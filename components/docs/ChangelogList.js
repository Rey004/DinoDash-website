"use client";

import { useState } from "react";
import { slugify } from "@/lib/markdown";
import MarkdownRenderer from "./MarkdownRenderer";

/**
 * ChangelogList — splits the parsed blocks into versioned chunks
 * (every `## vX.Y.Z` starts a new chunk) and renders each as a
 * collapsible card. The most recent (first) entry is open by default.
 */
export default function ChangelogList({ blocks }) {
  const versions = splitByVersion(blocks);

  return (
    <div className="space-y-6">
      {versions.map((v, i) => (
        <VersionCard key={v.id} version={v} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

function VersionCard({ version, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article
      id={version.id}
      className={`overflow-hidden border transition-colors ${
        open ? "border-white/30 bg-white/[0.03]" : "border-white/15 bg-transparent hover:border-white/25"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
            release
          </span>
          <span className="font-mono text-lg uppercase tracking-[0.18em] text-white sm:text-xl">
            {version.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 sm:inline">
            {open ? "collapse" : "expand"}
          </span>
          <span
            aria-hidden
            className={`inline-flex h-7 w-7 items-center justify-center border border-white/40 transition-transform ${
              open ? "rotate-45 text-white" : "text-white/70"
            }`}
          >
            +
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-[8000px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 px-5 py-6 sm:px-6 sm:py-8">
          <MarkdownRenderer blocks={version.body} />
        </div>
      </div>
    </article>
  );
}

function splitByVersion(blocks) {
  const out = [];
  let current = null;
  for (const b of blocks) {
    if (b.type === "h2") {
      if (current) out.push(current);
      current = {
        id: slugify(b.text),
        title: b.text,
        body: [],
      };
      continue;
    }
    // anything before the first h2 (e.g. an intro paragraph) becomes a
    // standalone "preface" so we don't lose it
    if (!current) {
      out.push({
        id: "preface",
        title: "preface",
        body: [b],
      });
      continue;
    }
    current.body.push(b);
  }
  if (current) out.push(current);
  // merge consecutive preface entries into one
  return mergePrefaces(out);
}

function mergePrefaces(entries) {
  const out = [];
  for (const e of entries) {
    const last = out[out.length - 1];
    if (e.id === "preface" && last?.id === "preface") {
      last.body.push(...e.body);
    } else {
      out.push(e);
    }
  }
  return out;
}

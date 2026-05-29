"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

/**
 * Footer columns are limited to:
 *  - Sections that actually exist on the page (the seven acts).
 *  - The same nav-link labels used in SiteHeader (about, docs,
 *    changelog, bug report, feedback). They have no real route yet,
 *    so they render as anchors that point to placeholder hashes.
 */
const SECTION_LINKS = [
  { label: "the contrast", href: "/#act2" },
  { label: "the anatomy", href: "/#act5" },
  { label: "choose your dimension", href: "/#act3" },
  { label: "the game", href: "/#act4" },
  { label: "privacy", href: "/#act6" },
  { label: "starting line", href: "/#act7" },
];

const NAV_LINKS = [
  { label: "about", href: "/about" },
  { label: "docs", href: "/docs" },
  { label: "changelog", href: "/changelog" },
  { label: "feedback", href: "/feedback" },
];

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/15 bg-black text-paper">
      {/* TOP — brand block + link columns */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 pb-12 pt-14 sm:gap-12 sm:px-10 sm:pb-16 sm:pt-20 lg:grid-cols-[1.2fr_2fr]">
        {/* left — brand */}
        <div>
          <Logo
            size={36}
            wordmarkClass="font-mono text-[14px] uppercase tracking-[0.32em] text-white"
          />
          <p className="mt-6 max-w-sm font-mono text-[12px] leading-relaxed text-white/60">
            a chrome new tab that runs on its own. no servers, no tracking,
            no funny business. just a dino, a city, and a number going up.
          </p>

          {/* socials */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="btn-press inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-white/[0.04] text-white/75 hover:border-white hover:text-white"
            >
              <InstagramGlyph />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Product Hunt"
              className="btn-press inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-white/[0.04] text-white/75 hover:border-white hover:text-white"
            >
              <ProductHuntGlyph />
            </a>
          </div>
        </div>

        {/* right — link columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          <FooterColumn title="sections" links={SECTION_LINKS} />
          <FooterColumn title="more" links={NAV_LINKS} />
        </div>
      </div>

      {/* STATUS ROW */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:gap-4 sm:px-10 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-white/80" />
            all systems · running locally
          </div>

          <BackToTop />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} dinodash</span>
          </div>
        </div>
      </div>

      {/* GIANT WORDMARK — flush to the bottom edge */}
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none block w-full select-none whitespace-nowrap text-center font-mono uppercase leading-[0.8] tracking-[-0.04em] text-white"
          style={{
            fontSize: "clamp(80px, 22vw, 320px)",
            paddingBottom: "0.04em",
          }}
        >
          DINODASH
        </span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Back-to-top — only appears once you've scrolled a bit */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`btn-press group inline-flex items-center gap-2 border border-white/30 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 transition-opacity hover:border-white hover:text-white ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span
        aria-hidden
        className="inline-block transition-transform group-hover:-translate-y-[2px]"
      >
        ↑
      </span>
      back to top
    </button>
  );
}

/* Minimal Instagram glyph — single-color outline matches the B/W palette */
function InstagramGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ProductHuntGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9.25" />
      <path d="M9.5 7.5h4a3 3 0 0 1 0 6H9.5V17" />
      <path d="M9.5 7.5v6" />
    </svg>
  );
}

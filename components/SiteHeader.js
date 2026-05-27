"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "about" },
  { label: "docs", href: "/docs" },
  { label: "changelog", href: "/changelog" },
  { label: "bug report" },
  { label: "feedback" },
];

/**
 * SiteHeader — fixed top bar across the page.
 * Translucent blurred background, reveals after the Act 1 boot finishes
 * (or once the user scrolls past the fold, whichever comes first).
 *
 * Nav links are rendered but not yet wired to routes — drop an `href`
 * into NAV_LINKS when those pages exist.
 */
export default function SiteHeader({ revealAfter = 2400 }) {
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 32) setRevealed(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // reveal after the boot typing finishes
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), revealAfter);
    return () => clearTimeout(t);
  }, [revealAfter]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md transition-all duration-500 ${
        revealed
          ? "opacity-100 translate-y-0"
          : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3 sm:px-10 sm:py-3.5">
        {/* brand — upper left edge */}
        <a href="/" className="flex items-center" aria-label="DinoDash home">
          <Logo
            size={32}
            wordmarkClass="font-mono text-[13px] uppercase tracking-[0.32em] text-white"
          />
        </a>

        {/* desktop nav — centered */}
        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLabel key={link.label} label={link.label} href={link.href} />
          ))}
        </nav>

        {/* add to chrome — upper right edge */}
        <a
          href="#act7"
          className="btn-press group hidden items-center gap-2.5 border border-white bg-white px-5 py-2 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white sm:inline-flex"
        >
          add to chrome
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-black/60 text-white sm:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-white transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-[0.5px] bg-white transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md transition-[max-height] duration-300 sm:hidden ${
          open ? "max-h-[320px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => (
            <NavLabel
              key={link.label}
              label={link.label}
              href={link.href}
              className="border-b border-white/5 py-3"
            />
          ))}
          <a
            href="#act7"
            onClick={() => setOpen(false)}
            className="btn-press group mt-4 inline-flex items-center justify-center gap-2.5 border border-white bg-white px-5 py-3 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
          >
            add to chrome
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * NavLabel — renders a nav item. If `href` is provided it's a real link;
 * otherwise it renders as a placeholder span (no destination yet).
 */
function NavLabel({ label, href, className = "" }) {
  if (href) {
    return (
      <a
        href={href}
        className={`font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white ${className}`}
      >
        {label}
      </a>
    );
  }
  return (
    <span
      role="link"
      aria-disabled="true"
      title="Coming soon"
      className={`cursor-default font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white ${className}`}
    >
      {label}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../visuals/Logo";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "docs", href: "/docs" },
  { label: "changelog", href: "/changelog" },
  { label: "feedback", href: "/feedback" },
];

const SOCIALS = [
  { label: "instagram", href: "#", glyph: InstagramGlyph },
  { label: "product hunt", href: "#", glyph: ProductHuntGlyph },
];

/**
 * SiteHeader — fixed top bar across the page.
 *
 * Mobile: hamburger opens a full-screen overlay menu with large nav
 * targets and the primary CTA.
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

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), revealAfter);
    return () => clearTimeout(t);
  }, [revealAfter]);

  // lock body scroll while the overlay is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md transition-all duration-500 ${
          revealed
            ? "opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-10 sm:py-3.5">
          {/* brand — upper left edge */}
          <Link href="/" className="flex items-center" aria-label="DinoDash home">
            <Logo
              size={32}
              wordmarkClass="font-mono text-[13px] uppercase tracking-[0.32em] text-white"
            />
          </Link>

          {/* desktop nav — centered */}
          <nav className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <NavLabel key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>

          {/* add to chrome — upper right edge */}
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={SOCIALS[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label={SOCIALS[0].label}
              className="btn-press inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-white/[0.04] text-white/75 hover:border-white hover:text-white"
            >
              <InstagramGlyph />
            </a>
            <a
              href={SOCIALS[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label={SOCIALS[1].label}
              className="btn-press inline-flex h-9 w-9 items-center justify-center border border-white/25 bg-white/[0.04] text-white/75 hover:border-white hover:text-white"
            >
              <ProductHuntGlyph />
            </a>
            <a
              href="#act7"
              className="btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
            >
              add to chrome
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-black/60 text-white sm:hidden"
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
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 sm:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* faint grid overlay for atmosphere */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-500 ${
            open ? "opacity-[0.05]" : "opacity-0"
          }`}
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

        {/* corner crop marks */}
        <span
          className={`pointer-events-none absolute left-5 top-5 h-3 w-3 border-l border-t border-white/30 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`pointer-events-none absolute right-5 top-5 h-3 w-3 border-r border-t border-white/30 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b border-l border-white/30 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className={`pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b border-r border-white/30 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* content */}
        <div className="relative flex h-full w-full flex-col px-6 pb-10 pt-20">
          <div
            className={`font-mono text-[10px] uppercase tracking-[0.4em] text-white/45 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? "120ms" : "0ms" }}
          >
            menu
          </div>

          {/* nav list */}
          <nav className="mt-8 flex flex-1 flex-col">
            {NAV_LINKS.map((link, i) => (
              <OverlayLink
                key={link.label}
                link={link}
                open={open}
                index={i}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#act7"
            onClick={() => setOpen(false)}
            className={`btn-press group mt-6 inline-flex w-full items-center justify-center gap-2.5 border border-white bg-white px-5 py-4 font-mono text-[12px] uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-black hover:text-white ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + NAV_LINKS.length * 70}ms` : "0ms" }}
          >
            add to chrome
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>

          {/* socials row */}
          <div
            className={`mt-5 flex items-center justify-center gap-3 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + (NAV_LINKS.length + 1) * 70}ms` : "0ms" }}
          >
            {SOCIALS.map((s) => {
              const Glyph = s.glyph;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  onClick={() => setOpen(false)}
                  className="btn-press inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-white/[0.04] text-white/80 hover:border-white hover:text-white"
                >
                  <Glyph />
                </a>
              );
            })}
          </div>

          {/* footer line inside overlay */}
          <div
            className={`mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${120 + (NAV_LINKS.length + 2) * 70}ms` : "0ms" }}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-1 w-1 animate-pulse bg-white/60" />
              esc · close
            </span>
            <span>v0.1</span>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * OverlayLink — large nav row used in the mobile overlay.
 * Animated in/out with a stagger based on `index`.
 */
function OverlayLink({ link, index, open, onClick }) {
  const delay = open ? `${120 + index * 70}ms` : "0ms";
  const baseCls = `flex items-baseline justify-between border-b border-white/10 py-5 font-mono text-2xl uppercase tracking-[0.06em] transition-all duration-500 ${
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`;

  const number = String(index + 1).padStart(2, "0");

  if (link.href) {
    return (
      <Link
        href={link.href}
        onClick={onClick}
        className={`${baseCls} text-white hover:text-white/70`}
        style={{ transitionDelay: delay }}
      >
        <span>{link.label}</span>
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">{number}</span>
      </Link>
    );
  }

  return (
    <span
      aria-disabled="true"
      title="Coming soon"
      className={`${baseCls} cursor-default text-white/55`}
      style={{ transitionDelay: delay }}
    >
      <span>{link.label}</span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">{number}</span>
    </span>
  );
}

/** Desktop nav-bar item. */
function NavLabel({ label, href, className = "" }) {
  if (href) {
    return (
      <Link
        href={href}
        className={`font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white ${className}`}
      >
        {label}
      </Link>
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

/* ---- social glyphs ---- */

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

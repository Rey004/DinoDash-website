"use client";

import { useEffect } from "react";

/**
 * SmoothScroller — global, mounted once in the root layout.
 *
 * 1. Intercepts clicks on in-page anchor links (`<a href="#foo">`) so they
 *    scroll smoothly *without* writing the hash to the URL.
 * 2. On initial load, if the URL already has a hash (e.g. you came from
 *    `/#act2` on another page), scrolls to that target then strips the
 *    hash so the address bar stays clean.
 *
 * Cross-page anchor links that aren't present on the current page fall
 * through to the browser's default behaviour, so the user still navigates.
 */
export default function SmoothScroller() {
  useEffect(() => {
    // 1) intercept in-page anchor clicks
    const onClick = (e) => {
      // only primary clicks, no modifier keys, no target=_blank
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || link.target === "_blank") return;

      // resolve to a same-origin URL for hash extraction
      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // only intercept if there's a hash to scroll to
      if (!url.hash || url.hash === "#") return;

      // and only if the hash exists on the current page (i.e. we're
      // not navigating to a different route)
      const samePath =
        url.pathname === window.location.pathname ||
        // allow "/" → "/" cross-resolve from "/#foo" links rendered on /
        (url.pathname === "/" && window.location.pathname === "/");
      if (!samePath) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // keep the URL clean — strip the hash
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    };
    document.addEventListener("click", onClick);

    // 2) handle initial-load hash (e.g. /#act2 from another page)
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        // wait one frame so layout has settled
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        });
      }
    }

    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

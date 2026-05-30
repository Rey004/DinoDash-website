"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — minimal two-piece cursor for fine-pointer devices.
 *
 *   - small white dot pinned exactly to the pointer
 *   - thin ring trailing the dot with a tiny lerp delay
 *   - ring expands and adds crosshair ticks on hover over interactive
 *     elements (a, button, [role=button], input, label, select, summary)
 *   - hides while text-editing, hides while pressing
 *
 * Skipped on touch devices and reduced-motion preferences.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [text, setText] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visibleRef.current) {
        setVisible(true);
        // also snap ring on first move so it doesn't fly in
        ringX = mouseX;
        ringY = mouseY;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onOver = (e) => {
      const t = e.target;
      if (!t || t.nodeType !== 1) return;
      const interactive = t.closest(
        'a, button, [role="button"], [data-cursor="hover"], summary, label, select, input[type="checkbox"], input[type="radio"]'
      );
      const editable = t.closest(
        'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable=""], [contenteditable="true"]'
      );
      setHover(!!interactive);
      setText(!!editable);
    };

    const tick = () => {
      // ring lerps toward mouse for a tiny trail
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });

    document.body.classList.add("custom-cursor-on");

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("custom-cursor-on");
    };
  }, []);

  // tiny ref so onMove can read latest visibility w/o triggering re-renders
  const visibleRef = useRef(false);
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  if (!enabled) return null;

  // styles driven by state
  const ringSize = hover ? 36 : text ? 28 : 22;
  const ringScale = pressed ? 0.85 : 1;
  const dotSize = text ? 1 : hover ? 7 : 4;
  const dotHeight = text ? 18 : hover ? 7 : 4;
  const opacity = visible ? 1 : 0;

  return (
    <>
      {/* RING — trails the pointer */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: ringSize,
          height: ringSize,
          opacity,
          mixBlendMode: "difference",
          transition: "width 180ms ease, height 180ms ease, opacity 200ms",
        }}
      >
        <span
          className="block h-full w-full rounded-full border border-white"
          style={{
            transform: `scale(${ringScale})`,
            transition: "transform 120ms ease",
          }}
        />
        {/* crosshair ticks on hover */}
        {hover && (
          <>
            <span className="pointer-events-none absolute left-1/2 top-0 block h-[5px] w-px -translate-x-1/2 -translate-y-[6px] bg-white" />
            <span className="pointer-events-none absolute left-1/2 bottom-0 block h-[5px] w-px -translate-x-1/2 translate-y-[6px] bg-white" />
            <span className="pointer-events-none absolute left-0 top-1/2 block h-px w-[5px] -translate-x-[6px] -translate-y-1/2 bg-white" />
            <span className="pointer-events-none absolute right-0 top-1/2 block h-px w-[5px] translate-x-[6px] -translate-y-1/2 bg-white" />
          </>
        )}
      </div>

      {/* DOT — pinned to pointer */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: dotSize,
          height: dotHeight,
          opacity,
          mixBlendMode: "difference",
          background: "white",
          borderRadius: text ? 0 : 9999,
          transition: "width 120ms ease, height 120ms ease, border-radius 120ms ease, opacity 200ms",
        }}
      />
    </>
  );
}

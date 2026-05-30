"use client";

import { useMemo } from "react";

/**
 * Rain — purely decorative falling lines. Black & white.
 * Generates a stable pseudo-random pattern per `seed`.
 */
export default function Rain({ density = 60, opacity = 0.35, seed = 1 }) {
  const drops = useMemo(() => {
    const rng = mulberry32(seed);
    return Array.from({ length: density }).map((_, i) => ({
      key: i,
      left: rng() * 100,
      delay: rng() * 1.2,
      duration: 0.7 + rng() * 0.9,
      length: 14 + rng() * 28,
      thickness: rng() > 0.85 ? 2 : 1,
      o: 0.4 + rng() * 0.6,
    }));
  }, [density, seed]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden
    >
      {drops.map((d) => (
        <span
          key={d.key}
          className="absolute block animate-rain bg-white"
          style={{
            left: `${d.left}%`,
            top: `-10%`,
            width: `${d.thickness}px`,
            height: `${d.length}px`,
            opacity: d.o,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

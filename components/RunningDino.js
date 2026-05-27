"use client";

import { useEffect, useState } from "react";

/**
 * RunningDino — alternates between idle-dino and run-dino frames to
 * fake a 2-frame run cycle. Use `running={false}` to hold the idle pose.
 *
 * Anchor the parent so the sprite's bottom edge sits on a ground line,
 * and pass any height via className (e.g. h-[20vh]).
 */
const FRAMES = ["/assets/run-dino.webp", "/assets/idle-dino.webp"];

export default function RunningDino({
  running = true,
  fps = 8,
  alt = "DinoDash",
  className = "",
  ...rest
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!running) return;
    const ms = 1000 / Math.max(2, fps);
    const t = setInterval(() => setI((v) => (v + 1) % FRAMES.length), ms);
    return () => clearInterval(t);
  }, [running, fps]);

  const src = running ? FRAMES[i] : "/assets/idle-dino.webp";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`h-full w-full object-contain object-bottom ${className}`}
      {...rest}
    />
  );
}

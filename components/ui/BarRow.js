"use client";

/**
 * BarRow — category row from the analytics panel.
 * Label on the left, percent on the right, thin bar below.
 * Black & white only — the percentage drives the fill width.
 */
export default function BarRow({ label, percent, intensity = "high" }) {
  // visual variation — bars use different opacities to feel like the
  // colored bars in the extension without using real colors
  const opacity =
    intensity === "high" ? "bg-white" : intensity === "mid" ? "bg-white/60" : "bg-white/30";
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between font-mono">
        <span className="text-[13px] text-white">{label}</span>
        <span className="text-[12px] text-white/60">{percent}%</span>
      </div>
      <div className="mt-1.5 h-[3px] w-full bg-white/10">
        <div
          className={`h-full ${opacity}`}
          style={{ width: `${Math.max(2, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}

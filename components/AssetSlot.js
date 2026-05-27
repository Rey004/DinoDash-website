"use client";

/**
 * AssetSlot
 * Reusable placeholder for any image/sprite/video the user will drop in later.
 * Keeps the layout intact and labels what the asset should be.
 *
 * Props:
 *  - id: string label (e.g. "dino-sprite")
 *  - aspect: tailwind aspect class, e.g. "aspect-video"
 *  - className: extra classes
 *  - children: optional inline note
 */
export default function AssetSlot({ id, aspect = "", className = "", children }) {
  return (
    <div
      className={`relative overflow-hidden border border-white/20 bg-white/[0.02] ${aspect} ${className}`}
      data-asset={id}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          <div className="mb-1">[ asset ]</div>
          <div className="text-white/70">{id}</div>
          {children ? <div className="mt-1 text-white/40">{children}</div> : null}
        </div>
      </div>
      {/* corner marks */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/40" />
    </div>
  );
}

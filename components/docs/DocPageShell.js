"use client";

/**
 * DocPageShell — frame around docs/changelog content.
 * Renders an act-style header (eyebrow + title + optional subtitle) and
 * provides a generous reading column for the markdown.
 */
export default function DocPageShell({ eyebrow, title, subtitle, wide = false, children }) {
  const widthClass = wide ? "max-w-6xl" : "max-w-3xl";
  return (
    <main className="relative">
      {/* spacing for the fixed header */}
      <section className="relative w-full bg-ink pt-24 text-paper sm:pt-32">
        <div className={`mx-auto w-full px-5 sm:px-10 ${widthClass}`}>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
            {eyebrow}
          </div>
          <h1 className="mt-3 font-mono text-2xl uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-xl font-mono text-[12px] leading-relaxed text-white/55">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`mx-auto mt-10 w-full sm:mt-12 ${widthClass} border-t border-white/15`} />

        <div className={`mx-auto w-full px-5 pb-24 pt-10 sm:px-10 sm:pb-32 sm:pt-12 ${widthClass}`}>
          {children}
        </div>
      </section>
    </main>
  );
}

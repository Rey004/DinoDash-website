import DocPageShell from "./DocPageShell";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * ComingSoonPage — placeholder shell for routes whose real content is
 * still being designed. Reuses the docs page chrome so the route looks
 * intentional rather than empty.
 *
 * Props:
 *  - eyebrow, title, subtitle: header strings
 *  - description: a paragraph or two
 *  - cta: optional { label, href } button
 */
export default function ComingSoonPage({
  eyebrow,
  title,
  subtitle,
  description,
  cta,
}) {
  return (
    <>
      <SiteHeader revealAfter={0} />
      <DocPageShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <div className="space-y-6">
          {/* status pill */}
          <div className="inline-flex items-center gap-2 border border-white/25 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-white/80" />
            in progress · v0.2
          </div>

          {/* body */}
          {description && (
            <p className="font-sans text-[15px] leading-relaxed text-white/75">
              {description}
            </p>
          )}

          {/* cta */}
          {cta && (
            <a
              href={cta.href}
              className="btn-press group inline-flex items-center gap-2.5 border border-white bg-white px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.25em] text-black hover:bg-black hover:text-white"
            >
              {cta.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      </DocPageShell>
      <SiteFooter />
    </>
  );
}

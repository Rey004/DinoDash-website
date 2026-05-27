"use client";

import { parseInline, slugify } from "@/lib/markdown";

/**
 * MarkdownRenderer — renders the parsed-block tree using the DinoDash
 * monochrome / mono-typographic style.
 */
export default function MarkdownRenderer({ blocks }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}

function renderBlock(b, key) {
  switch (b.type) {
    case "h1":
      return (
        <h1
          key={key}
          className="font-mono text-3xl uppercase tracking-tight text-white sm:text-5xl"
        >
          {renderInline(b.text)}
        </h1>
      );
    case "h2":
      return (
        <h2
          key={key}
          id={slugify(b.text)}
          className="mt-12 border-t border-white/15 pt-10 font-mono text-2xl uppercase tracking-tight text-white sm:text-3xl"
        >
          {renderInline(b.text)}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={key}
          id={slugify(b.text)}
          className="mt-8 font-mono text-[16px] uppercase tracking-[0.2em] text-white"
        >
          {renderInline(b.text)}
        </h3>
      );
    case "h4":
      return (
        <h4
          key={key}
          className="mt-6 font-mono text-[12px] uppercase tracking-[0.3em] text-white/75"
        >
          {renderInline(b.text)}
        </h4>
      );
    case "p":
      return (
        <p
          key={key}
          className="font-sans text-[15px] leading-relaxed text-white/75"
        >
          {renderInline(b.text)}
        </p>
      );
    case "hr":
      return <hr key={key} className="my-12 border-white/10" />;
    case "ul":
      return (
        <ul key={key} className="space-y-2 pl-0">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-white/75"
            >
              <span
                aria-hidden
                className="mt-2 inline-block h-px w-3 shrink-0 bg-white/40"
              />
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="space-y-2 pl-0">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-white/75"
            >
              <span className="inline-flex w-6 shrink-0 justify-end font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 tabular-nums">
                {String(j + 1).padStart(2, "0")}
              </span>
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div key={key} className="overflow-x-auto border border-white/15">
          <table className="w-full border-collapse font-mono text-[12px]">
            <thead>
              <tr className="bg-white/[0.04]">
                {b.head.map((c, j) => (
                  <th
                    key={j}
                    className="border-b border-white/15 px-4 py-3 text-left uppercase tracking-[0.2em] text-white/70"
                  >
                    {renderInline(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-b border-white/10 last:border-0">
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 align-top text-white/75"
                    >
                      {renderInline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      if (!b.placeholder && b.src) {
        return (
          <figure key={key} className="my-8 border border-white/15 bg-white/[0.02]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.src}
              alt={b.alt || ""}
              className="block w-full"
              draggable={false}
            />
            {b.alt && (
              <figcaption className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                {b.alt}
              </figcaption>
            )}
          </figure>
        );
      }
      return (
        <figure
          key={key}
          className="my-8 border border-white/15 bg-white/[0.02]"
          data-asset={b.id}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {/* corner ticks */}
            <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-white/40" />
            <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-white/40" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-white/40" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-white/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                <div>[ screenshot ]</div>
                <div className="mt-1 text-white/70">{b.id}</div>
                {b.alt && (
                  <div className="mt-1 max-w-xs text-white/40">{b.alt}</div>
                )}
              </div>
            </div>
          </div>
          {b.alt && (
            <figcaption className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              {b.alt}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

function renderInline(text) {
  return parseInline(text).map((node, i) => {
    if (typeof node === "string") return <span key={i}>{node}</span>;
    if (node.type === "bold")
      return (
        <strong key={i} className="font-medium text-white">
          {node.text}
        </strong>
      );
    if (node.type === "em")
      return (
        <em key={i} className="not-italic text-white/85">
          {node.text}
        </em>
      );
    if (node.type === "code")
      return (
        <code
          key={i}
          className="border border-white/20 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[12px] text-white"
        >
          {node.text}
        </code>
      );
    if (node.type === "link") {
      const isExternal = /^https?:/.test(node.href);
      return (
        <a
          key={i}
          href={node.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          {node.text}
        </a>
      );
    }
    return null;
  });
}

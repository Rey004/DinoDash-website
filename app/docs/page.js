import DocPageShell from "@/components/docs/DocPageShell";
import DocsLayout from "@/components/docs/DocsLayout";
import SiteFooter from "@/components/chrome/SiteFooter";
import SiteHeader from "@/components/chrome/SiteHeader";
import { parseMarkdown } from "@/lib/markdown";
import { readMarkdown } from "@/lib/markdown.server";

export const metadata = {
  title: "Docs — DinoDash",
  description:
    "A guide to every feature in DinoDash — what it does, how it works, and how to use it.",
};

export default function DocsPage() {
  const raw = readMarkdown("docs/documentation.md");
  const blocks = parseMarkdown(raw);
  // drop the very first h1 — we render our own title in the shell;
  // also drop the inline "Table of Contents" h2 + ordered list since
  // we're showing a sticky sidebar TOC instead.
  const trimmed = trimDocBlocks(blocks);

  return (
    <>
      <SiteHeader revealAfter={0} />
      <DocPageShell
        eyebrow="reference · v1.0.0"
        title="documentation"
        subtitle="every feature in DinoDash — what it does, how it works, how to use it."
        wide
      >
        <DocsLayout blocks={trimmed} />
      </DocPageShell>
      <SiteFooter />
    </>
  );
}

function trimDocBlocks(blocks) {
  // skip h1 if first
  let start = 0;
  if (blocks[0]?.type === "h1") start = 1;
  // drop intro paragraph + Table of Contents block
  const out = [];
  let inToc = false;
  for (let i = start; i < blocks.length; i += 1) {
    const b = blocks[i];
    if (b.type === "h2" && /table of contents/i.test(b.text)) {
      inToc = true;
      continue;
    }
    if (inToc) {
      // exit toc once we hit the next horizontal rule or h2
      if (b.type === "hr" || b.type === "h2") {
        inToc = false;
        if (b.type === "hr") continue;
      } else {
        continue;
      }
    }
    out.push(b);
  }
  return out;
}

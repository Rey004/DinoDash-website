import ChangelogList from "@/components/docs/ChangelogList";
import DocPageShell from "@/components/docs/DocPageShell";
import SiteFooter from "@/components/chrome/SiteFooter";
import SiteHeader from "@/components/chrome/SiteHeader";
import { parseMarkdown } from "@/lib/markdown";
import { readMarkdown } from "@/lib/markdown.server";

export const metadata = {
  title: "Changelog — DinoDash",
  description: "Notable changes to DinoDash, by version.",
};

export default function ChangelogPage() {
  const raw = readMarkdown("docs/changelog.md");
  const blocks = parseMarkdown(raw);
  const trimmed = blocks[0]?.type === "h1" ? blocks.slice(1) : blocks;

  return (
    <>
      <SiteHeader revealAfter={0} />
      <DocPageShell
        eyebrow="release notes"
        title="changelog"
        subtitle="every notable change to DinoDash, in reverse order."
      >
        <ChangelogList blocks={trimmed} />
      </DocPageShell>
      <SiteFooter />
    </>
  );
}

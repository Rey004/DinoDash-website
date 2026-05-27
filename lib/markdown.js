/**
 * Pure markdown parser used in both server and client code.
 *
 * Block types: "h1"|"h2"|"h3"|"h4"|"p"|"ul"|"ol"|"hr"|"table"
 */

export function parseMarkdown(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // image: ![alt](placeholder:slot-id) or ![alt](/path/to/image.png)
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imageMatch) {
      const alt = imageMatch[1];
      const src = imageMatch[2];
      if (src.startsWith("placeholder:")) {
        blocks.push({
          type: "image",
          placeholder: true,
          id: src.slice("placeholder:".length),
          alt,
        });
      } else {
        blocks.push({ type: "image", src, alt });
      }
      i += 1;
      continue;
    }

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (/^---+\s*$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      blocks.push({
        type: `h${Math.min(4, level)}`,
        text: headingMatch[2],
      });
      i += 1;
      continue;
    }

    if (line.includes("|") && lines[i + 1] && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const head = splitRow(line);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: "table", head, rows });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    const paragraph = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,6}\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i].trim()) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      paragraph.push(lines[i]);
      i += 1;
    }
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
    }
  }

  return blocks;
}

function splitRow(line) {
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((c) => c.trim());
}

/** Inline parser — returns an array of strings/objects for React children */
export function parseInline(text) {
  if (!text) return [];

  const out = [];
  let i = 0;
  while (i < text.length) {
    const rest = text.slice(i);

    const linkMatch = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      out.push({ type: "link", text: linkMatch[1], href: linkMatch[2] });
      i += linkMatch[0].length;
      continue;
    }

    if (rest.startsWith("**")) {
      const end = rest.indexOf("**", 2);
      if (end > -1) {
        out.push({ type: "bold", text: rest.slice(2, end) });
        i += end + 2;
        continue;
      }
    }

    if (rest.startsWith("*") && rest[1] !== " ") {
      const end = rest.indexOf("*", 1);
      if (end > -1) {
        out.push({ type: "em", text: rest.slice(1, end) });
        i += end + 1;
        continue;
      }
    }

    if (rest.startsWith("`")) {
      const end = rest.indexOf("`", 1);
      if (end > -1) {
        out.push({ type: "code", text: rest.slice(1, end) });
        i += end + 1;
        continue;
      }
    }

    let plain = "";
    while (i < text.length && !text.slice(i).match(/^(\*\*|\*[^ ]|`|\[)/)) {
      plain += text[i];
      i += 1;
    }
    if (plain) out.push(plain);
    if (!plain) {
      out.push(text[i]);
      i += 1;
    }
  }
  return out;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

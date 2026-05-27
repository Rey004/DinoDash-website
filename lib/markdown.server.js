import "server-only";
import fs from "fs";
import path from "path";

// Pin tracing to the `docs/` subfolder. The static argument tells
// Turbopack exactly which directory to trace, so it can't fall back
// to "everything under cwd".
const DOCS_DIR = path.join(process.cwd(), "docs");

/**
 * Server-only filesystem helper — reads a markdown file inside `docs/`.
 *
 * Pass either a name like "documentation.md" or a path that already
 * starts with "docs/"; both resolve to the same place.
 */
export function readMarkdown(rel) {
  const name = rel.replace(/^docs[\\/]/, "");
  const full = path.join(DOCS_DIR, name);
  return fs.readFileSync(full, "utf8");
}

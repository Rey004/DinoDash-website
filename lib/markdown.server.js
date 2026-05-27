import "server-only";
import fs from "fs";
import path from "path";

/** Server-only filesystem helper — reads a file relative to the project root. */
export function readMarkdown(rel) {
  const full = path.join(process.cwd(), rel);
  return fs.readFileSync(full, "utf8");
}

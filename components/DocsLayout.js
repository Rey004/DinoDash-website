"use client";

import { useEffect, useMemo, useState } from "react";
import { slugify } from "@/lib/markdown";
import MarkdownRenderer from "./MarkdownRenderer";

/**
 * Define which TOC entries should appear as nested children under a
 * parent. Keys and values are heading text (will be slugified).
 *
 * If a parent is listed here, every child entry is moved into it and
 * the parent renders as a collapsible group.
 */
const TOC_GROUPS = {
  Widgets: [
    "Today's Run",
    "Favourite Links",
    "History Sidebar",
    "Analytics",
  ],
};

export default function DocsLayout({ blocks }) {
  const flatToc = useMemo(
    () =>
      blocks
        .filter((b) => b.type === "h2")
        .map((b) => ({ label: b.text, id: slugify(b.text) })),
    [blocks]
  );

  // build a tree out of flatToc using TOC_GROUPS
  const tree = useMemo(() => buildTree(flatToc), [flatToc]);

  const [active, setActive] = useState(flatToc[0]?.id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  // initialise group state — open by default if active section is inside
  useEffect(() => {
    const initial = {};
    for (const node of tree) {
      if (node.children) {
        const containsActive = node.children.some((c) => c.id === active);
        initial[node.id] = containsActive || node.id === slugify("Widgets");
      }
    }
    setOpenGroups((prev) => ({ ...initial, ...prev }));
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when active section changes, auto-open its parent group
  useEffect(() => {
    for (const node of tree) {
      if (node.children?.some((c) => c.id === active)) {
        setOpenGroups((g) => ({ ...g, [node.id]: true }));
      }
    }
  }, [active, tree]);

  // scrollspy
  useEffect(() => {
    if (!flatToc.length) return;
    const els = flatToc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);

    const onScroll = () => {
      const offset = 140;
      let current = els[0]?.id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [flatToc]);

  const toggleGroup = (id) =>
    setOpenGroups((g) => ({ ...g, [id]: !g[id] }));

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
      {/* desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
            on this page
          </div>
          <nav className="mt-4 max-h-[calc(100svh-160px)] overflow-y-auto border-l border-white/10 pr-2 no-scrollbar">
            {tree.map((node) => (
              <TocNode
                key={node.id}
                node={node}
                active={active}
                isOpen={!!openGroups[node.id]}
                onToggle={() => toggleGroup(node.id)}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* mobile collapsible TOC */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between border border-white/15 bg-white/[0.02] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/75 hover:border-white/40"
        >
          <span>on this page</span>
          <span
            aria-hidden
            className={`transition-transform ${mobileOpen ? "rotate-90" : ""}`}
          >
            ›
          </span>
        </button>
        {mobileOpen && (
          <nav className="mt-2 border-l border-white/10">
            {tree.map((node) => (
              <TocNode
                key={node.id}
                node={node}
                active={active}
                isOpen={!!openGroups[node.id]}
                onToggle={() => toggleGroup(node.id)}
                onLinkClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        )}
      </div>

      {/* content */}
      <div className="min-w-0">
        <MarkdownRenderer blocks={blocks} />
      </div>
    </div>
  );
}

/* ---- tree builder ---- */

function buildTree(flat) {
  // map child slug -> parent slug
  const childToParent = new Map();
  for (const [parent, children] of Object.entries(TOC_GROUPS)) {
    const parentSlug = slugify(parent);
    for (const c of children) childToParent.set(slugify(c), parentSlug);
  }

  // placeholder map for parents (so groups appear even if their parent
  // heading happens not to be in the doc)
  const parentMap = new Map();
  for (const parent of Object.keys(TOC_GROUPS)) {
    parentMap.set(slugify(parent), {
      label: parent,
      id: slugify(parent),
      children: [],
    });
  }

  const out = [];
  for (const node of flat) {
    const parentSlug = childToParent.get(node.id);
    if (parentSlug) {
      const parent = parentMap.get(parentSlug);
      parent.children.push(node);
      // ensure the parent appears once in `out`, in the order it first
      // appears in the document
      if (!out.includes(parent)) out.push(parent);
      continue;
    }
    if (parentMap.has(node.id)) {
      // if the parent heading itself appears, ensure it's in the list
      const parent = parentMap.get(node.id);
      parent.label = node.label;
      if (!out.includes(parent)) out.push(parent);
      continue;
    }
    out.push(node);
  }
  return out;
}

/* ---- tree renderer ---- */

function TocNode({ node, active, isOpen, onToggle, onLinkClick }) {
  if (!node.children) {
    return (
      <TocLink t={node} active={active === node.id} onClick={onLinkClick} />
    );
  }

  const containsActive = node.children.some((c) => c.id === active);
  const expanded = isOpen || containsActive;

  return (
    <div>
      <div
        className={`flex items-stretch border-l-2 ${
          containsActive ? "-ml-px border-white" : "border-transparent"
        }`}
      >
        <a
          href={`#${node.id}`}
          onClick={onLinkClick}
          className={`flex-1 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
            active === node.id || containsActive
              ? "text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          {node.label}
        </a>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
          className="inline-flex h-7 w-7 items-center justify-center text-[10px] text-white/55 hover:text-white"
        >
          <span
            aria-hidden
            className={`inline-block transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            ›
          </span>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          expanded ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="ml-3 border-l border-white/10">
          {node.children.map((child) => (
            <TocLink
              key={child.id}
              t={child}
              active={active === child.id}
              onClick={onLinkClick}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TocLink({ t, active, onClick, compact = false }) {
  return (
    <a
      href={`#${t.id}`}
      onClick={onClick}
      className={`block border-l-2 px-4 ${
        compact ? "py-1 text-[10.5px]" : "py-1.5 text-[11px]"
      } font-mono uppercase tracking-[0.18em] transition-colors ${
        active
          ? "-ml-px border-white text-white"
          : "border-transparent text-white/55 hover:text-white"
      }`}
    >
      {t.label}
    </a>
  );
}

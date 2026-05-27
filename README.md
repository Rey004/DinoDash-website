# DinoDash — Landing Page

Cinematic, scroll-driven landing page for the DinoDash Chrome new-tab extension.
Seven acts. Pure black & white. Built on Next.js + Tailwind + Framer Motion.

## Stack

- **Next.js 14** (App Router, JS only)
- **Tailwind CSS 3.4**
- **Framer Motion** for scroll & gesture animations

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.js          # Fonts + global shell
  page.js            # Composes the seven acts
  globals.css        # Tailwind + small global helpers
components/
  Act1Boot.js        # Terminal boot → cinematic hero
  Act2Curtain.js     # Draggable before/after curtain
  Act3Portals.js     # Dimensional portal cards
  Act4GameStrip.js   # Live scrolling game strip
  Act5ExplodedTab.js # Exploded new-tab UI
  Act6Receipt.js     # Privacy receipt
  Act7StartingLine.js# In-game start screen + CTA
  AssetSlot.js       # Placeholder for swappable assets
  Rain.js            # CSS rain particle layer
  SiteFooter.js      # Footer
ASSETS.md            # Full list of assets to drop in later
```

## Assets

The whole site uses placeholder slots wherever real artwork should go.
See **[ASSETS.md](./ASSETS.md)** for the full list, suggested file paths, and
a copy-paste recipe for swapping placeholders for real images.

## Notes

- Palette is strictly black & white. Add real artwork later in monochrome to keep the look cohesive.
- Most animations are scroll-linked via `useScroll` so they "feel" the page.
- The Act 7 CTA also responds to the spacebar — the website itself is the demo.

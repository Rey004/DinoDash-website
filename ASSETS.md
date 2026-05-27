# DinoDash — Required Assets

All assets go inside `public/assets/`. Keep everything black & white to match the site palette.

---

## Already added

- [x] `public/assets/logo-dark.webp` — used in header, footer, favicon, and every act
- [x] `public/assets/background.webp` — Act 1 skyline backdrop (`act1-skyline-bg`)
- [x] `public/assets/idle-dino.webp` — Act 1 dino idle (`act1-dino`)
- [x] `public/assets/run-dino.webp` — Act 5 running dino (used in `the game, on rails` strip)
- [x] `public/assets/default-new-tab.webp` — Act 2 "before" screenshot (`act2-default-tab`)
- [x] `public/assets/dino-new-tab.webp` — Act 2 "after" screenshot (`act2-dino-tab`)

---

## Act 1 — The Hook (Terminal Boot + Cinematic Hero)

File: `components/Act1Boot.js`

- [x] `public/assets/background.webp` → `act1-skyline-bg`
- [x] `public/assets/idle-dino.webp` → `act1-dino`

---

## Act 2 — The Contrast (Draggable Curtain)

File: `components/Act2Curtain.js`

- [x] `public/assets/default-new-tab.webp` → `act2-default-tab`
  - the "before" panel — flat default Chrome new tab
- [x] `public/assets/dino-new-tab.webp` → `act2-dino-tab`
  - the "after" panel — DinoDash new tab in action

Both screenshots are full-bleed `object-cover` with `object-top`, so the chrome bar at the top stays aligned even at different aspect ratios.

---

## Act 3 — The Worlds (Portal Cards)

File: `components/Act3Portals.js`

- [ ] `public/assets/backdrops/dark-valley-portal.png` → `act3-valley-bg`
  - tighter / vertical framing of the valley scene
- [ ] `public/assets/backdrops/mystic-forest-portal.png` → `act3-forest-bg`
  - tall pines silhouette, foggy / breathy
- [ ] `public/assets/dino/dino-walk.gif` → `act3-dino-dark-valley`
  - walk cycle for the valley card
- [ ] `public/assets/dino/dino-walk.gif` → `act3-dino-mystic-forest`
  - walk cycle for the forest card (same file is fine)

The third "?" card is intentionally locked — no art asset.

---

## Act 4 — The Game (Live Scrolling Strip)

File: `components/Act4GameStrip.js`

- [ ] `public/assets/backdrops/strip-loop.png` → `act4-strip-bg`
  - looping city silhouette, must tile horizontally
- [ ] `public/assets/dino/dino-run.gif` → `act4-dino-run`
  - run cycle (or sprite-sheet if you'd rather animate in code)
- [ ] `public/assets/obstacles/cactus.png` → `act4-obstacle-cactus`
- [ ] `public/assets/obstacles/rock.png` → `act4-obstacle-rock`
- [ ] `public/assets/obstacles/post.png` → `act4-obstacle-post`
- [ ] `public/assets/obstacles/crate.png` → `act4-obstacle-crate`
- [ ] `public/assets/obstacles/log.png` → `act4-obstacle-log`

---

## Act 3 — The Anatomy (was Act 5)

File: `components/Act5ExplodedTab.js`

The full new-tab screenshot already lives in the preview frame. Each
widget below is a transparent-background **PNG / WebP crop of that same
screenshot**, isolating just one UI element. Sizes are guidelines —
the slot itself is the bounding box, so close-enough is fine.

Background of each crop: **transparent**. Recommended export at 2× the
visible size for crispness. Use `object-contain` so the asset is letterboxed inside its slot.

| Asset id              | What to crop from the new-tab screenshot                                  | Suggested filename                          | Approx px (1× / 2×)  |
|-----------------------|---------------------------------------------------------------------------|---------------------------------------------|----------------------|
| `act5-tab-screenshot` | the full new tab (already wired to `dino-new-tab.webp`)                   | `dino-new-tab.webp`                         | 1919 × 1021 (used)   |
| `act5-logo`           | the "DinoDash" logo + wordmark in the top-left corner                     | `ui/widget-logo.webp`                       | 160 × 36 / 320 × 72  |
| `act5-syslog`         | the SYS.LOG popup (full card with traffic-light dots and the message)     | `ui/widget-syslog.webp`                     | 300 × 88 / 600 × 176 |
| `act5-todays-run`     | the "TODAY'S RUN 0/3 ›" pill in the top-right                             | `ui/widget-todays-run.webp`                 | 180 × 44 / 360 × 88  |
| `act5-search`         | the Google wordmark + search bar + "Press SPACE" hint, as one block       | `ui/widget-search.webp`                     | 580 × 200 / 1160 × 400 |
| `act5-memory-panel`   | the entire BROWSING MEMORY side panel (history + analytics tabs included) | `ui/widget-memory-panel.webp`               | 360 × 600 / 720 × 1200 |
| `act5-corner-left`    | the bottom-left strip: bookmark, like, and "Enhanced Mode" pill           | `ui/widget-corner-left.webp`                | 230 × 40 / 460 × 80  |
| `act5-corner-right`   | the bottom-right group: memory, theme, and settings buttons               | `ui/widget-corner-right.webp`               | 140 × 40 / 280 × 80  |

How to swap one in:

```jsx
<Spot
  weight={wMemory}
  className="absolute right-[1.5%] top-[24%] h-[58%] w-[26%]"
  data-asset="act5-memory-panel"
>
  <img
    src="/assets/ui/widget-memory-panel.webp"
    alt=""
    className="h-full w-full object-contain"
    draggable={false}
  />
</Spot>
```

Tips:
- Crop **with a small transparent margin** around the widget so the soft white glow on highlight doesn't get clipped.
- For the SYS.LOG and search popups, leave their **rounded corners visible** in the export rather than cropping flush.
- The memory panel is the tallest asset — export it at the full panel height and let `object-contain` letterbox it inside the slot.

---

## Act 6 — Trust & Privacy (Receipt)

File: `components/Act6Receipt.js`

No image assets required. The receipt is fully styled in CSS.

Optional:
- [ ] `public/assets/ui/paper-grain.png` — subtle paper texture overlay if you want extra realism

---

## Act 7 — The Call (Starting Line)

File: `components/Act7StartingLine.js`

- [ ] `public/assets/backdrops/startscreen.png` → `act7-startscreen-bg`
  - exact match for the in-game start screen
- [ ] `public/assets/dino/dino-ready.png` → `act7-dino-start`
  - ready stance with a slight idle bob added in JS

---

## How to swap a placeholder for a real asset

In any component, replace:

```jsx
<AssetSlot id="act1-dino" className="...">
  dino sprite (idle stance)
</AssetSlot>
```

with:

```jsx
<img
  src="/assets/dino/dino-idle.png"
  alt="DinoDash dino"
  className="h-full w-full object-contain"
  data-asset="act1-dino"
/>
```

Use `object-cover` instead of `object-contain` for full-bleed backdrops.

---

## Minimum set to look "real"

If you only ship a handful of files first, prioritize these. They cover Acts 1, 2, 3, 4, 5, and 7 at once:

1. `dino/dino-idle.png` — Acts 1, 2, 5
2. `dino/dino-run.gif` — Act 4
3. `dino/dino-ready.png` — Act 7
4. `backdrops/dark-valley-skyline.png` — Acts 1 & 2
5. `backdrops/mystic-forest-portal.png` — Act 3
6. `ui/newtab-full.png` — Act 5
7. `backdrops/startscreen.png` — Act 7

Everything else has a graceful placeholder.

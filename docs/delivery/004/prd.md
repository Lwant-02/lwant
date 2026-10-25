# PBI-004 — The board's look: Night sticker, dark only, cover B

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"I like cover B"* |
| **Created** | 2026-10-25 |
| **Source** | Owner, 2026-10-25, on the design canvas (<https://claude.ai/artifact/KphYoCUUEh4WLuMGk2YeEq>, private to the owner): *"I dont like the style yet … pls propose me the polish design"*; *"what about desing to make it seem like logo design then they match??"*; *"I kinda like no.3 but the cover does not looking good and no need the theme just make it dark theme is good now pls redesign the cover for no.3 and no need the bg for the logo"*; *"I like cover B"*. |
| **Decided already** (owner, 2026-10-25) | **No. 3, *Night sticker*** — the board in the logo's own look: Titan One in the logo's yellow with an ink outline, extruded depth and a white die-cut edge; sections as colour panels with a white edge; cards as white stickers with ink depth. **Dark only** — no theme switch. **The logo straight on the canvas**, no box behind it. **Cover B** — the wordmark as the hero, then a photo sticker with the name and role, the line, the two calls to action. |
| **Depends on** | PBI-002, PBI-003 |

## Problem

The owner doesn't like the board's look (PBI-002's Excalidraw-sketchy: rough.js strokes, Architects Daughter, pastel
highlighters, light and dark), and it doesn't match the logo PBI-003 put on it. The design canvas's no. 3 and its
cover B are the look the owner chose.

## Why it matters

The board and the logo read as one thing: the first screen is the logo, and everything after it is made of the same
material — yellow lettering, ink, white die-cut edges.

## Proposal

The mechanics stay — the camera, the hand, the tour, the cover's two ways in, the section bar, zoom, focus into view,
*Reduce motion*, the snake, the redirects. Only the look changes, as the canvas's no. 3 board and cover B draw it:

1. **Dark only**: night `#17171A` with `#323238` dots; `next-themes`, `ThemeProvider` and the theme button gone;
   `color-scheme: dark`, one `theme-color`.
2. **Type**: Titan One (the logo's face) for titles, buttons and what's drawn; Nunito for reading. Architects
   Daughter gone.
3. **The logo's lettering** as a utility (`.ltd`): yellow `#FFD84D`, an ink outline, extruded ink depth and a white
   die-cut edge — the section titles, the 404.
4. **Sections**: colour panels (About `#FFD84D`, Education `#8EC5FF`, Projects `#8FE3A6`, Achievements `#FFA8A8`,
   Experience `#C3B1FF`, Connect `#FFC184`), an ink border and a white die-cut edge, the title on the top edge.
   **Cards**: white stickers, ink border and extruded ink depth, tilted ±1° in turn; dates as yellow pills, tags as
   tinted pills, a link out as a yellow chip.
5. **The path**: white curved arrows with a filled head — plain SVG from `lib/arrows.ts`, tested. **rough.js and its
   measured strokes go** (`lib/sketch.ts`, `components/board/sketch.tsx`): nothing is drawn from a measured size now
   but the path.
6. **Controls**: dark islands; the logo (`lwant-logo-dark.svg`) top left with no island; the section bar's current
   section in its own colour, in Titan One; the tour bar's pause a yellow keycap; a progress bar filling by step.
7. **Cover B**: the wordmark large, a round photo sticker beside the name (the page's `<h1>`) and the role, the line,
   **Watch the tour** and **Explore the board** as keycaps, the hint.
8. **The 404** in the same look.

## Conditions of Satisfaction

1. The page is dark whatever the system's theme: no theme button, no `next-themes` in `package.json`, `color-scheme`
   dark, one `theme-color` `#17171A`.
2. The cover shows the wordmark, the photo, the name as the `<h1>`, the role, the line and the two calls to action.
3. Each section is its colour panel with its title in the logo's lettering; cards are white stickers; the path is
   drawn between all six sections in the tour's order.
4. The logo shows top left with no box behind it; the current section is marked in the section bar during the tour.
5. `roughjs` is out of `package.json`; nothing imports `lib/sketch.ts` or `components/board/sketch.tsx`.
6. PBI-002's conditions still hold: every title from `data/` in the HTML, the redirects, the 404s, and the browser
   checks — the cover inert, the tour's six stops and its auto-advance, a hand pausing it, the wheel, the keys,
   focus into view, *Reduce motion*, no hydration warning.
7. `npm test` (with `lib/arrows.ts`'s tests), `npm run lint`, `npm run build` pass.
8. Screenshots at 1440 × 900 and 390 × 844: the cover and the six stops. **Owner: human** — the look against the
   canvas.

## Verification (2026-10-25)

Against `npm run build && npm start`, on this Mac:

- **1** `color-scheme` `dark` and one `theme-color` `#17171a` in the page; no theme button in it; `package.json`'s
  dependencies are `clsx`, `lucide-react`, `next`, `react`, `react-dom`, `tailwind-merge`.
- **5** nothing in `app/`, `components/`, `lib/` or `tests/` imports `roughjs`, `next-themes`, `lib/sketch.ts`,
  `components/board/sketch.tsx`, the theme button or the theme provider.
- **6** `curl /`: 39 of 39 titles, headings and calls to action; `/about`, `/projects/thock`, `/ask-me` → 308;
  `/nope` → 404, the new 404. PBI-002's 21 browser checks pass in headless Chrome at 1440 × 900 and 390 × 844.
- **7** `npm test` — 9, `lib/arrows.ts`'s two new ones failing when `between` is broken and the bow made one-sided;
  `tsc --noEmit`, `npm run lint`, `npm run build` pass.
- **2–4, 8** screenshots of the cover and the six stops at both widths, compared with the canvas's cover B and no. 3
  board. Two things found and fixed on the way: the faces fell back to the system's — `--font-display` named
  next/font's variable in `@theme`, which resolves on `:root`, where it doesn't exist; it's `@theme inline` now — and
  a section's title, which sits half above the section, slid under the section bar: the tour frames the title with
  its section now.
- **Found, not fixed**: on a phone the tour drifts through Projects at about 400 px a second — eight tall cards in its
  14 s hold. A longer hold would make the tour longer than *about a minute* on a phone; it's in `docs/design.md`'s
  risks, for the owner.
- **8** the look against the canvas: **Owner: human**.

## Notes

- The canvas's boards are static comps; where they leave something open — About, Education, Experience,
  Achievements and Connect in the new look, the phone — the build carries no. 3's rules over and says so.
- PBI-002's look decision in `docs/design.md` is superseded, with the date.

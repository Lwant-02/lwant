# PBI-003 — The Lwant logo on the board, and its icons and share images

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner, in the session that designed the logo: *"I like no. 2 now we got it then put them"*; placement *"Top-left corner"*. Handed to this session by that one, which touched no repo file. |
| **Created** | 2026-10-25 |
| **Source** | The owner's words above, relayed with the files — the wordmark (light and dark), the browser icon, `favicon.ico`, `apple-icon.png` and two share images, Titan One (OFL) in outlines |
| **Decided already** (owner, 2026-10-25) | **Design no. 2**, a yellow `#ffd84d` *Lwant* with ink outline and depth and a sparkle; a white edge in the dark. **On the board's top-left corner**, where Excalidraw keeps its menu, on its own island. |
| **Depends on** | PBI-002 |

## Problem

The board has no mark of its own. The tab shows `public/hamster.png` (`app/layout.tsx`: `icons: { icon: "/hamster.png" }`),
and a shared link previews the same 96 × 96 hamster (`openGraph.images`, `twitter.images`) — at a size most platforms
show as a thumbnail, or not at all.

## Why it matters

The logo is the first thing a visitor's tab, bookmark or a shared link shows; on the board it says whose it is once
the cover has gone.

## Proposal

1. **The wordmark, top left**, in `components/board/controls.tsx`: an island like the others, as tall as the section
   bar (44 px), the wordmark 32 px tall in it; `lwant-logo.svg` in light, `lwant-logo-dark.svg` in dark (`dark:hidden`
   / `hidden dark:block`). On a wide board it sits in the corner and the section bar stays centred; on a phone it
   leads the top row, before the section bar. Not a link: the board is the one page. Not on the cover — not asked.
2. **The icons, by Next's file conventions**: `app/icon.svg` (it turns itself for a dark tab), `app/favicon.ico`,
   `app/apple-icon.png`; `icons: { icon: "/hamster.png" }` out of `app/layout.tsx`.
3. **The share images** in `public/`: `lwant-share.png` (1200 × 630) for `openGraph` and `twitter`, the card
   `summary_large_image`; `lwant-share-square.png` (512) as `openGraph`'s second.
4. **`public/hamster.png` goes** — nothing references it after this.

## Conditions of Satisfaction

1. At 1440 and 390, light and dark, the wordmark shows top left on the board — the dark one with its white edge in
   dark — without covering the section bar or the theme button.
2. `GET /` links `icon.svg`, `favicon.ico` and `apple-icon.png`, and they answer 200; no `hamster.png` is linked, and
   `/hamster.png` answers 404.
3. `og:image` and `twitter:image` are `lwant-share.png`, 1200 × 630, and answer 200; `twitter:card` is
   `summary_large_image`.
4. Every shipped SVG holds paths and styles only: no script, no event handler, no outside reference.
5. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks from PBI-002 still pass.
6. The logo on the board, as the owner wants it. **Owner: human**.

## Verification (2026-10-25)

- **4** the three SVGs scanned before copying: paths and one `<style>` (the icon's dark rule) — no script, handler,
  `foreignObject`, `<image>` or outside reference.
- **2, 3** `npm run build && npm start`, `curl /`: `icon.svg`, `favicon.ico` (48 × 48) and `apple-icon.png`
  (180 × 180) linked, each 200; `og:image` `lwant-share.png` 1200 × 630 and `lwant-share-square.png` 512 × 512, 200;
  `twitter:card` `summary_large_image`, `twitter:image` `lwant-share.png`; no `hamster` in the page, `/hamster.png` 404.
- **1** screenshots at 1440 × 900 and 390 × 844, light and dark: the wordmark top left on its own island, the dark
  one with its white edge; the section bar and the theme button clear of it.
- **5** `npm test` (8), `npm run lint`, `npm run build` pass; PBI-002's 21 browser checks pass.
- **6** **Owner: human**.

## Notes

- The wordmark's viewBox is 578 × 260 (the handoff said 553 × 260); sized from the file.
- **Not settled**: the logo on the cover — the owner placed it top left only.

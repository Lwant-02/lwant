# PBI-006 — No section bar, no zoom controls: zoom by hand and keys alone

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"I dont like to add the navbar no need to add and the control as well no need to show but user still can zoom in and out"* |
| **Created** | 2026-10-25 |
| **Source** | The owner's words above. |
| **Decided already** (owner, 2026-10-25) | **The section bar goes. The zoom controls go. Zooming stays** — the wheel with Ctrl or ⌘, a pinch, `+`, `−` and `0`. |
| **Depends on** | PBI-004 |

## Problem

The board's top bar of six sections and its bottom-left zoom island (`components/board/controls.tsx`) are chrome the
owner doesn't want on the board.

## Proposal

- `components/board/controls.tsx`: the section bar and its scrolling, and the zoom island (−, %, +, *show it all*),
  out. **Kept**: the logo top left; while watching, the tour bar — back, pause or play, next, the section and its
  progress — the one way to stop or step the tour; while exploring, *Watch the tour*. (The owner named the bar and the
  zoom controls; the tour's controls are named here as kept, for the owner to say otherwise.)
- `components/board/board.tsx`: `jump` goes with the bar; zooming by the wheel, a pinch and the keys is untouched,
  and `0` still shows the whole board.

## Conditions of Satisfaction

1. The board shows no section bar and no zoom controls, at 1440 and 390, watching and exploring.
2. Ctrl or ⌘ + wheel zooms; `+` and `−` zoom; `0` shows the whole board; a pinch runs through the same `zoomAt`.
3. The tour still plays, pauses, steps and moves on by itself; the board's other browser checks pass.
4. `npm test`, `npm run lint`, `npm run build` pass.
5. The board without them, as the owner wants it. **Owner: human**.

## Verification (2026-10-25)

- **1** headless Chrome at 1440 × 900 and 390 × 844: no `Sections` navigation and no *Zoom in* button, watching and
  exploring; screenshots show the logo, the board and the tour's controls alone.
- **2** Ctrl + wheel zooms (to the 250% cap), the wheel pans, `+` zooms, `0` fits — the browser checks; a pinch runs
  through the same `zoomAt`, still untried on a real phone.
- **3** the tour's six stops, About's hold moving on by itself (now started from the cover), a drag pausing it — 22
  browser checks pass, with the new one for the bar and the zoom controls.
- **4** `npm test` (9), `tsc --noEmit`, `npm run lint`, `npm run build` pass.
- **5** **Owner: human**.

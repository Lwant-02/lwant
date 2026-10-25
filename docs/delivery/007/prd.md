# PBI-007 — See more: Projects and Achievements folded to their first cards, the rest unfolding

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"for the project and achievement as u see too long what if we add like see more and add animtion like that?"* |
| **Created** | 2026-10-25 |
| **Source** | The owner's words above. |
| **Decided already** (owner, 2026-10-25) | Projects and Achievements show part of their list and a **See more** for the rest, which **unfolds with an animation**. |
| **Depends on** | PBI-004, PBI-005 |

## Problem

Projects holds seven cards (`data/project.ts`) — four rows on a wide board, seven cards on a phone — and Achievements
two achievements and ten certifications (`data/achievement.ts`, `data/certification.ts`). Both run far below their
neighbours, and the tour drifts through Projects on a phone at about 400 px a second (`docs/design.md`, *Risks*).

## Proposal

- **`lib/more.ts`**, plain TypeScript: `split(items, shown)` — the cards the board shows and the ones folded — and
  `seeMore(count, noun)` — *See 3 more projects*, *See 1 more certificate*. Tested with `node --test`.
- **`components/sections/more.tsx`**, a client leaf: the folded cards, server-rendered as `children`, under a
  **See N more** button (`aria-expanded`, `aria-controls`). Folded, they're `inert` — not tabbed to, not read — and
  still in the HTML. Unfolding opens their height (a grid row from `0fr` to `1fr`) and the cards pop in one after
  another, as stickers slapped down; **See less** folds them back, and the board brings the button back into view.
  Under *Reduce motion*, both are instant.
- **Projects** shows its first four (two rows on a wide board); **Achievements** its two achievements and the first
  four certifications. The numbers are the agent's choice, for the owner to change.
- **`components/board/board.tsx`**: a press on a button or a link on the board pauses the tour, as a drag does; the
  world growing or shrinking no longer re-aims the camera (it did on any resize of the world, and would snap it back to
  the section's top as the cards unfold); the board brings a revealed element into view as it does a focused link.
- The tour holds and drifts through what's shown.

## Conditions of Satisfaction

1. `GET /` holds every project and certification, folded ones too.
2. On the board, Projects shows four cards and *See 3 more projects*; Achievements its two achievements, four
   certifications and *See 6 more certificates*; the folded links aren't reachable by Tab.
3. *See more* unfolds the rest, its cards animating in, and turns to *See less*, which folds them back; under *Reduce
   motion*, with no animation.
4. Pressing *See more* while the tour plays pauses it; the camera stays where it was.
5. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks pass.
6. How many cards show, and the animation, as the owner wants them. **Owner: human**.

## Verification (2026-10-25)

- **Tests**: `lib/more.ts`'s two new tests failed against a broken `split` and `seeMore` before passing; `npm test`
  (11), `tsc --noEmit`, `npm run lint`, `npm run build` pass.
- **1** `npm run build && npm start`, `curl /`: all seven projects and all ten *View certificate* links in the HTML;
  the two folds carry `inert`.
- **2** headless Chrome at 1440 × 900 and 390 × 844: Projects shows four cards and *See 3 more projects*, the fold
  0 px tall, `inert`, its three links out of reach; Achievements *See 6 more certificates*, likewise.
- **3** *See more*, by keyboard: the fold opens (947 px at 1440, 1612 px at 390), its cards running the `pop`
  animation, the button turning to *See less*; *See less* folds it back and the board brings the button into view
  (at 429 px of 900, 399 px of 844); the board never scrolls itself. Under *Reduce motion*, *See more* opens at once,
  with no animation running.
- **4** At the Projects stop of the tour at 1440, *See more* pressed: the tour paused, the camera where it was, and
  still there 600 ms later.
- **5** the board's browser checks: 35 pass (the 22 before, and 13 for this).
- **6** **Owner: human**. Four projects and four certifications show; the numbers are `SHOWN` in
  `components/sections/projects.tsx` and `achievements.tsx`. The tour's holds are unchanged: Projects still holds
  14 s, now over four cards.

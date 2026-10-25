# PBI-008 — Experience: Software Engineer at Scalation.ai in, and the list folded under See more

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"good the experiences as well and I got one more experisnce at software engineering at Scalation.ai u can get some info and put here and start from June this year and present"* |
| **Created** | 2026-10-25 |
| **Source** | The owner's words above. |
| **Decided already** (owner, 2026-10-25) | Experience gets **See more**, as Projects and Achievements have (PBI-007). A new role, newest: **Software engineering at Scalation.ai, June 2026 to present**. |
| **Depends on** | PBI-007 |

## Problem

Experience runs to five cards (`data/experience.ts`) in one column, and the owner's current role, at Scalation.ai,
isn't on the board.

## Proposal

- **`data/experience.ts`**: first in 2026, *Software Engineer*, *Scalation.ai*, *Jun 2026 - Present*, a link to
  <https://scalation.ai>. Its line is about the product, from Scalation's own site (its title: *"AI Powered Hotel
  Revenue Management & Dynamic Pricing"*; its description: *"Scalation helps independent hotels maximise revenue with
  AI powered dynamic pricing, competitor intelligence, and a suggested price for every night"*) — not about what the
  owner does there, which is the owner's to say.
- **`components/sections/timeline.tsx`**: `Roles` takes how many to show; Experience shows its first three, the rest
  under *See 3 more experiences* (`More`, PBI-007). Education, at two, is untouched.
- **`app/globals.css`**: the cards' pop runs on an ordered list's items too.

## Conditions of Satisfaction

1. `GET /` holds the Scalation.ai role and its link, and every other experience.
2. On the board Experience shows three cards, Scalation.ai first, and *See 3 more experiences*; it unfolds and folds as
   Projects' does, its cards popping in.
3. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks pass.
4. The role's title and line as the owner wants them. **Owner: human**: the title is read from *"software
   engineering"*, the line from Scalation's site.

## Verification (2026-10-25)

- **Scalation's site**: plain requests are blocked by Cloudflare (403); read in a real Chrome window, its title and
  description as quoted above. The card's line is drawn from them.
- **1** `npm run build && npm start`, `curl /`: *Scalation.ai*, *Jun 2026 - Present*, `https://scalation.ai` and
  *See 3 more experiences* in the HTML, and every other experience.
- **2** headless Chrome at 1440 × 900 and 390 × 844: Experience shows Scalation.ai, LiveIn Thailand and Rangsit
  University, the fold 0 px tall and `inert`; *See more* opens it (594 px at 1440, 854 px at 390), its cards running
  `pop`; *See less* folds it.
- **3** `npm test` (11), `tsc --noEmit`, `npm run lint`, `npm run build` pass; the board's browser checks: 39 pass.
- **4** **Owner: human**. The title *Software Engineer* is read from *"software engineering"*; the line says what
  Scalation is, not what the owner does there.

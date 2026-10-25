# PBI-005 — Projects: Kippy and Khae Lik Dai in, Tai Expense, Ping Pal and AI Mock Job Interview out

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"for the project pls remove the Tai Expense , Ping pal chat app and AI MOck job one and replace with these 2 - heykippy.app and khaelikdai.com u can go to the website and capture for the cover"* |
| **Created** | 2026-10-25 |
| **Source** | The owner's words above. |
| **Decided already** (owner, 2026-10-25) | Out: *Tai Expense (Offline Tracker)*, *Ping Pal Chat App*, *AI Mock Job Interview*. In: **Kippy** (<https://heykippy.app>) and **Khae Lik Dai** (<https://khaelikdai.com>), each with a screenshot of its live site as its picture. |
| **Depends on** | PBI-004 |

## Problem

`data/project.ts` holds eight projects; the owner wants three of them gone and their two newest products on the board.

## Proposal

1. **`data/project.ts`**: the three entries out; two in, first — the newest — in the shape the others have:
   - **Khae Lik Dai** — from its own README (`/Users/lwant/Desktop/personal/shan-words-racing/README.md`): *"Draw it.
     Race it. Type it in Shan."*, a free party game in the browser for the Shan community, Draw & Guess and Word Race,
     a Shan keyboard built in. Started 2026-10-21 (its PBI-001). Its stack from its `package.json`s: Next.js,
     TypeScript, Colyseus, Tailwind CSS, Motion, next-intl.
   - **Kippy** — from its README (`/Users/lwant/Desktop/personal/kippy/README.md`): a capture layer for macOS, a
     shortcut to a tiny panel to type, speak or grab the screen; hearing and speaking on the Mac with Whisper and
     Kokoro through Core ML, nothing captured leaving it. Started 2026-09-25 (its first commit). Its stack: Swift,
     Core ML, Whisper, Kokoro, and Next.js for the site.
2. **Their pictures**: each site's first screen, captured in headless Chrome at 1460 × 804 at 2× — the size the other
   screenshots are — into `public/images/projects/kippy.png` and `khae-lik-dai.png`.
3. **The three pictures that go with the removed projects** — `tai-expense.png`, `ping-pal.png`, `prepwise.png` —
   leave `public/images/projects/`; nothing else uses them.

Nothing in the board changes: Projects renders whatever `data/project.ts` holds.

## Conditions of Satisfaction

1. `GET /` holds *Khae Lik Dai* and *Kippy* and their links, and none of *Tai Expense*, *Ping Pal* or *AI Mock Job
   Interview*.
2. Both pictures answer 200 and show their site's first screen; the three removed pictures are gone and nothing
   references them.
3. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks pass.
4. Screenshots of Projects on the board at 1440 and 390.
5. The two cards' words — titles, lines, dates, tags — as the owner wants them. **Owner: human**: written from the
   two READMEs and `package.json`s, not by the owner.

## Verification (2026-10-25)

- **Pictures**: khaelikdai.com and heykippy.app answered 200 and were captured in headless Chrome at 1460 × 804, 2×
  (2920 × 1608, as the others), Khae Lik Dai after its splash; Khae Lik Dai's first screen is in Shan, the site's
  default. `tai-expense.png`, `ping-pal.png`, `prepwise.png` removed — nothing referenced them.
- **1, 2** `npm run build && npm start`, `curl /`: both new titles and links in the page, none of the three removed
  ones; `/images/projects/khae-lik-dai.png` and `kippy.png` → 200, `tai-expense.png` → 404; the board asks
  `/_next/image` for both.
- **3** `npm test` (9), `tsc --noEmit`, `npm run lint`, `npm run build` pass; the board's 21 browser checks pass.
- **4** Projects at 1440 × 900 and 390 × 844: the two new cards first.
- **5** **Owner: human**. Kippy's site is a waitlist (*"One email when Kippy is out"*): the card describes what Kippy
  does, as its README does, and doesn't say it's out — whether to say *coming soon* is the owner's.

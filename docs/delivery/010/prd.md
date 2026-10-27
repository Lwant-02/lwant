# PBI-010 — About me: the summary without "1 year of experience", up to date

| | |
| --- | --- |
| **Status** | Done (2026-10-27) |
| **Agreed** | 2026-10-27, owner: *"pls update the content that tell 1 year experinse I want to remove this and may be update the content abit"* |
| **Created** | 2026-10-27 |
| **Source** | The owner's words above. |
| **Decided already** (owner, 2026-10-27) | *"1 year of experience"* goes. The summary may be refreshed. |
| **Depends on** | PBI-008 |

## Problem

About me's summary (`data/about.ts`, `summary`) opens *"Full-Stack Developer with 1 year of experience"*, which the
owner wants gone, and it predates the Scalation.ai role (PBI-008): *"Recently completed an internship"* is no longer
the latest thing.

## Proposal

`data/about.ts`'s `summary`, rewritten **from facts already on the board** — the role at Scalation.ai and what
Scalation is (`data/experience.ts`, PBI-008), the degree at Rangsit University (`data/education.ts`), the projects
(`data/project.ts`), the LINE chatbot internship and the hackathon awards (`data/experience.ts`). No new claim. The
rest of About me — the role, the line, *Beyond the code* — stays.

## Conditions of Satisfaction

1. `GET /` holds no *"1 year of experience"*.
2. Every claim in the new summary is on the board already.
3. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks pass.
4. The summary's words, as the owner wants them. **Owner: human**.

## Verification (2026-10-27)

- **1** `npm run build && npm start`, `curl /`: no *"1 year of experience"*; the new summary in the HTML.
- **2** Each claim and where the board has it: Software Engineer at Scalation.ai and what Scalation does
  (`data/experience.ts`); the ICT degree at Rangsit University, still going (`data/education.ts`); the JS/TS stack
  (the old summary); web and Mac apps, Khae Lik Dai and LikDai (`data/project.ts`); LINE chatbots at LiveIn Thailand
  (`data/experience.ts`); hackathon awards (`data/achievement.ts`, *Winner* and *Third Place*).
- **3** `npm test` (15), `tsc --noEmit`, `npm run lint`, `npm run build` pass. The 39-check browser script was lost
  with the session's scratchpad; in its place, headless Chrome at 1440 × 900 and 390 × 844: the cover opens the tour
  on About me, the console clean, screenshots read.
- **4** **Owner: human**. The role above it still says *Full-Stack Developer*, as the owner had it.

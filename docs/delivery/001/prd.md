# PBI-001 — Khae Lik Dai's PBI process and skills, for the rebuild

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, by the owner's ask below |
| **Created** | 2026-10-25 |
| **Source** | Owner, 2026-10-25: *"pls go and look at the kahelikdai and copy the claude skills and the pbi architure flow ucz we'r going to rebuild my old portfoltio"* |
| **Decided already** | **Khae Lik Dai's process** (`/Users/lwant/Desktop/personal/shan-words-racing`), for a rebuild of this portfolio. |
| **Blocks** | the rebuild's PBIs |

## Problem

The portfolio is about to be rebuilt, and the repo has no way to decide or track what's built next: no backlog, no
design doc, no `AGENTS.md` or `CLAUDE.md`, no skills. Khae Lik Dai, next door, has the process proven — a backlog of
PBIs with ids that can't collide across branches, a PRD and tasks for each, and skills for filing, building,
reviewing and debugging.

## Why it matters

A rebuild is many decisions at once. With the process here, each one is written down before its code, agreed by the
owner, and verified against checkable conditions — rather than settled silently in a scaffold.

## Proposal

1. **`scripts/pbi.mjs`**, copied unchanged — it names no product — and `pbi:next`, `pbi:current`, `pbi:list`,
   `pbi:check` in `package.json`.
2. **The skills, rewritten for a portfolio**: `create-pbi`, `implement-pbi`, `review-checklist` (secrets, what a
   visitor types, claims about the owner, content in `data/`), `debug` (Next 16, SMTP, Gemini).
3. **The design skills**, copied and pinned in `skills-lock.json` as Khae Lik Dai's: `frontend-design`,
   `web-design-guidelines`, `svg-logo-designer`.
4. **The docs**: `AGENTS.md` (what's here, the pattern, the rules, commands, commit messages), `CLAUDE.md`
   (`@AGENTS.md`), `docs/design.md` (the decisions so far and the open questions), `docs/delivery/backlog.md`, this PRD.

**Deliberately not carried over**: `deploy-web` (Khae Lik Dai's Railway project and ids; the portfolio's hosting is
open question 3), `merge-words` (its word packs), and everything about the game — Colyseus, Shan, rooms, the word.
Nothing in the app changes.

## Conditions of Satisfaction

1. `npm run pbi:list` lists 001, `npm run pbi:next` prints `002`, and `npm run pbi:check` reports no collision.
2. `.claude/skills/` holds `create-pbi`, `implement-pbi`, `review-checklist`, `debug`, `frontend-design`,
   `web-design-guidelines`, `svg-logo-designer`; the four rewritten ones carry nothing of Khae Lik Dai's product —
   no Shan, Colyseus, rooms, word packs, Railway or its ids.
3. `AGENTS.md`, `CLAUDE.md`, `docs/design.md` and `docs/delivery/backlog.md` exist, and `docs/design.md` names the
   open questions as 🔴.
4. No file of the app changes but `package.json`'s scripts; nothing is committed until the owner asks.

## Verification (2026-10-25)

- `npm run pbi:list` lists 001 `Done`; `npm run pbi:next` scanned the working tree and 3 refs and printed `002`;
  `npm run pbi:check` found no collision.
- `grep -i` over the four rewritten skills for Shan, Colyseus, Railway, room, word pack, pnpm, khaelikdai and game:
  one match, `implement-pbi`'s pointer to Khae Lik Dai's folder as the reference to read.
- `git status`: `package.json` modified (the `pbi:*` scripts); `.claude/`, `AGENTS.md`, `CLAUDE.md`, `docs/`,
  `scripts/`, `skills-lock.json` new; nothing else.

## Notes

- **The `pnpm` commands became `npm run`** — the portfolio is on npm today (open question 2).
- **Found while reading the code**: *Ask Me*'s daily limit is kept in the visitor's `localStorage` alone — recorded
  under *Risks* in `docs/design.md`, not fixed here.

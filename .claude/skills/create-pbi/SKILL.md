---
name: create-pbi
description: Create a new Product Backlog Item in docs/delivery/ — assign the next ID, add the backlog row, and write the PRD and draft tasks. Use when asked to add something to the backlog, file a PBI, write a PRD for a feature, file a page or section of the rebuild, or start new work.
---

# Creating a PBI

PBI = Product Backlog Item. IDs are zero-padded three digits (`001`, `002`).
The index is `docs/delivery/backlog.md`; detail goes in `docs/delivery/<id>/prd.md` and `tasks.md`.

**A PBI comes before its code — always, the first scaffold of the rebuild too.** When the owner says *start* or
*go on* about new work, the first thing made is its PBI.

## Ask before writing, if the ask is thin

A one-line request ("add a PBI for the projects page") is not enough to write a PRD from. Before creating anything,
make sure you can answer:

- **What problem does this solve?** Not the feature — the problem behind it.
- **Why does it belong in *this* portfolio?** See the scope gate below.
- **What would "done" mean?** You need checkable conditions of satisfaction.

If any of these is genuinely unclear and you can't settle it from `docs/design.md` or the code, **use
AskUserQuestion** rather than inventing an answer. A PRD full of guesses is worse than no PRD — someone will build
from it.

Don't ask about things you can determine yourself: the next free ID, whether a duplicate exists, what the current
code does, what Khae Lik Dai or journey does for the same thing. Go look.

## Scope gate — apply this before filing anything

Ways a request fails:

- **The owner hasn't asked for it and `docs/design.md` doesn't hold it.** The portfolio is the owner's account of
  themselves; something they haven't asked for is theirs to want, not the agent's to add.
- **It claims something about the owner that isn't so** — a role, a date, a number, a project's result, a skill. Every
  claim on the site is the owner's, from `data/` or their words.
- **It sends what a visitor types somewhere they didn't send it** — a form's message or a chat's question logged, kept
  or forwarded beyond what the PBI says, and why. Nothing on the board takes input since PBI-002.
- **It puts a secret where the browser can reach it.**
- **It depends on a 🔴.** The open questions in `docs/design.md` — the rebuild's look, its stack, its hosting, which
  features stay — are undecided. A PBI that silently assumes an answer is a decision in disguise: name the
  dependency in the PRD, or file the decision as its own PBI first.

Filing out-of-scope work as `Proposed` doesn't defer the problem, it launders it.

## One at a time

**In the order the work is done**: a PBI takes the next number only when the owner starts its work; **nothing claims
a number ahead**. What the design holds and no PBI has started is listed, without numbers, under *Still to build* in
`docs/design.md`; when the owner starts one, it leaves that list and becomes the next PBI. A PRD says what it does and
what it doesn't; it never says another PBI will do the rest — name the thing, not a number.

## Steps

**1. Check it doesn't already exist.**

```bash
npm run pbi:list
cat docs/delivery/backlog.md
```

Every row has its PRD. If the work is already a row, extend that PBI rather than filing a new one. If it's on
*Still to build* in `docs/design.md`, take it off that list as you file it. Read the open questions too — the thing may
already be tracked as one.

**2. Take the next free ID — don't read it off the table by eye.**

```bash
npm run pbi:next        # fetches, then scans every ref
```

Use its output verbatim. **Never reuse or renumber an ID** — commit messages reference them permanently.
`npm run pbi:check` reports any ID claimed for two things.

**3. Add the backlog row**, status `Proposed` — or `Agreed` when the owner's words already agree it, quoted in Notes.

| ID | Title | Status | Notes |
| --- | --- | --- | --- |

Link the ID to `./<id>/prd.md`. Note dependencies if it blocks or is blocked by another PBI.

**4. Write `docs/delivery/<id>/prd.md`.** Required sections:

- **Header table** — Status, Created (absolute date), Source (the owner's words, quoted), Decided already,
  Depends on / Blocks.
- **Problem** — what's wrong, *with evidence*: file and line references, a route that 404s, a section that's stale.
  Verify claims against the repo rather than restating assumptions.
- **Why it matters** — the argument, for the people the portfolio is for.
- **Proposal** — the shape, not the code. Say what decides in `lib/` (plain TypeScript, no React or Next), what's a
  server component and what's a client leaf, what it adds to the board — a section, a control, a step of the tour —
  where its content lives in `data/`, and how each is checked without a browser (`curl`, a build) and in one (headless
  Chrome).
- **Conditions of Satisfaction** — numbered and checkable. "Looks modern" is not a CoS. "`GET /` holds the title of
  every project in `data/project.ts`, and the tour stops on Projects third" is. These are what `implement-pbi` verifies
  against. Anything only a person can judge — the look, whether a claim about the owner is true, a real email
  arriving — is marked **Owner: human**.
- **Notes** — constraints, related PBIs, anything a human must do (a hosting variable, a domain).

**5. Write `docs/delivery/<id>/tasks.md` — every PBI has its own.** A status legend, then a numbered table of tasks
drawn from the CoS, each `Todo`, with anything only a person can do marked `Owner: human`. For a `Proposed` PBI, head
it **Draft — the PBI is `Proposed`. Revise it at agreement.**

**6. Stop there**, unless the owner's words already agree it. Do not write code for a `Proposed` PBI.

## Commit

Docs-only, and only when the owner asks for commits:

```
docs(<id>): create PBI-<id> — <title>
```

Body explains the problem and what was deliberately left out. See *Commit messages* in `AGENTS.md`.

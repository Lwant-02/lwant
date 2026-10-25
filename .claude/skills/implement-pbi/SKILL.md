---
name: implement-pbi
description: Implement an agreed Product Backlog Item from docs/delivery/ — work its tasks, verify against its conditions of satisfaction, and update its status. Use when asked to build, work on, start, or finish a PBI. Asks which PBI if no ID is given.
---

# Implementing a PBI

## Step 0 — establish which PBI, before anything else

**If the user did not give a PBI ID, ask. Do not guess and do not pick one yourself** — unless the owner has said to
go on to the next one, in which case it's the next `Agreed` row, or the next thing on *Still to build* filed first with
`create-pbi`.

```bash
node scripts/pbi.mjs list agreed   # startable items
npm run pbi:list                   # everything, with statuses
```

Never infer the PBI from the most recent commit's scope.

## Step 1 — check it's actually startable

```bash
cat docs/delivery/<id>/prd.md
cat docs/delivery/<id>/tasks.md
```

**Stop and ask if any of these hold:**

- **Status is `Proposed`.** Not decided yet. Say it's unagreed and ask before proceeding.
- **Status is `Done`.** Confirm what's actually wanted — a fix, or a new PBI?
- **A dependency isn't `Done`.** Dependencies are in the backlog Notes and the PRD header.
- **`tasks.md` is still the draft written at filing.** Revise it against the agreed PRD, drop the *Draft* heading.
- **Tasks are marked `Owner: human`.** An agent can't judge the look as the owner does, vouch for a claim about the
  owner's career, or try a pinch on a real phone. Report those rather than attempting or silently skipping them.
- **The PBI depends on a 🔴 in `docs/design.md`.** Get the decision before building against a guess.

## Step 2 — set up

Work on the branch you're on and ask before creating one. Commit only when the owner asks.

Mark the PBI `InProgress` in **both** `docs/delivery/backlog.md` and the PRD header.

## Step 3 — build

Work the tasks in order.

- **Follow the pattern** (`AGENTS.md`): what decides goes in `lib/` as plain TypeScript that imports nothing of Next
  or React; a page, a route or a server action calls it. Content — projects, achievements, experience — lives in
  `data/`, never written into a component.
- **This is Next 16**, newer than an agent's training. Read the installed package (`node_modules/next/dist/`, its
  `.d.ts` files) or Next's docs before writing against an API from memory.
- **The look**: read `frontend-design` before building a surface and run `web-design-guidelines` over it after. Once
  the rebuild's look is decided in `docs/design.md`, it wins over both.
- **When Khae Lik Dai or journey has the mechanism, read it first** (`/Users/lwant/Desktop/personal/shan-words-racing`,
  `/Users/lwant/Desktop/personal/journey`). Carry over the mechanism, not the words or the look.
- **Run the review checklist as you go** (`review-checklist` skill) — above all: no secret in the browser, nothing a
  visitor types logged, no claim about the owner that isn't theirs.
- **Something breaks** → follow the `debug` skill rather than guess-patching.
- **A test for anything logic depends on** — a rate limit, a slug lookup, a validator — with `node --test` on `lib/`,
  needing no network and no secret. Prove a new test can fail before trusting it.
- Update task status in `tasks.md` as you go, not in one batch at the end.

Stay inside the PBI's scope. If you find something else worth doing, **file it** with `create-pbi` instead of
expanding this one.

## Step 4 — verify against the conditions of satisfaction

The CoS in the PRD are the definition of done. Go through them **one by one** and confirm each, concretely.

```bash
npm run lint
npm run build          # it has to build here before it builds where it's hosted
```

Then **run the real thing**, not only the build:

- **A route**: `npm run start` (or `dev`) and `curl` it — the status, and the HTML holding what the CoS says.
- **A server action or API route**: call it, and check what it returns and what it refuses — a bad form, the rate
  limit, a missing variable.
- **A page**: open it in a headless browser at phone and desktop widths and screenshot it. The
  owner's judgement of the look is **Owner: human**.
- **A timing CoS**: measure it, write the number down, and say where.

Report what you actually ran. If you couldn't verify something, say which one and why.

## Step 5 — close it out

1. Mark every finished task `Done` in `tasks.md`.
2. Set the PBI status in **both** `backlog.md` and the PRD header.
3. Flip any `docs/design.md` 🟡/🔴 markers this resolved, with the date and the reasoning.
4. Update `README.md`, `AGENTS.md` and the variables' list if a route, a variable, a file or a convention changed.
   **In the same change.**
5. When the owner asks for a commit: `type(<id>): summary`. See `AGENTS.md`.

Mark `Done` only when it's built and verified — not when the code is written.

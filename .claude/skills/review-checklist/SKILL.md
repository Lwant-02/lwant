---
name: review-checklist
description: Review a change against the portfolio's own rules — no claim about the owner that isn't theirs, content in data/ not in components, the board reachable without a mouse and kept smooth, no secret in the browser or the repo, nothing a visitor types logged or kept, and the open decisions an agent must not settle in code. Use before committing, alongside the built-in /code-review.
---

# Project review checklist

This complements the built-in `/code-review`, which finds generic correctness bugs. This pass checks what a
general reviewer **cannot know** — the rules in `docs/design.md` and `AGENTS.md`.

Run `git diff` (untracked files too) and check the changed code against the sections below. Only raise what the
diff actually touches.

## Secrets

- **A secret where the browser can reach it**: a `NEXT_PUBLIC_` name on one, a client component importing a module
  that reads one. There are none today (`BASE_URL` alone); one that arrives with a PBI is the first thing to check.
- **A secret in the repository**: a `.env` staged, a key in a fixture, `env.txt` holding values. A variables' list
  holds names, never values.

## What a visitor gives

Nothing on the board takes input since PBI-002. A change that brings a form, a chat or analytics back:

- **Its PBI says what it keeps, where it goes, and why** — and nothing else goes anywhere, a log above all.
- **A limit the client owns** — kept in the browser, where the visitor can clear it — is no limit. The server decides.
- **Input taken without a check** on the server: any shape, any size.

## The board

- **The camera re-renders the world.** The sections reach `Board` as `children`; a section that takes the camera as a
  prop, or a context that changes with it, redraws every card 60 times a second.
- **A section out of the tour's order** — in the DOM, the path or `lib/tour.ts`. They're the owner's order, the same
  in all three.
- **A look that drifts from the logo's**: a colour outside the tokens in `app/globals.css`, a face that isn't Titan One
  or Nunito, a light surface where the board is dark only.
- **Something reachable only by a gesture**: a drag, a pinch, a hover. Every one has a key or a button too; a link on
  the board is focusable and glides into view.
- **Motion that ignores *Reduce motion***: a glide that isn't a cut under it, an entrance that still plays.
- **A word written into a component** that's about the owner — it belongs in `data/`.

## The owner

- **A claim that isn't the owner's.** A role, a date, a number, a result, a skill — on the board, the cover or the
  metadata. Every one comes from `data/` or the owner's words.
- **The copy says what the site doesn't do** — a link that goes nowhere, a *download* that 404s.

## The page

- **A surface that drifts from the decided look without saying why**, or that breaks `web-design-guidelines` —
  labels, the keyboard, visible focus, contrast on the night and on each section's colour — without the PRD naming the reason.
- **A client component where a server one would do**, or a large one where a small leaf would.
- **Something from another host** — a script from a CDN, an image hotlinked — where the site could serve it.
- **SEO**: the board's words missing from the server's HTML; a new route without its metadata, or missing from
  `app/sitemap.ts`.

## Scope and docs

- **Is it building on a 🟡 or 🔴?** Those aren't decided. Building on one without asking is the error.
- **Is there an agreed PBI behind it?**
- **Did `README.md`, `AGENTS.md` or `docs/design.md` need updating and not get it?**
- **Comments.** Match the surrounding density. Reasoning belongs in the PRD or the commit body.

## Verify before signing off

```bash
npm run lint
npm run build
```

Then run the real thing, as the `implement-pbi` skill describes. Report what you actually ran, and don't imply a
check you skipped.

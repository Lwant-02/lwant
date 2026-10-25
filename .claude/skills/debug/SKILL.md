---
name: debug
description: Systematically diagnose a bug, error, a failing build or deploy, a route that 404s, a form that doesn't send, a page that renders wrong in this repo. Use when something is broken, throwing, or not behaving as expected — before attempting a fix.
---

# Debugging

The failure mode to avoid is **guess-patching**: changing something plausible, seeing the symptom move, and
calling it fixed. That buries the bug instead of removing it. Find the mechanism first.

## The loop

**1. Reproduce it, exactly.** Which route, which input, which build (dev, a production build, the hosted site), which
commit? A `curl` makes a route reproducible. If you can't reproduce it, say so rather than guessing.

**2. Read the actual error.** The whole thing — the terminal, the browser's console, `next build`'s output, and the
host's logs once there is one.

**3. Locate the mechanism before touching anything.** State the causal chain: *"the slug page is prerendered from
`data/project.ts`; the new project's slug has a capital; the link lowercases it; so it 404s."* If you can't fill
that in, keep reading — Next's source is in `node_modules/next/`.

**4. Write a failing check if it's testable.** A `node --test` on the `lib/` function.

**5. Fix the cause, not the symptom.** A `catch {}` that turns a failure into an empty section is not a fix.

**6. Verify.** Re-run the repro, then `npm run lint` and `npm run build`.

## Where bugs come from

- **Dev and the build disagree.** A page prerendered at build with a value only right at run, or a client-only API
  reached during prerender. `npm run build && npm run start` reproduces what's hosted; `dev` doesn't.
- **A Next API isn't what you remember.** Next 16 is newer than an agent's training — async `params`, the React
  Compiler (`reactCompiler: true`), `globalNotFound`. Read the installed `.d.ts`.
- **A variable is missing.** `NEXT_PUBLIC_*` is written in at build: changed, it needs a rebuild. Server variables are
  read at run. Today there's one, `BASE_URL`, for the metadata and the sitemap.
- **The board jumps, drifts or won't move.** The camera is `cam.current` and the state together in
  `components/board/board.tsx`; a glide still running (`halt()` stops it) or a hand that didn't call `hand()` fights
  the next move. Read the transform on the world (`[aria-roledescription=board] > div`) as it changes.
- **The tour frames the wrong thing.** It measures each `[data-section]` by `offsetLeft`/`offsetTop` in the world;
  something positioned between a section and the world changes what those are relative to.
- **The path's arrows are missing or in the wrong place.** They're drawn from each section's measured box
  (`components/board/path.tsx`, a `ResizeObserver` on the world); a section that isn't a direct child of the world
  measures from somewhere else.
- **A face falls back to the system's.** next/font sets `--font-display-face` and `--font-body-face` on `<body>`; a
  theme variable that names them must be in `@theme inline`, or it resolves on `:root`, where they don't exist.
- **A link on the board won't click.** A press only becomes a drag past 4 px; a drag ending on a link is swallowed on
  purpose (`onClickCapture`).
- **A hydration mismatch.** Something rendered from the clock, `Math.random` or `window` on the server and
  again in the browser.
- **Stale docs.** If `AGENTS.md`, `docs/design.md` or the README doesn't match the code, **trust the code** and flag
  the doc.

## Diagnostic commands

```bash
npm run lint
npm run build && npm run start
curl -si http://localhost:3000/
curl -si http://localhost:3000/projects/<slug>
```

## When you're stuck

Say so, and report what you ruled out. Do not ship a speculative fix described as a real one. If you have a
hypothesis you can't confirm, label it a hypothesis.

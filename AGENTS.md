# Portfolio v3 — Sai Naw Main (Lwant)

The owner's personal portfolio, **one page, one board** (PBI-002), in the look of the Lwant logo (PBI-004): a dark
canvas holding About me, Education, Projects, Achievements (with the certifications), Experience and Connect, joined by
a path of arrows. It
opens on a cover — **Watch the tour**, the camera gliding through the sections on its own, or **Explore the board**, to
wander it. The product and its decisions are in `docs/design.md`; the work is in `docs/delivery/backlog.md`.

The process is Khae Lik Dai's (`/Users/lwant/Desktop/personal/shan-words-racing`), carried over in PBI-001: the PBI
backlog, `scripts/pbi.mjs`, and the skills in `.claude/skills/`. The board's camera is journey's
(`/Users/lwant/Desktop/personal/journey/web/lib/road.ts`).

## What's here

A single Next 16 app (App Router, React 19, the React Compiler, Tailwind 4), on npm. One route, `/`; the old ones
(`/about`, `/projects/:slug`, `/achievements/:slug`, `/ask-me`, …) redirect to it (`next.config.ts`).

| Path | What |
| --- | --- |
| `app/page.tsx` | the page: `Board` around the six sections, server-rendered so every word is in the HTML |
| `app/layout.tsx` | the fonts — Titan One (`font-display`, the logo's face) and Nunito (`font-body`, reading) — dark only, the metadata and JSON-LD |
| `app/globals.css` | the tokens — night, ink, chalk, the logo's yellow, each section's colour and tint — the logo's lettering (`ltd`), `sticker`, `die-cut`, `keycap`, and the snake: where each section sits on a wide board |
| `app/global-not-found.tsx` | the 404, in the board's look |
| `components/board/` | the client leaves: `board.tsx` (the camera, the hand — drag, wheel, pinch, keys — the tour), `cover.tsx`, `controls.tsx` (the logo, and the tour's controls — no section bar, no zoom controls, PBI-006), `path.tsx` (the arrows between the sections, from their measured boxes) |
| `components/sections/` | the six sections, server components: `parts.tsx` (`Frame`, `Marker`, `Card`, `OutLink`, `Chip`), `more.tsx` (*See more*, the one client leaf among them, PBI-007), `about.tsx`, `timeline.tsx` (Education, Experience), `projects.tsx`, `achievements.tsx`, `connect.tsx` |
| `data/` | the content — `about.ts` (the profile and the social accounts), `education.ts`, `project.ts`, `achievement.ts`, `certification.ts`, `experience.ts` |
| `lib/` | `camera.ts` (zoom about a point, fit, the glide's ease), `tour.ts` (the sections' order and holds, a long section's drift), `arrows.ts` (the path's arrows and where they run), `more.ts` (a long list cut short), `links.ts`, `utils.ts` (`cn`) |
| `tests/` | `node --test` on `lib/` |
| `app/icon.svg`, `favicon.ico`, `apple-icon.png` | the tab's and the home screen's icons, by Next's file conventions (PBI-003) |
| `public/` | the images, the certificates as PDFs, the wordmark (`lwant-logo.svg`, `lwant-logo-dark.svg`) and the share images (`lwant-share.png`, `lwant-share-square.png`) |

## The pattern

- **Content lives in `data/`.** A component renders it; it never holds a project's words or a date itself.
- **What decides is plain TypeScript in `lib/`** that imports nothing of Next or React, so `node --test` runs it as it
  is — a limit, a lookup, a validator. A page, a route or a server action calls it.
- **Server components by default.** A client component only as a small leaf that needs state or a browser API.
- **Every route has a way to be checked without a browser** — `curl` it after `npm run build && npm run start`.
- **The board renders its world as `children`**, so the camera moving 60 times a second re-renders the board, never
  the sections. Only the path is drawn from measured sizes (`components/board/path.tsx`); everything else is CSS.
- **The tour's order is the owner's** (`lib/tour.ts`), and the DOM, the path and the tour all follow it.

## Rules

- **Every claim about the owner is the owner's** — a role, a date, a number, a project's result. It comes from `data/`
  or their words; an agent never fills one in.
- **Secrets stay on the server.** There are none since PBI-002; the one variable is `BASE_URL`, listed in `env.txt`.
  One that arrives is never in a `NEXT_PUBLIC_` name, a client component, a log, a reply or a commit.
- **What a visitor types goes where they sent it, and nowhere else.** Nothing on the board takes input since PBI-002.
- **The copy tells the truth.** No link to nowhere, no feature the site doesn't have.
- **Don't settle a 🔴 in code.** The open questions in `docs/design.md` are the owner's.
- **This is Next 16**, newer than an agent's training: read the installed package before writing against an API from
  memory.

## Working here

- **PBIs.** File with the `create-pbi` skill, build with `implement-pbi`. A PBI must be `Agreed` before code is
  written for it — the rebuild's first scaffold too. Skills live in `.claude/skills/`: `create-pbi`, `implement-pbi`,
  `review-checklist`, `debug`. A deploy skill arrives with the hosting decision (open question 3).
- **Design skills**, pinned in `skills-lock.json` as Khae Lik Dai's are: `frontend-design` and `svg-logo-designer`
  shape a surface; `web-design-guidelines` (Vercel's Web Interface Guidelines, fetched fresh each time) reviews one.
  **The rebuild's decided look wins over all three**; they fill what it leaves open.
- **npm**, for now (open question 2).
- **Khae Lik Dai and journey are the reference** (`/Users/lwant/Desktop/personal/shan-words-racing`,
  `/Users/lwant/Desktop/personal/journey`): when a piece has a counterpart there, read it first and carry over the
  mechanism, not the words. **Copy the structure, never the meaning.**

## Commands

```bash
npm install
npm run dev                    # http://localhost:3000
npm test                       # lib/'s tests: node --test, no network
npm run lint
npm run build && npm run start # what's hosted, on :3000
npm run pbi:list               # backlog rows; node scripts/pbi.mjs list <status> to filter
npm run pbi:next               # next free PBI id, scanning every branch
npm run pbi:check              # ids claimed for two different things
```

## Commit messages

```
type(scope): short summary

Prose explaining what changed and why. Wrap at 72 characters. Explain
the decision, not the diff.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
```

Types are `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `chore`. **Scope is the PBI number**
(`feat(002):`); omit it when the work belongs to no PBI — never invent one. Commit only when the owner asks.
Stage files by name, not `git add .`.

# PBI-002 — One page, one board: the portfolio as a sketched canvas to watch or explore

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"good now we will refactor all"*, and the four answers below |
| **Created** | 2026-10-25 |
| **Source** | Owner, 2026-10-25: *"we will have only one page and we will remove the ask ai, Technologies, GitHub Contributions, Get in touch and what I want is like journey just simple one board and has a cta to paly to watch or jsut play around … just like excialdraw like that and what I want to put is about me , education, projects, achievement , experiences and connect but with social acc only"* |
| **Decided already** (owner, 2026-10-25, answering the agent's questions) | **The cover's two calls to action: *Watch* and *Explore*.** Watch glides the camera through the sections on its own, with pause, back and next, and a hand takes it over; Explore opens the board to wander. **The look: Excalidraw-sketchy** — wobbly hand-drawn boxes, arrows and underlines, a hand-written face for headings, on dot-grid paper; the sections joined by a sketched path the tour follows. **Built straight away**, no design canvas first. **Certifications stay**, inside Achievements. Not kept: the résumé download, an email link, a project's detail panel. |
| **Depends on** | PBI-001 |

## Problem

The site is seven routes of stacked sections (`app/page.tsx`, `app/about/`, `app/projects/`, `app/projects/[slug]/`,
`app/achievements/`, `app/achievements/[slug]/`, `app/ask-me/`) that the owner wants gone in favour of one board.
Four features are to go:

- ***Ask Me*** — `app/ask-me/`, `app/api/chat/route.ts`, `components/ask-me/`, `hooks/use-auto-scroll.ts`,
  `data/prompt.ts`; its daily limit lives in the visitor's `localStorage` (`lib/utils.ts`), so it spends the Gemini
  key without limit (`docs/design.md`, *Risks*). Removing it removes the risk and the one paid dependency.
- **Technologies** — `components/home/technologies.tsx`, the only user of `react-icons`.
- **GitHub Contributions** — `components/home/contribution.tsx`, the only user of `react-github-calendar`.
- **Get in touch** — `components/home/contact.tsx`, `action/nodemailer.action.ts`, `template/template.ts`; with it
  the SMTP secrets and `nodemailer`, `react-hook-form`, `zod`, Lottie and Sonner.

And the content isn't all in `data/`: About's words are written into `components/about/more-about.tsx` and
`about-hero.tsx`, and its hand-counted stats already disagree with the data (*"5+ Projects Completed"* against eight
in `data/project.ts`).

## Why it matters

A recruiter or a collaborator gets one place to look, a memorable one, and a tour that shows the whole of it in under
a minute without a scroll — or the freedom to wander to what they care about. Fewer moving parts: no API route, no
secret, no form to abuse.

## Proposal

**One route, `/`**, a server page. Under it, three layers:

1. **The board** (a client component, server-rendered so every word is in the HTML): dot-grid paper and one world
   drawn through one camera `{ x, y, z }` — journey's mechanism (`journey/web/lib/road.ts`: `zoomAt`, `centreOn`,
   `glideEase`; `components/road/road-canvas.tsx`: drag, wheel, Ctrl/⌘-wheel and pinch, the keys). The world holds six
   **sections**, each a sketched frame of HTML cards, in the owner's order:
   **About me → Education → Projects → Achievements → Experience → Connect**, joined by a sketched arrow path.
   - **About me** — the photo, name, nickname, role, location, the summary, *Beyond the code* and the interests
     (`data/about.ts`, the owner's words moved from `data/resume-data.ts` and the About components unchanged).
     The stats are left out (above).
   - **Education** — `data/education.ts`.
   - **Projects** — every project in `data/project.ts`: image, title, date, description, tags, its demo link.
   - **Achievements** — `data/achievement.ts`, then the certifications from `data/certification.ts`, each with its
     certificate.
   - **Experience** — `data/experience.ts`.
   - **Connect** — GitHub and LinkedIn, as sketched buttons (`data/about.ts`); no form, no email.
2. **The cover**, over the board as it first opens, the board faint and inert behind it: the name, the role, a
   hand-written line, and two calls to action — **▶ Watch the tour** and **Explore**.
3. **The controls**, floating like Excalidraw's: a section bar to jump to any of the six; zoom − / % / + and *fit*;
   the theme (light, dark, system, as today); during the tour, back ⏸/▶ next and *n of 6*.

**What decides, in `lib/`** (plain TypeScript, no React or Next, tested with `node --test`): `lib/camera.ts` — the
camera, zoom about a point, clamping, fitting a box in the open part of the screen, the glide's ease, carried from
journey; `lib/tour.ts` — the order of the sections and how long each holds, the step after and before; `lib/sketch.ts`
— the sketched shapes as SVG paths from **rough.js**'s generator (Excalidraw's own renderer), **seeded** by each
shape's id so a shape keeps its wobble. A stroke's size is its element's, so it's drawn once the browser has measured
it; nothing drawn differs between the server and the first render.

**The look**: a hand-written face for headings and the cover, a plain one for reading (Excalidraw pairs its hand face
with Nunito), both self-hosted through `next/font`; ink strokes; paper and dots; tokens in `app/globals.css`, light
and dark. Read `frontend-design` before building, `web-design-guidelines` after.

**Reaching it without a mouse**: the sections are in the DOM in tour order, so a screen reader reads the board as a
page; the arrow keys pan, `+` / `−` zoom, `0` fits the board; tabbing to a link on the board glides it into view.
Under *Reduce motion* every glide is a cut.

**The old addresses** — `/about`, `/projects`, `/projects/:slug`, `/achievements`, `/achievements/:slug`,
`/ask-me` — redirect permanently to `/` (`next.config.ts`), since a CV or a post may still link them. `/api/chat` is
gone (404). `app/sitemap.ts` lists `/` alone; the metadata and JSON-LD stay, without the email (Connect is the social
accounts only) and without *Ask Me*'s *AI SDK*.

**Removed**: the four features above and everything only they used — the pages and their components, the navbar,
the drawer, the footer, the showcase card, the timeline, `action/`, `template/`, `lib/axios.ts`, the daily limit in
`lib/utils.ts`, `constant/`, `data/prompt.ts`, `data/resume-data.ts` (its profile moved to `data/about.ts`), the
unused `components/ui/`; the packages `ai`, `@ai-sdk/google`, `@ai-sdk/react`, `axios`, `nodemailer`,
`@types/nodemailer`, `react-github-calendar`, `react-hook-form`, `@hookform/resolvers`, `zod`,
`@lottiefiles/dotlottie-react`, `react-type-animation`, `react-icons`, `sonner` and whatever else nothing imports
afterwards; `GOOGLE_GENERATIVE_AI_API_KEY` and the `EMAIL_*` variables from `env.txt`.

**Checked without a browser**: `npm run build && npm run start`, then `curl` — `/` and its words, the redirects, the
404s; `npm test` for `lib/`.

## Conditions of Satisfaction

1. `GET /` answers 200, and its HTML holds the six sections' headings and every title in `data/education.ts`,
   `data/project.ts`, `data/achievement.ts`, `data/certification.ts` and `data/experience.ts`.
2. The page opens on the cover — the name, the role, **Watch the tour** and **Explore** — and the board behind it
   takes no pointer, wheel, key or focus until one is pressed.
3. **Explore**: a drag (mouse or one finger) pans; the wheel pans, Ctrl/⌘ + wheel and a pinch zoom about the pointer;
   the arrow keys pan, `+` / `−` zoom, `0` fits the whole board; zoom stays within its limits; the page itself never
   scrolls.
4. **Watch**: the camera glides to About me, Education, Projects, Achievements, Experience, Connect in that order,
   holding each for its time; ⏸ pauses and ▶ resumes, back and next step; *n of 6* shows where it is; a drag, wheel,
   pinch or key pauses it and hands the camera over; it ends on Connect.
5. The section bar glides to any section, in either mode.
6. The strokes are rough.js's, seeded by each shape's id, so a shape draws the same wobble every time — through a
   resize, a re-render, a reload; they're drawn once their shape is measured in the browser, and the console shows no
   hydration warning.
7. Tabbing to a link on the board brings it into view; under *Reduce motion* glides are cuts.
8. `/about`, `/projects`, `/projects/thock`, `/achievements`, `/achievements/winner-tuk-heng-hackathon` and `/ask-me`
   answer a permanent redirect to `/`; `/api/chat` answers 404; `/sitemap.xml` lists `/` alone.
9. Nothing in `app/`, `components/`, `lib/` or `data/` imports a removed package or file; `package.json` lists none of
   the removed packages; `env.txt` names `BASE_URL` alone.
10. `npm test` runs `lib/`'s tests with no network and no secret: zoom keeps the point under the pointer, the zoom is
    clamped, a fitted box sits inside the open part of the screen, the glide's ease starts at 0 and ends at 1, the
    tour's order is the owner's, and the same seed gives the same strokes.
11. `npm run lint` and `npm run build` pass.
12. At 390 × 844 and 1440 × 900, light and dark, the cover and each of the tour's six stops are screenshotted and
    readable. **Owner: human** — whether it looks as wanted.
13. Every word on the board comes from `data/`. **Owner: human** — whether every claim is still true.

## Verification (2026-10-25)

Against `npm run build && npm run start`, on this Mac:

- **1** `curl /` → 200; all 40 titles, headings and calls to action checked against the HTML (`data/`'s every
  `title`, the six sections, *Certifications*); no `mailto:`, email, *Ask Me*, *Get in touch* or *Technologies* left.
- **8** `/about`, `/projects`, `/projects/thock`, `/achievements`, `/achievements/winner-tuk-heng-hackathon`,
  `/ask-me` → 308 to `/`; `POST /api/chat` → 404; `/nope` → 404, the new 404 page; `/sitemap.xml` lists `/` alone.
- **2–7, 12** headless Chrome (playwright-core) at 1440 × 900 and 390 × 844, light and dark, 21 checks passing: the
  board `inert` and the first Tab on *Watch the tour* while the cover's up; the tour through all six stops, each
  screenshotted; About's hold (7 s) moving on to Education by itself; a drag panning and pausing it, and it staying put
  9 s later; Ctrl + wheel zooming (capped at 250%), the wheel panning, the page never scrolling; ← panning, `+`
  zooming, `0` fitting; Tab to LikDai's link bringing it into the open frame; under *Reduce motion* the glide a cut; no
  hydration warning in any of the four.
- **9** `package.json` keeps `clsx`, `lucide-react`, `next`, `next-themes`, `react`, `react-dom`, `roughjs`,
  `tailwind-merge` — each imported; nothing in `app/`, `components/`, `lib/` or `data/` imports a removed file.
  `env.txt` names `BASE_URL` alone.
- **10** `npm test`: 8 tests, no network; the zoom anchor and the seeding broken on purpose fail them.
- **11** `npm run lint`, `tsc --noEmit` and `npm run build` pass.
- `web-design-guidelines` over the board: an `<h1>` kept once the cover's gone, `touch-action: manipulation` on
  links and buttons, `theme-color` in the paper's colours — fixed. Its Title Case for buttons isn't followed: sentence
  case is `frontend-design`'s, and this page's.
- **Not verified**: a two-finger pinch — headless Chrome can't make one; it runs through the same `zoomAt` the
  wheel's zoom does, but wants a try on a real phone. **Owner: human**.
- **12, 13** the look and every claim: **Owner: human**.

## Notes

- **The stack stays the single Next app on npm** for this PBI; open question 2 (a Turborepo, as journey's) isn't
  settled by it — moving to one later moves this as it is.
- **rough.js** is the one new package; its generator needs no DOM, so the strokes are drawn on the server too.
- **Kept**: the theme (light, dark, system) and the 404 page, restyled to the board's look.
- **The certificates' links** point at `public/pdf/` and `public/images/achievements/`, kept. One was broken before
  the board — *The MERN Fullstack Guide* linked `/pdf/mern-fullstack.pdf`, the file is `mern-fullstack-guide.pdf` —
  and points at the file now.
- **Also gone**: `image.d.ts` — Next's own types declare image imports, and its `any`s failed the lint.

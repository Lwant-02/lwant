# PBI-009 — SEO: one address for the site, structured data from `data/`, alt text, no `X-Powered-By`

| | |
| --- | --- |
| **Status** | Done (2026-10-25) |
| **Agreed** | 2026-10-25, owner: *"go on"*, to the SEO review's fixes an agent can make (2, 3, 5, 6) |
| **Created** | 2026-10-25 |
| **Source** | `/seo page` on the production build, 2026-10-25 (about 80/100); the owner's *"go on"*. |
| **Decided already** (owner, 2026-10-25) | The four code fixes. **Not** the title, the description or `og:site_name` — the owner's words (the review's 4 and 7). |
| **Depends on** | PBI-008 |

## Problem

- `app/sitemap.ts` falls back to `http://localhost:3000` without `BASE_URL`; `app/robots.ts` and `app/layout.tsx` fall
  back to `https://nawmain.dev` — three answers to one question.
- The JSON-LD in `app/layout.tsx` is a bare `Person` written by hand: `jobTitle: "Full-Stack Developer"`, no employer,
  no education, no photo — stale since PBI-008 put Scalation.ai on the board.
- The project screenshots carry `alt=""`: nothing for an image search to read.
- Every response says `X-Powered-By: Next.js`.

## Proposal

- **`lib/site.ts`**: `siteUrl()` — `BASE_URL`, trimmed of a trailing slash, or `https://nawmain.dev`. The metadata,
  robots and the sitemap all ask it.
- **`lib/profile.ts`**: `profilePage(...)` builds the JSON-LD — a `ProfilePage` (Google's type for a page about one
  person) whose `mainEntity` is the `Person` — from `data/`: the role still going (*… - Present*) gives `jobTitle` and
  `worksFor`; a course still going is an `affiliation`, a finished one `alumniOf`; the photo is `image`; the social
  accounts are `sameAs`. `knowsAbout` moves into `data/about.ts`, as it was.
- **Projects**: each screenshot's `alt` is *Screenshot of {title}*.
- **`next.config.ts`**: `poweredByHeader: false`.

## Conditions of Satisfaction

1. With and without `BASE_URL`, the sitemap, robots and the canonical name the same address, with no trailing slash.
2. `GET /` holds one JSON-LD `ProfilePage` whose `Person` has `jobTitle` *Software Engineer*, `worksFor` Scalation.ai,
   `affiliation` Rangsit University, `alumniOf` Shan Community College, an absolute `image`, and both social accounts —
   every value from `data/`. Tested with `node --test`.
3. Every project screenshot has a non-empty `alt`.
4. No `X-Powered-By` header.
5. `npm test`, `npm run lint`, `npm run build` pass; the board's browser checks pass.
6. Google's Rich Results Test reads the page as a profile page, once it's live. **Owner: human**.

## Verification (2026-10-25)

- **Tests**: `tests/seo.test.ts`, four tests; two failed against a broken `siteUrl` and `profilePage` before passing.
  `npm test` (15), `tsc --noEmit`, `npm run lint`, `npm run build` pass.
- **1** `npm run build && npm start`, without `BASE_URL`: robots' `Sitemap`, the sitemap's `<loc>` and the canonical
  all `https://nawmain.dev`; built with `BASE_URL=https://example.com/`: all three `https://example.com`.
- **2** `curl /`: one JSON-LD `ProfilePage`; its `Person` has `jobTitle` *Software Engineer*, `worksFor` Scalation.ai
  (`https://scalation.ai`), `affiliation` Rangsit University Thailand, `alumniOf` Shan Community College (Kaw Dai),
  `image` `https://nawmain.dev/images/profile.jpg`, GitHub and LinkedIn in `sameAs`.
- **3** seven `alt="Screenshot of …"`, one for each project.
- **4** `curl -I /`: no `X-Powered-By`.
- **5** the board's browser checks: 39 pass.
- **6** **Owner: human**, once the page is live.

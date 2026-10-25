# Portfolio v3 — Sai Naw Main (Lwant)

**One page, one board.** A dark canvas, like Excalidraw's, in the look of the Lwant logo — its yellow lettering, ink
and white die-cut edges — holding six sections — **About me, Education, Projects, Achievements, Experience,
Connect** — joined by a path of arrows. It opens on a cover with two ways in:

- **Watch the tour** — the camera glides through the sections on its own, about a minute; pause, step back or on, or
  grab the board to take over.
- **Explore the board** — drag or scroll to move, pinch or Ctrl + scroll to zoom; the arrow keys, `+`, `−` and `0`
  work too.

Dark only, on a phone and a desktop. The product and its decisions are in [docs/design.md](docs/design.md); the
work is in [docs/delivery/backlog.md](docs/delivery/backlog.md); the rules for working here are in
[AGENTS.md](AGENTS.md).

## Stack

Next.js 16 (App Router), React 19 with the React Compiler, TypeScript, Tailwind CSS 4,
lucide icons. Titan One (the logo's face) and Nunito through `next/font`.

## Getting started

Node 24, npm.

```bash
npm install
npm run dev                    # http://localhost:3000
npm test                       # lib/'s tests, node --test — no network
npm run lint
npm run build && npm start     # the production build
```

One environment variable, `BASE_URL` — the site's address, for the metadata and the sitemap (`env.txt`).

## Where things are

| Path | What |
| --- | --- |
| `app/page.tsx` | the one page: the board around the six sections |
| `components/board/` | the board — the camera, the hand, the tour, the cover, the logo and the tour's controls, the path |
| `components/sections/` | the six sections, rendered on the server; Projects and Achievements fold their long lists under *See more* |
| `data/` | every word about the owner — edit here to change the board |
| `lib/` | the camera, the tour, the strokes — plain TypeScript, tested |
| `docs/` | the design, and the backlog of PBIs |

The old addresses — `/about`, `/projects/…`, `/achievements/…`, `/ask-me` — redirect to `/`.

## License

Personal, and not licensed for redistribution.

**Built by [Sai Naw Main (Lwant)](https://github.com/Lwant-02).**

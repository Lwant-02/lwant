# Portfolio v3 — design

The product, the argument behind it, and the decisions that bind every PBI. The rules that fall out of it for
day-to-day work are in `AGENTS.md`; the work itself is in `docs/delivery/backlog.md`.

Markers: 🟢 settled (who, when) · 🟡 leaning, not decided · 🔴 open — do not settle in code.

## The product

**Sai Naw Main (Lwant)'s personal portfolio, as one board** (PBI-002), in the logo's look (PBI-004). A single page: a
dark canvas, like Excalidraw's, holding six sections in the owner's order — **About me, Education, Projects, Achievements (with the
certifications), Experience, Connect** — joined by a path of arrows. It opens on a cover with two ways in: **Watch the
tour**, where the camera glides through the sections on its own in about a minute, or **Explore the board**, to wander
it by drag, scroll, pinch and keys.

**Who it's for, what it should make them do, and what its voice is** — the owner's, not yet written (open question 1).

## Decisions

### Rebuild it 🟢 (owner, 2026-10-25)

*"we'r going to rebuild my old portfoltio"*.

### Khae Lik Dai's process 🟢 (owner, 2026-10-25, PBI-001)

*"go and look at the kahelikdai and copy the claude skills and the pbi architure flow"*. The PBI backlog,
`scripts/pbi.mjs`, and the skills `create-pbi`, `implement-pbi`, `review-checklist` and `debug` — rewritten for a
portfolio — and the design skills pinned in `skills-lock.json`. Not carried over: `deploy-web` (Khae Lik Dai's
Railway), `merge-words` (its word packs), and its product, look and rules about the game.

### One page, one board 🟢 (owner, 2026-10-25, PBI-002)

*"we will have only one page … like journey just simple one board and has a cta to paly to watch or jsut play around
… just like excialdraw"*. journey's camera (`journey/web/lib/road.ts`), not its look or product. From the owner's
answers the same day:

- **The cover's two calls to action: *Watch the tour* and *Explore the board*.** The tour pauses, steps back and on,
  and a hand on the board takes it over.
- ~~**Excalidraw-sketchy**: rough.js's strokes, Architects Daughter, pastel highlighters, light and dark~~ — superseded
  by *Night sticker* (owner, 2026-10-25, PBI-004, below).
- **Built straight away**, no design canvas first.
- **Kept**: the certifications, inside Achievements. **Gone**: *Ask Me*, Technologies, GitHub Contributions, Get in
  touch, the résumé download, an email link, a project's own page or panel, and every other route — which redirect
  to `/`.

### The logo: the Lwant wordmark 🟢 (owner, 2026-10-25, PBI-003)

*"I like no. 2 now we got it then put them"*, chosen in its own session: *Lwant* in Titan One (OFL, in outlines),
yellow `#ffd84d` with an ink outline and depth and a sparkle; a white edge in the dark. On the board's **top-left
corner**, where Excalidraw keeps its menu. The tab's icon stacks *Lw* over *ant*. Not on the cover — the owner placed it
top left only.

### The look: Night sticker, dark only, cover B 🟢 (owner, 2026-10-25, PBI-004)

*"I dont like the style yet"* … *"make it seem like logo design then they match"* … *"I kinda like no.3 … just make
it dark theme"* … *"I like cover B"*. Chosen on the design canvas
[claude.ai/artifact/KphYoCUUEh4WLuMGk2YeEq](https://claude.ai/artifact/KphYoCUUEh4WLuMGk2YeEq) (private to the owner):
its no. 3 board and cover B.

- **Dark only**: night `#17171A` with `#323238` dots. No theme switch.
- **The logo's material everywhere**: Titan One — the logo's face — in its yellow `#FFD84D` with an ink outline,
  extruded ink depth and a white die-cut edge for the section titles; Titan One for what's drawn and pressed, Nunito
  for reading.
- **Sections** are colour panels — About `#FFD84D`, Education `#8EC5FF`, Projects `#8FE3A6`, Achievements `#FFA8A8`,
  Experience `#C3B1FF`, Connect `#FFC184` — with an ink line and a white edge; **cards** are white stickers with ink
  depth, tilted a little; the **path** is white arrows.
- **The logo** top left, straight on the night, no box.
- **Cover B**: the wordmark as the hero, then a photo sticker with the name and role, the line, and the two keycaps.

### No section bar, no zoom controls 🟢 (owner, 2026-10-25, PBI-006)

*"I dont like to add the navbar … and the control as well no need to show but user still can zoom in and out"*. Over
the board: the logo, and the tour — its controls while it plays, *Watch the tour* while exploring. Zooming is the wheel
with Ctrl or ⌘, a pinch, `+`, `−` and `0`.

### See more 🟢 (owner, 2026-10-25, PBI-007)

*"for the project and achievement as u see too long what if we add like see more and add animtion"*. Projects shows
its first four cards, Certifications its first four and Experience its first three (PBI-008); the rest fold under *See N more*, which unfolds them, the cards
popping in one after another. Folded, they're in the HTML but out of reach. A press on the board pauses the tour.

## Rules that bind every PBI

- **Every claim about the owner is the owner's.**
- **Secrets stay on the server.** Since PBI-002 there are none: the one variable is `BASE_URL`.
- **What a visitor types goes where they sent it, and nowhere else.** Since PBI-002 nothing on the site takes input.
- **The copy tells the truth.**

## Still to build

What the rebuild holds that no PBI has started — **no numbers**: each takes the next one when the owner starts it
(`docs/delivery/backlog.md`). Nothing yet; the owner's to add.

## Risks

| Risk | Mitigation |
| --- | --- |
| A claim about the owner goes stale or wrong | content in `data/` alone; the owner checks every claim (**Owner: human**) |
| A board is harder to read than a page — for a screen reader, a keyboard, a small phone | the sections in the DOM in tour order, every word in the HTML; keys for every gesture; focus brings a link into view; one column on a phone, read at ~93% |
| On a phone the tour drifts through a long section fast — Projects at about 400 px a second (PBI-004's verification) | eased by PBI-007: the tour drifts through four projects, not seven, in the same 14 s; a longer hold is still the owner's call |

*Ask Me*'s limit in the visitor's `localStorage`, recorded here at PBI-001, went with *Ask Me* (PBI-002).

## Open questions

1. 🔴 **Who it's for and its voice** — what the board should make a visitor do. The look is settled (PBI-002).
2. 🟡 **The stack** — the single Next app on npm, as it is; PBI-002 built in it. Khae Lik Dai's and journey's
   Turborepo on pnpm only if the owner wants it — nothing on one page needs it.
3. 🔴 **Hosting and the domain** — the metadata names `https://nawmain.dev`; nothing in the repo says where it's hosted.
4. 🟢 **Which features stay** — settled by the owner, 2026-10-25 (PBI-002, above).

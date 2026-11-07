# PBI-011 — Graduation: `/graduation`, a countdown, its own tour, and a Wishes wall

| | |
| --- | --- |
| **Status** | Done (2026-11-07) |
| **Agreed** | 2026-11-07, owner: *"good now time to implement"*, after the design canvas below |
| **Created** | 2026-11-07 |
| **Source** | Owner, 2026-11-07: *"I want to add the graduation tour for me and countdown cuz my graudation will be next month 5 and 6"*; *"I also want like user can comment and will appear on the board"*; *"add the cta to back to my portfolio page as well and put cta back to graduation page"*; *"add the animation or other sticker … for the infor and img pls go and get from the internet"*; *"add this somewhere cuz this is iconic"* (RSU2015-04) *"and b14 img … and add my photo as well"* |
| **Design** | [claude.ai/artifact/5ctc51SLuFjRyBFXMAGLJf](https://claude.ai/artifact/5ctc51SLuFjRyBFXMAGLJf) (private to the owner): A portfolio cover with the ticket, B `/graduation`'s cover, C on a phone, D Graduation, E Wishes, F the tour, G before / on the days / after |
| **Decided already** (owner, 2026-11-07) | Its own page, `/graduation`, linked both ways. The tour's key says *Watch the tour*, as wide as *Leave a note*. Notes go up **straight away**; the owner hides one afterwards. After 7 December the page **stays as a keepsake**. The database is **Neon** (`DATABASE_URL`). |
| **Depends on** | PBI-004, PBI-007, PBI-009 |

## Problem

The owner graduates from Rangsit University on 5–6 December 2026 (`data/education.ts`: *"Expected graduation in
December 2026"*), and the board says nothing more about it. There is nowhere for a visitor — a friend, a classmate,
family — to leave a word for it. Since PBI-002 the site is one route and takes no input (`docs/design.md`, *Rules that
bind every PBI*); this PBI changes both, on the owner's word.

RSU's own page, [commencement.rsu.ac.th](https://commencement.rsu.ac.th/) (read 2026-11-07), gives the days:
**Sat 5 Dec** rehearsal and check-in, 08:00–13:00, group photos at the Recreation Building (Building 14); **Sun 6 Dec**
the ceremony at Building 14 in three rounds (07:00–11:30, 11:30–15:30, 15:30–19:30), each faculty's round announced
later.

## Proposal

**A second board, `/graduation`**, built from the first: the same camera, hand, keys and tour (`components/board/`),
which take their stops and their cover from the page instead of from `lib/tour.ts` alone.

- **Three sections**, in the tour's order: **Graduation** (the countdown to the ceremony, the bar from June 2023, the
  degree), **The days** (Day 1 and Day 2 from RSU's page, Building 14, the sunrise over the pavilion), **Wishes** (the
  form and the newest notes; older notes spill onto the board below). Dark *gown* panels, the board's stickers.
- **Its cover**: *Class of 2026 · Bachelor of ICT*, *I'm graduating!*, the countdown, *Watch the tour* and
  *Leave a note* (the same width), the owner's photo and Building 14 as taped photos, the *Class of 2026* badge and the
  *5–6 Dec* burst, falling confetti; *Back to my portfolio* top right, there and over the board.
- **Its tour**: Graduation, The days, Wishes; confetti when it ends.
- **The portfolio's cover** carries a ticket: *Graduating 5–6 December · N days to the ceremony · See my graduation →*.
- **Before, on the days, after**, by Bangkok time: the countdown never shows a zero or a minus; on 5–6 December it's
  the day; from 7 December *I graduated!*, the ticket *Graduated · December 2026*, and the page stays.
- **Motion** — confetti, the seconds' tick, the tassel, the sparkles, notes popping in — none of it under *Reduce
  motion*.

**What decides is in `lib/graduation.ts`**, plain TypeScript, tested with `node --test`: the phase at a time, the
countdown, the bar, a day's state, the tour's stops, and a note's checks (a name of 1–40 characters, a note of 1–200, no
links, the bot trap, too fast). **The facts are in `data/graduation.ts`**: the days, the venue, the photos and their
credits — from RSU's page and the owner's words, nothing else.

**The notes**: one Neon table, `notes` (`id`, `name`, `body`, `created_at`, `hidden`), created by
`scripts/notes.sql`. A server action (`app/graduation/actions.ts`) checks a note and stores **the name and the note
and nothing else** — no email, no IP, nothing logged — then the page re-renders with it. The page reads the newest 60
not hidden. `DATABASE_URL` is read only on the server (`app/graduation/notes.ts`, `server-only`). A visitor posts at
most 3 notes in 10 minutes (counted in the server's memory, by address, never stored), and the wall takes at most 30
in 10 minutes in all.

**Checked without a browser**: `npm test`; `curl /graduation` holds the days, the venue and every note in the table;
posting through the action stores a note and `curl` shows it. **In one** (headless Chrome, 1440 × 900 and 390 × 844):
the cover, the tour's three stops, a note posted from the form.

## Conditions of Satisfaction

1. `GET /graduation` is 200 and holds *Rehearsal & group photo*, *Commencement ceremony*, *Building 14*, the degree's
   title, *Back to my portfolio* (a link to `/`), and the name and words of every note in `notes` not hidden.
2. `GET /` holds a link to `/graduation`.
3. A note posted from the form is in `notes` with its name and words and nothing else, and on `/graduation` after.
4. A note with a link, an empty or too-long name or note, the bot trap filled, or a fourth from one visitor in ten
   minutes is refused, with a reason, and stored nowhere.
5. `lib/graduation.ts`'s phase, countdown, bar and day states are right before, on and after the days in Bangkok time
   (tested); the countdown is never negative.
6. `DATABASE_URL` is in no client bundle (`grep` on `.next/static`), no `NEXT_PUBLIC_` name, no log, no commit;
   `env.txt` lists it.
7. The tour on `/graduation` stops on Graduation, The days and Wishes, in that order; *Watch the tour* and *Leave a
   note* are the same width; nothing moves under *Reduce motion*.
8. `npm test`, `npm run lint`, `npm run build` pass; the portfolio's board and tour work as before.
9. `DATABASE_URL` set on Vercel for `nawmain`, preview and production. **Owner: human**.
10. The look, against the design canvas; the RSU photos and logo cleared for use, or swapped. **Owner: human**.

## Notes

- **The rules this changes** (`docs/design.md`): *one page* — `/graduation` is the second route; *nothing on the
  board takes input* — the Wishes form does, and what it keeps is the name and the note.
- **Hiding a note**: in Neon's SQL editor, `update notes set hidden = true where id = …;`.
- **The ICT round** on 6 December is RSU's to announce; when it is, the countdown can aim at it (`data/graduation.ts`).
- **The photos**: Building 14 is the owner's; the sunrise is *ตะวันรุ่ง* by Pichet Jetjongjai, RSU Gallery
  (`www2.rsu.ac.th/rsugallery`), credited where it's shown; the logo is RSU's commencement site's. CoS 10.
- The design's finale card (*See you on 5 December!* with two keys) is left out: the tour ends in confetti and the
  board's own *Watch the tour again*.

## Verification (2026-11-07)

Built and checked here, then deployed to production on the owner's word.

- **1** `npm run build && npm start`, `curl /graduation`: 200; *Rehearsal & group photo*, *Commencement ceremony*,
  *Building 14*, the degree's title, *Back to my portfolio* to `/`, and, with notes in the table, each one's name and
  words; *No notes yet* with none.
- **2** `curl /`: a link to `/graduation` (the ticket). The sitemap lists both.
- **3** Posted through the server action with `curl` and from the form in headless Chrome: each row in `notes` holds
  `id`, `name`, `body`, `created_at`, `hidden` and nothing else; the note on the wall after, the form cleared, *Thank
  you! Your note is on the board.* The check notes were deleted after.
- **4** Refused and not stored: a link (`cheap-pills.com`), the bot trap filled, posted too fast, a 201-character note,
  a blank name, and a fourth from one visitor in ten minutes. The server's log held none of what was typed. Without
  JavaScript a note is kept but the form's reply isn't shown.
- **5** `tests/graduation.test.ts`: the phase at Bangkok's midnights, the countdown at and past the ceremony, the bar,
  the day states, a note's checks, the limit. Each check broken on purpose fails its test (the phase's turn needed a
  test at the ceremony's midnight, added).
- **6** `DATABASE_URL`, `npg_`, `neondb_owner`: in no file under `.next/static`; read in `app/graduation/notes.ts`
  (`server-only`) alone; in `.env.local` (git-ignored); `env.txt` names it.
- **7** Headless Chrome, 1440 × 900: the tour's label reads *Graduation → The days → Wishes*, then confetti (48
  pieces); *Watch the tour* and *Leave a note* 240 px each; *Leave a note* lands on Wishes with the name field
  focused; typing `0`, `+`, `-` in the form leaves the camera still. With *Reduce motion*: no animation loops.
- **8** `npm test` (24), `tsc --noEmit`, `npm run lint`, `npm run build` pass. The portfolio: its tour starts on *About
  me*, *1 of 6*; no console errors on either page at 1440 × 900 or 390 × 844; no sideways scroll on a phone.
- **9** Set 2026-11-07 at the owner's word (*"u can add the db url to vercel as well"*): `DATABASE_URL` on `nawmain`, type *sensitive*, production and preview. Development reads `.env.local`.
- **10** The owner, 2026-11-07: *"yes everything stay and u can push and deploy"* — the photos and RSU's logo stay.
- **After the deploy** (owner, 2026-11-07: *"but at my portfolio page does not have the cta to graduation"*): the
  ticket lived on the cover alone, gone once the tour or exploring began. The portfolio's board now keeps *See my
  graduation* in its top right corner, as `/graduation` keeps *Back to my portfolio*; checked in headless Chrome at 1440
  and 390, after *Watch the tour* and after *Explore the board*.
- **RSU's logo out** (owner, 2026-11-07: *"no need to put this logo"*): gone from the cover, and its file from
  `public/images/graduation/`.

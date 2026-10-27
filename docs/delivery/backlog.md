# Product Backlog

The ordered list of Product Backlog Items (PBIs) for Portfolio v3.
One row per PBI. Detail lives in `docs/delivery/<id>/prd.md` and `tasks.md`.

**This file is the index, not the spec.** Keep rows short; put reasoning in the PRD.

**A PBI takes the next number when its work is started, in the order the work is done — nothing claims a number
ahead** (Khae Lik Dai's rule, carried over). Filed with the `create-pbi` skill. What the design still holds is listed,
without numbers, in `docs/design.md` under *Still to build*; each becomes the next PBI when the owner starts it. A PRD
says what it does and what it doesn't — never that another PBI will do the rest.

## Status values

| Status | Means |
| --- | --- |
| `Proposed` | Written down, not agreed. Do not build. |
| `Agreed` | Scope settled, ready to pick up. |
| `InProgress` | Being worked on now. |
| `Done` | Shipped and verified. |
| `Deferred` | Real, deliberately postponed. Not dropped. |
| `Won't Do` | Decided against. Kept so the decision isn't relitigated. |

**Every row has its PRD** in `docs/delivery/<id>/` — a row is written with its PRD, never before it.

A PBI must reach `Agreed` before code is written for it. Resolve IDs with `npm run pbi:next` rather than reading
this table by eye — it scans every branch.

## Backlog

| ID | Title | Status | Notes |
| --- | --- | --- | --- |
| [001](./001/prd.md) | Khae Lik Dai's PBI process and skills, for the rebuild | Done | Owner, 2026-10-25: *"copy the claude skills and the pbi architure flow"*. Blocks the rebuild's PBIs. |
| [002](./002/prd.md) | One page, one board: the portfolio as a sketched canvas to watch or explore | Done | Owner, 2026-10-25: *"now we will refactor all and we will have only one page"*; Watch + Explore, Excalidraw-sketchy, build straight away, certifications kept. Depends on 001. |
| [003](./003/prd.md) | The Lwant logo on the board, and its icons and share images | Done | Owner, 2026-10-25, in the logo's session: *"I like no. 2 now we got it then put them"*, top-left corner. Depends on 002. |
| [004](./004/prd.md) | The board's look: Night sticker, dark only, cover B | Done | Owner, 2026-10-25: *"I like cover B"*, no. 3, dark only, the logo without a box. Depends on 002, 003. |
| [005](./005/prd.md) | Projects: Kippy and Khae Lik Dai in, Tai Expense, Ping Pal and AI Mock Job Interview out | Done | Owner, 2026-10-25: *"remove the Tai Expense , Ping pal chat app and AI MOck job one and replace with these 2"*, their sites captured. Depends on 004. |
| [006](./006/prd.md) | No section bar, no zoom controls: zoom by hand and keys alone | Done | Owner, 2026-10-25: *"I dont like to add the navbar … and the control as well no need to show but user still can zoom in and out"*. Depends on 004. |
| [007](./007/prd.md) | See more: Projects and Achievements folded to their first cards, the rest unfolding | Done | Owner, 2026-10-25: *"for the project and achievement as u see too long what if we add like see more and add animtion"*. Depends on 004, 005. |
| [008](./008/prd.md) | Experience: Software Engineer at Scalation.ai in, and the list folded under See more | Done | Owner, 2026-10-25: *"the experiences as well and I got one more experisnce at software engineering at Scalation.ai … start from June this year and present"*. Depends on 007. |
| [009](./009/prd.md) | SEO: one address for the site, structured data from `data/`, alt text, no `X-Powered-By` | Done | Owner, 2026-10-25: *"go on"*, to the `/seo page` review's code fixes. Depends on 008. |
| [010](./010/prd.md) | About me: the summary without "1 year of experience", up to date | Done | Owner, 2026-10-27: *"update the content that tell 1 year experinse I want to remove this and may be update the content abit"*. Depends on 008. |

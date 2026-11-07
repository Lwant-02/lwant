import { Board } from "@/components/board/board";
import { Cover } from "@/components/board/cover";
import { Path } from "@/components/board/path";
import { Ticket } from "@/components/graduation/ticket";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Connect } from "@/components/sections/connect";
import { Projects } from "@/components/sections/projects";
import { Education, Experience } from "@/components/sections/timeline";
import { about } from "@/data/about";
import { SECTIONS } from "@/lib/tour";

// The one page (PBI-002): the board, its sections in the tour's order, rendered here on the server so every word is in
// the HTML; the board only moves them. Its cover carries the ticket to /graduation (PBI-011).
export default function Page() {
  return (
    <Board
      stops={SECTIONS}
      name={about.name}
      cover={<Cover {...about} ticket={<Ticket />} />}
      world="grid w-max grid-cols-[360px] items-start gap-y-50 p-30 lg:grid-cols-[720px_640px_1100px] lg:gap-x-60 lg:gap-y-55"
    >
      <About />
      <Education />
      <Projects />
      <Achievements />
      <Experience />
      <Connect />
      <Path ids={SECTIONS.map((s) => s.id)} />
    </Board>
  );
}

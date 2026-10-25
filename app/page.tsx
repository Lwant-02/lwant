import { Board } from "@/components/board/board";
import { Path } from "@/components/board/path";
import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Connect } from "@/components/sections/connect";
import { Projects } from "@/components/sections/projects";
import { Education, Experience } from "@/components/sections/timeline";
import { about } from "@/data/about";

// The one page (PBI-002): the board, its sections in the tour's order, rendered here on the server so every word is in
// the HTML; the board only moves them.
export default function Page() {
  return (
    <Board cover={about}>
      <About />
      <Education />
      <Projects />
      <Achievements />
      <Experience />
      <Connect />
      <Path />
    </Board>
  );
}

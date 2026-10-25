import { More } from "@/components/sections/more";
import { Card, Frame, OutLink, Pill } from "@/components/sections/parts";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { seeMore, split } from "@/lib/more";
import type { TimelineData } from "@/type";

const LIST = "flex flex-col gap-6";

/** Education and Experience: their roles, newest first, as the data has them; past `shown`, under *See more* (PBI-008). */
function Roles({ data, shown = Infinity }: { data: TimelineData[]; shown?: number }) {
  const [first, folded] = split(
    data.flatMap((y) => y.roles),
    shown,
  );
  return (
    <>
      <ol className={LIST}>
        {first.map((r, i) => (
          <Role key={`${r.title}-${i}`} role={r} index={i} />
        ))}
      </ol>
      {folded.length > 0 && (
        <More label={seeMore(folded.length, "experience")} className="pt-6">
          <ol start={first.length + 1} className={LIST}>
            {folded.map((r, i) => (
              <Role key={`${r.title}-${i}`} role={r} index={first.length + i} />
            ))}
          </ol>
        </More>
      )}
    </>
  );
}

function Role({ role: r, index }: { role: TimelineData["roles"][number]; index: number }) {
  return (
    <Card as="li" index={index} className="flex flex-col gap-2 p-5">
      <Pill className="self-start">{r.dateRange}</Pill>
      <h3 className="mt-1 font-display text-[21px] leading-snug">{r.title}</h3>
      <p className="text-[15px] font-extrabold text-ink-2">{r.organization}</p>
      <p className="text-[15px] leading-relaxed font-semibold text-ink-2">{r.description}</p>
      {r.link && <OutLink href={r.link} />}
    </Card>
  );
}

export function Education() {
  return (
    <Frame id="education">
      <Roles data={education} />
    </Frame>
  );
}

export function Experience() {
  return (
    <Frame id="experience">
      <Roles data={experiences} shown={3} />
    </Frame>
  );
}

import Image from "next/image";
import { More } from "@/components/sections/more";
import { Card, Frame, OutLink, Pill, Tag, TINT } from "@/components/sections/parts";
import { projects } from "@/data/project";
import { seeMore, split } from "@/lib/more";

/** Two rows on a wide board; the rest under *See more* (PBI-007). */
const SHOWN = 4;
const LIST = "grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-9";

export function Projects() {
  const [shown, folded] = split(projects, SHOWN);
  return (
    <Frame id="projects">
      <ul className={LIST}>
        {shown.map((p, i) => (
          <Project key={p.slug} project={p} index={i} />
        ))}
      </ul>
      {folded.length > 0 && (
        <More label={seeMore(folded.length, "project")} className="pt-8 lg:pt-9">
          <ul className={LIST}>
            {folded.map((p, i) => (
              <Project key={p.slug} project={p} index={SHOWN + i} />
            ))}
          </ul>
        </More>
      )}
    </Frame>
  );
}

function Project({ project: p, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <Card as="li" index={index} className="flex flex-col gap-3 p-3.5 pb-5">
      <Image
        src={p.image}
        alt={`Screenshot of ${p.title}`}
        width={1280}
        height={720}
        sizes="(min-width: 1024px) 960px, 720px"
        className="aspect-video w-full rounded-2xl border-3 border-ink object-cover object-top"
      />
      <div className="flex items-start justify-between gap-3 px-1 pt-0.5">
        <h3 className="font-display text-[22px] leading-tight">{p.title}</h3>
        <Pill>{p.date}</Pill>
      </div>
      <p className="px-1 text-[15.5px] leading-relaxed font-semibold text-ink-2">{p.description}</p>
      <ul aria-label="Built with" className="flex flex-wrap gap-1.5 px-1">
        {p.tags.map((t) => (
          <Tag key={t} tint={TINT.projects}>
            {t}
          </Tag>
        ))}
      </ul>
      {p.demoLink && (
        <span className="mt-auto px-1 pt-1">
          <OutLink href={p.demoLink} />
        </span>
      )}
    </Card>
  );
}

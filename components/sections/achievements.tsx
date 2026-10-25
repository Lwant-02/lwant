import Image from "next/image";
import { More } from "@/components/sections/more";
import { Card, Frame, OutLink, Pill } from "@/components/sections/parts";
import { achievements } from "@/data/achievement";
import { certifications } from "@/data/certification";
import { seeMore, split } from "@/lib/more";

/** Two rows of certifications on a wide board; the rest under *See more* (PBI-007). */
const SHOWN = 4;
const CERTS = "grid grid-cols-1 gap-5 lg:grid-cols-2";

export function Achievements() {
  const [shown, folded] = split(
    certifications.flatMap((y) => y.roles),
    SHOWN,
  );
  return (
    <Frame id="achievements">
      <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-9">
        {achievements.map((a, i) => (
          <Card key={a.slug} as="li" index={i} className="flex flex-col gap-3 p-3.5 pb-5">
            <Image
              src={a.image}
              alt=""
              width={1024}
              height={640}
              sizes="(min-width: 1024px) 960px, 720px"
              className="aspect-[16/10] w-full rounded-2xl border-3 border-ink object-cover"
            />
            <div className="flex flex-wrap items-center gap-2 px-1 pt-0.5">
              <Pill>{a.category}</Pill>
              <span className="text-[14px] font-extrabold text-ink-3">{a.date}</span>
            </div>
            <h3 className="px-1 font-display text-[22px] leading-tight">{a.title}</h3>
            <p className="px-1 text-[15.5px] leading-relaxed font-semibold text-ink-2">{a.description}</p>
          </Card>
        ))}
      </ul>
      <h3 className="mt-12 mb-6 font-display text-[30px]">Certifications</h3>
      <ul className={CERTS}>
        {shown.map((c, i) => (
          <Certificate key={`${c.title}-${i}`} cert={c} index={i} />
        ))}
      </ul>
      {folded.length > 0 && (
        <More label={seeMore(folded.length, "certificate")} className="pt-5">
          <ul className={CERTS}>
            {folded.map((c, i) => (
              <Certificate key={`${c.title}-${i}`} cert={c} index={SHOWN + i} />
            ))}
          </ul>
        </More>
      )}
    </Frame>
  );
}

type Cert = (typeof certifications)[number]["roles"][number];

function Certificate({ cert: c, index }: { cert: Cert; index: number }) {
  return (
    <Card as="li" index={index + 1} className="flex flex-col gap-1.5 px-5 py-4">
      <span className="text-[14px] font-extrabold text-ink-3">
        {c.organization}, {c.dateRange}
      </span>
      <p className="text-[15.5px] leading-snug font-black">{c.title}</p>
      {c.link && (
        <span className="mt-1.5">
          <OutLink href={c.link}>View certificate</OutLink>
        </span>
      )}
    </Card>
  );
}

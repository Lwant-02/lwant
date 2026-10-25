import { ArrowUpRight } from "lucide-react";
import { linkLabel } from "@/lib/links";
import { SECTIONS, type SectionId } from "@/lib/tour";
import { cn } from "@/lib/utils";

const PANEL: Record<SectionId, string> = {
  about: "bg-about",
  education: "bg-education",
  projects: "bg-projects",
  achievements: "bg-achievements",
  experience: "bg-experience",
  connect: "bg-connect",
};

export const TINT: Record<SectionId, string> = {
  about: "bg-about-tint",
  education: "bg-education-tint",
  projects: "bg-projects-tint",
  achievements: "bg-achievements-tint",
  experience: "bg-experience-tint",
  connect: "bg-connect-tint",
};

/** One of the board's six sections: a colour panel cut out of the night, its title in the logo's lettering on its top edge. */
export function Frame({ id, className, children }: { id: SectionId; className?: string; children: React.ReactNode }) {
  const title = SECTIONS.find((s) => s.id === id)!.title;
  return (
    <section
      data-section={id}
      aria-labelledby={`${id}-title`}
      className={cn("die-cut relative rounded-[34px] px-6 pt-16 pb-8 text-ink lg:px-11 lg:pt-20 lg:pb-11", PANEL[id], className)}
    >
      <h2 id={`${id}-title`} className="ltd absolute -top-10 left-6 m-0 text-[52px] leading-none whitespace-nowrap lg:-top-12 lg:left-10 lg:text-[64px]">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** A white sticker with the logo's ink depth, tilted a little one way or the other by its place in a list. */
export function Card({
  as: As = "article",
  index = 0,
  className,
  children,
}: {
  as?: "article" | "li" | "div";
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return <As className={cn("sticker rounded-3xl bg-white text-ink", index % 2 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]", className)}>{children}</As>;
}

/** A link out of the board, saying where it goes: a yellow chip. */
export function OutLink({ href, children }: { href: string; children?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center gap-1.5 self-start rounded-xl border-[2.5px] border-ink bg-sun px-3.5 py-1.5 text-[15px] font-black text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
    >
      <span className="truncate">{children ?? linkLabel(href)}</span>
      <ArrowUpRight className="size-4 flex-none" strokeWidth={2.8} aria-hidden="true" />
    </a>
  );
}

/** A date or a kind, on a yellow pill. */
export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("flex-none rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 text-[13px] font-black whitespace-nowrap", className)}>{children}</span>;
}

/** A small word on the section's tint: a tag, an interest. */
export function Tag({ tint, className, children }: { tint: string; className?: string; children: React.ReactNode }) {
  return <li className={cn("rounded-full border-2 border-ink px-2.5 py-0.5 text-[13px] font-extrabold", tint, className)}>{children}</li>;
}

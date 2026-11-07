import Image from "next/image";
import type { Note } from "@/app/graduation/notes";
import { Countdown } from "@/components/graduation/countdown";
import { NoteForm } from "@/components/graduation/note-form";
import { DAYS, Mortarboard, Pin } from "@/components/graduation/parts";
import { Card, Frame, OutLink, Pill } from "@/components/sections/parts";
import { graduation } from "@/data/graduation";
import { ago, dayLabel, dayState, phase, progress } from "@/lib/graduation";
import { cn } from "@/lib/utils";

// /graduation's three sections (PBI-011), server components: every word in the HTML, the countdown and the form the
// only client leaves.

type Degree = { title: string; organization: string };

/** Graduation: the countdown to the ceremony, how far the degree has come, and the degree. */
export function Graduation({ now, degree }: { now: number; degree: Degree }) {
  const p = phase(now, DAYS);
  const done = progress(now, DAYS.started, DAYS.ceremony);
  const headline = p === "after" ? "Graduated" : p === "ceremony" ? "Today’s the day" : "Ceremony day in";
  return (
    <Frame id="graduation" className="lg:w-[1000px]">
      <Mortarboard edge className="absolute -top-10 left-[290px] hidden size-16 rotate-12 lg:left-[440px] lg:block" />
      <div className="grid gap-7 lg:grid-cols-[7fr_5fr]">
        <Card index={0} className="flex flex-col gap-5 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] sm:text-[26px]">{headline}</h3>
            <Pill className="bg-education-tint">Bangkok time</Pill>
          </div>
          {p === "before" || p === "rehearsal" ? (
            <Countdown server={now} target={DAYS.ceremony} tone="paper" />
          ) : (
            <p className="font-display text-[20px] leading-snug">
              {p === "ceremony" ? `${graduation.ceremonyDay} · ${graduation.venue}` : `${graduation.classOf} · ${graduation.university}`}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2 text-[12.5px] font-black text-ink-2 sm:text-[13px]">
              <span>{graduation.firstDay} · first day</span>
              <span>{done >= 1 ? "all the way there" : `${Math.floor(done * 100)}% of the way there`}</span>
              <span className="hidden sm:inline">{graduation.lastDay}</span>
            </div>
            <div aria-hidden="true" className="h-[18px] overflow-hidden rounded-full border-[2.5px] border-ink bg-chalk">
              <div className="h-full border-r-[2.5px] border-ink bg-sun motion-safe:animate-fill" style={{ width: `${(done * 100).toFixed(1)}%` }} />
            </div>
          </div>
        </Card>
        <Card index={1} className="flex flex-col gap-2.5 bg-education-tint p-5 sm:p-6">
          <Pill className="self-start">{graduation.years}</Pill>
          <h3 className="mt-1.5 font-display text-[21px] leading-[1.25] sm:text-[23px]">{degree.title}</h3>
          <p className="text-[15px] font-extrabold text-ink-2">{degree.organization}</p>
          <p className="text-[15px] leading-relaxed font-semibold text-ink-2">{graduation.focus}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <Pill className="bg-white">GPA {graduation.gpa}</Pill>
            <Pill className="bg-white">{graduation.classOf}</Pill>
          </div>
        </Card>
      </div>
    </Frame>
  );
}

/** The days: rehearsal and ceremony from RSU's page, and the places — Building 14, and the campus at sunrise. */
export function Days({ now }: { now: number }) {
  const { building, sunrise } = graduation.photos;
  return (
    <Frame id="days" className="lg:w-[900px]">
      <ol className="grid gap-6 lg:grid-cols-2">
        {graduation.days.map((d, i) => {
          const start = Date.parse(d.date);
          const state = dayState(now, start);
          return (
            <Card as="li" key={d.label} index={i + 1} className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
              <div className="w-[76px] flex-none overflow-hidden rounded-2xl border-[2.5px] border-ink bg-white text-center shadow-[3px_3px_0_var(--color-ink)] sm:w-[86px]">
                <div className="border-b-[2.5px] border-ink bg-achievements py-0.5 text-[12px] font-black tracking-[0.14em] uppercase">{d.month}</div>
                <div className="pt-2 pb-1 font-display text-[36px] leading-none sm:text-[40px]">{d.day}</div>
                <div className="pb-1.5 text-[11.5px] font-black text-ink-2 uppercase">{d.weekday}</div>
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[20px]">{d.label}</h3>
                  <Pill className={cn(state === "today" ? "bg-sun" : state === "done" ? "bg-projects-tint" : "bg-chalk")}>{dayLabel(now, start)}</Pill>
                </div>
                <p className="font-display text-[16.5px] leading-snug">{d.title}</p>
                <p className="text-[14px] leading-snug font-bold text-ink-2">{d.detail}</p>
              </div>
            </Card>
          );
        })}
      </ol>
      <div className="mt-9 grid items-start gap-9 sm:grid-cols-2">
        <figure className="polaroid relative -rotate-2 text-ink">
          <span className="tape" aria-hidden="true" />
          <Image src={building.src} alt={building.alt} width={building.width} height={building.height} sizes="(min-width: 1024px) 400px, 320px" className="aspect-[518/304] w-full rounded-[4px] border-2 border-ink object-cover" />
          <figcaption className="flex items-center justify-center gap-1.5 py-2.5 font-display text-[14px]">
            <Pin />
            {building.caption}
          </figcaption>
        </figure>
        <figure className="polaroid relative rotate-3 text-ink">
          <span className="tape" style={{ background: "rgb(142 197 255 / 0.85)" }} aria-hidden="true" />
          <Image src={sunrise.src} alt={sunrise.alt} width={sunrise.width} height={sunrise.height} sizes="(min-width: 1024px) 400px, 320px" className="aspect-[3/2] w-full rounded-[4px] border-2 border-ink object-cover" />
          <figcaption className="pt-2.5 pb-2 text-center">
            <span className="block font-display text-[14px]">{sunrise.caption}</span>
            <a href={sunrise.href} target="_blank" rel="noopener noreferrer" className="text-[11.5px] font-extrabold text-ink-3 underline-offset-2 hover:underline">
              {sunrise.credit}
            </a>
          </figcaption>
        </figure>
      </div>
      <p className="mt-8 flex flex-wrap items-center gap-3 text-[14px] font-bold text-chalk-2">
        From RSU&apos;s commencement page
        <OutLink href={graduation.source} />
      </p>
    </Frame>
  );
}

// the notes' colours and tilts, in turn
const TINTS = ["bg-education-tint", "bg-about-tint", "bg-projects-tint", "bg-achievements-tint", "bg-experience-tint", "bg-connect-tint"];
const TILTS = ["-rotate-[1.4deg]", "rotate-[1.1deg]", "-rotate-[0.7deg]", "rotate-[1.5deg]", "-rotate-[1.1deg]", "rotate-[0.8deg]"];
/** How many notes sit in the panel; the rest spill onto the board under it. */
export const IN_PANEL = 8;

/** A note pinned to the board. */
function NoteCard({ note, now, index, small }: { note: Note; now: number; index: number; small?: boolean }) {
  return (
    <li
      className={cn(
        "relative flex flex-col gap-3 rounded-[14px] border-[2.5px] border-ink px-4 pt-5 pb-3.5 text-ink shadow-[4px_4px_0_var(--color-ink)] motion-safe:animate-pop",
        TINTS[index % TINTS.length],
        TILTS[index % TILTS.length],
        small ? "w-[176px]" : "min-h-[158px]",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 size-4 -translate-x-1/2 rounded-full border-[2.5px] border-ink bg-sun" />
      <p className={cn("leading-[1.45] font-bold break-words", small ? "text-[14px]" : "text-[15px]")}>{note.body}</p>
      <p className="mt-auto flex flex-col gap-0.5 border-t-2 border-dashed border-ink/25 pt-2.5">
        <span className="font-display text-[15px] leading-tight break-words">{note.name}</span>
        <time dateTime={new Date(note.at).toISOString()} className="text-[12px] font-black text-ink-3">
          {ago(now, note.at)}
        </time>
      </p>
    </li>
  );
}

/** Wishes: the form, and the newest notes on the wall. */
export function Wishes({ notes, now }: { notes: Note[] | null; now: number }) {
  const shown = notes?.slice(0, IN_PANEL) ?? [];
  const total = notes?.length ?? 0;
  return (
    <Frame id="wishes">
      <p className="absolute top-6 right-6 left-6 text-[15px] font-bold text-chalk-2 lg:top-7 lg:left-11">
        Leave a note for my graduation. It sticks to the board for everyone to see.
      </p>
      <div className="mt-8 grid items-start gap-9 lg:mt-4 lg:grid-cols-[340px_1fr]">
        <NoteForm opened={now} />
        <div className="flex flex-col gap-5">
          <h3 className="font-display text-[19px] text-white" aria-live="polite">
            {notes === null
              ? "The notes can’t be read just now. Try again in a minute."
              : total === 0
                ? "No notes yet. Be the first!"
                : `${total === 60 ? "60 and more" : total} ${total === 1 ? "note" : "notes"} so far`}
          </h3>
          {shown.length > 0 && (
            <ol className="grid grid-cols-1 gap-x-5 gap-y-6 pt-2 sm:grid-cols-2 xl:grid-cols-4">
              {shown.map((n, i) => (
                <NoteCard key={n.id} note={n} now={now} index={i} />
              ))}
            </ol>
          )}
        </div>
      </div>
    </Frame>
  );
}

/** The older notes, spilling onto the board under Wishes, pinned at a tilt. */
export function Spill({ notes, now }: { notes: Note[] | null; now: number }) {
  const older = notes?.slice(IN_PANEL) ?? [];
  if (older.length === 0) return null;
  return (
    <section data-spill aria-label="Older notes" className="flex flex-col items-center gap-6">
      <p className="text-[13px] font-black tracking-[0.12em] text-chalk-3 uppercase">Older notes</p>
      <ol className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {older.map((n, i) => (
          <NoteCard key={n.id} note={n} now={now} index={i + IN_PANEL} small />
        ))}
      </ol>
    </section>
  );
}

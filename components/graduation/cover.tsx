"use client";

import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { useId } from "react";
import { KeyButton, PlayMark, Sparkle } from "@/components/board/cover";
import { useBoard } from "@/components/board/ways";
import { useNow } from "@/components/graduation/clock";
import { Countdown } from "@/components/graduation/countdown";
import { BackLink, DAYS, Mortarboard, Pin } from "@/components/graduation/parts";
import { graduation } from "@/data/graduation";
import { phase } from "@/lib/graduation";
import { cn } from "@/lib/utils";

// falling confetti in the six sections' colours: where, how big, how fast, how far through its fall it starts
const BITS = [
  [6, "bg-sun", "h-[7px] w-3", 9, -2],
  [14, "bg-education", "h-3.5 w-2", 11, -7],
  [23, "bg-achievements", "size-2.5 rounded-full", 10, -4],
  [31, "bg-projects", "h-1.5 w-3", 12, -9],
  [42, "bg-experience", "h-3 w-[7px]", 9.5, -1],
  [57, "bg-connect", "h-[7px] w-3", 10.5, -6],
  [66, "bg-sun", "size-[9px] rounded-full", 11.5, -3],
  [75, "bg-achievements", "h-3.5 w-2", 9, -8],
  [84, "bg-education", "h-[7px] w-3", 12.5, -5],
  [93, "bg-projects", "h-1.5 w-2.5", 10, -2.5],
] as const;

type Props = { now: number; name: string; photo: string; degree: string };

/**
 * What /graduation opens on (PBI-011, the canvas's B): *I'm graduating!*, the countdown to the ceremony,
 * and two ways in — watch the tour, or go and leave a note. Around it, stuck on the night: the owner's photo, Building
 * 14, the *Class of 2026* badge and the *5–6 Dec* burst, and confetti falling.
 */
export function GraduationCover({ now: server, name, photo, degree }: Props) {
  const { watch, visit } = useBoard();
  const now = useNow(server);
  const p = phase(now, DAYS);
  const ring = useId();
  const { building } = graduation.photos;
  return (
    <div className="absolute inset-0 overflow-x-hidden overflow-y-auto bg-night/90">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {BITS.map(([left, colour, shape, secs, delay], i) => (
          <span
            key={i}
            className={cn("absolute -top-8 rounded-[2px] motion-safe:animate-fall motion-reduce:hidden", colour, shape)}
            style={{ left: `${left}%`, animationDuration: `${secs}s`, animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <Sparkle className="top-[16%] left-[31%] size-5 motion-safe:animate-twinkle" />
      <Sparkle className="top-[46%] right-[29%] size-4 text-sun motion-safe:animate-twinkle [animation-delay:-1.2s]" />
      <Sparkle className="top-[88%] left-[36%] size-3.5 text-education motion-safe:animate-twinkle [animation-delay:-0.6s]" />

      <Image src="/lwant-logo-dark.svg" alt="Lwant" width={111} height={50} className="absolute top-3 left-3 h-10 w-auto lg:top-4 lg:left-5 lg:h-12.5" />
      <BackLink className="absolute top-3 right-3 z-10 lg:top-4 lg:right-5" />

      {/* the owner, taped to the left; Building 14 to the right — on a wide screen, where there's room */}
      <div className="absolute top-[17%] left-[5%] hidden -rotate-6 xl:block">
        <figure className="polaroid relative w-[214px] motion-safe:animate-bob">
          <span className="tape" style={{ left: 20, marginLeft: 0, rotate: "-28deg" }} aria-hidden="true" />
          <Image src={photo} alt={name} width={420} height={524} className="h-[236px] w-full rounded-[4px] border-2 border-ink object-cover object-[center_14%]" />
          <figcaption className="py-2.5 text-center font-display text-[14px] text-ink">{graduation.photos.me.caption}</figcaption>
          <Mortarboard edge className="absolute -top-6 -right-5 size-[78px] rotate-[16deg] white-edge" />
        </figure>
      </div>
      <div className="absolute top-[40%] right-[3.5%] hidden rotate-[5deg] xl:block">
        <figure className="polaroid relative w-[262px] motion-safe:animate-bob [animation-delay:-1.4s]">
          <span className="tape" style={{ background: "rgb(142 197 255 / 0.85)" }} aria-hidden="true" />
          <Image src={building.src} alt={building.alt} width={building.width} height={building.height} className="h-[150px] w-full rounded-[4px] border-2 border-ink object-cover" />
          <figcaption className="flex items-center justify-center gap-1.5 py-2.5 font-display text-[14px] text-ink">
            <Pin />
            {building.caption}
          </figcaption>
        </figure>
      </div>
      <div className="absolute top-[68%] left-[8%] hidden -rotate-8 xl:block" aria-hidden="true">
        <div className="relative size-[156px] rounded-full shadow-[0_0_0_5px_#fff]">
          <svg viewBox="0 0 160 160" className="absolute inset-0 size-full motion-safe:animate-spin-slow">
            <defs>
              <path id={ring} d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
            </defs>
            <circle cx="80" cy="80" r="77" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="4" />
            <text fontFamily="var(--font-display-face)" fontSize="13.5" letterSpacing="1.4" fill="var(--color-ink)">
              <textPath href={`#${ring}`}>{`${graduation.classOf} ★ ${graduation.university} ★`.toUpperCase()}</textPath>
            </text>
          </svg>
          <span className="absolute inset-[39px] grid place-items-center rounded-full border-3 border-ink bg-white">
            <Mortarboard className="size-[46px]" />
          </span>
        </div>
      </div>
      <Burst className="absolute top-[13%] right-[9%] hidden size-[140px] rotate-12 lg:block" />

      <div className="relative grid min-h-full place-items-center px-4 pt-20 pb-12 sm:px-5">
        <div className="flex w-full max-w-[620px] animate-[rise_600ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col items-center text-center motion-reduce:animate-none">
          <p className="sticker flex -rotate-2 items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 font-display text-[14px] whitespace-nowrap text-ink sm:text-[15px]">
            <span className="grid size-7.5 place-items-center rounded-full border-[2.5px] border-ink bg-education-tint">
              <Mortarboard className="size-5.5" />
            </span>
            {graduation.classOf} · {graduation.degreeShort}
          </p>
          <h1 className="ltd mt-6 text-[50px] leading-[1.02] sm:text-[80px]">
            {p === "after" ? "I graduated!" : p === "ceremony" ? "Today’s the day!" : "I’m graduating!"}
          </h1>

          {p === "before" || p === "rehearsal" ? (
            <>
              <p className="mt-7 mb-3.5 text-[13px] font-black tracking-[0.16em] text-education uppercase sm:text-[14px]">
                {p === "rehearsal" ? "Rehearsal today · ceremony in" : "Ceremony day in"}
              </p>
              <Countdown server={server} target={DAYS.ceremony} className="max-w-[460px]" />
            </>
          ) : p === "ceremony" ? (
            <p className="keycap mt-7 rounded-[18px] bg-education px-5 py-3 font-display text-[19px] text-ink sm:text-[22px]">
              Ceremony day · {graduation.ceremonyDay} · {graduation.venue}
            </p>
          ) : (
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed font-extrabold text-chalk-2">
              {degree} · {graduation.university} · {graduation.month}
            </p>
          )}
          <p className="mt-5 text-[14px] font-bold text-chalk-3 sm:text-[15px]">
            {graduation.dates} · {graduation.venue} · Bangkok time
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-6">
            <KeyButton onClick={watch} primary className="w-[240px] justify-center">
              <PlayMark />
              Watch the tour
            </KeyButton>
            <KeyButton onClick={() => visit("wishes")} className="w-[240px] justify-center">
              <MessageSquare className="size-[18px]" strokeWidth={2.6} aria-hidden="true" />
              Leave a note
            </KeyButton>
          </div>
          <p className="mt-6 text-[14px] font-bold text-chalk-3 sm:text-[14.5px]">About 30 seconds: the countdown, the degree, the days and your notes.</p>
        </div>
      </div>
    </div>
  );
}

/** The *5–6 Dec* burst, bobbing. */
function Burst({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative size-full white-edge motion-safe:animate-bob [animation-delay:-2s]">
        <svg viewBox="0 0 140 140" className="absolute inset-0 size-full">
          <polygon
            points="132,70 121,80.1 127.3,93.7 113.2,98.9 113.8,113.8 98.9,113.2 93.7,127.3 80.1,121 70,132 59.9,121 46.3,127.3 41.1,113.2 26.2,113.8 26.8,98.9 12.7,93.7 19,80.1 8,70 19,59.9 12.7,46.3 26.8,41.1 26.2,26.2 41.1,26.8 46.3,12.7 59.9,19 70,8 80.1,19 93.7,12.7 98.9,26.8 113.8,26.2 113.2,41.1 127.3,46.3 121,59.9"
            fill="var(--color-education)"
            stroke="var(--color-ink)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center font-display leading-none text-ink">
          <span className="text-[30px]">{graduation.whenShort.split(" ")[0]}</span>
          <span className="text-[18px] tracking-[0.08em] uppercase">{graduation.whenShort.split(" ")[1]}</span>
        </span>
      </div>
    </div>
  );
}

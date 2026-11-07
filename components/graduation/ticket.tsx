"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useNow } from "@/components/graduation/clock";
import { DAYS, Mortarboard } from "@/components/graduation/parts";
import { graduation } from "@/data/graduation";
import { countdown, phase } from "@/lib/graduation";

/**
 * The way from the portfolio's cover to /graduation (PBI-011): a white ticket over the wordmark, saying how far off
 * the ceremony is. The cover is built ahead, so until the page hydrates it says the dates instead of the time left.
 */
export function Ticket() {
  const now = useNow(null);
  const p = now === null ? "before" : phase(now, DAYS);
  const c = countdown(now ?? DAYS.ceremony, DAYS.ceremony);
  const title = { before: `Graduating ${graduation.when}`, rehearsal: "Rehearsal today!", ceremony: "Graduating today!", after: `Graduated · ${graduation.month}` }[p];
  const sub =
    now === null
      ? graduation.dates
      : {
          before: `${c.days > 0 ? `${c.days} ${c.days === 1 ? "day" : "days"} ` : ""}${c.hours} h ${c.minutes} min to the ceremony`,
          rehearsal: `Ceremony tomorrow · ${graduation.ceremonyDay}`,
          ceremony: `Ceremony at ${graduation.venue} · ${graduation.ceremonyDay}`,
          after: `${graduation.classOf} · see the notes`,
        }[p];
  return (
    <div className="mb-7 -rotate-[1.5deg]">
      <Link
        href="/graduation"
        className="sticker flex items-center gap-3 rounded-[22px] bg-white p-2 pl-2.5 text-left text-ink transition-transform hover:-translate-y-0.5 motion-safe:animate-wiggle sm:gap-3.5 sm:p-2.5 sm:pl-3"
      >
        <span className="grid size-11 flex-none place-items-center rounded-full border-[2.5px] border-ink bg-education-tint sm:size-12.5">
          <Mortarboard className="size-7.5 sm:size-8.5" />
        </span>
        <span className="flex min-w-0 flex-col gap-0.5 pr-1">
          <span className="font-display text-[16px] leading-tight sm:text-[19px]">
            {p === "before" ? (
              <>
                <span className="sm:hidden">Graduating {graduation.whenShort}</span>
                <span className="hidden sm:inline">{title}</span>
              </>
            ) : (
              title
            )}
          </span>
          <span className="text-[12.5px] font-black text-ink-2 sm:text-[14px]">{sub}</span>
        </span>
        <span className="inline-flex h-11 flex-none items-center gap-2 rounded-[14px] border-[2.5px] border-ink bg-sun px-3 font-display text-[16px] whitespace-nowrap sm:px-4">
          <span className="hidden sm:inline">See my graduation</span>
          <ArrowRight className="size-4.5" strokeWidth={3.2} aria-hidden="true" />
          <span className="sr-only sm:hidden">See my graduation</span>
        </span>
      </Link>
    </div>
  );
}

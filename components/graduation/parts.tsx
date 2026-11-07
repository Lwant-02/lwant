import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { graduation } from "@/data/graduation";
import type { Days } from "@/lib/graduation";
import { cn } from "@/lib/utils";

// /graduation's small parts (PBI-011), server-safe: the mortarboard, the way back, the days as instants.

export const DAYS: Days & { started: number } = {
  started: Date.parse(graduation.started),
  rehearsal: Date.parse(graduation.rehearsal),
  ceremony: Date.parse(graduation.ceremony),
  after: Date.parse(graduation.after),
};

/** A mortarboard in ink, its tassel in the logo's yellow, swaying; `edge` gives it the sticker's white outline. */
export function Mortarboard({ className, edge }: { className?: string; edge?: boolean }) {
  const line = edge ? "#fff" : "var(--color-ink)";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path d="M18 30v11c0 5 6.5 8 14 8s14-3 14-8V30" fill="var(--color-ink)" stroke={line} strokeWidth={edge ? 3 : 0} />
      <path d="M32 12 60 25 32 38 4 25Z" fill="var(--color-ink)" stroke={line} strokeWidth={3} strokeLinejoin="round" />
      <g className="origin-top-left [transform-box:fill-box] motion-safe:animate-sway">
        <path d="M32 25 51 31v13" fill="none" stroke="var(--color-ink)" strokeWidth={6} strokeLinecap="round" />
        <path d="M32 25 51 31v13" fill="none" stroke="var(--color-sun)" strokeWidth={3} strokeLinecap="round" />
        <circle cx="51" cy="48" r="4.5" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth={2.5} />
      </g>
    </svg>
  );
}

/** The way back to the portfolio: a white sticker, as the portfolio's ticket is the way here. */
export function BackLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "sticker group inline-flex rotate-[1.5deg] items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 font-display text-[15px] text-ink transition-transform hover:rotate-0 hover:-translate-y-0.5 sm:pr-5 sm:text-[16px]",
        className,
      )}
    >
      <span className="grid size-8 flex-none place-items-center rounded-full border-[2.5px] border-ink bg-sun sm:size-9.5">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 sm:size-4.5" strokeWidth={3.4} aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className="sm:hidden">My portfolio</span>
        <span className="hidden sm:inline">Back to my portfolio</span>
        <span className="hidden font-body text-[12px] font-black text-ink-3 sm:inline">Projects, experience &amp; more</span>
      </span>
    </Link>
  );
}

/** A map pin, for a place. */
export function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" fill="var(--color-achievements)" stroke="var(--color-ink)" strokeWidth="2.4" />
      <circle cx="12" cy="10" r="2.6" fill="var(--color-ink)" />
    </svg>
  );
}

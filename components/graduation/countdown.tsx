"use client";

import { useNow } from "@/components/graduation/clock";
import { countdown, pad2 } from "@/lib/graduation";
import { cn } from "@/lib/utils";

/**
 * The countdown to the ceremony (PBI-011): four keys — days in the logo's yellow, the seconds giving a small jump as
 * they tick. `night` on the night (white-edged keycaps), `paper` on a white card (ink depth).
 */
export function Countdown({ server, target, tone = "night", className }: { server: number; target: number; tone?: "night" | "paper"; className?: string }) {
  const now = useNow(server);
  const c = countdown(now, target);
  const keys = [
    { value: c.days, unit: c.days === 1 ? "day" : "days", face: "bg-sun text-ink" },
    { value: c.hours, unit: "hours", face: tone === "night" ? "bg-[#26262b] text-white" : "bg-gown text-white" },
    { value: c.minutes, unit: "minutes", face: tone === "night" ? "bg-[#26262b] text-white" : "bg-gown text-white" },
    { value: c.seconds, unit: "seconds", face: cn(tone === "night" ? "bg-[#26262b]" : "bg-gown", "text-education motion-safe:animate-tick") },
  ];
  return (
    <div
      role="timer"
      aria-label={`${c.days} days, ${c.hours} hours and ${c.minutes} minutes until the ceremony`}
      className={cn("grid w-full grid-cols-4 gap-3.5 sm:gap-5", className)}
    >
      {keys.map((k) => (
        <div key={k.unit} className="flex min-w-0 flex-col items-center gap-2.5">
          <span
            aria-hidden="true"
            className={cn(
              "grid h-16 w-full place-items-center rounded-[15px] font-display text-[30px] leading-none sm:h-20 sm:rounded-[18px] sm:text-[42px]",
              tone === "night" ? "keycap" : "border-3 border-ink shadow-[4px_4px_0_var(--color-ink)]",
              k.face,
            )}
          >
            {pad2(k.value)}
          </span>
          <span aria-hidden="true" className={cn("text-[11px] font-black tracking-[0.12em] uppercase sm:text-[12.5px]", tone === "night" ? "text-chalk-2" : "text-ink-2")}>
            {k.unit}
          </span>
        </div>
      ))}
    </div>
  );
}

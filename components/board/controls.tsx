"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import type { Mode } from "@/components/board/board";
import { KeyButton, PlayMark } from "@/components/board/cover";
import { LAST, SECTIONS, stepName, type SectionId } from "@/lib/tour";

const ISLAND = "pointer-events-auto rounded-2xl border-2 border-island-line bg-island";
const TOOL =
  "grid size-10 flex-none cursor-pointer place-items-center rounded-xl text-chalk transition-colors hover:bg-white/8 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

// each section's own colour, for the tour's label and its progress
const BG: Record<SectionId, string> = {
  about: "bg-about",
  education: "bg-education",
  projects: "bg-projects",
  achievements: "bg-achievements",
  experience: "bg-experience",
  connect: "bg-connect",
};
const TEXT: Record<SectionId, string> = {
  about: "text-about",
  education: "text-education",
  projects: "text-projects",
  achievements: "text-achievements",
  experience: "text-experience",
  connect: "text-connect",
};

type Props = {
  mode: Mode;
  step: number;
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onBack: () => void;
  onNext: () => void;
  onWatch: () => void;
};

/**
 * What floats over the board: the logo, and the tour — its controls while it plays, *Watch the tour* while exploring.
 * No section bar and no zoom controls (owner, 2026-10-25, PBI-006): zooming is the wheel, a pinch and the keys.
 */
export function Controls(p: Props) {
  const watching = p.mode === "watch";
  const done = watching && !p.playing && p.step === LAST;
  const current = SECTIONS[p.step];
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* the owner's wordmark, straight on the night, where Excalidraw keeps its menu (PBI-003, PBI-004) */}
      <Image
        src="/lwant-logo-dark.svg"
        alt="Lwant"
        width={111}
        height={50}
        className="pointer-events-auto absolute top-3 left-3 h-10 w-auto lg:top-4 lg:left-5 lg:h-12.5"
      />

      {/* as wide as what it holds: at left 50% it would otherwise get half the screen and wrap *Watch the tour* */}
      <div className="absolute bottom-3 left-1/2 w-max -translate-x-1/2 lg:bottom-4">
        {watching ? (
          <div className={`${ISLAND} flex w-[min(430px,calc(100vw-32px))] items-center gap-1.5 p-1.5 pr-4`}>
            <button type="button" onClick={p.onBack} disabled={p.step === 0} aria-label="The section before" className={TOOL}>
              <SkipBack className="size-4.5" strokeWidth={2.4} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={p.playing ? p.onPause : p.onPlay}
              aria-label={p.playing ? "Pause the tour" : done ? "Watch the tour again" : "Play the tour"}
              className="grid size-11 flex-none cursor-pointer place-items-center rounded-full border-3 border-ink bg-sun text-ink shadow-[0_0_0_3px_#fff] transition-transform active:scale-95"
            >
              {p.playing ? (
                <Pause className="size-4 fill-current" aria-hidden="true" />
              ) : done ? (
                <RotateCcw className="size-4" strokeWidth={3} aria-hidden="true" />
              ) : (
                <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
              )}
            </button>
            <button type="button" onClick={p.onNext} disabled={p.step === LAST} aria-label="The section after" className={TOOL}>
              <SkipForward className="size-4.5" strokeWidth={2.4} aria-hidden="true" />
            </button>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 pl-2">
              <span className="flex items-baseline justify-between gap-2 whitespace-nowrap" aria-live="polite">
                <span className={`font-display text-[17px] ${TEXT[current.id]}`}>{current.title}</span>
                <span className="text-[14px] font-extrabold text-chalk-3">{stepName(p.step)}</span>
              </span>
              <span aria-hidden="true" className="h-3 overflow-hidden rounded-full border-[2.5px] border-white bg-night">
                <span
                  className={`block h-full transition-[width] duration-500 motion-reduce:transition-none ${BG[current.id]}`}
                  style={{ width: `${((p.step + 1) / SECTIONS.length) * 100}%` }}
                />
              </span>
            </div>
          </div>
        ) : (
          <KeyButton onClick={p.onWatch} primary className="pointer-events-auto h-13 px-6 text-[19px]">
            <PlayMark />
            Watch the tour
          </KeyButton>
        )}
      </div>
    </div>
  );
}

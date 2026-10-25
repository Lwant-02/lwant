"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  role: string;
  location: string;
  line: string;
  photo: string;
  onWatch: () => void;
  onExplore: () => void;
};

/**
 * What the page opens on (PBI-004, the canvas's cover B): the wordmark as the hero, then who this is — a photo
 * sticker, the name, the role — and the two ways in: watch the tour, or explore the board.
 */
export function Cover({ name, role, location, line, photo, onWatch, onExplore }: Props) {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-night/90">
      <Sparkle className="top-[19%] left-[17%] size-5 opacity-55" />
      <Sparkle className="top-[62%] right-[18%] size-7 opacity-55" />
      <Sparkle className="top-[71%] left-[21%] size-4 text-sun opacity-55" />
      <div className="grid min-h-full place-items-center px-5 py-12">
        <div className="flex animate-[rise_600ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col items-center text-center motion-reduce:animate-none">
          <Image
            src="/lwant-logo-dark.svg"
            alt="Lwant"
            width={700}
            height={315}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-[min(700px,86vw)]"
          />
          <div className="mt-7 flex items-center gap-4 text-left">
            <Image
              src={photo}
              alt=""
              width={140}
              height={140}
              className="size-[70px] flex-none rounded-full border-4 border-white object-cover object-[center_16%] shadow-[0_0_0_4px_#fff] outline-[2.5px] outline-ink"
            />
            <div className="flex flex-col gap-1">
              <h1 className="font-display text-[clamp(26px,5vw,34px)] leading-none">{name}</h1>
              <p className="text-[16px] font-extrabold text-chalk-2 sm:text-[17px]">
                {role} in {location}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed font-semibold text-chalk-2">{line}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <KeyButton onClick={onWatch} primary>
              <PlayMark />
              Watch the tour
            </KeyButton>
            <KeyButton onClick={onExplore}>Explore the board</KeyButton>
          </div>
          <p className="mt-6 text-[14.5px] font-bold text-chalk-3">The tour takes about a minute. Or drag, scroll and zoom around on your own.</p>
        </div>
      </div>
    </div>
  );
}

/** A key to press, in the logo's look: yellow for the call to action, night for the other. */
export function KeyButton({
  primary,
  onClick,
  className,
  children,
}: {
  primary?: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "keycap inline-flex h-14 cursor-pointer items-center gap-3 whitespace-nowrap rounded-2xl px-6 font-display text-[19px] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 sm:h-[60px] sm:px-7 sm:text-[22px]",
        primary ? "bg-sun text-ink" : "bg-[#26262b] text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PlayMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3.5v17l14.5-8.5z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** The logo's four-pointed sparkle, scattered on the night. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("pointer-events-none absolute text-white", className)}>
      <path d="M12 0C12 7 17 12 24 12 17 12 12 17 12 24 12 17 7 12 0 12 7 12 12 7 12 0Z" fill="currentColor" />
    </svg>
  );
}

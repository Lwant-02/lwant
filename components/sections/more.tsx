"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { REVEAL } from "@/components/board/board";
import { cn } from "@/lib/utils";

/**
 * The rest of a long list, folded under the cards the board shows (PBI-007). Folded, it's still in the HTML but out of
 * reach — not tabbed to, not read. *See more* opens it, its cards popping in one after another as stickers slapped
 * down; *See less* folds it back, and the board brings the button, now further up, back into view.
 */
export function More({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const reveal = () => button.current?.dispatchEvent(new Event(REVEAL, { bubbles: true }));
  const toggle = () => {
    setOpen(!open);
    // under Reduce motion the fold is instant, with no transition to end
    if (open && window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(reveal);
  };
  return (
    <>
      <div
        id={id}
        inert={!open}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && !open) reveal();
        }}
        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        {/* room for the cards' tilt and ink depth, which the fold would clip */}
        <div className="-mx-4 min-h-0 overflow-hidden px-4">
          <div className={cn("pb-3", open && "motion-safe:unfold", className)}>{children}</div>
        </div>
      </div>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className="sticker mx-auto mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-display text-[18px] text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
      >
        {open ? "See less" : label}
        <ChevronDown
          className={cn("size-5 transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
          strokeWidth={3}
          aria-hidden="true"
        />
      </button>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { DONE } from "@/components/board/board";
import { cn } from "@/lib/utils";

// a burst of confetti in the six sections' colours, worked out once: each piece's colour, shape, and where it flies
const COLOURS = ["bg-sun", "bg-education", "bg-projects", "bg-achievements", "bg-experience", "bg-connect"];
const PIECES = Array.from({ length: 48 }, (_, i) => {
  // a fan upwards, from 170° to 10° above the horizon
  const angle = ((-170 + ((i * 37) % 160)) * Math.PI) / 180;
  const reach = 260 + ((i * 53) % 260);
  return {
    colour: COLOURS[i % COLOURS.length],
    shape: i % 3 === 0 ? "size-2.5 rounded-full" : i % 3 === 1 ? "h-2 w-3.5 rounded-[2px]" : "h-3.5 w-2 rounded-[2px]",
    dx: `${Math.round(Math.cos(angle) * reach)}px`,
    dy: `${Math.round(Math.sin(angle) * reach)}px`,
    turn: `${(i % 2 ? 1 : -1) * (360 + ((i * 71) % 360))}deg`,
    delay: `${(i % 6) * 40}ms`,
  };
});

/** When /graduation's tour ends, confetti bursts up from the bottom of the screen, once (PBI-011). */
export function Confetti() {
  const [shot, setShot] = useState(0);
  useEffect(() => {
    const go = () => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShot((n) => n + 1);
    };
    window.addEventListener(DONE, go);
    return () => window.removeEventListener(DONE, go);
  }, []);
  useEffect(() => {
    if (!shot) return;
    const id = setTimeout(() => setShot(0), 3000);
    return () => clearTimeout(id);
  }, [shot]);
  if (!shot) return null;
  return (
    <div key={shot} aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className={cn("absolute bottom-10 animate-burst", p.colour, p.shape)}
          style={{ "--dx": p.dx, "--dy": p.dy, "--turn": p.turn, animationDelay: p.delay } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { arrow, between } from "@/lib/arrows";
import { SECTIONS } from "@/lib/tour";

type Box = { x: number; y: number; width: number; height: number };

/** The path the tour follows: a white arrow from each section to the next, drawn on the world behind them. */
export function Path() {
  const ref = useRef<SVGSVGElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  useLayoutEffect(() => {
    const world = ref.current!.parentElement!;
    const measure = () =>
      setBoxes(
        SECTIONS.map((s) => {
          const el = world.querySelector<HTMLElement>(`[data-section="${s.id}"]`)!;
          return { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
        }),
      );
    const ro = new ResizeObserver(measure);
    ro.observe(world);
    return () => ro.disconnect();
  }, []);
  const arrows = useMemo(() => boxes.slice(1).map((b, i) => arrow(...between(boxes[i], b), i % 2 ? -0.14 : 0.14)), [boxes]);
  return (
    <svg ref={ref} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-px overflow-visible">
      {arrows.map((a, i) => (
        <g key={i}>
          <path d={a.body} fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
          <path d={a.head} fill="#fff" stroke="#fff" strokeWidth={3} strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

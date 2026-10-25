// The path between the board's sections (PBI-004): white curved arrows with a filled head, as SVG paths.

export type Point = [number, number];
type Box = { x: number; y: number; width: number; height: number };

const r = (n: number) => Math.round(n * 10) / 10;
const pt = (p: Point) => `${r(p[0])} ${r(p[1])}`;

/** An arrow from one point to another, bowed sideways by `bow` of its length, with a filled head `head` long at `to`. */
export function arrow(from: Point, to: Point, bow = 0.12, head = 18): { body: string; head: string } {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const bend: Point = [(from[0] + to[0]) / 2 - dy * bow, (from[1] + to[1]) / 2 + dx * bow];
  // the line stops where the head begins, so it doesn't poke through the head's point
  const angle = Math.atan2(to[1] - bend[1], to[0] - bend[0]) || 0;
  const base: Point = [to[0] - head * Math.cos(angle), to[1] - head * Math.sin(angle)];
  const wing = (side: 1 | -1): Point => [
    base[0] + side * head * 0.62 * Math.cos(angle + Math.PI / 2),
    base[1] + side * head * 0.62 * Math.sin(angle + Math.PI / 2),
  ];
  return {
    body: `M${pt(from)} Q${pt(bend)} ${pt(base)}`,
    head: `M${pt(to)} L${pt(wing(1))} L${pt(wing(-1))} Z`,
  };
}

/** Where the arrow from one section to the next runs: across, down or back, from just outside one frame to the next. */
export function between(a: Box, b: Box, gap = 44, level = 120): [Point, Point] {
  const y = Math.max(a.y, b.y) + level;
  if (b.x >= a.x + a.width) return [[a.x + a.width + gap, y], [b.x - gap, y]];
  if (b.x + b.width <= a.x) return [[a.x - gap, y], [b.x + b.width + gap, y]];
  const x = (Math.max(a.x, b.x) + Math.min(a.x + a.width, b.x + b.width)) / 2;
  return [[x, a.y + a.height + gap], [x, b.y - gap]];
}

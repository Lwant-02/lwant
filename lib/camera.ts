// The board's camera (PBI-002), carried over from journey's (journey/web/lib/road.ts): the world is drawn at
// `translate(x, y) scale(z)`, so a world point p lands on the screen at (x + p.x * z, y + p.y * z).

export type Camera = { x: number; y: number; z: number };
export type Point = { x: number; y: number };
/** A rectangle in the world. */
export type Box = { x: number; y: number; width: number; height: number };
/** The screen, and how much of each edge the floating controls cover. */
export type Frame = { width: number; height: number; top: number; right: number; bottom: number; left: number };

export const ZOOM = { min: 0.12, max: 2.5 };

export const clampZ = (z: number) => Math.min(ZOOM.max, Math.max(ZOOM.min, z));

/** Zoom by `factor` about the screen point (sx, sy), which stays over the same world point. */
export function zoomAt(cam: Camera, factor: number, sx: number, sy: number): Camera {
  const z = clampZ(cam.z * factor);
  const k = z / cam.z;
  return { z, x: sx - (sx - cam.x) * k, y: sy - (sy - cam.y) * k };
}

export function pan(cam: Camera, dx: number, dy: number): Camera {
  return { ...cam, x: cam.x + dx, y: cam.y + dy };
}

/** The world point under the screen point (sx, sy). */
export function toWorld(cam: Camera, sx: number, sy: number): Point {
  return { x: (sx - cam.x) / cam.z, y: (sy - cam.y) / cam.z };
}

/** The middle of the frame's open part, on the screen. */
export function middle(frame: Frame): Point {
  return {
    x: frame.left + (frame.width - frame.left - frame.right) / 2,
    y: frame.top + (frame.height - frame.top - frame.bottom) / 2,
  };
}

/** The same zoom, moved so the world point p sits in the middle of the frame's open part. */
export function centreOn(cam: Camera, p: Point, frame: Frame): Camera {
  const m = middle(frame);
  return { z: cam.z, x: m.x - p.x * cam.z, y: m.y - p.y * cam.z };
}

/** The camera that shows `box` whole in the frame's open part, centred, no closer than `most`. */
export function fit(box: Box, frame: Frame, most = 1, margin = 32): Camera {
  const w = Math.max(1, frame.width - frame.left - frame.right - margin * 2);
  const h = Math.max(1, frame.height - frame.top - frame.bottom - margin * 2);
  const z = clampZ(Math.min(most, w / box.width, h / box.height));
  return centreOn({ x: 0, y: 0, z }, { x: box.x + box.width / 2, y: box.y + box.height / 2 }, frame);
}

/** Part of the way from one camera to another. */
export function mix(from: Camera, to: Camera, t: number): Camera {
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t, z: from.z + (to.z - from.z) * t };
}

/** A glide's ease, cubic-bezier(0.16, 1, 0.3, 1): quick away, a long settle. */
export function glideEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const [x1, y1, x2, y2] = [0.16, 1, 0.3, 1];
  const bez = (u: number, a: number, b: number) => 3 * a * u * (1 - u) ** 2 + 3 * b * u * u * (1 - u) + u ** 3;
  // the curve's u where its x is t, by halving: x rises with u, so it always finds it
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, x1, x2) < t) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, y1, y2);
}

import { clampZ, fit, middle, type Box, type Camera, type Frame } from "./camera.ts";

// The board's six sections, in the owner's order (PBI-002, 2026-10-25: *"about me , education, projects,
// achievement , experiences and connect"*) — the order of the DOM, the path and the tour.
export const SECTIONS = [
  { id: "about", title: "About me", hold: 7000 },
  { id: "education", title: "Education", hold: 6000 },
  { id: "projects", title: "Projects", hold: 14000 },
  { id: "achievements", title: "Achievements", hold: 10000 },
  { id: "experience", title: "Experience", hold: 8000 },
  { id: "connect", title: "Connect", hold: 5000 },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const LAST = SECTIONS.length - 1;

export const stepAfter = (step: number) => Math.min(LAST, step + 1);
export const stepBefore = (step: number) => Math.max(0, step - 1);

/** "3 of 6" */
export const stepName = (step: number) => `${step + 1} of ${SECTIONS.length}`;

/**
 * Where the tour's camera holds on a section. A section that fits at `least` or closer is shown whole and still. One
 * that doesn't — a long one on a phone — is shown at `least` from its top, and drifts down to its bottom over the
 * hold, so the whole of it passes by.
 */
export function shots(box: Box, frame: Frame, least: number): { start: Camera; end: Camera } {
  const whole = fit(box, frame);
  if (whole.z >= least) return { start: whole, end: whole };
  const open = { width: frame.width - frame.left - frame.right, height: frame.height - frame.top - frame.bottom };
  const z = clampZ(Math.min(1, Math.max(least, (open.width - 32) / box.width)));
  const x = middle(frame).x - (box.x + box.width / 2) * z;
  const start = { z, x, y: frame.top + 24 - box.y * z };
  const end = { z, x, y: frame.height - frame.bottom - 24 - (box.y + box.height) * z };
  return { start, end: end.y < start.y ? end : start };
}

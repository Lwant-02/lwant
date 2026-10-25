"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controls } from "@/components/board/controls";
import { Cover } from "@/components/board/cover";
import { centreOn, fit, glideEase, middle, mix, pan, toWorld, zoomAt, type Box, type Camera, type Frame } from "@/lib/camera";
import { LAST, SECTIONS, shots } from "@/lib/tour";

export type Mode = "cover" | "explore" | "watch";

/** Sent up from something on the board that has moved, for the board to bring it back into view (PBI-007). */
export const REVEAL = "board:reveal";

type Props = {
  /** the world: the six sections and the path, rendered on the server */
  children: React.ReactNode;
  cover: { name: string; role: string; location: string; line: string; photo: string };
};

const GLIDE = 900;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrow = (width: number) => width < 1024;

/** The open part of the screen: under the top controls, over the bottom ones; all of it while the cover's up. */
function frameOf(size: { width: number; height: number }, mode: Mode): Frame {
  if (mode === "cover") return { ...size, top: 0, right: 0, bottom: 0, left: 0 };
  return { ...size, top: 72, right: 16, bottom: 80, left: 16 };
}

/** How close the tour must be to read a section; further out, it reads a long one from the top down. */
const leastFor = (width: number) => (narrow(width) ? 0.8 : 0.75);

/**
 * The board (PBI-002): dotted paper and one world drawn through one camera, as journey's road is
 * (journey/web/components/road/road-canvas.tsx). A cover first; then *Explore* — drag, scroll, pinch and the keys move
 * and zoom it — or *Watch* — the camera glides through the sections in the owner's order, and a hand takes it over.
 */
export function Board({ children, cover }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const size = useRef({ width: 1440, height: 900 });
  const [mode, setMode] = useState<Mode>("cover");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, z: 0.3 });
  const cam = useRef(camera);
  const state = useRef({ mode, step, playing });
  useEffect(() => {
    cam.current = camera;
    state.current = { mode, step, playing };
  });
  const move = useCallback((c: Camera) => {
    cam.current = c;
    setCamera(c);
  }, []);

  // ── where things are ──────────────────────────────────────────────────────────────────────────────
  // a section's title sits on its top edge, half above it, and its white edge around it: both are framed with it
  const TITLE = 64;
  const boxOf = (i: number): Box => {
    const el = world.current!.querySelector<HTMLElement>(`[data-section="${SECTIONS[i].id}"]`)!;
    return { x: el.offsetLeft - 6, y: el.offsetTop - TITLE, width: el.offsetWidth + 12, height: el.offsetHeight + TITLE + 6 };
  };
  const frame = (m = state.current.mode) => frameOf(size.current, m);
  const shotOf = (i: number) => shots(boxOf(i), frame(), leastFor(size.current.width));
  /** The whole board, if it can be read whole enough; else About me. */
  const overview = (m: Mode = state.current.mode): Camera => {
    const w = world.current!;
    const whole = fit({ x: 0, y: 0, width: w.offsetWidth, height: w.offsetHeight }, frameOf(size.current, m), 1, 16);
    return m === "cover" || whole.z >= 0.3 ? whole : shots(boxOf(0), frameOf(size.current, m), leastFor(size.current.width)).start;
  };

  // ── moving the camera over time ───────────────────────────────────────────────────────────────────
  const frameId = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const halt = useCallback(() => {
    if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    if (timer.current !== null) clearTimeout(timer.current);
    frameId.current = timer.current = null;
  }, []);
  /** Move the camera along `at` over `ms`; under *Reduce motion*, a glide is a cut and a drift jumps at its end. */
  const animate = (ms: number, at: (t: number) => Camera, ease: "glide" | "drift", done?: () => void) => {
    halt();
    if (reduced()) {
      const cut = () => {
        move(at(1));
        done?.();
      };
      if (ease === "glide") return cut();
      timer.current = setTimeout(cut, ms);
      return;
    }
    let from: number | undefined;
    frameId.current = requestAnimationFrame(function tick(now) {
      from ??= now;
      const t = Math.min(1, (now - from) / ms);
      move(at(ease === "glide" ? glideEase(t) : t));
      frameId.current = t < 1 ? requestAnimationFrame(tick) : null;
      if (t === 1) done?.();
    });
  };
  const glideTo = (to: Camera, done?: () => void) => {
    const from = cam.current;
    animate(GLIDE, (t) => mix(from, to, t), "glide", done);
  };

  // ── the tour ──────────────────────────────────────────────────────────────────────────────────────
  // how much of the current section's hold is left, and whether a hand has moved the camera off it
  const hold = useRef({ left: 0, at: 0, moved: false });
  const holdOn = (i: number) => {
    const end = shotOf(i).end;
    const from = cam.current;
    hold.current.at = performance.now();
    animate(hold.current.left, (t) => mix(from, end, t), "drift", () => {
      if (i === LAST) return setPlaying(false);
      goStep(i + 1, true);
    });
  };
  const goStep = (i: number, play: boolean) => {
    setStep(i);
    hold.current = { left: SECTIONS[i].hold, at: 0, moved: false };
    glideTo(shotOf(i).start, play ? () => holdOn(i) : undefined);
  };
  const play = () => {
    setPlaying(true);
    const { step: i } = state.current;
    if (i === LAST && hold.current.left <= 0) return goStep(0, true);
    if (hold.current.moved || hold.current.at === 0) {
      hold.current = { left: SECTIONS[i].hold, at: 0, moved: false };
      return glideTo(shotOf(i).start, () => holdOn(i));
    }
    holdOn(i);
  };
  const pause = () => {
    halt();
    if (hold.current.at) hold.current.left = Math.max(0, hold.current.left - (performance.now() - hold.current.at));
    hold.current.at = 0;
    setPlaying(false);
  };
  /** A hand on the camera: it stops any glide, and the tour waits. */
  const hand = () => {
    if (state.current.playing) pause();
    else halt();
    hold.current.moved = true;
  };

  const watch = () => {
    setMode("watch");
    setPlaying(true);
    state.current.mode = "watch";
    goStep(0, true);
  };
  const explore = () => {
    halt();
    setMode("explore");
    setPlaying(false);
    state.current.mode = "explore";
    glideTo(overview("explore"));
  };
  const zoomBy = (factor: number) => {
    halt();
    const m = middle(frame());
    const from = cam.current;
    animate(220, (t) => zoomAt(from, factor ** t, m.x, m.y), "glide");
  };
  const fitAll = () => {
    if (state.current.playing) pause();
    glideTo(overview());
  };

  // ── the screen measured before the first paint; the camera kept on what it showed through a resize ──
  // the world growing — a font arriving, *See more* unfolding — re-aims only the cover's; on the board, the camera stays
  useLayoutEffect(() => {
    const el = root.current!;
    const measure = () => {
      size.current = { width: el.clientWidth, height: el.clientHeight };
      halt();
      const { mode: m, step: i } = state.current;
      if (m === "cover") move(overview("cover"));
      else if (m === "watch") move(shotOf(i).start);
    };
    const grown = () => {
      if (state.current.mode === "cover") move(overview("cover"));
    };
    measure();
    const screen = new ResizeObserver(measure);
    screen.observe(el);
    const contents = new ResizeObserver(grown);
    contents.observe(world.current!);
    return () => {
      screen.disconnect();
      contents.disconnect();
      halt();
    };
    // measured once, then on a resize
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── the hand: drag, pinch, wheel, keys ────────────────────────────────────────────────────────────
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ start: { x: 0, y: 0 }, moved: false, pinch: null as null | { dist: number; mid: { x: number; y: number } } });

  useEffect(() => {
    const el = root.current!;
    // the wheel moves the board, or zooms it with Ctrl or ⌘ (a trackpad's pinch); the page itself never scrolls
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (state.current.mode === "cover") return;
      hand();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? size.current.height : 1;
      const c = cam.current;
      if (e.ctrlKey || e.metaKey) move(zoomAt(c, Math.exp(-e.deltaY * unit * 0.0055), e.clientX, e.clientY));
      else if (e.shiftKey && !e.deltaX) move(pan(c, -e.deltaY * unit, 0));
      else move(pan(c, -e.deltaX * unit, -e.deltaY * unit));
    };
    const onReveal = (e: Event) => bring(e.target as Element);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener(REVEAL, onReveal);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener(REVEAL, onReveal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) gesture.current = { start: { x: e.clientX, y: e.clientY }, moved: false, pinch: null };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const now = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, now);
    const g = gesture.current;
    if (pointers.current.size === 1) {
      // a press only becomes a drag once it moves, so a link on the board still takes its click
      if (!g.moved && Math.hypot(now.x - g.start.x, now.y - g.start.y) > 4) {
        g.moved = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        hand();
      }
      if (g.moved) move(pan(cam.current, now.x - prev.x, now.y - prev.y));
      return;
    }
    const [a, b] = [...pointers.current.values()];
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    if (g.pinch) move(zoomAt(pan(cam.current, mid.x - g.pinch.mid.x, mid.y - g.pinch.mid.y), dist / g.pinch.dist, mid.x, mid.y));
    else {
      e.currentTarget.setPointerCapture(e.pointerId);
      hand();
    }
    g.moved = true;
    g.pinch = { dist, mid };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current.pinch = null;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    // a drag that ends on a link isn't a click on it
    if (gesture.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      gesture.current.moved = false;
      return;
    }
    // a press on a link or a button on the board is a hand too: the tour waits while it's read
    if (state.current.playing && (e.target as Element).closest("a, button")) hand();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 80;
    const keys: Record<string, () => void> = {
      ArrowLeft: () => move(pan(cam.current, step, 0)),
      ArrowRight: () => move(pan(cam.current, -step, 0)),
      ArrowUp: () => move(pan(cam.current, 0, step)),
      ArrowDown: () => move(pan(cam.current, 0, -step)),
      "+": () => zoomBy(1.25),
      "=": () => zoomBy(1.25),
      "-": () => zoomBy(0.8),
      "0": fitAll,
    };
    const act = keys[e.key];
    if (!act || e.altKey || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    if (e.key.startsWith("Arrow")) hand();
    act();
  };
  /** Something on the board out of the open part of the screen is brought into view. */
  const bring = (el: Element) => {
    const r = el.getBoundingClientRect();
    const f = frame();
    if (r.left >= f.left && r.top >= f.top && r.right <= f.width - f.right && r.bottom <= f.height - f.bottom) return;
    hand();
    const at = toWorld(cam.current, r.left + r.width / 2, r.top + r.height / 2);
    glideTo(centreOn({ ...cam.current, z: Math.max(cam.current.z, 0.8) }, at, f));
  };
  /** A link tabbed to on the board is brought into view. */
  const onFocus = (e: React.FocusEvent) => {
    if (e.target !== root.current) bring(e.target);
  };

  // the paper's dots move and scale with the board; doubled apart when they'd crowd
  let dots = 24 * camera.z;
  while (dots < 12) dots *= 2;
  const open = mode !== "cover";

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* the cover's name is the page's heading; with the cover gone, the board keeps one */}
      {open && <h1 className="sr-only">{cover.name}</h1>}
      <div
        ref={root}
        role="region"
        aria-roledescription="board"
        aria-label="The board. Drag or scroll to move around; pinch, Ctrl and scroll, or + and − to zoom; 0 shows it all."
        tabIndex={open ? 0 : -1}
        inert={!open}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className="absolute inset-0 cursor-grab touch-none outline-none select-none active:cursor-grabbing"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-night-dot) 1.2px, transparent 1.5px)",
          backgroundSize: `${dots}px ${dots}px`,
          backgroundPosition: `${camera.x}px ${camera.y}px`,
        }}
      >
        <div
          ref={world}
          className="absolute top-0 left-0 grid w-max origin-top-left grid-cols-[360px] items-start gap-y-50 p-30 lg:grid-cols-[720px_640px_1100px] lg:gap-x-60 lg:gap-y-55"
          style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.z})` }}
        >
          {children}
        </div>
      </div>
      {open ? (
        <Controls
          mode={mode}
          step={step}
          playing={playing}
          onPlay={play}
          onPause={pause}
          onBack={() => goStep(Math.max(0, step - 1), playing)}
          onNext={() => goStep(Math.min(LAST, step + 1), playing)}
          onWatch={watch}
        />
      ) : (
        <Cover {...cover} onWatch={watch} onExplore={explore} />
      )}
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";

// One clock for /graduation's countdowns and the portfolio's ticket (PBI-011): the second it is, ticking.
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const second = () => Math.floor(Date.now() / 1000) * 1000;

/**
 * The time now, to the second. While the page hydrates it is `server` — the time the server rendered it, or `null`
 * for a page built ahead — so what the browser first draws matches the HTML; then it ticks.
 */
export function useNow<T extends number | null>(server: T): number | T {
  return useSyncExternalStore<number | T>(subscribe, second, () => server);
}

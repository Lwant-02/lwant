"use client";

import { createContext, useContext } from "react";

/** What a cover's keys do (PBI-011): watch the tour, explore the board, or explore from one section. */
export type Ways = { watch: () => void; explore: () => void; visit: (id: string) => void };

export const WaysContext = createContext<Ways | null>(null);

/** The board's ways in, for a cover rendered as the board's `cover`. */
export function useBoard(): Ways {
  const ways = useContext(WaysContext);
  if (!ways) throw new Error("useBoard: used outside a Board's cover");
  return ways;
}

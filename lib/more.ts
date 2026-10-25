/** A long list cut short (PBI-007): the cards the board shows, and the ones folded under *See more*. */
export function split<T>(items: readonly T[], shown: number): [T[], T[]] {
  return [items.slice(0, shown), items.slice(shown)];
}

/** What *See more* says: "See 3 more projects", "See 1 more certificate". */
export const seeMore = (count: number, noun: string) => `See ${count} more ${count === 1 ? noun : `${noun}s`}`;

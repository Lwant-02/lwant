// What decides on /graduation (PBI-011): where the days stand at a time, the countdown, the bar, and whether a note
// may go on the Wishes wall. Plain TypeScript, so `node --test` runs it as it is; the dates are data/graduation.ts's.

export type Phase = "before" | "rehearsal" | "ceremony" | "after";

/** The days, as instants: the rehearsal's midnight, the ceremony's, and the midnight after it, in Bangkok. */
export type Days = { rehearsal: number; ceremony: number; after: number };

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Where the graduation stands at `now`. */
export function phase(now: number, d: Days): Phase {
  if (now < d.rehearsal) return "before";
  if (now < d.ceremony) return "rehearsal";
  if (now < d.after) return "ceremony";
  return "after";
}

/** What's left until `target`, never less than nothing. */
export function countdown(now: number, target: number) {
  const left = Math.max(0, target - now);
  return {
    days: Math.floor(left / DAY),
    hours: Math.floor(left / HOUR) % 24,
    minutes: Math.floor(left / MINUTE) % 60,
    seconds: Math.floor(left / 1000) % 60,
  };
}

/** How far from `from` to `to` `now` is, 0 to 1. */
export const progress = (now: number, from: number, to: number) => Math.min(1, Math.max(0, (now - from) / (to - from)));

/** A day of the two, by its midnight: still ahead, today, or done. */
export function dayState(now: number, start: number): "ahead" | "today" | "done" {
  if (now < start) return "ahead";
  return now < start + DAY ? "today" : "done";
}

/** What a day's card says of it: "in 28 days", "tomorrow", "today", "done". */
export function dayLabel(now: number, start: number): string {
  const state = dayState(now, start);
  if (state !== "ahead") return state;
  const days = Math.ceil((start - now) / DAY);
  return days <= 1 ? "tomorrow" : `in ${days} days`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** How long ago a note went up: "just now", "5 min ago", "3 hours ago", "yesterday", "4 days ago", "6 Dec". */
export function ago(now: number, then: number): string {
  const gone = Math.max(0, now - then);
  if (gone < MINUTE) return "just now";
  if (gone < HOUR) return `${Math.floor(gone / MINUTE)} min ago`;
  if (gone < DAY) {
    const h = Math.floor(gone / HOUR);
    return h === 1 ? "an hour ago" : `${h} hours ago`;
  }
  const d = Math.floor(gone / DAY);
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  return new Date(then).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });
}

// ── a note on the Wishes wall ─────────────────────────────────────────────────────────────────────────

export const NAME_MAX = 40;
export const NOTE_MAX = 200;
/** A person reads the form before they post; a script doesn't. */
export const QUICKEST = 2_500;

export type NoteInput = { name: string; body: string; trap: string; openedAt: number };
export type NoteCheck = { ok: true; name: string; body: string } | { ok: false; reason: string };

/** Control characters out, every run of space one space, the ends trimmed. */
// control characters, zero-width marks and bidi overrides, as a space
const UNSEEN = new RegExp("[\\u0000-\\u001f\\u007f-\\u009f\\u200b-\\u200f\\u2028-\\u202e\\u2060-\\u206f]", "g");

export const tidy = (s: string) => s.replace(UNSEEN, " ").replace(/\s+/g, " ").trim();

/** Characters as a person counts them, not UTF-16 units. */
export const length = (s: string) => [...s].length;

const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|dev|xyz|ru|cn|info|biz|co|me|app|site|online|top|shop|link|ly|gg|tk)\b)/i;

/** Whether a note may go on the wall, and its name and words as they'd be kept. */
export function checkNote(input: NoteInput, now: number): NoteCheck {
  if (input.trap) return { ok: false, reason: "Your note couldn't be sent. Try again." };
  if (!Number.isFinite(input.openedAt) || now - input.openedAt < QUICKEST)
    return { ok: false, reason: "That was quick. Give it a second and send it again." };
  const name = tidy(input.name);
  const body = tidy(input.body);
  if (!name) return { ok: false, reason: "Add your name, so I know who it's from." };
  if (!body) return { ok: false, reason: "Write a note first." };
  if (length(name) > NAME_MAX) return { ok: false, reason: `Your name can be up to ${NAME_MAX} characters.` };
  if (length(body) > NOTE_MAX) return { ok: false, reason: `A note can be up to ${NOTE_MAX} characters.` };
  if (LINK.test(name) || LINK.test(body)) return { ok: false, reason: "Notes can't hold links." };
  return { ok: true, name, body };
}

/** A limit of `limit` in `windowMs`: whether one more may go now, and the times to keep counting from. */
export function allow(times: readonly number[], now: number, limit: number, windowMs: number): { ok: boolean; times: number[] } {
  const recent = times.filter((t) => now - t < windowMs);
  if (recent.length >= limit) return { ok: false, times: recent };
  return { ok: true, times: [...recent, now] };
}

"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { addNote, countRecent } from "@/app/graduation/notes";
import { allow, checkNote } from "@/lib/graduation";

export type Posted = { ok: boolean; message: string; at: number } | null;

// how many notes one visitor posts, and the wall takes in all, in ten minutes
const MINE = 3;
const ALL = 30;
const WINDOW = 10 * 60_000;

// One visitor's recent posts, by a hash of their address, in this server's memory only — never stored, never logged.
const recent = new Map<string, number[]>();

async function visitor(): Promise<string> {
  const h = await headers();
  const address = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(address).digest("hex").slice(0, 32);
}

/**
 * A note from the Wishes form (PBI-011): checked by lib/graduation.ts, limited, then kept as its name and words and
 * nothing else, and the wall re-rendered with it.
 */
export async function postNote(_: Posted, form: FormData): Promise<Posted> {
  const now = Date.now();
  const refuse = (message: string): Posted => ({ ok: false, message, at: now });

  const check = checkNote(
    {
      name: String(form.get("name") ?? ""),
      body: String(form.get("body") ?? ""),
      trap: String(form.get("website") ?? ""),
      openedAt: Number(form.get("opened")),
    },
    now,
  );
  if (!check.ok) return refuse(check.reason);

  const who = await visitor();
  const mine = allow(recent.get(who) ?? [], now, MINE, WINDOW);
  if (!mine.ok) return refuse("You've left a few notes already. Thank you! Try again in a little while.");

  try {
    if ((await countRecent(WINDOW / 60_000)) >= ALL) return refuse("Lots of notes right now. Try again in a few minutes.");
    await addNote(check.name, check.body);
  } catch {
    console.error("notes: couldn't add a note");
    return refuse("Your note couldn't be saved just now. Try again in a minute.");
  }

  recent.set(who, mine.times);
  if (recent.size > 5000) recent.delete(recent.keys().next().value!);
  revalidatePath("/graduation");
  return { ok: true, message: "Thank you! Your note is on the board.", at: now };
}

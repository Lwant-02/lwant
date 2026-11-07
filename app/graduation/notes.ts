import "server-only";
import { neon } from "@neondatabase/serverless";

// The Wishes wall's notes (PBI-011), in Neon: a name, the words, when. `DATABASE_URL` is read here, on the server, and
// nowhere else; a failure is reported without it, and without what anyone wrote.

export type Note = { id: number; name: string; body: string; at: number };

const db = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("notes: DATABASE_URL is not set");
  return neon(url);
};

/** The newest notes not hidden, newest first; `null` if they can't be read just now. */
export async function readNotes(limit = 60): Promise<Note[] | null> {
  try {
    const rows = await db()`select id, name, body, created_at from notes where not hidden order by created_at desc limit ${limit}`;
    return rows.map((r) => ({ id: Number(r.id), name: String(r.name), body: String(r.body), at: new Date(r.created_at).getTime() }));
  } catch {
    console.error("notes: couldn't read the wall");
    return null;
  }
}

/** How many notes went up in the last `minutes`, hidden or not. */
export async function countRecent(minutes: number): Promise<number> {
  const [row] = await db()`select count(*)::int as count from notes where created_at > now() - make_interval(mins => ${minutes})`;
  return Number(row.count);
}

/** Puts a checked note on the wall: its name and words, nothing else. */
export async function addNote(name: string, body: string): Promise<void> {
  await db()`insert into notes (name, body) values (${name}, ${body})`;
}

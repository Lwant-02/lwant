// Makes the Wishes wall's table in the database `DATABASE_URL` names (PBI-011): scripts/notes.sql, one statement at a
// time. `npm run notes:setup` reads .env.local; it prints what it did, never the address.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (put it in .env.local).");
  process.exit(1);
}

const sql = neon(url);
const statements = readFileSync(new URL("./notes.sql", import.meta.url), "utf8")
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log("ok:", statement.split("\n")[0]);
}
const [{ count }] = await sql.query("select count(*)::int as count from notes");
console.log(`notes: ${count} in the table`);

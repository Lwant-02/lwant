import assert from "node:assert/strict";
import { test } from "node:test";
import { ago, allow, checkNote, countdown, dayLabel, dayState, length, phase, progress, tidy, type Days } from "../lib/graduation.ts";
import { GRADUATION } from "../lib/tour.ts";

const at = (iso: string) => Date.parse(iso);
const days: Days = {
  rehearsal: at("2026-12-05T00:00:00+07:00"),
  ceremony: at("2026-12-06T00:00:00+07:00"),
  after: at("2026-12-07T00:00:00+07:00"),
};

test("the phase turns over at midnight in Bangkok, not where the server is", () => {
  assert.equal(phase(at("2026-12-04T23:59:59+07:00"), days), "before");
  // 17:00 UTC on the 4th is midnight on the 5th in Bangkok
  assert.equal(phase(at("2026-12-04T17:00:00Z"), days), "rehearsal");
  assert.equal(phase(at("2026-12-06T08:00:00+07:00"), days), "ceremony");
  assert.equal(phase(days.ceremony, days), "ceremony");
  assert.equal(phase(days.ceremony - 1, days), "rehearsal");
  assert.equal(phase(at("2026-12-07T00:00:00+07:00"), days), "after");
});

test("the countdown counts down and never goes below nothing", () => {
  assert.deepEqual(countdown(at("2026-11-07T12:00:00+07:00"), days.ceremony), { days: 28, hours: 12, minutes: 0, seconds: 0 });
  assert.deepEqual(countdown(days.ceremony - 61_000, days.ceremony), { days: 0, hours: 0, minutes: 1, seconds: 1 });
  assert.deepEqual(countdown(days.after, days.ceremony), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test("the bar runs from 0 to 1 and stays there", () => {
  const from = at("2023-06-01T00:00:00+07:00");
  assert.equal(progress(from - 1, from, days.ceremony), 0);
  assert.equal(progress(days.after, from, days.ceremony), 1);
  const mid = progress((from + days.ceremony) / 2, from, days.ceremony);
  assert.ok(Math.abs(mid - 0.5) < 1e-9);
});

test("a day is ahead, today, then done", () => {
  assert.equal(dayState(days.rehearsal - 1, days.rehearsal), "ahead");
  assert.equal(dayState(days.rehearsal, days.rehearsal), "today");
  assert.equal(dayState(days.ceremony, days.rehearsal), "done");
  assert.equal(dayLabel(at("2026-11-07T12:00:00+07:00"), days.rehearsal), "in 28 days");
  assert.equal(dayLabel(days.rehearsal - 3_600_000, days.rehearsal), "tomorrow");
  assert.equal(dayLabel(days.ceremony + 1, days.ceremony), "today");
});

test("a note says how long ago it went up", () => {
  const now = at("2026-11-20T12:00:00+07:00");
  assert.equal(ago(now, now - 10_000), "just now");
  assert.equal(ago(now, now - 5 * 60_000), "5 min ago");
  assert.equal(ago(now, now - 3_600_000), "an hour ago");
  assert.equal(ago(now, now - 26 * 3_600_000), "yesterday");
  assert.equal(ago(now, now - 4 * 86_400_000), "4 days ago");
  assert.equal(ago(now, at("2026-11-06T09:00:00+07:00")), "6 Nov");
  assert.equal(ago(now, now + 5_000), "just now");
});

const now = at("2026-11-20T12:00:00+07:00");
const note = { name: "A friend", body: "Congrats!", trap: "", openedAt: now - 30_000 };

test("a note is kept as its name and words, tidied", () => {
  assert.deepEqual(checkNote({ ...note, name: "  Mai \n Lwin ", body: "So\tproud\u0000 of you " }, now), {
    ok: true,
    name: "Mai Lwin",
    body: "So proud of you",
  });
  assert.equal(tidy("a​b"), "a b");
  assert.equal(length("ပြည်"), 4);
});

test("a note is refused, with a reason, when it shouldn't go up", () => {
  const refused = (n: Partial<typeof note>) => {
    const r = checkNote({ ...note, ...n }, now);
    assert.equal(r.ok, false);
    return r.ok ? "" : r.reason;
  };
  assert.match(refused({ name: "   " }), /name/);
  assert.match(refused({ body: "" }), /note/);
  assert.match(refused({ name: "x".repeat(41) }), /40/);
  assert.match(refused({ body: "x".repeat(201) }), /200/);
  assert.match(refused({ body: "see https://spam.example" }), /links/);
  assert.match(refused({ body: "visit cheap-pills.com now" }), /links/);
  assert.match(refused({ name: "www.spam" }), /links/);
  assert.ok(refused({ trap: "http://bot" }));
  assert.match(refused({ openedAt: now - 1_000 }), /quick/);
  assert.match(refused({ openedAt: Number.NaN }), /quick/);
  // exactly at the limits is fine
  assert.equal(checkNote({ ...note, name: "x".repeat(40), body: "y".repeat(200) }, now).ok, true);
});

test("one visitor posts at most the limit in the window, then again once it's passed", () => {
  let times: number[] = [];
  for (let i = 0; i < 3; i++) {
    const r = allow(times, now + i, 3, 600_000);
    assert.ok(r.ok);
    times = r.times;
  }
  assert.equal(allow(times, now + 10, 3, 600_000).ok, false);
  assert.equal(allow(times, now + 600_001, 3, 600_000).ok, true);
});

test("the graduation tour stops on Graduation, The days and Wishes", () => {
  assert.deepEqual(
    GRADUATION.map((s) => s.id),
    ["graduation", "days", "wishes"],
  );
});

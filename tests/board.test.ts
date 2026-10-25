import assert from "node:assert/strict";
import { test } from "node:test";
import { fit, glideEase, toWorld, zoomAt, ZOOM, type Frame } from "../lib/camera.ts";
import { linkLabel } from "../lib/links.ts";
import { seeMore, split } from "../lib/more.ts";
import { arrow, between } from "../lib/arrows.ts";
import { LAST, SECTIONS, shots, stepAfter, stepBefore, stepName } from "../lib/tour.ts";

const frame: Frame = { width: 1440, height: 900, top: 80, right: 16, bottom: 96, left: 16 };
const phone: Frame = { width: 390, height: 844, top: 76, right: 12, bottom: 92, left: 12 };

test("zooming keeps the world point under the pointer", () => {
  const cam = { x: 120, y: -40, z: 0.8 };
  const before = toWorld(cam, 500, 300);
  const after = toWorld(zoomAt(cam, 1.7, 500, 300), 500, 300);
  assert.ok(Math.abs(before.x - after.x) < 1e-9 && Math.abs(before.y - after.y) < 1e-9);
});

test("the zoom stays within its limits", () => {
  assert.equal(zoomAt({ x: 0, y: 0, z: 1 }, 100, 0, 0).z, ZOOM.max);
  assert.equal(zoomAt({ x: 0, y: 0, z: 1 }, 0.0001, 0, 0).z, ZOOM.min);
});

test("a fitted box sits inside the frame's open part", () => {
  const box = { x: 900, y: 1200, width: 1080, height: 1400 };
  const cam = fit(box, frame);
  const left = cam.x + box.x * cam.z;
  const top = cam.y + box.y * cam.z;
  assert.ok(left >= frame.left && left + box.width * cam.z <= frame.width - frame.right + 1e-9);
  assert.ok(top >= frame.top && top + box.height * cam.z <= frame.height - frame.bottom + 1e-9);
  // and never closer than life size
  assert.ok(fit({ x: 0, y: 0, width: 10, height: 10 }, frame).z <= 1);
});

test("the glide's ease starts at 0, ends at 1 and only rises", () => {
  assert.equal(glideEase(0), 0);
  assert.equal(glideEase(1), 1);
  let last = 0;
  for (let t = 0.05; t < 1; t += 0.05) {
    const v = glideEase(t);
    assert.ok(v >= last);
    last = v;
  }
});

test("the tour is the owner's order, and its steps stop at both ends", () => {
  assert.deepEqual(
    SECTIONS.map((s) => s.id),
    ["about", "education", "projects", "achievements", "experience", "connect"],
  );
  assert.equal(stepBefore(0), 0);
  assert.equal(stepAfter(LAST), LAST);
  assert.equal(stepAfter(1), 2);
  assert.equal(stepName(2), "3 of 6");
});

test("a section that fits holds still; a long one drifts from its top to its bottom", () => {
  const short = shots({ x: 0, y: 0, width: 600, height: 400 }, frame, 0.6);
  assert.deepEqual(short.start, short.end);
  const long = { x: 0, y: 1000, width: 360, height: 3000 };
  const { start, end } = shots(long, phone, 0.85);
  assert.equal(start.z, end.z);
  assert.ok(start.z >= 0.85);
  assert.equal(Math.round(start.y + long.y * start.z), phone.top + 24);
  assert.equal(Math.round(end.y + (long.y + long.height) * end.z), phone.height - phone.bottom - 24);
});

test("an arrow starts where it's asked, and its head's point is where it ends", () => {
  const a = arrow([10, 20], [210, 20]);
  assert.match(a.body, /^M10 20 Q/);
  assert.match(a.head, /^M210 20 L/);
  // a bow bends it to one side; the other way bends it to the other
  const bendOf = (d: string) => Number(d.split("Q")[1].trim().split(" ")[1]);
  assert.ok(bendOf(arrow([0, 0], [200, 0], 0.14).body) > 0 && bendOf(arrow([0, 0], [200, 0], -0.14).body) < 0);
  assert.doesNotMatch(arrow([5, 5], [5, 5]).body + arrow([5, 5], [5, 5]).head, /NaN/);
});

test("the arrow between two sections runs across, down or back, outside both", () => {
  const a = { x: 0, y: 0, width: 400, height: 300 };
  const [f1, t1] = between(a, { x: 600, y: 0, width: 300, height: 300 });
  assert.ok(f1[0] > 400 && t1[0] < 600 && f1[1] === t1[1]);
  const [f2, t2] = between(a, { x: 0, y: 500, width: 400, height: 200 });
  assert.ok(f2[1] > 300 && t2[1] < 500 && f2[0] === t2[0]);
  const [f3, t3] = between({ x: 600, y: 0, width: 300, height: 300 }, a);
  assert.ok(f3[0] < 600 && t3[0] > 400);
});

test("a link out says where it goes", () => {
  assert.equal(linkLabel("https://thock.nawmain.dev"), "thock.nawmain.dev");
  assert.equal(linkLabel("https://github.com/Lwant-02/Tai-Expense.git"), "github.com/Lwant-02/Tai-Expense");
  assert.equal(linkLabel("https://ai-mock-job-interview.vercel.app/"), "ai-mock-job-interview.vercel.app");
  assert.equal(linkLabel("https://www.linkedin.com/in/sai-naw-main-03b655281/"), "linkedin.com/in/sai-naw-main-03b655281");
});

test("a long list splits into what shows and what's folded, in order", () => {
  assert.deepEqual(split([1, 2, 3, 4, 5, 6, 7], 4), [[1, 2, 3, 4], [5, 6, 7]]);
  assert.deepEqual(split([1, 2], 4), [[1, 2], []]);
});

test("See more counts what's folded", () => {
  assert.equal(seeMore(3, "project"), "See 3 more projects");
  assert.equal(seeMore(1, "certificate"), "See 1 more certificate");
});

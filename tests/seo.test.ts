import assert from "node:assert/strict";
import { test } from "node:test";
import { ongoing, profilePage } from "../lib/profile.ts";
import { siteUrl } from "../lib/site.ts";

test("the site has one address, without a trailing slash", () => {
  assert.equal(siteUrl(undefined), "https://nawmain.dev");
  assert.equal(siteUrl(""), "https://nawmain.dev");
  assert.equal(siteUrl("https://nawmain.dev/"), "https://nawmain.dev");
  assert.equal(siteUrl(" https://example.com// "), "https://example.com");
});

test("a role running to Present is ongoing", () => {
  assert.ok(ongoing({ dateRange: "Jun 2026 - Present" }));
  assert.ok(!ongoing({ dateRange: "Dec 2025 - Apr 2026" }));
  assert.ok(!ongoing({ dateRange: "31 Mar 2026" }));
});

const role = (title: string, organization: string, dateRange: string, link?: string) => ({ title, organization, dateRange, link });
const base = {
  url: "https://nawmain.dev",
  name: "A",
  nickname: "B",
  photo: "/images/profile.jpg",
  description: "d",
  knowsAbout: ["x"],
  socials: ["https://github.com/a"],
};

test("the profile takes its job from the role still going, and its schools from the education", () => {
  const page = profilePage({
    ...base,
    experience: [role("Engineer", "Now Co", "Jun 2026 - Present", "https://now.co"), role("Intern", "Then Co", "2025 - 2026")],
    education: [role("BSc", "Uni", "2023 - Present"), role("Diploma", "College", "2021 - 2023")],
  });
  assert.equal(page["@type"], "ProfilePage");
  const p = page.mainEntity;
  assert.equal(p.jobTitle, "Engineer");
  assert.deepEqual(p.worksFor, { "@type": "Organization", name: "Now Co", url: "https://now.co" });
  assert.deepEqual(p.affiliation, [{ "@type": "EducationalOrganization", name: "Uni" }]);
  assert.deepEqual(p.alumniOf, [{ "@type": "EducationalOrganization", name: "College" }]);
  assert.equal(p.image, "https://nawmain.dev/images/profile.jpg");
});

test("without a role still going, the profile claims no job", () => {
  const p = profilePage({ ...base, experience: [role("Intern", "Then Co", "2025 - 2026")], education: [] }).mainEntity;
  assert.ok(!("jobTitle" in p) && !("worksFor" in p) && !("affiliation" in p) && !("alumniOf" in p));
});

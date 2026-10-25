type Role = { title: string; organization: string; dateRange: string; link?: string };

type Profile = {
  url: string;
  name: string;
  nickname: string;
  photo: string;
  description: string;
  knowsAbout: string[];
  socials: string[];
  experience: Role[];
  education: Role[];
};

/** Whether a role or a course is still going: its dates run to *Present*. */
export const ongoing = (r: { dateRange: string }) => /present\s*$/i.test(r.dateRange);

const school = (r: Role) => ({ "@type": "EducationalOrganization", name: r.organization });

/**
 * The page's JSON-LD (PBI-009): a `ProfilePage` — Google's type for a page about one person — whose `mainEntity` is the
 * owner, every value from `data/`. The role still going gives the job and the employer; a course still going is an
 * affiliation, a finished one a school the owner is an alumnus of.
 */
export function profilePage(p: Profile) {
  const job = p.experience.find(ongoing);
  const studying = p.education.filter(ongoing);
  const studied = p.education.filter((r) => !ongoing(r));
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: p.url,
    mainEntity: {
      "@type": "Person",
      name: p.name,
      alternateName: p.nickname,
      url: p.url,
      image: new URL(p.photo, `${p.url}/`).href,
      description: p.description,
      ...(job && {
        jobTitle: job.title,
        worksFor: { "@type": "Organization", name: job.organization, ...(job.link && { url: job.link }) },
      }),
      ...(studying.length > 0 && { affiliation: studying.map(school) }),
      ...(studied.length > 0 && { alumniOf: studied.map(school) }),
      sameAs: p.socials,
      knowsAbout: p.knowsAbout,
    },
  };
}

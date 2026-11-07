// /graduation (PBI-011): the owner's graduation, from their words (*"my graudation will be next month 5 and 6"*,
// 2026-11-07) and Rangsit University's commencement page (https://commencement.rsu.ac.th/, read 2026-11-07). The
// degree itself is data/education.ts's. Every instant is midnight in Bangkok (UTC+7).
export const graduation = {
  university: "Rangsit University",
  classOf: "Class of 2026",
  // the degree's years, its focus and its GPA, as data/education.ts's description has them
  years: "Jun 2023 – Dec 2026",
  focus: "Full-stack development and AI solutions.",
  gpa: "3.63",
  // the degree's first day, as data/education.ts has it: "Jun 2023 - Present"
  started: "2023-06-01T00:00:00+07:00",
  rehearsal: "2026-12-05T00:00:00+07:00",
  ceremony: "2026-12-06T00:00:00+07:00",
  // the page stays after the days, as a keepsake (owner, 2026-11-07)
  after: "2026-12-07T00:00:00+07:00",
  dates: "Rehearsal Sat 5 · Ceremony Sun 6 December",
  // how the days are written, in full and short
  when: "5–6 December",
  whenFull: "5–6 December 2026",
  whenShort: "5–6 Dec",
  ceremonyDay: "Sunday 6 December",
  month: "December 2026",
  firstDay: "Jun 2023",
  lastDay: "6 Dec 2026",
  degreeShort: "Bachelor of ICT",
  venue: "Building 14",
  source: "https://commencement.rsu.ac.th/",
  days: [
    {
      label: "Day 1",
      date: "2026-12-05T00:00:00+07:00",
      month: "Dec",
      day: "5",
      weekday: "Sat",
      title: "Rehearsal & group photo",
      detail: "08:00–13:00 · group photos at Building 14",
    },
    {
      label: "Day 2",
      date: "2026-12-06T00:00:00+07:00",
      month: "Dec",
      day: "6",
      weekday: "Sun",
      title: "Commencement ceremony",
      detail: "Building 14 · the round by faculty, set by RSU",
    },
  ],
  photos: {
    // the owner's photo, from data/about.ts
    me: { caption: "Lwant · Class of 2026" },
    // the owner's, 2026-11-07: "b14 img"
    building: {
      src: "/images/graduation/building-14.png",
      alt: "The Recreation Building, Building 14, at Rangsit University, with its curved white and gold roof",
      width: 518,
      height: 304,
      caption: "Building 14 · the ceremony",
    },
    // "ตะวันรุ่ง", RSU Gallery: https://www2.rsu.ac.th/rsugallery/images/RSU2015-04.jpg (owner, 2026-11-07: "iconic")
    sunrise: {
      src: "/images/graduation/sunrise.jpg",
      alt: "The golden Thai pavilion at Rangsit University, reflected in the pond at sunrise",
      width: 1400,
      height: 933,
      caption: "Rangsit at sunrise",
      credit: "Photo: Pichet Jetjongjai, RSU Gallery",
      href: "https://www2.rsu.ac.th/rsugallery/all",
    },
  },
};

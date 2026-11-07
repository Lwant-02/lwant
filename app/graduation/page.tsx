import type { Metadata } from "next";
import { connection } from "next/server";
import { readNotes } from "@/app/graduation/notes";
import { Board } from "@/components/board/board";
import { Path } from "@/components/board/path";
import { Confetti } from "@/components/graduation/confetti";
import { GraduationCover } from "@/components/graduation/cover";
import { BackLink } from "@/components/graduation/parts";
import { Days, Graduation, Spill, Wishes } from "@/components/graduation/sections";
import { about } from "@/data/about";
import { education } from "@/data/education";
import { graduation } from "@/data/graduation";
import { siteUrl } from "@/lib/site";
import { GRADUATION } from "@/lib/tour";

// rendered in Singapore, beside the Neon database (ap-southeast-1) and near the owner's visitors; from Vercel's default,
// Washington, each visit crossed the Pacific twice
export const preferredRegion = "sin1";

const URL = `${siteUrl()}/graduation`;
const DESCRIPTION = `${about.name} (${about.nickname}) graduates from ${graduation.university} on ${graduation.whenFull}. Count down to the ceremony with me, and leave a note on the board.`;
const SHARE = `${siteUrl()}/lwant-share.png`;

export const metadata: Metadata = {
  title: "Graduation",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Lwant Portfolio",
    title: `${about.name} is graduating | Lwant`,
    description: DESCRIPTION,
    images: [{ url: SHARE, width: 1200, height: 630, alt: "Lwant" }],
  },
  twitter: { card: "summary_large_image", title: `${about.name} is graduating | Lwant`, description: DESCRIPTION, images: [SHARE] },
};

// the degree, as data/education.ts has it
const degree = education.flatMap((y) => y.roles).find((r) => r.organization.startsWith("Rangsit"))!;

/** This visit: when it is, and the wall's notes as they stand. */
async function visit() {
  await connection();
  return { now: Date.now(), notes: await readNotes() };
}

/**
 * /graduation (PBI-011): a second board, the portfolio's camera and tour over the owner's graduation — the countdown,
 * the days, and the Wishes wall. Rendered for each visit, so the countdown starts right and every note is in the HTML.
 */
export default async function GraduationPage() {
  const { now, notes } = await visit();
  return (
    <Board
      stops={GRADUATION}
      name={`${about.name}'s graduation`}
      cover={<GraduationCover now={now} name={about.name} photo={about.photo} degree={degree.title} />}
      corner={<BackLink />}
      overlay={<Confetti />}
      world="grid w-max grid-cols-[360px] items-start gap-y-50 p-30 lg:grid-cols-[1000px_900px] lg:gap-x-60 lg:gap-y-55"
    >
      <Graduation now={now} degree={degree} />
      <Days now={now} />
      <Wishes notes={notes} now={now} />
      <Spill notes={notes} now={now} />
      <Path ids={GRADUATION.map((s) => s.id)} />
    </Board>
  );
}

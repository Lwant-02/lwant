import type { Metadata, Viewport } from "next";
import { Nunito, Titan_One } from "next/font/google";

import { about, socials } from "@/data/about";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { profilePage } from "@/lib/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// The logo's face for what's drawn on the board (PBI-004), Nunito for reading.
const display = Titan_One({
  variable: "--font-display-face",
  weight: "400",
  subsets: ["latin"],
});

const body = Nunito({
  variable: "--font-body-face",
  subsets: ["latin"],
});

const BASE_URL = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sai Naw Main (Lwant) | Full-Stack Developer Portfolio",
    template: "%s | Lwant",
  },
  description:
    "Full-stack developer passionate about creating beautiful, functional web applications. Experienced in Next.js, React, TypeScript, and AI integration. Explore my projects, achievements, and journey.",
  keywords: [
    "Sai Naw Main",
    "Lwant",
    "full-stack developer",
    "frontend developer",
    "web developer portfolio",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "UI/UX",
    "software engineer",
    "Pico Innovation",
    "MijnUI",
    "LikDai",
    "Pica Chat",
  ],
  authors: [{ name: "Sai Naw Main", url: BASE_URL }],
  creator: "Sai Naw Main (Lwant)",
  publisher: "Sai Naw Main (Lwant)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lwant Portfolio",
    title: "Sai Naw Main (Lwant) | Full-Stack Developer Portfolio",
    description:
      "Full-Stack developer passionate about creating beautiful, functional web applications. Explore my projects, achievements, and development journey.",
    // the Lwant wordmark on paper (PBI-003); the tab's icons are app/icon.svg, favicon.ico and apple-icon.png
    images: [
      {
        url: `${BASE_URL}/lwant-share.png`,
        width: 1200,
        height: 630,
        alt: "Lwant",
      },
      {
        url: `${BASE_URL}/lwant-share-square.png`,
        width: 512,
        height: 512,
        alt: "Lwant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Naw Main (Lwant) | Full-Stack Developer Portfolio",
    description:
      "Full-Stack developer passionate about creating beautiful, functional web applications. Explore my projects, achievements, and development journey.",
    images: [`${BASE_URL}/lwant-share.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// dark only (PBI-004): the browser's own chrome in the board's night
export const viewport: Viewport = {
  themeColor: "#17171a",
  colorScheme: "dark",
};

// the page's JSON-LD, a ProfilePage of the owner built from data/ (PBI-009)
const jsonLd = profilePage({
  url: BASE_URL,
  name: about.name,
  nickname: about.nickname,
  photo: about.photo,
  description:
    "Full-stack developer passionate about creating beautiful, functional web applications. Experienced in Next.js, React, TypeScript, and AI integration.",
  knowsAbout: about.knowsAbout,
  socials: socials.map((s) => s.href),
  experience: experiences.flatMap((y) => y.roles),
  education: education.flatMap((y) => y.roles),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

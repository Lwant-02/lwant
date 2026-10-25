import { Nunito, Titan_One } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Link from "next/link";

import "./globals.css";

const display = Titan_One({
  variable: "--font-display-face",
  weight: "400",
  subsets: ["latin"],
});

const body = Nunito({
  variable: "--font-body-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Not found | Sai Naw Main (Lwant)",
  description: "This address isn't on the board.",
};

export const viewport: Viewport = {
  themeColor: "#17171a",
  colorScheme: "dark",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} grid place-items-center bg-[radial-gradient(circle,var(--color-night-dot)_1.2px,transparent_1.5px)] bg-size-[26px_26px] px-5`}
      >
        <main className="flex flex-col items-center gap-5 text-center">
          <p className="ltd text-[120px] leading-none">404</p>
          <h1 className="mt-2 font-display text-[32px] leading-tight">This page isn&apos;t on the board</h1>
          <p className="max-w-[40ch] text-[17px] font-semibold text-chalk-2">Everything lives on one page now.</p>
          <Link
            href="/"
            className="keycap mt-3 inline-flex h-14 items-center rounded-2xl bg-sun px-7 font-display text-[20px] text-ink transition-transform hover:-translate-y-0.5"
          >
            Go to the board
          </Link>
        </main>
      </body>
    </html>
  );
}

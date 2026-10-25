import type { NextConfig } from "next";

// The site is one page since PBI-002; the old addresses a CV or a post may still link go to it.
const OLD_PAGES = ["/about", "/projects", "/projects/:slug", "/achievements", "/achievements/:slug", "/ask-me"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return OLD_PAGES.map((source) => ({ source, destination: "/", permanent: true }));
  },
};

export default nextConfig;

/**
 * Where the site lives (PBI-009): `BASE_URL` where it's hosted, nawmain.dev without it, never with a trailing slash —
 * one answer for the metadata, robots and the sitemap.
 */
export const siteUrl = (base = process.env.BASE_URL) => (base?.trim() || "https://nawmain.dev").replace(/\/+$/, "");

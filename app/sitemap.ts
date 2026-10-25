import type { MetadataRoute } from "next";

// One page since PBI-002: the board.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

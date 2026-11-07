import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// The board (PBI-002), and the graduation's (PBI-011).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/graduation`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// One page since PBI-002: the board.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

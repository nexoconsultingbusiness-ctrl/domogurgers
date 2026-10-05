import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  return [{ url: site.url.origin, changeFrequency: "monthly", priority: 1 }];
}

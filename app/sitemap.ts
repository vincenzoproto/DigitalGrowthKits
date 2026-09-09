import type { MetadataRoute } from "next";
import { canonicalUrl, INDEXABLE_PATHS, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path) => ({
    url: canonicalUrl(path),
    alternates: { languages: languageAlternates(path) },
  }));
}

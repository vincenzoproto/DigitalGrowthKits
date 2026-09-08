import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://guestflowsystems.com";
  const routes = [
    "",
    "/guest-inbox-pro",
    "/guest-inbox-pro/demo",
    "/digital-guest-concierge",
    "/repeat-guest-engine",
    "/repeat-guest-engine/demo",
    "/direct-booking-engine",
    "/request-setup",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("demo") ? 0.6 : 0.8,
  }));
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://guestflowsystems.com";
  const routes = [
    "", "/audit", "/guest-inbox-pro", "/guest-inbox-pro/demo", "/digital-guest-concierge", "/digital-guest-concierge/demo", "/repeat-guest-engine", "/repeat-guest-engine/demo", "/repeat-guest-engine/founder", "/direct-booking-engine", "/direct-booking-engine/demo", "/request-setup", "/partners", "/privacy", "/terms",
    "/it", "/it/audit", "/it/guest-inbox-pro", "/it/digital-guest-concierge", "/it/repeat-guest-engine", "/it/direct-booking-engine", "/it/request-setup", "/it/privacy", "/it/terms",
  ];
  return routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" || route === "/it" || route.includes("audit") ? "weekly" : "monthly", priority: route === "" || route === "/it" ? 1 : route.includes("audit") ? 0.9 : route.includes("demo") ? 0.6 : 0.8 }));
}

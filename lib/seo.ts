import type { Metadata } from "next";

// Canonicals always identify the public site, including during preview builds.
export const SITE_URL = "https://www.guestflowsystems.com";

export const TRANSLATED_ROUTES = [
  { en: "/", it: "/it" },
  { en: "/audit", it: "/it/audit" },
  { en: "/guest-inbox-pro", it: "/it/guest-inbox-pro" },
  { en: "/digital-guest-concierge", it: "/it/digital-guest-concierge" },
  { en: "/repeat-guest-engine", it: "/it/repeat-guest-engine" },
  { en: "/direct-booking-engine", it: "/it/direct-booking-engine" },
  { en: "/request-setup", it: "/it/request-setup" },
  { en: "/partners", it: "/it/partner" },
  { en: "/privacy", it: "/it/privacy" },
  { en: "/terms", it: "/it/terms" },
] as const;

export const ENGLISH_DEMO_PATHS = [
  "/guest-inbox-pro/demo",
  "/digital-guest-concierge/demo",
  "/repeat-guest-engine/demo",
  "/direct-booking-engine/demo",
] as const;

export const INDEXABLE_PATHS: readonly string[] = [
  ...TRANSLATED_ROUTES.flatMap(({ en, it }) => [en, it]),
  ...ENGLISH_DEMO_PATHS,
];

function cleanPath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname.replace(/\/+$/, "") || "/";
}

export function canonicalUrl(path: string): string {
  return new URL(cleanPath(path), SITE_URL).href;
}

export function languageAlternates(path: string): Record<string, string> | undefined {
  const pathname = cleanPath(path);
  const translated = TRANSLATED_ROUTES.find(({ en, it }) => en === pathname || it === pathname);
  if (translated) {
    return {
      en: canonicalUrl(translated.en),
      it: canonicalUrl(translated.it),
      "x-default": canonicalUrl(translated.en),
    };
  }
  // A related product page is useful navigation, but is not a translated demo.
  if (ENGLISH_DEMO_PATHS.some((demo) => demo === pathname)) {
    return { en: canonicalUrl(pathname), "x-default": canonicalUrl(pathname) };
  }
  return undefined;
}

export function languageLinks(path: string): { en: string; it: string } {
  const pathname = cleanPath(path);
  const translated = TRANSLATED_ROUTES.find(({ en, it }) => en === pathname || it === pathname);
  if (translated) return translated;

  if (ENGLISH_DEMO_PATHS.some((demo) => demo === pathname)) {
    return { en: pathname, it: `/it${pathname.replace(/\/demo$/, "")}` };
  }
  if (pathname === "/repeat-guest-engine/founder") {
    return { en: pathname, it: "/it/repeat-guest-engine" };
  }
  if (pathname === "/success") {
    return { en: "/request-setup", it: "/it/request-setup" };
  }
  // Unknown routes must never manufacture a destination that does not exist.
  return { en: "/", it: "/it" };
}

export function createPageMetadata({
  path,
  title,
  description,
  noIndex = false,
}: {
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const pathname = cleanPath(path);
  const italian = pathname === "/it" || pathname.startsWith("/it/");
  const languages = noIndex ? undefined : languageAlternates(pathname);
  const image = canonicalUrl(italian ? "/it/opengraph-image" : "/opengraph-image");
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(pathname), languages },
    openGraph: {
      title,
      description,
      url: canonicalUrl(pathname),
      siteName: "GuestFlow Systems",
      type: "website",
      locale: italian ? "it_IT" : "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: "GuestFlow Systems" }],
      ...(languages?.it ? { alternateLocale: [italian ? "en_GB" : "it_IT"] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: !noIndex, follow: true },
  };
}

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export function siteMetadata(locale: "it" | "en"): Metadata {
  const it = locale === "it";
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "GuestFlow Systems",
    title: { default: it ? "Automazioni per hotel e B&B | GuestFlow Systems" : "Hotel & B&B automation setup | GuestFlow Systems", template: "%s" },
    description: it ? "Messaggistica ospiti, riattivazione clienti, concierge digitale e prenotazioni dirette: configurazione e implementazione per hotel e B&B." : "Guest messaging, repeat-guest campaigns, digital concierge and direct booking: configured and implemented for independent hotels and B&Bs.",
    robots: { index: true, follow: true },
    category: "hospitality technology",
    icons: { icon: "/icon.svg" },
  };
}

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL, canonicalUrl } from "@/lib/seo";

const systems = [
  ["repeat-guest-engine", "Repeat Guest Engine"],
  ["guest-inbox-pro", "Guest Inbox Pro"],
  ["digital-guest-concierge", "Digital Guest Concierge"],
  ["direct-booking-engine", "Direct Booking Engine"],
];

export default function SiteShell({ locale, children }: { locale: "it" | "en"; children: React.ReactNode }) {
  const it = locale === "it";
  const prefix = it ? "/it" : "";
  const organization = {
    "@context": "https://schema.org", "@type": "Organization",
    "@id": `${SITE_URL}/#organization`, name: "GuestFlow Systems", url: SITE_URL,
    logo: { "@type": "ImageObject", url: canonicalUrl("/logo.svg"), width: 256, height: 256 },
    email: "info@vincenzoproto.com",
    description: it ? "Configurazione e implementazione di automazioni per hotel indipendenti e B&B." : "Automation setup and implementation for independent hotels and B&Bs.",
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "info@vincenzoproto.com", availableLanguage: ["Italian", "English"] },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "GuestFlow Systems", itemListElement: systems.map(([slug, name]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, url: canonicalUrl(`${prefix}/${slug}`) } })) },
  };
  const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "GuestFlow Systems", alternateName: "GuestFlow", url: SITE_URL, inLanguage: ["it", "en"], publisher: { "@id": `${SITE_URL}/#organization` } };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, website]).replace(/</g, "\\u003c") }} />
    <SiteHeader />
    {children}
    <div className="mobile-conversion-bar"><div><b>{it ? "Da dove iniziare?" : "Where should you start?"}</b><span>{it ? "Scoprilo con l’audit di 2 minuti." : "Start with a 2-minute audit."}</span></div><Link href={`${prefix}/audit`}>{it ? "Audit gratuito →" : "Free audit →"}</Link></div>
    <footer>
      <div className="footer-brand"><Link href={prefix || "/"} className="brand brand-dark"><span className="brand-mark">GF</span><span className="brand-copy"><strong>GuestFlow</strong><small>Systems</small></span></Link><p>{it ? "Automazioni configurate per hotel indipendenti, B&B e guest house." : "Configured automations for independent hotels, B&Bs and guest houses."}</p></div>
      <div className="footer-links">{systems.map(([slug, name]) => <Link key={slug} href={`${prefix}/${slug}`}>{name}</Link>)}<Link href={it ? "/it/partner" : "/partners"}>{it ? "Diventa partner" : "Become a partner"}</Link><Link href={`${prefix}/request-setup`}>{it ? "Richiedi setup" : "Request setup"}</Link><Link href={`${prefix}/privacy`}>Privacy</Link><Link href={`${prefix}/terms`}>{it ? "Termini" : "Terms"}</Link><a href="mailto:info@vincenzoproto.com">{it ? "Contatti" : "Contact"}</a></div>
      <div className="footer-meta"><span>© 2026 GuestFlow Systems</span><span>{it ? "I progetti open source utilizzati sono riconosciuti secondo le rispettive licenze." : "Open-source foundations are credited according to their applicable licenses."}</span></div>
    </footer>
  </>;
}

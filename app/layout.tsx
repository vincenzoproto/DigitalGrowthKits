import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";
import "./conversion.css";
import "./language.css";
import "./payments.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://guestflowsystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "GuestFlow Systems",
  title: { default: "GuestFlow Systems | Hospitality growth systems, configured for you", template: "%s" },
  description: "Done-for-you guest messaging, repeat-guest, digital concierge and direct-booking systems for independent hotels, B&Bs and guest houses.",
  alternates: { canonical: "/" },
  openGraph: { title: "GuestFlow Systems", description: "Done-for-you hospitality systems configured around real operating problems.", url: siteUrl, siteName: "GuestFlow Systems", type: "website" },
  twitter: { card: "summary_large_image", title: "GuestFlow Systems", description: "Configured hospitality systems for guest messaging, retention, digital concierge and direct booking." },
  robots: { index: true, follow: true }, category: "hospitality technology",
};

const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: "GuestFlow Systems", url: siteUrl, description: "Done-for-you hospitality systems for independent accommodation businesses.", hasOfferCatalog: { "@type": "OfferCatalog", name: "Hospitality systems", itemListElement: ["Guest Inbox Pro","Digital Guest Concierge","Repeat Guest Engine","Direct Booking Engine"].map(name=>({"@type":"Offer",itemOffered:{"@type":"Service",name}})) } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SiteHeader/>
    {children}
    <div className="mobile-conversion-bar"><div><b>Need help choosing?</b><span>Start with a 2-minute setup review.</span></div><Link href="/request-setup">Request review →</Link></div>
    <footer><div className="footer-brand"><Link href="/" className="brand brand-dark"><span className="brand-mark">GF</span><span className="brand-copy"><strong>GuestFlow</strong><small>Systems</small></span></Link><p>Configured hospitality systems for independent hotels, B&Bs and guest houses.</p></div><div className="footer-links"><Link href="/repeat-guest-engine">Repeat Guest Engine</Link><Link href="/guest-inbox-pro">Guest Inbox Pro</Link><Link href="/digital-guest-concierge">Digital Guest Concierge</Link><Link href="/direct-booking-engine">Direct Booking Engine</Link><Link href="/request-setup">Request setup</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:info@vincenzoproto.com">Contact</a></div><div className="footer-meta"><span>© 2026 GuestFlow Systems</span><span>Open-source foundations are credited according to their applicable licenses.</span></div></footer>
  </body></html>;
}

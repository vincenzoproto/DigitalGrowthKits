import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./premium.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://guestflow-systems-vincenzo22.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GuestFlow Systems | Hospitality growth systems, configured for you",
  description: "Done-for-you guest messaging, retention, digital concierge and direct-booking systems for independent hotels and B&Bs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "GuestFlow Systems",
    description: "Configured hospitality growth systems for independent hotels and B&Bs.",
    url: siteUrl,
    siteName: "GuestFlow Systems",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="GuestFlow Systems home">
            <span className="brand-mark">GF</span>
            <span className="brand-copy"><strong>GuestFlow</strong><small>Systems</small></span>
          </Link>
          <nav>
            <a href="/#systems">Systems</a>
            <a href="/#process">Process</a>
            <a href="/#faq">FAQ</a>
            <Link className="nav-cta" href="/request-setup">Request setup</Link>
          </nav>
        </header>
        {children}
        <footer>
          <div className="footer-brand">
            <Link href="/" className="brand brand-dark"><span className="brand-mark">GF</span><span className="brand-copy"><strong>GuestFlow</strong><small>Systems</small></span></Link>
            <p>Configured hospitality systems for independent hotels, B&Bs and guest houses.</p>
          </div>
          <div className="footer-links">
            <Link href="/repeat-guest-engine">Repeat Guest Engine</Link>
            <Link href="/guest-inbox-pro">Guest Inbox Pro</Link>
            <Link href="/request-setup">Request setup</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:info@vincenzoproto.com">info@vincenzoproto.com</a>
          </div>
          <div className="footer-meta"><span>© 2026 GuestFlow Systems</span><span>Open-source foundations are credited according to their applicable licenses.</span></div>
        </footer>
      </body>
    </html>
  );
}

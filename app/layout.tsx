import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalGrowthKits | Hospitality systems installed for you",
  description: "Configured guest messaging, concierge, retention and direct-booking systems for hotels and B&Bs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand"><span className="brand-mark">DGK</span><span>DigitalGrowthKits</span></Link>
          <nav><a href="/#products">Systems</a><a href="mailto:info@vincenzoproto.com">Contact</a></nav>
        </header>
        {children}
        <footer>
          <div><strong>DigitalGrowthKits</strong><p>Configured hospitality systems built on proven software foundations.</p></div>
          <div className="footer-meta"><span>© 2026 DigitalGrowthKits</span><span>Open-source foundations are credited per their applicable licenses.</span></div>
        </footer>
      </body>
    </html>
  );
}

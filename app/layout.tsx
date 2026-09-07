import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalGrowthKits | Ready-to-use hospitality growth tools",
  description: "Practical digital kits for hotels, B&Bs, hosts and hospitality operators.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand"><span className="brand-mark">DGK</span><span>DigitalGrowthKits</span></Link>
          <nav><a href="/#products">Kits</a><a href="mailto:info@vincenzoproto.com">Support</a></nav>
        </header>
        {children}
        <footer>
          <div><strong>DigitalGrowthKits</strong><p>Practical digital tools for hospitality growth.</p></div>
          <div className="footer-meta"><span>© 2026 DigitalGrowthKits</span><a href="https://github.com/tishonator/TishCommerce" target="_blank" rel="noreferrer">Powered in part by the TishCommerce approach</a></div>
        </footer>
      </body>
    </html>
  );
}

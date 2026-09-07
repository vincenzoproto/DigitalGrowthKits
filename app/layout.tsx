import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GuestFlow Systems | Hospitality software installed for you",
  description: "Configured guest messaging, digital concierge, repeat-guest automation and direct-booking systems for hotels and B&Bs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand"><span className="brand-mark">GF</span><span>GuestFlow Systems</span></Link>
          <nav><a href="/#products">Systems</a><a href="mailto:info@vincenzoproto.com">Contact</a></nav>
        </header>
        {children}
        <footer>
          <div><strong>GuestFlow Systems</strong><p>Configured hospitality systems built on proven software foundations.</p></div>
          <div className="footer-meta"><span>© 2026 GuestFlow Systems</span><span>Open-source foundations are credited per their applicable licenses.</span></div>
        </footer>
      </body>
    </html>
  );
}

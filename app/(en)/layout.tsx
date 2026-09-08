import SiteShell from "@/components/SiteShell";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";
import "../conversion.css";
import "../language.css";
import "../payments.css";
import "../guided-demo.css";

export const metadata = siteMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SiteShell locale="en">{children}</SiteShell></body></html>;
}

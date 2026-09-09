import SiteShell from "@/components/SiteShell";
import { siteMetadata } from "@/lib/site-metadata";
import "../globals.css";
import "../conversion.css";
import "../language.css";
import "../payments.css";
import "../guided-demo.css";

export const metadata = siteMetadata("it");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="it"><body><SiteShell locale="it">{children}</SiteShell></body></html>;
}

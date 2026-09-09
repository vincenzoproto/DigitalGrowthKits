"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageLinks } from "@/lib/seo";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const isItalian = pathname === "/it" || pathname.startsWith("/it/");
  const { en: englishPath, it: italianPath } = languageLinks(pathname);
  const remember = (lang: "it" | "en") => { document.cookie = `guestflow-lang=${lang};path=/;max-age=31536000;samesite=lax`; };

  return <div className="language-switch" aria-label="Language selector">
    <Link href={italianPath} hrefLang="it" lang="it" onClick={() => remember("it")} className={isItalian ? "active" : ""} aria-current={pathname === italianPath ? "page" : undefined}>IT</Link><span>/</span><Link href={englishPath} hrefLang="en" lang="en" onClick={() => remember("en")} className={!isItalian ? "active" : ""} aria-current={pathname === englishPath ? "page" : undefined}>EN</Link>
  </div>;
}

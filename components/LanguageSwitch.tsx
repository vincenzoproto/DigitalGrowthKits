"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const isItalian = pathname === "/it" || pathname.startsWith("/it/");
  const englishPath = isItalian ? (pathname.replace(/^\/it/, "") || "/") : pathname;
  const italianPath = isItalian ? pathname : pathname === "/" ? "/it" : `/it${pathname}`;
  const remember = (lang: "it" | "en") => { document.cookie = `guestflow-lang=${lang};path=/;max-age=31536000;samesite=lax`; };

  return <div className="language-switch" aria-label="Language selector">
    <Link href={italianPath} onClick={() => remember("it")} className={isItalian ? "active" : ""}>IT</Link><span>/</span><Link href={englishPath} onClick={() => remember("en")} className={!isItalian ? "active" : ""}>EN</Link>
  </div>;
}

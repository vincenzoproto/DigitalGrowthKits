"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "./LanguageSwitch";

export default function SiteHeader(){
  const pathname=usePathname();
  const it=pathname==="/it"||pathname.startsWith("/it/");
  const home=it?"/it":"/";
  return <header className="site-header">
    <Link href={home} className="brand" aria-label="GuestFlow Systems home"><span className="brand-mark">GF</span><span className="brand-copy"><strong>GuestFlow</strong><small>Systems</small></span></Link>
    <nav><a href={`${home}#systems`}>{it?"Sistemi":"Systems"}</a><Link href={it?"/it/audit":"/audit"}>{it?"Audit gratuito":"Free audit"}</Link><a href={`${home}#process`}>{it?"Processo":"Process"}</a><a href={`${home}#faq`}>FAQ</a><LanguageSwitch/><Link className="nav-cta" href={it?"/it/request-setup":"/request-setup"}>{it?"Richiedi setup":"Request setup"}</Link></nav>
  </header>;
}

import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import AuditCalculator from "@/components/AuditCalculator";

export const metadata = createPageMetadata({"path": "/audit", "title": "Free hotel guest-retention audit | GuestFlow Systems", "description": "Assess whether your hotel or B&B is ready to reactivate past guests. A free two-minute review of guest history, direct-booking readiness and current campaigns."});

export default function AuditPage(){
  return <main className="audit-page">
    <section className="audit-hero">
      <div><span className="eyebrow">Repeat Revenue Audit</span><h1>Is your guest database doing any commercial work?</h1><p>Use a few non-sensitive operating inputs to estimate whether Repeat Guest Engine is a strong fit for your property. No passwords. No guest-level data. No revenue promises.</p><div className="hero-actions"><a className="text-link" href="#audit">Start the 2-minute audit ↓</a><Link className="secondary-link" href="/repeat-guest-engine/demo">See the demo</Link></div></div>
      <aside className="audit-proof"><b>What this checks</b><span>Historical guest volume</span><span>Current reactivation activity</span><span>Direct-booking readiness</span><span>Low-season need</span><small>It does not calculate guaranteed revenue.</small></aside>
    </section>
    <section id="audit" className="audit-section">
      <Suspense fallback={<p role="status">Loading audit calculator…</p>}>
        <AuditCalculator/>
      </Suspense>
    </section>
    <section className="audit-explain"><div><span className="eyebrow">Why this matters</span><h2>Most properties already paid to acquire these guests once.</h2></div><div className="audit-explain-grid"><article><b>01</b><h3>Find the dormant asset</h3><p>Guest history can be commercially useful only when the property can identify eligible contacts and organize them into meaningful audiences.</p></article><article><b>02</b><h3>Choose one controlled test</h3><p>Start with post-stay, win-back or low-season reactivation instead of broadcasting the same offer to everyone.</p></article><article><b>03</b><h3>Measure before scaling</h3><p>Track delivery, clicks and attributable direct-booking actions where technically possible. Do not claim causality when attribution is uncertain.</p></article></div></section>
  </main>;
}

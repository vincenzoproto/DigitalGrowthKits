import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({"path": "/partners", "title": "Hospitality referral partners | GuestFlow Systems", "description": "Introduce qualified hotels and B&Bs to GuestFlow. Explore the referral pilot, implementation services and partner conditions."});

export default function PartnersPage() {
  return <main>
    <section className="hero hero-premium">
      <div className="hero-copy">
        <span className="eyebrow">For revenue consultants & hospitality agencies</span>
        <h1>Add implementation capacity without building the system yourself.</h1>
        <p className="hero-lead">GuestFlow works behind or alongside hospitality consultants that identify an operational problem but do not want to build the guest messaging, retention, concierge or direct-booking infrastructure themselves.</p>
        <div className="hero-actions"><a className="primary primary-large" href="mailto:info@vincenzoproto.com?subject=GuestFlow%20Partner%20Network">Discuss a partner fit</a><Link className="secondary-link" href="/repeat-guest-engine/demo">See Repeat Guest Engine</Link></div>
      </div>
      <aside className="hero-dashboard-card"><div className="dashboard-card-head"><span>Partner flow</span><b>Simple handoff</b></div><div className="dashboard-metric"><small>1</small><strong>Identify</strong><span>A hotel has a clear operating bottleneck.</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>2</small><strong>Introduce</strong><span>GuestFlow runs the technical fit review.</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>3</small><strong>Deliver</strong><span>We scope, configure and hand over the implementation.</span></div></aside>
    </section>

    <section className="value-section"><div className="section-heading compact-heading"><span className="eyebrow">Best partner fit</span><h2>You already advise hotels. We add implementation.</h2></div><div className="value-grid"><article><span className="value-number">01</span><h3>Revenue consultants</h3><p>When a hotel has guest history but no repeat-booking workflow, you can introduce Repeat Guest Engine without building the infrastructure yourself.</p></article><article><span className="value-number">02</span><h3>Hospitality agencies</h3><p>Add a delivery layer for messaging, concierge and direct-booking projects where software implementation falls outside your core offer.</p></article><article><span className="value-number">03</span><h3>Independent specialists</h3><p>Keep ownership of the client relationship while GuestFlow handles the agreed technical implementation and handover.</p></article></div></section>

    <section className="how-it-works"><div className="section-heading"><span className="eyebrow">How it works</span><h2>Qualified introduction. Clear scope. No fixed commitment.</h2></div><div className="steps"><div><b>01</b><h3>Share the context</h3><p>Property, current stack and the operating problem. No guest database or passwords are required for the first review.</p></div><div><b>02</b><h3>We assess fit</h3><p>We run the demo, define the implementation and confirm whether the project is technically suitable.</p></div><div><b>03</b><h3>Agree commercial terms</h3><p>Any referral or delivery fee is agreed before the introduction becomes a paid project. There is no fixed retainer for simply joining the network.</p></div></div></section>

    <section className="final-cta"><span className="eyebrow light-eyebrow">GuestFlow Partner Network</span><h2>Bring the hotel problem. We’ll assess the implementation.</h2><p>Start with one qualified opportunity. No volume commitment required.</p><a className="primary light-primary primary-large" href="mailto:info@vincenzoproto.com?subject=GuestFlow%20Partner%20Network">Open a partner conversation</a></section>
  </main>;
}

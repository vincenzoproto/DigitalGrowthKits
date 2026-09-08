import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({"path": "/digital-guest-concierge/demo", "title": "Digital guest concierge demo | GuestFlow Systems", "description": "Preview sample stay information, property services and useful links in a mobile-first guest portal for hotels and B&Bs."});

export default function DigitalGuestConciergeDemoPage() {
  return (
    <main className="demo-shell">
      <Link href="/digital-guest-concierge" className="back-link">← Digital Guest Concierge</Link>
      <section className="demo-top">
        <div><span className="eyebrow">Product preview</span><h1>A guest portal that feels like part of the stay.</h1></div>
        <p>This is a visual product demo using sample content. A live implementation is branded and configured around the property’s real information and services.</p>
      </section>

      <section className="demo-frame" aria-label="Digital Guest Concierge preview">
        <div className="demo-window">
          <div className="demo-window-bar"><div className="demo-window-dots"><i/><i/><i/></div><small>GuestFlow · mobile guest journey</small></div>
          <div className="demo-content demo-guest-layout">
            <div>
              <div className="demo-qr" aria-label="QR access preview" />
              <div className="demo-card"><small>Arrival touchpoint</small><strong>Scan once</strong><p>Place the access point in confirmation messages, reception cards or in-room material.</p></div>
            </div>
            <div className="demo-phone">
              <div className="demo-phone-screen">
                <div className="demo-phone-hero"><small>Welcome to</small><h2>Harbour House</h2><p>Your stay information, services and local essentials in one place.</p></div>
                <div className="demo-phone-body">
                  <div className="demo-service"><b>Wi-Fi & stay essentials</b><span>Check-in, breakfast, checkout and house information</span></div>
                  <div className="demo-service"><b>Book late checkout</b><span>Make a paid or request-based service easy to discover</span></div>
                  <div className="demo-service"><b>Airport transfer</b><span>Open the property’s preferred transfer flow</span></div>
                  <div className="demo-service"><b>Local recommendations</b><span>Curated restaurants, beaches and practical links</span></div>
                  <div className="demo-service"><b>Need help?</b><span>Open the correct contact channel without searching</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p className="demo-disclaimer">Sample property and content shown for demonstration only. Final functionality depends on the agreed implementation scope and the services supplied by the property.</p>
      <div className="hero-actions" style={{justifyContent:"center"}}><Link className="primary primary-large" href="/request-setup?product=digital-guest-concierge">Request this setup</Link></div>
    </main>
  );
}

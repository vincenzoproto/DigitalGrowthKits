import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({"path": "/direct-booking-engine/demo", "title": "Direct hotel booking journey demo | GuestFlow", "description": "Preview a sample hotel website reservation journey with room information, rates and a clear booking path."});

export default function DirectBookingEngineDemoPage() {
  return (
    <main className="demo-shell">
      <Link href="/direct-booking-engine" className="back-link">← Direct Booking Engine</Link>
      <section className="demo-top">
        <div><span className="eyebrow">Product preview</span><h1>A direct booking path with less friction.</h1></div>
        <p>This sample shows the guest-facing logic: clear room choice, transparent stay summary and a direct reservation action. Final infrastructure depends on the property stack.</p>
      </section>

      <section className="demo-frame" aria-label="Direct Booking Engine preview">
        <div className="demo-window">
          <div className="demo-window-bar"><div className="demo-window-dots"><i/><i/><i/></div><small>Harbour House · Book direct</small></div>
          <div className="demo-content">
            <div className="demo-nav"><span className="demo-pill active">1 · Dates</span><span className="demo-pill active">2 · Room</span><span className="demo-pill">3 · Details</span><span className="demo-pill">4 · Confirm</span></div>
            <div className="demo-booking-grid">
              <div>
                <div className="demo-room"><div className="demo-room-photo"/><div><h3>Classic Double</h3><p>2 guests · breakfast option · flexible cancellation</p></div><div className="demo-room-price"><small>from</small><strong>€148</strong><span>/night</span></div></div>
                <div className="demo-room"><div className="demo-room-photo"/><div><h3>Sea View Deluxe</h3><p>2 guests · sea view · breakfast included</p></div><div className="demo-room-price"><small>from</small><strong>€189</strong><span>/night</span></div></div>
                <div className="demo-room"><div className="demo-room-photo"/><div><h3>Family Suite</h3><p>Up to 4 guests · separate living area</p></div><div className="demo-room-price"><small>from</small><strong>€236</strong><span>/night</span></div></div>
              </div>
              <aside className="demo-summary"><small className="eyebrow">Stay summary</small><h3>18–20 November · 2 nights</h3><div className="demo-summary-row"><span>Room</span><b>Sea View Deluxe</b></div><div className="demo-summary-row"><span>Rate</span><b>Flexible</b></div><div className="demo-summary-row"><span>Guests</span><b>2 adults</b></div><div className="demo-summary-row"><span>Total</span><b>€378</b></div><Link className="primary" href="/request-setup?product=direct-booking-engine" style={{width:"100%",marginTop:16}}>Build my direct path</Link></aside>
            </div>
          </div>
        </div>
      </section>
      <p className="demo-disclaimer">Illustrative prices and room data only. Payment processing, inventory sync, channel manager and third-party fees depend on the selected implementation.</p>
    </main>
  );
}

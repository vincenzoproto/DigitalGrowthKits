import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Done-for-you hospitality systems</span>
          <h1>Less software to manage. More guest flow.</h1>
          <p>GuestFlow Systems configures practical operating systems for independent hotels and B&Bs: guest messaging, digital concierge, repeat-guest campaigns and direct-booking infrastructure.</p>
          <div className="hero-actions">
            <Link className="primary" href="/request-setup">Request a setup review</Link>
            <a className="text-link" href="#products">Explore the systems →</a>
          </div>
          <p className="hero-note">Setup · configuration · handover · optional managed support</p>
        </div>
        <div className="hero-panel">
          <span>Built for</span>
          <strong>Independent hotels</strong><strong>B&Bs</strong><strong>Guest houses</strong><strong>Small hospitality teams</strong>
        </div>
      </section>

      <section className="trust-row"><span>Clear launch scope</span><span>Configured for your property</span><span>Self-hostable foundations</span><span>Human handover</span></section>

      <section className="featured-offer">
        <div>
          <span className="eyebrow">Featured system</span>
          <h2>Turn your existing guest database into a repeat-booking channel.</h2>
          <p>Repeat Guest Engine maps an eligible guest export, builds useful segments and launches three retention automations without treating the full database like one generic mailing list.</p>
          <div className="feature-points">
            <span>CSV / PMS export mapping</span><span>Marketing-eligible segmentation</span><span>Post-stay automation</span><span>Win-back automation</span><span>Low-season automation</span><span>Reporting & handover</span>
          </div>
          <div className="hero-actions">
            <Link className="primary" href="/repeat-guest-engine">See Repeat Guest Engine</Link>
            <Link className="text-link" href="/request-setup?product=repeat-guest-engine">Request setup →</Link>
          </div>
        </div>
        <aside className="offer-card">
          <span>Launch package</span>
          <strong>€990</strong>
          <p>One-property implementation including database mapping, segments, three core automations, reporting and staff handover.</p>
          <hr />
          <span>Optional managed service</span>
          <strong className="small-price">€129/mo</strong>
          <p>Campaign tuning, monitoring, segmentation updates and operational support.</p>
        </aside>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading"><span className="eyebrow">Systems</span><h2>Buy an operating outcome, not another template.</h2><p>Each offer starts from a proven software foundation and is configured around a specific hospitality workflow.</p></div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-heading"><span className="eyebrow">Simple delivery</span><h2>Review. Configure. Launch.</h2><p>You do not need to choose infrastructure or stitch together tools before contacting us.</p></div>
        <div className="steps">
          <div><b>01</b><h3>Review</h3><p>Send the property basics, current stack and the operating problem you want to solve.</p></div>
          <div><b>02</b><h3>Configure</h3><p>We define the launch scope, map your data and channels, then configure the system around the property.</p></div>
          <div><b>03</b><h3>Handover</h3><p>You receive a working setup, documented ownership and an optional managed-support path.</p></div>
        </div>
      </section>

      <section className="decision-section">
        <div>
          <span className="eyebrow">Not sure which system?</span>
          <h2>Start with the operating problem.</h2>
        </div>
        <div className="decision-grid">
          <div><strong>Messages are scattered</strong><p>Start with Guest Inbox Pro.</p></div>
          <div><strong>Guests keep asking the same questions</strong><p>Start with Digital Guest Concierge.</p></div>
          <div><strong>You have past guests but no retention system</strong><p>Start with Repeat Guest Engine.</p></div>
          <div><strong>You rely too heavily on OTA bookings</strong><p>Start with Direct Booking Engine.</p></div>
        </div>
        <Link className="primary" href="/request-setup">Tell us what you want to improve</Link>
      </section>
    </main>
  );
}

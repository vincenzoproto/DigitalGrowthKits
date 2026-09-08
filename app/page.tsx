import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <section className="hero hero-premium">
        <div className="hero-copy">
          <span className="eyebrow">Done-for-you hospitality systems</span>
          <h1>Turn more guest activity into direct revenue.</h1>
          <p className="hero-lead">GuestFlow Systems installs and configures practical software for independent hotels and B&Bs: guest messaging, repeat-guest automation, digital concierge and direct-booking infrastructure.</p>
          <div className="hero-actions">
            <Link className="primary primary-large" href="/request-setup">Request a setup review</Link>
            <Link className="secondary-link" href="/repeat-guest-engine">See the featured system</Link>
          </div>
          <div className="hero-proof">
            <span>Defined launch scope</span>
            <span>Configured for one property</span>
            <span>Optional managed support</span>
          </div>
        </div>

        <aside className="hero-dashboard-card" aria-label="GuestFlow Systems overview">
          <div className="dashboard-card-head"><span>GuestFlow overview</span><b>Live operating layer</b></div>
          <div className="dashboard-metric"><small>Guest database</small><strong>Segment</strong><span>Past guests organised into useful cohorts</span></div>
          <div className="dashboard-line" />
          <div className="dashboard-metric"><small>Automations</small><strong>Reactivate</strong><span>Post-stay, win-back and low-season flows</span></div>
          <div className="dashboard-line" />
          <div className="dashboard-metric"><small>Direct revenue</small><strong>Measure</strong><span>Track campaigns and repeat-booking activity</span></div>
        </aside>
      </section>

      <section className="logo-strip" aria-label="Who GuestFlow is built for">
        <span>INDEPENDENT HOTELS</span><span>B&amp;BS</span><span>GUEST HOUSES</span><span>APARTHOTELS</span><span>SMALL GROUPS</span>
      </section>

      <section className="conversion-picker" aria-labelledby="choose-system">
        <div className="conversion-picker-head">
          <span className="eyebrow">Start with the bottleneck</span>
          <h2 id="choose-system">What would you most like to improve?</h2>
          <p>Choose the outcome closest to your current problem. Each path opens one clearly scoped system instead of a generic software bundle.</p>
        </div>
        <div className="system-picker-grid">
          <Link className="system-choice" href="/guest-inbox-pro"><small>Guest operations</small><strong>Reduce repetitive guest messaging</strong><span>Guest Inbox Pro →</span></Link>
          <Link className="system-choice" href="/repeat-guest-engine"><small>Retention</small><strong>Generate more repeat bookings</strong><span>Repeat Guest Engine →</span></Link>
          <Link className="system-choice" href="/digital-guest-concierge"><small>Guest experience</small><strong>Make stay information easier to access</strong><span>Digital Guest Concierge →</span></Link>
          <Link className="system-choice" href="/direct-booking-engine"><small>Direct revenue</small><strong>Build a clearer direct booking path</strong><span>Direct Booking Engine →</span></Link>
        </div>
      </section>

      <section className="trust-ribbon" aria-label="GuestFlow implementation principles">
        <div><b>Scope before access</b><span>No passwords or guest-level data are needed for the first review.</span></div>
        <div><b>Works around your current stack</b><span>We review the PMS, booking and messaging tools you already use first.</span></div>
        <div><b>Defined handover</b><span>Launch scope, ownership and optional support are clarified before go-live.</span></div>
      </section>

      <section className="value-section">
        <div className="section-heading compact-heading"><span className="eyebrow">Why GuestFlow</span><h2>We sell the implementation, not the software headache.</h2></div>
        <div className="value-grid">
          <article><span className="value-number">01</span><h3>Start from a real operating problem</h3><p>No generic software bundle. Each system is tied to one hospitality outcome.</p></article>
          <article><span className="value-number">02</span><h3>Configure proven foundations</h3><p>We build on mature software stacks and adapt the workflow around the property.</p></article>
          <article><span className="value-number">03</span><h3>Hand over something usable</h3><p>Launch scope, documentation, ownership and optional managed support are defined before go-live.</p></article>
        </div>
      </section>

      <section className="featured-offer featured-premium">
        <div className="featured-copy">
          <span className="eyebrow light-eyebrow">Featured system</span>
          <h2>Repeat Guest Engine</h2>
          <p className="featured-kicker">Turn the guest history you already have into a structured repeat-booking channel.</p>
          <p>We map a clean PMS or CSV export, separate marketing-eligible contacts, build useful segments and configure three core automations: post-stay, win-back and low-season reactivation.</p>
          <div className="feature-points dark-points">
            <span>CSV / PMS mapping</span><span>Guest segmentation</span><span>Post-stay</span><span>Win-back</span><span>Low-season</span><span>Reporting</span>
          </div>
          <div className="hero-actions">
            <Link className="primary light-primary" href="/repeat-guest-engine">View full system</Link>
            <Link className="ghost-link" href="/repeat-guest-engine/demo">Open dashboard demo →</Link>
          </div>
        </div>
        <aside className="pricing-panel">
          <div className="pricing-label">Launch package</div>
          <div className="pricing-amount">€990</div>
          <p>One property · database mapping · segmentation · three core automations · reporting · staff handover.</p>
          <div className="pricing-divider" />
          <div className="pricing-label">Optional managed service</div>
          <div className="pricing-monthly">€129<span>/mo</span></div>
          <p>Monitoring, campaign tuning, segmentation updates and operational support.</p>
          <Link className="pricing-cta" href="/request-setup?product=repeat-guest-engine">Request this setup</Link>
        </aside>
      </section>

      <section className="products-section" id="systems">
        <div className="section-heading"><span className="eyebrow">GuestFlow systems</span><h2>Four systems. Four clear operating outcomes.</h2><p>Start with one bottleneck. Expand only when the first system is working.</p></div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="before-after-section">
        <div className="section-heading compact-heading"><span className="eyebrow">What changes</span><h2>From scattered tools to an operating system.</h2></div>
        <div className="before-after-grid">
          <div className="before-card"><span>BEFORE</span><ul><li>Guest data exported and forgotten</li><li>Messages split across multiple inboxes</li><li>Low-season campaigns built manually</li><li>Repeat business left to chance</li></ul></div>
          <div className="after-card"><span>AFTER</span><ul><li>Useful guest segments ready to activate</li><li>Clear workflows and ownership</li><li>Repeatable automations</li><li>A system the team can actually operate</li></ul></div>
        </div>
      </section>

      <section className="how-it-works" id="process">
        <div className="section-heading"><span className="eyebrow">Delivery process</span><h2>Review. Configure. Launch.</h2><p>We keep the first implementation deliberately simple so the property understands exactly what it is buying.</p></div>
        <div className="steps">
          <div><b>01</b><h3>Setup review</h3><p>Property basics, current stack, database/channel situation and the operating problem.</p></div>
          <div><b>02</b><h3>Implementation</h3><p>We map the data or channels, configure the workflow and test the agreed launch scope.</p></div>
          <div><b>03</b><h3>Handover</h3><p>The team receives the working system, ownership notes and the optional managed-support path.</p></div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact-heading"><span className="eyebrow">FAQ</span><h2>Before you request a setup.</h2></div>
        <div className="faq-grid">
          <details><summary>Do I need to replace my PMS?</summary><p>No. The first review checks what you already use and whether the selected GuestFlow system can sit alongside it.</p></details>
          <details><summary>Do you need my guest database immediately?</summary><p>No. For Repeat Guest Engine, the first conversation only needs the source, approximate size and structure. Guest-level data comes later, after scope and data responsibilities are clear.</p></details>
          <details><summary>Is the monthly fee mandatory?</summary><p>No. The launch package is separate. Managed support is optional unless a specific implementation requires ongoing infrastructure or third-party services.</p></details>
          <details><summary>Can I start with one system?</summary><p>Yes. That is the preferred approach. Solve one operating problem first, then expand if the result justifies it.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow light-eyebrow">GuestFlow Systems</span>
        <h2>Tell us the bottleneck. We’ll tell you what to install.</h2>
        <p>No passwords, payment details or guest-level data are needed for the first review.</p>
        <Link className="primary light-primary primary-large" href="/request-setup">Request a setup review</Link>
      </section>
    </main>
  );
}

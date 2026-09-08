import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../repeat-guest-engine/repeat-guest.module.css";

export const metadata = createPageMetadata({
  path: "/digital-guest-concierge",
  title: "Digital Guest Guide for Hotels & B&Bs | QR Concierge",
  description: "Give hotel and B&B guests a mobile guide for check-in, Wi-Fi, services and contacts. A branded QR guest portal configured for your property, with no app download.",
});

export default function DigitalGuestConciergePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Mobile guest experience</span>
          <h1>Your hotel’s guest guide, one QR code away.</h1>
          <p className={styles.lead}>Digital Guest Concierge is a mobile-first guest portal reached by QR code. It organises property information, services, useful links and upsell opportunities without forcing guests to install an app.</p>
          <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=digital-guest-concierge">Request setup</Link><Link className={styles.secondary} href="/digital-guest-concierge/demo">Open visual demo</Link><Link className={styles.secondary} href="/#systems">Compare systems</Link></div>
        </div>
        <aside className={styles.priceCard}>
          <span>Launch package</span><strong>€490</strong><p>One property · branded portal · core guest information · service links · QR access · handover</p>
          <hr /><span>Designed for</span><strong className={styles.monthly}>No app</strong><p>Guests open the experience directly from a QR code or link on their own phone.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>What it solves</span><h2>Fewer repeated questions. A clearer guest journey.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Property guide</h3><p>Check-in, check-out, Wi-Fi, breakfast, parking, house rules and useful stay information in one mobile view.</p></div>
          <div><b>02</b><h3>Service access</h3><p>Make transfers, late checkout, luggage, spa, restaurant or other property services easier to discover.</p></div>
          <div><b>03</b><h3>Multilingual content</h3><p>Organise guest-facing information for the languages that matter to the property.</p></div>
          <div><b>04</b><h3>Update once</h3><p>Change the content behind the QR code without reprinting every physical touchpoint.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Included at launch</span><h2>A guest portal organised around the stay.</h2>
        <div className={styles.flowGrid}>
          <article><span>CONTENT</span><h3>Structured guest information</h3><p>We organise the property’s existing information into clear mobile sections instead of dropping a long document online.</p></article>
          <article><span>BRAND</span><h3>Property-facing design</h3><p>The portal is configured around the property identity, guest journey and the information guests actually need during the stay.</p></article>
          <article><span>COMMERCIAL</span><h3>Useful service prompts</h3><p>Relevant extras and service links can be placed where they make sense in the guest journey rather than hidden in reception material.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Launch scope</span><h2>What you provide. What we configure.</h2>
        <div className={styles.grid4}>
          <div><b>YOU</b><h3>Property content</h3><p>Logo, core stay information, service details, links, contact points and the languages you want to support.</p></div>
          <div><b>WE</b><h3>Information architecture</h3><p>We turn that content into a structured mobile guest journey with clear sections and calls to action.</p></div>
          <div><b>WE</b><h3>Portal setup</h3><p>We configure the hosted/self-hosted foundation, guest pages and reusable QR access points.</p></div>
          <div><b>YOU</b><h3>Final approval</h3><p>The property confirms service details, policies, translations and operational contact information before launch.</p></div>
        </div>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=digital-guest-concierge">Request the setup review</Link><Link className={styles.secondary} href="/digital-guest-concierge/demo">See what the guest experience can look like</Link></div>
      </section>
      <section className={styles.section}>
        <span className={styles.eyebrow}>Choosing the right service</span><h2>A guest guide with a clear scope.</h2>
        <p className={styles.leadSmall}>You receive a configured mobile portal for one property, agreed guest-information sections, service and contact links, QR access and handover guidance. Your team approves the content and keeps service information current.</p>
        <p className={styles.leadSmall}>If you need a staffed concierge available around the clock or a downloadable native app, this portal does not include those services. Guest requests go to the operational contacts and tools your property provides.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=digital-guest-concierge">Discuss my guest guide</Link><Link className={styles.secondary} href="/audit">Start with the free hotel audit</Link></div>
      </section>
    </main>
  );
}

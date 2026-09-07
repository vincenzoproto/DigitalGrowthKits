import Link from "next/link";
import styles from "./repeat-guest.module.css";

export default function RepeatGuestEnginePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Guest database reactivation</span>
          <h1>Turn past stays into direct revenue.</h1>
          <p className={styles.lead}>Repeat Guest Engine takes a clean CSV or PMS export, maps the guest fields, builds marketing-eligible segments and launches repeat-booking campaigns from a self-hosted automation stack.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/repeat-guest-engine/demo">View demo</Link>
            <a className={styles.secondary} href="mailto:info@vincenzoproto.com?subject=Repeat%20Guest%20Engine%20Setup">Request setup</a>
          </div>
        </div>
        <aside className={styles.priceCard}>
          <span>Implementation</span><strong>€990</strong><p>Database mapping · segments · 3 core automations · reporting · staff handover</p>
          <hr /><span>Optional managed service</span><strong className={styles.monthly}>€129/mo</strong><p>Campaign tuning, monitoring, segmentation updates and support.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>How it works</span><h2>From export to automated retention system.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Import</h3><p>CSV or PMS export with approved fields such as email, stay dates, booking value, language and marketing status.</p></div>
          <div><b>02</b><h3>Segment</h3><p>Recent guests, dormant guests, high-value guests, low-season visitors and language/country cohorts.</p></div>
          <div><b>03</b><h3>Automate</h3><p>Post-stay, win-back and low-season direct-booking flows are configured in the automation platform.</p></div>
          <div><b>04</b><h3>Measure</h3><p>Track sends, opens, clicks, unsubscribes and campaign performance from one dashboard.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Included automations</span><h2>Three flows ready at launch.</h2>
        <div className={styles.flowGrid}>
          <article><span>POST-STAY</span><h3>Stay → relationship</h3><p>Follow-up and preference capture after checkout, with promotional messaging only for eligible contacts.</p></article>
          <article><span>WIN-BACK</span><h3>Dormant → return</h3><p>Reactivation after a configurable period, segmented by past stay profile and language.</p></article>
          <article><span>LOW SEASON</span><h3>Empty dates → targeted offer</h3><p>Campaign to relevant previous guests instead of sending the same promotion to the entire database.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Data responsibility</span><h2>We do not turn a guest list into a spam list.</h2>
        <p className={styles.leadSmall}>The setup separates marketing-eligible contacts from suppressed/unsubscribed contacts, uses preference management and requires the property to confirm its lawful basis for promotional communications. Transactional guest messages and marketing campaigns are treated separately.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/repeat-guest-engine/demo">Open dashboard demo</Link></div>
      </section>
    </main>
  );
}

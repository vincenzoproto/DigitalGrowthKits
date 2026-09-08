import type { Metadata } from "next";
import Link from "next/link";
import styles from "./repeat-guest.module.css";

export const metadata: Metadata = {
  title: "Repeat Guest Engine",
  description: "A configured repeat-booking system that maps eligible guest history, builds useful segments and launches post-stay, win-back and low-season automations.",
  alternates: { canonical: "/repeat-guest-engine" },
};

export default function RepeatGuestEnginePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Guest database reactivation</span>
          <h1>Turn past stays into direct revenue.</h1>
          <p className={styles.lead}>Repeat Guest Engine takes a clean CSV or PMS export, maps the guest fields, builds marketing-eligible segments and launches repeat-booking campaigns from a self-hosted automation stack.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/request-setup?product=repeat-guest-engine">Request setup</Link>
            <Link className={styles.secondary} href="/repeat-guest-engine/demo">View dashboard demo</Link>
          </div>
        </div>
        <aside className={styles.priceCard}>
          <span>Launch package</span><strong>€990</strong><p>One property · database mapping · segmentation · 3 core automations · reporting · staff handover</p>
          <hr /><span>Optional managed service</span><strong className={styles.monthly}>€129/mo</strong><p>Campaign tuning, monitoring, segmentation updates and operational support.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Best fit</span><h2>For properties sitting on useful guest history.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Past guest database</h3><p>You already have historical guest contacts in a PMS, booking platform export or spreadsheet.</p></div>
          <div><b>02</b><h3>Direct-booking goal</h3><p>You want previous guests to return through your own booking path instead of depending only on OTA acquisition.</p></div>
          <div><b>03</b><h3>Low-season gaps</h3><p>You need targeted campaigns for quieter periods rather than sending the same offer to every contact.</p></div>
          <div><b>04</b><h3>Small team</h3><p>You want a repeatable retention workflow without manually rebuilding segments and campaigns every time.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Included at launch</span><h2>A complete retention foundation.</h2>
        <div className={styles.flowGrid}>
          <article><span>DATA</span><h3>Import & field mapping</h3><p>Map approved fields such as email, stay dates, booking value, language, country and marketing status from a clean export.</p></article>
          <article><span>SEGMENTS</span><h3>Useful guest cohorts</h3><p>Build practical groups such as recent guests, dormant guests, high-value guests, low-season visitors and language cohorts.</p></article>
          <article><span>AUTOMATION</span><h3>Three core flows</h3><p>Post-stay, win-back and low-season automations configured around the property and the available guest data.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>How it works</span><h2>From export to repeat-booking system.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Review</h3><p>We review the export structure, current booking path, languages and the property’s marketing rules.</p></div>
          <div><b>02</b><h3>Segment</h3><p>Eligible contacts are organised into useful cohorts while suppressed or unsubscribed records stay excluded.</p></div>
          <div><b>03</b><h3>Automate</h3><p>The three launch flows are built, tested and connected to the chosen sending infrastructure.</p></div>
          <div><b>04</b><h3>Handover</h3><p>You receive the operating setup, reporting view and documented ownership of the system.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Three launch automations</span><h2>Start with the flows that matter.</h2>
        <div className={styles.flowGrid}>
          <article><span>POST-STAY</span><h3>Stay → relationship</h3><p>Follow-up and preference capture after checkout, with promotional messaging only for eligible contacts.</p></article>
          <article><span>WIN-BACK</span><h3>Dormant → return</h3><p>Reactivation after a configurable period, segmented by past stay profile and language.</p></article>
          <article><span>LOW SEASON</span><h3>Empty dates → targeted offer</h3><p>Campaign relevant previous guests instead of broadcasting the same promotion to the entire database.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>What we need from you</span><h2>No live database is required for the first conversation.</h2>
        <p className={styles.leadSmall}>For the setup review, send only the property basics, the approximate size/source of the guest database, your current PMS or booking stack and the main commercial goal. Guest-level data is handled only once the implementation scope and data responsibilities are clear.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=repeat-guest-engine">Request the setup review</Link><Link className={styles.secondary} href="/repeat-guest-engine/demo">Open dashboard demo</Link></div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Data responsibility</span><h2>We do not turn a guest list into a spam list.</h2>
        <p className={styles.leadSmall}>The setup separates marketing-eligible contacts from suppressed/unsubscribed contacts, uses preference management and requires the property to confirm its lawful basis for promotional communications. Transactional guest messages and marketing campaigns are treated separately.</p>
      </section>
    </main>
  );
}

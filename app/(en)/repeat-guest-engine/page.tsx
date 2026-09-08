import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "./repeat-guest.module.css";

export const metadata = createPageMetadata({
  path: "/repeat-guest-engine",
  title: "Past Guest Reactivation for Hotels | Repeat Guest Engine",
  description: "Organise your hotel guest database into eligible audiences and post-stay, win-back and low-season campaigns. Explore the CSV demo before requesting setup.",
});

export default function RepeatGuestEnginePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Guest database reactivation</span>
          <h1>Reconnect with your hotel’s past guests.</h1>
          <p className={styles.lead}>Start with a PMS/CSV export, separate eligible contacts from suppressed records, then configure post-stay, win-back and low-season repeat-booking flows.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/repeat-guest-engine/demo">Try the CSV demo</Link>
            <Link className={styles.secondary} href="/request-setup?product=repeat-guest-engine">Request a 15-min setup review</Link>
          </div>
          <p className={styles.leadSmall}>The demo processes selected CSV data in the browser and does not send guest communications.</p>
        </div>
        <aside className={styles.priceCard}>
          <span>Founder launch · first 3 qualified setups</span><strong>€690</strong><p>One property · database mapping · segmentation · 3 core automations · reporting · staff handover</p>
          <hr /><span>Standard setup</span><strong className={styles.monthly}>€990</strong><p>Optional managed service €129/mo. Third-party hosting and sending costs remain separate.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>See it before you buy</span><h2>From CSV to useful guest segments.</h2>
        <p className={styles.leadSmall}>Load a test CSV and see recent, dormant, low-season, high-value, marketing-eligible and suppressed audiences separated automatically. This is the first step of the real implementation.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/repeat-guest-engine/demo">Open interactive demo</Link><Link className={styles.secondary} href="/request-setup?product=repeat-guest-engine">Check PMS compatibility</Link></div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Best fit</span><h2>For properties sitting on useful guest history.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Past guest database</h3><p>Historical guest contacts already exist in a PMS, booking-platform export or spreadsheet.</p></div>
          <div><b>02</b><h3>Direct-booking goal</h3><p>You want previous guests to return through your own booking path.</p></div>
          <div><b>03</b><h3>Low-season gaps</h3><p>You need targeted campaigns for quieter periods rather than blanket promotions.</p></div>
          <div><b>04</b><h3>Small team</h3><p>You want a repeatable workflow instead of rebuilding lists and campaigns manually.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Included at launch</span><h2>A complete retention foundation.</h2>
        <div className={styles.flowGrid}>
          <article><span>DATA</span><h3>Import & field mapping</h3><p>Map approved fields such as email, stay dates, booking value, language, country and marketing status.</p></article>
          <article><span>SEGMENTS</span><h3>Useful guest cohorts</h3><p>Recent guests, dormant guests, high-value guests, low-season visitors and language cohorts.</p></article>
          <article><span>AUTOMATION</span><h3>Three core flows</h3><p>Post-stay, win-back and low-season automations configured around the property and available data.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>How it works</span><h2>Review first. Configure second.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Review</h3><p>Confirm export structure, booking path, languages and marketing rules.</p></div>
          <div><b>02</b><h3>Test import</h3><p>Validate fields, eligibility, suppressions and deduplication on a controlled subset.</p></div>
          <div><b>03</b><h3>Automate</h3><p>Build and QA the three launch flows on the agreed sending infrastructure.</p></div>
          <div><b>04</b><h3>Handover</h3><p>Deliver reporting, documentation, ownership and staff operating guidance.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Three launch automations</span><h2>Start with the flows that matter.</h2>
        <div className={styles.flowGrid}>
          <article><span>POST-STAY</span><h3>Stay → relationship</h3><p>Follow-up and preference capture after checkout, with promotional messaging only for eligible contacts.</p></article>
          <article><span>WIN-BACK</span><h3>Dormant → return</h3><p>Reactivation after a configurable period, segmented by past stay profile and language.</p></article>
          <article><span>LOW SEASON</span><h3>Empty dates → targeted offer</h3><p>Reach relevant previous guests instead of broadcasting the same promotion to the entire database.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Founder offer</span><h2>€690 one-time for the first 3 qualified setups.</h2>
        <p className={styles.leadSmall}>Includes one property, data mapping, segmentation, three core automations, reporting and staff handover. Hosting/VPS, email or SMS provider costs and other third-party services are separate. We confirm compatibility and scope before payment.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=repeat-guest-engine">Request setup review</Link><a className={styles.secondary} href="/buy/repeat-guest-engine-founder">Already qualified? Secure the slot</a></div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Data responsibility</span><h2>Agree contact rules before sending.</h2>
        <p className={styles.leadSmall}>Promotional contacts are handled according to the property’s confirmed rules and lawful basis. Suppressed and unsubscribed records remain excluded, and transactional communications are kept separate from marketing flows.</p>
      </section>
      <section className={styles.section}>
        <span className={styles.eyebrow}>Before setup</span><h2>Start with the guest data you can use.</h2>
        <p className={styles.leadSmall}>We review your PMS export or CSV, available stay and contact fields, marketing status, exclusions, booking link and guest languages. Try the demo’s sample data first; the initial review establishes what can be configured from your actual records.</p>
        <p className={styles.leadSmall}>The handover includes data mapping, segments, exclusion rules, three core automations, reporting and operating guidance for one property. If you do not have usable guest history or cannot identify eligible contacts, those gaps need attention first. Purchased lists are outside the scope, and booking results are not guaranteed.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=repeat-guest-engine">Review my database setup</Link><Link className={styles.secondary} href="/audit">Start with the free hotel audit</Link></div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import styles from "../repeat-guest.module.css";

export const metadata: Metadata = {
  title: "Repeat Guest Engine Founder Launch | GuestFlow Systems",
  description: "Founder launch for the first 3 hospitality properties: Repeat Guest Engine implementation at €690.",
  robots: { index: false, follow: false },
};

export default function FounderPage() {
  return <main className={styles.shell}>
    <section className={styles.hero}>
      <div>
        <span className={styles.eyebrow}>Founder Launch · first 3 completed purchases</span>
        <h1>Launch Repeat Guest Engine for €690.</h1>
        <p className={styles.lead}>A limited first-client offer for independent hotels and B&Bs that already have useful guest history and want a structured repeat-booking workflow.</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="https://book.stripe.com/aFafZheYd6j28lu38KabK06">Secure a Founder slot</a>
          <Link className={styles.secondary} href="/repeat-guest-engine/demo">See the walkthrough first</Link>
        </div>
      </div>
      <aside className={styles.priceCard}>
        <span>Founder launch</span><strong>€690</strong><p>One property · database mapping · segmentation · 3 core workflows · reporting view · staff handover.</p>
        <hr/><span>Standard launch price</span><strong className={styles.monthly}>€990</strong><p>The Founder checkout automatically closes after three completed purchases.</p>
      </aside>
    </section>

    <section className={styles.section}>
      <span className={styles.eyebrow}>Included</span><h2>What the €690 setup covers.</h2>
      <div className={styles.grid4}>
        <div><b>01</b><h3>Database mapping</h3><p>Review and mapping of one clean PMS/CSV guest export into the agreed fields.</p></div>
        <div><b>02</b><h3>Segmentation</h3><p>Useful cohorts such as recent, dormant, low-season and value/language segments where the data supports them.</p></div>
        <div><b>03</b><h3>Three workflows</h3><p>Post-stay, win-back and low-season reactivation configured around the property.</p></div>
        <div><b>04</b><h3>Handover</h3><p>Testing, approval stage, basic reporting view and staff handover.</p></div>
      </div>
    </section>

    <section className={styles.darkSection}>
      <span className={styles.eyebrowLight}>Founder terms</span><h2>Limited price, not reduced scope.</h2>
      <div className={styles.flowGrid}>
        <article><span>PRICE</span><h3>€690 one-time</h3><p>Reserved to the first three completed purchases through the dedicated Founder checkout.</p></article>
        <article><span>SUPPORT</span><h3>€129/month optional</h3><p>Managed monitoring and optimisation are separate and only activated if agreed.</p></article>
        <article><span>CASE STUDY</span><h3>Results only with permission</h3><p>We may later ask to use aggregated results as a case study. Nothing is published without property permission.</p></article>
      </div>
    </section>

    <section className={styles.section}>
      <span className={styles.eyebrow}>Before you buy</span><h2>Good fit matters more than the discount.</h2>
      <p className={styles.leadSmall}>This offer works best when the property has usable historical guest data, a direct-booking destination and a clear way to identify which contacts can receive promotional communications. If you are unsure, request the setup review first.</p>
      <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=repeat-guest-engine">Request a setup review</Link><a className={styles.secondary} href="https://book.stripe.com/aFafZheYd6j28lu38KabK06">Proceed to Founder checkout</a></div>
    </section>
  </main>;
}

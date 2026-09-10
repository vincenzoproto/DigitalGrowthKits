import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import styles from "../repeat-guest-engine/repeat-guest.module.css";

export const metadata = createPageMetadata({
  path: "/direct-booking-engine",
  title: "Hotel Website & Direct Booking Setup | GuestFlow Systems",
  description: "Build a clearer direct booking journey for your hotel or B&B. Property pages, room inventory and reservation workflow configured after a review of your tools.",
});

export default function DirectBookingEnginePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Direct booking infrastructure</span>
          <h1>A hotel website with a clear path to book direct.</h1>
          <p className={styles.lead}>Direct Booking Engine is a configured hotel website and reservation setup for independent accommodation businesses that want a clear direct-sales path instead of relying only on third-party marketplaces.</p>
          <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=direct-booking-engine">Request setup</Link><Link className={styles.secondary} href="/direct-booking-engine/demo">Open visual demo</Link><Link className={styles.secondary} href="/#systems">Compare systems</Link></div>
        </div>
        <aside className={styles.priceCard}>
          <span>Launch package</span><strong>€1,490</strong><p>One property · website structure · room setup · booking workflow · launch configuration · owner handover</p>
          <hr /><span>Important</span><strong className={styles.monthly}>Direct</strong><p>Third-party payment, hosting or channel-manager fees remain separate when applicable.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>What it solves</span><h2>A direct-booking path guests can actually use.</h2>
        <div className={styles.grid4}>
          <div><b>01</b><h3>Property website</h3><p>Structure the core pages around rooms, location, stay information and a clear booking action.</p></div>
          <div><b>02</b><h3>Room inventory</h3><p>Configure room types, occupancy rules, base information and the reservation flow supported by the chosen foundation.</p></div>
          <div><b>03</b><h3>Booking journey</h3><p>Reduce friction between browsing the property and reaching the reservation step.</p></div>
          <div><b>04</b><h3>Owner control</h3><p>Hand over a system the property can operate directly, with the agreed infrastructure and ownership documented.</p></div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <span className={styles.eyebrowLight}>Included at launch</span><h2>Website plus reservation infrastructure.</h2>
        <div className={styles.flowGrid}>
          <article><span>STRUCTURE</span><h3>Conversion-focused property pages</h3><p>Home, rooms, property information, location/contact and booking entry points are organised around a simple guest journey.</p></article>
          <article><span>BOOKING</span><h3>Reservation configuration</h3><p>Room setup and booking workflow are configured on the selected self-hostable hospitality foundation.</p></article>
          <article><span>HANDOVER</span><h3>Launch ownership</h3><p>The property receives the operating setup, access model and documented responsibilities for hosting, payments and ongoing maintenance.</p></article>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Before implementation</span><h2>We review the current stack first.</h2>
        <p className={styles.leadSmall}>The setup review covers your current website, PMS or booking tools, room inventory, payment requirements, domain/hosting situation and any channel-manager dependencies. We define the launch scope before moving or connecting live booking infrastructure.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=direct-booking-engine">Request the setup review</Link><Link className={styles.secondary} href="/direct-booking-engine/demo">Preview the booking journey</Link></div>
      </section>
      <section className={styles.section}>
        <span className={styles.eyebrow}>Choosing the right setup</span><h2>Clear inputs. An agreed booking path.</h2>
        <p className={styles.leadSmall}>You provide property and room information, approved photos, occupancy and booking rules, your existing website and the PMS or booking tools you use. We review domain access, payments and channel-manager dependencies before defining the implementation.</p>
        <p className={styles.leadSmall}>You receive the property website structure, room pages, supported inventory and booking configuration, plus operating guidance. If a required PMS or channel-manager connection is unsupported, we agree an alternative first. This setup does not include advertising campaigns or guaranteed bookings.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=direct-booking-engine">Check my booking setup</Link><Link className={styles.secondary} href="/audit">Start with the free hotel audit</Link></div>
      </section>
    </main>
  );
}

import Link from "next/link";
import styles from "./guest-inbox.module.css";

export default function GuestInboxProPage() {
  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/">← Back to GuestFlow Systems</Link>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Hospitality messaging infrastructure</span>
          <h1>Every guest message.<br/>One operating inbox.</h1>
          <p className={styles.lead}>Guest Inbox Pro is a professionally configured unified inbox for hotels and B&Bs. It centralises supported guest channels, adds hospitality-specific labels and routing, and gives staff one place to handle enquiries, check-in questions, requests and booking leads.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/request-setup?product=guest-inbox-pro">Request setup</Link>
            <Link className={styles.secondary} href="/guest-inbox-pro/demo">Open live demo</Link>
          </div>
        </div>
        <aside className={styles.priceCard}>
          <div>
            <span className={styles.eyebrow}>Launch package</span>
            <div className={styles.price}>€690</div>
            <div className={styles.monthly}>+ €79/month managed support</div>
            <p className={styles.muted}>Initial implementation for one property. Channel/API fees from third parties are separate when applicable.</p>
          </div>
          <ul className={styles.included}>
            <li>Core installation & security baseline</li>
            <li>Hotel/B&B inbox structure</li>
            <li>Labels, routing and response workflows</li>
            <li>Website chat configuration</li>
            <li>Email channel setup</li>
            <li>Supported social/messaging channel onboarding</li>
            <li>Staff handover</li>
          </ul>
        </aside>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>What the hotel buys</span>
        <h2>Not Chatwoot. A working hospitality operation.</h2>
        <div className={styles.grid3}>
          <div className={styles.mini}><strong>One place to answer</strong><span className={styles.muted}>Supported website, email and messaging conversations are organised in a single operating view.</span></div>
          <div className={styles.mini}><strong>Hospitality routing</strong><span className={styles.muted}>Conversations are tagged and routed around real hotel jobs: booking lead, check-in, transfer, upsell, complaint and post-stay.</span></div>
          <div className={styles.mini}><strong>Fewer lost enquiries</strong><span className={styles.muted}>Booking requests and guest issues stay visible in a shared workflow instead of being scattered across personal apps.</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Default workflow</span>
        <h2>From incoming message to resolved request.</h2>
        <div className={styles.workflow}>
          <div className={styles.step}><b>01 · RECEIVE</b>Guest message enters the shared inbox.</div>
          <div className={styles.step}><b>02 · CLASSIFY</b>Apply labels such as Booking Lead, Check-in, Transfer or Issue.</div>
          <div className={styles.step}><b>03 · ASSIGN</b>Route to owner, reception or reservations.</div>
          <div className={styles.step}><b>04 · RESOLVE</b>Reply, track and close with the conversation history preserved.</div>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.eyebrow}>Managed support · €79/month</span>
        <h2>What the recurring fee covers.</h2>
        <div className={styles.grid3}>
          <div className={styles.mini}><strong>System health</strong><span className={styles.muted}>Basic deployment monitoring, update planning and configuration checks.</span></div>
          <div className={styles.mini}><strong>Workflow maintenance</strong><span className={styles.muted}>Small edits to labels, canned responses, routing and hospitality workflows as operations change.</span></div>
          <div className={styles.mini}><strong>Operational support</strong><span className={styles.muted}>Help for the hotel team when channels, users or inbox rules need adjustment.</span></div>
        </div>
        <div className={styles.actions}><Link className={styles.primary} href="/request-setup?product=guest-inbox-pro">Request a setup review</Link></div>
        <p className={styles.legal}>Guest Inbox Pro is an implementation and managed-service offer built around the open-source Chatwoot core. Enterprise-only features are not included. Third-party channel providers may impose their own eligibility, API or messaging fees.</p>
      </section>
    </main>
  );
}

import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import styles from "../guest-inbox.module.css";

const conversations = [
  {name:"Marco R.", channel:"WhatsApp", preview:"Can we check in after 22:00?", time:"10:42"},
  {name:"Sarah J.", channel:"Instagram", preview:"Do you have availability for 3 nights?", time:"10:31"},
  {name:"Elena P.", channel:"Email", preview:"Airport transfer for tomorrow morning", time:"09:58"},
  {name:"Tom K.", channel:"Website", preview:"Is breakfast included in the rate?", time:"09:41"},
  {name:"Anna L.", channel:"WhatsApp", preview:"We would like a late checkout", time:"09:16"},
];

export const metadata = createPageMetadata({"path": "/guest-inbox-pro/demo", "title": "Guest messaging inbox demo for hotels | GuestFlow", "description": "Explore an illustrative hotel guest inbox: conversation labels, response workflows and handover between staff."});

export default function GuestInboxDemo() {
  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/guest-inbox-pro">← Guest Inbox Pro</Link>
      <span className={styles.eyebrow}>Interactive concept preview</span>
      <h1 style={{fontSize:"46px",letterSpacing:"-2px",margin:"10px 0 8px"}}>Hotel Operations Inbox</h1>
      <p className={styles.muted}>This demo shows the hospitality workflow we configure around the underlying inbox platform.</p>

      <section className={styles.demoShell}>
        <div className={styles.demoTop}><strong>Casa Mare Boutique B&B</strong><span className={styles.channel}>5 open · 2 booking leads</span></div>
        <div className={styles.demoGrid}>
          <aside className={styles.sidebar}>
            <div className={`${styles.sideItem} ${styles.active}`}>All conversations · 5</div>
            <div className={styles.sideItem}>Booking Leads · 2</div>
            <div className={styles.sideItem}>Check-in · 1</div>
            <div className={styles.sideItem}>Transfers · 1</div>
            <div className={styles.sideItem}>Upsells · 1</div>
            <div className={styles.sideItem}>Guest Issues · 0</div>
            <div className={styles.sideItem}>Post-stay · 0</div>
          </aside>
          <div className={styles.conversationList}>
            {conversations.map((c)=><div className={styles.conversation} key={c.name}><div className={styles.row}><strong>{c.name}</strong><small>{c.time}</small></div><div className={styles.channel}>{c.channel}</div><div className={styles.preview}>{c.preview}</div></div>)}
          </div>
          <div className={styles.chat}>
            <div className={styles.chatHeader}><strong>Marco R.</strong><div className={styles.tagRow}><span className={styles.tag}>Check-in</span><span className={styles.tag}>In-house guest</span><span className={styles.tag}>Assigned: Reception</span></div></div>
            <div className={styles.bubbleGuest}>Hi, our flight lands late. Can we check in after 22:00?</div>
            <div className={styles.bubbleHotel}>Absolutely. Late check-in is available. I’ll send the self check-in instructions here before your arrival.</div>
            <div className={styles.bubbleGuest}>Perfect, thank you. Can you also arrange an airport transfer?</div>
            <div className={styles.bubbleHotel}>Yes. I’ve added the transfer request. We’ll confirm the pickup time and price shortly.</div>
            <div className={styles.tagRow}><span className={styles.tag}>+ Transfer</span><span className={styles.tag}>Follow-up required</span></div>
            <div className={styles.note}>Demo data only. Real channels require the property owner to authorise the relevant accounts/APIs.</div>
          </div>
        </div>
      </section>
      <div className={styles.actions}><a className={styles.primary} href="mailto:info@vincenzoproto.com?subject=Guest%20Inbox%20Pro%20Setup">Request this setup</a><Link className={styles.secondary} href="/guest-inbox-pro">View package</Link></div>
    </main>
  );
}

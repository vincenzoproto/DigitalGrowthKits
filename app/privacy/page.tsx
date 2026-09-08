import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main style={{maxWidth:900,margin:"0 auto",padding:"72px 22px 110px"}}>
      <Link href="/" style={{color:"#141713",textDecoration:"none",fontWeight:800}}>← GuestFlow Systems</Link>
      <div style={{marginTop:42}}>
        <span className="eyebrow">Privacy</span>
        <h1 style={{fontSize:"clamp(48px,8vw,82px)",lineHeight:.94,letterSpacing:"-.055em",margin:"18px 0 24px"}}>Privacy information.</h1>
        <p style={{fontSize:18,color:"#62685f"}}>This page explains how information submitted to GuestFlow Systems is used when you request information or an implementation review.</p>
      </div>

      <section style={{display:"grid",gap:28,marginTop:48}}>
        <div><h2>Information you choose to send</h2><p>Setup requests may include your name, business email, property name, website, property type, approximate room or unit count, current hospitality tools and notes about the operating problem you want to solve.</p></div>
        <div><h2>How it is used</h2><p>The information is used to review your request, understand the property context, communicate about a possible implementation and prepare an appropriate delivery scope.</p></div>
        <div><h2>Guest-level data</h2><p>Do not send guest databases, passwords, payment information or other sensitive operational credentials through the initial setup form. Where a later implementation requires customer or guest data, the handling process and responsibilities should be agreed before transfer.</p></div>
        <div><h2>Third-party services</h2><p>GuestFlow implementations can rely on hosting, email, messaging, payment, analytics or other third-party services selected for a project. Those services may have their own privacy terms and processing requirements.</p></div>
        <div><h2>Contact</h2><p>For privacy-related questions about a GuestFlow Systems enquiry, contact <a href="mailto:info@vincenzoproto.com">info@vincenzoproto.com</a>.</p></div>
      </section>
    </main>
  );
}

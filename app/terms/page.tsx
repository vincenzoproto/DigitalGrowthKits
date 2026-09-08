import Link from "next/link";

export default function TermsPage() {
  return (
    <main style={{maxWidth:900,margin:"0 auto",padding:"72px 22px 110px"}}>
      <Link href="/" style={{color:"#141713",textDecoration:"none",fontWeight:800}}>← GuestFlow Systems</Link>
      <div style={{marginTop:42}}>
        <span className="eyebrow">Terms</span>
        <h1 style={{fontSize:"clamp(48px,8vw,82px)",lineHeight:.94,letterSpacing:"-.055em",margin:"18px 0 24px"}}>Implementation terms.</h1>
        <p style={{fontSize:18,color:"#62685f"}}>The website describes standard GuestFlow Systems offers. A specific implementation is confirmed only after the property scope, dependencies and delivery responsibilities are reviewed.</p>
      </div>

      <section style={{display:"grid",gap:28,marginTop:48}}>
        <div><h2>Scope</h2><p>Published package prices describe a standard one-property launch scope. Additional integrations, migration work, custom development, unusual data cleanup or multi-property requirements may require a separate quote.</p></div>
        <div><h2>Third-party services</h2><p>Hosting, domains, messaging providers, payment processors, channel APIs and other external services may charge separate fees or impose their own eligibility and usage rules.</p></div>
        <div><h2>Open-source foundations</h2><p>Some GuestFlow Systems implementations are configured around open-source software. Upstream software remains subject to its applicable licence and trademark terms. The commercial offer covers implementation, configuration, workflow design, handover and optional support.</p></div>
        <div><h2>Customer responsibilities</h2><p>The property is responsible for providing accurate operational information, approving customer-facing content, maintaining lawful access to data and confirming the lawful basis for marketing or guest communications where applicable.</p></div>
        <div><h2>Managed support</h2><p>Recurring managed support is optional unless a project proposal states otherwise. Its exact coverage is defined in the agreed implementation scope.</p></div>
        <div><h2>Contact</h2><p>Questions about a proposed implementation can be sent to <a href="mailto:info@vincenzoproto.com">info@vincenzoproto.com</a>.</p></div>
      </section>
    </main>
  );
}

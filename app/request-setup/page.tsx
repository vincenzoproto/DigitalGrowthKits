import Link from "next/link";
import { Suspense } from "react";
import RequestSetupForm from "./RequestSetupForm";

export default function RequestSetupPage() {
  return (
    <main style={{maxWidth:760,margin:"0 auto",padding:"70px 22px 100px"}}>
      <Link href="/" style={{color:"#141713",textDecoration:"none",fontWeight:700}}>← GuestFlow Systems</Link>
      <div style={{marginTop:42}}>
        <span className="eyebrow">Setup request</span>
        <h1 style={{fontSize:"clamp(48px,8vw,82px)",lineHeight:.92,letterSpacing:"-.055em",margin:"18px 0 22px"}}>Tell us what you need. We configure the system.</h1>
        <p style={{fontSize:19,color:"#62685f",maxWidth:650}}>Choose a GuestFlow system and send the property basics. We review the setup before installation so you know exactly what will be connected and delivered.</p>
      </div>
      <Suspense fallback={<p>Loading form…</p>}>
        <RequestSetupForm />
      </Suspense>
    </main>
  );
}

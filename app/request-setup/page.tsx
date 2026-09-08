import Link from "next/link";
import { Suspense } from "react";
import RequestSetupForm from "./RequestSetupForm";

export default function RequestSetupPage() {
  return (
    <main className="setup-shell">
      <Link href="/" className="back-link">← GuestFlow Systems</Link>
      <section className="setup-hero">
        <div>
          <span className="eyebrow">Setup review</span>
          <h1>Tell us the bottleneck. We’ll map the right system.</h1>
          <p>Send the property basics and current setup. We review the scope before any installation, account connection or guest-level data transfer.</p>
        </div>
        <aside className="setup-side-note">
          <strong>No technical prep required.</strong>
          <p>You do not need to choose servers, integrations or infrastructure first. Start with the problem and the tools you already use.</p>
        </aside>
      </section>
      <Suspense fallback={<p>Loading setup form…</p>}>
        <RequestSetupForm />
      </Suspense>
    </main>
  );
}

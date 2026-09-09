import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Suspense } from "react";
import RequestSetupForm from "./RequestSetupForm";

export const metadata = createPageMetadata({"path": "/request-setup", "title": "Request a hotel automation setup review | GuestFlow", "description": "Tell us about your property and current tools. We review your hotel automation needs and agree implementation scope before requesting access."});

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
          <p>Start with the business problem and the tools you already use. We identify dependencies, what can stay in place and what the launch package should actually include.</p>
        </aside>
      </section>
      <Suspense fallback={<p>Loading setup form…</p>}>
        <RequestSetupForm />
      </Suspense>
    </main>
  );
}

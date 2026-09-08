import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import RequestSetupForm from "./RequestSetupForm";

export const metadata: Metadata = {
  title: "Request a Setup Review | GuestFlow Systems",
  description: "Tell GuestFlow Systems what is blocking guest messaging, repeat bookings, digital guest experience or direct bookings. We map the right implementation scope before access or installation.",
  alternates: { canonical: "/request-setup" },
};

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

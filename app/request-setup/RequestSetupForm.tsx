"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { normalizeReferral, resolveReferral } from "@/lib/referrals";

const systems = ["Guest Inbox Pro", "Digital Guest Concierge", "Repeat Guest Engine", "Direct Booking Engine"];
const goals = [
  ["reply", "Reduce repetitive guest messaging", "Guest Inbox Pro"],
  ["repeat", "Generate more repeat bookings", "Repeat Guest Engine"],
  ["concierge", "Improve the digital guest experience", "Digital Guest Concierge"],
  ["direct", "Increase direct bookings", "Direct Booking Engine"],
] as const;

type Status = { type: "success" | "fallback" | "error"; message: string } | null;

export default function RequestSetupForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("product") || "Repeat Guest Engine";
  const referral = normalizeReferral(searchParams.get("ref"));
  const [savedReferral, setSavedReferral] = useState<string>();
  const defaultProduct = useMemo(() => systems.find((name) => name.toLowerCase().replaceAll(" ", "-") === requested) || systems.find((name) => name === requested) || "Repeat Guest Engine", [requested]);
  const defaultGoal = goals.find(([, , system]) => system === defaultProduct)?.[0] || "repeat";

  const [product, setProduct] = useState(defaultProduct);
  const [goal, setGoal] = useState(defaultGoal);
  const [propertyName, setPropertyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [propertyType, setPropertyType] = useState("Hotel");
  const [rooms, setRooms] = useState("");
  const [currentStack, setCurrentStack] = useState("");
  const [databaseSize, setDatabaseSize] = useState("");
  const [notes, setNotes] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function selectGoal(id: string) {
    const selected = goals.find(([goalId]) => goalId === id);
    setGoal(id as typeof goals[number][0]);
    if (selected) setProduct(selected[2]);
  }

  function buildRequest(requestReferral = resolveReferral(referral, savedReferral)) {
    const goalLabel = goals.find(([id]) => id === goal)?.[1] || goal;
    const subject = `GuestFlow Systems - ${product} setup review`;
    const body = [
      `System: ${product}`,
      `Primary goal: ${goalLabel}`,
      `Referral: ${requestReferral || "direct"}`,
      `Property: ${propertyName || "-"}`,
      `Property type: ${propertyType || "-"}`,
      `Rooms / units: ${rooms || "-"}`,
      `Contact: ${contactName || "-"}`,
      `Email: ${email || "-"}`,
      `Website: ${website || "-"}`,
      `Current PMS / tools: ${currentStack || "-"}`,
      `Approx. past-guest database: ${databaseSize || "-"}`,
      "",
      "Context / notes:",
      notes || "-",
    ].join("\n");
    return { subject, body, goalLabel };
  }

  function openEmailFallback(requestReferral = resolveReferral(referral, savedReferral)) {
    const { subject, body } = buildRequest(requestReferral);
    window.location.href = `mailto:info@vincenzoproto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    const { goalLabel } = buildRequest();

    try {
      const response = await fetch("/api/setup-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, goal: goalLabel, referral, propertyName, propertyType, contactName, email, website, rooms, currentStack, databaseSize, notes, companyWebsite }),
      });

      const result = await response.json().catch(() => ({}));
      const deliveredReferral = resolveReferral(result.referral, referral, savedReferral);
      setSavedReferral(deliveredReferral);

      if (response.ok && result.ok === true) {
        setStatus({ type: "success", message: "Request received. We’ll review the property, current stack and requested outcome before proposing the implementation scope." });
        return;
      }

      setStatus({ type: "fallback", message: "Your request has not been sent. You can open the prepared email below, then press Send in your email app to complete it." });
    } catch {
      setStatus({ type: "fallback", message: "We couldn’t confirm delivery. You can open the prepared email below, then press Send in your email app to complete the request." });
    } finally {
      setSending(false);
    }
  }

  async function copyRequest() {
    const { subject, body } = buildRequest();
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}\n\nSend to: info@vincenzoproto.com`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setStatus({ type: "error", message: "Copy was blocked by the browser. You can still use the main Send setup request button." });
    }
  }

  return (
    <form onSubmit={submit} className="setup-form">
      <div className="form-intro"><div><span className="eyebrow">2-minute review</span><h2>Start with the outcome.</h2></div><span className="form-trust">No obligation · No guest data required</span></div>

      <fieldset className="goal-picker"><legend>What would you most like to improve?</legend>{goals.map(([id, label]) => <label key={id} className={goal === id ? "goal-option selected" : "goal-option"}><input type="radio" name="goal" value={id} checked={goal === id} onChange={() => selectGoal(id)} /><span>{label}</span></label>)}</fieldset>

      <label>Recommended system<select value={product} onChange={(e) => setProduct(e.target.value)} className="setup-field">{systems.map((system) => <option key={system}>{system}</option>)}</select></label>

      <div className="form-grid-2"><label>Property name<input required value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="Hotel / B&B name" className="setup-field" /></label><label>Property type<select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="setup-field"><option>Hotel</option><option>B&B</option><option>Guest house</option><option>Aparthotel</option><option>Apartments</option><option>Other</option></select></label></div>

      <div className="form-grid-2"><label>Your name / role<input required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Name and role" className="setup-field" /></label><label>Work email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@property.com" className="setup-field" autoComplete="email" /></label></div>

      <div className="form-grid-2"><label>Website<input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." className="setup-field" inputMode="url" /></label><label>Rooms / units<input value={rooms} onChange={(e) => setRooms(e.target.value)} inputMode="numeric" placeholder="e.g. 24" className="setup-field" /></label></div>

      <details className="optional-details"><summary>Add technical context <span>optional</span></summary><div className="optional-fields"><div className="form-grid-2"><label>Current PMS / tools<input value={currentStack} onChange={(e) => setCurrentStack(e.target.value)} placeholder="Cloudbeds, Opera, Booking.com..." className="setup-field" /></label><label>Past-guest database<input value={databaseSize} onChange={(e) => setDatabaseSize(e.target.value)} placeholder="3,000 contacts / not sure" className="setup-field" /></label></div><label>Anything else we should know?<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Current bottleneck, desired outcome or timing." className="setup-field" /></label></div></details>

      {referral && <p className="form-note">Partner referral: <strong>{referral}</strong></p>}
      <label className="honeypot-field" aria-hidden="true">Company website confirmation<input tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} /></label>

      <label className="form-consent"><input required type="checkbox" /><span>I agree to be contacted about this setup request and I have read the <Link href="/privacy">Privacy information</Link>.</span></label>

      {status && <div className={`setup-status ${status.type}`} role="status">{status.message}</div>}

      <div className="setup-actions"><button type="submit" className="buy-button" disabled={sending}>{sending ? "Sending request…" : "Send setup request →"}</button>{status?.type === "fallback" && <button type="button" onClick={() => openEmailFallback()} className="buy-button secondary-button">Open prepared email</button>}<button type="button" onClick={copyRequest} className="buy-button secondary-button">{copied ? "Request copied" : "Copy request"}</button></div>
      <p className="form-note">No passwords, payment details or guest-level data are requested here. Direct delivery is attempted first; if it is unavailable, you can choose to open a prepared email and send it from your email app.</p>
    </form>
  );
}

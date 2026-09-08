"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const systems = [
  "Guest Inbox Pro",
  "Digital Guest Concierge",
  "Repeat Guest Engine",
  "Direct Booking Engine",
];

export default function RequestSetupForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("product") || "Repeat Guest Engine";
  const defaultProduct = useMemo(
    () => systems.find((name) => name.toLowerCase().replaceAll(" ", "-") === requested) || systems.find((name) => name === requested) || "Repeat Guest Engine",
    [requested]
  );

  const [product, setProduct] = useState(defaultProduct);
  const [propertyName, setPropertyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [propertyType, setPropertyType] = useState("Hotel");
  const [rooms, setRooms] = useState("");
  const [currentStack, setCurrentStack] = useState("");
  const [databaseSize, setDatabaseSize] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  function buildRequest() {
    const subject = `GuestFlow Systems - ${product} setup request`;
    const body = [
      `System: ${product}`,
      `Property: ${propertyName || "-"}`,
      `Property type: ${propertyType || "-"}`,
      `Rooms / units: ${rooms || "-"}`,
      `Contact: ${contactName || "-"}`,
      `Email: ${email || "-"}`,
      `Website: ${website || "-"}`,
      `Current PMS / tools: ${currentStack || "-"}`,
      `Approx. past-guest database: ${databaseSize || "-"}`,
      "",
      "Main goal / notes:",
      notes || "-",
    ].join("\n");
    return { subject, body };
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const { subject, body } = buildRequest();
    window.location.href = `mailto:info@vincenzoproto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyRequest() {
    const { subject, body } = buildRequest();
    await navigator.clipboard.writeText(`${subject}\n\n${body}\n\nSend to: info@vincenzoproto.com`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <form onSubmit={submit} className="setup-form">
      <label>System
        <select value={product} onChange={(e)=>setProduct(e.target.value)} className="setup-field">
          {systems.map((system)=><option key={system}>{system}</option>)}
        </select>
      </label>

      <div className="form-grid-2">
        <label>Property name
          <input required value={propertyName} onChange={(e)=>setPropertyName(e.target.value)} placeholder="Hotel / B&B name" className="setup-field"/>
        </label>
        <label>Property type
          <select value={propertyType} onChange={(e)=>setPropertyType(e.target.value)} className="setup-field">
            <option>Hotel</option><option>B&B</option><option>Guest house</option><option>Aparthotel</option><option>Apartments</option><option>Other</option>
          </select>
        </label>
      </div>

      <div className="form-grid-2">
        <label>Your name / role
          <input required value={contactName} onChange={(e)=>setContactName(e.target.value)} placeholder="Name and role" className="setup-field"/>
        </label>
        <label>Work email
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@property.com" className="setup-field"/>
        </label>
      </div>

      <div className="form-grid-2">
        <label>Website
          <input value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://..." className="setup-field"/>
        </label>
        <label>Rooms / units
          <input value={rooms} onChange={(e)=>setRooms(e.target.value)} inputMode="numeric" placeholder="e.g. 24" className="setup-field"/>
        </label>
      </div>

      <div className="form-grid-2">
        <label>Current PMS / tools
          <input value={currentStack} onChange={(e)=>setCurrentStack(e.target.value)} placeholder="e.g. Cloudbeds, Opera, Booking.com..." className="setup-field"/>
        </label>
        <label>Approx. past-guest database
          <input value={databaseSize} onChange={(e)=>setDatabaseSize(e.target.value)} placeholder="e.g. 3,000 contacts / not sure" className="setup-field"/>
        </label>
      </div>

      <label>Main problem or goal
        <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={5} placeholder="Example: we have years of past guests but no structured repeat-booking campaigns." className="setup-field"/>
      </label>

      <div className="setup-actions">
        <button type="submit" className="buy-button">Open prepared email</button>
        <button type="button" onClick={copyRequest} className="buy-button secondary-button">{copied ? "Request copied" : "Copy request"}</button>
      </div>
      <p className="form-note">This form does not upload guest data, passwords or payment details. The primary button opens your email app with the setup request already prepared.</p>
    </form>
  );
}

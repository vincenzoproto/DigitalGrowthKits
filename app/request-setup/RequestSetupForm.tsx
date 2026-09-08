"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const systems = [
  "Guest Inbox Pro",
  "Digital Guest Concierge",
  "Repeat Guest Engine",
  "Direct Booking Engine",
];

const fieldStyle = {
  width: "100%",
  padding: "14px 15px",
  borderRadius: 12,
  border: "1px solid #dcd9cf",
  background: "#fffef9",
  font: "inherit",
};

export default function RequestSetupForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("product") || "Guest Inbox Pro";
  const defaultProduct = useMemo(
    () => systems.find((name) => name.toLowerCase().replaceAll(" ", "-") === requested) || systems.find((name) => name === requested) || "Guest Inbox Pro",
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
      `Current tools / PMS: ${currentStack || "-"}`,
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
    <form onSubmit={submit} style={{display:"grid",gap:18,marginTop:32}}>
      <label style={{display:"grid",gap:8,fontWeight:700}}>System
        <select value={product} onChange={(e)=>setProduct(e.target.value)} style={fieldStyle}>
          {systems.map((system)=><option key={system}>{system}</option>)}
        </select>
      </label>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Property name
          <input required value={propertyName} onChange={(e)=>setPropertyName(e.target.value)} placeholder="Hotel / B&B name" style={fieldStyle}/>
        </label>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Property type
          <select value={propertyType} onChange={(e)=>setPropertyType(e.target.value)} style={fieldStyle}>
            <option>Hotel</option><option>B&B</option><option>Guest house</option><option>Apartments</option><option>Other</option>
          </select>
        </label>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Your name
          <input required value={contactName} onChange={(e)=>setContactName(e.target.value)} placeholder="Name and role" style={fieldStyle}/>
        </label>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Email
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@property.com" style={fieldStyle}/>
        </label>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Website
          <input value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://..." style={fieldStyle}/>
        </label>
        <label style={{display:"grid",gap:8,fontWeight:700}}>Rooms / units
          <input value={rooms} onChange={(e)=>setRooms(e.target.value)} inputMode="numeric" placeholder="e.g. 24" style={fieldStyle}/>
        </label>
      </div>

      <label style={{display:"grid",gap:8,fontWeight:700}}>Current PMS / tools
        <input value={currentStack} onChange={(e)=>setCurrentStack(e.target.value)} placeholder="e.g. Cloudbeds, Booking.com, Gmail, spreadsheet..." style={fieldStyle}/>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>What do you want to improve?
        <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={5} placeholder="Tell us the main operating problem, current workflow or commercial goal." style={{...fieldStyle,resize:"vertical"}}/>
      </label>

      <button type="submit" className="buy-button" style={{fontSize:16}}>Prepare setup request</button>
      <button type="button" onClick={copyRequest} className="buy-button secondary-button" style={{fontSize:15}}>{copied ? "Request copied" : "Copy request instead"}</button>
      <p style={{color:"#62685f",fontSize:13,margin:0}}>The primary button opens your email app with the request already prepared for info@vincenzoproto.com. No passwords, payment data or guest-level customer data are requested here.</p>
    </form>
  );
}

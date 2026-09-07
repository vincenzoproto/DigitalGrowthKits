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
  const [notes, setNotes] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const subject = `GuestFlow Systems - ${product} setup request`;
    const body = [
      `System: ${product}`,
      `Property: ${propertyName || "-"}`,
      `Contact: ${contactName || "-"}`,
      `Email: ${email || "-"}`,
      `Website: ${website || "-"}`,
      "",
      "Notes:",
      notes || "-",
    ].join("\n");

    window.location.href = `mailto:info@vincenzoproto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} style={{display:"grid",gap:18,marginTop:32}}>
      <label style={{display:"grid",gap:8,fontWeight:700}}>System
        <select value={product} onChange={(e)=>setProduct(e.target.value)} style={fieldStyle}>
          {systems.map((system)=><option key={system}>{system}</option>)}
        </select>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>Property name
        <input required value={propertyName} onChange={(e)=>setPropertyName(e.target.value)} placeholder="Hotel / B&B name" style={fieldStyle}/>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>Your name
        <input required value={contactName} onChange={(e)=>setContactName(e.target.value)} placeholder="Name and role" style={fieldStyle}/>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>Email
        <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@property.com" style={fieldStyle}/>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>Website
        <input value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://..." style={fieldStyle}/>
      </label>
      <label style={{display:"grid",gap:8,fontWeight:700}}>What do you want to improve?
        <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={5} placeholder="Tell us about your current setup, channels or database." style={{...fieldStyle,resize:"vertical"}}/>
      </label>
      <button type="submit" className="buy-button" style={{fontSize:16}}>Send setup request</button>
      <p style={{color:"#62685f",fontSize:13,margin:0}}>This opens your email app with the request already prepared. No passwords or private customer data are requested here.</p>
    </form>
  );
}

const fieldStyle = {
  width: "100%",
  padding: "14px 15px",
  borderRadius: 12,
  border: "1px solid #dcd9cf",
  background: "#fffef9",
  font: "inherit",
};

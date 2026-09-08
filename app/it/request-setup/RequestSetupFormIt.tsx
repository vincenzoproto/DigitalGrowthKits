"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeReferral, resolveReferral } from "@/lib/referrals";

const systems=["Guest Inbox Pro","Digital Guest Concierge","Repeat Guest Engine","Direct Booking Engine"];
const labels:Record<string,string>={"guest-inbox-pro":"Guest Inbox Pro","digital-guest-concierge":"Digital Guest Concierge","repeat-guest-engine":"Repeat Guest Engine","direct-booking-engine":"Direct Booking Engine"};

export default function RequestSetupFormIt(){
 const searchParams=useSearchParams();
 const requested=searchParams.get("product")||"repeat-guest-engine";
 const referral=normalizeReferral(searchParams.get("ref"));
 const [savedReferral,setSavedReferral]=useState<string>();
 const [statusType,setStatusType]=useState("success");
 const defaultProduct=useMemo(()=>labels[requested]||"Repeat Guest Engine",[requested]);
 const [product,setProduct]=useState(defaultProduct),[propertyName,setPropertyName]=useState(""),[contactName,setContactName]=useState(""),[email,setEmail]=useState(""),[website,setWebsite]=useState(""),[propertyType,setPropertyType]=useState("Hotel"),[rooms,setRooms]=useState(""),[currentStack,setCurrentStack]=useState(""),[notes,setNotes]=useState(""),[sending,setSending]=useState(false),[status,setStatus]=useState("");
 function fallback(requestReferral=resolveReferral(referral,savedReferral)){const subject=`GuestFlow Systems - richiesta setup ${product}`;const body=[`Sistema: ${product}`,`Referral: ${requestReferral||"diretto"}`,`Struttura: ${propertyName}`,`Tipo: ${propertyType}`,`Camere/unità: ${rooms||"-"}`,`Contatto: ${contactName}`,`Email: ${email}`,`Sito: ${website||"-"}`,`PMS / strumenti: ${currentStack||"-"}`,"",`Note: ${notes||"-"}`].join("\n");window.location.href=`mailto:info@vincenzoproto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}
 async function submit(e:FormEvent){
   e.preventDefault();setSending(true);setStatus("");
   try{
     const res=await fetch("/api/setup-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product,referral,propertyName,propertyType,contactName,email,website,rooms,currentStack,databaseSize:"",notes})});
     const result=await res.json().catch(()=>({}));
     const deliveredReferral=resolveReferral(result.referral,referral,savedReferral);
     setSavedReferral(deliveredReferral);
     if(res.ok&&result.ok===true){
       setStatusType("success");
       setStatus("Richiesta ricevuta. Valuteremo struttura, strumenti attuali e obiettivo prima di definire il servizio.");
     }else{
       setStatusType("fallback");
       setStatus("La richiesta non è stata inviata. Apro una mail già compilata: premi Invia nella tua app email per completarla.");
       setTimeout(()=>fallback(deliveredReferral),350);
     }
   }catch{
     setStatusType("fallback");
     setStatus("Non abbiamo potuto confermare l’invio. Apro una mail già compilata: premi Invia nella tua app email per completare la richiesta.");
     setTimeout(()=>fallback(),350);
   }finally{setSending(false);}
 }
 return <form onSubmit={submit} className="setup-form">
   <div className="form-intro"><div><span className="eyebrow">2 minuti</span><h2>Partiamo dall’obiettivo.</h2></div><span className="form-trust">Nessun dato ospite richiesto</span></div>
   <label>Sistema<select value={product} onChange={e=>setProduct(e.target.value)} className="setup-field">{systems.map(s=><option key={s}>{s}</option>)}</select></label>
   <div className="form-grid-2"><label>Nome struttura<input required value={propertyName} onChange={e=>setPropertyName(e.target.value)} placeholder="Hotel / B&B" className="setup-field"/></label><label>Tipo struttura<select value={propertyType} onChange={e=>setPropertyType(e.target.value)} className="setup-field"><option>Hotel</option><option>B&B</option><option>Guest house</option><option>Aparthotel</option><option>Appartamenti</option><option>Altro</option></select></label></div>
   <div className="form-grid-2"><label>Nome e ruolo<input required value={contactName} onChange={e=>setContactName(e.target.value)} placeholder="Nome e ruolo" className="setup-field"/></label><label>Email di lavoro<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nome@struttura.it" className="setup-field"/></label></div>
   <div className="form-grid-2"><label>Sito web<input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://..." className="setup-field"/></label><label>Camere / unità<input value={rooms} onChange={e=>setRooms(e.target.value)} placeholder="es. 24" className="setup-field"/></label></div>
   <details className="optional-details"><summary>Aggiungi contesto tecnico <span>opzionale</span></summary><div className="optional-fields"><label>PMS / strumenti attuali<input value={currentStack} onChange={e=>setCurrentStack(e.target.value)} placeholder="Cloudbeds, Opera, Booking.com..." className="setup-field"/></label><label>Problema principale / note<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4} placeholder="Cosa vuoi migliorare?" className="setup-field"/></label></div></details>
   {referral&&<p className="form-note">Referral partner: <strong>{referral}</strong></p>}
   <label className="form-consent"><input required type="checkbox"/><span>Accetto di essere contattato in merito a questa richiesta di setup.</span></label>
   {status&&<div className={`setup-status ${statusType}`} role="status">{status}</div>}
   <div className="setup-actions"><button type="submit" className="buy-button" disabled={sending}>{sending?"Invio…":"Invia richiesta setup →"}</button></div>
   <p className="form-note">Non chiediamo password, dati di pagamento o dati personali degli ospiti in questa fase.</p>
 </form>;
}

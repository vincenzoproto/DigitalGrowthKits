"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function scoreAudit(rooms:number, database:number, campaigns:string, direct:string, weakMonths:number) {
  let score = 0;
  if (rooms >= 10) score += 15;
  if (rooms >= 30) score += 5;
  if (database >= 300) score += 15;
  if (database >= 1000) score += 20;
  else if (database >= 600) score += 10;
  if (campaigns === "no") score += 20;
  if (campaigns === "sometimes") score += 10;
  if (direct === "yes") score += 15;
  if (direct === "partial") score += 8;
  if (weakMonths >= 2) score += 10;
  return Math.min(score, 100);
}

export default function AuditCalculator({lang="en"}:{lang?:"en"|"it"}) {
  const it = lang === "it";
  const [rooms,setRooms] = useState(20);
  const [database,setDatabase] = useState(500);
  const [pms,setPms] = useState("");
  const [weakMonths,setWeakMonths] = useState(3);
  const [campaigns,setCampaigns] = useState("no");
  const [direct,setDirect] = useState("yes");
  const [done,setDone] = useState(false);

  const score = useMemo(()=>scoreAudit(rooms,database,campaigns,direct,weakMonths),[rooms,database,campaigns,direct,weakMonths]);
  const level = score >= 70 ? "high" : score >= 45 ? "medium" : "low";
  const copy = it ? {
    eyebrow:"Audit gratuito · 2 minuti", title:"Quanto potenziale di repeat revenue stai lasciando nel tuo storico ospiti?", lead:"Inserisci pochi dati operativi. Non servono password o database ospiti. L'audit stima solo quanto è adatto il tuo caso a un sistema di riattivazione.", rooms:"Camere / unità", database:"Contatti ospiti storici (circa)", pms:"PMS / gestionale", weak:"Mesi deboli all'anno", campaigns:"Fate già campagne di ritorno?", direct:"Avete un percorso di prenotazione diretta?", no:"No", sometimes:"Ogni tanto", yes:"Sì", partial:"Parzialmente", calc:"Calcola il mio audit", high:"Potenziale alto", medium:"Potenziale medio", low:"Potenziale da verificare", highText:"Hai già gli elementi principali per testare una strategia di repeat booking: storico ospiti, periodi deboli e un percorso diretto. Il prossimo passo è verificare qualità dati e idoneità marketing.", mediumText:"Ci sono segnali utili, ma prima di implementare conviene verificare dimensione/qualità dello storico, canale diretto e frequenza delle campagne attuali.", lowText:"Il caso potrebbe non essere ancora pronto per una vera automazione. Prima conviene capire se esiste uno storico ospiti sufficiente e un percorso diretto utilizzabile.", review:"Richiedi una review gratuita di 15 minuti", demo:"Vedi la demo", founder:"Founder Launch €690 · primi 3 clienti", note:"Questo audit non stima ricavi né garantisce prenotazioni. Misura soltanto il fit operativo in base ai dati inseriti."} : {
    eyebrow:"Free audit · 2 minutes", title:"How much repeat-revenue potential is sitting inside your guest history?", lead:"Enter a few operating details. No passwords or guest database required. The audit only estimates how suitable your situation is for a guest-reactivation system.", rooms:"Rooms / units", database:"Approx. historical guest contacts", pms:"PMS / booking system", weak:"Weak months per year", campaigns:"Do you already run return campaigns?", direct:"Do you have a direct-booking path?", no:"No", sometimes:"Sometimes", yes:"Yes", partial:"Partially", calc:"Calculate my audit", high:"High potential", medium:"Medium potential", low:"Needs validation", highText:"You already have the main ingredients for a repeat-booking test: guest history, weak periods and a direct path. The next step is validating data quality and marketing eligibility.", mediumText:"There are useful signals, but the next step is validating database quality, direct-booking access and how often you already reactivate past guests.", lowText:"Your property may not yet be ready for a full automation. First verify whether there is enough usable guest history and a direct booking path worth activating.", review:"Request a free 15-minute review", demo:"View the demo", founder:"Founder Launch €690 · first 3 clients", note:"This audit does not forecast revenue or guarantee bookings. It only measures operational fit from the information entered."};

  const resultText = level === "high" ? copy.highText : level === "medium" ? copy.mediumText : copy.lowText;
  const resultTitle = level === "high" ? copy.high : level === "medium" ? copy.medium : copy.low;

  return <div className="audit-grid">
    <section className="audit-form-card">
      <label>{copy.rooms}<input type="number" min="1" value={rooms} onChange={e=>setRooms(Number(e.target.value))}/></label>
      <label>{copy.database}<input type="number" min="0" step="50" value={database} onChange={e=>setDatabase(Number(e.target.value))}/></label>
      <label>{copy.pms}<input value={pms} onChange={e=>setPms(e.target.value)} placeholder={it?"es. Cloudbeds, Protel, Booking...":"e.g. Cloudbeds, Protel, Booking..."}/></label>
      <label>{copy.weak}<input type="number" min="0" max="12" value={weakMonths} onChange={e=>setWeakMonths(Number(e.target.value))}/></label>
      <label>{copy.campaigns}<select value={campaigns} onChange={e=>setCampaigns(e.target.value)}><option value="no">{copy.no}</option><option value="sometimes">{copy.sometimes}</option><option value="yes">{copy.yes}</option></select></label>
      <label>{copy.direct}<select value={direct} onChange={e=>setDirect(e.target.value)}><option value="yes">{copy.yes}</option><option value="partial">{copy.partial}</option><option value="no">{copy.no}</option></select></label>
      <button className="primary audit-button" onClick={()=>setDone(true)}>{copy.calc}</button>
    </section>

    <aside className={`audit-result-card ${done?"is-visible":""}`}>
      <span className="eyebrow">{done ? `${score}/100` : copy.eyebrow}</span>
      <h2>{done ? resultTitle : copy.title}</h2>
      <p>{done ? resultText : copy.lead}</p>
      {done && <>
        <div className="audit-score-bar"><span style={{width:`${score}%`}}/></div>
        <div className="audit-summary"><b>{rooms}</b><span>{copy.rooms}</span><b>{database}</b><span>{copy.database}</span><b>{pms||"-"}</b><span>{copy.pms}</span></div>
        <div className="audit-actions">
          <Link className="primary" href={`${it?"/it":""}/request-setup?product=repeat-guest-engine`}>{copy.review}</Link>
          <Link className="secondary-button button-link" href="/repeat-guest-engine/demo">{copy.demo}</Link>
        </div>
        {level === "high" && <a className="founder-audit-link" href="https://book.stripe.com/aFafZheYd6j28lu38KabK06">{copy.founder} →</a>}
      </>}
      <small>{copy.note}</small>
    </aside>
  </div>;
}

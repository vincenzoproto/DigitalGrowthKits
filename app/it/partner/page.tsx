import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({"path": "/it/partner", "title": "Partner per hotel e B&B: programma referral | GuestFlow", "description": "Il programma referral GuestFlow per consulenti, revenue manager e agenzie hospitality: introduci strutture qualificate e scopri condizioni e implementazione."});

const faqs = [
  ["Quanto guadagno?", "Il partner riceve il 20% sulla prima implementazione GuestFlow effettivamente incassata dal cliente presentato. Con il Founder setup da €690 sono €138; con il prezzo standard da €990 sono €198."],
  ["Ci sono costi o quote di ingresso?", "No. Non è previsto alcun fisso per entrare nel pilot referral."],
  ["Devo occuparmi dell'implementazione?", "No. Puoi limitarti all'introduzione qualificata. GuestFlow gestisce valutazione tecnica, scope, checkout e implementazione."],
  ["Posso mantenere il rapporto con il cliente?", "Sì. Il modello è pensato per essere complementare: il rapporto principale può restare tuo."],
  ["Quando viene riconosciuta la commissione?", "Solo dopo che la prima implementazione del cliente presentato è stata effettivamente incassata e attribuita al referral."],
  ["Quali clienti sono adatti?", "Hotel indipendenti, boutique hotel, B&B, guest house e piccoli gruppi con storico ospiti utilizzabile, un percorso di prenotazione diretta e interesse a lavorare sul repeat booking."],
];

export default function GuestFlowPartnerPage() {
  return <main>
    <section className="hero hero-premium">
      <div className="hero-copy">
        <span className="eyebrow">GuestFlow Partner Program · Pilot</span>
        <h1>Porta un hotel qualificato. Guadagna sulla prima implementazione.</h1>
        <p className="hero-lead">Un programma referral semplice per revenue manager, consulenti hospitality, web agency, commerciali e professionisti che lavorano già con strutture ricettive indipendenti.</p>
        <div className="hero-actions">
          <a className="primary primary-large" href="mailto:info@vincenzoproto.com?subject=GuestFlow%20Partner%20-%20Candidatura&body=Nome%3A%0AAzienda%2Fruolo%3A%0AQuante%20strutture%20segui%3A%0A%0AVorrei%20valutare%20il%20programma%20partner%20GuestFlow.">Candidati come partner</a>
          <Link className="secondary-link" href="/repeat-guest-engine/demo">Apri la demo →</Link>
        </div>
        <div className="hero-proof"><span>20% sulla prima implementazione</span><span>Nessun fisso</span><span>Implementazione gestita da GuestFlow</span></div>
      </div>
      <aside className="hero-dashboard-card">
        <div className="dashboard-card-head"><span>Referral economics</span><b>Pilot attivo</b></div>
        <div className="dashboard-metric"><small>Founder setup</small><strong>€690</strong><span>Commissione partner: €138</span></div>
        <div className="dashboard-line"/>
        <div className="dashboard-metric"><small>Setup standard</small><strong>€990</strong><span>Commissione partner: €198</span></div>
        <div className="dashboard-line"/>
        <div className="dashboard-metric"><small>Modello</small><strong>Referral</strong><span>Pagato sulla prima implementazione incassata</span></div>
      </aside>
    </section>

    <section className="trust-ribbon"><div><b>Tu introduci</b><span>Segnali una struttura con un problema reale di retention o repeat booking.</span></div><div><b>Noi qualifichiamo</b><span>Verifichiamo PMS/export, storico ospiti, canale diretto e fattibilità.</span></div><div><b>Noi implementiamo</b><span>GuestFlow gestisce setup, segmentazione, automazioni, QA e handover.</span></div></section>

    <section className="value-section"><div className="section-heading compact-heading"><span className="eyebrow">Come funziona</span><h2>Un referral commerciale senza costruire un nuovo servizio interno.</h2><p>Il partner non deve imparare a configurare il sistema o gestire dati ospite. Deve semplicemente riconoscere una struttura adatta e fare un'introduzione qualificata.</p></div><div className="value-grid"><article><span className="value-number">01</span><h3>Individua il cliente giusto</h3><p>Struttura indipendente con storico ospiti, PMS/export e interesse a generare più ritorni diretti.</p></article><article><span className="value-number">02</span><h3>Fai l'introduzione</h3><p>Ci metti in contatto con owner, GM, revenue o marketing manager. Nessun pitch tecnico necessario.</p></article><article><span className="value-number">03</span><h3>Ricevi la commissione</h3><p>Quando la prima implementazione attribuita al tuo referral viene incassata, matura il 20% concordato.</p></article></div></section>

    <section className="featured-offer featured-premium"><div className="featured-copy"><span className="eyebrow light-eyebrow">Prodotto in evidenza</span><h2>Repeat Guest Engine</h2><p className="featured-kicker">Aiuta l'hotel a trasformare lo storico ospiti in un canale strutturato di prenotazioni di ritorno.</p><p>Partiamo da un export PMS/CSV, separiamo i contatti idonei, creiamo segmenti e configuriamo tre flussi: post-stay, win-back e bassa stagione.</p><div className="feature-points dark-points"><span>Mappatura database</span><span>Segmentazione</span><span>Post-stay</span><span>Win-back</span><span>Bassa stagione</span><span>Reporting</span></div><div className="hero-actions"><Link className="primary light-primary" href="/it/repeat-guest-engine">Vedi l'offerta</Link><Link className="ghost-link" href="/repeat-guest-engine/demo">Demo interattiva →</Link></div></div><aside className="pricing-panel"><div className="pricing-label">Founder Launch</div><div className="pricing-amount">€690</div><p>Primi 3 setup completati. Una struttura, tre automazioni, reporting e handover.</p><div className="pricing-divider"/><div className="pricing-label">Partner share</div><div className="pricing-monthly">20%</div><p>€138 sul Founder setup. €198 sul prezzo standard da €990.</p></aside></section>

    <section className="how-it-works"><div className="section-heading"><span className="eyebrow">Chi cerchiamo</span><h2>Professionisti che hanno già accesso alla relazione con l'hotel.</h2><p>Non cerchiamo spammer o liste fredde. Cerchiamo persone che conoscono davvero il settore e possono introdurre opportunità sensate.</p></div><div className="steps"><div><b>01</b><h3>Revenue manager</h3><p>Professionisti che seguono pricing, distribuzione o direct booking per hotel indipendenti.</p></div><div><b>02</b><h3>Agenzie & consulenti</h3><p>Web agency hospitality, consulenti marketing, PMS consultant e advisor alberghieri.</p></div><div><b>03</b><h3>Commerciali hospitality</h3><p>Professionisti con relazioni attive con owner, GM e piccoli gruppi alberghieri.</p></div></div></section>

    <section className="faq-section"><div className="section-heading compact-heading"><span className="eyebrow">FAQ Partner</span><h2>Condizioni semplici e trasparenti.</h2></div><div className="faq-grid">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>

    <section className="final-cta"><span className="eyebrow light-eyebrow">GuestFlow Partner</span><h2>Hai già hotel nel tuo network?</h2><p>Mandaci due righe sul tuo ruolo e sul tipo di strutture che segui. Se c'è fit, partiamo con un referral pilota senza costi fissi.</p><a className="primary light-primary primary-large" href="mailto:info@vincenzoproto.com?subject=GuestFlow%20Partner%20-%20Candidatura&body=Nome%3A%0AAzienda%2Fruolo%3A%0AQuante%20strutture%20segui%3A%0A%0AVorrei%20valutare%20il%20programma%20partner%20GuestFlow.">Candidati come partner</a></section>
  </main>;
}

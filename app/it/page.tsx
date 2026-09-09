import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import GuidedDemo from "@/components/GuidedDemo";
import ImplementationOverview from "@/components/ImplementationOverview";

export const metadata = createPageMetadata({"path": "/it", "title": "Automazioni per hotel e B&B | GuestFlow Systems", "description": "Messaggi ospiti, riattivazione clienti, concierge digitale e prenotazioni dirette: automazioni configurate per hotel e B&B. Setup da €490 e audit gratuito."});

const systems = [
  { id: "guest-inbox-pro", href: "/it/guest-inbox-pro", area: "Operazioni ospiti", title: "Riduci i messaggi ripetitivi", product: "Guest Inbox Pro", price: "€690" },
  { id: "repeat-guest-engine", href: "/it/repeat-guest-engine", area: "Retention", title: "Genera più prenotazioni di ritorno", product: "Repeat Guest Engine", price: "€990" },
  { id: "digital-guest-concierge", href: "/it/digital-guest-concierge", area: "Esperienza ospite", title: "Rendi le informazioni del soggiorno più accessibili", product: "Digital Guest Concierge", price: "€490" },
  { id: "direct-booking-engine", href: "/it/direct-booking-engine", area: "Ricavi diretti", title: "Costruisci un percorso di prenotazione diretta più chiaro", product: "Direct Booking Engine", price: "€1.490" },
];

export default function ItalianHome() {
  return <main>
    <section className="hero hero-premium">
      <div className="hero-copy">
        <span className="eyebrow">GuestFlow Systems · Configurazione da €490</span>
        <h1>Automazioni per hotel e B&amp;B, configurate per te.</h1>
        <p className="hero-lead">Semplifica i messaggi agli ospiti, organizza le informazioni del soggiorno e ricontatta chi è già stato da te. Configuriamo il sistema che scegli, testiamo i flussi e mostriamo al tuo team come usarli.</p>
        <div className="hero-actions"><Link className="primary primary-large" href="/it/audit">Fai l’audit gratuito</Link><Link className="secondary-link" href="#systems">Confronta sistemi e prezzi</Link></div>
        <div className="hero-proof"><span>Attività concordate prima del setup</span><span>Configurazione, test e consegna</span><span>Supporto continuativo opzionale</span></div>
      </div>
      <aside className="hero-dashboard-card" aria-label="Cosa include la configurazione GuestFlow"><div className="dashboard-card-head"><span>Il tuo setup</span><b>Consegna definita</b></div><div className="dashboard-metric"><small>Il punto di partenza</small><strong>Una priorità</strong><span>Scegli il problema operativo da risolvere per primo</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>GuestFlow segue</small><strong>Setup e test</strong><span>Flussi configurati sulle esigenze della tua struttura</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>Il tuo team riceve</small><strong>Istruzioni chiare</strong><span>Guida operativa e spiegazione per lo staff</span></div></aside>
    </section>

    <section className="logo-strip"><span>HOTEL INDIPENDENTI</span><span>B&amp;B</span><span>GUEST HOUSE</span><span>APARTHOTEL</span><span>PICCOLI GRUPPI</span></section>

    <section className="conversion-picker">
      <div className="conversion-picker-head"><span className="eyebrow">Parti dal problema</span><h2>Cosa vuoi migliorare per prima cosa?</h2><p>Scegli il risultato più vicino alla tua esigenza. Ti portiamo a un sistema con perimetro e prezzo chiari.</p></div>
      <div className="system-picker-grid">{systems.map(s => <Link key={s.href} className="system-choice" href={s.href}><small>{s.area}</small><strong>{s.title}</strong><span>{s.product} · {s.price} →</span></Link>)}</div>
    </section>

    <GuidedDemo locale="it" />

    <section className="trust-ribbon"><div><b>Prima definiamo le attività</b><span>Nessuna password o dato ospite nella prima valutazione.</span></div><div><b>Partiamo dai tuoi strumenti</b><span>Valutiamo PMS, sistema di prenotazione e canali che usi già.</span></div><div><b>Consegna chiara</b><span>Responsabilità, proprietà e supporto vengono definiti prima del lancio.</span></div></section>

    <section className="featured-offer featured-premium"><div className="featured-copy"><span className="eyebrow light-eyebrow">Sistema in evidenza</span><h2>Repeat Guest Engine</h2><p className="featured-kicker">Trasforma lo storico ospiti che possiedi già in un canale strutturato di prenotazioni di ritorno.</p><p>Mappiamo un export PMS/CSV pulito, separiamo i contatti idonei al marketing, creiamo segmenti utili e configuriamo tre automazioni: post-soggiorno, recupero ospiti inattivi e riattivazione in bassa stagione.</p><div className="feature-points dark-points"><span>Mappatura CSV / PMS</span><span>Segmentazione</span><span>Post-soggiorno</span><span>Ospiti inattivi</span><span>Bassa stagione</span><span>Report</span></div><div className="hero-actions"><Link className="primary light-primary" href="/it/repeat-guest-engine">Vedi il sistema</Link><Link className="ghost-link" href="#guided-demo">Prova la demo guidata →</Link></div></div><aside className="pricing-panel"><div className="pricing-label">Pacchetto lancio</div><div className="pricing-amount">€990</div><p>Una struttura · mappatura database · segmentazione · tre automazioni · report · spiegazione per lo staff.</p><div className="pricing-divider"/><div className="pricing-label">Gestione opzionale</div><div className="pricing-monthly">€129<span>/mese</span></div><p>Monitoraggio, ottimizzazione campagne, segmenti e supporto operativo.</p><Link className="pricing-cta" href="/buy/repeat-guest-engine">Acquista setup — €990</Link><Link className="pricing-secondary" href="/it/request-setup?product=repeat-guest-engine">Preferisci una valutazione prima?</Link></aside></section>

    <section className="products-section" id="systems"><div className="section-heading"><span className="eyebrow">Sistemi GuestFlow</span><h2>Quattro sistemi. Quattro risultati operativi chiari.</h2><p>Parti da un solo collo di bottiglia. Espandi quando il primo sistema funziona.</p></div><div className="product-grid">{systems.map(s => <article className="product-card" key={s.href}><div className="product-topline"><span className="badge">{s.area}</span><strong className="price">{s.price}</strong></div><h3>{s.product}</h3><p className="description">{s.title}</p><div className="card-actions"><Link className="buy-button button-link" href={`/buy/${s.id}`}>Acquista setup</Link><Link className="buy-button secondary-button button-link" href={s.href}>Vedi offerta</Link></div><p className="card-payment-note">Checkout sicuro Stripe. Puoi leggere il perimetro completo prima di acquistare.</p></article>)}</div></section>

    <ImplementationOverview locale="it" />

    <section className="faq-section" id="faq"><div className="section-heading compact-heading"><span className="eyebrow">FAQ</span><h2>Prima di richiedere un setup.</h2></div><div className="faq-grid"><details><summary>Devo sostituire il mio PMS?</summary><p>No. Valutiamo prima ciò che usi già e se il sistema GuestFlow può affiancarlo.</p></details><details><summary>Serve subito il database ospiti?</summary><p>No. Nella prima valutazione bastano fonte, dimensione approssimativa e struttura dei dati.</p></details><details><summary>Il canone mensile è obbligatorio?</summary><p>No. Il pacchetto di lancio è separato. Il supporto gestito è opzionale salvo esigenze infrastrutturali specifiche.</p></details><details><summary>Posso partire da un solo sistema?</summary><p>Sì, ed è l’approccio consigliato.</p></details></div></section>

    <section className="final-cta"><span className="eyebrow light-eyebrow">GuestFlow Systems</span><h2>Trova il punto di partenza per la tua struttura.</h2><p>Usa l’audit gratuito per valutare le tue priorità con numeri indicativi. Non servono password, dati di pagamento o nominativi degli ospiti.</p><Link className="primary light-primary primary-large" href="/it/audit">Fai l’audit gratuito</Link></section>
  </main>;
}

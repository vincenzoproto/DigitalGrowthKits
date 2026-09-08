import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GuestFlow Systems | Sistemi hospitality configurati per te",
  description: "Sistemi done-for-you per messaggistica ospiti, repeat booking, concierge digitale e prenotazioni dirette per hotel e B&B.",
  alternates: { canonical: "/it", languages: { en: "/", it: "/it" } },
};

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
        <span className="eyebrow">Sistemi hospitality configurati per te</span>
        <h1>Trasforma più attività degli ospiti in ricavi diretti.</h1>
        <p className="hero-lead">GuestFlow Systems installa e configura soluzioni pratiche per hotel indipendenti e B&B: messaggistica ospiti, automazioni per clienti di ritorno, concierge digitale e infrastruttura per prenotazioni dirette.</p>
        <div className="hero-actions"><Link className="primary primary-large" href="/it/request-setup">Richiedi una valutazione</Link><Link className="secondary-link" href="/it/repeat-guest-engine">Vedi il sistema in evidenza</Link></div>
        <div className="hero-proof"><span>Perimetro definito prima del lancio</span><span>Configurato per la tua struttura</span><span>Supporto gestito opzionale</span></div>
      </div>
      <aside className="hero-dashboard-card"><div className="dashboard-card-head"><span>Panoramica GuestFlow</span><b>Livello operativo</b></div><div className="dashboard-metric"><small>Database ospiti</small><strong>Segmenta</strong><span>Organizza gli ospiti passati in gruppi utili</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>Automazioni</small><strong>Riattiva</strong><span>Post-soggiorno, win-back e bassa stagione</span></div><div className="dashboard-line"/><div className="dashboard-metric"><small>Ricavi diretti</small><strong>Misura</strong><span>Monitora campagne e ritorni</span></div></aside>
    </section>

    <section className="logo-strip"><span>HOTEL INDIPENDENTI</span><span>B&amp;B</span><span>GUEST HOUSE</span><span>APARTHOTEL</span><span>PICCOLI GRUPPI</span></section>

    <section className="conversion-picker">
      <div className="conversion-picker-head"><span className="eyebrow">Parti dal problema</span><h2>Cosa vuoi migliorare per prima cosa?</h2><p>Scegli il risultato più vicino alla tua esigenza. Ti portiamo a un sistema con perimetro e prezzo chiari.</p></div>
      <div className="system-picker-grid">{systems.map(s => <Link key={s.href} className="system-choice" href={s.href}><small>{s.area}</small><strong>{s.title}</strong><span>{s.product} · {s.price} →</span></Link>)}</div>
    </section>

    <section className="trust-ribbon"><div><b>Prima definiamo il perimetro</b><span>Nessuna password o dato ospite nella prima valutazione.</span></div><div><b>Partiamo dal tuo stack attuale</b><span>Valutiamo PMS, booking e canali che usi già.</span></div><div><b>Handover chiaro</b><span>Responsabilità, proprietà e supporto vengono definiti prima del go-live.</span></div></section>

    <section className="value-section"><div className="section-heading compact-heading"><span className="eyebrow">Perché GuestFlow</span><h2>Vendiamo l’implementazione, non il mal di testa del software.</h2></div><div className="value-grid"><article><span className="value-number">01</span><h3>Partiamo da un problema operativo reale</h3><p>Niente bundle generici: ogni sistema è legato a un risultato hospitality preciso.</p></article><article><span className="value-number">02</span><h3>Configuriamo basi tecnologiche solide</h3><p>Adattiamo software maturi ai flussi reali della struttura.</p></article><article><span className="value-number">03</span><h3>Consegniamo qualcosa di utilizzabile</h3><p>Scope, documentazione, proprietà e supporto opzionale sono chiari prima del lancio.</p></article></div></section>

    <section className="featured-offer featured-premium"><div className="featured-copy"><span className="eyebrow light-eyebrow">Sistema in evidenza</span><h2>Repeat Guest Engine</h2><p className="featured-kicker">Trasforma lo storico ospiti che possiedi già in un canale strutturato di prenotazioni di ritorno.</p><p>Mappiamo un export PMS/CSV pulito, separiamo i contatti idonei al marketing, creiamo segmenti utili e configuriamo tre automazioni: post-soggiorno, win-back e riattivazione bassa stagione.</p><div className="feature-points dark-points"><span>Mappatura CSV / PMS</span><span>Segmentazione</span><span>Post-stay</span><span>Win-back</span><span>Bassa stagione</span><span>Reporting</span></div><div className="hero-actions"><Link className="primary light-primary" href="/it/repeat-guest-engine">Vedi il sistema</Link><Link className="ghost-link" href="/repeat-guest-engine/demo">Apri la demo →</Link></div></div><aside className="pricing-panel"><div className="pricing-label">Pacchetto lancio</div><div className="pricing-amount">€990</div><p>Una struttura · mappatura database · segmentazione · tre automazioni · reporting · handover staff.</p><div className="pricing-divider"/><div className="pricing-label">Gestione opzionale</div><div className="pricing-monthly">€129<span>/mese</span></div><p>Monitoraggio, ottimizzazione campagne, segmenti e supporto operativo.</p><Link className="pricing-cta" href="/buy/repeat-guest-engine">Acquista setup — €990</Link><Link className="pricing-secondary" href="/it/request-setup?product=repeat-guest-engine">Preferisci una valutazione prima?</Link></aside></section>

    <section className="products-section" id="systems"><div className="section-heading"><span className="eyebrow">Sistemi GuestFlow</span><h2>Quattro sistemi. Quattro risultati operativi chiari.</h2><p>Parti da un solo collo di bottiglia. Espandi quando il primo sistema funziona.</p></div><div className="product-grid">{systems.map(s => <article className="product-card" key={s.href}><div className="product-topline"><span className="badge">{s.area}</span><strong className="price">{s.price}</strong></div><h3>{s.product}</h3><p className="description">{s.title}</p><div className="card-actions"><Link className="buy-button button-link" href={`/buy/${s.id}`}>Acquista setup</Link><Link className="buy-button secondary-button button-link" href={s.href}>Vedi offerta</Link></div><p className="card-payment-note">Checkout sicuro Stripe. Puoi leggere il perimetro completo prima di acquistare.</p></article>)}</div></section>

    <section className="how-it-works" id="process"><div className="section-heading"><span className="eyebrow">Processo</span><h2>Valuta. Configura. Lancia.</h2><p>La prima implementazione resta volutamente semplice e trasparente.</p></div><div className="steps"><div><b>01</b><h3>Valutazione setup</h3><p>Struttura, stack attuale, database/canali e problema operativo.</p></div><div><b>02</b><h3>Implementazione</h3><p>Configuriamo il flusso concordato e lo testiamo.</p></div><div><b>03</b><h3>Handover</h3><p>Consegniamo il sistema funzionante, note operative e percorso di supporto.</p></div></div></section>

    <section className="faq-section" id="faq"><div className="section-heading compact-heading"><span className="eyebrow">FAQ</span><h2>Prima di richiedere un setup.</h2></div><div className="faq-grid"><details><summary>Devo sostituire il mio PMS?</summary><p>No. Valutiamo prima ciò che usi già e se il sistema GuestFlow può affiancarlo.</p></details><details><summary>Serve subito il database ospiti?</summary><p>No. Nella prima valutazione bastano fonte, dimensione approssimativa e struttura dei dati.</p></details><details><summary>Il canone mensile è obbligatorio?</summary><p>No. Il pacchetto di lancio è separato. Il supporto gestito è opzionale salvo esigenze infrastrutturali specifiche.</p></details><details><summary>Posso partire da un solo sistema?</summary><p>Sì, ed è l’approccio consigliato.</p></details></div></section>

    <section className="final-cta"><span className="eyebrow light-eyebrow">GuestFlow Systems</span><h2>Dicci il collo di bottiglia. Ti diciamo cosa installare.</h2><p>Nessuna password, dato di pagamento o dato ospite è richiesto nella prima valutazione.</p><Link className="primary light-primary primary-large" href="/it/request-setup">Richiedi una valutazione</Link></section>
  </main>;
}

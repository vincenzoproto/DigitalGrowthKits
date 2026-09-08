import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const offers = {
  "guest-inbox-pro": {
    name: "Guest Inbox Pro", eyebrow: "Messaggistica hospitality", price: "€690", monthly: "€79/mese supporto gestito",
    title: "Tutti i messaggi degli ospiti. Un’unica inbox operativa.",
    lead: "Centralizza i canali supportati, organizza richieste e lead di prenotazione e dà al team un solo posto in cui rispondere.",
    outcome: "Meno richieste perse e meno conversazioni sparse tra strumenti diversi.",
    included: ["Installazione e configurazione iniziale", "Struttura inbox per hotel/B&B", "Etichette, routing e workflow", "Configurazione chat sito ed email", "Onboarding canali supportati", "Handover staff"],
  },
  "digital-guest-concierge": {
    name: "Digital Guest Concierge", eyebrow: "Esperienza ospite mobile", price: "€490", monthly: "Nessuna app richiesta",
    title: "Metti tutte le informazioni del soggiorno in un unico spazio brandizzato.",
    lead: "Un portale mobile-first accessibile via QR code con informazioni, servizi, link utili e opportunità di upsell.",
    outcome: "Meno domande ripetitive e un percorso ospite più chiaro.",
    included: ["Portale brandizzato", "Informazioni soggiorno strutturate", "Link ai servizi", "Accesso QR", "Struttura multilingua", "Handover"],
  },
  "repeat-guest-engine": {
    name: "Repeat Guest Engine", eyebrow: "Riattivazione database ospiti", price: "€690 Founder", monthly: "Primi 3 setup · poi €990 · gestione opzionale €129/mese",
    title: "Trasforma lo storico ospiti in un canale di ritorno diretto.",
    lead: "Partiamo da un export PMS/CSV, separiamo i contatti utilizzabili da quelli da escludere e configuriamo tre flussi: post-stay, win-back e riattivazione bassa stagione.",
    outcome: "Un sistema repeat-booking operativo, misurabile e gestibile dal team invece di uno storico ospiti fermo nel gestionale.",
    included: ["Mappatura database", "Segmentazione e soppressioni", "Automazione post-stay", "Automazione win-back", "Campagna bassa stagione", "Reporting + handover staff"],
  },
  "direct-booking-engine": {
    name: "Direct Booking Engine", eyebrow: "Infrastruttura prenotazioni dirette", price: "€1.490", monthly: "Costi terze parti separati",
    title: "Crea un percorso di prenotazione che appartiene alla tua struttura.",
    lead: "Sito e flusso di prenotazione configurati per ridurre la dipendenza esclusiva dalle OTA e rendere più chiara la vendita diretta.",
    outcome: "Un percorso diretto più semplice da capire e utilizzare per l’ospite.",
    included: ["Struttura sito struttura", "Pagine camere", "Configurazione flusso booking", "Setup inventario supportato", "Percorso prenotazione", "Handover e responsabilità documentate"],
  },
} as const;

type Slug = keyof typeof offers;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers[slug as Slug];
  if (!offer) return {};
  return { title: `${offer.name} | GuestFlow Systems`, description: offer.lead, alternates: { canonical: `/it/${slug}`, languages: { it: `/it/${slug}`, en: `/${slug}` } } };
}

export default async function ItalianProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offers[slug as Slug];
  if (!offer) notFound();
  const isRepeatGuest = slug === "repeat-guest-engine";

  return <main className="product-shell">
    <Link href="/it" className="back-link">← GuestFlow Systems</Link>

    <section className="product-hero"><div>
      <span className="eyebrow">{offer.eyebrow}</span><h1>{offer.title}</h1><p className="lead">{offer.lead}</p>
      <div className="hero-actions">
        {isRepeatGuest ? <Link className="primary primary-large" href="/repeat-guest-engine/demo">Prova la demo con un CSV →</Link> : <Link className="primary primary-large" href={`/it/request-setup?product=${slug}`}>Richiedi setup</Link>}
        <Link className="secondary-link" href={`/it/request-setup?product=${slug}`}>{isRepeatGuest ? "Prenota la valutazione di 15 min →" : "Apri richiesta →"}</Link>
      </div>
      {isRepeatGuest && <p style={{marginTop:14,fontSize:13,opacity:.72}}>La demo usa dati sintetici o il CSV che scegli tu nel browser. Il file non viene inviato a GuestFlow Systems e dalla demo non parte alcuna comunicazione agli ospiti.</p>}
    </div><aside className="product-price-card"><span className="eyebrow light-eyebrow">{isRepeatGuest ? "Founder launch" : "Pacchetto lancio"}</span><div className="big-price">{offer.price}</div><p>{offer.monthly}</p></aside></section>

    {isRepeatGuest && <section className="product-section">
      <span className="eyebrow">Vedi prima di acquistare</span><h2>Dal CSV ai segmenti in pochi secondi.</h2>
      <p className="lead">Apri la demo, carica un CSV di prova e verifica come vengono separati contatti idonei, recenti, dormienti, low-season, high-value e soppressi. È il primo passaggio del setup reale.</p>
      <div className="hero-actions"><Link className="primary primary-large" href="/repeat-guest-engine/demo">Apri demo interattiva</Link><Link className="secondary-link" href="/it/request-setup?product=repeat-guest-engine">Valutiamo il tuo PMS →</Link></div>
    </section>}

    <section className="product-section"><span className="eyebrow">Risultato operativo</span><h2>{offer.outcome}</h2><div className="feature-grid-3">{offer.included.map((item, i)=><div className="feature-box" key={item}><span className="value-number">0{i+1}</span><h3>{item}</h3><p>Configurato sulla base dello stack e del perimetro concordato con la struttura.</p></div>)}</div></section>

    <section className="product-section"><span className="eyebrow">Come lavoriamo</span><h2>Prima verifichiamo fattibilità e dati. Poi configuriamo.</h2><div className="steps"><div><b>01</b><h3>Valutazione</h3><p>PMS/CSV, dimensione database, booking path, lingue e regole marketing.</p></div><div><b>02</b><h3>Configurazione</h3><p>Import di test, segmenti, soppressioni, tre automazioni e QA.</p></div><div><b>03</b><h3>Consegna</h3><p>Reporting, documentazione, responsabilità e handover operativo.</p></div></div></section>

    {isRepeatGuest && <section className="product-section">
      <span className="eyebrow">Founder offer</span><h2>€690 una tantum per i primi 3 setup qualificati.</h2>
      <p className="lead">Include una struttura, mappatura dati, segmentazione, tre automazioni core, reporting e handover. Hosting/VPS, provider email o SMS e altri servizi di terze parti restano separati. Prima del pagamento confermiamo che il tuo stack sia compatibile e definiamo il perimetro.</p>
      <div className="hero-actions"><Link className="primary primary-large" href="/it/request-setup?product=repeat-guest-engine">Richiedi la valutazione</Link><a className="secondary-link" href="https://book.stripe.com/aFafZheYd6j28lu38KabK06">Già qualificato? Blocca lo slot →</a></div>
      <p style={{marginTop:12,fontSize:13,opacity:.72}}>Il checkout è destinato a strutture che hanno già confermato con noi fattibilità e scope.</p>
    </section>}

    <section className="product-section"><span className="eyebrow">Dati e responsabilità</span><h2>Non trasformiamo uno storico ospiti in una lista spam.</h2><p className="lead">I contatti promozionali vengono trattati solo secondo le regole e le basi dichiarate dalla struttura. Contatti soppressi o disiscritti restano esclusi; messaggi transazionali e marketing vengono gestiti separatamente.</p></section>
  </main>;
}

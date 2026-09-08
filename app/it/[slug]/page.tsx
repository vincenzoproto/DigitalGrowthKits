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
    name: "Repeat Guest Engine", eyebrow: "Riattivazione database ospiti", price: "€990", monthly: "€129/mese gestione opzionale",
    title: "Trasforma i soggiorni passati in ricavi diretti.",
    lead: "Mappiamo un export PMS/CSV, segmentiamo i contatti idonei e configuriamo automazioni post-stay, win-back e bassa stagione.",
    outcome: "Un canale repeat booking strutturato invece di uno storico ospiti inutilizzato.",
    included: ["Mappatura database", "Segmentazione ospiti", "Automazione post-stay", "Automazione win-back", "Campagna bassa stagione", "Reporting e handover"],
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
  const hasDemo = slug !== "digital-guest-concierge" ? slug !== "direct-booking-engine" ? true : true : true;
  return <main className="product-shell">
    <Link href="/it" className="back-link">← GuestFlow Systems</Link>
    <section className="product-hero"><div><span className="eyebrow">{offer.eyebrow}</span><h1>{offer.title}</h1><p className="lead">{offer.lead}</p><div className="hero-actions"><Link className="primary primary-large" href={`/it/request-setup?product=${slug}`}>Richiedi setup</Link>{hasDemo && <Link className="secondary-link" href={`/${slug}/demo`}>Apri demo →</Link>}</div></div><aside className="product-price-card"><span className="eyebrow light-eyebrow">Pacchetto lancio</span><div className="big-price">{offer.price}</div><p>{offer.monthly}</p></aside></section>
    <section className="product-section"><span className="eyebrow">Risultato operativo</span><h2>{offer.outcome}</h2><div className="feature-grid-3">{offer.included.map((item, i)=><div className="feature-box" key={item}><span className="value-number">0{i+1}</span><h3>{item}</h3><p>Configurato sulla base dello stack e del perimetro concordato con la struttura.</p></div>)}</div></section>
    <section className="product-section"><span className="eyebrow">Come lavoriamo</span><h2>Prima definiamo lo scope. Poi configuriamo.</h2><div className="steps"><div><b>01</b><h3>Valutazione</h3><p>Capire struttura, strumenti attuali e obiettivo.</p></div><div><b>02</b><h3>Configurazione</h3><p>Implementare e testare il flusso concordato.</p></div><div><b>03</b><h3>Consegna</h3><p>Handover, responsabilità e supporto opzionale.</p></div></div><div className="hero-actions"><Link className="primary primary-large" href={`/it/request-setup?product=${slug}`}>Richiedi una valutazione</Link></div></section>
  </main>;
}

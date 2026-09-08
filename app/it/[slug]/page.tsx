import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

const offers = {
  "guest-inbox-pro": {
    name: "Guest Inbox Pro", eyebrow: "Messaggistica hospitality", price: "€690", monthly: "€79/mese supporto gestito",
    title: "I messaggi degli ospiti, in un’unica inbox per il tuo team.",
    lead: "Guest Inbox Pro centralizza chat del sito, email e canali supportati. Configuriamo etichette, assegnazioni e risposte salvate per gestire richieste di prenotazione, check-in e assistenza da un unico spazio.",
    outcome: "Meno richieste perse e meno conversazioni sparse tra strumenti diversi.",
    included: ["Installazione e configurazione iniziale", "Struttura inbox per hotel/B&B", "Etichette, routing e workflow", "Configurazione chat sito ed email", "Onboarding canali supportati", "Handover staff"],
  },
  "digital-guest-concierge": {
    name: "Digital Guest Concierge", eyebrow: "Esperienza ospite mobile", price: "€490", monthly: "Nessuna app richiesta",
    title: "La guida digitale del tuo hotel, a portata di QR code.",
    lead: "Digital Guest Concierge raccoglie informazioni sul soggiorno, servizi e contatti in un portale che si apre dal telefono. Gli ospiti trovano ciò che serve senza installare un’app.",
    outcome: "Meno domande ripetitive e un percorso ospite più chiaro.",
    included: ["Portale brandizzato", "Informazioni soggiorno strutturate", "Link ai servizi", "Accesso QR", "Struttura multilingua", "Handover"],
  },
  "repeat-guest-engine": {
    name: "Repeat Guest Engine", eyebrow: "Riattivazione database ospiti", price: "€690 Founder", monthly: "Primi 3 setup · poi €990 · gestione opzionale €129/mese",
    title: "Riattiva gli ospiti passati del tuo hotel o B&B.",
    lead: "Repeat Guest Engine parte da un export PMS/CSV. Separiamo i contatti utilizzabili da quelli da escludere e configuriamo tre flussi: post-soggiorno, ritorno degli ospiti inattivi e riattivazione in bassa stagione.",
    outcome: "Un sistema repeat-booking operativo, misurabile e gestibile dal team invece di uno storico ospiti fermo nel gestionale.",
    included: ["Mappatura database", "Segmentazione e soppressioni", "Automazione post-stay", "Automazione win-back", "Campagna bassa stagione", "Reporting + handover staff"],
  },
  "direct-booking-engine": {
    name: "Direct Booking Engine", eyebrow: "Infrastruttura prenotazioni dirette", price: "€1.490", monthly: "Costi terze parti separati",
    title: "Un sito con un percorso chiaro per prenotare direttamente.",
    lead: "Direct Booking Engine collega la presentazione della tua struttura al passaggio di prenotazione. Configuriamo pagine camere e flusso supportato, dopo aver verificato PMS, strumenti di booking e gestione dell’inventario.",
    outcome: "Un percorso diretto più semplice da capire e utilizzare per l’ospite.",
    included: ["Struttura sito struttura", "Pagine camere", "Configurazione flusso booking", "Setup inventario supportato", "Percorso prenotazione", "Handover e responsabilità documentate"],
  },
} as const;

type Slug = keyof typeof offers;

const details = {
  "guest-inbox-pro": {
    seoTitle: "Inbox condivisa per hotel e B&B | Guest Inbox Pro",
    description: "Organizza messaggi, richieste e lead di prenotazione in un’inbox condivisa per hotel e B&B. Configurazione canali supportati, assegnazioni e formazione staff.",
    inputs: "L’elenco dei canali utilizzati, i ruoli del team, le risposte più frequenti e un referente per autorizzare i collegamenti. Gli accessi si condividono durante il setup, con modalità concordate.",
    delivery: "Un’inbox configurata per una struttura, con canali concordati, utenti, etichette, regole di assegnazione e istruzioni operative per lo staff.",
    notFit: "Se cerchi una reception esterna che risponda al posto tuo, questo pacchetto non la include. Verifichiamo prima anche i canali: non tutte le piattaforme consentono lo stesso tipo di collegamento.",
    steps: [
      ["Verifica dei canali", "Rivediamo chat, email, strumenti attuali e chi gestisce ogni tipo di richiesta."],
      ["Configurazione", "Colleghiamo i canali concordati e prepariamo utenti, etichette e assegnazioni."],
      ["Prova e consegna", "Verifichiamo il percorso di una richiesta e mostriamo allo staff come gestirla."],
    ],
    includedDetails: ["Installazione della piattaforma e definizione degli accessi del team.", "Organizzazione delle conversazioni intorno a reception e prenotazioni.", "Regole per distinguere richieste commerciali, arrivi e problemi durante il soggiorno.", "Collegamento dei canali concordati dopo la verifica di compatibilità.", "Onboarding dei servizi compatibili; eventuali costi API restano separati.", "Istruzioni per assegnare, rispondere e chiudere una conversazione."],
  },
  "digital-guest-concierge": {
    seoTitle: "Concierge digitale per hotel e B&B | Guida con QR",
    description: "Una guida digitale per gli ospiti di hotel e B&B: check-in, Wi-Fi, servizi e contatti da QR code. Portale personalizzato sulla tua struttura, senza app.",
    inputs: "Logo, orari, regole, informazioni di arrivo, servizi, contatti e link già utilizzati. Indichi le lingue necessarie e approvi testi e traduzioni prima della pubblicazione.",
    delivery: "Un portale mobile per una struttura, con sezioni soggiorno, servizi, contatti, accesso QR e istruzioni per l’aggiornamento.",
    notFit: "Se ti serve un operatore disponibile 24 ore su 24 o una nuova app da scaricare, il portale non sostituisce questi servizi. Le richieste degli ospiti restano gestite dai contatti indicati dalla struttura.",
    steps: [
      ["Raccolta contenuti", "Rivediamo informazioni, servizi, lingue e domande frequenti degli ospiti."],
      ["Configurazione", "Organizziamo le pagine per telefono e colleghiamo servizi, contatti e QR code."],
      ["Prova e consegna", "Controlli testi e link; consegniamo il portale e le istruzioni di aggiornamento."],
    ],
    includedDetails: ["Logo e identità della struttura applicati alla guida digitale.", "Check-in, check-out, Wi-Fi e regole organizzati in sezioni facili da trovare.", "Accesso alle informazioni e ai contatti per i servizi disponibili nella struttura.", "Un punto di accesso da distribuire agli ospiti, collegato alla guida online.", "Organizzazione delle lingue concordate, con contenuti approvati dalla struttura.", "Istruzioni per mantenere aggiornate informazioni e collegamenti."],
  },
  "repeat-guest-engine": {
    seoTitle: "Riattivazione ospiti per hotel | Repeat Guest Engine",
    description: "Riattiva i contatti idonei del tuo hotel o B&B: segmentazione del database ospiti e flussi post-soggiorno, ritorno e bassa stagione. Prova la demo CSV.",
    inputs: "Un export del PMS o un CSV con i campi disponibili, le informazioni sullo stato marketing e le esclusioni, il link di prenotazione e le lingue. Per una prima prova usa i dati dimostrativi della demo.",
    delivery: "Mappatura dati, segmenti, regole di esclusione, tre automazioni, reporting e istruzioni per una struttura. Hosting e provider di invio restano separati.",
    notFit: "Se non hai uno storico utilizzabile o non puoi identificare i contatti idonei, prima va risolto quel passaggio. Il setup non include liste acquistate e non garantisce un numero di prenotazioni.",
    steps: [
      ["Valutazione", "Verifichiamo export, dati disponibili, percorso di prenotazione e regole di contatto."],
      ["Configurazione", "Eseguiamo un import di prova e prepariamo segmenti, esclusioni e tre automazioni."],
      ["Prova e consegna", "Controlliamo i flussi e consegniamo reporting, documentazione e istruzioni allo staff."],
    ],
    includedDetails: ["Collegamento dei campi disponibili: email, soggiorni, lingua e stato marketing.", "Gruppi di ospiti utili e regole per mantenere esclusi i contatti soppressi.", "Configurazione del percorso dopo il check-out sui dati e canali concordati.", "Riattivazione dei contatti idonei dopo un periodo concordato di inattività.", "Un flusso dedicato agli ospiti rilevanti per le date da promuovere.", "Indicazioni per controllare i risultati e gestire le automazioni con il team."],
  },
  "direct-booking-engine": {
    seoTitle: "Sito e prenotazioni dirette per hotel e B&B",
    description: "Configura il sito e il percorso di prenotazione diretta del tuo hotel o B&B. Pagine camere, inventario supportato e consegna dopo verifica degli strumenti.",
    inputs: "Sito e dominio attuali, foto e informazioni camere, tipologie e occupazione, regole di prenotazione e strumenti PMS/booking. Verifichiamo anche pagamenti e dipendenze dal channel manager.",
    delivery: "Struttura del sito, pagine camere, inventario e percorso di prenotazione supportati, configurazione di lancio e istruzioni operative per il proprietario.",
    notFit: "Se la connessione al tuo PMS o channel manager non è supportata, definiamo prima un’alternativa. Il setup da solo non porta traffico e non comprende campagne pubblicitarie o prenotazioni garantite.",
    steps: [
      ["Verifica strumenti", "Rivediamo sito, camere, PMS, booking, pagamenti e dipendenze esistenti."],
      ["Configurazione", "Prepariamo le pagine e il percorso di prenotazione entro il perimetro concordato."],
      ["Prova e consegna", "Verifichiamo il percorso e documentiamo accessi, gestione e responsabilità."],
    ],
    includedDetails: ["Pagine principali organizzate intorno a camere, soggiorno, posizione e contatti.", "Informazioni su tipologie, dotazioni e occupazione con inviti chiari a prenotare.", "Configurazione del percorso consentito dagli strumenti concordati.", "Impostazione delle camere e delle regole previste dalla piattaforma scelta.", "Controllo dei passaggi dalla pagina della camera alla prenotazione.", "Accessi, istruzioni e responsabilità su hosting, pagamenti e manutenzione documentati."],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers[slug as Slug];
  if (!offer) return {};
  const detail = details[slug as Slug];
  return createPageMetadata({ path: `/it/${slug}`, title: detail.seoTitle, description: detail.description });
}

export default async function ItalianProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = offers[slug as Slug];
  if (!offer) notFound();
  const isRepeatGuest = slug === "repeat-guest-engine";
  const detail = details[slug as Slug];

  return <main className="product-shell">
    <Link href="/it" className="back-link">← GuestFlow Systems</Link>

    <section className="product-hero"><div>
      <span className="eyebrow">{offer.eyebrow}</span><h1>{offer.title}</h1><p className="lead">{offer.lead}</p>
      <div className="hero-actions">
        {isRepeatGuest ? <Link className="primary primary-large" href="/repeat-guest-engine/demo">Prova la demo con un CSV →</Link> : <Link className="primary primary-large" href={`/it/request-setup?product=${slug}`}>Richiedi setup</Link>}
        <Link className="secondary-link" href={isRepeatGuest ? `/it/request-setup?product=${slug}` : `/${slug}/demo`}>{isRepeatGuest ? "Richiedi la valutazione di 15 min →" : "Guarda la demo →"}</Link>
      </div>
      {isRepeatGuest && <p style={{marginTop:14,fontSize:13,opacity:.72}}>La demo usa dati sintetici o il CSV che scegli tu nel browser. Il file non viene inviato a GuestFlow Systems e dalla demo non parte alcuna comunicazione agli ospiti.</p>}
    </div><aside className="product-price-card"><span className="eyebrow light-eyebrow">{isRepeatGuest ? "Founder launch" : "Pacchetto lancio"}</span><div className="big-price">{offer.price}</div><p>{offer.monthly}</p></aside></section>

    {isRepeatGuest && <section className="product-section">
      <span className="eyebrow">Vedi prima di acquistare</span><h2>Dal CSV ai segmenti ospiti.</h2>
      <p className="lead">Apri la demo con i dati dimostrativi o un CSV di prova e osserva come vengono separati contatti idonei, recenti, inattivi, di bassa stagione, di maggior valore e soppressi. È il primo passaggio del setup reale.</p>
      <div className="hero-actions"><Link className="primary primary-large" href="/repeat-guest-engine/demo">Apri demo interattiva</Link><Link className="secondary-link" href="/it/request-setup?product=repeat-guest-engine">Valutiamo il tuo PMS →</Link></div>
    </section>}

    <section className="product-section"><span className="eyebrow">Risultato operativo</span><h2>{offer.outcome}</h2><div className="feature-grid-3">{offer.included.map((item, i)=><div className="feature-box" key={item}><span className="value-number">0{i+1}</span><h3>{item}</h3><p>{detail.includedDetails[i]}</p></div>)}</div></section>

    <section className="product-section"><span className="eyebrow">Prima di iniziare</span><h2>È adatto alla tua struttura?</h2><div className="feature-grid-3">
      <div className="feature-box"><h3>Cosa serve da te</h3><p>{detail.inputs}</p></div>
      <div className="feature-box"><h3>Cosa ricevi</h3><p>{detail.delivery}</p></div>
      <div className="feature-box"><h3>Quando valutare altro</h3><p>{detail.notFit}</p></div>
    </div></section>

    <section className="product-section"><span className="eyebrow">Come lavoriamo</span><h2>Verifica, configurazione, consegna.</h2><div className="steps">{detail.steps.map(([title, description], i)=><div key={title}><b>0{i+1}</b><h3>{title}</h3><p>{description}</p></div>)}</div><div className="hero-actions"><Link className="primary primary-large" href={`/it/request-setup?product=${slug}`}>Valuta il setup per la tua struttura →</Link><Link className="secondary-link" href="/it/audit">Non sai da dove partire? Fai l’audit gratuito →</Link></div></section>

    {isRepeatGuest && <section className="product-section">
      <span className="eyebrow">Founder offer</span><h2>€690 una tantum per i primi 3 setup qualificati.</h2>
      <p className="lead">Include una struttura, mappatura dati, segmentazione, tre automazioni core, reporting e handover. Hosting/VPS, provider email o SMS e altri servizi di terze parti restano separati. Prima del pagamento confermiamo che il tuo stack sia compatibile e definiamo il perimetro.</p>
      <div className="hero-actions"><Link className="primary primary-large" href="/it/request-setup?product=repeat-guest-engine">Richiedi la valutazione</Link><a className="secondary-link" href="/buy/repeat-guest-engine-founder">Già qualificato? Blocca lo slot →</a></div>
      <p style={{marginTop:12,fontSize:13,opacity:.72}}>Il checkout è destinato a strutture che hanno già confermato con noi fattibilità e scope.</p>
    </section>}

    {isRepeatGuest && <section className="product-section"><span className="eyebrow">Dati e responsabilità</span><h2>Regole di contatto concordate prima dell’invio.</h2><p className="lead">I contatti promozionali vengono trattati solo secondo le regole e le basi dichiarate dalla struttura. Contatti soppressi o disiscritti restano esclusi; messaggi transazionali e marketing vengono gestiti separatamente.</p></section>}
  </main>;
}

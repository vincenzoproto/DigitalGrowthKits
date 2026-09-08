import Link from "next/link";
import { Suspense } from "react";
import RequestSetupFormIt from "./RequestSetupFormIt";

export default function RequestSetupItalianPage(){
  return <main className="setup-shell">
    <Link href="/it" className="back-link">← GuestFlow Systems</Link>
    <section className="setup-hero"><div><span className="eyebrow">Valutazione setup</span><h1>Dicci il problema. Ti indichiamo il sistema giusto.</h1><p>Invia le informazioni base della struttura e lo stack attuale. Definiamo il perimetro prima di qualsiasi installazione o accesso ai dati.</p></div><aside className="setup-side-note"><strong>Nessuna preparazione tecnica richiesta.</strong><p>Partiamo dall’obiettivo e dagli strumenti che utilizzi già.</p></aside></section>
    <Suspense fallback={<p>Caricamento modulo…</p>}><RequestSetupFormIt/></Suspense>
  </main>;
}

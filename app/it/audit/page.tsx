import type { Metadata } from "next";
import Link from "next/link";
import AuditCalculator from "../../audit/AuditCalculator";

export const metadata: Metadata = {
  title: "Repeat Revenue Audit | GuestFlow Systems",
  description: "Audit gratuito di 2 minuti per capire se il tuo hotel o B&B è pronto a riattivare lo storico ospiti e costruire un flusso di repeat booking.",
  alternates: { canonical: "/it/audit", languages: { en: "/audit", it: "/it/audit" } },
};

export default function ItalianAuditPage(){
  return <main className="audit-page">
    <section className="audit-hero">
      <div><span className="eyebrow">Repeat Revenue Audit</span><h1>Il tuo database ospiti sta facendo davvero lavoro commerciale?</h1><p>Inserisci pochi dati non sensibili e scopri se Repeat Guest Engine è adatto alla tua struttura. Nessuna password. Nessun dato ospite. Nessuna promessa di ricavi.</p><div className="hero-actions"><a className="text-link" href="#audit">Inizia l'audit di 2 minuti ↓</a><Link className="secondary-link" href="/repeat-guest-engine/demo">Vedi la demo</Link></div></div>
      <aside className="audit-proof"><b>Cosa valuta</b><span>Volume dello storico ospiti</span><span>Campagne di riattivazione attuali</span><span>Prontezza per prenotazioni dirette</span><span>Bisogno di riempire periodi deboli</span><small>Non calcola ricavi garantiti.</small></aside>
    </section>
    <section id="audit" className="audit-section"><AuditCalculator lang="it"/></section>
    <section className="audit-explain"><div><span className="eyebrow">Perché conta</span><h2>La struttura ha già pagato una volta per acquisire questi ospiti.</h2></div><div className="audit-explain-grid"><article><b>01</b><h3>Trova l'asset dormiente</h3><p>Lo storico diventa utile solo quando la struttura distingue i contatti idonei e li organizza in segmenti utili.</p></article><article><b>02</b><h3>Testa un flusso controllato</h3><p>Parti da post-stay, win-back o bassa stagione invece di mandare la stessa offerta a tutti.</p></article><article><b>03</b><h3>Misura prima di scalare</h3><p>Monitora consegna, click e azioni di prenotazione diretta attribuibili quando tecnicamente possibile, senza inventare causalità.</p></article></div></section>
  </main>;
}

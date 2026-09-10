"use client";

import Link from "next/link";
import { useId, useState } from "react";

const copy = {
  it: {
    eyebrow: "Prova il percorso",
    title: "Dal database alla prima campagna.",
    intro: "Esplora un esempio di Repeat Guest Engine in tre passaggi: organizza lo storico, scegli un gruppo e prepara il messaggio.",
    example: "Demo · dati di esempio",
    disclosure: "Numeri inventati per illustrare il flusso, non risultati di clienti. Questa demo non importa contatti e non invia email.",
    stepsLabel: "Passaggi della demo",
    steps: [
      { name: "Database", detail: "Organizza lo storico" },
      { name: "Segmento", detail: "Scegli a chi scrivere" },
      { name: "Campagna", detail: "Prepara il messaggio" },
    ],
    stepLabel: "Passaggio",
    of: "di",
    back: "Indietro",
    next: "Passaggio successivo",
    restart: "Rivedi dall’inizio",
    databaseTitle: "Un export diventa una base ordinata.",
    databaseBody: "Colleghiamo i campi del tuo PMS o CSV ai dati necessari per organizzare lo storico. In questo esempio:",
    metrics: [
      { value: "1.200", label: "righe nell’export" },
      { value: "1.080", label: "contatti dopo i duplicati" },
      { value: "840", label: "contatti idonei nell’esempio" },
    ],
    mappingTitle: "Esempio di mappatura",
    source: "Campo nel file",
    destination: "Come viene usato",
    mapping: [
      ["last_stay", "Data dell’ultimo soggiorno"],
      ["language", "Lingua del messaggio"],
      ["marketing_status", "Idoneità alle comunicazioni"],
    ],
    eligibility: "120 righe duplicate vengono rimosse; altri 240 contatti restano esclusi per idoneità mancante o non confermata. Per una campagna reale, l’idoneità va verificata prima dell’invio.",
    segmentTitle: "Un gruppo preciso, un messaggio pertinente.",
    segmentBody: "Tra gli 840 contatti idonei dell’esempio, selezioniamo un gruppo per una proposta di ritorno.",
    segmentName: "Ospiti da riattivare",
    segmentCount: "180",
    segmentCountLabel: "contatti di esempio nel segmento",
    criteriaTitle: "Tutte queste condizioni",
    criteria: [
      "Ultimo soggiorno tra 12 e 24 mesi fa",
      "Nessuna prenotazione futura registrata",
      "Lingua preferita: italiano",
      "Idoneità marketing confermata nell’esempio",
    ],
    segmentNote: "Il segmento è una parte degli 840 contatti, non un nuovo elenco aggiunto. Criteri e numero cambiano in base ai dati della struttura.",
    campaignTitle: "Una bozza da rivedere prima di attivarla.",
    campaignBody: "Il segmento alimenta il flusso concordato. Testo, offerta e destinatari vengono controllati prima del lancio.",
    draft: "Anteprima email · bozza",
    subjectLabel: "Oggetto",
    subject: "Ti va di tornare per una pausa?",
    greeting: "Ciao,",
    email: "stiamo preparando i prossimi soggiorni e ci farebbe piacere riaverti con noi. Se stai pensando a qualche giorno di pausa, rispondi con le date che preferisci: ti invieremo una proposta.",
    signature: "Il team della struttura",
    unsubscribe: "Gestisci le preferenze o annulla l’iscrizione",
    workflowTitle: "Flusso di esempio",
    workflow: [
      "Controllo finale di destinatari e bozza",
      "Invio solo dopo l’approvazione della struttura",
      "Dopo 5 giorni: eventuale follow-up, escludendo risposte, prenotazioni e disiscrizioni",
    ],
    closingTitle: "Come si applica alla tua struttura?",
    closingBody: "Parti dall’audit gratuito. Per la prima valutazione bastano informazioni generali, senza caricare il database ospiti.",
    audit: "Fai l’audit gratuito",
    setup: "Valuta il setup",
  },
  en: {
    eyebrow: "Explore the workflow",
    title: "From guest history to a campaign.",
    intro: "Try a three-step Repeat Guest Engine example: organise the database, choose a group and prepare the message.",
    example: "Demo · sample data",
    disclosure: "Invented numbers illustrate the workflow, not customer results. This demo does not import contacts or send emails.",
    stepsLabel: "Demo steps",
    steps: [
      { name: "Database", detail: "Organise guest history" },
      { name: "Segment", detail: "Choose your audience" },
      { name: "Campaign", detail: "Prepare the message" },
    ],
    stepLabel: "Step",
    of: "of",
    back: "Back",
    next: "Next step",
    restart: "Start again",
    databaseTitle: "An export becomes an organised database.",
    databaseBody: "We map the fields in your PMS or CSV to the information needed to organise guest history. In this example:",
    metrics: [
      { value: "1,200", label: "rows in the export" },
      { value: "1,080", label: "contacts after deduplication" },
      { value: "840", label: "eligible sample contacts" },
    ],
    mappingTitle: "Example field mapping",
    source: "Source field",
    destination: "How it is used",
    mapping: [
      ["last_stay", "Date of the last stay"],
      ["language", "Message language"],
      ["marketing_status", "Marketing eligibility"],
    ],
    eligibility: "120 duplicate rows are removed; another 240 contacts remain excluded because eligibility is missing or unconfirmed. For a real campaign, eligibility must be checked before sending.",
    segmentTitle: "A specific audience, a relevant message.",
    segmentBody: "From the 840 eligible sample contacts, we select a group for a return-stay invitation.",
    segmentName: "Past guests to reconnect with",
    segmentCount: "180",
    segmentCountLabel: "sample contacts in this segment",
    criteriaTitle: "All of these conditions",
    criteria: [
      "Last stay between 12 and 24 months ago",
      "No future booking recorded",
      "Preferred language: English",
      "Marketing eligibility confirmed in the example",
    ],
    segmentNote: "This segment is a subset of the 840 contacts, not an additional list. Criteria and counts depend on the property’s data.",
    campaignTitle: "A draft to review before activation.",
    campaignBody: "The segment feeds the agreed workflow. Copy, offer and recipients are checked before launch.",
    draft: "Email preview · draft",
    subjectLabel: "Subject",
    subject: "Thinking about another stay?",
    greeting: "Hello,",
    email: "we’re preparing for the coming season and would love to welcome you back. If you’re thinking about a short break, reply with your preferred dates and we’ll send you a proposal.",
    signature: "The property team",
    unsubscribe: "Manage preferences or unsubscribe",
    workflowTitle: "Example workflow",
    workflow: [
      "Final review of recipients and draft",
      "Send only after the property approves",
      "After 5 days: an optional follow-up, excluding replies, bookings and unsubscribes",
    ],
    closingTitle: "What would this look like for your property?",
    closingBody: "Start with the free audit. The first review only needs general information, without uploading your guest database.",
    audit: "Take the free audit",
    setup: "Review the setup",
  },
};

export default function GuidedDemo({ locale }: { locale: "it" | "en" }) {
  const [step, setStep] = useState(0);
  const id = useId();
  const t = copy[locale];
  const prefix = locale === "it" ? "/it" : "";
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;
  const panelHeadingId = `${id}-panel-heading`;

  return (
    <section className="guided-demo" id="guided-demo" aria-labelledby={headingId}>
      <div className="section-heading guided-demo-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 id={headingId}>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="guided-demo-frame">
        <div className="guided-demo-disclosure">
          <span className="guided-demo-badge">{t.example}</span>
          <p>{t.disclosure}</p>
        </div>

        <div className="guided-demo-steps" role="group" aria-label={t.stepsLabel}>
          {t.steps.map((item, index) => (
            <button
              key={item.name}
              className="guided-demo-step"
              type="button"
              aria-pressed={step === index}
              aria-controls={panelId}
              onClick={() => setStep(index)}
            >
              <span className="guided-demo-number" aria-hidden="true">0{index + 1}</span>
              <span><strong>{item.name}</strong><small>{item.detail}</small></span>
            </button>
          ))}
        </div>

        <p className="guided-demo-sr-only" role="status">
          {t.stepLabel} {step + 1} {t.of} 3: {t.steps[step].name}
        </p>

        <div className="guided-demo-panel" id={panelId} role="region" aria-labelledby={panelHeadingId}>
          <div className="guided-demo-panel-intro">
            <span className="eyebrow">{t.stepLabel} 0{step + 1} / 03</span>
            <h3 id={panelHeadingId}>{[t.databaseTitle, t.segmentTitle, t.campaignTitle][step]}</h3>
            <p>{[t.databaseBody, t.segmentBody, t.campaignBody][step]}</p>
          </div>

          {step === 0 && (
            <div className="guided-demo-stage">
              <dl className="guided-demo-metrics">
                {t.metrics.map((metric) => (
                  <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
                ))}
              </dl>
              <table className="guided-demo-mapping">
                <caption>{t.mappingTitle}</caption>
                <thead><tr><th scope="col">{t.source}</th><th scope="col">{t.destination}</th></tr></thead>
                <tbody>{t.mapping.map(([source, destination]) => <tr key={source}><th scope="row"><code>{source}</code></th><td>{destination}</td></tr>)}</tbody>
              </table>
              <p className="guided-demo-note">{t.eligibility}</p>
            </div>
          )}

          {step === 1 && (
            <div className="guided-demo-stage">
              <div className="guided-demo-segment">
                <div className="guided-demo-segment-summary">
                  <h4>{t.segmentName}</h4>
                  <strong>{t.segmentCount}</strong>
                  <span>{t.segmentCountLabel}</span>
                </div>
                <div className="guided-demo-criteria">
                  <h4>{t.criteriaTitle}</h4>
                  <ul>{t.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
                </div>
              </div>
              <p className="guided-demo-note">{t.segmentNote}</p>
            </div>
          )}

          {step === 2 && (
            <div className="guided-demo-stage guided-demo-campaign">
              <div className="guided-demo-email">
                <span className="guided-demo-email-label">{t.draft}</span>
                <h4><span>{t.subjectLabel}: </span>{t.subject}</h4>
                <p>{t.greeting}</p>
                <p>{t.email}</p>
                <p>{t.signature}</p>
                <small>{t.unsubscribe}</small>
              </div>
              <div className="guided-demo-workflow">
                <h4>{t.workflowTitle}</h4>
                <ol>{t.workflow.map((action) => <li key={action}>{action}</li>)}</ol>
              </div>
            </div>
          )}

          <div className="guided-demo-controls">
            <button type="button" className="guided-demo-back" onClick={() => setStep(step - 1)} disabled={step === 0} aria-controls={panelId}>{t.back}</button>
            <span aria-hidden="true">{step + 1} / 3</span>
            <button type="button" className="guided-demo-next" onClick={() => setStep(step === 2 ? 0 : step + 1)} aria-controls={panelId}>{step === 2 ? t.restart : t.next}<span aria-hidden="true"> →</span></button>
          </div>
        </div>

        <div className="guided-demo-cta">
          <div><h3>{t.closingTitle}</h3><p>{t.closingBody}</p></div>
          <div className="guided-demo-actions">
            <Link className="primary light-primary" href={`${prefix}/audit`}>{t.audit}</Link>
            <Link className="ghost-link" href={`${prefix}/request-setup?product=repeat-guest-engine`}>{t.setup} →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

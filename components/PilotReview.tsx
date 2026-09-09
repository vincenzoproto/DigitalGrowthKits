"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { buildPilotDraft, getPilotStage, INITIAL_PILOT_ANSWERS, PILOT_CHOICES, PILOT_CONTACT, PILOT_PRICES, type PilotAnswers, type PilotLocale } from "@/lib/pilot-review";
import styles from "./PilotReview.module.css";

const copy = {
  it: {
    eyebrow: "Dalla demo alla tua struttura", title: "Prima capiamo se serve. Poi parliamo di setup.",
    intro: "Tre domande per preparare un confronto di 15 minuti. Nessun database da caricare, nessun acquisto automatico.",
    questions: "Prepara il confronto", goal: "Quale risultato vuoi cercare?", exportReady: "Puoi esportare lo storico ospiti?", eligibility: "Conosci idoneità e disiscrizioni dei contatti?",
    stages: {
      prepare: ["Prima serve preparare la base", "Dalle risposte manca uno dei requisiti. Il confronto serve a chiarire cosa recuperare: non è ancora il momento di acquistare il setup."],
      check: ["Verifichiamo insieme i dati disponibili", "Non è necessario avere tutte le risposte. Nel confronto controlliamo export, campi disponibili e regole di esclusione prima di proporti un servizio."],
      review: ["Possiamo partire da una verifica tecnica", "Le risposte suggeriscono una base da esaminare, non una compatibilità già confermata. Controlliamo PMS, qualità dello storico e regole prima della proposta."],
    },
    offer: "Cosa comprende il setup", oneTime: "una tantum · una struttura",
    included: ["Mappatura dei dati, segmenti e regole di esclusione", "Tre flussi concordati: post-soggiorno, riattivazione e bassa stagione", "Test, vista di reporting e passaggio operativo al personale"],
    managed: "Gestione opzionale", perMonth: "/mese", founder: "Offerta iniziale già prevista", founderNote: "Riservata ai primi 3 setup qualificati. Disponibilità e condizioni da confermare nella proposta: questa pagina non conta né riserva posti.",
    limits: "Costi dei fornitori esterni separati. Compatibilità, tempi e perimetro vengono confermati per iscritto prima del pagamento. Nessuna garanzia di prenotazioni.",
    open: "Prepara l’email per il confronto", copy: "Copia il riepilogo", copied: "Riepilogo copiato. Non è stato inviato.", blocked: "Copia non disponibile. Apri il riepilogo e seleziona il testo manualmente.",
    draft: "Leggi il riepilogo prima di inviare", draftLabel: "Bozza della richiesta, non inviata", delivery: "Il pulsante apre una bozza nella tua app email: completa i campi e premi Invia lì. Non invia richieste e non prenota appuntamenti da solo.",
    local: "Le risposte restano nella pagina fino a quando scegli di copiarle o aprire l’email. Non inserire dati degli ospiti.",
    form: "Preferisci il modulo sul sito?", formNote: "Il modulo si apre separatamente: le risposte qui sopra non vengono trasferite.", privacy: "Informativa privacy", contact: "Destinatario",
  },
  en: {
    eyebrow: "From the demo to your property", title: "Check the fit first. Discuss the setup second.",
    intro: "Three questions to prepare a 15-minute conversation. No guest database upload and no automatic purchase.",
    questions: "Prepare your review", goal: "What would you like to work on?", exportReady: "Can you export your guest history?", eligibility: "Do you have eligibility and unsubscribe information?",
    stages: {
      prepare: ["Prepare the foundation first", "Your answers suggest a missing prerequisite. The conversation can clarify what needs preparing; buying the setup is not the next step yet."],
      check: ["Check the available data together", "You do not need every answer now. We review exports, available fields and exclusions before proposing a service."],
      review: ["Start with a technical review", "Your answers suggest a basis to examine, not confirmed compatibility. We check the PMS, history quality and contact rules before a proposal."],
    },
    offer: "What the setup includes", oneTime: "one time · one property",
    included: ["Data mapping, segments and exclusion rules", "Three agreed flows: post-stay, win-back and low season", "Testing, a reporting view and staff handover"],
    managed: "Optional management", perMonth: "/month", founder: "Existing founder offer", founderNote: "For the first 3 qualified setups. Availability and terms must be confirmed in the proposal; this page does not count or reserve places.",
    limits: "Third-party provider costs are separate. Compatibility, timing and scope are confirmed in writing before payment. No bookings are guaranteed.",
    open: "Prepare the review email", copy: "Copy the summary", copied: "Summary copied. Nothing has been sent.", blocked: "Copy is unavailable. Open the summary and select the text manually.",
    draft: "Read the summary before sending", draftLabel: "Request draft, not sent", delivery: "The button opens a draft in your email app. Complete the fields and press Send there. It does not send a request or book an appointment by itself.",
    local: "Answers stay on this page until you choose to copy them or open the email. Do not enter guest-level data.",
    form: "Prefer the website form?", formNote: "The form opens separately; the answers above are not transferred.", privacy: "Privacy information", contact: "Recipient",
  },
};

export default function PilotReview({ locale }: { locale: PilotLocale }) {
  const id = useId();
  const [answers, setAnswers] = useState<PilotAnswers>({ ...INITIAL_PILOT_ANSWERS });
  const [copyStatus, setCopyStatus] = useState<"copied" | "blocked" | null>(null);
  const [draftOpen, setDraftOpen] = useState(false);
  const t = copy[locale];
  const prefix = locale === "it" ? "/it" : "";
  const stage = t.stages[getPilotStage(answers)];
  const draft = buildPilotDraft(locale, answers);
  const money = (amount: number) => new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  function changeAnswer(field: keyof PilotAnswers, value: string) {
    if (!PILOT_CHOICES[locale][field].some(([option]) => option === value)) return;
    setAnswers((previous) => ({ ...previous, [field]: value }));
    setCopyStatus(null);
  }

  async function copyDraft() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("copied");
    } catch {
      setDraftOpen(true);
      setCopyStatus("blocked");
    }
  }

  return (
    <section className={styles.section} id="pilot-review" aria-labelledby={`${id}-title`}>
      <header className={styles.header}><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id={`${id}-title`}>{t.title}</h2><p>{t.intro}</p></header>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>{t.questions}</h3>
          <div className={styles.fields}>
            {(["goal", "exportReady", "eligibility"] as const).map((field) => (
              <label className={styles.field} key={field} htmlFor={`${id}-${field}`}>{t[field]}
                <select id={`${id}-${field}`} value={answers[field]} onChange={(event) => changeAnswer(field, event.target.value)}>
                  {PILOT_CHOICES[locale][field].map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            ))}
          </div>
          <div className={styles.result} role="status" aria-live="polite"><h4>{stage[0]}</h4><p>{stage[1]}</p></div>
          <p className={styles.note}>{t.local}</p>
          <details className={styles.draft} open={draftOpen} onToggle={(event) => setDraftOpen(event.currentTarget.open)}>
            <summary>{t.draft}</summary><textarea readOnly value={draft.text} aria-label={t.draftLabel} rows={12} onFocus={(event) => event.currentTarget.select()} />
          </details>
          <div className={styles.actions}><a className={styles.primary} href={draft.mailto}>{t.open}</a><button className={styles.secondary} type="button" onClick={copyDraft}>{t.copy}</button></div>
          <p className={styles.status} role="status">{copyStatus ? t[copyStatus] : ""}</p>
          <p className={styles.note}>{t.delivery}</p>
          <p className={styles.note}>{t.contact}: <a href={`mailto:${PILOT_CONTACT}`}>{PILOT_CONTACT}</a></p>
          <Link href={`${prefix}/request-setup?product=repeat-guest-engine`}>{t.form}</Link><p className={styles.note}>{t.formNote}</p>
          <Link href={`${prefix}/privacy`}>{t.privacy}</Link>
        </div>
        <aside className={styles.card} aria-labelledby={`${id}-scope`}>
          <h3 id={`${id}-scope`}>{t.offer}</h3><p className={styles.price}>{money(PILOT_PRICES.standard)}</p><p className={styles.note}>{t.oneTime}</p>
          <ul className={styles.scope}>{t.included.map((item) => <li key={item}>{item}</li>)}</ul>
          <p><strong>{t.managed}: {money(PILOT_PRICES.managedMonthly)}{t.perMonth}</strong></p>
          <hr className={styles.divider} /><h4>{t.founder}: {money(PILOT_PRICES.founder)}</h4><p className={styles.note}>{t.founderNote}</p>
          <hr className={styles.divider} /><p className={styles.note}>{t.limits}</p>
        </aside>
      </div>
    </section>
  );
}

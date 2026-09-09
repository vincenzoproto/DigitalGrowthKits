export type PilotLocale = "it" | "en";
export type PilotAnswers = {
  goal: "low-season" | "win-back";
  exportReady: "unknown" | "yes" | "no";
  eligibility: "unknown" | "yes" | "no";
};

export const INITIAL_PILOT_ANSWERS: PilotAnswers = {
  goal: "low-season", exportReady: "unknown", eligibility: "unknown",
};
export const PILOT_CONTACT = "info@vincenzoproto.com";
// Existing commercial terms; this module does not verify availability or charge anyone.
export const PILOT_PRICES = { founder: 690, standard: 990, managedMonthly: 129 } as const;

export const PILOT_CHOICES = {
  it: {
    goal: [["low-season", "Preparare una campagna per la bassa stagione"], ["win-back", "Ricontattare gli ospiti che non tornano da tempo"]],
    exportReady: [["unknown", "Da verificare"], ["yes", "Sì, abbiamo uno storico esportabile"], ["no", "Non abbiamo uno storico utilizzabile"]],
    eligibility: [["unknown", "Idoneità ancora da verificare"], ["yes", "Abbiamo informazioni su idoneità e disiscrizioni"], ["no", "Non abbiamo contatti utilizzabili per il marketing"]],
  },
  en: {
    goal: [["low-season", "Prepare a low-season campaign"], ["win-back", "Reconnect with guests who have not returned"]],
    exportReady: [["unknown", "Needs checking"], ["yes", "Yes, we have exportable guest history"], ["no", "We do not have usable guest history"]],
    eligibility: [["unknown", "Eligibility still needs checking"], ["yes", "We have eligibility and unsubscribe information"], ["no", "We have no contacts available for marketing"]],
  },
} as const;

// Selects normally constrain values. Normalize again so unexpected values never qualify a lead.
export function normalizePilotAnswers(input: Partial<PilotAnswers> = {}): PilotAnswers {
  const availability = (value: unknown): PilotAnswers["exportReady"] => value === "yes" || value === "no" ? value : "unknown";
  return {
    goal: input.goal === "win-back" ? "win-back" : "low-season",
    exportReady: availability(input.exportReady),
    eligibility: availability(input.eligibility),
  };
}

export function getPilotStage(input: Partial<PilotAnswers>): "prepare" | "check" | "review" {
  const answers = normalizePilotAnswers(input);
  if (answers.exportReady === "no" || answers.eligibility === "no") return "prepare";
  if (answers.exportReady === "yes" && answers.eligibility === "yes") return "review";
  return "check";
}

export function buildPilotDraft(locale: PilotLocale, input: Partial<PilotAnswers>) {
  const answers = normalizePilotAnswers(input);
  const it = locale === "it";
  const labels = PILOT_CHOICES[locale];
  const label = (field: keyof PilotAnswers) => labels[field].find(([value]) => value === answers[field])?.[1] ?? "-";
  const subject = it ? "GuestFlow — confronto di 15 minuti su Repeat Guest Engine" : "GuestFlow — 15-minute Repeat Guest Engine review";
  const body = [
    it ? "Ciao Vincenzo, ho visto la demo con dati fittizi e vorrei valutare il setup per la mia struttura." : "Hi Vincenzo, I have seen the synthetic-data demo and would like to discuss a setup for my property.",
    "",
    `${it ? "Obiettivo" : "Goal"}: ${label("goal")}`,
    `${it ? "Storico esportabile" : "Exportable history"}: ${label("exportReady")}`,
    `${it ? "Idoneità marketing" : "Marketing eligibility"}: ${label("eligibility")}`,
    "",
    it ? "Struttura e sito: [da completare]" : "Property and website: [please complete]",
    it ? "PMS o strumenti attuali: [da completare]" : "Current PMS or tools: [please complete]",
    it ? "Periodo da promuovere: [da completare]" : "Period to promote: [please complete]",
    it ? "Disponibilità per il confronto: [da completare]" : "Availability for a review: [please complete]",
    "",
    it ? "Chiedo una verifica di compatibilità e una proposta scritta prima di qualsiasi pagamento. Non allego dati degli ospiti." : "Please check compatibility and provide a written scope before any payment. I am not attaching guest-level data.",
  ].join("\n");
  return {
    subject,
    body,
    text: `${it ? "A" : "To"}: ${PILOT_CONTACT}\n${it ? "Oggetto" : "Subject"}: ${subject}\n\n${body}`,
    mailto: `mailto:${PILOT_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

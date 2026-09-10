const content = {
  en: {
    eyebrow: "Who does what",
    heading: "A configured system. A clear handover.",
    intro: "GuestFlow handles configuration, testing and handover for the selected package. We agree the scope, any third-party costs and an estimated delivery date after reviewing your existing tools.",
    steps: [
      {
        title: "Agree the setup",
        delivery: "GuestFlow documents the workflows, required connections and what your package includes.",
        responsibility: "You confirm the scope, nominate a contact and approve any access needed for implementation.",
      },
      {
        title: "Configure and test",
        delivery: "GuestFlow configures the agreed workflows and checks them with sample data before launch.",
        responsibility: "You validate the guest-facing content and confirm which contacts may receive marketing messages, where relevant.",
      },
      {
        title: "Hand over to your team",
        delivery: "You receive the configured system, operating instructions and a staff walkthrough.",
        responsibility: "We confirm account ownership and ongoing responsibilities together. Managed support is optional and quoted separately.",
      },
    ],
  },
  it: {
    eyebrow: "Chi fa cosa",
    heading: "Un sistema configurato. Una consegna chiara.",
    intro: "GuestFlow segue configurazione, test e consegna del pacchetto scelto. Dopo aver valutato gli strumenti che usi, concordiamo attività incluse, eventuali costi di servizi esterni e una data di consegna stimata.",
    steps: [
      {
        title: "Definiamo il lavoro",
        delivery: "GuestFlow mette per iscritto i flussi, i collegamenti necessari e ciò che include il tuo pacchetto.",
        responsibility: "Tu confermi le attività, indichi un referente e approvi gli accessi necessari alla configurazione.",
      },
      {
        title: "Configuriamo e testiamo",
        delivery: "GuestFlow configura i flussi concordati e li verifica con dati di esempio prima del lancio.",
        responsibility: "Tu approvi i contenuti rivolti agli ospiti e, quando previsto, confermi quali contatti possono ricevere messaggi di marketing.",
      },
      {
        title: "Consegniamo al tuo team",
        delivery: "Ricevi il sistema configurato, le istruzioni operative e una spiegazione per lo staff.",
        responsibility: "Definiamo insieme titolarità degli account e responsabilità di gestione. Il supporto continuativo è opzionale e quotato a parte.",
      },
    ],
  },
};

export default function ImplementationOverview({ locale }: { locale: "en" | "it" }) {
  const copy = content[locale];
  return (
    <section className="how-it-works" id="process" aria-labelledby="implementation-heading">
      <div className="section-heading">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2 id="implementation-heading">{copy.heading}</h2>
        <p>{copy.intro}</p>
      </div>
      <div className="steps">
        {copy.steps.map((step, index) => (
          <div key={step.title}>
            <b>0{index + 1}</b>
            <h3>{step.title}</h3>
            <p>{step.delivery}</p>
            <p>{step.responsibility}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

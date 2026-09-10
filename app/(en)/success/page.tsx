import Link from "next/link";
import type { Metadata } from "next";
import { verifyCheckoutSession } from "@/lib/checkout-confirmation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Checkout status | GuestFlow Systems",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({ searchParams }: {
  searchParams: Promise<{ session_id?: string | string[]; lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const it = params.lang === "it";
  const confirmation = await verifyCheckoutSession(params.session_id);
  const confirmed = confirmation.state === "confirmed";
  const noPaymentRequired = confirmed && confirmation.noPaymentRequired;
  const prefix = it ? "/it" : "";
  const onboardingParams = new URLSearchParams();
  if (confirmed && confirmation.productId) onboardingParams.set("product", confirmation.productId);
  if (confirmed && confirmation.referral) onboardingParams.set("ref", confirmation.referral);
  const onboardingQuery = onboardingParams.toString();
  const onboardingHref = `${prefix}/request-setup${onboardingQuery ? `?${onboardingQuery}` : ""}`;

  const messages = it ? {
    missing: ["Riferimento del pagamento assente.", "Se hai completato un pagamento, conserva la ricevuta Stripe e contattaci con l’email usata al checkout prima di riprovare."],
    invalid: ["Non troviamo questo pagamento.", "Il riferimento non è valido oppure non corrisponde a un checkout GuestFlow. Se hai una ricevuta Stripe, contattaci prima di ripetere il pagamento."],
    unavailable: ["Verifica del pagamento non disponibile.", "Al momento non possiamo confermare automaticamente l’esito. Se hai pagato, conserva la ricevuta Stripe e contattaci prima di effettuare un altro pagamento. Puoi intanto inviarci il contesto della struttura."],
    pending: ["Il pagamento è in attesa di conferma.", "Il checkout è terminato, ma Stripe non ha ancora confermato il pagamento. Attendi la conferma del pagamento e aggiorna questa pagina; non pagare di nuovo."],
    incomplete: ["Il checkout non è ancora completato.", "Questo riferimento non conferma un pagamento. Se hai appena terminato il checkout, attendi e aggiorna la pagina oppure contattaci."],
    expired: ["Questo checkout è scaduto.", "Questa sessione non conferma un pagamento. Se hai già una ricevuta Stripe, contattaci prima di iniziare un nuovo checkout."],
    test: ["Checkout di prova completato.", "Questa è una sessione Stripe di test: non conferma un pagamento reale né prenota un’implementazione."],
    confirmed: noPaymentRequired
      ? ["Ordine confermato.", "Stripe ha confermato il completamento dell’ordine senza alcun importo da pagare. Inviaci il contesto della struttura per concordare l’avvio dell’implementazione."]
      : ["Pagamento confermato. Grazie.", "Abbiamo verificato il pagamento con Stripe. Inviaci il contesto della struttura per concordare l’avvio dell’implementazione."],
  } : {
    missing: ["Payment reference not found.", "If you completed a payment, keep your Stripe receipt and contact us with the email used at checkout before trying again."],
    invalid: ["We couldn’t find this payment.", "The reference is invalid or does not match a GuestFlow checkout. If you have a Stripe receipt, contact us before paying again."],
    unavailable: ["Payment verification is unavailable.", "We can’t automatically confirm the outcome right now. If you paid, keep your Stripe receipt and contact us before making another payment. You can send your property context in the meantime."],
    pending: ["Your payment is awaiting confirmation.", "Checkout is complete, but Stripe has not confirmed the payment yet. Wait for payment confirmation and refresh this page; do not pay again."],
    incomplete: ["Checkout is not complete yet.", "This reference does not confirm a payment. If you just finished checkout, wait and refresh this page, or contact us."],
    expired: ["This checkout has expired.", "This session does not confirm a payment. If you already have a Stripe receipt, contact us before starting another checkout."],
    test: ["Test checkout completed.", "This is a Stripe test session. It does not confirm a real payment or book an implementation."],
    confirmed: noPaymentRequired
      ? ["Your order is confirmed.", "Stripe confirmed that your order is complete with no payment due. Send your property context so we can agree the implementation kickoff."]
      : ["Payment confirmed. Thank you.", "We verified your payment with Stripe. Send your property context so we can agree the implementation kickoff."],
  };
  const [title, description] = messages[confirmation.state];

  return (
    <main className="success-shell" lang={it ? "it" : "en"}>
      <div className="success-card">
        <span className="eyebrow">GuestFlow Systems</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {(confirmed || confirmation.state === "unavailable") && <>
          <div className="notice">{it
            ? "Conserva la ricevuta Stripe. In questa fase non inviare database ospiti, password o credenziali operative."
            : "Keep your Stripe receipt. Do not send a guest database, passwords or operational credentials at this stage."}</div>
          <Link className="primary" href={onboardingHref}>{it ? "Invia il contesto della struttura" : "Send implementation context"}</Link>
        </>}
        <p><a href="mailto:info@vincenzoproto.com">{it ? "Contatta GuestFlow" : "Contact GuestFlow"}</a></p>
        <Link href={prefix || "/"}>{it ? "Torna a GuestFlow Systems" : "Back to GuestFlow Systems"}</Link>
      </div>
    </main>
  );
}

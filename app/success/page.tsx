import Link from "next/link";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    return (
      <main className="success-shell">
        <div className="success-card">
          <span className="eyebrow">GuestFlow Systems</span>
          <h1>Payment reference not found.</h1>
          <p>If you have just completed a Stripe payment, contact us and include the email used at checkout.</p>
          <Link href="/">Back to GuestFlow Systems</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="success-shell">
      <div className="success-card">
        <span className="eyebrow">Secure checkout completed</span>
        <h1>Thank you. Your GuestFlow setup is booked.</h1>
        <p>Stripe has returned your completed checkout to GuestFlow Systems. We’ll use the checkout details to match the order and contact you for the implementation kickoff.</p>
        <div className="notice">Keep your Stripe receipt for your records. No guest database, password or operational credential should be sent before the implementation scope is confirmed.</div>
        <Link className="primary" href="/request-setup">Send implementation context</Link>
        <Link href="/">Back to GuestFlow Systems</Link>
      </div>
    </main>
  );
}

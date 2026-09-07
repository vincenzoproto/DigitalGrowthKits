import Link from "next/link";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!sessionId || !secretKey) {
    return <main className="success-shell"><div className="success-card"><h1>Order verification unavailable</h1><p>Please contact support if you completed a payment.</p><Link href="/">Back to store</Link></div></main>;
  }

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const product = session.metadata?.productId ? getProduct(session.metadata.productId) : undefined;
  const downloadUrl = product ? process.env[product.downloadEnvKey] : undefined;
  const paid = session.payment_status === "paid";

  return (
    <main className="success-shell">
      <div className="success-card">
        <span className="eyebrow">Payment verification</span>
        <h1>{paid ? "Your kit is ready." : "Payment is still processing."}</h1>
        <p>{product ? product.title : "DigitalGrowthKits order"}</p>
        {paid && downloadUrl ? <a className="download-button" href={downloadUrl} rel="nofollow">Download your files</a> : null}
        {paid && !downloadUrl ? <p className="notice">Payment confirmed. The protected delivery link still needs to be configured by the store owner.</p> : null}
        <Link href="/">Back to DigitalGrowthKits</Link>
      </div>
    </main>
  );
}

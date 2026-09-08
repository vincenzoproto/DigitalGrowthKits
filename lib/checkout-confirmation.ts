import Stripe from "stripe";
import { getProduct, products } from "@/lib/products";
import { normalizeReferral } from "@/lib/referrals";

export type CheckoutConfirmation =
  | { state: "missing" | "invalid" | "unavailable" | "pending" | "incomplete" | "expired" }
  | { state: "confirmed" | "test"; productId?: string; referral?: string; noPaymentRequired: boolean };

export function checkoutState(session: Pick<Stripe.Checkout.Session, "mode" | "status" | "payment_status" | "amount_total" | "livemode">): CheckoutConfirmation["state"] {
  if (session.mode !== "payment") return "invalid";
  if (session.status === "expired") return "expired";
  if (session.status !== "complete") return "incomplete";
  const settled = session.payment_status === "paid" ||
    (session.payment_status === "no_payment_required" && session.amount_total === 0);
  if (!settled) return "pending";
  return session.livemode ? "confirmed" : "test";
}

function knownProductId(value: unknown): string | undefined {
  return typeof value === "string" ? getProduct(value)?.id : undefined;
}

function knownOffer(value: unknown): string | undefined {
  return value === "repeat-guest-engine-founder" ? "repeat-guest-engine" : knownProductId(value);
}

// Payment Link sessions can lack our Checkout API's productId metadata.
// Resolve context from Stripe's verified line items, never from URL parameters.
export function productFromLineItems(items: Stripe.LineItem[]): string | undefined {
  const matches = new Set<string>();
  for (const item of items) {
    const stripeProduct = item.price?.product;
    const expanded = typeof stripeProduct === "object" && stripeProduct && !stripeProduct.deleted
      ? stripeProduct as Stripe.Product
      : undefined;
    const metadataId = knownProductId(expanded?.metadata?.productId) || knownOffer(expanded?.metadata?.offer);
    const names = [expanded?.name, item.description].filter((name): name is string => typeof name === "string");
    const matched = metadataId || products.find((product) => names.some((name) => {
      const normalized = name.trim().toLowerCase();
      const title = product.title.toLowerCase();
      return normalized === title || normalized.startsWith(`${title} `) || normalized.startsWith(`${title}—`) || normalized.startsWith(`${title}–`);
    }))?.id;
    if (matched) matches.add(matched);
  }
  return matches.size === 1 ? matches.values().next().value : undefined;
}

export async function verifyCheckoutSession(sessionId: unknown): Promise<CheckoutConfirmation> {
  if (sessionId === undefined) return { state: "missing" };
  if (typeof sessionId !== "string" || !/^cs_(?:live|test)_[A-Za-z0-9]{1,240}$/.test(sessionId)) {
    return { state: "invalid" };
  }
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) return { state: "unavailable" };

  try {
    const stripe = new Stripe(secretKey, { timeout: 10_000, maxNetworkRetries: 1 });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.id !== sessionId) return { state: "invalid" };
    const state = checkoutState(session);
    if (state !== "confirmed" && state !== "test") return { state };

    let productId = knownProductId(session.metadata?.productId) || knownOffer(session.metadata?.offer);
    const guestFlowBrand = session.metadata?.brand === "GuestFlow Systems";
    let productLookupComplete = false;
    if (!productId) {
      try {
        const items = await stripe.checkout.sessions.listLineItems(sessionId, {
          limit: 100,
          expand: ["data.price.product"],
        });
        if (!items.has_more) {
          productLookupComplete = true;
          productId = productFromLineItems(items.data);
        }
      } catch {
        // Brand metadata can establish a GuestFlow order when product details
        // are unavailable; a paid session alone cannot establish its brand.
      }
    }

    // The Stripe account also serves other businesses. Do not turn a payment
    // for an unrelated product into a GuestFlow implementation confirmation.
    if (!productId && !guestFlowBrand) {
      return { state: productLookupComplete ? "invalid" : "unavailable" };
    }

    return {
      state,
      productId,
      referral: normalizeReferral(session.metadata?.referral) || normalizeReferral(session.client_reference_id),
      noPaymentRequired: session.payment_status === "no_payment_required",
    };
  } catch (error) {
    if (error instanceof Stripe.errors.StripeInvalidRequestError && error.code === "resource_missing") {
      return { state: "invalid" };
    }
    return { state: "unavailable" };
  }
}

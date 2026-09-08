export const REFERRAL_COOKIE = "guestflow-ref";

/** Keep partner codes opaque and Stripe-safe; never truncate one into another. */
export function normalizeReferral(value: unknown): string | undefined {
  return typeof value === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(value)
    ? value
    : undefined;
}

/** A valid explicit code wins; absent/invalid input preserves the saved code. */
export function resolveReferral(...values: unknown[]): string | undefined {
  for (const value of values) {
    const referral = normalizeReferral(value);
    if (referral) return referral;
  }
  return undefined;
}

export function paymentLinkWithReferral(destination: string, value: unknown): string {
  const url = new URL(destination);
  const referral = normalizeReferral(value);
  if (referral) url.searchParams.set("client_reference_id", referral);
  return url.toString();
}

/** Attribution is a reconciliation hint, never proof of commission eligibility. */
export function checkoutAttribution(productId: string, value: unknown) {
  const referral = normalizeReferral(value);
  const metadata: Record<string, string> = { productId };
  if (referral) metadata.referral = referral;

  return {
    ...(referral ? { client_reference_id: referral } : {}),
    metadata,
    payment_intent_data: { metadata: { ...metadata } },
  };
}

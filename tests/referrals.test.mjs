import assert from "node:assert/strict";
import test from "node:test";
import { checkoutAttribution, normalizeReferral, paymentLinkWithReferral, resolveReferral } from "../lib/referrals.ts";

test("partner codes accept only complete Stripe-safe identifiers, at most 40 characters", () => {
  for (const valid of ["partner-42", "ABC_123", "x", "a".repeat(40)]) {
    assert.equal(normalizeReferral(valid), valid);
  }
  for (const invalid of [undefined, null, 123, {}, ["partner"], "", " ", " partner", "partner ", "a".repeat(41), "partner@example.com", "a&b", "a/b", "é", "a\nb"]) {
    assert.equal(normalizeReferral(invalid), undefined);
  }
});

test("a valid new partner link wins, while direct navigation and malformed links preserve the saved code", () => {
  assert.equal(resolveReferral("new-partner", "saved-partner"), "new-partner");
  assert.equal(resolveReferral(null, "saved-partner"), "saved-partner");
  assert.equal(resolveReferral("invalid&partner", "saved-partner"), "saved-partner");
  assert.equal(resolveReferral("", "a".repeat(41), "third-partner"), "third-partner");
  assert.equal(resolveReferral(undefined, ""), undefined);
});

test("Stripe URLs preserve their destination and parameters and carry exactly one reference", () => {
  const destination = "https://book.stripe.com/founder?locale=it&client_reference_id=old#checkout";
  const url = new URL(paymentLinkWithReferral(destination, "partner_42"));
  assert.equal(url.origin, "https://book.stripe.com");
  assert.equal(url.pathname, "/founder");
  assert.equal(url.searchParams.get("locale"), "it");
  assert.deepEqual(url.searchParams.getAll("client_reference_id"), ["partner_42"]);
  assert.equal(url.hash, "#checkout");
});

test("direct or invalid referrals never add a checkout reference", () => {
  const destination = "https://book.stripe.com/founder";
  assert.equal(paymentLinkWithReferral(destination, undefined), destination);
  assert.equal(paymentLinkWithReferral(destination, "bad&injection=value"), destination);
});

test("API attribution persists the partner on both the session and its payment", () => {
  const attribution = checkoutAttribution("repeat-guest-engine", "partner_42");
  assert.equal(attribution.client_reference_id, "partner_42");
  assert.deepEqual(attribution.metadata, { productId: "repeat-guest-engine", referral: "partner_42" });
  assert.deepEqual(attribution.payment_intent_data.metadata, attribution.metadata);
});

test("direct API purchases retain product metadata without claiming a partner", () => {
  for (const referral of [undefined, "invalid ref"]) {
    const attribution = checkoutAttribution("repeat-guest-engine", referral);
    assert.equal(Object.hasOwn(attribution, "client_reference_id"), false);
    assert.deepEqual(attribution.metadata, { productId: "repeat-guest-engine" });
    assert.deepEqual(attribution.payment_intent_data.metadata, { productId: "repeat-guest-engine" });
  }
});

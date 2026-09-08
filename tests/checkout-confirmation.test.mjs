import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual server helper with an isolated Stripe client and env.
// These checks never contact Stripe or consume credentials from the test host.
function load(file, dependencies = {}, environment = {}) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module, exports: module.exports, process: { env: environment },
    require(name) {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return module.exports;
}

const catalog = JSON.parse(readFileSync(new URL("../configs/products.json", import.meta.url), "utf8"));
const referrals = load("../lib/referrals.ts");
const sessionId = "cs_live_verified123";
const paidSession = {
  id: sessionId, mode: "payment", status: "complete", payment_status: "paid",
  amount_total: 99000, livemode: true,
  metadata: { productId: "repeat-guest-engine", referral: "partner_42" },
  client_reference_id: "partner_42",
};

function harness({ session = paidSession, items = [], environment = { STRIPE_SECRET_KEY: "isolated-test-value" }, retrieveError, retrieveErrorCode, itemError } = {}) {
  const calls = [];
  class InvalidRequestError extends Error {
    constructor(code) { super("Mock Stripe failure"); this.code = code; }
  }
  class Stripe {
    static errors = { StripeInvalidRequestError: InvalidRequestError };
    checkout = { sessions: {
      retrieve: async (id) => {
        calls.push(["retrieve", id]);
        if (retrieveErrorCode) throw new InvalidRequestError(retrieveErrorCode);
        if (retrieveError) throw retrieveError;
        return session;
      },
      listLineItems: async (id) => { calls.push(["items", id]); if (itemError) throw itemError; return { data: items, has_more: false }; },
    } };
  }
  const helper = load("../lib/checkout-confirmation.ts", {
    stripe: Stripe,
    "@/lib/products": { products: catalog, getProduct: (id) => catalog.find((product) => product.id === id) },
    "@/lib/referrals": referrals,
  }, environment);
  return { ...helper, calls, InvalidRequestError };
}

test("only settled, complete payment sessions confirm an order", () => {
  const { checkoutState } = harness();
  assert.equal(checkoutState(paidSession), "confirmed");
  for (const [change, expected] of [
    [{ status: "open" }, "incomplete"],
    [{ status: "expired" }, "expired"],
    [{ payment_status: "unpaid" }, "pending"],
    [{ payment_status: "no_payment_required", amount_total: 99000 }, "pending"],
    [{ payment_status: "no_payment_required", amount_total: 0 }, "confirmed"],
    [{ mode: "setup" }, "invalid"],
    [{ mode: "subscription" }, "invalid"],
    [{ livemode: false }, "test"],
  ]) assert.equal(checkoutState({ ...paidSession, ...change }), expected);
});

test("missing or malformed references and missing config never invoke Stripe", async () => {
  const { verifyCheckoutSession, calls } = harness({ environment: {} });
  assert.equal((await verifyCheckoutSession(undefined)).state, "missing");
  for (const invalid of [null, "", [sessionId], "anything", "cs_live_a/b", `cs_live_${"x".repeat(241)}`]) {
    assert.equal((await verifyCheckoutSession(invalid)).state, "invalid");
  }
  assert.equal((await verifyCheckoutSession(sessionId)).state, "unavailable");
  assert.equal(calls.length, 0);
});

test("paid checkout context comes from verified metadata without extra product lookup or customer disclosure", async () => {
  const helper = harness({ session: { ...paidSession, customer_details: { email: "private@example.com", name: "Private Customer" } } });
  const result = await helper.verifyCheckoutSession(sessionId);
  assert.equal(result.state, "confirmed");
  assert.equal(result.productId, "repeat-guest-engine");
  assert.equal(result.referral, "partner_42");
  assert.equal(Object.hasOwn(result, "customer_details"), false);
  assert.equal(Object.hasOwn(result, "sessionId"), false);
  assert.deepEqual(helper.calls, [["retrieve", sessionId]]);
});

test("Payment Link sessions recover product context including Founder setup and safe client references", async () => {
  const helper = harness({
    session: { ...paidSession, metadata: {}, client_reference_id: "founder-partner" },
    items: [{ description: "Repeat Guest Engine — Founder Setup" }],
  });
  const result = await helper.verifyCheckoutSession(sessionId);
  assert.equal(result.state, "confirmed");
  assert.equal(result.productId, "repeat-guest-engine");
  assert.equal(result.referral, "founder-partner");
  assert.deepEqual(helper.calls, [["retrieve", sessionId], ["items", sessionId]]);
});

test("existing Payment Link offer metadata identifies every system and the Founder offer", async () => {
  for (const product of catalog) {
    const helper = harness({ session: { ...paidSession, metadata: { offer: product.id } } });
    assert.equal((await helper.verifyCheckoutSession(sessionId)).productId, product.id);
    assert.deepEqual(helper.calls, [["retrieve", sessionId]]);
  }
  const founder = harness({ session: { ...paidSession, metadata: { offer: "repeat-guest-engine-founder" } } });
  assert.equal((await founder.verifyCheckoutSession(sessionId)).productId, "repeat-guest-engine");
  assert.deepEqual(founder.calls, [["retrieve", sessionId]]);
});

test("malformed partner codes do not become onboarding context for a known GuestFlow product", async () => {
  const helper = harness({
    session: { ...paidSession, metadata: { productId: "repeat-guest-engine", referral: "bad&value" }, client_reference_id: "someone@example.com" },
  });
  const result = await helper.verifyCheckoutSession(sessionId);
  assert.equal(result.state, "confirmed");
  assert.equal(result.productId, "repeat-guest-engine");
  assert.equal(result.referral, undefined);
  assert.equal(helper.productFromLineItems([{ description: "Guest Inbox Pro" }, { description: "Repeat Guest Engine" }]), undefined);
});

test("paid sessions belonging to unrelated products or brands never confirm a GuestFlow purchase", async () => {
  for (const metadata of [{}, { productId: "invented-product" }, { brand: "Another Business", offer: "another-service" }]) {
    for (const livemode of [true, false]) {
      const helper = harness({
        session: { ...paidSession, metadata, livemode },
        items: [{ description: "Different service" }],
      });
      const result = await helper.verifyCheckoutSession(sessionId);
      assert.equal(result.state, "invalid");
      assert.equal(result.productId, undefined);
      assert.equal(result.referral, undefined);
    }
  }
});

test("pending payments cannot expose confirmed onboarding context", async () => {
  const helper = harness({ session: { ...paidSession, payment_status: "unpaid" } });
  const result = await helper.verifyCheckoutSession(sessionId);
  assert.equal(result.state, "pending");
  assert.equal(result.productId, undefined);
  assert.equal(result.referral, undefined);
  assert.deepEqual(helper.calls, [["retrieve", sessionId]]);
});

test("Stripe lookup failures are neutral and only verified GuestFlow identity can preserve confirmation", async () => {
  const failed = harness({ retrieveError: new Error("Unavailable") });
  assert.equal((await failed.verifyCheckoutSession(sessionId)).state, "unavailable");
  const nonexistent = harness({ retrieveErrorCode: "resource_missing" });
  assert.equal((await nonexistent.verifyCheckoutSession(sessionId)).state, "invalid");
  const contextUnavailable = harness({ session: { ...paidSession, metadata: {} }, itemError: new Error("Product read unavailable") });
  const result = await contextUnavailable.verifyCheckoutSession(sessionId);
  assert.equal(result.state, "unavailable");
  assert.equal(result.productId, undefined);
  const verifiedBrand = harness({ session: { ...paidSession, metadata: { brand: "GuestFlow Systems" } }, itemError: new Error("Product read unavailable") });
  const brandedResult = await verifiedBrand.verifyCheckoutSession(sessionId);
  assert.equal(brandedResult.state, "confirmed");
  assert.equal(brandedResult.productId, undefined);
  assert.equal((await harness({ session: { ...paidSession, id: "cs_live_different" } }).verifyCheckoutSession(sessionId)).state, "invalid");
});

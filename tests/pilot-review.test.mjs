import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildPilotDraft, getPilotStage, INITIAL_PILOT_ANSWERS, normalizePilotAnswers, PILOT_CHOICES, PILOT_CONTACT, PILOT_PRICES } from "../lib/pilot-review.ts";

test("unknown defaults never imply compatibility", () => {
  assert.equal(getPilotStage(INITIAL_PILOT_ANSWERS), "check");
  assert.equal(getPilotStage({}), "check");
  assert.equal(getPilotStage({ exportReady: "yes", eligibility: "unknown" }), "check");
  assert.equal(getPilotStage({ exportReady: "yes", eligibility: "yes" }), "review");
});

test("a missing prerequisite takes precedence across every answer combination", () => {
  for (const exportReady of ["yes", "no", "unknown"]) {
    for (const eligibility of ["yes", "no", "unknown"]) {
      const expected = exportReady === "no" || eligibility === "no" ? "prepare" : exportReady === "yes" && eligibility === "yes" ? "review" : "check";
      assert.equal(getPilotStage({ exportReady, eligibility }), expected);
    }
  }
});

test("unexpected runtime values are normalized conservatively", () => {
  assert.deepEqual(normalizePilotAnswers({ exportReady: "TRUE", eligibility: "approved", goal: "<script>" }), INITIAL_PILOT_ANSWERS);
});

test("the request is correctly encoded and sent only to the existing business address", () => {
  for (const locale of ["it", "en"]) {
    const draft = buildPilotDraft(locale, INITIAL_PILOT_ANSWERS);
    const uri = new URL(draft.mailto);
    assert.equal(uri.protocol, "mailto:");
    assert.equal(uri.pathname, PILOT_CONTACT);
    assert.equal(uri.searchParams.get("subject"), draft.subject);
    assert.equal(uri.searchParams.get("body"), draft.body);
    assert.equal(uri.searchParams.has("cc"), false);
    assert.equal(uri.searchParams.has("bcc"), false);
    assert.ok(draft.text.includes(draft.body));
    assert.ok(draft.mailto.length < 2000);
  }
});

test("both locales preserve the selected goal and require scope before payment", () => {
  for (const locale of ["it", "en"]) {
    for (const [goal, label] of PILOT_CHOICES[locale].goal) {
      const draft = buildPilotDraft(locale, { goal, exportReady: "yes", eligibility: "no" });
      assert.ok(draft.body.includes(label));
      assert.ok(draft.body.includes(PILOT_CHOICES[locale].exportReady[1][1]));
      assert.ok(draft.body.includes(PILOT_CHOICES[locale].eligibility[2][1]));
      assert.match(draft.body, locale === "it" ? /prima di qualsiasi pagamento/ : /before any payment/);
      assert.match(draft.body, locale === "it" ? /Non allego dati degli ospiti/ : /not attaching guest-level data/);
    }
  }
});

test("commercial terms match the existing offer without inventing a stock count", () => {
  assert.deepEqual(PILOT_PRICES, { founder: 690, standard: 990, managedMonthly: 129 });
});

test("review UI contains no submission, payment, tracking or storage calls", () => {
  const ui = readFileSync(new URL("../components/PilotReview.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(ui, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|\/buy\/|buy\.stripe\.com/);
  assert.match(ui, /href=\{draft\.mailto\}/);
  assert.match(ui, /navigator\.clipboard\.writeText\(draft\.text\)/);
  assert.match(ui, /setDraftOpen\(true\)/);
  assert.match(ui, /aria-live="polite"/);
  assert.match(ui, /Non invia richieste/);
  assert.match(ui, /does not send a request/);
});

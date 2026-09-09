# GuestFlow — first three paid pilot implementations

Status: sales preparation, not a claim of live delivery or customer results.
This branch builds on PR #4. Do not merge or publish it automatically.

## Offer and qualification

Lead with Repeat Guest Engine: organise usable past-guest history, agree segments and exclusions, and configure post-stay, win-back and low-season workflows for one property.

Existing prices remain unchanged: standard setup EUR 990, optional management EUR 129/month, existing founder offer EUR 690 for the first three qualified setups. Founder availability must be checked before a written offer; neither the new component nor this document reserves or counts places. Third-party costs remain separate. Confirm scope, taxes, delivery timing and availability in the proposal before taking payment.

A suitable pilot has an exportable history, a way to determine eligible contacts and exclusions, a direct-booking or enquiry destination, a target period and an authorised property contact. Unknown answers trigger a review, not rejection. No usable history or eligible contacts means preparation first, not a checkout link. The questionnaire does not certify compatibility or a legal basis.

## Customer journey now prepared

1. Show the existing three-step synthetic-data walkthrough on the English or Italian homepage (`#guided-demo`). Do not describe its sample numbers as customer performance.
2. Continue to `#pilot-review`. Choose low-season or win-back, export readiness and marketing-information readiness.
3. Read the generated summary. Copy it or open a prepared email addressed to the existing business contact. The visitor must complete the placeholders and press Send in their mail client. Opening a draft is not a submitted lead, booked call or sale.
4. Review the property and prepare a written implementation proposal. Only offer the existing payment route after checking the operational payment flow and confirming the scope.

The existing website form remains an alternative. Answers are not silently transferred to it. This addition does not enable email/CRM delivery, Stripe verification, guest-data imports or Search Console access.

## 15-minute sales conversation

Minutes 0–3: ask which period needs attention, who can approve an offer and how guests currently book directly.

Minutes 3–6: ask which PMS is used, whether an export is available and how eligibility and unsubscribes are recorded. Discuss columns and approximate counts; do not request a guest database by ordinary email for an initial call.

Minutes 6–10: show the synthetic walkthrough. Explain one audience, one draft and the approval step. Do not promise bookings or infer a legal basis from the sample.

Minutes 10–13: confirm the one-property scope, third-party tools, responsibilities, prerequisites and what the staff will receive.

Minutes 13–15: agree the next action: a written proposal, a preparation checklist, or a no-fit decision. Record the actual outcome in the correct CRM immediately.

## Opening message — Italian (draft, not sent)

Oggetto: Ospiti già acquisiti, periodo da riempire

Buongiorno [Nome],

state già ricontattando gli ospiti passati per [periodo] oppure lo storico resta nel PMS?

Con GuestFlow prepariamo segmenti e campagne di ritorno partendo dai dati che la struttura può effettivamente utilizzare. Ho una demo con dati fittizi che mostra il percorso, senza chiedervi il database.

Vi andrebbe un confronto di 15 minuti per capire se è applicabile a [Struttura]?

Vincenzo Proto
GuestFlow Systems

## Opening message — English (draft, not sent)

Subject: Past guests and your quieter dates

Hi [Name],

are you already contacting past guests about [period], or does that history mainly stay in your PMS?

GuestFlow helps organise usable guest history into audiences and return-stay campaigns. There is a synthetic-data demo showing the workflow, with no need to share your guest database.

Would a 15-minute conversation help check whether this could fit [Property]?

Vincenzo Proto
GuestFlow Systems

Do not send placeholders. Match the prospect and period using verified information, preserve the existing email thread identity, respect any opt-out, and update the correct CRM with each contact, reply, follow-up or status change.

## Measurement and first-three objective

Start with a manually reviewed prospect group; do not treat a bulk-email count as progress. Record: actual conversations, reviewed properties, written proposals, independently confirmed paid setups and delivered pilots. Demo views, copied drafts and opened mail clients are not qualified leads or payments. Record reasons for no-fit decisions.

For each paid pilot, define baseline and reporting with the property before launch. Report attributable enquiries or bookings separately from total bookings; never relabel the demonstration numbers as results.

A referral-credit programme is deferred until there are delivered pilots and approved commercial terms. This branch creates no affiliate credits, automatic commission payments or open-source launch campaign.

## Release and delivery gates

- Verify the draft branch build and existing automated tests; check both locales, mobile layout, keyboard controls, changed answers, clipboard failure and email-draft behaviour in a browser.
- Deploy an explicit preview before production approval. Keep PR #4 and main untouched.
- Confirm real setup-request delivery and CRM recording without sending actual guest data in tests.
- Verify server-side payment confirmation in the appropriate environment before inviting payment. A payment-link redirect is not confirmation.
- Confirm the actual implementation stack, ownership, approval process and responsible person before promising delivery dates.

No outreach has been sent and no prospects or customer data have been added by this code change.

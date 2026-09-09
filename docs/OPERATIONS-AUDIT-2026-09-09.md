# GuestFlow operational audit - 9 September 2026

## Evidence and decision

Live HTTP audit completed at 14:00 UTC / 16:00 Europe/Rome. Run: https://github.com/vincenzoproto/DigitalGrowthKits/actions/runs/34360685826 . Initial audit commit: 7dbfd68413ed789e5452b4702a9f86e41b57f745. Draft audit PR #5 is stacked on PR #4; neither is merged or promoted by this audit.

Decision: NOT ready for a fully automatic sales-to-delivery launch.

## What passed

- Published homepage and Italian homepage, both setup-request pages and Italian partner page: HTTP 200.
- All five known purchase routes: HTTP 307 to their matching Stripe Payment Link, with referral preserved. Redirects were not followed, so no Stripe checkout sessions or charges were created.
- Invalid payment reference: displayed an honest invalid-payment message, not payment confirmation.
- Existing unit tests, build and local HTTP smoke tests passed in the independent audit workflow. Those mock providers and do not prove inbox/CRM receipt.
- Stripe connected-account read verified active GuestFlow Payment Links: Guest Inbox Pro EUR 690, Digital Guest Concierge EUR 490, Repeat Guest Engine EUR 990, Direct Booking Engine EUR 1490, Founder offer EUR 690. All target a /success URL containing CHECKOUT_SESSION_ID. LIVE account read only; no account or payment settings changed.

## Concrete blockers

1. The ONE explicitly marked synthetic setup request GF-QA-34360685826 returned HTTP 503 with ok=false and code=DELIVERY_NOT_CONFIGURED. It did not reach an email/CRM delivery provider. Do not mark a received lead or completed CRM integration.
2. A synthetic, valid-format non-existent session ID produced 'Verifica del pagamento non disponibile'. Server-side verification is not operationally demonstrated. This response alone does not distinguish a missing key from all other Stripe configuration/network failures.
3. The connected Stripe scope contains LIVE only, not a test/sandbox account. No successful/declined payment test or sandbox end-to-end order test was attempted.
4. Production /it still has html lang=en. PR #4 contains the localization fix but remains unpublished.
5. The current success page only verifies an order reference and links to request-setup. It does not create a durable order/CRM queue or automatic implementation handoff. See OPERATIONS-ACCEPTANCE.md.

The demo endpoint returned HTTP 200 but the raw-HTML audit did not find an H1. This is a browser-review follow-up, NOT proof that the demo is broken; hydration/client rendering was not checked by that HTTP probe.

## Code defect identified during review

The English setup form sends a primary goal, but the API discarded it. The draft audit branch preserves this field in both webhook JSON and formatted email and adds isolated route regression tests. This correction does not configure an email/CRM provider and is not yet published.

## Required external configuration before retest

- Configure a dedicated GuestFlow lead destination on Vercel. A Resend email fallback alone is not a CRM record. Independently verify the inbox and CRM using a new unique QA marker.
- Authorize an isolated Stripe sandbox and place its test credentials ONLY in Preview/test environments. Keep existing live Payment Links and production credentials unchanged.
- Verify the production server key separately; add and test a durable order/implementation handoff before claiming automatic onboarding. Never use real cards or tiny real charges for QA.
- Review the actual candidate in a browser at desktop and mobile widths, then decide publication. Do not equate passing mocks or a prepared runbook with completed customer delivery.

No customer database, secret key, real payment or completed implementation was used or claimed.

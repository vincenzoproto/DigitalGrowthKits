# GuestFlow production setup

## Publish the application

Deploy the repository's Next.js application to the existing Vercel project
`guestflow-systems` (`prj_vLxtiqkCqg6zhZg4egQklv0FXn0n`) in team `vincenzo22`.
The production domain is `www.guestflowsystems.com`; the apex redirects there.
Do not deploy `preview/index.html` as the application: that is an older static
preview and has no audit routes, API handlers or payment confirmation logic.

`vercel.json` selects Next.js and its normal build output. Build using `npm ci`
and `npm run build`. The GitHub workflow also runs unit checks and production
HTTP checks with a local mock webhook; it does not charge a card or create leads.

If deploying with the CLI, authenticate first, link this exact project and run
from the repository root. Deploy a preview, validate it, then publish production.
A successful GitHub Build check alone does not publish the site. Connect this
repository to the existing Vercel project if automatic main-branch releases are
wanted; do not create a second project or move the production domains.

## Runtime configuration

Set these through Vercel's environment settings, never in committed source:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.guestflowsystems.com` in production |
| `STRIPE_SECRET_KEY` | Restricted server key for the existing Stripe account; Checkout Sessions read access for confirmation, plus write access only if using `/api/checkout` |
| `SETUP_REQUEST_WEBHOOK_URL` | Authenticated endpoint that stores enquiries in the private GuestFlow CRM and notifies the owner |
| `RESEND_API_KEY`, `RESEND_FROM` | Optional email delivery fallback with a verified sender |
| `SETUP_REQUEST_TO` | Owner notification recipient; defaults to `info@vincenzoproto.com` |

Store keys as sensitive environment variables and keep test and live values
separate. Public Payment Links do not require the app's Stripe key to open.
Without the key, `/success` truthfully reports that automatic verification is
unavailable and directs the customer to retain their receipt and contact us.

The enquiry webhook receives JSON with `subject`, `text`, `product`, `referral`,
property/contact fields, notes and `source`. Return a successful response only
after durable CRM storage and owner notification. Email-only fallback does not
automatically create a CRM record; reconcile it privately. Do not store contact
details or payment data in this public repository.

The current webhook client sends `Content-Type: application/json` and no bearer
or signature header. Use a compatible endpoint with an opaque URL token, or
implement the authentication required by the CRM before configuring its URL.

## Referrals and payments

A valid partner code contains 1–40 letters, digits, hyphens or underscores. A
valid explicit `?ref=` replaces the saved first-party session cookie; direct
navigation preserves it. Prefetches do not change attribution. The cookie has
no persistent expiry or promised commission window.

All five purchase paths, including `repeat-guest-engine-founder`, use `/buy/...`
and send the code to Stripe as `client_reference_id`. API-created sessions also
include product/referral metadata on the session and payment. Reconcile this
reference against approved partners before any commission payment. No automatic
partner payouts or entitlement rules are implemented.

Existing Stripe links were verified on 2026-09-08: four standard offers are
€690, €490, €990 and €1,490; Founder Launch is €690 with a three-completed-session
limit. The links belong to the existing Vincenzo Proto account. Keep prices and
the Founder cap in Stripe aligned with the website.

All five Payment Links currently redirect after completion to
`https://guestflowsystems.com/success?session_id={CHECKOUT_SESSION_ID}`. Keep the
session placeholder in that redirect so the application can verify the payment.

## Release verification

1. Check `/audit`, `/it/audit` and `/it/partner` return the current application.
2. Open `?ref=TEST_PARTNER`, navigate to a purchase, and verify the Stripe URL's
   `client_reference_id` without making a live payment.
3. Submit a clearly labelled test enquiry and verify both private CRM storage
   and owner notification before marking delivery operational.
4. In a configured Stripe test environment, verify completed, pending and
   invalid checkouts and the onboarding link. Never use a live card for CI.
5. Confirm the expected deployment is assigned to the existing production domain.

The success page verifies the Checkout Session before confirming a GuestFlow
order. It is not a payment webhook or an automatic fulfillment system. Stripe
webhook-based order fulfillment and commission reconciliation require their own
configured, idempotent backend before they can be described as automatic.

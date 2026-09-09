# GuestFlow - operational acceptance and delivery

Status: NOT certified end-to-end. Do not merge or promote PR #4 based only on a successful build.

## Evidence levels

1. Unit/local HTTP tests: simulated providers, no external email/CRM or payments.
2. Published-site audit: actual HTTP responses from www.guestflowsystems.com. Payment redirects are inspected but never followed. A synthetic request is opt-in and sent once without automatic retry.
3. End-to-end acceptance: independently prove inbox receipt, a dedicated GuestFlow CRM record, sandbox checkout completion, order confirmation and onboarding. Levels 1/2 cannot substitute for level 3.

## Ownership and environments

- Operational contact: info@vincenzoproto.com.
- Keep GuestFlow requests, orders and QA records separate from Smart Creator and LowSeasonGrowth opportunities.
- Production and Preview must have separate credentials and data destinations. Never install a Stripe test key over the production key.
- Put secrets only in private Vercel environment settings; never in this repository, issues, screenshots or chat.
- Existing lead delivery supports SETUP_REQUEST_WEBHOOK_URL or RESEND_API_KEY + RESEND_FROM; SETUP_REQUEST_TO selects the internal recipient. Email delivery is NOT a CRM integration.
- A webhook HTTP 200 means acceptance, not proof of a durable CRM row. Find and verify the exact test marker in the downstream system.
- Server-side order verification requires STRIPE_SECRET_KEY in the matching environment. The connected Stripe LIVE account alone is not sandbox access or proof of the deployed key.

## Request to handover: acceptance checklist

| Stage | Pass condition | Stop condition |
| --- | --- | --- |
| Request | Real form validation succeeds; correct product, contact, primary goal, source and referral arrive | UI success without downstream evidence |
| Email / CRM | Exact QA marker independently found; one dedicated GuestFlow record; no real sales opportunity created for QA | Missing provider, missing row or duplicate contact/order |
| Sandbox payment | Isolated sandbox, matching test key and TEST Payment Link; successful and declined-payment cases checked | Live keys, live cards or tiny real charges used as a substitute |
| Confirmation | Verified session belongs to GuestFlow; unpaid/expired/foreign/test sessions never confirmed as real payments | Trusting query parameters or showing generic paid success |
| Order handoff | One durable order per verified session, owner assigned, customer acknowledgement confirmed | An order disappears when the customer does not visit /success |
| Onboarding | Correct product and order linked to implementation; scope, inputs, responsibilities and supplier costs approved | Request form treated as a delivered service |
| Delivery | Agreed system deployed, tested with synthetic data, documented and accepted by the property | Demo pages or proposal text described as a live customer system |

The current success page verifies a session and links to the setup form. This is not a durable order queue, verified webhook fulfillment, or automatic customer onboarding. These require a separately tested implementation/integration.

## First-client delivery packets (manual service)

All four offers are configuration services, not instant software provisioning. Assign the delivery owner before accepting an implementation date. Validate feasibility and supplier costs before committing a scope. No guest databases or passwords in the initial request.

| System | Obtain through a secure agreed channel | Implementation acceptance |
| --- | --- | --- |
| Guest Inbox Pro - EUR 690 | Channels, current tools, staff roles, common enquiries, escalation rules | Agreed channels connected; staff access scoped; routing, canned replies and escalation tested; handover notes accepted |
| Digital Guest Concierge - EUR 490 | Property information, services, guest languages, approved assets and contacts | QR opens correct property portal on mobile; links and information checked; editing owner and update procedure delivered |
| Repeat Guest Engine - EUR 990 | Data source/schema first; marketing eligibility and exclusions; brand copy and sender settings | Agreed import mapped; ineligible/suppressed contacts excluded; three workflows tested only on approved test recipients; unsubscribe/reporting and staff handover verified |
| Direct Booking Engine - EUR 1490 | Existing booking engine, availability/rate source, policies, domain responsibilities and approved content | Agreed booking path and provider connection tested; correct dates/rates/cancellation links; tracking scope and handover approved |

No campaign to real guests during QA. No guaranteed revenue, integrations or delivery dates without agreed scope. Optional recurring management is a separate commercial agreement; one-time setup checkout does not activate it automatically.

## Release decision

Keep a rollback candidate and the tested commit SHA. Do not assume merging GitHub deploys Vercel: verify the project integration and the deployed version. First close functional blockers, then review the PR preview on desktop and mobile, then authorize promotion. Re-test request delivery and confirmation after release.

## Official testing references

- https://docs.stripe.com/testing
- https://docs.stripe.com/payments/checkout/fulfillment

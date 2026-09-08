# Repeat Guest Engine — Delivery Runbook

## Offer
- Founder setup: €690 one-time for the first 3 completed purchases
- Standard setup after founder slots: €990 one-time
- Optional managed service: €129/month
- One property and one approved guest-data source per standard setup

Before payment, confirm feasibility against `FOUNDER-SCOPE.md`. Do not mark a deal Closed-won until successful payment is verified.

## Customer inputs
- property name and sending domain
- CSV/PMS export
- description of fields and marketing-status source
- approved sender name/from address
- brand assets and preferred languages
- direct-booking URL / offer destination

## Delivery sequence

### 1. Data review
- inspect export structure
- remove unnecessary/sensitive fields
- map guest identifiers, language, dates, booking value and marketing status
- deduplicate by customer-approved key

### 2. Platform setup
- deploy supported Mautic stack using the official Docker image or an approved managed host
- configure HTTPS, database, backups, cron/worker roles and email transport
- keep upstream GPL notices and Mautic trademark attribution requirements intact

### 3. Import
- create custom fields needed for hospitality segmentation
- import a small test subset first
- verify marketing eligibility and suppression status
- import remaining approved contacts only after the test passes

### 4. Segments
- Marketing Eligible
- Recent Guests 0–90d
- Dormant 180d+
- Low-Season Visitors
- High-Value Guests
- Language / Country cohorts where useful
- Suppressed / Unsubscribed

### 5. Launch automations
- Post-Stay Relationship
- 180-Day Win-Back
- Low-Season Fill

Every promotional flow uses eligible contacts only and includes preference/unsubscribe controls.

### 6. QA
- use `QA-TEST-PLAN.md`
- seed test contacts controlled by the property/team
- test links, language branches, delays, suppression and unsubscribe
- verify sender domain/email transport
- test reporting
- keep production sends OFF until the property approves the audience, sender, content, timing and booking destination

### 7. Handover
- admin/staff accounts
- segment definitions
- campaign map
- data/privacy checklist
- backup and system-owner responsibilities
- 30-minute operating handover

## Delivery target
Target 5 business days from receipt of required inputs/access, subject to external DNS/platform dependencies. This is a target rather than a guaranteed SLA.

## Managed service (€129/month)
Includes reasonable campaign adjustments, segment tuning, monitoring and support. Email/SMS provider charges, VPS/hosting and third-party API costs are billed separately or paid directly by the customer.

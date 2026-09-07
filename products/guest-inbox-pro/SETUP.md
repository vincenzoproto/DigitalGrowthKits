# Guest Inbox Pro — Implementation Runbook

Guest Inbox Pro is a hospitality implementation package built around the open-source Chatwoot core. This folder contains our deployment baseline and hospitality configuration layer; it does not copy Chatwoot Enterprise code.

## Commercial package

- One-property implementation: €690
- Managed support: €79/month
- Third-party hosting, WhatsApp/Meta/API usage, SMS, email or other provider fees are separate where applicable.

## Phase 1 — Property discovery

Collect:
- property name, domain and support email
- staff users and roles
- channels to connect
- current guest-message volume
- booking enquiry process
- check-in / transfer / upsell workflows
- escalation contact

Never request social-network passwords by email. Account owners should authorise official integrations themselves where the provider supports OAuth or equivalent account-level authorisation.

## Phase 2 — Infrastructure

1. Provision a Linux host with Docker/Compose and persistent backups.
2. Copy `docker-compose.yml` and `.env.example` to the host.
3. Create `.env` and replace every placeholder with unique secrets.
4. Point a subdomain such as `inbox.hotel-domain.com` to the host.
5. Put TLS/reverse proxy in front of the Rails service.
6. Start PostgreSQL, Redis, Rails and Sidekiq.
7. Run the Chatwoot database preparation command appropriate to the installed Chatwoot version.
8. Disable public signup after the owner account is established.

Use the upstream Chatwoot self-hosted documentation for version-specific commands. Do not assume this baseline replaces upstream release notes.

## Phase 3 — Hospitality configuration

Use `hospitality-config.json` as the default operating model:
- Booking Lead
- Check-in
- Transfer
- Upsell
- Guest Issue
- Post-stay
- VIP

Create staff teams around the property's actual operation. Small B&Bs may use only Owner + Reception; larger hotels can split Reservations, Reception and Marketing.

## Phase 4 — Channels

Recommended launch order:
1. Website live chat
2. Support/reservations email
3. WhatsApp Business / supported messaging channel
4. Instagram/Facebook or other supported channels relevant to the property

Availability and setup requirements depend on each channel provider and current Chatwoot support. Official provider APIs and account authorisation are required where applicable.

## Phase 5 — Acceptance test

Before handover, test:
- a new website enquiry reaches the inbox
- an email reply threads correctly
- each enabled messaging channel sends and receives correctly
- Booking Lead is assigned correctly
- Check-in and Guest Issue flows reach the right person
- canned responses work
- owner can add/remove staff
- backups exist and restore instructions are documented

## Phase 6 — Handover

Give the property:
- admin URL
- staff access list
- 30-minute workflow handover
- channel ownership notes
- escalation path
- backup responsibility

## Managed support — €79/month

Included scope:
- basic system-health checks
- update planning and minor configuration maintenance
- small routing/label/canned-response edits
- staff/inbox configuration assistance

Not included by default:
- server migration
- large custom development
- paid third-party APIs
- Meta/WhatsApp account compliance issues
- custom PMS integrations
- 24/7 SLA

## Open-source notice

Chatwoot core is an upstream open-source project. Guest Inbox Pro sells implementation, configuration and ongoing operational support, not ownership of the upstream project. Review the current upstream license before every material redistribution or source modification. Do not include or redistribute Enterprise-only source outside its applicable terms.

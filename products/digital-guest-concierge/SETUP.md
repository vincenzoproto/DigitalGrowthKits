# Digital Guest Concierge — Implementation Runbook

Digital Guest Concierge is a branded mobile guest portal for hotels and B&Bs, inspired by the AtlasQR architecture. The commercial offer is the hospitality implementation, configuration, branding, launch and support.

## Commercial package

- One-property implementation: €490
- Optional managed updates/support: €49/month
- Third-party hosting, email, SMS, payment or partner service fees are separate where applicable.

## What the property receives

- branded mobile guest portal
- dynamic QR code(s)
- multilingual guest content structure
- Wi-Fi, breakfast, check-in/out and house information
- transfer / late checkout / experience upsell sections
- reception and emergency contact actions
- owner dashboard access
- basic scan and engagement analytics
- staff handover

## Implementation flow

1. Collect property logo, colors, languages and contact details.
2. Collect check-in/out, Wi-Fi, breakfast, house rules and emergency information.
3. Collect paid services and partner offers.
4. Create property tenant/business and public catalog.
5. Configure guest-facing sections from `hospitality-config.json`.
6. Configure at least one dynamic QR destination.
7. Test mobile, multilingual and offline/PWA states.
8. Verify analytics events for QR scans and service clicks.
9. Hand over dashboard access and QR assets.

## Recommended QR placement

- room welcome card
- reception desk
- breakfast area
- apartment entrance
- pre-arrival email or WhatsApp message

## Upsell opportunities

The portal should not just replace a printed guest book. It should create measurable actions around:
- airport/station transfer
- late checkout
- breakfast upgrades
- welcome packages
- local experiences
- restaurant or partner referrals

## Production gates

AtlasQR documentation notes production hardening requirements around managed data services, TLS, backups, observability, email/storage/billing adapters and RLS/branch-scope controls. These must be completed for the chosen deployment before selling a live production implementation.

## License

AtlasQR is MIT licensed. Preserve the upstream copyright and MIT permission notice in copies or substantial portions of the software. Review the current upstream repository and dependency licenses before each material distribution or fork release.

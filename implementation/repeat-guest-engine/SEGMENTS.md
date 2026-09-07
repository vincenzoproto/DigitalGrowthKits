# Repeat Guest Engine — Segment Blueprint

Default hospitality segments are created only after field mapping and marketing-eligibility review.

## Core segments

### Marketing Eligible
- `marketing_eligible = true`
- `unsubscribed = false`
- valid email required for email campaigns

### Recent Guests — 0–90 days
- last stay within previous 90 days
- useful for post-stay relationship and preference flows

### Dormant Guests — 180+ days
- last stay more than 180 days ago
- marketing eligible only
- used for win-back campaigns

### Low-Season Visitors
- previous stay tagged as low/off-peak season
- marketing eligible only
- suitable for targeted low-season offers

### High-Value Guests
- booking value or lifetime value above property-defined threshold
- never infer VIP status from sensitive personal data

### Language Segments
- language field supplied by property/export
- used to send the correct localized campaign

### Suppressed / Unsubscribed
- `unsubscribed = true` OR `marketing_eligible != true`
- excluded from promotional campaigns

## Rule
No contact enters a promotional campaign solely because they once stayed at the property. The property must confirm the appropriate lawful basis and marketing status for the audience it imports.

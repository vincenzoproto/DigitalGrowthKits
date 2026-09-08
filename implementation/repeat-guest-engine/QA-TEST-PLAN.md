# Repeat Guest Engine — QA Test Plan

Use synthetic data or seed contacts controlled by the property/team until the implementation is approved for production.

## 1. CSV import test

Expected columns:
- email
- first_name
- last_name
- language
- country
- last_stay_date
- total_stays
- last_booking_value
- stay_season
- marketing_eligible
- marketing_source
- unsubscribed

Pass criteria:
- valid rows import without changing source values unexpectedly;
- malformed emails/dates/booking values are flagged for review;
- duplicate policy is documented before production import;
- unnecessary fields are excluded.

## 2. Suppression test

Create at least four seed records:
- marketing_eligible=true, unsubscribed=false;
- marketing_eligible=false, unsubscribed=false;
- marketing_eligible=true, unsubscribed=true;
- marketing_eligible=false, unsubscribed=true.

Pass criteria:
- only the first record may enter promotional automation segments;
- all other records remain suppressed from promotional sends.

## 3. Segment test

Use controlled dates/values to verify:
- recent: 0–90 days;
- dormant: 180+ days;
- low-season: stay_season=low;
- high-value: implementation threshold agreed with property;
- language/country segmentation where used.

Pass criteria:
- each seed record appears only in the intended segments;
- no suppressed record enters a promotional segment.

## 4. Automation test

For each of the three flows:

### Post-stay relationship
- trigger with an eligible recent seed contact;
- verify delay;
- verify language branch;
- verify booking/preference links;
- verify unsubscribe/preferences.

### 180-day win-back
- trigger with an eligible dormant seed contact;
- verify timing rule;
- verify offer destination;
- verify suppression.

### Low-season fill
- trigger only with a controlled eligible low-season seed contact;
- verify property-approved offer and booking dates;
- verify suppression.

Pass criteria:
- test messages reach only controlled seed inboxes;
- links and language are correct;
- no promotional message is sent to suppressed seeds.

## 5. Sender test

Pass criteria:
- sender name/address approved by property;
- SPF/DKIM/DMARC state reviewed where applicable;
- reply-to destination works;
- test email does not impersonate an unapproved address.

## 6. Unsubscribe test

Pass criteria:
- unsubscribe/preference action works;
- contact is excluded from subsequent promotional sends;
- suppression persists after segment recalculation/import refresh where supported.

## 7. Reporting test

Verify that the operating view can distinguish at minimum:
- sent;
- delivered when provider reports it;
- opened/clicked only where measurement is available and appropriate;
- unsubscribed;
- failed/bounced;
- conversion only when a reliable booking attribution method exists.

Do not treat missing bounces as proof of delivery and do not claim bookings that cannot be attributed.

## 8. Production approval gate

Before any real promotional send, obtain property approval for:
- eligible audience/source;
- excluded audience;
- campaign text/language;
- timing;
- sender identity;
- offer/booking destination;
- test results.

Production remains OFF until every required item is confirmed.

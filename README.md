# DigitalGrowthKits

A lightweight digital-product storefront for hospitality businesses, built with Next.js and Stripe.

## Initial catalog
- Hospitality AI Kit — €29
- Airbnb Host Kit — €39
- 100 Instagram Templates — €19
- Hotel Sales Email Pack — €29
- B&B Low Season Kit — €59
- Complete Hospitality Bundle — €99

## Current MVP
The repository already contains:
- responsive storefront homepage
- JSON-based product catalog
- six initial hospitality products
- Stripe Checkout session creation
- payment verification on the success page
- protected download configuration through server-side environment variables
- automated build-check workflow

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Required environment variables
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
DOWNLOAD_HOSPITALITY_AI_KIT=
DOWNLOAD_AIRBNB_HOST_KIT=
DOWNLOAD_INSTAGRAM_TEMPLATES=
DOWNLOAD_HOTEL_SALES_EMAIL_PACK=
DOWNLOAD_BNB_LOW_SEASON_KIT=
DOWNLOAD_COMPLETE_HOSPITALITY_BUNDLE=
```

Never commit real Stripe secrets or protected download URLs to GitHub.

## Deployment
The simplest route is Vercel:
1. Import this GitHub repository into Vercel.
2. Add the environment variables above in Project Settings > Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy.
5. Test checkout first with Stripe test mode before enabling live payments.

## Digital delivery
Each product references a server-side environment-variable name rather than exposing its download URL in the public product catalog. In production, use a protected or expiring file URL where possible.

## Important
The store code is ready as an MVP, but the six downloadable kits still need their final files before live sales should be enabled.

## TishCommerce notice
DigitalGrowthKits was initially planned using TishCommerce as an open-source reference for a database-free digital storefront. TishCommerce's repository license includes an attribution requirement for public-facing deployments unless a commercial license is obtained. See `NOTICE.md` and the upstream project:
https://github.com/tishonator/TishCommerce

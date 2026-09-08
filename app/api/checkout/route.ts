import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";
import { checkoutAttribution, REFERRAL_COOKIE, resolveReferral } from "@/lib/referrals";
import { randomInt } from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Stripe is not configured yet." }, { status: 503 });

    const { productId, referral: requestedReferral } = await request.json();
    const product = getProduct(productId);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const stripe = new Stripe(secretKey);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const referral = resolveReferral(
      requestedReferral,
      request.nextUrl.searchParams.get("ref"),
      request.cookies.get(REFERRAL_COOKIE)?.value,
    );
    const integrationSuffix = Array.from({ length: 8 }, () => String.fromCharCode(97 + randomInt(26))).join("");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: `guestflow_checkout_${integrationSuffix}`,
      customer_creation: "always",
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency.toLowerCase(),
            unit_amount: product.priceCents,
            product_data: {
              name: product.title,
              description: product.shortDescription,
            },
          },
        },
      ],
      ...checkoutAttribution(product.id, referral),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { paymentLinkWithReferral, REFERRAL_COOKIE, resolveReferral } from "@/lib/referrals";

const paymentLinks: Record<string, string> = {
  "guest-inbox-pro": "https://book.stripe.com/8x27sL4jzdLu0T24cOabK02",
  "digital-guest-concierge": "https://book.stripe.com/6oU7sLaHX6j231a5gSabK03",
  "repeat-guest-engine": "https://book.stripe.com/28E6oH5nD36Q7hqdNoabK04",
  "repeat-guest-engine-founder": "https://book.stripe.com/aFafZheYd6j28lu38KabK06",
  "direct-booking-engine": "https://book.stripe.com/00w9AT03jgXG8lu8t4abK05",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ product: string }> },
) {
  const { product } = await context.params;
  const destination = Object.hasOwn(paymentLinks, product) ? paymentLinks[product] : undefined;

  if (!destination) {
    return NextResponse.redirect(new URL("/request-setup", request.url));
  }

  const referral = resolveReferral(
    request.nextUrl.searchParams.get("ref"),
    request.cookies.get(REFERRAL_COOKIE)?.value,
  );
  const response = NextResponse.redirect(paymentLinkWithReferral(destination, referral), 307);
  // The destination depends on this visitor's referral; never share cached redirects.
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

import { NextRequest, NextResponse } from "next/server";

const paymentLinks: Record<string, string> = {
  "guest-inbox-pro": "https://book.stripe.com/8x27sL4jzdLu0T24cOabK02",
  "digital-guest-concierge": "https://book.stripe.com/6oU7sLaHX6j231a5gSabK03",
  "repeat-guest-engine": "https://book.stripe.com/28E6oH5nD36Q7hqdNoabK04",
  "direct-booking-engine": "https://book.stripe.com/00w9AT03jgXG8lu8t4abK05",
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ product: string }> },
) {
  const { product } = await context.params;
  const destination = paymentLinks[product];

  if (!destination) {
    return NextResponse.redirect(new URL("/request-setup", request.url));
  }

  return NextResponse.redirect(destination, 307);
}

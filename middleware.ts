import { NextRequest, NextResponse } from "next/server";
import { normalizeReferral, REFERRAL_COOKIE } from "@/lib/referrals";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  if (pathname === "/") {
    const saved = request.cookies.get("guestflow-lang")?.value;
    const language = request.headers.get("accept-language") || "";
    if (saved === "it" || (saved !== "en" && /^it\b|,\s*it\b/i.test(language))) {
      const destination = request.nextUrl.clone();
      destination.pathname = "/it";
      response = NextResponse.redirect(destination);
    }
  }

  const referral = normalizeReferral(request.nextUrl.searchParams.get("ref"));
  if (referral) {
    // A session cookie carries the latest explicit code across internal links.
    // It does not establish a persistent attribution window or entitlement.
    response.cookies.set(REFERRAL_COOKIE, referral, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: [{
    source: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    // Prefetching a partner link must not change the visitor's attribution.
    missing: [
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "purpose", value: "prefetch" },
    ],
  }],
};

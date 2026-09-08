import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const saved = request.cookies.get("guestflow-lang")?.value;
  if (saved === "en") return NextResponse.next();
  if (saved === "it") return NextResponse.redirect(new URL("/it", request.url));

  const language = request.headers.get("accept-language") || "";
  if (/^it\b|,\s*it\b/i.test(language)) {
    return NextResponse.redirect(new URL("/it", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };

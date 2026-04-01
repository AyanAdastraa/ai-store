import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 🟢 The new Next.js 16 "Proxy" convention
export async function proxy(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;

  const isLoggedIn = !!session;
  const isCheckoutPage = nextUrl.pathname.startsWith("/checkout");

  // If trying to access checkout without being logged in, redirect to login
  if (isCheckoutPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

// Keep your matcher config the same
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
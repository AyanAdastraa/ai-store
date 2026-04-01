import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  // 🟢 Protects any route starting with /checkout
  const isProtectedPage = req.nextUrl.pathname.startsWith("/checkout");

  // If trying to access a protected route without a session, redirect to login
  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
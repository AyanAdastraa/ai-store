import { auth } from "@/auth";
import { NextResponse } from "next/server";

// 🟢 Changed from "export default" to "export const proxy" for Next.js 16
export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedPage = req.nextUrl.pathname.startsWith("/checkout");

  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
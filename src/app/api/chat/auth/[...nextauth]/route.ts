// src/app/api/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "Route is active" });
}

export async function POST() {
  return NextResponse.json({ status: "Route is active" });
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    
    // Map legacyId to id so the frontend doesn't break
    const formattedProducts = products.map((p: any) => ({
      ...p,
      id: p.legacyId
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error: any) {
    console.error("Products Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch from SQLite DB" }, { status: 500 });
  }
}

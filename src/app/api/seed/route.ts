import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products } from "@/lib/products";

export async function POST() {
  try {
    // Wipe existing catalog to ensure clean insert
    await prisma.product.deleteMany({});
    
    // Insert all basic static items
    // Prisma SQLite doesn't natively support createMany, so we use a transaction
    const result = await prisma.$transaction(
      products.map(p => prisma.product.create({
        data: {
          legacyId: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image
        }
      }))
    );

    return NextResponse.json({
      message: "Database seeded successfully via Prisma SQLite.",
      count: result.length
    }, { status: 200 });

  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

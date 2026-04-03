import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "No user found to attach demo orders to." }, { status: 400 });
    }
    
    const products = await prisma.product.findMany({ take: 4 });
    if (products.length < 2) {
      return NextResponse.json({ error: "Please seed products first." }, { status: 400 });
    }

    // Wipe old orders to ensure clean state
    await prisma.order.deleteMany({ where: { userId: user.id } });

    const createDemoOrder = async (p: any, discountPercent: number, daysAgo: number) => {
      const saved = p.price * discountPercent;
      const final = p.price - saved;
      await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount: final,
          totalSaved: saved,
          createdAt: new Date(Date.now() - (daysAgo * 86400000)),
          items: {
            create: [
              { productId: p.id, price: final, quantity: 1 }
            ]
          }
        }
      });
    };

    // Add 4 demo orders with high discounts
    await createDemoOrder(products[0], 0.35, 1);
    await createDemoOrder(products[1], 0.15, 3);
    if(products[2]) await createDemoOrder(products[2], 0.40, 7);
    if(products[3]) await createDemoOrder(products[3], 0.10, 14);

    return NextResponse.json({ message: "4 Demo orders injected successfully!" }, { status: 200 });

  } catch (error: any) {
    console.error("Demo Orders Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

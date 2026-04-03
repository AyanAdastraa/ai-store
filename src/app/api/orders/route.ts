import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(orders, { status: 200 });

  } catch (error: any) {
    console.error("Orders Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cart, totalAmount, totalSaved } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Resolve product database IDs
    const resolvedItems = [];
    for (const item of cart) {
      const product = await prisma.product.findUnique({
        where: { legacyId: item.id.toString() }
      }).catch(() => null) || await prisma.product.findUnique({
        where: { id: item.id.toString() }
      });

      if (product) {
        resolvedItems.push({
          productId: product.id,
          price: item.finalPrice || item.price,
          quantity: 1
        });
      }
    }

    // Construct Order in DB
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        totalSaved,
        items: {
          create: resolvedItems
        }
      }
    });

    return NextResponse.json({ success: true, order }, { status: 200 });

  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

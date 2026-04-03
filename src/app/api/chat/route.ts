import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const rawProducts = await prisma.product.findMany();
    const products = rawProducts.map((p: any) => ({ ...p, id: p.legacyId }));

    const formData = await req.formData();
    const message = formData.get("message") as string;
    const contextStateStr = formData.get("contextState") as string;
    const historyStr = formData.get("history") as string;
    const image = formData.get("image") as File | null;

    const contextState = contextStateStr ? JSON.parse(contextStateStr) : {};
    const chatHistory = historyStr ? JSON.parse(historyStr) : [];

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Locked to stable 2.5
      generationConfig: { responseMimeType: "application/json" } 
    });

    const systemPrompt = `
      You are the ARCHIVE AI Pricing Engine, a high-end, professional negotiation concierge.
      Analyze the user's request against the CURRENT_CATALOG: ${JSON.stringify(products)}.
      
      PREVIOUS CONVERSATION LOG: ${JSON.stringify(chatHistory)}
      Current Negotiation State: ${JSON.stringify(contextState)}.

      PRICING & INTERACTION RULES:
      - Assess market demand, product rarity, and user offer history.
      - Never accept an offer below 70% of retail.
      - TONE: Speak directly to the user in a sharp, professional, premium tone. 
      - NEVER use the third person.

      You MUST respond with a perfectly valid JSON object matching this exact schema:
      {
        "price": number | null, 
        "range": { "min_acceptable": number | null, "max_realistic": number | null },
        "reason": "A direct, conversational message to the user explaining the decision.",
        "confidence": "high" | "medium" | "low", 
        "status": "deal" | "counter" | "unclear_product" | "invalid_input", 
        "discount_percentage": number,
        "product_name": "String name of the catalog item being negotiated, or null if unclear"
      }
    `;

    const promptData: any[] = [systemPrompt, message];

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      promptData.push({
        inlineData: { data: buffer.toString("base64"), mimeType: image.type },
      });
    }

    const result = await model.generateContent(promptData);
    const jsonDecision = JSON.parse(result.response.text());

    return NextResponse.json(jsonDecision);

  } catch (error: any) {
    console.error("AI Decision Error:", error);

    // 🟢 Detect Rate Limiting (429)
    if (error?.status === 429 || error?.message?.includes("429")) {
      return NextResponse.json({
        price: null,
        range: { min_acceptable: null, max_realistic: null },
        reason: "Neural link overloaded. Please wait 60 seconds before transmitting another offer.",
        confidence: "low",
        status: "error", // The frontend handles 'error' by locking the inputs safely
        discount_percentage: 0,
        product_name: null
      }, { status: 429 });
    }

    // Generic fallback for all other crashes
    return NextResponse.json({
      price: null,
      range: { min_acceptable: null, max_realistic: null },
      reason: "System error parsing neural link.",
      confidence: "low",
      status: "error",
      discount_percentage: 0,
      product_name: null
    }, { status: 500 });
  } // <-- Closes the catch block
} // <-- 🟢 ADDED: Closes the main export async function POST block
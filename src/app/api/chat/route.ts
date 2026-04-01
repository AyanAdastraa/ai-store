import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { products } from "@/lib/products";

// 🟢 FIX 1: Removed NEXT_PUBLIC_ for security. It now perfectly matches your .env.local!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File | null;

    // Make sure you are using a stable model version
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      You are 'THE AGENT', a high-end luxury AI Sales Broker for the ARCHIVE (AI.STORE). 
      Your tone is professional, minimal, and slightly mysterious.
      
      CURRENT_CATALOG: ${JSON.stringify(products)}.

      OPERATIONAL_RULES:
      1. If the user provides an image, analyze its aesthetic, color palette, and mood. 
      2. Recommend exactly ONE asset from the catalog that matches that vibe.
      3. You have the authority to grant a 10% or 15% discount if the user negotiates well.
      4. Always mention the specific discount percentage using the % symbol (e.g., "15%").
      5. Keep responses under 3 sentences. Brutalist and direct.
    `;

    let promptParts: any[] = [
      { text: systemPrompt },
      { text: message || "Analyze the context." }
    ];

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      
      promptParts.push({
        inlineData: {
          data: base64Data,
          mimeType: imageFile.type,
        },
      });
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("NEURAL_LINK_ERROR:", error);
    return NextResponse.json(
      { text: "CRITICAL: Neural link severed. Status: " + error.message }, 
      { status: 500 }
    );
  }
}
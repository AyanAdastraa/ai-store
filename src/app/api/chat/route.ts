import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { products } from "@/lib/products";

// Use the NEXT_PUBLIC prefix so Vercel can see it easily
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File | null;

    // 🔴 FIX: Changed model to 'gemini-1.5-flash' (the correct stable version)
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

    // Initialize prompt parts with the system instructions and user message
    let promptParts: any[] = [
      { text: systemPrompt },
      { text: message || "Analyze the context." }
    ];

    // Convert image to Base64 if it exists
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

    // Generate content
    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("NEURAL_LINK_ERROR:", error);
    // Return a more "on-brand" error message for your UI
    return NextResponse.json(
      { text: "CRITICAL: Neural link severed. Status: " + error.message }, 
      { status: 500 }
    );
  }
}
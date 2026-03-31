import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { products } from "@/lib/products";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File | null;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `
      You are a luxury AI Sales Agent for AI.STORE. 
      Catalog: ${JSON.stringify(products)}.
      Rules: 
      1. If an image is provided, analyze its colors/vibe and recommend a matching product.
      2. You can offer a 10% or 15% discount if the user asks. Always use the % symbol.
    `;

    let promptParts: any[] = [systemPrompt, message];

    // If there's an image, convert it to the format Gemini expects
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString("base64");
      promptParts.push({
        inlineData: {
          data: base64Image,
          mimeType: imageFile.type,
        },
      });
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("AI_ERROR:", error);
    return NextResponse.json({ text: "Neural link error: " + error.message }, { status: 500 });
  }
}
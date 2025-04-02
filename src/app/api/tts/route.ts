import { createClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY || "";

export async function POST(req: NextRequest){

  try {
    const deepgram = createClient(DEEPGRAM_API_KEY);
    const model = "aura-orpheus-en";
    const prompt = await req.json()
    const result = await deepgram.speak.request(prompt, { model });
  
    const stream = await result.getStream();
    const headers = await result.getHeaders();
  
    const response = new NextResponse(stream, { headers });
    response.headers.set("Surrogate-Control", "no-store");
    response.headers.set(
      "Cache-Control",
      "s-maxage=0, no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Expires", "0");
  
    return response;
  }
  catch (error) {
    console.error("Failed to generate tts", error);
    return NextResponse.json(
      { error: "Failed to generate tts" },
      { status: 500 }
    );
  }
}
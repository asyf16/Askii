import { createClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY || "";

export async function POST(req: NextRequest) {
    try {
      const { url } = await req.json();
        const deepgram = createClient(DEEPGRAM_API_KEY);
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: url,
        },
        {
          model: "nova-3", 
          smart_format: true, 
        }
      );
  
      if (error) {
        return NextResponse.json(
          { error: "Error transcribing audio", details: error },
          { status: 500 }
        );
      }
  
      return NextResponse.json(result, { status: 200 }); 
  
    } catch (error) {
      return NextResponse.json(
        { error: "Error processing stt request", details: error },
        { status: 500 }
      );
    }
  }
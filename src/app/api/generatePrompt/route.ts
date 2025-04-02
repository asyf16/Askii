import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

const GENAI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  const { behavorial, resume, technical } = await req.json();

  if (!behavorial && !resume && !technical) {
    return NextResponse.json(
      { error: "Question amount is required." },
      { status: 400 }
    );
  }

  try {
    const google_AI = new GoogleGenerativeAI(GENAI_API_KEY);
    const AI_model = await google_AI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    'questionPrompt': {
                        type: SchemaType.STRING,
                        description: 'question',
                        nullable: false,
                    },
                    'questionType': {
                        type: SchemaType.STRING,
                        description: "type of the question. must be either Behavioral, Resume, or Technical",
                        nullable: false,
                    },
                },
                required: ['questionPrompt', 'questionType'],
            },
        },
      },
    });
    const AI_prompt = `You are an interviewer for a Software engineering role. Please come up with ${behavorial} behavorial interview questions, ${resume} resume interview questions, and ${technical} technical interview questions. Each question should be less than 2000 characters.`;
    const result = await AI_model.generateContent([AI_prompt]);

    if (result && result.response) {
      const text = await result.response.text();
      return NextResponse.json( text );
    } else {
      throw new Error("No response received, questions not generated.");
    }
  } catch (error) {
    console.error("Failed to generate questions", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}

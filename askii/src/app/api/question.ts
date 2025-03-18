import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { sessionId, categoryName, prompt, response, rating } = await req.json();
  
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    return NextResponse.json(
      { message: 'Session not found' },
      { status: 404 }
    );
  }

  const question = await prisma.question.create({
    data: {
      prompt,
      response,
      rating,
      category: categoryName,
      sessionId, 
    },
  });

  return NextResponse.json(question);
}

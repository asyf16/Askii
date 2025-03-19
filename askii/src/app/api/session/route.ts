import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const auth0_id = url.searchParams.get('auth0_id');
    
    if (!auth0_id) {
        return NextResponse.json({ error: "auth0_id is required" }, { status: 400 });
      }

    const user = await prisma.user.findUnique({
        where: { auth0_id },
      });
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      const userId = user.id;

  const sessions = await prisma.session.findMany({where: {userId}, include: {question: true}});
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
    const { auth0_id, date } = await req.json();

    const user = await prisma.user.findUnique({
      where: { auth0_id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;
  
    const session = await prisma.session.create({
      data: {
        date: new Date(date),
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(session);
}
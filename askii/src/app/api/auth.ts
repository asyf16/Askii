import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { email, name, auth0_id } = await req.json();

  let user = await prisma.user.findUnique({
    where: { auth0_id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email, name, auth0_id },
    });
  }
  return NextResponse.json(user);
}

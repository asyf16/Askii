import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { email, auth0_id, name } = await req.json();

  let user = await prisma.user.findUnique({
    where: { auth0_id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email, auth0_id, name: name || null },
    });
  }else {
    user = await prisma.user.update({
      where: { auth0_id },
      data: { name: name || user.name },
    });
  }
  return NextResponse.json(user);
}

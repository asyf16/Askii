import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

enum Rating {
    GOOD = "GOOD",
    MEDIOCRE = "MEDIOCRE",
    BAD = "BAD",
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const auth0_id = url.searchParams.get("auth0_id");

    if (!auth0_id) {
        return NextResponse.json(
            { error: "auth0_id is required" },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { auth0_id },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    const sessions = await prisma.session.findMany({
        where: { userId },
        include: { question: true },
    });
    const questions = await prisma.question.findMany({
        where: {
            sessionId: {
                in: sessions.map((session) => session.id),
            },
        },
        include: {
            session: true,
        },
    });

    const groupedQuestions: Record<Rating, typeof questions> = {
        [Rating.GOOD]: [],
        [Rating.MEDIOCRE]: [],
        [Rating.BAD]: [],
      };

    questions.forEach((question) => {
        groupedQuestions[question.rating].push(question);
      });
    return NextResponse.json(groupedQuestions);
}

export async function POST(req: Request) {
    const { sessionId, rating, notes, prompt, response, category } = await req.json();
    const userNotes = notes ?? "";

    const question = await prisma.question.create({
        data: {
            session: { connect: { id: sessionId } },
            prompt,
            rating,
            response,
            category,
            notes: userNotes
        },
    });
    return NextResponse.json(question);
}

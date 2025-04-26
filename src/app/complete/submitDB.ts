

import { Question } from "@/types/types";

export const submitDB = async (questions: Question[], auth0_id: string, date: string) => {
    try {
        const response = await fetch("/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth0_id, date })
        });

        if (response.ok) {
            const session = await response.json();
            const sessionId = session.id;

            for (const question of questions) {
                await fetch("/api/question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sessionId,
                        response: question.response,
                        rating: question.rating,
                        notes: question.notes,
                        prompt: question.prompt,
                        category: question.category
                    })
                });
            }
        }
    } catch (error) {
        console.error("Error submitting to database:", error);
        throw error;
    }
}

import { Question } from "@/types/types";

export const submitDB = async (questions: Question[], auth0_id: string, date: string, audioUrl: string[]) => {
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

            questions.forEach(async (question, index) => {
                const sttResponse = await fetch("/api/stt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url: audioUrl[index] })
                });
                const sttData = await sttResponse.json();
                await fetch("/api/question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sessionId,
                        response: sttData,
                        rating: question.rating,
                        notes: question.notes,
                        prompt: question.prompt,
                        category: question.category
                    })
                });
            });
        }
    } catch (error) {
        console.error("Error submitting to database:", error);
        throw error;
    }
}

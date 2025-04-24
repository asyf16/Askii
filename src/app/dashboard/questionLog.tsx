"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmilePlus, Meh, Angry } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { QuestionComponent } from "./question-component"

export default function QuestionLog() {
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState<any>(null)

    useEffect(() => {
        if (user) {
            const fetchQuestions = async () => {
                try {
                    const response = await fetch(`/api/question?auth0_id=${user.sub}`, {
                        method: "GET",
                    })

                    if (response.ok) {
                        const data = await response.json()
                        setQuestions(data)
                    } else {
                        console.error("Failed to fetch questions:", response.statusText)
                    }
                } catch (error) {
                    console.error("Error fetching questions:", error)
                } finally {
                    setLoading(false)
                }
            }
            fetchQuestions()
        }
    }, [user])

    if (loading) {
        return (
            <div className="pt-24 px-6 pb-10 w-full flex justify-center items-center">
                <div className="text-center text-lg font-semibold text-primary">
                    <div className="animate-pulse text-gray-600">
                        <p>Loading your questions...</p>
                        <div className="mt-4 w-16 h-2 bg-gray-300 rounded-full mx-auto"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!questions) {
        return (
            <div className="pt-24 px-6 pb-10 w-full flex justify-center items-center">
                <h1 className="text-3xl tracking-tight font-bold mb-2 font-archivo-black">Question Log</h1>
                <p className="mb-6">View your past interview questions and answers, sorted by rating</p>

                <div className="text-center text-lg font-semibold text-gray-600">
                    <p>No questions found.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 pt-24">
            <h1 className="sm:text-3xl text-xl tracking-tight font-bold mb-2 font-archivo-black">Question Log</h1>
            <p className="mb-6">View your past interview questions and answers, sorted by rating</p>

            <div className="space-y-6">
                {Object.entries(questions).map(([category, categoryQuestions]: [string, any]) => (
                    <Card key={category}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {category === "GOOD" ? (
                                    <SmilePlus className="h-5 w-5 text-green-500" />
                                ) : category === "MEDIOCRE" ? (
                                    <Meh className="h-5 w-5 text-amber-500" />
                                ) : (
                                    <Angry className="h-5 w-5 text-red-500" />
                                )}
                                {category} Questions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {categoryQuestions.map((question: any, index: number) => (
                                    <QuestionComponent
                                        key={index}
                                        category={{
                                            [question.prompt]: {
                                                Response: question.response,
                                                Rating: question.rating,
                                                Notes: question.notes
                                            }
                                        }}
                                        categoryName={question.category}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 
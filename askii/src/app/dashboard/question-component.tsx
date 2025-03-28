
"use client";
import { useState } from "react";
import {
  FileUser,
  FileText,
  FileJson,
  ChevronDown,
  CheckCircle,
  Circle,
  CircleX,
} from "lucide-react";

interface Question {
  Response: string;
  Rating: string;
  Notes: string;
}

export function QuestionComponent({
    category,
    categoryName,
  }: {
    category: Record<string, Question>;
    categoryName: string;
  }) {
    const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(
      {}
    );
  
    const toggleQuestion = (question: string) => {
      setOpenQuestions((prev) => ({
        ...prev,
        [question]: !prev[question],
      }));
    };
    return (
      <div>
        <div className="mb-1 italic text-sm text-muted-foreground">
          {categoryName}
        </div>
        {Object.entries(category).map(([question, { Response, Rating, Notes }]) => (
          <div
            key={question}
            className="relative flex flex-col font-montserrat text-xs sm:text-sm mb-2"
          >
            <div
              className={`relative flex flex-row items-center gap-2 font-bold text-md sm:text-lg pr-8 border rounded-xl p-2 shadow-md cursor-pointer transition-colors ${
                Rating === "GOOD"
                  ? "bg-[hsl(var(--good-neutral))] border-[hsl(var(--good))]/70 hover:bg-[hsl(var(--good))]/30"
                  : Rating === "MEDIOCRE"
                  ? "bg-[hsl(var(--mid-neutral))] border-[hsl(var(--mid))]/70 hover:bg-[hsl(var(--mid))]/30"
                  : "bg-[hsl(var(--bad-neutral))] border-[hsl(var(--bad))]/70 hover:bg-[hsl(var(--bad))]/30"
              }`}
              onClick={() => toggleQuestion(question)}
            >
              <div className="flex-shrink-0">
                {categoryName === "Behavioral" ? (
                  <FileUser className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : categoryName === "Resume" ? (
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <FileJson className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <span className="flex-1">{question}</span>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <ChevronDown
              className={`transform transition-transform duration-200 ${
                openQuestions[question] ? "rotate-180" : ""
              }`}
            />
              </div>
            </div>
            {openQuestions[question] && (
              <div className="mt-2 p-3 bg-muted-foreground/10 border-border border rounded-lg shadow-sm">
                <p className="font-semibold">Your response:</p>
                <p>{Response}</p>
                <p className="font-semibold mt-1">
                  {Rating === "GOOD" ? (
                    <div className="flex flex-row gap-1 text-[hsl(var(--good))]">
                      <CheckCircle className="w-4 h-4" /> {Notes ? `My notes: ${Notes}`: "Good reponse, well practiced"}
                    </div>
                  ) : Rating === "MEDIOCRE" ? (
                    <div className="flex flex-row  text-[hsl(var(--mid))] gap-1">
                      <Circle className="w-4 h-4" /> {Notes ? `My notes: ${Notes}` : "Could practice this question more"}
                    </div>
                  ) : (
                    <div className="flex flex-row gap-1 text-[hsl(var(--bad))]">
                      <CircleX className="w-4 h-4" /> {Notes ? `My notes: ${Notes}`: "Not prepared, practice this question more"}
                    </div>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
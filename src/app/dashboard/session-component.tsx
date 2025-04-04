"use client";
import { useState } from "react";
import {
  MessageCircleQuestion,
  WholeWord,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { QuestionComponent } from "./question-component";
import questionColors from "@/lib/constants";
import { SessionComponentProps } from "@/types/types";

export function SessionComponent({ session }: SessionComponentProps) {
  const [isActive, setIsActive] = useState(false);
  const date = new Date(session.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function transformQuestions(rawQuestions: any[]) {
    const transformed: { [category: string]: { [prompt: string]: { Response: string; Rating: string; Notes: string; } } } = {};
      rawQuestions.forEach((q) => {
      const { category, prompt, response, rating, notes } = q;
  
      if (!transformed[category]) {
        transformed[category] = {};
      }
        transformed[category][prompt] = {
        Response: response,
        Rating: rating,
        Notes: notes
      };
    });
  
    return transformed;
  }

  const questions = transformQuestions(session.question);

  const time:number = 10;

  const totalQuestions = Object.values(questions).flatMap(Object.values).length;
  const goodQuestions = Object.values(questions)
    .flatMap(Object.values)
    .filter((q) => q.Rating === "GOOD").length;
  const mediocreQuestions = Object.values(questions)
    .flatMap(Object.values)
    .filter((q) => q.Rating === "MEDIOCRE").length;

  const averageRating = totalQuestions > 0 ? Math.floor(
    (goodQuestions * 10 + mediocreQuestions * 5) / totalQuestions
  ) : 0;


  const arrayQ = Object.values(questions)
  .flatMap(Object.values);

const totalWordCount = arrayQ.reduce((acc, curr) => {
  if (curr.Response) {
    const wordCount = curr.Response.trim().split(/\s+/).length;
    return acc + wordCount;
  }
  return acc;
}, 0);

const averageWords = arrayQ.length > 0 ? totalWordCount / arrayQ.length : 0;

  return (
    <div className="w-full">
    <div className="text-zinc-500 font-montserrat text-sm flex items-center mb-1">
      <span className="mr-2">{formattedDate}</span>
      <hr className="flex-grow border-t border-zinc-600/30" />
    </div>
    <div className="w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-all font-montserrat duration-300 ease-in-out">
      <div className="p-6 space-y-2">

        <div className="flex flex-wrap gap-2 text-sm justify-between">
          <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="w-5 h-5" aria-hidden="true" />
            <span>{totalQuestions} questions</span>
          </div>
          <div className="items-center gap-2 sm:flex hidden">
            <BadgeCheck className="w-5 h-5" aria-hidden="true" />
            <span>
              {goodQuestions} Good
            </span>
          </div>
          <div className="flex items-center gap-2">
            <WholeWord className="w-5 h-5" aria-hidden="true" />
            <span>{averageWords} words (avg)</span>
          </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full" style={{ backgroundColor: `#${questionColors[averageRating]}` }}
            ></div>
            <span className="font-semibold">Rating: {averageRating}/10</span>
          </div>
        </div>

        <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${(averageRating / 10) * 100}%`,  backgroundColor: `#${questionColors[averageRating]}` }}
            role="progressbar"
            aria-valuenow={averageRating}
            aria-valuemin={0}
            aria-valuemax={10}
          ></div>
        </div>

        <button
          className="w-full flex items-center justify-between px-4 py-2 bg-foreground/10 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/30 hover:bg-foreground/15"
          onClick={() => setIsActive(!isActive)}
          aria-expanded={isActive}
          aria-controls="session-details"
        >
          <span>{isActive ? "Hide Details" : "View Details"}</span>
          <ChevronDown
              className={`transform transition-transform duration-200 ${
                isActive ? "rotate-180" : ""
              }`}
            />
        </button>
      </div>
      {isActive && (
          <div
            id="session-details"
            className={`p-6 bg-background/50 border-t border-border space-y-3 transition-all duration-300 ease-in-out`}
          >
            {Object.entries(questions).map(([categoryName, categoryQuestions]) => (
              <QuestionComponent
                key={categoryName}
                category={categoryQuestions}
                categoryName={categoryName}
              />
            ))}
          </div>
        )}
    </div>
    </div>
  );
}

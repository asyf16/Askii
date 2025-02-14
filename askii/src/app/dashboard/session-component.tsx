"use client";
import { useState } from "react";
import {
  MessageCircleQuestion,
  Clock,
  Star,
  FileUser,
  FileText,
  FileJson,
  Minimize2,
  Maximize2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  CircleX,
} from "lucide-react";
interface Question {
  Response: string;
  Rating: string;
}

const good = 3;
const mediocre = 2;
const bad = 1;
const date = new Date();
const formattedDate = date.toLocaleDateString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const questions = {
  Behavorial: {
    "Why do you want to join us?": {
      Response:
        "I want to join because I want to learn more about the company and the culture.",
      Rating: "Good",
    },
    "Why should we hire you?": {
      Response: "I am a hard worker and I am willing to learn.",
      Rating: "Mediocre",
    },
  },
  Resume: {
    "Tell me about an experience you had when you were in a team": {
      Response:
        "I was in a team of 5 people and we were able to complete the project in 2 days.",
      Rating: "Good",
    },
    "Tell me about a project on your resume": {
      Response:
        "I made a website for a local business using HTML, CSS, and JavaScript.",
      Rating: "Bad",
    },
  },
  Leetcode: {
    "What is the time complexity of the following code?": {
      Response: "The time complexity is O(n^2).",
      Rating: "Bad",
    },
  },
};

function QuestionComponent({
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
      {Object.entries(category).map(([question, { Response, Rating }]) => (
        <div
          key={question}
          className="relative flex flex-col font-montserrat text-xs sm:text-sm mb-2"
        >
          <div
            className={`relative flex flex-row items-center gap-2 font-bold text-md sm:text-lg pr-8 border-2 rounded-xl p-2 shadow-md cursor-pointer transition-colors ${
              Rating === "Good"
                ? "bg-[hsl(var(--good-neutral))] border-[hsl(var(--good))] hover:bg-[hsl(var(--good))]/30"
                : Rating === "Mediocre"
                ? "bg-[hsl(var(--mid-neutral))] border-[hsl(var(--mid))] hover:bg-[hsl(var(--mid))]/30"
                : "bg-[hsl(var(--bad-neutral))] border-[hsl(var(--bad))] hover:bg-[hsl(var(--bad))]/30"
            }`}
            onClick={() => toggleQuestion(question)}
          >
            <div className="flex-shrink-0">
              {categoryName === "Behavorial" ? (
                <FileUser className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : categoryName === "Resume" ? (
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <FileJson className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>
            <span className="flex-1">{question}</span>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {openQuestions[question] ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          {openQuestions[question] && (
            <div className="mt-2 p-2 bg-muted-foreground/20 border-border border rounded-lg shadow-sm">
              <p className="font-semibold">Your response:</p>
              <p>{Response}</p>
              <p className="font-semibold mt-1">
                {Rating === "Good" ? (
                  <div className="flex flex-row gap-1 text-[hsl(var(--good))]">
                    <CheckCircle className="w-4 h-4" /> Well-practiced response,
                    good job!
                  </div>
                ) : Rating === "Mediocre" ? (
                  <div className="flex flex-row  text-[hsl(var(--mid))] gap-1">
                    <Circle className="w-4 h-4" /> Average response, could be
                    better.
                  </div>
                ) : (
                  <div className="flex flex-row gap-1 text-[hsl(var(--bad))]">
                    <CircleX className="w-4 h-4" /> Poor response, needs
                    improvement.
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
export function SessionComponent() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="w-full">
      <span className="text-zinc-500 font-montserrat text-sm">
        {formattedDate}
      </span>
      <div className="relative w-full border px-6 py-4 bg-card rounded-xl shadow-md my-2 border-border">
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-xs sm:text-sm">
          <MessageCircleQuestion className="w-4 h-4" />
          <p>{good + mediocre + bad} questions </p>
          <Clock className="w-4 h-4" />
          <p>10 minutes </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-sm sm:text-md font-bold pt-2 mb-2">
          <p>
            {good} Good, {mediocre} Mediocre, {bad} Bad
          </p>
          <div className="w-6 h-6 bg-red-500 rounded-full sm:inline-block hidden"></div>
        </div>
        <div
          className="p-4 absolute z-10 left-[calc(100%-65px)] top-2 hover:text-primary"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <Minimize2 /> : <Maximize2 />}
        </div>
        {isActive && (
          <div>
            <QuestionComponent
              category={questions.Behavorial}
              categoryName="Behavorial"
            />
            <QuestionComponent
              category={questions.Resume}
              categoryName="Resume"
            />
            <QuestionComponent
              category={questions.Leetcode}
              categoryName="Leetcode"
            />
          </div>
        )}
      </div>
    </div>
  );
}

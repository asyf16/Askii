"use client";
import { useState } from "react";
import {
  MessageCircleQuestion,
  Clock,
  // Star,
  Minimize2,
  Maximize2,
  BadgeCheck
} from "lucide-react";
import questionColors from "@/lib/constants";
import { QuestionComponent } from "./question-component";

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
export function SessionComponent() {
  const totalQuestions = good + mediocre + bad;
  const averageRating =
  totalQuestions > 0 ? Math.floor((good * 10 + mediocre * 5 + bad * 0) / totalQuestions) : 0;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="w-full">
      <div className="text-zinc-500 font-montserrat text-sm flex items-center">
        <span className="mr-2">{formattedDate}</span>
        <hr className="flex-grow border-t border-zinc-600/30" />
      </div>
      <div className="relative w-full border px-6 py-4 bg-card rounded-xl shadow-md my-2 border-border">
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-xs sm:text-sm">
          <MessageCircleQuestion className="w-4 h-4" />
          <p>{totalQuestions} questions </p>
          <Clock className="w-4 h-4" />
          <p>10 minutes </p>
          <BadgeCheck className="w-4 h-4" />
          <p>Rating {averageRating}/10 </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-sm sm:text-md font-bold pt-2 mb-2">
          <p>
            {good} Good, {mediocre} Mediocre, {bad} Bad
          </p>
          <div
            className={`w-6 h-6 rounded-full sm:inline-block hidden ${
              questionColors[averageRating
              ]
            }`}
          ></div>
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

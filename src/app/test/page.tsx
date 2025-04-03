"use client";

import { useContext, useEffect } from "react";
import { Context } from "@/lib/ContextProvider";
import { questionIndexGetLS } from "@/lib/ContextProvider"
import { genPromptsGetLS } from "@/lib/ContextProvider";
import { GeneratedQuestionsArray } from "@/types/types";

const MOCK :GeneratedQuestionsArray = [{questionPrompt: "HI", questionType: "Behavioral"}]

export default function Complete() {
  const { questionIndex, setQuestionIndex, generatedPrompts, setGeneratedPrompts } = useContext(Context);

  useEffect(() => {
    setQuestionIndex(questionIndexGetLS());
  }, [])

  useEffect(() => {
    setGeneratedPrompts(genPromptsGetLS());
  }, [])

  return (
    <div>
      <button onClick={() => setQuestionIndex(questionIndex + 1)}>
        {questionIndex}
      </button>

      <button onClick={() => setGeneratedPrompts(MOCK)}>
        {JSON.stringify(generatedPrompts)}
      </button>
    </div>
  );
}

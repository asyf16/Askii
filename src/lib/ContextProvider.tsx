"use client";

import * as React from "react";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { GeneratedQuestionsArray } from "@/types/types";
import { GENERATED_PROMPTS_KEY, QUESTION_INDEX_KEY } from "./constants";

const isServer = typeof window === "undefined";

export const genPromptsSetLS = (value: GeneratedQuestionsArray) => {
  try {
    localStorage.setItem(GENERATED_PROMPTS_KEY, JSON.stringify(value));
  } catch (e) {}
};

export const genPromptsGetLS = (): GeneratedQuestionsArray => {
  try {
    const response = localStorage.getItem(GENERATED_PROMPTS_KEY);
    return response ? JSON.parse(response) : [];
  } catch (e) {
    console.error("Error reading generated prompts from localStorage:", e);
    return [];
  }
};

export const questionIndexSetLS = (value: number) => {
  try {
    localStorage.setItem(QUESTION_INDEX_KEY, value.toString(10));
  } catch (e) {}
};

export const questionIndexGetLS = (): number => {
  try {
    const response = localStorage.getItem(QUESTION_INDEX_KEY);
    const parsed = response ? parseInt(response, 10) : -1;
    return isNaN(parsed) ? -1 : parsed;
  } catch (e) {
    console.error("Error reading question index from localStorage:", e);
    return -1;
  }
};

export const Context = createContext<{
  generatedPrompts: GeneratedQuestionsArray;
  setGeneratedPrompts: (prompts: GeneratedQuestionsArray) => void;
  questionIndex: number;
  setQuestionIndex: (index: number) => void;
}>({
  generatedPrompts: [],
  setGeneratedPrompts: () => void {},
  questionIndex: -1,
  setQuestionIndex: () => void {},
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [generatedPrompts, setCurrentGeneratedPrompts] =
    useState<GeneratedQuestionsArray>([]);
  const [questionIndex, setCurrentQuestionIndex] = useState<number>(-1);

  const setGeneratedPrompts = useCallback(
    (
      value:
        | GeneratedQuestionsArray
        | ((
            currentGenPrompts: GeneratedQuestionsArray
          ) => GeneratedQuestionsArray)
    ) => {
      const newGenPrompts =
        typeof value === "function" ? value(generatedPrompts) : value;

      setCurrentGeneratedPrompts(newGenPrompts);
      try {
        genPromptsSetLS(newGenPrompts);
      } catch (e) {
        console.log(e);
      }
    },
    [generatedPrompts]
  );

  const setQuestionIndex = useCallback(
    (value: number | ((currentArray: number) => number)) => {
      const newArray =
        typeof value === "function" ? value(questionIndex) : value;

      setCurrentQuestionIndex(newArray);
      try {
        questionIndexSetLS(newArray);
      } catch (e) {
        console.log(e);
      }
    },
    [questionIndex]
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== GENERATED_PROMPTS_KEY) {
        return;
      }
      if (!event.newValue) {
        setGeneratedPrompts([]);
      } else {
        try {
          const result = JSON.parse(event.newValue);
          setCurrentGeneratedPrompts(result);
        } catch (e) {
          console.log(e);
          setCurrentGeneratedPrompts([]);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setGeneratedPrompts]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== QUESTION_INDEX_KEY) {
        return;
      }
      if (!event.newValue) {
        setQuestionIndex(-1);
      } else {
        try {
          const result = parseInt(event.newValue, 10);
          setCurrentQuestionIndex(result);
        } catch (e) {
          console.log(e);
          setCurrentQuestionIndex(-1);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setQuestionIndex]);

  const contextProviderValue = useMemo(
    () => ({
      generatedPrompts,
      setGeneratedPrompts,
      questionIndex,
      setQuestionIndex,
    }),
    [generatedPrompts, setGeneratedPrompts, questionIndex, setQuestionIndex]
  );

  return (
    <Context.Provider value={contextProviderValue}>{children}</Context.Provider>
  );
}

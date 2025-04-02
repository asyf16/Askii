// components/TTSComponent.tsx
"use client";

import React from "react";
import { useFetchQuestions } from "../interview/useFetchQuestions";
const TTSComponent = () => {
    const { questions, loading } = useFetchQuestions(
      "1", "2", "3"
    );

  if (loading){
    return <></>
  }
  return (
    <div>{JSON.stringify(questions)}
    <button onClick={() => {console.log(questions)}}>click me</button></div>
  )
};

export default TTSComponent;

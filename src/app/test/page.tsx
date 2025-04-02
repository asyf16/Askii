// components/TTSComponent.tsx
"use client";

import React from "react";
import { useGenerateVoice } from "../interview/useGenerateVoice";

const TTSComponent = () => {
  const { loading, handleTextToSpeech } = useGenerateVoice(
  );

  return (
    <div>
      <button onClick={() => {handleTextToSpeech("Testing")}} disabled={loading}>
        {loading ? "Generating..." : "Generate Speech"}
      </button>
    </div>
  );
};

export default TTSComponent;

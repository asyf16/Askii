"use client";

import { useState } from "react";

export default function InteractiveForm() {
  const [tweet, setTweet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const technical = 1;
    const behavorial = 2;
    const resume = 3;
    setLoading(true);

    const response = await fetch("/api/generatePrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ behavorial, resume, technical }),
    });

    const result = await response.json();
    setLoading(false);
    console.log(result);

    if (result) {
      setTweet(result);
    } else {
      console.error("Error:", result.error);
    }
  };


  return (
    <div className="w-full relative">
      <button onClick={handleSubmit}>YO PLSSS WORKRKKK</button>
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50">
          <span className="text-white">Generating tweet...</span>
        </div>
      ) : <div className="text-black">{JSON.stringify(tweet)}</div>}
    </div>
  );
}

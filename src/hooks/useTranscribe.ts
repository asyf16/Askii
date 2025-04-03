import { useState } from "react";
export function useTranscribe() {
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleTranscribe = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/stt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }
      const data = await response.json();
      setTranscription(data.transcription || "No transcription available.");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, transcription, handleTranscribe };
}

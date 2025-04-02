import { useState } from "react";

export const useGenerateVoice = () => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleTextToSpeech = async (text:string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        const audio = new Audio(url);
        audio.play();
      } else {
        console.error("Failed to generate TTS", await response.json());
      }
    } catch (error) {
      console.error("Error generating TTS", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleTextToSpeech };
};

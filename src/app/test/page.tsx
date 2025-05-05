"use client";
import { useState } from "react";

export default function Test() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleUrlSubmit = async () => {
    if (!fileUrl) return;
    
    setUploadStatus("idle");
    setTranscription(null);
    
    try {
      setUploadStatus("success");
      await transcribeAudio(fileUrl);
    } catch (error) {
      setUploadStatus("error");
    }
  };

  const transcribeAudio = async (audioUrl: string) => {
    setIsTranscribing(true);
    try {
      const response = await fetch("/api/stt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: audioUrl }),
      });

      if (!response.ok) {
        throw new Error("Transcription failed");
      }

      const data = await response.json();
      setTranscription(data.results?.channels[0]?.alternatives[0]?.transcript || "No transcription available");
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscription("Error transcribing audio");
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Speech-to-Text Test</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Audio URL:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="Enter audio URL"
            className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Transcribe
          </button>
        </div>
      </div>

      {uploadStatus === "success" && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-600 dark:text-green-400">URL submitted successfully!</p>
            {fileUrl && (
              <div className="mt-2">
                <p className="font-semibold">Audio URL:</p>
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {fileUrl}
                </a>
              </div>
            )}
          </div>

          {isTranscribing ? (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-yellow-600 dark:text-yellow-400">Transcribing audio...</p>
            </div>
          ) : transcription && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Transcription Result:</h2>
              <p className="whitespace-pre-wrap">{transcription}</p>
            </div>
          )}
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">Error processing audio. Please try again.</p>
        </div>
      )}
    </div>
  );
}
"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useContext } from "react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Webcam from "react-webcam";
import InterviewVideo from "./interview-video";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { PhoneMissed, Pause, Captions, Info, User } from "lucide-react";
import { useGenerateVoice } from "../../hooks/useGenerateVoice";
import { Context } from "@/lib/ContextProvider";
import { questionIndexGetLS, genPromptsGetLS } from "@/lib/ContextProvider";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function Interview() {
  const {
    questionIndex,
    setQuestionIndex,
    generatedPrompts,
    setGeneratedPrompts,
  } = useContext(Context);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [currentCaption, setCurrentCaption] = useState<string>("");
  const [useCaption, setUseCaption] = useState<boolean>(true);

  const { handleTextToSpeech, audioFinished } = useGenerateVoice();

  useEffect(() => {
    setQuestionIndex(questionIndexGetLS());
    setGeneratedPrompts(genPromptsGetLS());
  }, []);

  useEffect(() => {
    if (questionIndex < generatedPrompts.length) {
      handleTextToSpeech(generatedPrompts[questionIndex].questionPrompt);
      setCurrentCaption(generatedPrompts[questionIndex].questionPrompt);
    }
  }, [questionIndex]);

  useEffect(() => {
    // Start recording when TTS finishes
    if (audioFinished) {
      if (questionIndex === 0) {
        setQuestionIndex(questionIndex + 1);
      } else {
        handleStartRecording();
      }
    }
  }, [audioFinished]);

  const handleStartRecording = React.useCallback(() => {
    // Start recording
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    },
    [setRecordedChunks]
  );

  const handleSaveVideo = React.useCallback(() => {
    if (recordedChunks.length) {
      const chunkUrls = recordedChunks.map((chunk) =>
        URL.createObjectURL(chunk)
      );
      localStorage.setItem("videoChunks", JSON.stringify(chunkUrls));
    }
  }, [recordedChunks]);

  const handleStopRecording = React.useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, [mediaRecorderRef, webcamRef, setRecording]);

  return (
    <div className="w-screen h-[100vh] flex flex-col">
      <div className="text-zinc-500 font-montserrat text-sm font-bold absolute top-2 left-6 z-40">
        ASKII.
      </div>

      <div className="w-full h-[35px] absolute top-0 left-0 bg-zinc-700 flex flex-row justify-center items-center text-white font-montserrat">
        My Interview
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-3xl bg-transparent hover:bg-transparent text-white hover:text-zinc-300 z-40"
                size={"icon"}
              >
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent className=" text-white">
              <p>Press pause to end your response after each question</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-full w-[100vw] flex flex-col md:flex-row gap-2 bg-zinc-900 justify-center items-center px-2">
        <div className="w-full h-[35%] md:h-[60%] bg-white rounded-md">
          <InterviewVideo src={"/assets/interviewer.webm"} />
        </div>
        <div className="w-full md:w-full h-[35%] md:h-[60%] bg-zinc-500 rounded-md relative">
          <User className="absolute h-24 w-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white opacity-50 z-0" />
          <Webcam
            ref={webcamRef}
            muted={true}
            audio={true}
            className="w-full h-full object-cover rounded-md relative z-10"
            videoConstraints={videoConstraints}
          />
        </div>
      </div>
      <div className="w-full h-[75px] fixed bottom-0 py-2 gap-6 left-0 bg-zinc-800 flex flex-row justify-center items-center text-white font-montserrat">
        <div
          className="flex flex-col items-center gap-[3px] "
          onClick={() =>
            toast.warning("End current interview?", {
              description: "Progress will not be saved.",
              action: {
                label: "Confirm",
                onClick: () => (window.location.href = "/dashboard"),
              },
            })
          }
        >
          <Button
            className="rounded-3xl bg-red-700 hover:bg-red-900"
            size={"icon"}
          >
            <PhoneMissed />
          </Button>
          <h1 className="text-xs">End Interview</h1>
        </div>
        <div className="flex flex-col items-center gap-[3px] ">
          <Button
            className="rounded-3xl bg-zinc-500 hover:bg-zinc-600"
            size={"icon"}
            onClick={() => setUseCaption(!useCaption)}
          >
            <Captions />
          </Button>
          <h1 className={`text-xs text-white`}>Toggle Captions</h1>
        </div>
        <div className="flex flex-col items-center gap-[3px] ">
          <Button
            className="rounded-3xl bg-zinc-500 hover:bg-zinc-600"
            size={"icon"}
            disabled={!recording}
            onClick={() => {
              handleStopRecording();
              setQuestionIndex(questionIndex + 1);
              if (questionIndex + 1 >= generatedPrompts.length) {
                handleSaveVideo();
                window.location.href =
                  "/complete?time=" + new Date().toISOString();
              }
            }}
          >
            <Pause />
          </Button>
          <h1
            className={`text-xs ${recording ? "text-zinc-500" : "text-white"}`}
          >
            Finish Answer
          </h1>
        </div>
      </div>
      {recording && (
        <div className="absolute top-20 left-[50%] -translate-x-[50%] flex items-center gap-2 bg-red-700 text-white font-montserrat px-3 py-1 text-sm rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <span className="font-bold tracking-wide">RECORDING</span>
        </div>
      )}
      <Toaster richColors />
      {currentCaption && useCaption && (
        <div className="absolute bottom-[12%] text-center left-1/2 z-[999] text-white bg-black p-1 rounded-md max-w-[80%] transform -translate-x-1/2">
          {currentCaption}
        </div>
      )}
    </div>
  );
}

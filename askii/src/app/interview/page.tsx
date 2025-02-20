"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Webcam from "react-webcam";

import { PhoneMissed, Pause, Captions, Info } from "lucide-react";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function Interview() {
  
  const [isStarted] = useState(true);
  return (
    <div className="w-screen h-[100vh] flex flex-col">
      <div className="text-zinc-500 font-montserrat text-sm font-bold absolute top-2 left-6 z-40">ASKII.</div>

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
          <div className="w-[100px] h-[30px] bg-zinc-900 relative text-center top-[calc(100%-30px)] left-0 text-white font-montserrat">
            Interviewer
          </div>

        </div>
        <div className="w-full md:w-full  h-[35%] md:h-[60%] bg-blue-200 rounded-md">
          <Webcam audio={true} className="w-full h-full object-cover rounded-md" videoConstraints={videoConstraints} />
          <div className="w-[100px] h-[30px] bg-zinc-900 relative text-center bottom-0 top-[calc(100%-30px)] left-0 text-white font-montserrat">
            Aurora Shi
          </div>
        </div>
      </div>
      <div className="w-full h-[75px] fixed bottom-0 py-2 gap-6 left-0 bg-zinc-800 flex flex-row justify-center items-center text-white font-montserrat">
        <div className="flex flex-col items-center gap-[3px] ">
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
          >
            <Captions />
          </Button>
          <h1 className={`text-xs text-white`}>Toggle Captions</h1>
        </div>
        <div className="flex flex-col items-center gap-[3px] ">
          <Button
            className="rounded-3xl bg-zinc-500 hover:bg-zinc-600"
            size={"icon"}
            disabled={isStarted}
          >
            <Pause />
          </Button>
          <h1
            className={`text-xs ${isStarted ? "text-zinc-500" : "text-white"}`}
          >
            Finish Answer
          </h1>
        </div>
      </div>
    </div>
  );
}

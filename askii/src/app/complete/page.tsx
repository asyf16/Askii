"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  ThumbsDown,
  ThumbsUp,
  MessageCircleQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParams } from "next/navigation";

export default function Complete() {
  const searchParams = useSearchParams();
  const time = searchParams.get("time");
  const [videoChunks, setVideoChunks] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const question = "Question 1: Describe one thing on your resume";
  const category = "Behavioral";
  const [page, setPage] = useState(0);

  useEffect(() => {
    const storedChunks = localStorage.getItem("videoChunks");
    if (storedChunks) {
      setVideoChunks(JSON.parse(storedChunks));
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full items-center px-4">
      <div className="max-w-4xl my-8 shadow-lg border border-border rounded-xl overflow-hidden font-montserrat">
        <div className="pb-0 space-y-2 p-6">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm font-medium px-3 py-1">
              {category}
            </Badge>
            <div className="flex flex-row gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Help">
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-xs text-s text-center"
                  >
                    <p>
                      Rate your response to continue. Your session will not be
                      saved until you finish all ratings.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ThemeToggle className="border border-border/50" />
            </div>
          </div>
          <h2 className="sm:text-2xl text-l font-bold">{question}</h2>
        </div>

        <div className="pt-4 pb-6 px-6">
          <div className="relative w-full aspect-[7/4] rounded-xl bg-black/95 dark:bg-black flex items-center justify-center overflow-hidden group">
          <video controls className="h-full w-full object-cover" key={page}>
                <source src={videoChunks[page]} type="video/webm" />
              </video>
          </div>
          <span className="text-xs p-0 mt-1">
            {time ? new Date(time).toLocaleString() : "Unknown"}
          </span>
          <Textarea
            placeholder="Leave some notes (optional)"
            className="min-h-[70px] resize-none focus-visible:ring-primary my-3"
          />

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className={`py-6 bg-green-100 hover:bg-green-200 text-green-700 border-green-300 
              dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-green-300 dark:border-green-800
              ${
                selected === 1 &&
                "ring-2 ring-green-500 dark:ring-green-400 bg-green-200 dark:bg-green-800/50 font-semibold"
              }
            `}
              size="lg"
              onClick={() => {
                setSelected(1);
              }}
            >
              <ThumbsUp className="h-5 w-5" />
              Good
            </Button>
            <Button
              variant="outline"
              className={`py-6 bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-300
              dark:bg-amber-900/30 dark:hover:bg-amber-800/50 dark:text-amber-300 dark:border-amber-600/50
              ${
                selected === 2 &&
                "ring-2 ring-amber-500 dark:ring-amber-400 bg-amber-200 dark:bg-amber-800/50 font-semibold"
              }
            `}
              size="lg"
              onClick={() => {
                setSelected(2);
              }}
            >
              <MessageCircleQuestion className="h-5 w-5" />
              Mid
            </Button>
            <Button
              variant="outline"
              className={`py-6 bg-red-100 hover:bg-red-200 text-red-700 border-red-300
              dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-300 dark:border-red-800
              ${
                selected === 3 &&
                "ring-2 ring-red-500 dark:ring-red-400 bg-red-200 dark:bg-red-800/50 font-semibold"
              }
            `}
              size="lg"
              onClick={() => {
                setSelected(3);
              }}
            >
              <ThumbsDown className="h-5 w-5" />
              Bad
            </Button>
          </div>
        </div>

        <div className="flex justify-between border-t p-6 bg-muted/10 dark:bg-muted/5">
          <Button
            variant="outline"
            size="lg"
            className="bg-background hover:bg-foreground border border-border hover:text-background text-foreground"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            className="bg-foreground hover:bg-background border border-border hover:text-foreground text-background"
            size="lg"
            disabled={selected === 0 || page >= videoChunks.length-1}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

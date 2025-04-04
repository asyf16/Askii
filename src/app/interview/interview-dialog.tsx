"use client";

import { useState, useEffect, useContext, type ChangeEvent } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { StartInterview } from "./start-interview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Context } from "@/lib/ContextProvider";
import { GeneratedQuestion } from "@/types/types";

interface InterviewDialogProps {
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InterviewDialog({
  openDialog,
  onOpenChange,
}: InterviewDialogProps) {
  const { setQuestionIndex, setGeneratedPrompts } = useContext(Context);
  const [interviewName, setInterviewName] = useState("");
  const [behavioralQuestions, setBehavioralQuestions] = useState("0");
  const [resumeQuestions, setResumeQuestions] = useState("0");
  const [technicalQuestions, setTechnicalQuestions] = useState("0");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const fetchQuestions = async (
    behavorial: string,
    resume: string,
    technical: string,
    jobTitle: string,
    interviewerName?: string
  ) => {
    try {
      const response = await fetch("/api/generatePrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ behavorial, resume, technical, jobTitle }),
      });
      const json = await response.json();
      const parsedJSON = JSON.parse(json);

      const default_greeting = interviewerName
        ? `Hello, nice to meet you! My name is ${interviewerName}, and I will be interviewing you today. Let's get started.`
        : `Hello, nice to meet you! I will be interviewing you today. Let's get started.`;

      const formattedGreeting: GeneratedQuestion = {questionPrompt: default_greeting, questionType: "Greeting"}

      parsedJSON.unshift(formattedGreeting)

      setGeneratedPrompts(parsedJSON);
      setQuestionIndex(0);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    setTotalQuestions(
      Number(behavioralQuestions) +
        Number(resumeQuestions) +
        Number(technicalQuestions)
    );
  }, [behavioralQuestions, resumeQuestions, technicalQuestions]);

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <Drawer open={openDialog} onOpenChange={onOpenChange}>
      <DrawerTrigger>
        <StartInterview />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Start Interview</DrawerTitle>
            <DrawerDescription>
              Configure your interview settings
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="flex-grow">
            <div className="gap-4 flex flex-col pb-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="behavioralQuestions">
                    Behavioral Questions (*)
                  </Label>
                  <Select
                    value={behavioralQuestions}
                    onValueChange={setBehavioralQuestions}
                  >
                    <SelectTrigger id="behavioralQuestions">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resumeQuestions">Resume Questions (*)</Label>
                  <Select
                    value={resumeQuestions}
                    onValueChange={setResumeQuestions}
                  >
                    <SelectTrigger id="resumeQuestions">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technicalQuestions">
                    Technical Questions (*)
                  </Label>
                  <Select
                    value={technicalQuestions}
                    onValueChange={setTechnicalQuestions}
                  >
                    <SelectTrigger id="technicalQuestions">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="sm:w-1/2 w-full sm:mb-0 mb-2">
                  <Label htmlFor="jobTitle">Job Title (*)</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Enter job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="sm:w-1/2 w-full">
                  <Label htmlFor="interviewName">
                    Interview Name (optional)
                  </Label>
                  <Input
                    id="interviewName"
                    placeholder="Enter interview name"
                    value={interviewName}
                    onChange={(e) => setInterviewName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume (optional)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">
                  Job/Company Description (optional)
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste job or company description for personalized questions..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <DrawerFooter>
            <Link
              className="w-full"
              href={
                totalQuestions !== 0 && jobTitle
                  ? {
                      pathname: "/interview",
                      query: {
                        behavorial: behavioralQuestions,
                        resume: resumeQuestions,
                        technical: technicalQuestions,
                        interviewerName: interviewName,
                        jobTitle: jobTitle,
                      },
                    }
                  : {}
              }
            >
              <Button
                className="mt-4 hover:bg-primary/60 w-full"
                disabled={totalQuestions === 0 || !jobTitle}
                onClick={(e) => {
                  if (totalQuestions === 0) {
                    e.preventDefault();
                  } else {
                    fetchQuestions(
                      behavioralQuestions,
                      resumeQuestions,
                      technicalQuestions,
                      jobTitle
                    );
                  }
                }}
              >
                Start Interview
              </Button>
            </Link>
            <DrawerClose>
              <Button
                className="w-full hover:bg-muted-foreground/20 hover:text-foreground"
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

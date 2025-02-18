"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { StartInterview } from "./start-interview"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface InterviewDialogProps {
  openDialog: boolean
  onOpenChange: (open: boolean) => void
}

export default function InterviewDialog({ openDialog, onOpenChange }: InterviewDialogProps) {
  const [interviewName, setInterviewName] = useState("")
  const [behavioralQuestions, setBehavioralQuestions] = useState("0")
  const [resumeQuestions, setResumeQuestions] = useState("0")
  const [leetcodeQuestions, setLeetcodeQuestions] = useState("0")
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [resume, setResume] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")

  useEffect(() => {
    setTotalQuestions(Number(behavioralQuestions) + Number(resumeQuestions) + Number(leetcodeQuestions))
  }, [behavioralQuestions, resumeQuestions, leetcodeQuestions])

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  return (
    <Drawer open={openDialog} onOpenChange={onOpenChange}>
      <DrawerTrigger>
        <StartInterview />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Start Interview</DrawerTitle>
            <DrawerDescription>Configure your interview settings</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="flex-grow">
            <div className="gap-4 flex flex-col pb-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="behavioralQuestions">Behavioral Questions (*)</Label>
                  <Select value={behavioralQuestions} onValueChange={setBehavioralQuestions}>
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
                  <Select value={resumeQuestions} onValueChange={setResumeQuestions}>
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
                  <Label htmlFor="leetcodeQuestions">Leetcode Questions (*)</Label>
                  <Select value={leetcodeQuestions} onValueChange={setLeetcodeQuestions}>
                    <SelectTrigger id="leetcodeQuestions">
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
              <div className="space-y-2">
                <Label htmlFor="interviewName">Interview Name (optional)</Label>
                <Input
                  id="interviewName"
                  placeholder="Enter interview name"
                  value={interviewName}
                  onChange={(e) => setInterviewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume (optional)</Label>
                <Input id="resume" type="file" accept=".pdf" onChange={handleResumeChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job/Company Description (optional)</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste job or company description for personalized questions..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <ScrollBar orientation="vertical"/>
          </ScrollArea>
          <DrawerFooter>
            <Button
              className="mt-4 hover:bg-primary/60"
              disabled={totalQuestions === 0}
              onClick={() => {
                if (totalQuestions > 0) {
                  window.location.href = "/interview"
                }
              }}
            >
              Start Interview
            </Button>
            <DrawerClose>
              <Button className="w-full hover:bg-muted-foreground/20 hover:text-foreground" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


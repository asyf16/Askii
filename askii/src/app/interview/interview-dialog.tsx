"use client"

import { useState, useEffect } from "react"
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

export default function InterviewDialog() {
  const [interviewName, setInterviewName] = useState("")
  const [behavioralQuestions, setBehavioralQuestions] = useState("2")
  const [resumeQuestions, setResumeQuestions] = useState("2")
  const [leetcodeQuestions, setLeetcodeQuestions] = useState("0")
  const [totalQuestions, setTotalQuestions] = useState(4)

  useEffect(() => {
    setTotalQuestions(Number(behavioralQuestions) + Number(resumeQuestions) + Number(leetcodeQuestions))
  }, [behavioralQuestions, resumeQuestions, leetcodeQuestions])

  return (
    <Drawer>
      <DrawerTrigger>
        <StartInterview />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Start Interview</DrawerTitle>
          <DrawerDescription>Configure your interview settings</DrawerDescription>
        </DrawerHeader>

        <div className="gap-4 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="interviewName">Interview Name (optional)</Label>
            <Input
              id="interviewName"
              placeholder="Enter interview name"
              value={interviewName}
              onChange={(e) => setInterviewName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="behavioralQuestions">Behavioral Questions</Label>
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
              <Label htmlFor="resumeQuestions">Resume Questions</Label>
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
              <Label htmlFor="leetcodeQuestions">Leetcode Questions</Label>
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
        </div>
        <DrawerFooter>
          <Button className="mt-4 hover:bg-primary/60">Start Interview</Button>
          <DrawerClose>
            <Button
              className="w-full hover:bg-muted-foreground/20 hover:text-foreground"
              variant="outline"
              disabled={totalQuestions === 0}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


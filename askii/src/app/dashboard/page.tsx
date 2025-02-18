"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { PieChartComponent } from "./chart";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SessionComponent } from "./session-component";
import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import InterviewDialog from "../interview/interview-dialog";
import { useState } from "react";
export default function Dashboard() {
  const mid = [
    { category: "Mediocre", questions: 275, fill: "hsl(var(--mid))" },
    { category: "Other", questions: 200, fill: "hsl(var(--mid-neutral))" },
  ];

  const good = [
    { category: "Good", questions: 275, fill: "hsl(var(--good))" },
    { category: "Other", questions: 200, fill: "hsl(var(--good-neutral))" },
  ];

  const bad = [
    { category: "Bad", questions: 275, fill: "hsl(var(--bad))" },
    { category: "Other", questions: 200, fill: "hsl(var(--bad-neutral))" },
  ];

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted-foreground/5 w-full flex pb-8">
        <AppSidebar setOpenDialog={setOpenDialog}/>
  
        <div className="flex-1 flex flex-col">
          <div className="fixed top-0 left-0 bg-background/20 backdrop-blur-sm w-full border-b border-border h-[64px] flex flex-row items-center justify-between drop-shadow-md z-20 pl-[260px]">
            <div className="flex flex-row items-center gap-2 absolute left-2">
              <SidebarTrigger />
              <h1 className="text-2xl sm:text-4xl font-bold font-archivo-black text-foreground">
                Dashboard{" "}
                <span className="text-muted-foreground/50 hidden md:inline-block sm:text-lg">
                  ASKII.
                </span>
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4 absolute right-3">
              <div className="relative sm:flex hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-10 bg-muted-foreground/10 border-border placeholder:text-xs sm:placeholder:text-sm focus:border-primary w-[180px] sm:w-[250px] md:w-[330px]"
                  placeholder="Search sessions..."
                />
              </div>
              <ThemeToggle className="border border-border z-10 mr-2 bg-background hover:bg-muted/40" />
            </div>
          </div>
  
          <main className="pt-24 px-6 pb-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div className="min-w-[200px] min-h-[200px]">
                <PieChartComponent
                  chartData={good}
                  label="Well Prepared"
                  description="Answered these questions well"
                />
              </div>
              <div className="min-w-[200px] min-h-[200px]">
                <PieChartComponent
                  chartData={mid}
                  label="Could Practice"
                  description="Practice these a bit more"
                />
              </div>
              <div className="min-w-[200px] min-h-[200px] sm:col-span-2 md:col-span-1">
                <PieChartComponent
                  chartData={bad}
                  label="Not Prepared"
                  description="Needs a lot of practice"
                />
              </div>
            </div>
            <SessionComponent />
            <InterviewDialog openDialog={openDialog} onOpenChange={setOpenDialog}/>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
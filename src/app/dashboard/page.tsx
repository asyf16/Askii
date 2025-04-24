"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import DashboardData from "./dashboard";
import HelpPage from "./help";
import QuestionLog from "./questionLog";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted-foreground/5 w-full flex pb-8">
        <AppSidebar setOpenDialog={setOpenDialog}/>
  
        <div className="flex-1 flex flex-col">
          <div className="fixed top-0 left-0 bg-background/20 backdrop-blur-sm w-full border-b border-border h-[64px] flex flex-row items-center justify-between drop-shadow-md z-20 pl-[260px]">
            <div className="flex flex-row items-center gap-2 absolute left-2">
              <SidebarTrigger />
              <h1 className="text-2xl sm:text-4xl font-bold font-archivo-black text-foreground">
                {page === "help" ? "Help" : page === "question" ? "Question Log" : "Dashboard"}{" "}
                <span className="text-muted-foreground/50 hidden md:inline-block sm:text-lg">
                  ASKII.
                </span>
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4 absolute right-3">
              <div className="relative sm:flex hidden">
                {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-10 bg-muted-foreground/10 border-border placeholder:text-xs sm:placeholder:text-sm focus:border-primary w-[180px] sm:w-[250px] md:w-[330px]"
                  placeholder="Search sessions..."
                /> */}
              </div>
              <ThemeToggle className="border border-border z-10 mr-2 bg-background hover:bg-muted/40" />
            </div>
          </div>
          {page === "help" ? (
            <HelpPage />
          ) : page === "question" ? (
            <QuestionLog />
          ) : (
            <DashboardData openDialog={openDialog} setOpenDialog={setOpenDialog} />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
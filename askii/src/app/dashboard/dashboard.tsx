"use client";
import { PieChartComponent } from "./chart";
import { SessionComponent } from "./session-component";
import InterviewDialog from "../interview/interview-dialog";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function DashboardData({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const { user } = useUser();
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

  const [loading, setLoading] = useState<boolean>(true);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchSessions = async () => {
        try {
          const response = await fetch("/api/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth0_id: "test1" }),
          });

          if (response.ok) {
            const data = await response.json();
            setSessions(data);
          } else {
            console.error("Failed to fetch sessions:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching sessions:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSessions(); // Call the function to fetch sessions
    }
  }, [user]);

  if (loading) {
    return (
      <div className="pt-24 px-6 pb-10 w-full">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (user) {
    return (
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
        <SessionComponent questions={questions}/>
        <InterviewDialog openDialog={openDialog} onOpenChange={setOpenDialog} />
      </main>
    );
  } else {
    return (
      <div className="pt-24 px-6 pb-10 w-full">
        <h3>No user data found. Please return to home page and retry.</h3>
      </div>
    );
  }
}

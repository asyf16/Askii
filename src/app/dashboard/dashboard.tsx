"use client";
import { PieChartComponent } from "./chart";
import { SessionComponent } from "./session-component";
import InterviewDialog from "../interview/interview-dialog";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { SessionType } from "@/types/types";

export default function DashboardData({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [questions, setQuestions] = useState();
  const [good, setGood] = useState([
    { category: "Good", questions: 0, fill: "hsl(var(--good))" },
    { category: "Other", questions: 0, fill: "hsl(var(--good-neutral))" },
  ]);
  const [mid, setMid] = useState([
    { category: "Mediocre", questions: 0, fill: "hsl(var(--mid))" },
    { category: "Other", questions: 0, fill: "hsl(var(--mid-neutral))" },
  ]);
  const [bad, setBad] = useState([
    { category: "Bad", questions: 0, fill: "hsl(var(--bad))" },
    { category: "Other", questions: 0, fill: "hsl(var(--bad-neutral))" },
  ]);

  useEffect(() => {
    if (user) {
      const createUser = async () => {
        try {
          const response = await fetch("api/user", {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              auth0_id: user.sub,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            console.log("User data:", await response.json());
          } else {
            console.error("Failed to create or get user:", response.statusText);
          }
        } catch (error) {
          console.error("Error creating or getting user:", error);
        }
      };

      const fetchSessions = async () => {
        try {
          const response = await fetch(`/api/session?auth0_id=${user.sub}`, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            setSessions(data);
            console.log(data);
          } else {
            console.error("Failed to fetch sessions:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching sessions:", error);
        } finally {
          setLoading(false);
        }
      };

      const fetchQuestions = async () => {
        try {
          const response = await fetch(`/api/question?auth0_id=${user.sub}`, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            setQuestions(data);
            console.log(data);
            const goodQuestions = data["GOOD"].length;
            const mediocreQuestions = data["MEDIOCRE"].length;
            const badQuestions = data["BAD"].length;
            const total = goodQuestions + mediocreQuestions + badQuestions;
            setGood([
              { category: "Good", questions: goodQuestions, fill: "hsl(var(--good))" },
              { category: "Other", questions: total- goodQuestions, fill: "hsl(var(--good-neutral))" },
            ]);
            setMid([
              { category: "Mediocre", questions: mediocreQuestions, fill: "hsl(var(--mid))" },
              { category: "Other", questions: total - mediocreQuestions, fill: "hsl(var(--mid-neutral))" },
            ]);
            setBad([
              { category: "Bad", questions: badQuestions, fill: "hsl(var(--bad))" },
              { category: "Other", questions: total- badQuestions, fill: "hsl(var(--bad-neutral))" },
            ]);
          } else {
            console.error("Failed to fetch questions:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      createUser();
      fetchSessions();
      fetchQuestions();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="pt-24 px-6 pb-10 w-full flex justify-center items-center">
        <div className="text-center text-lg font-semibold text-primary">
          <div className="animate-pulse text-gray-600">
            <p>Loading your data...</p>
            <div className="mt-4 w-16 h-2 bg-gray-300 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
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
      {user && sessions.length > 0 ? (
        <div className="flex flex-col gap-6">
          {sessions.map((session, index) => (
            <SessionComponent session={session} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-lg font-semibold text-gray-600">
          <p>No interview sessions found.</p>
        </div>
      )}
      <InterviewDialog openDialog={openDialog} onOpenChange={setOpenDialog} />
    </main>
  );
}

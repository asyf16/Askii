"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useWindowSize } from "@/hooks/useWindowSize";
import Streamgraph from "../components/stream-graph/streamgraph";
import { useEffect, useState } from "react";
import useForceUpdate from "../components/stream-graph/useForceUpdate";

export default function Home() {
  const { width, height } = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      forceUpdate();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [forceUpdate]);

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-white dark:bg-black file:px-4 w-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-grid opacity-[0.15]" />
      <ThemeToggle />
      <h1 className="text-lg font-bold dark:text-[#e2bd4d] text-[#bd7e11] font-archivo-black absolute top-10 left-24">
        ASKII.
      </h1>
      <div className="flex flex-col items-start justify-center absolute top-[25%] left-24 space-y-6 animate-fade-in z-10">
        <h1 className="text-8xl font-bold tracking-tight text-black dark:text-[#ebe9e0] font-archivo-black">
          ASKII
        </h1>
        <p className="text-2xl dark:text-[#e2bd4d] text-[#bd7e11] max-w-md mx-auto font-montserrat">
          Level up your interview skills{" "}
          <span className="animate-custom-bounce inline-block">🚀</span>
        </p>

        <div className="flex flex-row gap-4 mt-8 w-full">
          <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all">
            Log in
          </button>
          <button className="px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all">
            Sign up
          </button>
        </div>
      </div>
      {isMounted && width && height ? (
        <Streamgraph width={width} height={height + 250} />
      ) : null}
    </div>
  );
}

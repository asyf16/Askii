"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useWindowSize } from "@/hooks/useWindowSize";
import Streamgraph from "../components/stream-graph/streamgraph";
import { useEffect, useState } from "react";
import useForceUpdate from "../components/stream-graph/useForceUpdate";
import { CursorGlow } from "@/components/cursor-glow";
import { useUser } from "@auth0/nextjs-auth0";
import { useTheme } from "next-themes";

export default function Home() {
  const redirectAfterLogin = "/dashboard"; // Change this to your desired redirect path
  const { width, height } = useWindowSize();
  const {theme} = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const forceUpdate = useForceUpdate();
  const { user } = useUser();

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
    <div className="relative flex flex-col items-start justify-center min-h-screen bg-white dark:bg-black w-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-grid opacity-[0.15]" />
      <CursorGlow />
      <ThemeToggle className="absolute top-8 sm:right-10 right-6 border border-border z-10 bg-background" />
      {theme === "light" ?       <img
        src="./assets/logo-light.png"
        className="h-[25px] w-[25px] absolute top-10 left-10 sm:left-24"
      ></img> :       <img
      src="./assets/logo-dark.png"
      className="h-[25px] w-[25px] absolute top-10 left-10 sm:left-24"
    ></img>}
      <h1 className="text-lg font-bold dark:text-[#e2bd4d] text-amber-500 font-archivo-black absolute top-10 left-[68px] sm:left-[126px]">
        ASKII.
      </h1>
      <div className="flex flex-col items-start justify-center absolute top-[25%] left-10 sm:left-24 space-y-6 animate-fade-in z-10">
        <h1 className="sm:text-8xl text-7xl font-bold tracking-tight text-black dark:text-[#ebe9e0] font-archivo-black drop-shadow-glow dark:drop-shadow-glow-dark">
          ASKII
          <span className="inline-flex">
            <span className="animate-dot">.</span>
            <span className="animate-dot">.</span>
            <span className="animate-dot">.</span>
          </span>
        </h1>
        <p className="sm:text-2xl text-lg dark:text-[#e2bd4d] text-amber-500 max-w-md mx-auto font-montserrat">
          <span className="bg-amber-500 text-white dark:bg-yellow-500 dark:text-black p-2 italic mr-1">
            Level up
          </span>{" "}
          your interview skills{" "}
          <span className="animate-custom-bounce inline-block">🚀</span>
        </p>

        <div className="flex flex-row gap-4 w-full">
          {!user ? (
            <>
              <a
                href={`/auth/login?returnTo=${encodeURIComponent(
                  redirectAfterLogin
                )}`}
              >
                <button className="mt-2 group px-6 py-2 rounded-3xl bg-black border-2 border-black text-white dark:bg-white dark:border-white dark:text-black font-medium hover:bg-white/50 dark:hover:bg-black/50 transition-all relative overflow-hidden">
                  <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-20">
                    Log in
                  </span>
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-[-40px]">
                    👋
                  </span>
                </button>
              </a>
              <a
                href={`/auth/login?screen_hint=signup&returnTo=${encodeURIComponent(
                  redirectAfterLogin
                )}`}
              >
                <button className="mt-2 group px-6 py-2 rounded-3xl bg-white/50 border-2 border-black text-black dark:bg-black/50 dark:border-white dark:text-white font-medium hover:bg-black dark:hover:bg-white transition-all relative overflow-hidden">
                  <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-20">
                    Sign up
                  </span>
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-[-40px]">
                    ✨
                  </span>
                </button>{" "}
              </a>
            </>
          ) : (
            <>
              <a href="/dashboard">
                <button className="mt-2 group px-6 py-2 rounded-3xl bg-black border-2 border-black text-white dark:bg-white dark:border-white dark:text-black font-medium hover:bg-white/50 dark:hover:bg-black/50 transition-all relative overflow-hidden">
                  <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-20">
                    Enter
                  </span>
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-[-40px]">
                    👋
                  </span>
                </button>
              </a>
              <a href="/auth/logout">
                <button className="mt-2 group px-6 py-2 rounded-3xl bg-white/50 border-2 border-black text-black dark:bg-black/50 dark:border-white dark:text-white font-medium hover:bg-black dark:hover:bg-white transition-all relative overflow-hidden">
                  <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-20">
                    Log out
                  </span>
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:translate-x-[-40px]">
                    ✨
                  </span>
                </button>{" "}
              </a>
            </>
          )}
        </div>
      </div>
      {isMounted && width && height ? (
        <Streamgraph width={width} height={height + 250} />
      ) : null}
    </div>
  );
}

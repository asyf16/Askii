"use client";
import { useState } from "react";
import { MessageCircleQuestion, Clock, Star } from "lucide-react";
export function SessionComponent() {
  const [isActive, setIsActive] = useState(false);
  const good = 3;
  const mediocre = 2;
  const bad = 1;
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full">
      <span className="text-zinc-500 font-montserrat text-sm">
        {formattedDate}
      </span>
      <div
        onClick={() => setIsActive(!isActive)}
        className="relative w-full border border-border bg-card hover:bg-muted-foreground/10 rounded-xl shadow-md my-2 hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:border-b-4 hover:border-primary"
      >
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-xs sm:text-sm pt-4 px-4">
          <MessageCircleQuestion className="w-4 h-4" />
          <p>{good + mediocre + bad} questions </p>
          <Clock className="w-4 h-4" />
          <p>10 minutes </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 font-montserrat text-sm sm:text-md font-bold pt-2 pb-4 px-4">
            <p>{good} Good, {mediocre} Mediocre, {bad} Bad</p>
            <div className="w-6 h-6 bg-red-500 rounded-full sm:inline-block hidden"></div>
        </div>
        <Star className="absolute z-40 left-[calc(100%-50px)] top-8 hover:text-primary" />
      </div>
    </div>
  );
}

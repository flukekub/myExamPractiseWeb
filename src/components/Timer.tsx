"use client";
import React from "react";
import { useStopwatch } from "@/providers/StopWatchProvider";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";

export default function Stopwatch( ) {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch();
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
    setIsRunning(!isRunning);
  };
  useEffect( ()=>{
    setIsRunning(true);
    start();
  },[])

  return (
    <div className="flex items-center gap-4">
      <div className="text-lg font-bold">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      {!isRunning ? (
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          Resume
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
        >
          Pause
        </button>
      )}
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
}

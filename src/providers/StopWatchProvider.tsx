"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface StopwatchContextType {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const StopwatchContext = createContext<StopwatchContextType | undefined>(
  undefined
);

export const StopwatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const savedState =
    typeof window !== "undefined"
      ? localStorage.getItem("stopwatchState")
      : null;
  const initialState = savedState
    ? JSON.parse(savedState)
    : { seconds: 0, minutes: 0, hours: 0, isRunning: false };

  const [seconds, setSeconds] = useState<number>(initialState.seconds);
  const [minutes, setMinutes] = useState<number>(initialState.minutes);
  const [hours, setHours] = useState<number>(initialState.hours);
  const [isRunning, setIsRunning] = useState<boolean>(initialState.isRunning);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);

    localStorage.setItem(
      "stopwatchState",
      JSON.stringify({ seconds: 0, minutes: 0, hours: 0, isRunning: false })
    );
  };
  // Load state from Local Storage
  useEffect(() => {
    const savedState = localStorage.getItem("stopwatchState");
    if (savedState) {
      const { seconds, minutes, hours, isRunning } = JSON.parse(savedState);
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setIsRunning(isRunning);
    }
  }, []);

  // Save state to Local Storage
  useEffect(() => {
    const state = { seconds, minutes, hours, isRunning };
    localStorage.setItem("stopwatchState", JSON.stringify(state));
  }, [seconds, minutes, hours, isRunning]);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev: number) => {
          if (prev + 1 >= 60) {
            setMinutes((prevMinutes: number) => {
              if (prevMinutes + 1 >= 60) {
                setHours((prevHours: number) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <StopwatchContext.Provider
      value={{ seconds, minutes, hours, isRunning, start, pause, reset }}
    >
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error("useStopwatch must be used within a StopwatchProvider");
  }
  return context;
};

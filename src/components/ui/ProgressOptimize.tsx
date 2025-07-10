"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}

export function ProgressOptimize({ speed }: { speed: number }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + speed; // เพิ่มทีละ 2% ในแต่ละรอบ
      });
    }, 100); // ทำทุก 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress
      value={progress}
      className="w-[60%] transition-all duration-300 ease-linear"
    />
  );
}

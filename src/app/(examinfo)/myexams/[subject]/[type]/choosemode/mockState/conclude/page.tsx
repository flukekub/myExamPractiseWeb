"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useStopwatch } from "@/providers/StopWatchProvider";
import { use, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function conclude() {
  const { reset , hours ,minutes , seconds } = useStopwatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);
  const [ hourState, setHourState ] = useState<string>("");
  const [ minuteState, setMinuteState ] = useState<string>("");
  const [ secondState, setSecondState ] = useState<string>("");
  useEffect(() => {
    setHourState(String(hours).padStart(2, "0"));
    setMinuteState(String(minutes).padStart(2, "0"));
    setSecondState(String(seconds).padStart(2, "0"));
    reset();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-100">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-md w-full text-gray-700 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          🎉 Conclude
        </h1>
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-semibold">Score:</span>{" "}
            <span className="text-blue-700">
              {ScoreState.ScoreItem.score} / {ScoreState.ScoreItem.total}
            </span>
          </p>
          <p>
            <span className="font-semibold">Subject:</span>{" "}
            {ScoreState.ScoreItem.subject}
          </p>
          <p>
            <span className="font-semibold">Topic:</span>{" "}
            {decodeURIComponent(ScoreState.ScoreItem.type)}
          </p>
          <p>
            <span className="font-semibold">Time Taken:</span>{" "}
            {hourState}:{minuteState}:{secondState}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(ScoreState.ScoreItem.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

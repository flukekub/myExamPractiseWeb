"use client";
import { addScore } from "@/redux/features/scoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Send } from "lucide-react";

export default function AnswerButton({
  answer,
  choiceLength,
}: {
  answer: string;
  choiceLength: string;
}) {
  const dispatch = useDispatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const numChoices = parseInt(choiceLength || "0");
  const choices = Array.from({ length: numChoices }, (_, i) => (i + 1).toString());

  // Logic remains exactly as you wrote it
  const handleCorrectAnswer = (choice: string) => {
    if (chosen?.has(choice)) return;
    if (choice === answer) {
      dispatch(addScore(1));
    } else if (choice !== answer && chosen?.has(answer)) {
      dispatch(addScore(-1));
    }
    setChosen(new Set([choice]));
  };

  const handleCancelAnswer = () => {
    if (userAnswer.trim() === "") return;
    if (userAnswer.trim() === answer) {
      dispatch(addScore(-1));
    } else if (userAnswer.trim() !== answer && chosen?.has(answer)) {
      dispatch(addScore(1));
    }
    setUserAnswer("");
  };

  // UI for Fill-in-the-blank (choiceLength === 0)
  if (numChoices === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 flex flex-col gap-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="Type your answer here..."
            value={userAnswer}
            disabled={isConfirmed}
            onChange={(e) => setUserAnswer(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all text-lg font-medium
              ${isConfirmed 
                ? "bg-slate-50 border-slate-200 text-slate-500" 
                : "bg-white border-slate-100 focus:border-primary shadow-sm focus:shadow-md"
              }`}
          />
        </div>

        <div className="flex justify-center">
          {isConfirmed ? (
            <button
              onClick={() => {
                handleCancelAnswer();
                setIsConfirmed(false);
              }}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all active:scale-95"
            >
              <XCircle size={20} />
              Cancel Answer
            </button>
          ) : (
            <button
              onClick={() => {
                handleCorrectAnswer(userAnswer);
                setIsConfirmed(true);
              }}
              disabled={!userAnswer.trim()}
              className="flex items-center gap-2 px-10 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
            >
              <Send size={18} />
              Confirm Answer
            </button>
          )}
        </div>
      </div>
    );
  }

  // UI for Multiple Choice
  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
        Select your answer
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {choices.map((choice) => {
          const isSelected = chosen?.has(choice);
          return (
            <button
              key={choice}
              onClick={() => handleCorrectAnswer(choice)}
              className={`relative group h-16 flex items-center justify-center rounded-2xl text-xl font-bold transition-all duration-300 active:scale-95
                ${isSelected 
                  ? "bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2" 
                  : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-blue-50/30 shadow-sm"
                }`}
            >
              <span className="relative z-10">{choice}</span>
              {isSelected && (
                <motion.div 
                  layoutId="activeChoice"
                  className="absolute -top-2 -right-2 bg-white text-primary rounded-full p-0.5 shadow-md"
                >
                  <CheckCircle2 size={18} />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
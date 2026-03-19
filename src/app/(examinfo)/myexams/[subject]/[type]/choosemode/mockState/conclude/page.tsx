"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useStopwatch } from "@/providers/StopWatchProvider";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Clock, 
  Calendar, 
  BookOpen, 
  Home, 
  RefreshCcw 
} from "lucide-react";
import Link from "next/link";

export default function Conclude({
  params: paramsPromise,
}: {
  params: Promise<{ subject: string; id: string; type: string }>;
}) {
  const params = use(paramsPromise);
  const { reset, hours, minutes, seconds } = useStopwatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);
  
  const [timeState, setTimeState] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    setTimeState({
      h: String(hours).padStart(2, "0"),
      m: String(minutes).padStart(2, "0"),
      s: String(seconds).padStart(2, "0")
    });
    reset();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          
          {/* Top Decorative Header */}
          <div className="bg-primary p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-white rounded-full blur-3xl" />
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mb-4"
            >
              <Trophy className="text-white" size={40} />
            </motion.div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Exam Completed!</h1>
            <p className="text-blue-100 text-sm mt-1">Great job finishing your session.</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Score Display */}
            <div className="text-center">
              <div className="inline-block relative">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">
                  {ScoreState.ScoreItem.score}
                </span>
                <span className="text-2xl font-bold text-slate-300 ml-2">
                  / {ScoreState.ScoreItem.total}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                Total Score
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Time</span>
                </div>
                <p className="text-sm font-bold text-slate-700">
                  {timeState.h}:{timeState.m}:{timeState.s}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <BookOpen size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Subject</span>
                </div>
                <p className="text-sm font-bold text-slate-700 truncate">
                  {ScoreState.ScoreItem.subject}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Calendar size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Completed On</span>
                </div>
                <p className="text-sm font-bold text-slate-700">
                  {new Date(ScoreState.ScoreItem.createdAt).toLocaleString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Link 
                href="/myexams" 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                <Home size={18} />
                Back to Exams
              </Link>
              <Link
                href={`/myexams/${params.subject}/${params.type}/choosemode/mockState`}
                className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                <RefreshCcw size={18} />
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
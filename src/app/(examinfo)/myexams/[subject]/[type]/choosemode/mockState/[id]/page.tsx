"use client";
import { use } from "react";
import Stopwatch from "@/components/Timer";
import AnswerButton from "@/components/answerBotton";
import { ImagePreview } from "@/libs/previewImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, RotateCcw } from "lucide-react";
import { useExam } from "@/app/hook/tanstack";
import { QuestionSkeleton } from "@/components/QuestionSkeleton";

export default function Exam({
  params: paramsPromise,
}: {
  params: Promise<{ subject: string; id: string; type: string }>;
}) {
  const params = use(paramsPromise);
  const { data, isLoading } = useExam(params.id, params.type);

  const exam = data?.currentExam;
  const previousId = data?.previousExamId;
  const nextId = data?.nextExamId;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <nav className="sticky top-[64.8px] z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={`/myexams/${params.subject}/${params.type}`}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
            >
              <LayoutGrid size={20} />
            </Link>
            <div className="h-4 w-[1px] bg-slate-200" />
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-[150px] md:max-w-none">
              {isLoading ? "Loading..." : exam?.name}
            </h1>
          </div>
          <Stopwatch />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <QuestionSkeleton />
          ) : (
            <motion.div
              key={params.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* --- NEW SIDE-BY-SIDE LAYOUT --- */}
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8">
                {/* Previous Button (Hidden on Mobile) */}
                <div className="hidden md:flex">
                  {previousId && (
                    <Link
                      href={`/myexams/${params.subject}/${params.type}/choosemode/mockState/${previousId}`}
                      className="flex md:flex-col items-center justify-center gap-2 p-4 md:h-64 md:w-16 bg-white text-slate-900 rounded-2xl md:rounded-full font-semibold shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                    >
                      <ChevronLeft size={24} />
                    </Link>
                  )}
                </div>

                {/* Main Image Area */}
                <div className="flex-1 w-full relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-[2.5rem] blur-xl" />
                  <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-4 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 rounded-[2rem] min-h-[350px] flex items-center justify-center p-4">
                      {exam && (
                        <ImagePreview
                          imageData={{
                            type: exam.imageData.type,
                            data: exam.imageData.data,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Next / Finish Button (Side on Desktop) */}
                <div className="w-full md:w-auto">
                  <Link
                    href={`/myexams/${params.subject}/${params.type}/choosemode/mockState/${nextId ? nextId : "conclude"}`}
                    className={`flex md:flex-col items-center justify-center gap-2 p-4 md:h-64 md:w-16 text-white rounded-2xl md:rounded-full font-semibold shadow-xl transition-all active:scale-95 ${
                      nextId
                        ? "bg-slate-900 hover:bg-slate-800"
                        : "bg-primary hover:opacity-90"
                    }`}
                  >
                    <ChevronRight size={24} />
                  </Link>
                </div>
              </div>

              {/* Answer Section */}
              <div className="max-w-2xl mx-auto bg-white/50 p-6 rounded-[2.5rem] border border-slate-100">
                {exam && (
                  <AnswerButton
                    choiceLength={exam.choices}
                    answer={exam?.answer as string}
                  />
                )}
              </div>

              {/* Grid Return (Bottom Center) */}
              <div className="flex justify-center pt-4">
                <Link
                  href={`/myexams/${params.subject}/${params.type}/choosemode/mockState`}
                  className="text-slate-400 hover:text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  Return to Exam Grid
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

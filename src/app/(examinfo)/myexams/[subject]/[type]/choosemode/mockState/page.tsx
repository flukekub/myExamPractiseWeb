"use client";
import { use, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setExamInfo, setTotal } from "@/redux/features/scoreSlice";
import Stopwatch from "@/components/Timer";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/libs/constant";
import { ExamSkeleton } from "@/components/ExamSkeleton";
import { useExams } from "@/app/hook/tanstack";

export default function ExamsType({
  params: paramsPromise,
}: {
  params: Promise<{ subject: string; type: string }>;
}) {
  const params = use(paramsPromise);
  const dispatch = useDispatch();

  // 1. Fetch data using TanStack Query
  const { data: exams = [], isLoading } = useExams(params.type);

  // 2. Handle Redux side effects when data arrives
  useEffect(() => {
    if (exams.length > 0) {
      dispatch(setTotal(exams.length));
      dispatch(
        setExamInfo({
          type: params.type,
          subject: params.subject,
          createdAt: new Date().toISOString(),
        })
      );
    }
  }, [exams, params.type, params.subject, dispatch]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-[64.8px] z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex flex-col">
            <Link
              href={`/myexams/${params.subject}`}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary transition-colors mb-1"
            >
              <ArrowLeft size={14} /> Back to {params.subject}
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="text-primary" size={24} />
              {decodeURIComponent(params.type)}
            </h1>
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <Stopwatch />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {isLoading ? (
          <ExamSkeleton />
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {exams.map((exam, index) => (
                <motion.div key={exam._id || index} variants={itemVariants}>
                  <Link
                    href={`/myexams/${params.subject}/${params.type}/choosemode/mockState/${exam._id}`}
                  >
                    <div className="group relative bg-white border border-slate-200 p-5 rounded-2xl hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between h-36">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 font-bold text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            Start Exam
                          </span>
                          <ChevronRight size={14} className="text-primary" />
                        </div>
                      </div>
                      <h2 className="text-[15px] font-semibold text-slate-800 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {exam.name}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-center gap-4 border-t border-slate-200 pt-8"
            >
              <Link
                href={`/myexams/${params.subject}/${params.type}/choosemode/mockState/conclude`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-semibold shadow-lg shadow-slate-200 hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 size={20} />
                Conclude Score
              </Link>

              <Link
                href={`/myexams/${params.subject}`}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-white text-slate-600 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
              >
                Go Back
              </Link>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
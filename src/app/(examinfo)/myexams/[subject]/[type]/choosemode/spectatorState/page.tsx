"use client";
import { use, useState } from "react";
import { ImagePreview } from "@/libs/previewImage";
import PaginationExam from "@/components/ui/PaginationExam";
import { StudySkeleton } from "@/components/StudySkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle2, BookOpen, Layers, Lightbulb } from "lucide-react";
import { useExamsPage } from "@/app/hook/tanstack";

export default function StudyExams({
  params: paramsPromise,
}: {
  params: Promise<{ type: string }>;
}) {
  const params = use(paramsPromise);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set());
  const [showDetailAnswers, setShowDetailAnswers] = useState<Set<string>>(
    new Set(),
  );

  const { data, isLoading, isPlaceholderData, isFetching } = useExamsPage(
    params.type,
    currentPage,
  );
  const exams = data?.data || [];
  const pages = data?.totalPages || 1;
  const showLoading =
    isLoading || (isFetching && exams.length === 0) || isPlaceholderData;
  const handleShowAnswers = (id: string) => {
    setShowAnswers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleShowDetailAnswers = (id: string) => {
    setShowDetailAnswers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleShowAllAnswers = () => {
    if (showAnswers.size === 0)
      setShowAnswers(new Set(exams.map((e: any) => e._id)));
    else setShowAnswers(new Set());
  };

  const handleShowAllDetailAnswers = () => {
    if (showDetailAnswers.size === 0)
      setShowDetailAnswers(new Set(exams.map((e: any) => e._id)));
    else setShowDetailAnswers(new Set());
  };

  const handlePageChange = (type: string): void => {
    setShowAnswers(new Set());
    setShowDetailAnswers(new Set());

    if (type === "previous") setCurrentPage((p) => Math.max(p - 1, 1));
    else if (type === "next") setCurrentPage((p) => Math.min(p + 1, pages));
    else setCurrentPage(parseInt(type, 10));

    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="sticky top-[64px] z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="text-primary" size={20} />
              Study Mode: {decodeURIComponent(params.type)}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Review questions and detailed solutions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShowAllAnswers}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <Eye size={14} />{" "}
              {showAnswers.size > 0 ? "Hide All" : "Show All Answers"}
            </button>
            <button
              onClick={handleShowAllDetailAnswers}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <Layers size={14} /> Solutions
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          {showLoading ? (
            <motion.div
              key={`skeleton-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StudySkeleton />
            </motion.div>
          ) : (
            <motion.div
              key={`content-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              {exams.map((exam: any, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={exam._id}
                  className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="px-8 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Question {index + 1 + (currentPage - 1) * 10}
                    </span>
                    <h2 className="text-sm font-bold text-slate-700">
                      {exam.name}
                    </h2>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <ImagePreview
                        imageData={{
                          type: exam.imageData.type,
                          data: exam.imageData.data,
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleShowAnswers(exam._id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          showAnswers.has(exam._id)
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                        }`}
                      >
                        <CheckCircle2 size={16} />
                        {showAnswers.has(exam._id)
                          ? `Answer: ${exam.answer}`
                          : "Check Answer"}
                      </button>

                      <button
                        onClick={() => handleShowDetailAnswers(exam._id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          showDetailAnswers.has(exam._id)
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Lightbulb size={16} />
                        {showDetailAnswers.has(exam._id)
                          ? "Hide Solution"
                          : "View Solution"}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showDetailAnswers.has(exam._id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-100 mt-4">
                            <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-3">
                                Step-by-Step Solution
                              </p>
                              {exam.answerImageData?.data ? (
                                <ImagePreview
                                  imageData={{
                                    type: exam.answerImageData.type,
                                    data: exam.answerImageData.data,
                                  }}
                                />
                              ) : (
                                <div className="py-10 text-center text-slate-400 text-sm italic">
                                  No solution image available for this question.
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <PaginationExam
            onClick={handlePageChange}
            pages={pages}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
}

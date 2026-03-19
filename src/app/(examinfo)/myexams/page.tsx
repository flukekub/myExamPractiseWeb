"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useRouter } from "next/navigation";
import { SubjectCard } from "@/components/mainPage/SubjectCard";
import { BEZIER, containerVariants } from "@/libs/constant";
import { useSubjects } from "@/app/hook/tanstack";

export default function Index() {
  const router = useRouter();
  const { data: subjects = [], isLoading, isError } = useSubjects();

  const handleSelect = (path: string) => {
    router.push(path);
  };

  if (isError) return <div>Failed to load subjects. Please try again.</div>;

  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-primary/10 antialiased">
      <main className="max-w-[1100px] mx-auto px-6 py-20 lg:py-20">
        <header className="mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[13px] font-medium tracking-wide uppercase"
          >
            <BookOpen size={14} />
            <span>Curriculum 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: BEZIER }}
            className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] max-w-2xl"
          >
            Select your examination category to begin.
          </motion.h1>
        </header>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSkeleton key="skeleton" />
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.title}
                  subject={subject}
                  onSelect={() => handleSelect(`/myexams/${subject.title}`)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
"use client";
import Link from "next/link";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, Sparkles, Loader2 } from "lucide-react";
import { BEZIER, containerVariants, itemVariants } from "@/libs/constant";
import { useTopics } from "@/app/hook/tanstack";

export default function MathTopics({
  params: paramsPromise,
}: {
  params: Promise<{ subject: string }>;
}) {
  const params = use(paramsPromise);
  
  const { data: topics = [], isLoading } = useTopics(params.subject);

  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-primary/10 antialiased">
      <main className="max-w-[800px] mx-auto px-6 pb-20 lg:pb-32 pt-10 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: BEZIER }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to subjects
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.1]">
            {params.subject} Topics
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <Loader2 className="animate-spin text-primary" size={32} />
            </motion.div>
          ) : topics.length > 0 ? (
            <motion.div
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              {topics.map((topic: any) => (
                <motion.div key={topic} variants={itemVariants}>
                  <Link
                    href={`/myexams/${params.subject}/${topic}/choosemode`}
                    className="group flex items-center gap-5 p-5 bg-card border border-border rounded-2xl hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors shrink-0">
                      <FileText size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[15px] font-medium tracking-tight group-hover:text-primary transition-colors">
                        {topic}
                      </span>
                    </div>

                    <ArrowRight
                      size={16}
                      className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: BEZIER }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-muted-foreground mb-5">
                <Sparkles size={24} />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Coming Soon …</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
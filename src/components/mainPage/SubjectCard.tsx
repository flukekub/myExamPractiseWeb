import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, ChevronRight } from "lucide-react";
import type { Subject } from "../../../interface";
import { itemVariants } from "@/libs/constant";

export function SubjectCard({
  subject,
  onSelect,
}: {
  subject: Subject;
  onSelect: () => void;
}) {

  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className="group relative flex flex-col text-left p-8 bg-card border border-border rounded-[20px] transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <BookOpen size={80} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
          <ChevronRight size={20} />
        </div>

        <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors">
          {subject.title}
        </h3>

        <p className="text-[15px] leading-relaxed text-muted-foreground mb-8 line-clamp-2">
          {subject.description ||
            "Comprehensive assessment modules covering core principles and advanced applications."}
        </p>

        <div className="mt-auto pt-6 border-t border-secondary flex items-center justify-between text-[13px] font-medium text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> 60m
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} /> 40 Qs
            </span>
          </div>
          <ArrowRight
            size={16}
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
          />
        </div>
      </div>
    </motion.button>
  );
}
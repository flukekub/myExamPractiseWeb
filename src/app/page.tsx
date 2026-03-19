"use client"
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import Menubar from "@/components/menubar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Calculator, FileText, ChevronRight } from "lucide-react";
import { BEZIER, containerVariants, itemVariants } from "@/libs/constant";
import { useRouter } from "next/navigation";

export default function Home() {
  const FEATURES = [
    {
      title: "Mathematics",
      desc: "Topic-wise exercises with detailed solutions to strengthen your math skills.",
      icon: Calculator,
    },
    {
      title: "Physics",
      desc: "Master fundamental concepts with categorized quizzes and exam-style problems.",
      icon: FlaskConical,
    },
    {
      title: "Mock Exams",
      desc: "Full-length practice exams that simulate real test environments.",
      icon: FileText,
    },
  ];
  const router = useRouter();
  return (
    <div className="min-h-svh bg-background text-foreground selection:bg-primary/10 antialiased">
      <Menubar/>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-20 lg:pt-40 lg:pb-28 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: BEZIER }}
            className="text-4xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.1] max-w-3xl mx-auto mb-6"
          >
            แหล่งรวมข้อสอบ สำหรับสอบเข้ามหาวิทยาลัย{" "}
            <span className="text-primary">(TCAS)</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: BEZIER }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            <button
              onClick={() => router.push("/myexams")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.35)]"
            >
              Explore Subjects
              <ArrowRight size={16} />
            </button>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary border border-border text-foreground font-medium text-[15px] hover:bg-secondary/80 transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] mb-4">
              What You Can Learn
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Practice by chapters, take mock exams, and track your progress—all
              in one place.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {FEATURES.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col p-8 bg-card border border-border rounded-[20px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] transition-shadow cursor-pointer"
                onClick={() =>
                  router.push(`/myexams/${encodeURIComponent(item.title)}`)
                }
              >
                <div className="mb-6 w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                  <item.icon size={20} />
                </div>

                <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">
                  {item.desc}
                </p>

                <div className="mt-auto flex items-center text-[13px] font-medium text-muted-foreground">
                  <span className="group-hover:text-primary transition-colors">
                    Get started
                  </span>
                  <ChevronRight
                    size={14}
                    className="ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

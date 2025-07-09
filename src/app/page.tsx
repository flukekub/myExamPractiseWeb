// pages/index.tsx
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import Menubar from "@/components/menubar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-white text-gray-800 ">
      <Menubar />
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-24 px-6 text-center"
        style={{
          backgroundImage: "url('/banner.png')",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 drop-shadow-md">
             ExamSphere
          </h1>
          <p className="text-xl font-light mb-8">
            แหล่งรวมข้อสอบ สำหรับสอบเข้ามหาวิทยาลัย (TCAS) 
          </p>
          <div className="flex justify-center gap-6">
            <Link href="myexams">
              <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition hover:scale-105">
                Explore Subjects
              </button>
            </Link>
            <Link href="about">
              <button className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-10 bg-gray-50 px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            What You Can Learn
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Practice by chapters, take mock exams, and track your progress—all
            in one place.
          </p>
        </div>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Subject Cards */}
          {[
            {
              title: "Mathematics",
              desc: "Topic-wise exercises with detailed solutions to strengthen your math skills.",
            },
            {
              title: "Physics",
              desc: "Master fundamental concepts with categorized quizzes and exam-style problems.",
            },
            {
              title: "Mock Exams",
              desc: "Full-length practice exams that simulate real test environments.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition hover:scale-110 "
            >
              <h3 className="text-2xl font-semibold mb-3 text-blue-700">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

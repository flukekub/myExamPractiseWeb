"use client";
import getExamsByType from "@/libs/getExamsByType";
import { useEffect, useState } from "react";
import type { Exam } from "../../../../../../../../interface";
import Image from "next/image";
import { Button } from "@mui/material";
import { FaCheckCircle, FaEye } from "react-icons/fa";

export default function exams({ params }: { params: { type: string } }) {
  const [showAnswers, setShowAnswers] = useState<Set<string>>();
  const [exams, setExams] = useState<Exam[]>([]);
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await getExamsByType(params.type);
        if (res) {
          setExams(res.data);
        } else {
          console.error("No data found for the specified type.");
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  });
  const handleShowAnswers = (examId: string) => {
    setShowAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(examId)) {
        newSet.delete(examId);
      } else {
        newSet.add(examId);
      }
      return newSet;
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold  text-blue-900 mb-6">
        Exams for {params.type}
      </h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id} className="mb-4">
            <h2 className="text-xl font-semibold">{exam.name}</h2>
            <Image
              src={exam.imageUrl}
              alt={"fddf"}
              width={700}
              height={700}
            ></Image>
            {showAnswers?.has(exam._id) ? (
              <Button
                className="!rounded-full !px-4 !py-1 !text-sm !font-bold bg-white hover:bg-gray-300 text-white flex items-center gap-2 shadow-sm transition"
                onClick={() => handleShowAnswers(exam._id)}
              >
                <FaCheckCircle className="text-white" />
                {exam.answer}
              </Button>
            ) : (
              <Button
                className="!rounded-full !px-8 !py-3 !text-sm !font-normal !text-white bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
                onClick={() => handleShowAnswers(exam._id)}
              >
                <span className="flex items-center gap-2 ">
                  <FaEye className="text-white" />
                  show Answer
                </span>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

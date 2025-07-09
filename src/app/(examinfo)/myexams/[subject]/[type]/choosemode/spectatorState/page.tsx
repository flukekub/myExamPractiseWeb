"use client";
import getExamsByType from "@/libs/api/getExamsByType";
import { useEffect, useState } from "react";
import type { Exam } from "../../../../../../../../interface";
import { Button } from "@mui/material";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { ImagePreview } from "@/libs/previewImage";
import { ShowSolutionButton } from "@/components/showSolutionBotton";

export default function exams({ params }: { params: { type: string } }) {
  const [showAnswers, setShowAnswers] = useState<Set<string>>();
  const [showDeatailAnswers, setShowDeatailAnswers] = useState<Set<string>>();
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
  const handleShowDetailAnswers = (examId: string) => {
    setShowDeatailAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(examId)) {
        newSet.delete(examId);
      } else {
        newSet.add(examId);
      }
      return newSet;
    });
  };
  const handleShowAllAnswers = () => {
    if ((showAnswers?.size ?? 0) == 0) {
      setShowAnswers((prev) => {
        const newSet = new Set<string>();
        exams.forEach((exam) => {
          newSet.add(exam._id);
        });
        return newSet;
      });
    } else {
      const newSet = new Set<string>();
      setShowAnswers(newSet);
    }
  };
  const handleShowAllDetailAnswers = () => {
    if ((showDeatailAnswers?.size ?? 0) == 0) {
      setShowDeatailAnswers((prev) => {
        const newSet = new Set<string>();
        exams.forEach((exam) => {
          newSet.add(exam._id);
        });
        return newSet;
      });
    } else {
      const newSet = new Set<string>();
      setShowDeatailAnswers(newSet);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between w-full max-w-4xl mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Exams for {decodeURIComponent(params.type)}
        </h1>
        <div className="flex items-center gap-3">
          <Button
            className="!rounded-full !normal-case !px-3 !py-2 !text-sm !font-normal !text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
            onClick={() => handleShowAllAnswers()}
          >
            <FaCheckCircle className="text-white mr-2" />
            Show all answers
          </Button>
          <Button
            className="!rounded-full !normal-case !px-3 !py-2 !text-sm !font-normal !text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
            onClick={() => handleShowAllDetailAnswers()}
          >
            <FaCheckCircle className="text-white mr-2" />
            Show all solutions
          </Button>
        </div>
      </div>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id} className="mb-4">
            <h2 className="text-xl font-semibold">{exam.name}</h2>
            <ImagePreview
              imageData={{
                type: exam.imageData.type,
                data: exam.imageData.data,
              }}
            />
            {showDeatailAnswers?.has(exam._id) ? (
              <>
                {exam.answerImageData && exam.answerImageData.data ? (
                  <ImagePreview
                    imageData={{
                      type: exam.answerImageData.type,
                      data: exam.answerImageData.data,
                    }}
                  />
                ) : (
                  <div className="text-gray-500 text-sm p-4">
                    No solution image available
                  </div>
                )}
                <ShowSolutionButton
                  onClick={() => handleShowDetailAnswers(exam._id)}
                  colors="from-gray-500 to-gray-200"
                >
                  Solution
                </ShowSolutionButton>
              </>
            ) : (
              <ShowSolutionButton
                onClick={() => handleShowDetailAnswers(exam._id)}
                colors="from-purple-500 to-blue-500"
              >
                Solution
              </ShowSolutionButton>
            )}

            {showAnswers?.has(exam._id) ? (
              <Button
                className="!rounded-full !normal-case !px-4 !py-1 !text-sm !font-bold bg-white hover:bg-gray-300 text-white flex items-center gap-2  transition"
                onClick={() => handleShowAnswers(exam._id)}
              >
                <FaCheckCircle className="text-white" />
                {exam.answer}
              </Button>
            ) : (
              <Button
                className="!rounded-full !normal-case !px-3 !py-2 !text-sm !font-normal !text-white bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
                onClick={() => handleShowAnswers(exam._id)}
              >
                <span className="flex items-center gap-2 ">
                  <FaEye className="text-white" />
                  Show Answer
                </span>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

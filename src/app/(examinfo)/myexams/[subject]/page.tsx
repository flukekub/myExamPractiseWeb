"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import getTypeExam from "@/libs/api/getTypeExam";

export default function MathTopics({
  params,
}: {
  params: { subject: string };
}) {
  const [topics, setTopics] = useState<[]>([]);
  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await getTypeExam(params.subject);
        if (res) {
          console.log("Fetched topics:", res);
          setTopics(res.data);
        } else {
          console.error("No topics found for the specified subject.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, [params.subject]);

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          {params.subject} Topics
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Link
              href={params.subject + "/" + topic+ "/choosemode"}
              key={index}
            >
              <div
                key={index}
                className="bg-blue-100 hover:bg-blue-200 text-blue-900 p-6 rounded-xl shadow-sm transition cursor-pointer flex items-center gap-4"
              >
                <h2 className="text-lg font-semibold">{topic}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

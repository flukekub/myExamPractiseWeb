"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import getSubjects from "@/libs/api/getSubjects";
import type { Subject } from "../../../../interface.ts";

export default function MyExam() {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const handleSubmit = (endpoint: string) => {
    router.push(endpoint);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoad(true);
      try {
        const res = await getSubjects();
        if (!subjects) {
          console.error("Failed to fetch subjects");
        }
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoad(false);
      }
    };
    fetchSubjects();
  }, []);

  const colors = [
    "from-pink-400 to-red-500",
    "from-blue-400 to-blue-600",
    "from-green-400 to-emerald-600",
  ];

  return (
    <main className=" py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Choose Your Exam Category
        </h1>

        {load && (
          <div className="mb-6">
            <LinearProgress color="primary" />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {subjects &&
            subjects.map((subject, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${colors[index]} text-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform cursor-pointer`}
                onClick={() => {
                  setLoad(true);
                  handleSubmit(`/myexams/${subject.title}`);
                }}
              >
                <h2 className="text-2xl font-semibold mb-3">{subject.title}</h2>
                <p className="text-sm opacity-90">{subject.description}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

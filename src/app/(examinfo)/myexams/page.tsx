'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useSession } from 'next-auth/react';

export default function MyExam() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  useEffect
  (() => {
    console.log("Session data:", session);
  });

  const subjects = [
    {
      title: 'Mathematics',
      description: 'Practice math problems by topics and levels.',
      href: '/myexams/math',
      color: 'from-pink-400 to-red-500',
    },
    {
      title: 'Physics',
      description: 'Master physics concepts with interactive exercises.',
      href: '/exam/physics',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Mock Exams',
      description: 'Simulate real exams and test your readiness.',
      href: '/exam/mock',
      color: 'from-green-400 to-emerald-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Choose Your Exam Category
        </h1>

        {isPending && (
          <div className="mb-6">
            <LinearProgress color="primary" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${subject.color} text-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform cursor-pointer`}
              onClick={() => startTransition(() => router.push(subject.href))}
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

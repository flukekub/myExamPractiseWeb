"use client";
import { useState } from "react";
import ManageExamDialog from "@/components/ManageExamDialog";

export default function DashboardPage() {
  const [openExamDialog, setOpenExamDialog] = useState(false);

  const handleSaveExam = (data: { name: string; topic: string; subject: string; answer: string; image: File | null }) => {
    // TODO: handle save logic (เช่น ส่งไป backend หรืออัปเดต state)
    console.log("Saved exam:", data);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">120</span>
          <span className="text-gray-500 mt-2">Users</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">45</span>
          <span className="text-gray-500 mt-2">Exams</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">8</span>
          <span className="text-gray-500 mt-2">Reports</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
        <a
          href="/admin/users"
          className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-center font-semibold hover:bg-blue-700 transition"
        >
          Manage Users
        </a>
        <button
          type="button"
          className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-center font-semibold hover:bg-blue-700 transition"
          onClick={() => setOpenExamDialog(true)}
        >
          Manage Exams
        </button>
        <a
          href="/admin/reports"
          className="flex-1 bg-blue-600 text-white rounded-lg py-3 text-center font-semibold hover:bg-blue-700 transition"
        >
          View Reports
        </a>
      </div>
      <ManageExamDialog
        open={openExamDialog}
        onClose={() => setOpenExamDialog(false)}
        onSave={handleSaveExam}
      />
    </div>
  );
}

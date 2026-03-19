"use client";
import { useState } from "react";
import ManageExamDialog from "@/components/ManageExamDialog";
import { Plus } from "lucide-react"; 

export default function DashboardPage() {
  const [openExamDialog, setOpenExamDialog] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your examination portal .</p>
          </div>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
            onClick={() => setOpenExamDialog(true)}
          >
            <Plus size={20} />
            Create New Exam
          </button>
        </div>
      </div>

      <ManageExamDialog
        open={openExamDialog}
        onClose={() => setOpenExamDialog(false)}
      />
    </div>
  );
}
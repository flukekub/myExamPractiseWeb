"use client";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setExamInfo, resetScore } from "@/redux/features/scoreSlice";
import { useRouter } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import { use, useState } from "react";

export default function ChooseModePage({
  params:paramsPromise,
}: {
  params: Promise<{ type: string }>;
}) {
  const params = use(paramsPromise); // Unwrap the params Promise
  const pathname = usePathname();
  const dispatch = useDispatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);
  const router = useRouter();
  const [ load, setLoad ] = useState(false);

  function handlePractice(e: React.MouseEvent) {
    e.preventDefault();
    setLoad(true);
    dispatch(resetScore());
    dispatch(
      setExamInfo({
        type: params.type,
        subject: "math",
        createdAt: new Date().toISOString(),
      })
    );
    router.push(`${pathname}/mockState`);
    setLoad(false);
  }

  function handleViewer(e: React.MouseEvent) {
    e.preventDefault();
    setLoad(true);
    router.push(`${pathname}/spectatorState`);
    setLoad(false);

  }

  return (
    <div className=" flex flex-col flex-1 items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
          Choose Exam Mode
        </h1>
        <p className="text-gray-500 mb-8 text-center text-base">
          Select a mode to start your exam experience.
        </p>
        {load && (
          <div className="mb-6">
            <LinearProgress color="primary" />
          </div>
        )}
        <div className="flex flex-col sm:flex-row w-full gap-6">
          <button
            onClick={handleViewer}
            className="flex-1 py-8 px-4 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow border border-gray-200 text-gray-800 font-semibold text-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Viewer Mode
          </button>
          <button
            onClick={handlePractice}
            className="flex-1 py-8 px-4 bg-blue-500 hover:bg-blue-600 transition rounded-xl shadow text-white font-semibold text-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Practice Mode
          </button>
        </div>
      </div>
    </div>
  );
}

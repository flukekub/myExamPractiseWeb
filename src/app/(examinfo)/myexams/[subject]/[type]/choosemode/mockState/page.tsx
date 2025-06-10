"use client"
import { useEffect, useState } from "react"
import type { Exam } from "../../../../../../../../interface"
import getExamsByType from "@/libs/getExamsByType"
import { DiEnvato } from "react-icons/di"
import Link from "next/link"
import Button from '@mui/material/Button';
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import  { setExamInfo , resetScore, setTotal } from "@/redux/features/scoreSlice";


export default function examsType({ params }: { params: { type: string } }) {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await getExamsByType(params.type)
        if (res) {
          setExams(res.data)
          console.log("sus", res.data)
          
          dispatch(setTotal(res.data.length)); 
          dispatch(setExamInfo({
            type: params.type,
            subject: "math",
            createdAt: new Date().toISOString()
          }));

          console.log("ScoreState:", ScoreState)

        } else {
          console.error("No data found for the specified type.")
        }
      } catch (error) {
        console.error("Error fetching exams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, [dispatch , params.type])

  useEffect(() => {
    console.log("Updated ScoreState:", ScoreState);
  }, [ScoreState]);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Exams for {params.type}</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {exams.map((exam, index) => (
              <Link key={index} href={`/myexams/math/${params.type}/choosemode/mockState/${exam._id}`}>
              <div
                key={index}
                className="h-24 bg-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-3 rounded-xl shadow-md transition duration-200 cursor-pointer flex items-center gap-3"
              >
                <div className="text-blue-700">
                  <DiEnvato size={28} />
                </div>
                <h2 className="text-lg font-semibold truncate">{exam.name}</h2>
              </div>
              </Link>
              
            ))}
          </div>
          <div className="mt-10 flex gap-5">
            <Button
              variant="contained"
              color="secondary"
              className="!rounded-full !px-8 !py-3 !text-lg !font-normal !text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
              href="/myexams/math"
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="!rounded-full !px-8 !py-3 !text-lg !font-normal !text-white bg-gradient-to-r from-green-500 to-yellow-400 shadow-lg hover:from-green-600 hover:to-blue-400 transition duration-300"
              href={`/myexams/math/${params.type}/choosemode/mockState/conclude` }
            >
              conclude Score
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

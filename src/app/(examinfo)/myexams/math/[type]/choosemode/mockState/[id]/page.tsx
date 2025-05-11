'use client'
import { use, useEffect, useState } from "react"
import type { Exam } from "../../../../../../../../../interface"
import getExamsByType from "@/libs/getExamsByType"
import getExam from "@/libs/getExam"
import Image from "next/image"
import Button from '@mui/material/Button';
import AnswerButton from "@/components/answerBotton"

export default function Exam({params}: {params: {id: string , type: string}}) {
    const [exam, setExam] = useState<Exam | null>(null) 
    
    const [previousId, setPreviousId] = useState<string | null>(null)
    const [nextId, setNextId] = useState<string | null>(null)

    useEffect(() => {
        console.log("Exam ID:", params.id)
        console.log("Exam Type:", params.type)
        try {
            const fetchExams = async () => {
                const res = await getExamsByType(params.type)
                const res2 = await getExam(params.id)
                if (res && res2) {
                    console.log("Exam Data:", res2.data)
                    setExam(res2.data)
                    const index = res.data.findIndex((exam:Exam) => exam._id === params.id)
                    if (index !== 0) {
                        setPreviousId(res.data[index - 1]?._id || null)
                    }else if ( index !== res.data.length - 1) {
                        setNextId(res.data[index + 1]?._id || null)
                    }else {
                        console.log("No previous & next exam found.")
                    }
                } else {
                    console.error("No data found for the specified type.")
                }
            }
            fetchExams()
        }
        catch (error) {
            console.error("Error fetching exams:", error)
        }
    }
    , [params.id, params.type])
  return (
    <div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8  ">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">{exam?.name}</h1>
        <div className="flex  gap-3 items-center justify-center">
            <Image src={(exam?.imageUrl as string) } alt="Exam Image" width={1000} height={1000} className="rounded-lg shadow-md" />
        </div>
        <AnswerButton answer={exam?.answer as string} />
        <div className="flex justify-center gap-10 mt-10">
            {previousId !== null && (
            <Button
                variant="contained"
                color="secondary"
                className="!rounded-full !px-8 !py-3 !text-lg !font-normal !text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
                href={`/myexams/math/${params.type}/choosemode/mockState/${previousId}`}
            >
                Go Back
            </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                className="!rounded-full !px-8 !py-3 !text-lg !font-normal !text-white bg-gradient-to-r from-green-500 to-yellow-500 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
                href={`/myexams/math/${params.type}/choosemode/mockState`} 
            >
                Go to {params.type}
            </Button>
            {nextId !== null &&(
            <Button
                variant="contained"
                color="primary"
                className="!rounded-full !px-8 !py-3 !text-lg !font-normal !text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:from-blue-600 hover:to-cyan-600 transition duration-300"
                href={`/myexams/math/${params.type}/choosemode/mockState/${nextId}`} 
            >
                Go Next
            </Button>
            )}
            
        </div>

    </div>
  )

}
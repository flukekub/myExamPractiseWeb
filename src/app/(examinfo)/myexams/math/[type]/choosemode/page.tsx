"use client";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setExamInfo, resetScore } from "@/redux/features/scoreSlice";
import { useRouter } from "next/navigation";

export default function ChooseModePage({params}: {params: {type: string}}) {
    const pathname = usePathname(); // รับ path ปัจจุบัน
    const dispatch = useDispatch();
    const ScoreState = useSelector((state: RootState) => state.scoreState);
    const router = useRouter();  // ใช้ useRouter สำหรับเปลี่ยนหน้า

    function handleSubmit(e: React.MouseEvent): void {
        e.preventDefault(); // หยุดการทำงานของ href (การเปลี่ยนหน้า)
        
        dispatch(resetScore()); // รีเซ็ตคะแนนก่อนที่จะไปที่หน้าใหม่
        dispatch(setExamInfo({
            type: params.type,
            subject: "math",
            createdAt: new Date().toISOString()
        }));
        console.log("ScoreState:", ScoreState);

        // เปลี่ยนหน้าไปที่ /mockState หลังจากที่ handleSubmit เสร็จ
        router.push(`${pathname}/mockState`);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
            {/* ข้อความอยู่ด้านบน */}
            <h1 className="text-2xl font-bold mb-4 text-black">Choose Exam Mode</h1>

            {/* ตัวเลือกสองตัวอยู่ด้านล่างและขยายเต็มจอเกือบทั้งหมด */}
            <div className="flex w-full h-full max-w-full space-x-4">
                {/* ด้านซ้าย */}
                <div className="flex-1 h-full bg-green-500 hover:bg-green-400 rounded-3xl shadow-lg">
                    <a
                        href={`${pathname}/spectatorState`}
                        className="text-white font-poppins px-8 py-4 hover:text-gray-800 text-6xl hover:underline rounded-lg w-full h-full flex items-center justify-center text-center"
                    >
                        Viewer Mode
                    </a>
                </div>
                {/* ด้านขวา */}
                <div className="flex-1 h-full bg-blue-500 hover:bg-blue-400 hover:shadow-lg rounded-3xl">
                    <a
                        href="#"
                        className="text-white font-poppins px-8 py-4 text-6xl hover:text-gray-800 hover:underline rounded-lg w-full h-full flex items-center justify-center text-center"
                        onClick={handleSubmit}  // เรียก handleSubmit เมื่อคลิก
                    >
                        Practice Mode
                    </a>
                </div>
            </div>
        </div>
    );
}

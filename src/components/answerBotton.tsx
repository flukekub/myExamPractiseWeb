import { addScore } from "@/redux/features/scoreSlice";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

export default function AnswerButton( {answer}: {answer: string} ) {
    const dispatch = useDispatch();
    const ScoreState = useSelector((state: RootState) => state.scoreState);
    const [chosen, setChosen] = useState<Set<string>>();

    useEffect(() => {
        console.log("ScoreState:afsdf", ScoreState); // แสดงคะแนนใน console
    }
    , [ScoreState]);

    const handleCorrectAnswer = ( choice:string ) => {
        console.log("Answer:", answer); // แสดงคำตอบที่ถูกต้องใน console
        if( chosen?.has(choice)){
            //console.log("กดเลือกซ้ำหาพ่อง"); // แสดงว่าตอบไปแล้ว
            return; // ถ้าตอบไปแล้วไม่ทำอะไร
        }

        if (choice === answer){
            dispatch(addScore(1)); // เพิ่ม 1 คะแนน
        }else if( choice !== answer && chosen?.has(answer)){
            dispatch(addScore(-1)); // ลด 1 คะแนน
        }else if( choice !== answer && !chosen?.has(answer)){
            dispatch(addScore(0)); // ไม่เปลี่ยนคะแนน
        }
        setChosen(new Set([choice]));
    };
    return (
        <div className="flex justify-center gap-10 mt-10">
            {["1", "2", "3", "4"].map((choice) => (
                !chosen?.has(choice) ?
                    (<Button
                        key={choice}
                        variant="outlined"
                        color="primary"
                        className="!rounded-full !px-6 !py-2 !text-lg !font-medium"
                        onClick={() => {
                        // TODO: ใส่ logic เมื่อตอบถูก
                        console.log(`You selected ${choice}`);
                        handleCorrectAnswer( choice); // ตัวอย่างเรียกฟังก์ชันเพิ่มคะแนน
                        }}
                    >
                        {choice}
                    </Button>)
                    :
                    (<Button
                        key={choice}
                        variant="outlined"
                        color="primary"
                        className="!rounded-full !px-6 !py-2 !text-lg !font-medium !bg-blue-500 !text-white"
                        onClick={() => {
                        // TODO: ใส่ logic เมื่อตอบถูก
                        console.log(`You selected ${choice}`);
                        handleCorrectAnswer( choice); // ตัวอย่างเรียกฟังก์ชันเพิ่มคะแนน
                        }}
                    >
                        {choice}
                    </Button>)
            ))}
        </div>
    );
}



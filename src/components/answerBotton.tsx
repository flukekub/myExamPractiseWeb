import { addScore } from "@/redux/features/scoreSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

export default function AnswerButton({
  answer,
  choiceLength,
}: {
  answer: string;
  choiceLength: string;
}) {
  const dispatch = useDispatch();
  const ScoreState = useSelector((state: RootState) => state.scoreState);
  const [chosen, setChosen] = useState<Set<string>>();
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    console.log("ScoreState:afsdf", ScoreState); // แสดงคะแนนใน console
  }, [ScoreState]);
  if (!choiceLength) {
    choiceLength = "0";
  }

  // ถ้า choiceLength เป็น 0 ให้แสดง form

  const choices = Array.from({ length: parseInt(choiceLength) }, (_, i) =>
    (i + 1).toString()
  );

  const handleCorrectAnswer = (choice: string) => {
    console.log("Answer:", answer); // แสดงคำตอบที่ถูกต้องใน console
    if (chosen?.has(choice)) {
      return; // ถ้าตอบไปแล้วไม่ทำอะไร
    }

    if (choice === answer) {
      dispatch(addScore(1)); // เพิ่ม 1 คะแนน
    } else if (choice !== answer && chosen?.has(answer)) {
      dispatch(addScore(-1)); // ลด 1 คะแนน
    } else if (choice !== answer && !chosen?.has(answer)) {
      dispatch(addScore(0)); // ไม่เปลี่ยนคะแนน
    }
    setChosen(new Set([choice]));
  };
  const handleCancelAnswer = () => {
    if (userAnswer.trim() === "") {
      return; // ถ้าไม่มีคำตอบไม่ทำอะไร
    }
    if (userAnswer.trim() === answer) {
      dispatch(addScore(-1));
      setUserAnswer("");
    } else if (userAnswer.trim() !== answer && chosen?.has(answer)) {
      dispatch(addScore(1));
      setUserAnswer("");
    }
  };

  if (parseInt(choiceLength) === 0) {
    return (
      <div className="flex justify-center items-center gap-4 mt-10">
        <TextField
          label="Your Answer"
          variant="outlined"
          value={userAnswer}
          disabled={isConfirmed}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          className="max-w-md rounded-full"
        />
        {isConfirmed ? (
          <Button
            variant="contained"
            color="primary"
            className="!rounded-full !px-4 !py-2 !text-lg !bg-red-500 !font-medium"
            onClick={() => {
              handleCancelAnswer();
              setIsConfirmed(false);
            }}
          >
            ยกเลิก
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="!rounded-full !px-4 !py-2 !text-lg !font-medium"
            onClick={() => {
              handleCorrectAnswer(userAnswer);
              setIsConfirmed(true);
            }}
          >
            ยืนยันคำตอบ
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-10 mt-10">
      {choices.map((choice) =>
        !chosen?.has(choice) ? (
          <Button
            key={choice}
            variant="outlined"
            color="primary"
            className="!rounded-full !px-6 !py-2 !text-lg !font-medium"
            onClick={() => {
              // TODO: ใส่ logic เมื่อตอบถูก
              console.log(`You selected ${choice}`);
              handleCorrectAnswer(choice); // ตัวอย่างเรียกฟังก์ชันเพิ่มคะแนน
            }}
          >
            {choice}
          </Button>
        ) : (
          <Button
            key={choice}
            variant="outlined"
            color="primary"
            className="!rounded-full !px-6 !py-2 !text-lg !font-medium !bg-blue-500 !text-white"
            onClick={() => {
              // TODO: ใส่ logic เมื่อตอบถูก
              console.log(`You selected ${choice}`);
              handleCorrectAnswer(choice); // ตัวอย่างเรียกฟังก์ชันเพิ่มคะแนน
            }}
          >
            {choice}
          </Button>
        )
      )}
    </div>
  );
}

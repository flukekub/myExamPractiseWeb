import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import { Score } from "../../../interface" ; 

type ScoreState = {
    ScoreItem: Score
}

const initialState:ScoreState = {
    ScoreItem: {
        score: 0,
        total: 0,
        type: "",
        subject: "",
        createdAt: ""
    }
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
      addScore: (state, action: PayloadAction<number>) => {
        state.ScoreItem.score += action.payload; // เก็บรายการที่ตอบถูก
      },
      setExamInfo: (state, action: PayloadAction<{ type: string; subject: string; createdAt: string }>) => {
        state.ScoreItem.type = action.payload.type;
        state.ScoreItem.subject = action.payload.subject;
        state.ScoreItem.createdAt = action.payload.createdAt;
      },
      resetScore: (state) => {
        state.ScoreItem.score = 0;
        state.ScoreItem.total = 0;
        state.ScoreItem.type = "";
        state.ScoreItem.subject = "";
        state.ScoreItem.createdAt = "";
      },
      setTotal: (state, action: PayloadAction<number>) => {
        state.ScoreItem.total = action.payload; // เก็บจำนวนคำถามทั้งหมด
      }

    },
  });

export const { addScore ,setExamInfo, resetScore ,setTotal} = scoreSlice.actions
export default scoreSlice.reducer
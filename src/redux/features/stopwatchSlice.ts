import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  isRunning: false,
};

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<{ seconds: number; minutes: number; hours: number }>) {
      state.seconds = action.payload.seconds;
      state.minutes = action.payload.minutes;
      state.hours = action.payload.hours;
    },
    setRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    reset(state) {
      state.seconds = 0;
      state.minutes = 0;
      state.hours = 0;
      state.isRunning = false;
    },
  },
});

export const { setTime, setRunning, reset } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;
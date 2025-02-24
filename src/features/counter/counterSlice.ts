import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    reduce: (state) => {
      state.value -= 1;
    },
    addNumber: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { add, reduce, addNumber } = counterSlice.actions;

export default counterSlice.reducer;

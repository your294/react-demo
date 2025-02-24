import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchByNum = async (num: number) => {
  const mockPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: num * 2 });
    }, 3000);
  });
  return mockPromise;
};

export const addByAsync = createAsyncThunk("counter/fetchByNum", fetchByNum);

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle",
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
  extraReducers(builder) {
    builder
      .addCase(addByAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addByAsync.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.value += action.payload.data;
      })
      .addCase(addByAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { add, reduce, addNumber } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    account: "demo",
    pwd: "123456",
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setPwd: (state, action) => {
      state.pwd = action.payload;
    },
    reset: (state) => {
      state.account = "demo";
      state.pwd = "123456";
    },
  },
});

export const { setAccount, setPwd, reset } = userSlice.actions;
export default userSlice.reducer;

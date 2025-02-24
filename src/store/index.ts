import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    myCount: countReducer,
    myUser: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

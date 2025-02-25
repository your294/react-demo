import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import { useSelector, useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    myCount: countReducer,
    myUser: userReducer,
    myPost: postReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/userSlice";

export const store = configureStore({
  reducer: { users },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

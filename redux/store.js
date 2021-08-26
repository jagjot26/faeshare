import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// THE GLOBAL STORE SETUP
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

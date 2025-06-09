import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/UserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});

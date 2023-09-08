import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import balanceSlice from "./balanceSlice";
import tokenSlice from "../../services/feature/token";
const store = configureStore({
  reducer: {
    token: tokenSlice,
    user: userSlice,
    balance: balanceSlice,
  },
});

export default store;

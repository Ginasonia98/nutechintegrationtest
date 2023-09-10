import tokenReducer from "../services/feature/token";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import balanceSlice from "./slices/balanceSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userSlice,
    balance: balanceSlice,
  },
});

export default store;
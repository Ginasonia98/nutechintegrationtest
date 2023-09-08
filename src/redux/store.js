import tokenReducer from "../services/feature/token";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
 
  },
});

export default store;

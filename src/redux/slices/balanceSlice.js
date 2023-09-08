import { createSlice } from "@reduxjs/toolkit";
import {
  loadState,
  saveState,
  removeState,
  updateState,
} from "../action/userAction";

const type = "balance";

const initialState = {
  balance: loadState(type),
};

const balanceSlice = createSlice({
  name: type,
  initialState: initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
      saveState(type, action.payload);
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
      updateState(type, action.payload);
    },
    removeBalance: (state) => {
      state.balance = "";
      removeState(type);
    },
  },
});

export const { setBalance, updateBalance, removeBalance } =
  balanceSlice.actions;
export default balanceSlice.reducer;

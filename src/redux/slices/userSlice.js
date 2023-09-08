import { createSlice } from "@reduxjs/toolkit";
import {
  saveState,
  removeState,
  loadState,
  updateState,
} from "../action/userAction";

const type = "user";

const initialState = {
  user: loadState(type),
};

const userSlice = createSlice({
  name: type,
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveState(type, action.payload);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      updateState(type, action.payload);
    },
    removeUser: (state) => {
      state.user = "";
      removeState(type);
    },
  },
});

export const { setUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

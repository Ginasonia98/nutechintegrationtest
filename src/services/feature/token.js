import { createSlice } from '@reduxjs/toolkit'
import { saveState, loadState, removeState } from './browser-storage/browser-storage'

const type = 'token'

const initialState = {
  token: loadState(type),
}

export const tokenSlice = createSlice({
  name: type,
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      saveState(type, action.payload)
    },
    removeToken: (state) => {
      state.token = ''
      removeState(type)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer

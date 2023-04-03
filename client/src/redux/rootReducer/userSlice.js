import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.isLogged = action.payload
    },
    logUserOut: (state, action) => {
      state.isLogged = action.payload
    }
  }
})

export const {
  logUserIn,
  logUserOut
} = userSlice.actions

export default userSlice.reducer
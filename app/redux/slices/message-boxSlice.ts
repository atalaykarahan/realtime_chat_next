import { createSlice } from '@reduxjs/toolkit'

export const messageBox = createSlice({
  name: 'message-box',
  initialState: {
    value: false
  },
  reducers: {
    changeValue: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value;
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeValue } = messageBox.actions

export default messageBox.reducer
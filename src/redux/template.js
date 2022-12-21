import { createSlice } from '@reduxjs/toolkit'

export const templateSlice = createSlice({
  name: 'template',
  initialState: {
    value: 'csv'
  },
  reducers: {
    setTemplate: (state, action) => {
      state.template = action.payload;
      console.log(state.template);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTemplate } = templateSlice.actions

export default templateSlice.reducer
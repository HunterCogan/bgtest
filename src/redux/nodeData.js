import { createSlice } from '@reduxjs/toolkit'

export const nodeDataSlice = createSlice({
  name: 'nodeData',
  initialState: {
    value: {
      id: "1"
    }
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData } = nodeDataSlice.actions

export default nodeDataSlice.reducer
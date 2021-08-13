import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    pageCount: 0
  },
  reducers: {
    setPageCount: (state, action) => { state.pageCount = action.payload },
  }
})

export const reducer = rootSlice.reducer;

export const { setPageCount } = rootSlice.actions
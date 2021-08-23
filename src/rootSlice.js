import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    pageCount: 0,
    title: '',
    offer: [],
  },
  reducers: {
    setPageCount: (state, action) => { state.pageCount = action.payload },
    setTitle: (state, action) => { state.title = action.payload },
    setOffer: (state, action) => {state.offer = action.payload}
  }
})

export const reducer = rootSlice.reducer;

export const { setPageCount, setTitle, setOffer } = rootSlice.actions
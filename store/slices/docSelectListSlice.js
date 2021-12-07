import { createSlice } from "@reduxjs/toolkit";
import { getDocList as getList } from "../actions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isOpen: true,
};

export const docSelectListSlice = createSlice({
  name: "docSelectListSlice",
  initialState,
  reducers: {
    docListTogglePopupVisibility(state, action) {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.data = [];
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data.push(...action.payload);
      })
      .addCase(getList.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.data = [];
      });
  },
});

export const { docListTogglePopupVisibility } = docSelectListSlice.actions;
export default docSelectListSlice.reducer;

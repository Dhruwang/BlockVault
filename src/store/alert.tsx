import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alertSlice",
  initialState: {
    alertMessage: null,
  },
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
  },
});

const alertActions = alertSlice.actions;
export {alertActions}
export {alertSlice};

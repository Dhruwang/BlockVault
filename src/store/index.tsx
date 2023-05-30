import { configureStore } from "@reduxjs/toolkit";
import lpSlice from "./landingPage";
import { modalSlice } from "./ConfirmModal";

const store = configureStore({
    reducer:{
        lp:lpSlice.reducer,
        modal:modalSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store;
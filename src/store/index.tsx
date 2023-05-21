import { configureStore } from "@reduxjs/toolkit";
import lpSlice from "./landingPage";

const store = configureStore({
    reducer:{
        lp:lpSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export default store;
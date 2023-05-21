import { createSlice } from "@reduxjs/toolkit";

const lpSlice = createSlice({
    name:"walletConnect",
    initialState:{walletConnected:false},
    reducers:{
            connectWallet: (state) => {
                state.walletConnected = true;
            }
        }
})

export const lpActions = lpSlice.actions;

export default lpSlice;
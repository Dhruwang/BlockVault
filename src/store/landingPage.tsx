import { createSlice } from "@reduxjs/toolkit";

interface WalletConnectState {
    walletAddress: string | null;
  }
  
  const initialState: WalletConnectState = {
    walletAddress: null,
  };
  
  const lpSlice = createSlice({
    name: "walletConnect",
    initialState,
    reducers: {
      connectWallet: (state, action) => {
        state.walletAddress = action.payload;
      },
    },
  });
  
export const lpActions = lpSlice.actions;

export default lpSlice;
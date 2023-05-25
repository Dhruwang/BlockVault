  import { createSlice } from "@reduxjs/toolkit";

  interface WalletConnectState {
      walletAddress: string | null;
      username: string | null;
    }
    
    const initialState: WalletConnectState = {
      walletAddress: null,
      username:null
      
    };
    
    const lpSlice = createSlice({
      name: "walletConnect",
      initialState,
      reducers: {
        connectWallet: (state, action) => {
          state.walletAddress = action.payload;
        },
        setUsername: (state, action) => {
          state.username = action.payload;
        },
      },
    },
    );
    
  export const lpActions = lpSlice.actions;

  export default lpSlice;
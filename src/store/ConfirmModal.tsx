import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:"modalSlice",
    initialState: {
        showConfirmModal:false,
        message: null,
        loadingMessage:null,
        // onConfirm: ()=>{},
        // onCancel:()=>{}
    },
    reducers:{
        setShowConfirmModal:(state,action)=>{
            state.showConfirmModal = action.payload
        },
        setMessage:(state,action)=>{
            state.message = action.payload
        },
        setLoadingMessage:(state,action)=>{
            state.loadingMessage = action.payload
        },
        // setOnConfirm:(state,action)=>{
        //     state.onConfirm = action.payload
        // },
        // setOnCancel:(state,action)=>{
        //     state.onCancel = action.payload
        // }
    }
})

export const modalActions = modalSlice.actions;
export {modalSlice}

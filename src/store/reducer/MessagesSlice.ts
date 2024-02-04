import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageState} from "../../models/StoreModels";


const initialState: MessageState = {
    show: false,
    message: ''
}

export const successSlice = createSlice({
    name: 'successMessage',
    initialState,
    reducers: {
        successShow(state, action: PayloadAction<boolean>){
            state.show = action.payload
        }
    }
})

export const warningSlice = createSlice({
    name: 'warningMessage',
    initialState,
    reducers: {
        warningShow(state, action: PayloadAction<MessageState>){
            state.show = action.payload.show
            state.message = action.payload.message
        }
    }
})

export const errorSlice = createSlice({
    name: 'errorMessage',
    initialState,
    reducers: {
        errorShow(state, action: PayloadAction<boolean>){
            state.show = action.payload
        }
    }
})
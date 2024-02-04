import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Host} from "../../models/StoreModels";


const initialState: Host = {
    host: ""
}

export const hostSlice = createSlice({
    name: 'Host',
    initialState,
    reducers: {
        setFilesHost(state, action: PayloadAction<string>){
            state.host = action.payload
        }
    }
})
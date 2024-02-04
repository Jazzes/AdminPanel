import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserState} from "../../models/StoreModels";
import {User} from "../../models/Models";


const initialState : UserState = {
    isAuth: false,
    login: '',
    role: '',
    id: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LogIn(state, action: PayloadAction<User>){
            state.isAuth = true
            state.login = action.payload.login
            state.role = action.payload.role
            state.id = action.payload.id
        },
        LogOut(state){
            state.login = ''
            state.role = ''
            state.id = 0
            state.isAuth = false
        }
    }
})
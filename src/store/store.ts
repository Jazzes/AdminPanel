import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./reducer/UserSlice";
import {FimboApi} from "./services/FimboApiService";
import {LessonApi} from "./services/LessonApiService";
import {LessonTypeApi} from "./services/LessonTypeApiService";
import {VariableApi} from "./services/VariablesApiService";
import {errorSlice, successSlice, warningSlice} from "./reducer/MessagesSlice";
import {hostSlice} from "./reducer/Host";
import {GenreApi} from "./services/GenreApiService";
import {AudioApi} from "./services/AudioApiService";

const rootReducer = combineReducers({
    userReducer: userSlice.reducer,
    successMessageReducer: successSlice.reducer,
    warningMessageReducer: warningSlice.reducer,
    errorMessageReducer: errorSlice.reducer,
    hostReducer: hostSlice.reducer,
    [FimboApi.reducerPath]: FimboApi.reducer,
    [LessonApi.reducerPath]: LessonApi.reducer,
    [LessonTypeApi.reducerPath]: LessonTypeApi.reducer,
    [VariableApi.reducerPath]: VariableApi.reducer,
    [GenreApi.reducerPath]: GenreApi.reducer,
    [AudioApi.reducerPath]: AudioApi.reducer
})

export const storeApp = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(FimboApi.middleware, LessonApi.middleware,
            LessonTypeApi.middleware, VariableApi.middleware, GenreApi.middleware, AudioApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof storeApp.dispatch
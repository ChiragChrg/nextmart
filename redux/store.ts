import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/userSlice"
import { TypedUseSelectorHook, useSelector } from "react-redux"

const store = configureStore({
    reducer: {
        account: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
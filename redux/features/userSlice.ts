import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

type UserType = {
    user?: {
        uid?: string | null,
        name?: string | null,
        email?: string | null,
        image?: string | null,
        phone?: string | null,
        dob?: Date | null,
        emailVerified?: boolean | null,
        accessToken?: string | null,
    },
    expires?: string | null
}

type InitialStateType = {
    account: UserType | null,
}

const InitialState: InitialStateType = {
    account: null
}

const userSlice = createSlice({
    name: "account",
    initialState: InitialState,
    reducers: {
        LogIn: (state, action: PayloadAction<UserType>) => {
            state.account = action.payload
        },
        LogOut: () => {
            return InitialState
        }
    }
})

export const { LogIn, LogOut } = userSlice.actions
export default userSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

type UserType = {
    user: {
        uid: string,
        name: string,
        email: string,
        image: string,
        emailVerified: boolean,
        accessToken: string
    },
    expires: string
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
        LogOut: () => InitialState
    }
})

export const { LogIn, LogOut } = userSlice.actions
export default userSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressType {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}

export interface UserType {
    id?: string;
    name?: string;
    email?: string;
    emailVerified?: boolean;
    image?: string;
    role?: string;
    address?: AddressType;
    createdAt?: string;
    updatedAt?: string;
}

const initialUserState: UserType = {
    id: undefined,
    name: undefined,
    email: undefined,
    emailVerified: false,
    image: undefined,
    role: undefined,
    address: {
        street: undefined,
        city: undefined,
        state: undefined,
        zip: undefined,
    },
    createdAt: undefined,
    updatedAt: undefined
};

const userSlice = createSlice({
    name: "user",
    initialState: { user: initialUserState },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = initialUserState;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
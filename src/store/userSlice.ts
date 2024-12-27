import { createSlice } from "@reduxjs/toolkit";

export interface UserType {
    id: string;
    name: string;
    email: string;
    emailVerified?: string;
    image?: string;
    role: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    createdAt: string;
    updatedAt: string;
}

// const initialUserState: UserType | null = {
//     id: "",
//     name: "",
//     email: "",
//     emailVerified: false,
//     image: "",
//     role: "",
//     address: {
//         street: "",
//         city: "",
//         state: "",
//         zip: "",
//     },
//     createdAt: "",
//     updatedAt: ""
// }

const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state) {
            return { user: null }
        }
    }
})

export const userActions = userSlice.actions

export default userSlice.reducer
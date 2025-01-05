import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryType {
    categoryId: string;
    categoryName: string;
    categorySlug: string;
    description: string;
    imageUrl?: string;
    parentCategoryID?: string;
    productId: string;
}

const initialState: CategoryType[] = [];

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        setCategory(state, action: PayloadAction<CategoryType[]>) {
            return action.payload
        },
        clearCategory(state) {
            return [];
        }
    }
})

export const categoryActions = categorySlice.actions

export default categorySlice.reducer
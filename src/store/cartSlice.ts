import { productType } from "@/components/products/ProductSection";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemType {
    productId: string;
    product: productType;
    quantity: number;
    unitRate: number;
    price: number;
}

export interface CartType {
    cartID?: string;
    userID?: string;
    items: CartItemType[];
    totalAmount: number;
    createdAt?: string;
    updatedAt?: string;
}

const initialState: CartType = {
    cartID: undefined,
    userID: undefined,
    items: [],
    totalAmount: 0,
    createdAt: undefined,
    updatedAt: undefined
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        updateCart(state, action: PayloadAction<CartItemType>) {
            state.items.push(action.payload);
            state.totalAmount = state.items.reduce((total, item) => total + item.price, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.productId !== action.payload);
            state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
        },
        clearCart(state) {
            state.items = [];
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
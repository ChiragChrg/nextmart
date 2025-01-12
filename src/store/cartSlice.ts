import { productType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemType {
    productId: string;
    product?: productType;
    quantity: number;
    unitRate: number;
    price: number;
}

export interface CartType {
    cartId?: string;
    userId?: string;
    items: CartItemType[];
    totalAmount: number;
    createdAt?: string;
    updatedAt?: string;
}

const initialState: CartType = {
    cartId: undefined,
    userId: undefined,
    items: [],
    totalAmount: 0,
    createdAt: undefined,
    updatedAt: undefined
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        updateCart(state, action: PayloadAction<CartType>) {
            state.cartId = action.payload.cartId;
            state.userId = action.payload.userId;
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        incrementQuantity(state, action: PayloadAction<string>) {
            const product = state.items.find(item => item.productId === action.payload);
            if (product) {
                product.quantity += 1;
                product.price = product.quantity * product.unitRate;
                state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
            }
        },
        decrementQuantity(state, action: PayloadAction<string>) {
            const product = state.items.find(item => item.productId === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
                product.price = product.quantity * product.unitRate;
                state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
            }
        },
        addItem(state, action: PayloadAction<CartItemType>) {
            state.items.push(action.payload);
            state.totalAmount = state.items.reduce((total, item) => total + item.price, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.productId !== action.payload);
            state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
        },
        clearCart(state) {
            return initialState;
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
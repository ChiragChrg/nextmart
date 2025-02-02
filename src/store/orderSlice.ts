import { productType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItemType {
    orderId: string;
    productId: string;
    product?: productType;
    quantity: number;
    unitRate: number;
    price: number;
}

export interface OrderType {
    orderId?: string;
    userId?: string;
    items: OrderItemType[];
    totalAmount: number;
    status: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    createdAt?: string;
    updatedAt?: string;
}

const initialState: OrderType[] = [];

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
        updateOrders(state, action: PayloadAction<OrderType[]>) {
            state = action.payload
        },
        clearOrders(state) {
            return initialState
        }
    }
})

export const cartActions = orderSlice.actions

export default orderSlice.reducer
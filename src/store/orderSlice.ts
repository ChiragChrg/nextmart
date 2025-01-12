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

const initialState: OrderType = {
    orderId: undefined,
    userId: undefined,
    items: [],
    totalAmount: 0,
    status: "Processing",
    razorpayOrderId: "",
    razorpayPaymentId: "",
    razorpaySignature: "",
    createdAt: undefined,
    updatedAt: undefined
};

const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
        updateOrders(state, action: PayloadAction<OrderType>) {
            state.orderId = action.payload.orderId;
            state.userId = action.payload.userId;
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.status = action.payload.status;
            state.razorpayOrderId = action.payload.razorpayOrderId;
            state.razorpayPaymentId = action.payload.razorpayPaymentId;
            state.razorpaySignature = action.payload.razorpaySignature;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        clearOrders(state) {
            return initialState
        }
    }
})

export const cartActions = orderSlice.actions

export default orderSlice.reducer
"use server";

import { prisma } from "@/prisma";
import { OrderType } from "@/store/orderSlice";

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

type CreateOrderType = {
    cartId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
}

export const createOrder = async ({ cartId, razorpayOrderId, razorpayPaymentId, razorpaySignature }: CreateOrderType): Promise<ResponseType> => {
    try {
        if (!cartId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return { status: 422, message: "Invalid Order Parameters!" } as ResponseType;
        }

        const cart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true }
        });

        if (!cart) {
            return { status: 404, message: "Cart not found!" } as ResponseType;
        }

        const newOrder = await prisma.order.create({
            data: {
                userId: cart.userId,
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitRate: item.unitRate,
                        price: item.price,
                    }))
                },
                totalAmount: cart.totalAmount,
                status: "Processing",
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature,
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        // Loop through all products in cart and decrement the stock by the cart quantity
        cart.items.map(async (item) => {
            // Fetch the current stock
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { stock: true }
            });

            if (!product || !product.stock) {
                throw new Error(`Product not found`);
            }

            const newQuantity = product.stock.quantity - item.quantity;

            if (newQuantity < 0) {
                throw new Error(`Insufficient stock for product ID ${item.productId}`);
            }

            // Update the stock
            await prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        quantity: newQuantity,
                        isInStock: newQuantity > 0,
                    }
                }
            });
        });

        // Delete all items in cart
        await prisma.cartItem.deleteMany({
            where: { cartId: cartId }
        })

        // Delete the cart
        await prisma.cart.delete({
            where: { id: cartId }
        })

        const formattedOrder = {
            ...newOrder,
            createdAt: newOrder.createdAt.toISOString(),
            updatedAt: newOrder.updatedAt.toISOString(),
        }

        return { status: 201, message: "Order placed successfully!", response: formattedOrder as OrderType } as ResponseType;
    } catch (error: any) {
        console.log("Remove_Item_Error:", error);
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
};
"use server";

import { productType } from "@/components/products/ProductSection";
import { prisma } from "@/prisma";
import { CartType } from "@/store/cartSlice";
import { CategoryType } from "@/store/categorySlice";

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

type UpdateCartType = {
    userId: string,
    items: {
        productId: string;
        quantity: number;
        unitRate: number;
        price: number;
    }
}

export const getUserCart = async (userId: string) => {
    console.log("userId", userId)

    try {
        if (!userId) {
            return { status: 422, message: "Invalid User!" } as ResponseType
        }
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        const formattedCart = {
            cartID: cart?.id,
            userID: cart?.userId,
            items: cart?.items?.map(item => ({
                ...item,
                product: {
                    ...item.product,
                    productID: item.product.id
                }
            })),
            totalAmount: cart?.totalAmount,
            createdAt: cart?.createdAt.toISOString(),
            updatedAt: cart?.updatedAt.toISOString(),
        }

        console.log("Cart_Data", cart)
        return { status: 200, message: "Product fetched successfully!", response: formattedCart as unknown as CartType } as ResponseType
    } catch (error: any) {
        console.log("Product_Fetch_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const updateUserCart = async (cart: UpdateCartType): Promise<ResponseType> => {
    console.log("CartUpdate", cart);

    try {
        if (!cart || !cart.items.productId || cart.items.quantity <= 0 || cart.items.unitRate <= 0) {
            return { status: 422, message: "Invalid cart item!" } as ResponseType;
        }

        let existingCart = await prisma.cart.findUnique({
            where: { userId: cart.userId as string },
            include: { items: true }
        });

        if (!existingCart) {
            existingCart = await prisma.cart.create({
                data: {
                    userId: cart.userId as string,
                    items: {
                        create: [{
                            productId: cart.items.productId,
                            quantity: cart.items.quantity,
                            unitRate: cart.items.unitRate,
                            price: cart.items.quantity * cart.items.unitRate,
                        }],
                    },
                    totalAmount: cart.items.quantity * cart.items.unitRate,
                },
                include: { items: true }
            });

            return { status: 201, message: "Cart created successfully!", response: existingCart } as ResponseType;
        }

        const existingItem = existingCart.items.find(item => item.productId === cart.items.productId);

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + cart.items.quantity,
                    price: (existingItem.quantity + cart.items.quantity) * cart.items.unitRate,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: existingCart.id,
                    productId: cart.items.productId,
                    quantity: cart.items.quantity,
                    unitRate: cart.items.unitRate,
                    price: cart.items.quantity * cart.items.unitRate,
                },
            });
        }

        const updatedCart = await prisma.cart.update({
            where: { id: existingCart.id },
            data: {
                totalAmount: existingCart.items.reduce((total, item) => total + item.price, 0),
            },
            include: { items: true }
        });

        return { status: 200, message: "Cart updated successfully!", response: updatedCart } as ResponseType;
    } catch (error: any) {
        console.log("Cart_Update_Error:", error);
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
};

"use server";

import { prisma } from "@/prisma";
import { CartType } from "@/store/cartSlice";
import { FlatProductType } from "@/types";

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

// #region Search Suggestions
export const getFlatProducts = async () => {

    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                productSlug: true,
                title: true,
                stock: true,
                category: {
                    select: {
                        categorySlug: true
                    }
                },
                price: {
                    select: {
                        current: true
                    }
                },
                images: {
                    select: {
                        imageUrl: true
                    }
                }
            }
        })

        const flatProducts = products.map(product => {
            if (product.stock.quantity <= 0) return;

            return {
                id: product.id,
                productSlug: product.productSlug,
                title: product.title,
                category: product.category.categorySlug,
                price: product.price.current,
                imageUrl: product.images[0].imageUrl
            }
        })

        return { status: 200, message: "Flat Product fetched Successfully!", response: flatProducts as FlatProductType[] } as ResponseType
    } catch (error: any) {
        console.log("Flat_Product_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
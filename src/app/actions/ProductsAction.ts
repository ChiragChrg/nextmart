"use server"

import { prisma } from "@/prisma";
import { CategoryType } from "@/store/categorySlice";
import { productType } from "@/types";

type ResponseType = {
    status: number;
    message: string;
    formFields?: any;
    response?: any;
}

export const getAllCategories = async () => {
    try {
        const categories = await prisma.category.findMany()

        if (!categories) {
            throw new Error("No categories found");
        }

        // console.log("Categories_Data", categories)
        const formattedCategories = categories?.map(category => {
            // console.log("AllCats", category)
            const { id, parentCategoryId, ...restCategory } = category
            return {
                categoryId: id,
                parentCategoryID: parentCategoryId,
                ...restCategory
            }
        });

        return { status: 200, message: "Categories fetched successfully!", response: formattedCategories as unknown as CategoryType[] } as ResponseType
    } catch (error: any) {
        console.log("Categories_Fetch_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        })

        if (!products) {
            throw new Error("No products found");
        }

        // console.log("Products_Data", products)
        const formattedProducts = products?.map(prod => {
            const { id, category, ...restProduct } = prod
            const formattedCategory = category ? {
                categoryId: category.id,
                categoryName: category.categoryName,
                categorySlug: category.categorySlug,
                description: category.description,
                imageUrl: category.imageUrl,
                parentCategoryID: category.parentCategoryId,
                productId: category.productId[0]
            } : null;

            return {
                productId: id,
                category: formattedCategory,
                ...restProduct
            }
        });

        return { status: 200, message: "Products fetched successfully!", response: formattedProducts as productType[] } as ResponseType
    } catch (error: any) {
        console.log("Products_Fetch_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const getProductBySlug = async (productSlug: string) => {
    // console.log("productSlug", productSlug)
    try {
        if (!productSlug) {
            return { status: 422, message: "Invalid Product Slug!" } as ResponseType
        }
        const product = await prisma.product.findUnique({
            where: { productSlug }
        })

        if (!product?.id) {
            return { status: 404, message: "Product not Found!" } as ResponseType
        }

        const { id, ...restProduct } = product

        const formattedProduct = {
            productId: id,
            ...restProduct
        }

        // console.log("\nProduct : ", product)


        return { status: 200, message: "Product fetched successfully!", response: formattedProduct as productType } as ResponseType
    } catch (error: any) {
        console.log("Product_Fetch_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const deleteProductById = async (productId: string) => {
    try {
        if (!productId) {
            return { status: 422, message: "Invalid Product ID!" } as ResponseType;
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return { status: 404, message: "Product not found!" } as ResponseType;
        }

        await prisma.cartItem.deleteMany({
            where: { productId },
        });

        await prisma.orderItem.deleteMany({
            where: { productId },
        });

        await prisma.category.updateMany({
            where: { productId: { has: productId } },
            data: {
                productId: {
                    set: [],
                },
            },
        });

        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        });

        return {
            status: 204,
            message: "Product deleted successfully!",
            response: deletedProduct,
        } as ResponseType;
    } catch (error: any) {
        console.error("Product_Delete_Error:", error);
        return {
            status: 500,
            message: error.message || "An unexpected error occurred.",
        } as ResponseType;
    }
};

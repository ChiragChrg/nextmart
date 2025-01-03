"use server"

import { productType } from "@/components/products/ProductSection";
import { prisma } from "@/prisma";
import { CategoryType } from "@/store/categorySlice";

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
            const { id, parentCategoryId, productId, ...restCategory } = category
            return {
                categoryID: id,
                parentCategoryID: parentCategoryId,
                productID: productId,
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
        const products = await prisma.product.findMany()

        if (!products) {
            throw new Error("No products found");
        }

        console.log("Products_Data", products)
        const formattedProducts = products?.map(prod => {
            const { id, ...restProduct } = prod
            return {
                productID: id,
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
    console.log("productSlug", productSlug)

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
            productID: id,
            ...restProduct
        }

        console.log("\nProduct : ", product)


        return { status: 200, message: "Product fetched successfully!", response: formattedProduct as productType } as ResponseType
    } catch (error: any) {
        console.log("Product_Fetch_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
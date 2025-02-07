"use server";

import { prisma } from "@/prisma";
import { CartType } from "@/store/cartSlice";
import { FlatProductType, productType } from "@/types";

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
// #endregion Search Suggestions

// #region Products by Analytics
export const getProductsByAnalytics = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                OrderItem: true
            }
        });

        if (!products || products.length === 0) {
            throw new Error("No products found");
        }

        const formattedProducts = products.map(prod => {
            const { id, category, OrderItem, ratings, ...restProduct } = prod;
            const formattedCategory = category ? {
                categoryId: category.id,
                categoryName: category.categoryName,
                categorySlug: category.categorySlug,
                description: category.description,
                imageUrl: category.imageUrl,
                parentCategoryID: category.parentCategoryId,
                productId: prod.id
            } : null;

            const totalSales = OrderItem?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            const averageRating = ratings ? ratings.average : 0;

            return {
                productId: id,
                category: formattedCategory,
                totalSales,
                ratings,
                averageRating,
                ...restProduct
            };
        });

        // Categorizing products based on sales and ratings
        const bestSellers = formattedProducts.sort((a, b) => b.totalSales - a.totalSales).slice(0, 10);
        const latestProducts = formattedProducts.toReversed().slice(0, 10);
        const trendingProducts = formattedProducts.filter(prod => prod.averageRating > 4.5).slice(0, 10);

        return {
            status: 200,
            message: "Products fetched successfully!",
            response: {
                bestSellers,
                latestProducts,
                trendingProducts
            } as { bestSellers: productType[], latestProducts: productType[], trendingProducts: productType[] }
        } as ResponseType;
    } catch (error: any) {
        console.log("Products_Fetch_Error : ", error);
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
};

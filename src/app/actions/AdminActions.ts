"use server";
import { cookies } from 'next/headers';
import { SignToken } from '@/lib/jwt';
import { prisma } from '@/prisma';
import { CarouselType, productType } from '@/types';
import { UserType } from '@/store/userSlice';

type ResponseType = {
    status: number;
    message: string;
    formFields?: unknown;
    response?: unknown;
}

// #region Admin Actions
export const adminLogin = async (previousState: unknown, formData: FormData) => {
    const email = process.env.ADMIN_EMAIL;
    const password = formData.get("password") as string;
    console.log("ADminLogin", { email, password })

    try {
        if (!email || !password) {
            return { status: 422, message: "Invalid Fields!" } as ResponseType
        }

        if (email !== process.env.ADMIN_EMAIL) {
            return { status: 422, message: 'Invalid User' } as ResponseType
        }

        if (password !== process.env.ADMIN_PASSWORD) {
            return { status: 422, message: 'Invalid Password' } as ResponseType
        }

        const token = await SignToken({ email }, "1h");
        const cookieStore = await cookies();
        cookieStore.set('nextmart_admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/admin',
        });

        return { status: 200, message: "Admin Login Successful!" } as ResponseType
    } catch (error: any) {
        console.log("Admin_Login : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
//#endregion Admin Actions

//#region Category Actions
export const createCategory = async (previousState: unknown, formData: FormData) => {
    const parentCategoryId = formData.get("parentCategoryID") as string;
    const categoryName = formData.get("categoryName") as string;
    const categorySlug = formData.get("categorySlug") as string;
    const categoryDescription = formData.get("categoryDescription") as string;
    // console.log("createCategory", { parentCategoryId, categoryName, categorySlug, categoryDescription })

    try {
        if (!categoryName || !categorySlug || !categoryDescription) {
            return { status: 422, message: "Invalid Category Fields!" } as ResponseType
        }

        const newCategory = await prisma.category.create({
            data: {
                parentCategoryId,
                categoryName,
                categorySlug,
                description: categoryDescription
            }
        })

        // console.log("newCategory", newCategory)
        return { status: 201, message: "Category Created Successfully!", response: newCategory } as ResponseType
    } catch (error: any) {
        console.log("Create_Category_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
//#endregion Category Actions

//#region Product Actions
export const createProduct = async (productData: productType) => {
    const { productSlug, title, longTitle, description, categoryId, brand, price, stock, images, features, variants, ratings, tags } = productData
    console.log("createProduct", productData)


    try {
        if (!productSlug || !title || !longTitle || !description || !categoryId || !brand || !price || !stock || !images || !tags) {
            return { status: 422, message: "Invalid Category Fields!" } as ResponseType
        }

        const newProduct = await prisma.product.create({
            data: {
                productSlug,
                title,
                longTitle,
                description,
                categoryId,
                brand,
                price,
                stock,
                images,
                features,
                variants,
                ratings,
                tags
            }
        })

        console.log("newProduct", newProduct)
        return { status: 201, message: "Product Created Successfully!" } as ResponseType
    } catch (error: any) {
        console.log("Create_Product_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
//#endregion Product Actions

//#region Customer Actions
export const getCustomers = async () => {
    try {
        const customers = await prisma.user.findMany({
            where: { role: "USER" }
        })

        const formattedCustomers = customers.map(customer => ({
            ...customer,
            emailVerified: customer.emailVerified ? true : false,
            createdAt: customer.createdAt.toISOString(),
            updatedAt: customer.updatedAt.toISOString()
        }))

        // console.log("customers", customers)
        return { status: 200, message: "Customers fetched Successfully!", response: formattedCustomers as UserType[] } as ResponseType
    } catch (error: any) {
        console.log("Fetch_Customers_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
// #endregion Customer Actions

// #region Carousel Actions
export const getAllCarousel = async () => {
    try {
        const carousel = await prisma.carousel.findMany()
        return { status: 200, message: "Carousel fetched Successfully!", response: carousel as CarouselType[] } as ResponseType
    } catch (error: any) {
        console.log("Fetch_Carousel_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const createCarouselPoster = async (posterData: {
    posterTitle: string;
    posterSubtitle: string;
    posterDescription: string;
    productUrl: string;
    posterImage: string;
    posterSlot: number;
}) => {
    try {
        const newCarousel = await prisma.carousel.create({
            data: {
                title: posterData.posterTitle,
                subtitle: posterData.posterSubtitle,
                description: posterData.posterDescription,
                poster: posterData.posterImage,
                productUrl: posterData.productUrl,
                status: "inactive",
                slotId: posterData.posterSlot
            }
        });

        // console.log("customers", customers)
        return { status: 201, message: "Poster Created Successfully!", response: newCarousel as CarouselType } as ResponseType
    } catch (error: any) {
        console.log("Create_Carousel_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}

export const updateCarouselStatus = async (carouselId: string, status: "active" | "inactive") => {
    try {
        const updatedCarousel = await prisma.carousel.update({
            where: { id: carouselId },
            data: {
                status: status,
            }
        });

        // console.log("customers", customers)
        return { status: 200, message: "Carousel Updated Successfully!", response: updatedCarousel as CarouselType } as ResponseType
    } catch (error: any) {
        console.log("Update_Carousel_Error : ", error)
        return { status: 500, message: error.message || "An unexpected error occurred." } as ResponseType;
    }
}
// #endregion Carousel Actions
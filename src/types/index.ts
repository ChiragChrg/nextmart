import { CategoryType } from "@/store/categorySlice"

export type productType = {
    productId?: string
    productSlug: string
    title: string,
    longTitle: string,
    description: string,
    categoryId: string,
    category?: CategoryType,
    brand: string,
    price: {
        original: number,
        current: number,
        discount: number,
    },
    stock: {
        quantity: number,
        isInStock: boolean
    }
    images: {
        imageUrl: string,
        altText: string,
        blurData: string,
        averageColor: string
    }[],
    features?: {
        variant: {
            size: string,
            color: string,
        }
    },
    variants?: {
        size?: {
            productSlug: string,
            size: string
        }[],
        color?: {
            productSlug: string,
            color: string
        }[]
    }
    ratings?: {
        average: number,
        reviewCount: number
    },
    tags: string[]
}


export type ProductTableType = {
    productId?: string;
    image: {
        imageUrl: string,
        altText: string,
        blurData: string,
        averageColor: string
    };
    title: string;
    category: string;
    stock: number;
    productPath: string;
}

export type OrderTableType = {
    orderId: string;
    razorpayId: string;
    orderDate: string;
    status: string;
    totalAmount: number;
}

export type CustomerTableType = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
}